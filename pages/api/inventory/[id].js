import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { ProductModel } from '../../../database/models';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
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

    const { id } = req.query;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Missing product ID'
      });
    }

    // Convert numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.stock_quantity) updateData.stock_quantity = parseInt(updateData.stock_quantity);
    if (updateData.category_id) updateData.category_id = parseInt(updateData.category_id);

    // Update the product
    const updatedProduct = await ProductModel.updateProduct(parseInt(id), updateData);

    return res.status(200).json({
      success: true,
      message: 'Inventory item updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update inventory item',
      error: error.message
    });
  }
}
