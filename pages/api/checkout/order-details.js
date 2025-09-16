import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({
        error: 'Session ID is required'
      });
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent']
    });

    if (!session) {
      return res.status(404).json({
        error: 'Checkout session not found'
      });
    }

    // Extract order details from session metadata
    const metadata = session.metadata || {};

    // Parse shipping and billing addresses
    let shippingAddress = null;
    let billingAddress = null;

    try {
      shippingAddress = metadata.shippingAddress ? JSON.parse(metadata.shippingAddress) : null;
      billingAddress = metadata.billingAddress ? JSON.parse(metadata.billingAddress) : null;
    } catch (parseError) {
      console.error('Error parsing address data:', parseError);
    }

    // Calculate totals from line items
    const lineItems = session.line_items?.data || [];
    const subtotal = lineItems.reduce((sum, item) => {
      return sum + (item.amount_total / 100); // Convert from cents
    }, 0);

    // Extract shipping and tax (these are separate line items)
    let shipping = 0;
    let tax = 0;
    const items = [];

    lineItems.forEach(item => {
      const amount = item.amount_total / 100; // Convert from cents

      if (item.description?.toLowerCase().includes('shipping')) {
        shipping = amount;
      } else if (item.description?.toLowerCase().includes('vat') || item.description?.toLowerCase().includes('tax')) {
        tax = amount;
      } else {
        // Regular product item
        items.push({
          id: item.id,
          name: item.description || item.price?.product_data?.name || 'Product',
          price: item.amount_unit / 100, // Unit price in dollars
          quantity: item.quantity,
          total: amount,
          image: item.price?.product_data?.images?.[0] || '/images/products/placeholder.svg'
        });
      }
    });

    const total = subtotal + shipping + tax;

    // Create order object
    const order = {
      orderNumber: session.id.slice(-8).toUpperCase(), // Use last 8 chars of session ID
      sessionId: session.id,
      status: session.payment_status === 'paid' ? 'paid' : 'pending',
      customerName: metadata.customerName || 'Customer',
      customerEmail: metadata.customerEmail || session.customer_details?.email || '',
      customerPhone: metadata.customerPhone || session.customer_details?.phone || '',
      shippingAddress,
      billingAddress,
      items,
      subtotal: subtotal - shipping - tax, // Exclude shipping and tax from subtotal
      shipping,
      tax,
      total,
      currency: session.currency?.toUpperCase() || 'AED',
      paymentMethod: session.payment_method_types?.[0] || 'card',
      createdAt: new Date(session.created * 1000).toISOString(),
      metadata
    };

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Order details retrieval error:', error);
    res.status(500).json({
      error: 'Failed to retrieve order details',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
