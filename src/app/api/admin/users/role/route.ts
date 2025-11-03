import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../../lib/supabaseClient';
import { getUserFromCookie, requireAdmin } from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Auth check: require admin role
    const user = await getUserFromCookie();
    await requireAdmin(user.id);

    const formData = await request.formData();
    const userId = formData.get('userId') as string;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Update user role to approved
    const { error } = await (supabaseAdmin as any)
      .from('profiles')
      .update({ role: 'approved' })
      .eq('id', userId);

    if (error) {
      console.error('User approval error:', error);
      return NextResponse.json({ error: 'Failed to approve user' }, { status: 500 });
    }

    return NextResponse.redirect('/admin/users');
  } catch (error) {
    console.error('Admin user approval error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
