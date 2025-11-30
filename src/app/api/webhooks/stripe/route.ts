import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Subscription event handlers
async function handleSubscriptionCreated(subscription: Stripe.Subscription, supabase: any) {
  try {
    const userId = subscription.metadata?.user_id;
    if (!userId) return;

    // Get price details
    const priceId = subscription.items.data[0]?.price.id;
    const price = subscription.items.data[0]?.price;

    const { error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer as string,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
        plan_name: price?.nickname || 'Wholesale Subscription',
        plan_id: price?.id,
        price_id: priceId,
        amount: price?.unit_amount,
        currency: price?.currency,
        cancel_at_period_end: subscription.cancel_at_period_end,
      });

    if (error) {
      console.error('Error creating subscription record:', error);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionCreated:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription, supabase: any) {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date(),
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Error updating subscription record:', error);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionUpdated:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription, supabase: any) {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
        updated_at: new Date(),
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Error canceling subscription record:', error);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionDeleted:', error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice, supabase: any) {
  try {
    if (invoice.subscription) {
      // Update subscription status if payment succeeded
      const { error } = await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          updated_at: new Date(),
        })
        .eq('stripe_subscription_id', invoice.subscription);

      if (error) {
        console.error('Error updating subscription after payment:', error);
      }
    }
  } catch (error) {
    console.error('Error in handleInvoicePaymentSucceeded:', error);
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice, supabase: any) {
  try {
    if (invoice.subscription) {
      // Mark subscription as past due or handle failed payment
      const { error } = await supabase
        .from('subscriptions')
        .update({
          status: 'past_due',
          updated_at: new Date(),
        })
        .eq('stripe_subscription_id', invoice.subscription);

      if (error) {
        console.error('Error updating subscription after failed payment:', error);
      }
    }
  } catch (error) {
    console.error('Error in handleInvoicePaymentFailed:', error);
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    switch (event.type) {
      case 'setup_intent.succeeded': {
        const setupIntent = event.data.object as Stripe.SetupIntent;

        if (setupIntent.payment_method) {
          const paymentMethod = await stripe.paymentMethods.retrieve(
            setupIntent.payment_method as string
          );

          if (paymentMethod.customer) {
            const customer = await stripe.customers.retrieve(paymentMethod.customer as string) as Stripe.Customer;
            const supabaseUserId = customer.metadata?.supabase_user_id;

            if (supabaseUserId && paymentMethod.card) {
              // Save payment method to database
              const { error } = await supabase
                .from('payment_methods')
                .insert({
                  user_id: supabaseUserId,
                  stripe_pm_id: paymentMethod.id,
                  last4: paymentMethod.card.last4,
                  brand: paymentMethod.card.brand,
                  exp_month: paymentMethod.card.exp_month,
                  exp_year: paymentMethod.card.exp_year,
                });

              if (error) {
                console.error('Error saving payment method:', error);
              }
            }
          }
        }
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;

        if (userId && session.payment_intent) {
          // Mark the order as paid in your database
          const { error } = await supabase
            .from('orders')
            .update({ status: 'paid', paid_at: new Date().toISOString() })
            .eq('stripe_session_id', session.id);

          if (error) {
            console.error('Error updating order status:', error);
          }
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription, supabase);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription, supabase);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription, supabase);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice, supabase);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice, supabase);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id, paymentIntent.last_payment_error?.message);
        // Handle failed payment - could send notification, update order status, etc.
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
