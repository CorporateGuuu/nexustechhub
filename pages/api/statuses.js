import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Check authentication
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
        error: "Unauthorized",
        message: "Authentication required"
      });
    }

    // Return general statuses data
    const statuses = [
      { id: 1, name: "Active", description: "Item is currently active and operational" },
      { id: 2, name: "Inactive", description: "Item is inactive but can be reactivated" },
      { id: 3, name: "Pending", description: "Item is pending approval or processing" },
      { id: 4, name: "Completed", description: "Item has been completed successfully" },
      { id: 5, name: "Cancelled", description: "Item has been cancelled" },
      { id: 6, name: "Draft", description: "Item is in draft state" },
      { id: 7, name: "Archived", description: "Item has been archived" }
    ];

    return res.status(200).json({
      success: true,
      data: statuses
    });
  } catch (error) {
    console.error('Error fetching statuses:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}
