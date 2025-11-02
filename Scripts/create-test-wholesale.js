import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
config();
config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Add MONGODB_URI to .env.local');
  process.exit(1);
}

async function createTestWholesaleRequest() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('nexus');

    // Create a test user first
    const testUser = {
      email: 'testdealer@example.com',
      name: 'Test Dealer',
      password: 'hashedpassword', // This would normally be hashed
      role: 'wholesale',
      wholesaleApproved: false,
      createdAt: new Date()
    };

    const userResult = await db.collection('users').insertOne(testUser);
    console.log('Test user created with ID:', userResult.insertedId);

    // Create a wholesale request
    const wholesaleRequest = {
      businessName: 'Test Electronics Wholesale',
      license: 'TEST123456',
      phone: '+1-555-0123',
      message: 'We are a reputable electronics wholesaler looking to partner with Nexus Tech Hub for bulk screen replacements and repair parts.',
      email: 'testdealer@example.com',
      userId: userResult.insertedId.toString(),
      status: 'pending',
      appliedAt: new Date()
    };

    await db.collection('wholesale_requests').insertOne(wholesaleRequest);
    console.log('Test wholesale request created successfully');

  } finally {
    await client.close();
  }
}

createTestWholesaleRequest().catch(console.error);
