# Nexus Tech Hub Database Setup

This directory contains all the SQL scripts needed to set up the complete Nexus Tech Hub database with categories and products.

## Files Overview

- `schema.sql` - Database schema with all tables, indexes, and triggers
- `categories-seed.sql` - Hierarchical category structure matching the website navigation
- `products-seed.sql` - Sample products for major subcategories (140+ products)
- `setup-all.sql` - Combined script (SQL Server syntax warnings in VSCode)
- `setup-all.pgsql` - Combined script (proper PostgreSQL syntax highlighting)

## Setup Instructions

### Option 1: Run Individual Scripts (Recommended)

1. **Create Database Schema:**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `schema.sql`
   - Click "Run" to create all tables, indexes, and triggers

2. **Insert Categories:**
   - Copy and paste the contents of `categories-seed.sql`
   - Click "Run" to populate the category hierarchy

3. **Insert Products:**
   - Copy and paste the contents of `products-seed.sql`
   - Click "Run" to add sample products

### Option 2: Use Combined Script (Fixed)

- Copy and paste the contents of `setup-all.sql` into Supabase SQL Editor
- This file now contains the complete setup with all tables, categories, and products
- Note: The file uses PostgreSQL syntax (SERIAL, TIMESTAMPTZ, etc.) compatible with Supabase

## Database Structure

### Categories Hierarchy

```text
Main Categories (11):
├── Apple (10 subcategories: iPhone, iPad, Watch, iPod, AirPods, iMac, MacBook Pro, MacBook Air, MacBook, Apollo SSDs)
├── Samsung (19 subcategories: S/N/Note/A/Z/J Series, Tab variants, XCover, Watch, etc.)
├── Motorola (9 subcategories: Moto G/E/Edge/One/Z/X Series, Razr, Droid)
├── Google (3 subcategories: Pixel/Pixelbook/Pixel Tablet)
├── Other Parts (11 subcategories: LG, Microsoft, Asus, OnePlus, ZTE, Huawei, Xiaomi, Sony, TCL, Lenovo, Amazon)
├── Game Console (5 subcategories: Microsoft/Sony/Nintendo/Oculus/Valve)
├── Accessories (4 subcategories)
├── Tools & Supplies (10 subcategories)
├── Refurbishing (10 subcategories)
├── Board Components (5 subcategories)
└── Pre-Owned Devices (1 subcategory)
```

### Sample Products
- **iPhone Parts**: 20 products (screens, batteries, cameras, frames for iPhone 15/14/13 series)
- **Samsung Galaxy S Series**: 20 products (S24/S23/S22 Ultra/Plus screens, batteries, cameras)
- **iPad Parts**: 20 products (iPad Pro, Air, 10th Gen variants)
- **Samsung Galaxy Note Series**: 20 products (Note 20/10 with S Pen support)
- **Motorola Parts**: 20 products (Moto G series with stylus and power variants)
- **Google Pixel Parts**: 20 products (Pixel 8/7/6 Pro models)
- **Tools & Supplies**: 20 professional repair tools and equipment

## Product Details Include
- Realistic wholesale pricing with discounts
- Stock quantity management
- Featured product flags
- Brand associations
- Detailed descriptions with technical specifications
- Unique SKUs
- Image URLs for product displays

## Notes
- All prices are in USD and represent wholesale pricing
- Stock quantities vary realistically (20-200 units per product)
- Featured products are marked for homepage display
- Categories follow the exact navigation structure from Header.js
- Products include proper foreign key relationships to categories

## Next Steps

After running the setup scripts:

1. Configure your Supabase connection in your application
2. Test the category navigation
3. Add product images to the `/images/products/` directory
4. Implement product filtering and search functionality
5. Set up user authentication and cart functionality
