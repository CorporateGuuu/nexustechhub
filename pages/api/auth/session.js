import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get session from Authorization header or cookies
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '') || req.cookies?.['sb-access-token'];

    if (!token) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }

    // Verify the session
    const { data: sessionData, error: sessionError } = await supabase.auth.getUser(token);

    if (sessionError || !sessionData.user) {
      return res.status(401).json({ message: 'Invalid or expired session' });
    }

    // Get customer data
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .select('*')
      .eq('id', sessionData.user.id)
      .single();

    if (customerError) {
      return res.status(500).json({ message: 'Failed to retrieve customer data' });
    }

    res.status(200).json({
      user: {
        id: customerData.id,
        firstName: customerData.first_name,
        lastName: customerData.last_name,
        email: customerData.email,
        phone: customerData.phone,
        lastLogin: customerData.last_login,
        createdAt: customerData.created_at,
      },
      session: sessionData,
    });

  } catch (error) {
    console.error('Session verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
