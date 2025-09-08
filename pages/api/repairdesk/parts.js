import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const partsData = {
  success: true,
  statusCode: 200,
  message: "OK",
  data: [
    {
      id: "74099947",
      name: "Back Camera For Samsung Galaxy S8 / S8 Plus (US Models)",
      sku: "107082011514",
      upc_code: "",
      item_no: "6872",
      price: "26.99",
      in_stock: "10",
      cost_price: "20.00",
      tax_inclusive: "0",
      tax_class: {
        tax_class: "GST",
        id: "1",
        tax_percent: "5.000"
      },
      warranty: "30",
      warranty_timeframe: "1",
      supplier: "Supplier Name",
      image: "https://example.com/images/parts/back_camera.jpg",
      devices: "7720894,7720896",
      is_serialize: 0,
      original_price: "26.99",
      gst: "1.35",
      serials: [
        "string"
      ],
      skus: [
        "string"
      ]
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

    return res.status(200).json(partsData);
  } catch (error) {
    console.error('Error fetching parts:', error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server error'
    });
  }
}
