import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Supabase client for storing order data
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Disable body parsing for webhook
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  try {
    // Handle different webhook events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handleCheckoutSessionCompleted(session) {
  console.log('Processing checkout.session.completed:', session.id);

  try {
    // Extract order data from session
    const metadata = session.metadata || {};
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Create order record in database
    const orderData = {
      stripe_session_id: session.id,
      order_number: session.id.slice(-8).toUpperCase(),
      customer_name: metadata.customerName || 'Customer',
      customer_email: metadata.customerEmail || session.customer_details?.email || '',
      customer_phone: metadata.customerPhone || session.customer_details?.phone || '',
      status: 'confirmed',
      payment_status: session.payment_status,
      currency: session.currency,
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: session.amount_total / 100, // Convert from cents
      shipping_address: metadata.shippingAddress || null,
      billing_address: metadata.billingAddress || null,
      payment_method: session.payment_method_types?.[0] || 'card',
      created_at: new Date(session.created * 1000).toISOString(),
      updated_at: new Date().toISOString()
    };

    // Calculate amounts from line items
    const items = [];
    for (const item of lineItems.data) {
      const amount = item.amount_total / 100;

      if (item.description?.toLowerCase().includes('shipping')) {
        orderData.shipping = amount;
      } else if (item.description?.toLowerCase().includes('vat') || item.description?.toLowerCase().includes('tax')) {
        orderData.tax = amount;
      } else {
        orderData.subtotal += amount;
        items.push({
          stripe_line_item_id: item.id,
          product_name: item.description || item.price?.product_data?.name || 'Product',
          quantity: item.quantity,
          unit_price: item.amount_unit / 100,
          total_price: amount,
          product_image: item.price?.product_data?.images?.[0] || null
        });
      }
    }

    // Insert order into database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error('Error inserting order:', orderError);
      throw orderError;
    }

    // Insert order items
    if (items.length > 0) {
      const orderItemsData = items.map(item => ({
        order_id: order.id,
        ...item
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsData);

      if (itemsError) {
        console.error('Error inserting order items:', itemsError);
        throw itemsError;
      }
    }

    // Send order confirmation email
    await sendOrderConfirmationEmail(order, items);

    // Create shipment record
    await createShipment(order);

    console.log('Order processed successfully:', order.id);

  } catch (error) {
    console.error('Error processing checkout session:', error);
    throw error;
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);

  // Update order payment status if needed
  const { error } = await supabase
    .from('orders')
    .update({
      payment_status: 'paid',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_session_id', paymentIntent.metadata?.sessionId);

  if (error) {
    console.error('Error updating payment status:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent) {
  console.log('Payment failed:', paymentIntent.id);

  // Update order payment status
  const { error } = await supabase
    .from('orders')
    .update({
      payment_status: 'failed',
      status: 'cancelled',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_session_id', paymentIntent.metadata?.sessionId);

  if (error) {
    console.error('Error updating payment status:', error);
  }
}

async function sendOrderConfirmationEmail(order, items) {
  try {
    // This would integrate with your email service (SendGrid, etc.)
    console.log('Sending order confirmation email to:', order.customer_email);

    // For now, just log the email details
    const emailData = {
      to: order.customer_email,
      subject: `Order Confirmation - ${order.order_number}`,
      order: order,
      items: items
    };

    console.log('Email data:', emailData);

    // TODO: Integrate with actual email service
    // await sendgrid.send(emailData);

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error here as it's not critical for order processing
  }
}

async function createShipment(order) {
  try {
    // Create shipment record
    const shipmentData = {
      order_id: order.id,
      tracking_number: generateTrackingNumber(),
      carrier: 'DHL', // Default carrier
      status: 'processing',
      estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      shipping_address: order.shipping_address,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: shipment, error } = await supabase
      .from('shipments')
      .insert(shipmentData)
      .select()
      .single();

    if (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }

    console.log('Shipment created:', shipment.id);

    // Update order with shipment ID
    await supabase
      .from('orders')
      .update({
        shipment_id: shipment.id,
        status: 'processing',
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

  } catch (error) {
    console.error('Error creating shipment:', error);
    throw error;
  }
}

function generateTrackingNumber() {
  // Generate a random tracking number
  const prefix = 'NXTH';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}
