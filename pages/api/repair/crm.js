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
        return await getCustomers(req, res);
      case 'POST':
        return await createCustomer(req, res);
      case 'PUT':
        return await updateCustomer(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('CRM API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Get customers with filtering and search
async function getCustomers(req, res) {
  const {
    search,
    status = 'active',
    segment,
    limit = 50,
    offset = 0,
    sort_by = 'created_at',
    sort_order = 'desc'
  } = req.query;

  try {
    let query = supabase
      .from('customers')
      .select(`
        *,
        orders:repair_orders(count),
        interactions:customer_interactions(count),
        total_spent:repair_orders(sum:total_cost)
      `)
      .eq('status', status)
      .order(sort_by, { ascending: sort_order === 'asc' })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (segment) query = query.eq('segment', segment);

    // Search functionality
    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    const { data: customers, error, count } = await query;

    if (error) throw error;

    // Calculate customer metrics
    const customersWithMetrics = customers.map(customer => ({
      ...customer,
      totalOrders: customer.orders?.[0]?.count || 0,
      totalSpent: customer.total_spent?.[0]?.sum || 0,
      lastInteraction: customer.interactions?.[0]?.count || 0
    }));

    return res.status(200).json({
      success: true,
      data: customersWithMetrics,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

  } catch (error) {
    console.error('Error fetching customers:', error);
    return res.status(500).json({ error: 'Failed to fetch customers' });
  }
}

// Create new customer
async function createCustomer(req, res) {
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    emirate,
    postal_code,
    date_of_birth,
    gender,
    segment = 'regular',
    source = 'website',
    notes,
    preferences = {}
  } = req.body;

  try {
    // Validate required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({
        error: 'First name, last name, and email are required'
      });
    }

    // Check if customer already exists
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingCustomer) {
      return res.status(400).json({
        error: 'Customer with this email already exists'
      });
    }

    // Create customer
    const { data: customer, error } = await supabase
      .from('customers')
      .insert({
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        emirate,
        postal_code,
        date_of_birth,
        gender,
        segment,
        source,
        notes,
        preferences: JSON.stringify(preferences),
        status: 'active',
        total_orders: 0,
        total_spent: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // Create welcome interaction
    await supabase
      .from('customer_interactions')
      .insert({
        customer_id: customer.id,
        type: 'system',
        subject: 'Customer Account Created',
        description: 'New customer account created via website',
        created_by: 'system',
        created_at: new Date().toISOString()
      });

    return res.status(201).json({
      success: true,
      data: customer,
      message: 'Customer created successfully'
    });

  } catch (error) {
    console.error('Error creating customer:', error);
    return res.status(500).json({ error: 'Failed to create customer' });
  }
}

// Update customer
async function updateCustomer(req, res) {
  const { id } = req.query;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

  try {
    // Update customer
    const { data: customer, error } = await supabase
      .from('customers')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log interaction if significant update
    if (updates.notes || updates.segment || updates.status) {
      await supabase
        .from('customer_interactions')
        .insert({
          customer_id: id,
          type: 'update',
          subject: 'Customer Profile Updated',
          description: 'Customer information was updated',
          created_by: updates.updated_by || 'system',
          created_at: new Date().toISOString()
        });
    }

    return res.status(200).json({
      success: true,
      data: customer,
      message: 'Customer updated successfully'
    });

  } catch (error) {
    console.error('Error updating customer:', error);
    return res.status(500).json({ error: 'Failed to update customer' });
  }
}

// Customer interactions API
export async function getCustomerInteractions(req, res) {
  const { customer_id } = req.query;
  const { limit = 20, offset = 0 } = req.query;

  if (!customer_id) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

  try {
    const { data: interactions, error, count } = await supabase
      .from('customer_interactions')
      .select('*')
      .eq('customer_id', customer_id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data: interactions,
      total: count
    });

  } catch (error) {
    console.error('Error fetching customer interactions:', error);
    return res.status(500).json({ error: 'Failed to fetch interactions' });
  }
}

