import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify API key
    const apiKey = req.headers['x-api-key'] || req.query.api_key;
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
        data: {
          name: "Unauthorized",
          message: "Your request was made with invalid credentials.",
          code: 0,
          status: 401
        }
      });
    }

    // Get query parameters
    const { page = 1, pagesize = 10, referredby, keyword } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(pagesize);
    const limit = parseInt(pagesize);

    // Build WHERE clause for filters
    let whereClause = '';
    let params = [];
    let paramIndex = 1;

    if (referredby) {
      whereClause += ` AND refered_by ILIKE $${paramIndex}`;
      params.push(`%${referredby}%`);
      paramIndex++;
    }

    if (keyword) {
      whereClause += ` AND (
        first_name ILIKE $${paramIndex} OR
        last_name ILIKE $${paramIndex} OR
        phone ILIKE $${paramIndex} OR
        mobiles::text ILIKE $${paramIndex} OR
        email ILIKE $${paramIndex} OR
        postal_code ILIKE $${paramIndex} OR
        city ILIKE $${paramIndex} OR
        orgonization ILIKE $${paramIndex} OR
        driving_licence ILIKE $${paramIndex}
      )`;
      params.push(`%${keyword}%`);
      paramIndex++;
    }

    // Query customers with pagination and filters
    const query = `
      SELECT
        id,
        first_name,
        last_name,
        phone,
        mobiles,
        address as address1,
        address2,
        postal_code as postcode,
        city,
        state,
        country,
        email,
        orgonization,
        refered_by,
        driving_licence,
        contact_person,
        tax_number,
        network,
        forgotten_as_gdpr,
        gdpr_complianced,
        referred_loyaltyid,
        tax_class,
        priority_tax_class,
        customer_id_type,
        customer_id_number,
        contact_person_relation,
        cus_group_id,
        phones,
        emails,
        created_at
      FROM customers
      WHERE 1=1 ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Transform data to match RepairDesk format
    const customers = result.rows.map(customer => ({
      store_name: customer.orgonization || 'Default Store',
      fullName: `${customer.first_name} ${customer.last_name}`,
      first_name: customer.first_name,
      last_name: customer.last_name,
      cid: customer.id.toString(),
      phone: customer.phone || '',
      mobile: customer.mobiles ? (Array.isArray(customer.mobiles) ? customer.mobiles[0]?.value || '' : customer.mobiles) : '',
      address1: customer.address1 || '',
      created_on: Math.floor(new Date(customer.created_at).getTime() / 1000),
      address2: customer.address2 || '',
      postcode: customer.postcode || '',
      city: customer.city || '',
      state: customer.state || '',
      country: customer.country || '',
      email: customer.email || '',
      orgonization: customer.orgonization || '',
      refered_by: customer.refered_by || '',
      driving_licence: customer.driving_licence || '',
      contact_person: customer.contact_person || '',
      tax_number: customer.tax_number || '',
      network: customer.network || '',
      forgotten_as_gdpr: customer.forgotten_as_gdpr || '0',
      gdpr_complianced: customer.gdpr_complianced || '',
      referred_loyaltyid: customer.referred_loyaltyid || '',
      tax_class: customer.tax_class || '',
      priority_tax_class: customer.priority_tax_class || '',
      customer_id_type: customer.customer_id_type || '0',
      customer_id_number: customer.customer_id_number || '',
      contact_person_relation: customer.contact_person_relation || '',
      customer_group: {
        id: customer.cus_group_id || '1',
        name: 'Individual', // Default, could be queried from groups table
        repair: '0',
        unlocking: '0',
        accessories: '0',
        trade_in: '0',
        casual: '0',
        third_party_enabled: '0'
      },
      membership_plan: null, // Default to null, could be queried if membership table exists
      loyalty: '0',
      loyaltyBalance: '0',
      loyaltyBalanceText: 'USD 0.00',
      storeCredits: '0',
      mobiles: customer.mobiles ? (Array.isArray(customer.mobiles) ? customer.mobiles : [{ value: customer.mobiles, isPrimary: 1 }]) : [],
      phones: customer.phones ? (Array.isArray(customer.phones) ? customer.phones : [{ value: customer.phones, isPrimary: 0 }]) : [],
      emails: customer.emails ? (Array.isArray(customer.emails) ? customer.emails : [{ value: customer.emails, isPrimary: 0 }]) : []
    }));

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "OK",
      data: customers
    });

  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: "string"
    });
  }
}
