import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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
