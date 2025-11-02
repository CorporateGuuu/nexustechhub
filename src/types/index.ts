export type UserRole = 'retail' | 'wholesale' | 'dealer' | 'admin';

export interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  category: string;
  brand: string;
  badge?: string;
  inStock: boolean;
  description: string;
  specs?: Record<string, string>;
}

export interface User {
  _id?: string;
  email: string;
  name?: string;
  password?: string;
  role: UserRole;
  wholesaleApproved: boolean;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress: object;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface FacetFilter {
  brands: { [key: string]: number };
  categories: { [key: string]: number };
  priceRanges: { [key: string]: number };
}
