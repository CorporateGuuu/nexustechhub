import clientPromise from 'lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db('nexus');

    await db.collection('wholesale_requests').insertOne({
      ...body,
      status: 'pending',
      appliedAt: new Date(),
    });

    // Update user role to pending
    await db.collection('users').updateOne(
      { _id: body.userId },
      { $set: { role: 'wholesale', wholesaleApproved: false } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing wholesale application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
