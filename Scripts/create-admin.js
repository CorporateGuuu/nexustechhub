import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import * as bcrypt from 'bcryptjs';

// Load environment variables
config();
config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Add MONGODB_URI to .env.local');
  process.exit(1);
}

async function createAdminUser() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('nexus');

    // Check if admin user already exists
    const existingAdmin = await db.collection('users').findOne({ email: 'admin@nexustechhub.com' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create admin user
    const adminUser = {
      email: 'admin@nexustechhub.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
      wholesaleApproved: true,
      createdAt: new Date()
    };

    await db.collection('users').insertOne(adminUser);
    console.log('Admin user created successfully');
    console.log('Email: admin@nexustechhub.com');
    console.log('Password: admin123');

  } finally {
    await client.close();
  }
}

createAdminUser().catch(console.error);
