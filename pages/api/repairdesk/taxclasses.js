import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const taxClassesData = {
  success: true,
  statusCode: 200,
  message: "OK",
  data: [
    {
      id: 1,
      tax_class: "GST",
      tax_percent: "5.000"
    }
  ]
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      statusCode: 405,
      message: 'Method not allowed'
    });
  }

  try {
    const session = await getSession({ req });
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    let isAuthenticated = false;

    if (session?.user?.id) {
      isAuthenticated = true;
    } else if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        isAuthenticated = true;
      } catch (error) {
        // Token invalid
      }
    }

    if (!isAuthenticated) {
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

    return res.status(200).json(taxClassesData);
  } catch (error) {
    console.error('Error fetching tax classes:', error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server error'
    });
  }
}
