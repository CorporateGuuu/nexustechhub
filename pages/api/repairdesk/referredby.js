import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const referredByData = {
  success: true,
  data: [
    { id: 1, name: 'Search Engine' },
    { id: 2, name: 'Social Media' },
    { id: 3, name: 'Referral' },
    { id: 4, name: 'Direct' },
    { id: 5, name: 'Email Campaign' }
  ]
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify API key or session
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    res.status(200).json(referredByData);
  } catch (error) {
    console.error('Error fetching referred by data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
