import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return await getInvoices(req, res);
      case 'POST':
        return await createInvoice(req, res);
      case 'PUT':
        return await updateInvoice(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Invoices API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Get invoices with filtering
async function getInvoices(req, res) {
  const {
    status,
    customer_id,
    repair_order_id,
    date_from,
    date_to,
    limit = 50,
    offset = 0
  } = req.query;

  try {
    let query = supabase
      .from('invoices')
      .select(`
        *,
        customer:customers(*),
        repair_order:repair_orders(*),
        payments:invoice_payments(*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) query = query.eq('status', status);
    if (customer_id) query = query.eq('customer_id', customer_id);
    if (repair_order_id) query = query.eq('repair_order_id', repair_order_id);
    if (date_from) query = query.gte('created_at', date_from);
    if (date_to) query = query.lte('created_at', date_to);

    const { data: invoices, error, count } = await query;

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data: invoices,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

  } catch (error) {
    console.error('Error fetching invoices:', error);
    return res.status(500).json({ error: 'Failed to fetch invoices' });
  }
}

// Create invoice for repair order
async function createInvoice(req, res) {
  const {
    repair_order_id,
    customer_id,
    items,
    notes,
    due_date,
    tax_rate = 5 // UAE VAT rate
  } = req.body;

  try {
    // Validate required fields
    if (!repair_order_id || !customer_id || !items || items.length === 0) {
      return res.status(400).json({
        error: 'Repair order ID, customer ID, and items are required'
      });
    }

    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber();

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const taxAmount = subtotal * (tax_rate / 100);
    const total = subtotal + taxAmount;

    // Create invoice
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        invoice_number: invoiceNumber,
        repair_order_id,
        customer_id,
        subtotal,
        tax_rate,
        tax_amount: taxAmount,
        total,
        status: 'pending',
        due_date: due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    // Add invoice items
    const invoiceItems = items.map(item => ({
      invoice_id: invoice.id,
      item_name: item.name,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.quantity * item.unit_price
    }));

    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(invoiceItems);

    if (itemsError) throw itemsError;

    // Update repair order status
    await supabase
      .from('repair_orders')
      .update({
        status: 'invoiced',
        updated_at: new Date().toISOString()
      })
      .eq('id', repair_order_id);

    return res.status(201).json({
      success: true,
      data: invoice,
      message: 'Invoice created successfully'
    });

  } catch (error) {
    console.error('Error creating invoice:', error);
    return res.status(500).json({ error: 'Failed to create invoice' });
  }
}

// Update invoice
async function updateInvoice(req, res) {
  const { id } = req.query;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Invoice ID is required' });
  }

  try {
    // Update invoice
    const { data: invoice, error } = await supabase
      .from('invoices')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data: invoice,
      message: 'Invoice updated successfully'
    });

  } catch (error) {
    console.error('Error updating invoice:', error);
    return res.status(500).json({ error: 'Failed to update invoice' });
  }
}

// Generate unique invoice number
async function generateInvoiceNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // Get count of invoices for today
  const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();

  const { count } = await supabase
    .from('invoices')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay);

  const sequence = (count + 1).toString().padStart(4, '0');
  return `INV${year}${month}${day}${sequence}`;
}

// Invoice payment processing
export async function processInvoicePayment(req, res) {
  const { invoice_id, payment_method, amount, reference } = req.body;

  try {
    // Get invoice details
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoice_id)
      .single();

    if (invoiceError) throw invoiceError;

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('invoice_payments')
      .insert({
        invoice_id,
        amount,
        payment_method,
        reference,
        status: 'completed',
        payment_date: new Date().toISOString(),
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    // Update invoice status
    let newStatus = 'paid';
    if (amount < invoice.total) {
      newStatus = 'partially_paid';
    }

    await supabase
      .from('invoices')
      .update({
        status: newStatus,
        paid_amount: (invoice.paid_amount || 0) + amount,
        updated_at: new Date().toISOString()
      })
      .eq('id', invoice_id);

    return res.status(200).json({
      success: true,
      data: payment,
      message: 'Payment processed successfully'
    });

  } catch (error) {
    console.error('Error processing invoice payment:', error);
    return res.status(500).json({ error: 'Failed to process payment' });
  }
}

// Generate PDF invoice (framework ready)
export async function generateInvoicePDF(req, res) {
  const { invoice_id } = req.query;

  try {
    // Get invoice with all details
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select(`
        *,
        customer:customers(*),
        items:invoice_items(*),
        repair_order:repair_orders(*)
      `)
      .eq('id', invoice_id)
      .single();

    if (error) throw error;

    // In a real implementation, you would use a PDF library like pdfkit or puppeteer
    // to generate the PDF. For now, we'll return the data structure.

    const pdfData = {
      invoice: invoice,
      company: {
        name: 'Nexus Tech Hub',
        address: 'Dubai, UAE',
        phone: '+971-XX-XXX-XXXX',
        email: 'info@nexustechhub.ae',
        vat: '123456789'
      },
      customer: invoice.customer,
      items: invoice.items,
      totals: {
        subtotal: invoice.subtotal,
        tax: invoice.tax_amount,
        total: invoice.total
      }
    };

    return res.status(200).json({
      success: true,
      data: pdfData,
      message: 'PDF data generated successfully'
    });

  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
}

// Send invoice via email
export async function sendInvoiceEmail(req, res) {
  const { invoice_id, email } = req.body;

  try {
    // Get invoice details
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select(`
        *,
        customer:customers(*),
        items:invoice_items(*)
      `)
      .eq('id', invoice_id)
      .single();

    if (error) throw error;

    // Send email (framework ready - integrate with SendGrid, etc.)
    console.log('Sending invoice email to:', email || invoice.customer.email);

    const emailData = {
      to: email || invoice.customer.email,
      subject: `Invoice ${invoice.invoice_number} - Nexus Tech Hub`,
      invoice: invoice,
      customer: invoice.customer,
      items: invoice.items
    };

    // TODO: Integrate with email service
    // await sendgrid.send(emailData);

    return res.status(200).json({
      success: true,
      message: 'Invoice email sent successfully'
    });

  } catch (error) {
    console.error('Error sending invoice email:', error);
    return res.status(500).json({ error: 'Failed to send invoice email' });
  }
}

// Invoice analytics and reporting
export async function getInvoiceAnalytics(req, res) {
  const { period = '30d' } = req.query;

  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }

    // Get invoice metrics
    const { data: invoices, error } = await supabase
      .from('invoices')
      .select('total, status, created_at')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (error) throw error;

    // Calculate analytics
    const analytics = {
      period,
      totalInvoices: invoices.length,
      totalRevenue: invoices.reduce((sum, inv) => sum + inv.total, 0),
      paidInvoices: invoices.filter(inv => inv.status === 'paid').length,
      pendingInvoices: invoices.filter(inv => inv.status === 'pending').length,
      overdueInvoices: invoices.filter(inv => {
        return inv.status === 'pending' &&
               new Date(inv.created_at) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      }).length,
      averageInvoiceValue: invoices.length > 0 ?
        invoices.reduce((sum, inv) => sum + inv.total, 0) / invoices.length : 0
    };

    return res.status(200).json({
      success: true,
      data: analytics
    });

  } catch (error) {
    console.error('Error generating invoice analytics:', error);
    return res.status(500).json({ error: 'Failed to generate analytics' });
  }
}

// Overdue invoices reminder
export async function sendOverdueReminders(req, res) {
  try {
    // Get overdue invoices (pending for more than 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data: overdueInvoices, error } = await supabase
      .from('invoices')
      .select(`
        *,
        customer:customers(*)
      `)
      .eq('status', 'pending')
      .lt('created_at', thirtyDaysAgo);

    if (error) throw error;

    // Send reminders (framework ready)
    for (const invoice of overdueInvoices) {
      console.log('Sending overdue reminder for invoice:', invoice.invoice_number);

      // TODO: Integrate with email service
      // await sendOverdueReminderEmail(invoice);
    }

    return res.status(200).json({
      success: true,
      message: `Sent reminders for ${overdueInvoices.length} overdue invoices`,
      count: overdueInvoices.length
    });

  } catch (error) {
    console.error('Error sending overdue reminders:', error);
    return res.status(500).json({ error: 'Failed to send reminders' });
  }
}
