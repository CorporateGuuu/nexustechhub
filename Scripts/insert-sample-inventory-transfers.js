const { InventoryTransferModel } = require('../database/models');
const db = require('../database/config');

async function insertSampleData() {
  console.log('📦 Inserting sample inventory transfer data...');

  try {
    // Sample transfer data
    const sampleTransfers = [
      {
        transfer_id: 'TO-140',
        status: 'Completed',
        created_by: 'Paul Smith',
        from_store_id: 1,
        to_store_id: 2,
        from_store_name: 'RepairDesk',
        to_store_name: 'systech',
        type: 'Transaction Out',
        transaction_date: new Date('2024-08-29 15:43:00'),
        items: [
          {
            product_id: 1, // Assuming product with ID 1 exists
            quantity: 11,
            price: 17.19,
            gst: 0.00
          }
        ]
      },
      {
        transfer_id: 'TO-141',
        status: 'Pending',
        created_by: 'John Doe',
        from_store_id: 2,
        to_store_id: 3,
        from_store_name: 'systech',
        to_store_name: 'Main Warehouse',
        type: 'Transaction Out',
        transaction_date: new Date('2024-08-30 10:15:00'),
        items: [
          {
            product_id: 2, // Assuming product with ID 2 exists
            quantity: 5,
            price: 25.99,
            gst: 1.30
          },
          {
            product_id: 3, // Assuming product with ID 3 exists
            quantity: 8,
            price: 12.50,
            gst: 0.00
          }
        ]
      },
      {
        transfer_id: 'TO-142',
        status: 'Completed',
        created_by: 'Jane Wilson',
        from_store_id: 3,
        to_store_id: 1,
        from_store_name: 'Main Warehouse',
        to_store_name: 'RepairDesk',
        type: 'Transaction In',
        transaction_date: new Date('2024-08-28 14:22:00'),
        items: [
          {
            product_id: 4, // Assuming product with ID 4 exists
            quantity: 15,
            price: 8.75,
            gst: 0.44
          }
        ]
      }
    ];

    // Insert each transfer
    for (const transferData of sampleTransfers) {
      try {
        const result = await InventoryTransferModel.createTransfer(transferData);
        console.log(`✅ Created transfer: ${result.transfer_id}`);
      } catch (error) {
        console.error(`❌ Failed to create transfer ${transferData.transfer_id}:`, error.message);
      }
    }

    console.log('🎉 Sample data insertion completed!');

    // Verify the data
    console.log('\n🔍 Verifying inserted data...');
    const allTransfers = await InventoryTransferModel.getAllTransfers({}, 1, 10);
    console.log(`Found ${allTransfers.transfers.length} transfers in database`);

  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  } finally {
    // Close database connection
    process.exit(0);
  }
}

// Run the script if executed directly
if (require.main === module) {
  insertSampleData().catch(console.error);
}

module.exports = { insertSampleData };
