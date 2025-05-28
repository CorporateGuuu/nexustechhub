// Enhanced Stripe Webhook Handler for UAE Market - Nexus TechHub
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Disable body parsing for webhook
export const config = {
  api: {
    bodyParser: false,
  },
};

// Send notification to third-party services
async function sendNotifications(eventType, data) {
  const notifications = [];

  // Send to Slack webhook
  if (process.env.SLACK_WEBHOOK_URL) {
    notifications.push(
      fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🛒 Nexus TechHub Payment Event: ${eventType}`,
          attachments: [{
            color: eventType.includes('succeeded') ? 'good' : 'warning',
            fields: [
              { title: 'Event', value: eventType, short: true },
              { title: 'Amount', value: `${data.amount || 0} AED`, short: true },
              { title: 'Customer', value: data.customer_email || 'Unknown', short: true },
              { title: 'Time', value: new Date().toISOString(), short: true }
            ]
          }]
        })
      }).catch(console.error)
    );
  }

  // Send to Zapier webhook
  if (process.env.ZAPIER_WEBHOOK_URL) {
    notifications.push(
      fetch(process.env.ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: eventType,
          business: 'nexus-techhub',
          market: 'uae',
          timestamp: new Date().toISOString(),
          ...data
        })
      }).catch(console.error)
    );
  }

  await Promise.allSettled(notifications);
}

// Process successful payment
async function processSuccessfulPayment(session) {
  try {
    console.log(`✅ Processing successful payment: ${session.id}`);

    // Extract order information
    const orderData = {
      sessionId: session.id,
      paymentIntentId: session.payment_intent,
      customerId: session.customer,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
      customerPhone: session.customer_details?.phone,
      amount: session.amount_total / 100, // Convert from fils to AED
      currency: session.currency,
      paymentStatus: session.payment_status,
      shippingAddress: session.shipping_details?.address,
      billingAddress: session.customer_details?.address,
      metadata: session.metadata,
      createdAt: new Date(session.created * 1000).toISOString()
    };

    // Store order in database (implement your database logic here)
    // await storeOrder(orderData);

    // Send confirmation email to customer
    if (orderData.customerEmail) {
      await sendOrderConfirmationEmail(orderData);
    }

    // Send notifications
    await sendNotifications('payment.succeeded', {
      amount: orderData.amount,
      customer_email: orderData.customerEmail,
      order_id: session.id,
      payment_intent: orderData.paymentIntentId
    });

    // Update inventory (implement your inventory logic here)
    // await updateInventory(orderData);

    console.log(`📧 Order confirmation sent to: ${orderData.customerEmail}`);
    return orderData;

  } catch (error) {
    console.error('❌ Failed to process successful payment:', error);
    throw error;
  }
}

// Send order confirmation email
async function sendOrderConfirmationEmail(orderData) {
  try {
    const emailData = {
      to: orderData.customerEmail,
      subject: `Order Confirmation - Nexus TechHub #${orderData.sessionId.slice(-8)}`,
      template: 'order-confirmation',
      data: {
        customerName: orderData.customerName,
        orderNumber: orderData.sessionId.slice(-8),
        amount: orderData.amount,
        currency: orderData.currency.toUpperCase(),
        paymentMethod: 'Credit Card',
        shippingAddress: orderData.shippingAddress,
        businessInfo: {
          name: 'Nexus TechHub',
          phone: '+971 58 553 1029',
          email: 'info@nexustechhub.ae',
          website: 'https://nexustechhub.netlify.app'
        }
      }
    };

    // Send email using your email service
    // await sendEmail(emailData);
    
    console.log(`📧 Order confirmation email queued for: ${orderData.customerEmail}`);
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
  }
}

// Handle failed payment
async function handleFailedPayment(session) {
  try {
    console.log(`❌ Processing failed payment: ${session.id}`);

    const failureData = {
      sessionId: session.id,
      customerEmail: session.customer_details?.email,
      amount: session.amount_total / 100,
      currency: session.currency,
      failureReason: session.payment_intent?.last_payment_error?.message || 'Unknown error'
    };

    // Send notifications
    await sendNotifications('payment.failed', failureData);

    // Log for analytics
    console.log(`💳 Payment failed: ${failureData.failureReason}`);

  } catch (error) {
    console.error('❌ Failed to handle payment failure:', error);
  }
}

// Handle refund
async function handleRefund(refund) {
  try {
    console.log(`💰 Processing refund: ${refund.id}`);

    const refundData = {
      refundId: refund.id,
      paymentIntentId: refund.payment_intent,
      amount: refund.amount / 100,
      currency: refund.currency,
      reason: refund.reason,
      status: refund.status
    };

    // Send notifications
    await sendNotifications('refund.created', refundData);

    // Update order status in database
    // await updateOrderStatus(refundData.paymentIntentId, 'refunded');

    console.log(`💰 Refund processed: ${refundData.amount} ${refundData.currency.toUpperCase()}`);

  } catch (error) {
    console.error('❌ Failed to handle refund:', error);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    console.log(`🔔 Webhook received: ${event.type}`);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        if (session.payment_status === 'paid') {
          await processSuccessfulPayment(session);
        } else {
          console.log(`⏳ Payment pending for session: ${session.id}`);
        }
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object;
        console.log(`⏰ Checkout session expired: ${expiredSession.id}`);
        
        await sendNotifications('session.expired', {
          session_id: expiredSession.id,
          customer_email: expiredSession.customer_details?.email
        });
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`✅ Payment intent succeeded: ${paymentIntent.id}`);
        
        await sendNotifications('payment_intent.succeeded', {
          payment_intent_id: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency
        });
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log(`❌ Payment intent failed: ${failedPayment.id}`);
        
        await sendNotifications('payment_intent.failed', {
          payment_intent_id: failedPayment.id,
          amount: failedPayment.amount / 100,
          currency: failedPayment.currency,
          error: failedPayment.last_payment_error?.message
        });
        break;

      case 'charge.succeeded':
        const charge = event.data.object;
        console.log(`💳 Charge succeeded: ${charge.id}`);
        break;

      case 'charge.failed':
        const failedCharge = event.data.object;
        console.log(`💳 Charge failed: ${failedCharge.id}`);
        break;

      case 'refund.created':
        const refund = event.data.object;
        await handleRefund(refund);
        break;

      case 'customer.created':
        const customer = event.data.object;
        console.log(`👤 Customer created: ${customer.id}`);
        
        await sendNotifications('customer.created', {
          customer_id: customer.id,
          email: customer.email,
          name: customer.name
        });
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log(`📄 Invoice payment succeeded: ${invoice.id}`);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log(`📄 Invoice payment failed: ${failedInvoice.id}`);
        break;

      default:
        console.log(`🔔 Unhandled event type: ${event.type}`);
    }

    // Respond to Stripe
    res.status(200).json({ 
      received: true,
      event_type: event.type,
      processed_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    
    // Send error notification
    await sendNotifications('webhook.error', {
      event_type: event.type,
      error_message: error.message,
      event_id: event.id
    });

    res.status(500).json({ 
      error: 'Webhook processing failed',
      event_type: event.type
    });
  }
}
