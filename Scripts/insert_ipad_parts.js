const db = require('../database/config');

async function insertIPadParts() {
  console.log('📱 Inserting 50 iPad parts...');

  try {
    // First, ensure iPad Parts category exists
    let categoryId = await getOrCreateCategory('iPad Parts', 'ipad-parts', 'Replacement parts for all iPad models including screens, batteries, and components');

    console.log(`✅ Using category ID: ${categoryId} for iPad Parts`);

    // Generate 50 iPad parts
    const ipadParts = generateIPadParts(categoryId);

    // Insert each product
    for (const part of ipadParts) {
      try {
        // Insert product
        const productQuery = `
          INSERT INTO products (
            name, slug, sku, description, price, discount_percentage,
            stock_quantity, is_featured, is_new, image_url, weight,
            dimensions, category_id, brand
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
          ) RETURNING id
        `;

        const productValues = [
          part.name,
          part.slug,
          part.sku,
          part.description,
          part.price,
          part.discount_percentage,
          part.stock_quantity,
          part.is_featured,
          part.is_new,
          part.image_url,
          part.weight,
          part.dimensions,
          part.category_id,
          part.brand
        ];

        const productResult = await db.query(productQuery, productValues);
        const productId = productResult.rows[0].id;

        // Insert product specifications
        const specQuery = `
          INSERT INTO product_specifications (
            product_id, display, processor, memory, storage, camera,
            battery, connectivity, operating_system, additional_features
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
          )
        `;

        const specValues = [
          productId,
          part.specifications.display || null,
          part.specifications.processor || null,
          part.specifications.memory || null,
          part.specifications.storage || null,
          part.specifications.camera || null,
          part.specifications.battery || null,
          part.specifications.connectivity || null,
          part.specifications.operating_system || null,
          part.specifications.additional_features || null
        ];

        await db.query(specQuery, specValues);

        console.log(`✅ Created iPad part: ${part.name} (ID: ${productId})`);
      } catch (error) {
        console.error(`❌ Failed to create iPad part ${part.name}:`, error.message);
      }
    }

    console.log('🎉 50 iPad parts insertion completed!');

    // Verify the data
    console.log('\n🔍 Verifying inserted products...');
    const { rows } = await db.query('SELECT COUNT(*) as count FROM products WHERE category_id = $1', [categoryId]);
    console.log(`Found ${rows[0].count} iPad parts in database`);

  } catch (error) {
    console.error('❌ Error inserting iPad parts:', error);
  } finally {
    process.exit(0);
  }
}

async function getOrCreateCategory(name, slug, description) {
  try {
    // Check if category exists
    const existingCategory = await db.query(
      'SELECT id FROM categories WHERE slug = $1',
      [slug]
    );

    if (existingCategory.rows.length > 0) {
      return existingCategory.rows[0].id;
    }

    // Create new category
    const result = await db.query(
      'INSERT INTO categories (name, slug, description) VALUES ($1, $2, $3) RETURNING id',
      [name, slug, description]
    );

    return result.rows[0].id;
  } catch (error) {
    console.error('Error getting/creating category:', error);
    throw error;
  }
}

function generateIPadParts(categoryId) {
  const ipadModels = [
    'iPad Pro 12.9"',
    'iPad Pro 11"',
    'iPad Air 5',
    'iPad Air 4',
    'iPad 10th Gen',
    'iPad 9th Gen',
    'iPad Mini 6',
    'iPad Mini 5'
  ];

  const partTypes = [
    { name: 'LCD Screen Assembly', price: 150, desc: 'Complete LCD display assembly with digitizer' },
    { name: 'OLED Screen', price: 200, desc: 'Premium OLED display replacement' },
    { name: 'Digitizer Touch Screen', price: 80, desc: 'Touch screen digitizer replacement' },
    { name: 'Battery Replacement', price: 60, desc: 'High-capacity lithium-ion battery' },
    { name: 'Charging Port Flex Cable', price: 25, desc: 'USB-C charging port assembly' },
    { name: 'Home Button Assembly', price: 35, desc: 'Home button with Touch ID sensor' },
    { name: 'Rear Camera Module', price: 45, desc: 'Rear camera replacement module' },
    { name: 'Front Camera Assembly', price: 30, desc: 'Front camera and sensor assembly' },
    { name: 'Speaker Assembly', price: 20, desc: 'Audio speaker replacement' },
    { name: 'Vibration Motor', price: 15, desc: 'Taptic engine vibration motor' },
    { name: 'Power Button Flex', price: 18, desc: 'Power and volume button cable' },
    { name: 'WiFi Antenna', price: 12, desc: 'Wireless antenna replacement' },
    { name: 'Logic Board', price: 120, desc: 'Main circuit board replacement' },
    { name: 'SSD Storage Module', price: 90, desc: 'Internal storage SSD replacement' },
    { name: 'RAM Module', price: 70, desc: 'Memory module upgrade/replacement' }
  ];

  const parts = [];

  for (let i = 1; i <= 50; i++) {
    const model = ipadModels[Math.floor(Math.random() * ipadModels.length)];
    const partType = partTypes[Math.floor(Math.random() * partTypes.length)];

    const name = `${model} ${partType.name}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const sku = `IPAD-${i.toString().padStart(3, '0')}`;

    const price = partType.price + Math.floor(Math.random() * 50);
    const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : 0;
    const stock = Math.floor(Math.random() * 100) + 10;
    const isFeatured = Math.random() > 0.8;
    const isNew = Math.random() > 0.9;

    const part = {
      name,
      slug: `${slug}-${i}`,
      sku,
      description: `High-quality ${partType.desc.toLowerCase()} for ${model}. Compatible with all firmware versions. Includes installation tools and adhesive.`,
      price,
      discount_percentage: discount,
      stock_quantity: stock,
      is_featured: isFeatured,
      is_new: isNew,
      image_url: `https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=400&fit=crop&q=80`,
      weight: (Math.random() * 0.5 + 0.1).toFixed(2),
      dimensions: `${(Math.random() * 20 + 10).toFixed(1)} x ${(Math.random() * 15 + 5).toFixed(1)} x ${(Math.random() * 2 + 0.5).toFixed(1)} cm`,
      category_id: categoryId,
      brand: 'Apple',
      specifications: {
        display: partType.name.includes('Screen') ? `${model} compatible display` : null,
        processor: null,
        memory: null,
        storage: partType.name.includes('SSD') ? 'Various capacities available' : null,
        camera: partType.name.includes('Camera') ? 'OEM quality camera module' : null,
        battery: partType.name.includes('Battery') ? `${Math.floor(Math.random() * 5000 + 5000)}mAh capacity` : null,
        connectivity: partType.name.includes('WiFi') ? '802.11ac wireless' : null,
        operating_system: 'iPadOS compatible',
        additional_features: 'OEM quality, warranty included, easy installation'
      }
    };

    parts.push(part);
  }

  return parts;
}

// Run the script if executed directly
if (require.main === module) {
  insertIPadParts().catch(console.error);
}

module.exports = { insertIPadParts };
