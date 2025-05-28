import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import formidable from 'formidable';
import fs from 'fs';
import csv from 'csv-parser';
import { Pool } from 'pg';
import ExcelJS from 'exceljs';

// Configure formidable to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  // Check if request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Check authentication and admin status
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user.isAdmin) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    // Parse the form data
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file;
    const source = fields.source;
    const mapping = JSON.parse(fields.mapping);

    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Process the file based on its type
    let products = [];
    const filePath = file.filepath;
    const fileType = file.originalFilename.split('.').pop().toLowerCase();

    if (fileType === 'csv') {
      products = await parseCSV(filePath, mapping, source);
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      products = await parseExcel(filePath, mapping, source);
    } else {
      return res.status(400).json({ success: false, message: 'Unsupported file format' });
    }

    // Import products to database
    const importResult = await importProducts(products);

    return res.status(200).json({
      success: true,
      message: `Successfully processed ${products.length} products`,
      stats: importResult
    });
  } catch (error) {
    console.error('Error importing inventory:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to import inventory' });
  }
}

// Parse CSV file
async function parseCSV(filePath, mapping, source) {
  const products = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const product = mapProductData(row, mapping, source);
        if (product) {
          products.push(product);
        }
      })
      .on('end', () => {
        resolve(products);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Parse Excel file with security measures using ExcelJS
async function parseExcel(filePath, mapping, source) {
  const products = [];

  try {
    // Validate file size (max 10MB)
    const stats = fs.statSync(filePath);
    if (stats.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB limit');
    }

    // Create workbook and read file with ExcelJS (more secure)
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    if (!workbook.worksheets || workbook.worksheets.length === 0) {
      throw new Error('No sheets found in Excel file');
    }

    const worksheet = workbook.worksheets[0];

    if (!worksheet) {
      throw new Error('Unable to read worksheet');
    }

    // Get all rows as values
    const rows = [];
    worksheet.eachRow((row, rowNumber) => {
      const values = [];
      row.eachCell((cell, colNumber) => {
        // Convert cell value to string to prevent injection
        values[colNumber - 1] = String(cell.value || '');
      });
      rows.push(values);
    });

    if (rows.length === 0) {
      throw new Error('No data found in Excel file');
    }

    // Limit number of rows to prevent DoS
    const maxRows = 10000;
    const limitedRows = rows.slice(0, maxRows);
    const headerRow = limitedRows[0];

    limitedRows.forEach((row, index) => {
      if (index === 0) return; // Skip header row

      // Convert array to object using header row
      const rowObject = {};
      headerRow.forEach((header, colIndex) => {
        rowObject[header] = row[colIndex] || '';
      });

      const product = mapProductData(rowObject, mapping, source);
      if (product) {
        products.push(product);
      }
    });

    return products;
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    throw new Error(`Failed to parse Excel file: ${error.message}`);
  } finally {
    // Clean up the uploaded file
    try {
      fs.unlinkSync(filePath);
    } catch (cleanupError) {
      console.error('Error cleaning up file:', cleanupError);
    }
  }
}

// Map data from file to product structure with input sanitization
function mapProductData(row, mapping, source) {
  // Sanitize string input to prevent XSS and injection attacks
  const sanitizeString = (input) => {
    if (typeof input !== 'string') return String(input || '');
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"]/g, '') // Remove quotes
      .trim()
      .substring(0, 1000); // Limit length
  };

  // Sanitize and validate numeric input
  const sanitizeNumber = (input, defaultValue = 0) => {
    const num = parseFloat(input);
    return isNaN(num) || !isFinite(num) ? defaultValue : Math.max(0, num);
  };

  // Sanitize and validate integer input
  const sanitizeInteger = (input, defaultValue = 0) => {
    const num = parseInt(input);
    return isNaN(num) || !isFinite(num) ? defaultValue : Math.max(0, num);
  };

  // Sanitize image URLs
  const sanitizeImages = (input) => {
    if (!input) return [];
    const imageList = typeof input === 'string' ? input.split(',') : [input];
    return imageList
      .map(img => sanitizeString(img))
      .filter(img => img.length > 0)
      .slice(0, 10); // Limit to 10 images
  };

  // Special handling for 4seller.com format
  if (source === '4seller') {
    return {
      sku: sanitizeString(row[mapping.sku]),
      name: sanitizeString(row[mapping.name]),
      description: sanitizeString(row[mapping.description]),
      price: sanitizeNumber(row[mapping.price]),
      stock: sanitizeInteger(row[mapping.stock]),
      category: sanitizeString(row[mapping.category]),
      brand: sanitizeString(row[mapping.brand]),
      images: sanitizeImages(row[mapping.images])
    };
  }

  // Generic mapping for other sources
  return {
    sku: sanitizeString(row[mapping.sku]),
    name: sanitizeString(row[mapping.name]),
    description: sanitizeString(row[mapping.description]),
    price: sanitizeNumber(row[mapping.price]),
    stock: sanitizeInteger(row[mapping.stock]),
    category: sanitizeString(row[mapping.category]),
    brand: sanitizeString(row[mapping.brand]),
    images: sanitizeImages(row[mapping.images])
  };
}

// Import products to database
async function importProducts(products) {
  const stats = {
    imported: 0,
    updated: 0,
    skipped: 0,
    errors: 0
  };

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const product of products) {
      try {
        if (!product.sku || !product.name) {
          stats.skipped++;
          continue;
        }

        // Check if product exists
        const existingProduct = await client.query(
          'SELECT id FROM products WHERE sku = $1',
          [product.sku]
        );

        let categoryId = null;

        // Get or create category
        if (product.category) {
          const categoryResult = await client.query(
            `SELECT id FROM categories WHERE name = $1`,
            [product.category]
          );

          if (categoryResult.rows.length > 0) {
            categoryId = categoryResult.rows[0].id;
          } else {
            // Create new category
            const slug = product.category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');

            const newCategory = await client.query(
              `INSERT INTO categories (name, slug, created_at, updated_at)
               VALUES ($1, $2, NOW(), NOW())
               RETURNING id`,
              [product.category, slug]
            );

            categoryId = newCategory.rows[0].id;
          }
        }

        if (existingProduct.rows.length > 0) {
          // Update existing product
          await client.query(
            `UPDATE products
             SET name = $1, description = $2, price = $3, stock = $4,
                 category_id = $5, brand = $6, updated_at = NOW()
             WHERE sku = $7`,
            [
              product.name,
              product.description,
              product.price,
              product.stock,
              categoryId,
              product.brand,
              product.sku
            ]
          );

          // Update product images if provided
          if (product.images && product.images.length > 0) {
            // Delete existing images
            await client.query(
              'DELETE FROM product_images WHERE product_id = $1',
              [existingProduct.rows[0].id]
            );

            // Add new images
            for (let i = 0; i < product.images.length; i++) {
              await client.query(
                `INSERT INTO product_images (product_id, image_url, display_order, created_at, updated_at)
                 VALUES ($1, $2, $3, NOW(), NOW())`,
                [existingProduct.rows[0].id, product.images[i], i + 1]
              );
            }
          }

          stats.updated++;
        } else {
          // Insert new product
          const newProduct = await client.query(
            `INSERT INTO products (sku, name, description, price, stock, category_id, brand, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
             RETURNING id`,
            [
              product.sku,
              product.name,
              product.description,
              product.price,
              product.stock,
              categoryId,
              product.brand
            ]
          );

          // Add product images if provided
          if (product.images && product.images.length > 0) {
            for (let i = 0; i < product.images.length; i++) {
              await client.query(
                `INSERT INTO product_images (product_id, image_url, display_order, created_at, updated_at)
                 VALUES ($1, $2, $3, NOW(), NOW())`,
                [newProduct.rows[0].id, product.images[i], i + 1]
              );
            }
          }

          stats.imported++;
        }
      } catch (error) {
        console.error('Error importing product:', error, product);
        stats.errors++;
      }
    }

    await client.query('COMMIT');
    return stats;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
