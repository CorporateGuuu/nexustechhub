// Quick test of Supabase connection
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });
config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl ? 'Set' : 'Not set');
console.log('Key:', supabaseServiceKey ? 'Set' : 'Not set');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function test() {
  try {
    console.log('Testing products table...');
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('count')
      .limit(1);

    if (productsError) {
      console.error('Products table test failed:', productsError.message);
    } else {
      console.log('Products table test successful');
    }

    console.log('Testing supabase_migrations table...');
    const { data: migrationsData, error: migrationsError } = await supabase
      .from('supabase_migrations')
      .select('count')
      .limit(1);

    if (migrationsError) {
      console.error('Migrations table test failed:', migrationsError.message);
      console.error('Error code:', migrationsError.code);
    } else {
      console.log('Migrations table test successful');
    }
  } catch (e) {
    console.error('Exception:', e.message);
  }
}

test();
