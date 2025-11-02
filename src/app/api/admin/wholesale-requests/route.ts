import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('nexus');

    const requests = await db
      .collection('wholesale_requests')
      .find({})
      .sort({ appliedAt: -1 })
      .toArray();

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching wholesale requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { requestId, action } = await req.json();

    if (!requestId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('nexus');

    // Get the request
    const request = await db.collection('wholesale_requests').findOne({
      _id: new ObjectId(requestId)
    });

    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    // Update the request status
    await db.collection('wholesale_requests').updateOne(
      { _id: new ObjectId(requestId) },
      {
        $set: {
          status: newStatus,
          reviewedAt: new Date(),
          reviewedBy: session.user.email
        }
      }
    );

    // If approved, update the user's role and wholesaleApproved status
    if (action === 'approve') {
      await db.collection('users').updateOne(
        { _id: new ObjectId(request.userId) },
        {
          $set: {
            role: 'dealer',
            wholesaleApproved: true
          }
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating wholesale request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
