export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'wholesale' | 'retail'
          wholesale_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'admin' | 'wholesale' | 'retail'
          wholesale_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'wholesale' | 'retail'
          wholesale_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          sku: string | null
          description: string | null
          short_description: string | null
          price: number
          original_price: number | null
          discount_percentage: number
          stock_quantity: number
          low_stock_threshold: number
          is_active: boolean
          is_featured: boolean
          is_new: boolean
          weight: number | null
          dimensions: string | null
          category_id: string | null
          brand_id: string | null
          tags: string[] | null
          images: string[] | null
          thumbnail_url: string | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sku?: string | null
          description?: string | null
          short_description?: string | null
          price: number
          original_price?: number | null
          discount_percentage?: number
          stock_quantity?: number
          low_stock_threshold?: number
          is_active?: boolean
          is_featured?: boolean
          is_new?: boolean
          weight?: number | null
          dimensions?: string | null
          category_id?: string | null
          brand_id?: string | null
          tags?: string[] | null
          images?: string[] | null
          thumbnail_url?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sku?: string | null
          description?: string | null
          short_description?: string | null
          price?: number
          original_price?: number | null
          discount_percentage?: number
          stock_quantity?: number
          low_stock_threshold?: number
          is_active?: boolean
          is_featured?: boolean
          is_new?: boolean
          weight?: number | null
          dimensions?: string | null
          category_id?: string | null
          brand_id?: string | null
          tags?: string[] | null
          images?: string[] | null
          thumbnail_url?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          image_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          address_line1: string | null
          address_line2: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      wholesale_requests: {
        Row: {
          id: string
          user_id: string
          user_email: string
          user_name: string
          business_name: string
          business_type: string
          phone: string
          address: string
          tax_id: string
          status: 'pending' | 'approved' | 'rejected'
          applied_at: string
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          id?: string
          user_id: string
          user_email: string
          user_name: string
          business_name: string
          business_type: string
          phone: string
          address: string
          tax_id: string
          status?: 'pending' | 'approved' | 'rejected'
          applied_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          user_email?: string
          user_name?: string
          business_name?: string
          business_type?: string
          phone?: string
          address?: string
          tax_id?: string
          status?: 'pending' | 'approved' | 'rejected'
          applied_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
      }
      cart_items: {
        Row: {
          user_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          product_id: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      saved_carts: {
        Row: {
          id: string
          user_id: string
          name: string
          items: any[]
          total: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          items?: any[]
          total?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          items?: any[]
          total?: number
          created_at?: string
          updated_at?: string
        }
      }
      managers: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          role: string
          location: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          role: string
          location: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          role?: string
          location?: string
          created_at?: string
          updated_at?: string
        }
      }
      us_states: {
        Row: {
          id: number
          name: string
          code: string
          exempt: string
          result: string
          reject: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          code: string
          exempt?: string
          result?: string
          reject?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          code?: string
          exempt?: string
          result?: string
          reject?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      tax_forms: {
        Row: {
          id: string
          user_id: string
          type: 'resale' | 'tax-exempt'
          business_name: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          certificate_url: string | null
          certificate_path: string | null
          status: 'pending' | 'approved' | 'rejected'
          submitted_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'resale' | 'tax-exempt'
          business_name?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          certificate_url?: string | null
          certificate_path?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'resale' | 'tax-exempt'
          business_name?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          certificate_url?: string | null
          certificate_path?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tax_exemptions: {
        Row: {
          id: string
          user_id: string
          state_name: string
          is_exempt: boolean
          certificate_url: string | null
          certificate_path: string | null
          status: 'pending' | 'approved' | 'rejected'
          submitted_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          state_name: string
          is_exempt?: boolean
          certificate_url?: string | null
          certificate_path?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          state_name?: string
          is_exempt?: boolean
          certificate_url?: string | null
          certificate_path?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
