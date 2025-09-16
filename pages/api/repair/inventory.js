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
        return await getInventory(req, res);
      case 'POST':
        return await createInventoryItem(req, res);
      case 'PUT':
        return await updateInventoryItem(req, res);
      case 'DELETE':
        return await deleteInventoryItem(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Inventory API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Get inventory items with filtering and search
async function getInventory(req, res) {
  const {
    category,
    brand,
    status = 'active',
    low_stock = false,
    search,
    limit = 50,
    offset = 0,
    sort_by = 'name',
    sort_order = 'asc'
  } = req.query;

  try {
    let query = supabase
      .from('inventory_items')
      .select(`
        *,
        category:inventory_categories(*),
        supplier:suppliers(*),
        stock_movements(*)
      `)
      .eq('status', status)
      .order(sort_by, { ascending: sort_order === 'asc' })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (category) query = query.eq('category_id', category);
    if (brand) query = query.ilike('brand', `%${brand}%`);

    // Low stock filter
    if (low_stock === 'true') {
      query = query.lte('current_stock', supabase.raw('min_stock_level'));
    }

    // Search functionality
    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%,description.ilike.%${search}%,brand.ilike.%${search}%`);
    }

    const { data: items, error, count } = await query;

    if (error) throw error;

    // Get low stock alerts
    const lowStockItems = items.filter(item =>
      item.current_stock <= item.min_stock_level
    );

    return res.status(200).json({
      success: true,
      data: items,
      total: count,
      lowStockCount: lowStockItems.length,
      lowStockItems: lowStockItems.slice(0, 10), // Return first 10 low stock items
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

  } catch (error) {
    console.error('Error fetching inventory:', error);
    return res.status(500).json({ error: 'Failed to fetch inventory' });
  }
}

// Create new inventory item
async function createInventoryItem(req, res) {
  const {
    name,
    sku,
    description,
    category_id,
    brand,
    model,
    current_stock = 0,
    min_stock_level = 5,
    max_stock_level = 100,
    unit_cost = 0,
    selling_price = 0,
    supplier_id,
    location,
    barcode,
    serial_required = false,
    warranty_period,
    specifications = {},
    notes
  } = req.body;

  try {
    // Validate required fields
    if (!name || !sku) {
      return res.status(400).json({
        error: 'Name and SKU are required'
      });
    }

    // Check if SKU already exists
    const { data: existingItem } = await supabase
      .from('inventory_items')
      .select('id')
      .eq('sku', sku)
      .single();

    if (existingItem) {
      return res.status(400).json({
        error: 'SKU already exists'
      });
    }

    // Create inventory item
    const { data: item, error } = await supabase
      .from('inventory_items')
      .insert({
        name,
        sku,
        description,
        category_id,
        brand,
        model,
        current_stock,
        min_stock_level,
        max_stock_level,
        unit_cost,
        selling_price,
        supplier_id,
        location,
        barcode,
        serial_required,
        warranty_period,
        specifications: JSON.stringify(specifications),
        notes,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // Create initial stock movement if stock > 0
    if (current_stock > 0) {
      await supabase
        .from('inventory_movements')
        .insert({
          item_id: item.id,
          movement_type: 'initial',
          quantity: current_stock,
          reference_type: 'manual',
          reference_id: null,
          notes: 'Initial stock entry',
          created_by: 'system',
          created_at: new Date().toISOString()
        });
    }

    return res.status(201).json({
      success: true,
      data: item,
      message: 'Inventory item created successfully'
    });

  } catch (error) {
    console.error('Error creating inventory item:', error);
    return res.status(500).json({ error: 'Failed to create inventory item' });
  }
}

// Update inventory item
async function updateInventoryItem(req, res) {
  const { id } = req.query;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Inventory item ID is required' });
  }

  try {
    // Handle stock adjustments
    if (updates.stock_adjustment) {
      const { quantity, reason, reference_type, reference_id } = updates.stock_adjustment;

      // Create stock movement record
      await supabase
        .from('inventory_movements')
        .insert({
          item_id: id,
          movement_type: quantity > 0 ? 'stock_in' : 'stock_out',
          quantity: Math.abs(quantity),
          reference_type: reference_type || 'manual',
          reference_id,
          notes: reason || 'Stock adjustment',
          created_by: updates.updated_by || 'system',
          created_at: new Date().toISOString()
        });

      // Update current stock
      const { data: currentItem } = await supabase
        .from('inventory_items')
        .select('current_stock')
        .eq('id', id)
        .single();

      updates.current_stock = (currentItem.current_stock || 0) + quantity;
      delete updates.stock_adjustment;
    }

    // Update item
    const { data: item, error } = await supabase
      .from('inventory_items')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Check for low stock alerts
    if (item.current_stock <= item.min_stock_level) {
      await createLowStockAlert(item);
    }

    return res.status(200).json({
      success: true,
      data: item,
      message: 'Inventory item updated successfully'
    });

  } catch (error) {
    console.error('Error updating inventory item:', error);
    return res.status(500).json({ error: 'Failed to update inventory item' });
  }
}

// Delete inventory item (soft delete)
async function deleteInventoryItem(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Inventory item ID is required' });
  }

  try {
    // Soft delete by updating status
    const { data: item, error } = await supabase
      .from('inventory_items')
      .update({
        status: 'inactive',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data: item,
      message: 'Inventory item deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return res.status(500).json({ error: 'Failed to delete inventory item' });
  }
}

// Create low stock alert
async function createLowStockAlert(item) {
  try {
    await supabase
      .from('inventory_alerts')
      .insert({
        item_id: item.id,
        alert_type: 'low_stock',
        message: `Low stock alert: ${item.name} (${item.sku}) has ${item.current_stock} units remaining`,
        severity: item.current_stock === 0 ? 'critical' : 'warning',
        status: 'active',
        created_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Error creating low stock alert:', error);
  }
}

// Bulk inventory operations
export async function bulkUpdateInventory(req, res) {
  const { operations } = req.body;

  if (!Array.isArray(operations)) {
    return res.status(400).json({ error: 'Operations must be an array' });
  }

  try {
    const results = [];

    for (const operation of operations) {
      const { id, updates } = operation;

      const { data: item, error } = await supabase
        .from('inventory_items')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        results.push({ id, success: false, error: error.message });
      } else {
        results.push({ id, success: true, data: item });
      }
    }

    return res.status(200).json({
      success: true,
      results,
      message: 'Bulk inventory update completed'
    });

  } catch (error) {
    console.error('Error in bulk inventory update:', error);
    return res.status(500).json({ error: 'Failed to perform bulk update' });
  }
}

// Get inventory reports
export async function getInventoryReports(req, res) {
  const { type, start_date, end_date } = req.query;

  try {
    let query;

    switch (type) {
      case 'low_stock':
        query = supabase
          .from('inventory_items')
          .select('*')
          .lte('current_stock', supabase.raw('min_stock_level'))
          .eq('status', 'active');
        break;

      case 'out_of_stock':
        query = supabase
          .from('inventory_items')
          .select('*')
          .eq('current_stock', 0)
          .eq('status', 'active');
        break;

      case 'movements':
        query = supabase
          .from('inventory_movements')
          .select(`
            *,
            item:inventory_items(name, sku, brand)
          `)
          .gte('created_at', start_date)
          .lte('created_at', end_date)
          .order('created_at', { ascending: false });
        break;

      case 'valuation':
        query = supabase
          .from('inventory_items')
          .select('*')
          .eq('status', 'active');
        break;

      default:
        return res.status(400).json({ error: 'Invalid report type' });
    }

    const { data: reportData, error } = await query;

    if (error) throw error;

    // Calculate additional metrics for valuation report
    if (type === 'valuation') {
      const totalValue = reportData.reduce((sum, item) =>
        sum + (item.current_stock * item.unit_cost), 0
      );

      const totalItems = reportData.reduce((sum, item) =>
        sum + item.current_stock, 0
      );

      return res.status(200).json({
        success: true,
        data: reportData,
        summary: {
          totalValue,
          totalItems,
          averageValue: totalItems > 0 ? totalValue / totalItems : 0
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: reportData
    });

  } catch (error) {
    console.error('Error generating inventory report:', error);
    return res.status(500).json({ error: 'Failed to generate report' });
  }
}
