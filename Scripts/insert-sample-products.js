const db = require('../database/config');

async function insertSampleProducts() {
  console.log('📦 Inserting sample products...');

  try {
    // Sample products data
    const sampleProducts = [
      {
        name: 'iPhone 15 Pro Max',
        slug: 'iphone-15-pro-max',
        sku: 'IPH15PM-128',
        description: 'Latest iPhone with advanced features',
        price: 1199.99,
        discount_percentage: 0,
        stock_quantity: 50,
        is_featured: true,
        is_new: true,
        image_url: '/images/iphone15pm.jpg',
        weight: 221,
        dimensions: '159.9 x 76.7 x 8.25 mm',
        category_id: 1,
        brand: 'Apple'
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        slug: 'samsung-galaxy-s24-ultra',
        sku: 'SGS24U-256',
        description: 'Premium Android smartphone',
        price: 1299.99,
        discount_percentage: 5,
        stock_quantity: 30,
        is_featured: true,
        is_new: true,
        image_url: '/images/s24ultra.jpg',
        weight: 232,
        dimensions: '162.3 x 79.0 x 8.6 mm',
        category_id: 1,
        brand: 'Samsung'
      },
      {
        name: 'Google Pixel 8 Pro',
        slug: 'google-pixel-8-pro',
        sku: 'GP8P-128',
        description: 'Pure Android experience',
        price: 999.99,
        discount_percentage: 0,
        stock_quantity: 25,
        is_featured: false,
        is_new: true,
        image_url: '/images/pixel8pro.jpg',
        weight: 213,
        dimensions: '162.6 x 76.5 x 8.8 mm',
        category_id: 1,
        brand: 'Google'
      },
      {
        name: 'iPhone 14 Pro',
        slug: 'iphone-14-pro',
        sku: 'IPH14P-128',
        description: 'Previous generation iPhone',
        price: 999.99,
        discount_percentage: 10,
        stock_quantity: 40,
        is_featured: false,
        is_new: false,
        image_url: '/images/iphone14p.jpg',
        weight: 206,
        dimensions: '147.5 x 71.5 x 7.85 mm',
        category_id: 1,
        brand: 'Apple'
      }
    ];

    // Insert each product
    for (const product of sampleProducts) {
      try {
        const query = `
          INSERT INTO products (
            name, slug, sku, description, price, discount_percentage,
            stock_quantity, is_featured, is_new, image_url, weight,
            dimensions, category_id, brand
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
          ) RETURNING id
        `;

        const values = [
          product.name,
          product.slug,
          product.sku,
          product.description,
          product.price,
          product.discount_percentage,
          product.stock_quantity,
          product.is_featured,
          product.is_new,
          product.image_url,
          product.weight,
          product.dimensions,
          product.category_id,
          product.brand
        ];

        const result = await db.query(query, values);
        console.log(`✅ Created product: ${product.name} (ID: ${result.rows[0].id})`);
      } catch (error) {
        console.error(`❌ Failed to create product ${product.name}:`, error.message);
      }
    }

    console.log('🎉 Sample products insertion completed!');

    // Verify the data
    console.log('\n🔍 Verifying inserted products...');
    const { rows } = await db.query('SELECT COUNT(*) as count FROM products');
    console.log(`Found ${rows[0].count} products in database`);

  } catch (error) {
    console.error('❌ Error inserting sample products:', error);
  } finally {
    // Close database connection
    process.exit(0);
  }
}

// Run the script if executed directly
if (require.main === module) {
  insertSampleProducts().catch(console.error);
}

module.exports = { insertSampleProducts };
