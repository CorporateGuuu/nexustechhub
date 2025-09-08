import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const referredByData = {
  success: true,
