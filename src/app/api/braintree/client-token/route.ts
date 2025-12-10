import braintree from 'braintree';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseClient';
import { cookies } from 'next/headers';

// Lazy initialization of gateway to avoid build-time errors when env vars are not set
let gateway: braintree.BraintreeGateway | null = null;

function getGateway() {
  if (!gateway) {
    if (!process.env.BRAINTREE_MERCHANT_ID || !process.env.BRAINTREE_PUBLIC_KEY || !process.env.BRAINTREE_PRIVATE_KEY) {
      throw new Error('Braintree credentials not configured');
    }
    gateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox,
      merchantId: process.env.BRAINTREE_MERCHANT_ID,
      publicKey: process.env.BRAINTREE_PUBLIC_KEY,
      privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    });
  }
  return gateway;
}

export async function POST() {
  try {
    // Get the auth token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('supabase-auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    // Verify the session using the service role client
    const { data: { user }, error: sessionError } = await supabaseAdmin.auth.getUser(token);

    if (sessionError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    // Generate client token for authenticated user
    const response = await getGateway().clientToken.generate({
      customerId: user.id // Associate token with user for better tracking
    });

    return NextResponse.json({ clientToken: response.clientToken });
  } catch (error) {
    console.error('Error generating Braintree client token:', error);
    return NextResponse.json(
      { error: 'Failed to generate client token' },
      { status: 500 }
    );
  }
}
