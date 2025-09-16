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
        return await getRepairOrders(req, res);
      case 'POST':
        return await createRepairOrder(req, res);
      case 'PUT':
        return await updateRepairOrder(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Repair orders API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Get repair orders with filtering
async function getRepairOrders(req, res) {
  const {
    status,
    customer_id,
    technician_id,
    priority,
    device_type,
    limit = 50,
    offset = 0,
    search
  } = req.query;

  try {
    let query = supabase
      .from('repair_orders')
      .select(`
        *,
        customer:customers(*),
        technician:employees(*),
        items:repair_order_items(*),
        invoices:invoices(*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) query = query.eq('status', status);
    if (customer_id) query = query.eq('customer_id', customer_id);
    if (technician_id) query = query.eq('technician_id', technician_id);
    if (priority) query = query.eq('priority', priority);
    if (device_type) query = query.eq('device_type', device_type);

    // Search functionality
    if (search) {
      query = query.or(`repair_order_number.ilike.%${search}%,customer_name.ilike.%${search}%,device_model.ilike.%${search}%`);
    }

    const { data: orders, error, count } = await query;

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data: orders,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

  } catch (error) {
    console.error('Error fetching repair orders:', error);
    return res.status(500).json({ error: 'Failed to fetch repair orders' });
  }
}

// Create new repair order
async function createRepairOrder(req, res) {
  const {
    customer_id,
    customer_name,
    customer_email,
    customer_phone,
    device_type,
    device_brand,
    device_model,
    device_serial,
    issue_description,
    priority = 'normal',
    estimated_cost,
    technician_id,
    items = [],
    notes
  } = req.body;

  try {
    // Generate repair order number
    const repairOrderNumber = await generateRepairOrderNumber();

    // Create repair order
    const { data: repairOrder, error: orderError } = await supabase
      .from('repair_orders')
      .insert({
        repair_order_number: repairOrderNumber,
        customer_id,
        customer_name,
        customer_email,
        customer_phone,
        device_type,
        device_brand,
        device_model,
        device_serial,
        issue_description,
        priority,
        estimated_cost,
        technician_id,
        status: 'received',
        notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Add repair items if provided
    if (items.length > 0) {
      const repairItems = items.map(item => ({
        repair_order_id: repairOrder.id,
        item_name: item.name,
        quantity: item.quantity,
        unit_cost: item.cost,
        total_cost: item.quantity * item.cost,
        notes: item.notes
      }));

      const { error: itemsError } = await supabase
        .from('repair_order_items')
        .insert(repairItems);

      if (itemsError) throw itemsError;
    }

    // Create initial timeline entry
    await supabase
      .from('repair_timeline')
      .insert({
        repair_order_id: repairOrder.id,
        status: 'received',
        notes: 'Repair order created',
        created_by: 'system',
        created_at: new Date().toISOString()
      });

    // Send confirmation email (framework ready)
    await sendRepairOrderConfirmation(repairOrder);

    return res.status(201).json({
      success: true,
      data: repairOrder,
      message: 'Repair order created successfully'
    });

  } catch (error) {
    console.error('Error creating repair order:', error);
    return res.status(500).json({ error: 'Failed to create repair order' });
  }
}

// Update repair order
async function updateRepairOrder(req, res) {
  const { id } = req.query;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Repair order ID is required' });
  }

  try {
    // Update repair order
    const { data: repairOrder, error } = await supabase
      .from('repair_orders')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Add timeline entry if status changed
    if (updates.status && updates.status !== repairOrder.status) {
      await supabase
        .from('repair_timeline')
        .insert({
          repair_order_id: id,
          status: updates.status,
          notes: updates.status_notes || `Status updated to ${updates.status}`,
          created_by: updates.updated_by || 'system',
          created_at: new Date().toISOString()
        });
    }

    // Send status update notification
    if (updates.status && updates.status !== repairOrder.status) {
      await sendRepairStatusUpdate(repairOrder, updates.status);
    }

    return res.status(200).json({
      success: true,
      data: repairOrder,
      message: 'Repair order updated successfully'
    });

  } catch (error) {
    console.error('Error updating repair order:', error);
    return res.status(500).json({ error: 'Failed to update repair order' });
  }
}

// Generate unique repair order number
async function generateRepairOrderNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // Get count of orders for today
  const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();

  const { count } = await supabase
    .from('repair_orders')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay);

  const sequence = (count + 1).toString().padStart(4, '0');
  return `R${year}${month}${day}${sequence}`;
}

// Email notification functions (framework ready)
async function sendRepairOrderConfirmation(repairOrder) {
  try {
    console.log('Sending repair order confirmation to:', repairOrder.customer_email);
    // TODO: Integrate with email service (SendGrid, etc.)
  } catch (error) {
    console.error('Error sending repair confirmation:', error);
  }
}

async function sendRepairStatusUpdate(repairOrder, newStatus) {
  try {
    console.log('Sending repair status update to:', repairOrder.customer_email);
    // TODO: Integrate with email service (SendGrid, etc.)
  } catch (error) {
    console.error('Error sending status update:', error);
  }
}
