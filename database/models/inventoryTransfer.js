const db = require('../config');

const InventoryTransferModel = {
  // Get all inventory transfers with optional filters and pagination
  async getAllTransfers(filters = {}, page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    // Build WHERE clause based on filters
    let whereClause = '';
    const params = [];
    let paramIndex = 1;

    if (filters.id) {
      whereClause += ` AND transfer_id = $${paramIndex}`;
      params.push(filters.id);
      paramIndex++;
    }

    if (filters.from_store) {
      whereClause += ` AND from_store_id = $${paramIndex}`;
      params.push(filters.from_store);
      paramIndex++;
    }

    if (filters.to_store) {
      whereClause += ` AND to_store_id = $${paramIndex}`;
      params.push(filters.to_store);
      paramIndex++;
    }

    if (filters.status) {
      whereClause += ` AND status = $${paramIndex}`;
      params.push(filters.status);
      paramIndex++;
    }

    if (filters.from_date) {
      whereClause += ` AND transaction_date >= $${paramIndex}`;
      params.push(filters.from_date);
      paramIndex++;
    }

    if (filters.to_date) {
      whereClause += ` AND transaction_date <= $${paramIndex}`;
      params.push(filters.to_date);
      paramIndex++;
    }

    // Remove leading ' AND ' if no filters
    if (whereClause.startsWith(' AND ')) {
      whereClause = ' WHERE ' + whereClause.substring(5);
    }

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM inventory_transfers
      ${whereClause}
    `;
    const countResult = await db.query(countQuery, params);
    const totalRecords = parseInt(countResult.rows[0].total);

    // Get transfers with items
    const query = `
      SELECT
        it.*,
        COALESCE(json_agg(
          json_build_object(
            'name', p.name,
            'sku', p.sku,
            'quantity', iti.quantity,
            'price', iti.price,
            'gst', iti.gst
          )
        ) FILTER (WHERE p.id IS NOT NULL), '[]') as items
      FROM inventory_transfers it
      LEFT JOIN inventory_transfer_items iti ON it.id = iti.transfer_id
      LEFT JOIN products p ON iti.product_id = p.id
      ${whereClause}
      GROUP BY it.id
      ORDER BY it.transaction_date DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    params.push(limit, offset);
    const { rows } = await db.query(query, params);

    // Format the response data
    const formattedTransfers = rows.map(transfer => ({
      id: transfer.id.toString(),
      transfer_id: transfer.transfer_id,
      status: transfer.status,
      created_by: transfer.created_by,
      from_store: transfer.from_store_name,
      to_store: transfer.to_store_name,
      type: transfer.type,
      transaction_date: transfer.transaction_date.toISOString().replace('T', ' ').substring(0, 19),
      items: transfer.items || []
    }));

    // Calculate pagination info
    const totalPages = Math.ceil(totalRecords / limit);
    const nextPageExist = page < totalPages ? 1 : 0;
    const nextPage = nextPageExist ? page + 1 : 0;
    const previousPageExist = page > 1 ? 1 : 0;
    const previousPage = previousPageExist ? page - 1 : 0;

    return {
      transfers: formattedTransfers,
      pagination: {
        page,
        per_page: limit,
        total_records: totalRecords,
        total_pages: totalPages,
        next_page_exist: nextPageExist,
        next_page: nextPage,
        previous_page_exist: previousPageExist,
        previous_page: previousPage
      }
    };
  },

  // Get transfer by ID
  async getTransferById(id) {
    const query = `
      SELECT
        it.*,
        COALESCE(json_agg(
          json_build_object(
            'name', p.name,
            'sku', p.sku,
            'quantity', iti.quantity,
            'price', iti.price,
            'gst', iti.gst
          )
        ) FILTER (WHERE p.id IS NOT NULL), '[]') as items
      FROM inventory_transfers it
      LEFT JOIN inventory_transfer_items iti ON it.id = iti.transfer_id
      LEFT JOIN products p ON iti.product_id = p.id
      WHERE it.id = $1
      GROUP BY it.id
    `;

    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      return null;
    }

    const transfer = rows[0];
    return {
      id: transfer.id.toString(),
      transfer_id: transfer.transfer_id,
      status: transfer.status,
      created_by: transfer.created_by,
      from_store: transfer.from_store_name,
      to_store: transfer.to_store_name,
      type: transfer.type,
      transaction_date: transfer.transaction_date.toISOString().replace('T', ' ').substring(0, 19),
      items: transfer.items || []
    };
  },

  // Create a new inventory transfer
  async createTransfer(transferData) {
    const client = await db.getClient();

    try {
      await client.query('BEGIN');

      // Insert transfer
      const transferQuery = `
        INSERT INTO inventory_transfers (
          transfer_id, status, created_by, from_store_id, to_store_id,
          from_store_name, to_store_name, type, transaction_date
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        ) RETURNING id
      `;

      const transferValues = [
        transferData.transfer_id,
        transferData.status || 'Pending',
        transferData.created_by,
        transferData.from_store_id,
        transferData.to_store_id,
        transferData.from_store_name,
        transferData.to_store_name,
        transferData.type || 'Transaction Out',
        transferData.transaction_date || new Date()
      ];

      const transferResult = await client.query(transferQuery, transferValues);
      const transferId = transferResult.rows[0].id;

      // Insert transfer items
      if (transferData.items && Array.isArray(transferData.items)) {
        for (const item of transferData.items) {
          const itemQuery = `
            INSERT INTO inventory_transfer_items (
              transfer_id, product_id, quantity, price, gst
            ) VALUES (
              $1, $2, $3, $4, $5
            )
          `;

          await client.query(itemQuery, [
            transferId,
            item.product_id,
            item.quantity,
            item.price,
            item.gst || 0
          ]);
        }
      }

      await client.query('COMMIT');

      // Return the created transfer
      return this.getTransferById(transferId);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Update transfer status
  async updateTransferStatus(id, status) {
    const query = `
      UPDATE inventory_transfers
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const { rows } = await db.query(query, [status, id]);

    if (rows.length === 0) {
      throw new Error(`Transfer with ID ${id} not found`);
    }

    return this.getTransferById(id);
  },

  // Validate stock availability for transfer items
  async validateStockForTransfer(transferItems) {
    const insufficientStock = [];

    for (const item of transferItems) {
      const stockQuery = `
        SELECT stock_quantity, name, sku
        FROM products
        WHERE id = $1
      `;
      const { rows } = await db.query(stockQuery, [item.product_id]);

      if (rows.length === 0) {
        insufficientStock.push({
          product_id: item.product_id,
          product_name: 'Unknown Product',
          sku: 'N/A',
          requested: item.quantity,
          available: 0,
          error: 'Product not found'
        });
      } else {
        const product = rows[0];
        if (product.stock_quantity < item.quantity) {
          insufficientStock.push({
            product_id: item.product_id,
            product_name: product.name,
            sku: product.sku,
            requested: item.quantity,
            available: product.stock_quantity,
            error: 'Insufficient stock'
          });
        }
      }
    }

    return insufficientStock;
  },

  // Update stock levels after transfer completion
  async updateStockAfterTransfer(transferId, action = 'complete') {
    const client = await db.getClient();

    try {
      await client.query('BEGIN');

      // Get transfer details with items
      const transferQuery = `
        SELECT it.*, iti.product_id, iti.quantity
        FROM inventory_transfers it
        JOIN inventory_transfer_items iti ON it.id = iti.transfer_id
        WHERE it.id = $1
      `;
      const transferResult = await client.query(transferQuery, [transferId]);

      if (transferResult.rows.length === 0) {
        throw new Error(`Transfer with ID ${transferId} not found`);
      }

      const transfer = transferResult.rows[0];

      // Update stock based on transfer type and action
      if (action === 'complete') {
        if (transfer.type === 'Transaction Out') {
          // Deduct from source (from_store) - for now using global stock
          for (const item of transferResult.rows) {
            const updateQuery = `
              UPDATE products
              SET stock_quantity = stock_quantity - $1, updated_at = CURRENT_TIMESTAMP
              WHERE id = $2 AND stock_quantity >= $1
            `;
            const updateResult = await client.query(updateQuery, [item.quantity, item.product_id]);

            if (updateResult.rowCount === 0) {
              throw new Error(`Failed to update stock for product ID ${item.product_id} - insufficient stock`);
            }
          }
        } else if (transfer.type === 'Transaction In') {
          // Add to destination (to_store) - for now using global stock
          for (const item of transferResult.rows) {
            const updateQuery = `
              UPDATE products
              SET stock_quantity = stock_quantity + $1, updated_at = CURRENT_TIMESTAMP
              WHERE id = $2
            `;
            await client.query(updateQuery, [item.quantity, item.product_id]);
          }
        }
      } else if (action === 'cancel') {
        // Reverse the stock changes if cancelling
        if (transfer.type === 'Transaction Out') {
          // Add back to source
          for (const item of transferResult.rows) {
            const updateQuery = `
              UPDATE products
              SET stock_quantity = stock_quantity + $1, updated_at = CURRENT_TIMESTAMP
              WHERE id = $2
            `;
            await client.query(updateQuery, [item.quantity, item.product_id]);
          }
        } else if (transfer.type === 'Transaction In') {
          // Deduct from destination
          for (const item of transferResult.rows) {
            const updateQuery = `
              UPDATE products
              SET stock_quantity = stock_quantity - $1, updated_at = CURRENT_TIMESTAMP
              WHERE id = $2 AND stock_quantity >= $1
            `;
            const updateResult = await client.query(updateQuery, [item.quantity, item.product_id]);

            if (updateResult.rowCount === 0) {
              throw new Error(`Failed to reverse stock for product ID ${item.product_id} - insufficient stock`);
            }
          }
        }
      }

      // Update transfer status
      const statusUpdateQuery = `
        UPDATE inventory_transfers
        SET status = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `;
      await client.query(statusUpdateQuery, [action === 'complete' ? 'Completed' : 'Cancelled', transferId]);

      await client.query('COMMIT');

      return {
        success: true,
        message: `Transfer ${action}d successfully`,
        transferId: transferId
      };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Get stock levels for products
  async getProductStockLevels(productIds) {
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return [];
    }

    const query = `
      SELECT id, name, sku, stock_quantity
      FROM products
      WHERE id = ANY($1)
    `;
    const { rows } = await db.query(query, [productIds]);
    return rows;
  }
};

module.exports = InventoryTransferModel;