export async function createCustomerInteraction(req, res) {
  const {
    customer_id,
    type,
    subject,
    description,
    created_by,
    metadata = {}
  } = req.body;

  try {
    const { data: interaction, error } = await supabase
      .from('customer_interactions')
      .insert({
        customer_id,
        type,
        subject,
        description,
        metadata: JSON.stringify(metadata),
        created_by,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      data: interaction,
      message: 'Interaction logged successfully'
    });

  } catch (error) {
    console.error('Error creating customer interaction:', error);
    return res.status(500).json({ error: 'Failed to log interaction' });
  }
}

// Customer analytics and insights
export async function getCustomerAnalytics(req, res) {
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

    // Get customer metrics
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('created_at, segment, source, status')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (customersError) throw customersError;

    // Get order metrics
    const { data: orders, error: ordersError } = await supabase
      .from('repair_orders')
      .select('total_cost, created_at, customer_id')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (ordersError) throw ordersError;

    // Calculate analytics
    const analytics = {
      period,
      newCustomers: customers.length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + (order.total_cost || 0), 0),
      averageOrderValue: orders.length > 0 ?
        orders.reduce((sum, order) => sum + (order.total_cost || 0), 0) / orders.length : 0,
      customerSegments: {},
      customerSources: {},
      retentionRate: 0 // Would need more complex calculation
    };

    // Segment breakdown
    customers.forEach(customer => {
      analytics.customerSegments[customer.segment] =
        (analytics.customerSegments[customer.segment] || 0) + 1;
      analytics.customerSources[customer.source] =
        (analytics.customerSources[customer.source] || 0) + 1;
    });

    return res.status(200).json({
      success: true,
      data: analytics
    });

  } catch (error) {
    console.error('Error generating customer analytics:', error);
    return res.status(500).json({ error: 'Failed to generate analytics' });
  }
}

// Customer segmentation
export async function updateCustomerSegments(req, res) {
  try {
    // Get all customers with their order history
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select(`
        id,
        total_spent,
        total_orders,
        created_at,
        orders:repair_orders(count)
      `);

    if (customersError) throw customersError;

    const updates = [];

    customers.forEach(customer => {
      const orderCount = customer.orders?.[0]?.count || 0;
      const totalSpent = customer.total_spent || 0;
      const accountAge = Date.now() - new Date(customer.created_at).getTime();
      const accountAgeDays = accountAge / (1000 * 60 * 60 * 24);

      let newSegment = 'regular';

      // VIP: High spenders with many orders
      if (totalSpent > 1000 && orderCount > 5) {
        newSegment = 'vip';
      }
      // Premium: Moderate spenders
      else if (totalSpent > 500 || orderCount > 3) {
        newSegment = 'premium';
      }
      // New: Recent customers
      else if (accountAgeDays < 30) {
        newSegment = 'new';
      }
      // Inactive: Old customers with no recent orders
      else if (accountAgeDays > 180 && orderCount === 0) {
        newSegment = 'inactive';
      }

      if (customer.segment !== newSegment) {
        updates.push({
          id: customer.id,
          segment: newSegment,
          updated_at: new Date().toISOString()
        });
      }
    });

    // Bulk update segments
    if (updates.length > 0) {
      const { error: updateError } = await supabase
        .from('customers')
        .upsert(updates, { onConflict: 'id' });

      if (updateError) throw updateError;
    }

    return res.status(200).json({
      success: true,
      message: `Updated segments for ${updates.length} customers`,
      updates: updates.length
    });

  } catch (error) {
    console.error('Error updating customer segments:', error);
    return res.status(500).json({ error: 'Failed to update customer segments' });
  }
}

// Customer communication preferences
export async function updateCustomerPreferences(req, res) {
  const { customer_id } = req.query;
  const { preferences } = req.body;

  if (!customer_id) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

  try {
    const { data: customer, error } = await supabase
      .from('customers')
      .update({
        preferences: JSON.stringify(preferences),
        updated_at: new Date().toISOString()
      })
      .eq('id', customer_id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data: customer,
      message: 'Customer preferences updated successfully'
    });

  } catch (error) {
    console.error('Error updating customer preferences:', error);
    return res.status(500).json({ error: 'Failed to update preferences' });
  }
}
