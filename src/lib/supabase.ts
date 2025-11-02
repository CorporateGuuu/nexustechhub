import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'wholesale' | 'retail';
          wholesale_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: 'admin' | 'wholesale' | 'retail';
          wholesale_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'admin' | 'wholesale' | 'retail';
          wholesale_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: string;
          brand: string;
          price: number;
          original_price: number | null;
          image: string;
          images: string[] | null;
          in_stock: boolean;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          category: string;
          brand: string;
          price: number;
          original_price?: number | null;
          image: string;
          images?: string[] | null;
          in_stock?: boolean;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category?: string;
          brand?: string;
          price?: number;
          original_price?: number | null;
          image?: string;
          images?: string[] | null;
          in_stock?: boolean;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      wholesale_requests: {
        Row: {
          id: string;
          user_id: string;
          user_email: string;
          user_name: string;
          business_name: string;
          business_type: string;
          phone: string;
          address: string;
          tax_id: string;
          status: 'pending' | 'approved' | 'rejected';
          applied_at: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          user_email: string;
          user_name: string;
          business_name: string;
          business_type: string;
          phone: string;
          address: string;
          tax_id: string;
          status?: 'pending' | 'approved' | 'rejected';
          applied_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          user_email?: string;
          user_name?: string;
          business_name?: string;
          business_type?: string;
          phone?: string;
          address?: string;
          tax_id?: string;
          status?: 'pending' | 'approved' | 'rejected';
          applied_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
      };
    };
  };
}
