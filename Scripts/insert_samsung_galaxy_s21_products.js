#!/usr/bin/env node

/**
 * Insert Samsung Galaxy S21 5G Products Data into Supabase
 * This script inserts comprehensive Samsung Galaxy S21 5G repair parts and accessories
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertProducts() {
  console.log('📱 Inserting Samsung Galaxy S21 5G products...');

  const products = [
    // OLED Assemblies - Aftermarket Plus
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Aftermarket Plus) (Phantom Gray)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-aftermarket-plus-phantom-gray',
      sku: 'SS21-OLED-FRAME-AP-GRAY',
      description: 'High-quality OLED assembly with frame for Samsung Galaxy S21 5G. Aftermarket Plus quality in Phantom Gray color.',
      price: 79.09,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Aftermarket Plus) (Phantom Pink)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-aftermarket-plus-phantom-pink',
      sku: 'SS21-OLED-FRAME-AP-PINK',
      description: 'High-quality OLED assembly with frame for Samsung Galaxy S21 5G. Aftermarket Plus quality in Phantom Pink color.',
      price: 79.09,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Aftermarket Plus) (Phantom White)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-aftermarket-plus-phantom-white',
      sku: 'SS21-OLED-FRAME-AP-WHITE',
      description: 'High-quality OLED assembly with frame for Samsung Galaxy S21 5G. Aftermarket Plus quality in Phantom White color.',
      price: 79.09,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Aftermarket Plus) (Phantom Violet)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-aftermarket-plus-phantom-violet',
      sku: 'SS21-OLED-FRAME-AP-VIOLET',
      description: 'High-quality OLED assembly with frame for Samsung Galaxy S21 5G. Aftermarket Plus quality in Phantom Violet color.',
      price: 79.09,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },

    // OLED Assemblies - Refurbished
    {
      name: 'OLED Assembly Without Frame Compatible For Samsung Galaxy S21 5G (Refurbished) (All Colors)',
      slug: 'oled-assembly-without-frame-samsung-galaxy-s21-5g-refurbished-all-colors',
      sku: 'SS21-OLED-NOFRAME-REF-ALL',
      description: 'Refurbished OLED assembly without frame for Samsung Galaxy S21 5G. Compatible with all color variants.',
      price: 89.76,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.07,
      dimensions: '6.2 x 2.8 x 0.25 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Refurbished) (Phantom Gray)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-refurbished-phantom-gray',
      sku: 'SS21-OLED-FRAME-REF-GRAY',
      description: 'Refurbished OLED assembly with frame for Samsung Galaxy S21 5G in Phantom Gray.',
      price: 114.66,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Refurbished) (Phantom Pink)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-refurbished-phantom-pink',
      sku: 'SS21-OLED-FRAME-REF-PINK',
      description: 'Refurbished OLED assembly with frame for Samsung Galaxy S21 5G in Phantom Pink.',
      price: 114.66,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Refurbished) (Phantom White)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-refurbished-phantom-white',
      sku: 'SS21-OLED-FRAME-REF-WHITE',
      description: 'Refurbished OLED assembly with frame for Samsung Galaxy S21 5G in Phantom White.',
      price: 114.66,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Refurbished) (Phantom Violet)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-refurbished-phantom-violet',
      sku: 'SS21-OLED-FRAME-REF-VIOLET',
      description: 'Refurbished OLED assembly with frame for Samsung Galaxy S21 5G in Phantom Violet.',
      price: 114.66,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },

    // OLED Assemblies - Service Pack
    {
      name: 'OLED Assembly Without Frame Compatible For Samsung Galaxy S21 5G (Service Pack) (All Colors)',
      slug: 'oled-assembly-without-frame-samsung-galaxy-s21-5g-service-pack-all-colors',
      sku: 'SS21-OLED-NOFRAME-SP-ALL',
      description: 'Service pack OLED assembly without frame for Samsung Galaxy S21 5G. Professional installation support included.',
      price: 120.03,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.07,
      dimensions: '6.2 x 2.8 x 0.25 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Service Pack) (Phantom Pink)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-service-pack-phantom-pink',
      sku: 'SS21-OLED-FRAME-SP-PINK',
      description: 'Service pack OLED assembly with frame for Samsung Galaxy S21 5G in Phantom Pink. Professional installation support.',
      price: 123.03,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Service Pack) (Phantom Violet)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-service-pack-phantom-violet',
      sku: 'SS21-OLED-FRAME-SP-VIOLET',
      description: 'Service pack OLED assembly with frame for Samsung Galaxy S21 5G in Phantom Violet. Professional installation support.',
      price: 123.03,
      discount_percentage: 0,
      stock_quantity: 8,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Service Pack) (Phantom White)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-service-pack-phantom-white',
      sku: 'SS21-OLED-FRAME-SP-WHITE',
      description: 'Service pack OLED assembly with frame for Samsung Galaxy S21 5G in Phantom White. Professional installation support.',
      price: 145.59,
      discount_percentage: 0,
      stock_quantity: 6,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S21 5G (Service Pack) (Phantom Gray)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s21-5g-service-pack-phantom-gray',
      sku: 'SS21-OLED-FRAME-SP-GRAY',
      description: 'Service pack OLED assembly with frame for Samsung Galaxy S21 5G in Phantom Gray. Professional installation support.',
      price: 146.35,
      discount_percentage: 0,
      stock_quantity: 5,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.2 x 2.8 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },

    // Front Glass Products
    {
      name: 'Front Glass Compatible For Samsung Galaxy S21 5G',
      slug: 'front-glass-samsung-galaxy-s21-5g',
      sku: 'SS21-FRONT-GLASS',
      description: 'Replacement front glass screen protector for Samsung Galaxy S21 5G.',
      price: 1.57,
      discount_percentage: 0,
      stock_quantity: 200,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '6.2 x 2.8 x 0.1 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: '2 in 1 Front Glass With OCA Pre-Installed Compatible For Samsung Galaxy S21',
      slug: '2-in-1-front-glass-oca-pre-installed-samsung-galaxy-s21',
      sku: 'SS21-FRONT-GLASS-2IN1-OCA',
      description: '2-in-1 front glass with OCA adhesive pre-installed for Samsung Galaxy S21.',
      price: 2.71,
      discount_percentage: 0,
      stock_quantity: 150,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6.2 x 2.8 x 0.15 inch',
      category_id: 2,
      brand: 'Samsung'
    },

    // Batteries
    {
      name: 'Replacement Battery Compatible For Samsung Galaxy S21 5G (EB-BG991ABY) (AmpSentrix Pro)',
      slug: 'replacement-battery-samsung-galaxy-s21-5g-eb-bg991aby-ampsentrix-pro',
      sku: 'SS21-BATTERY-EB-BG991ABY-PRO',
      description: 'High-quality replacement battery for Samsung Galaxy S21 5G (EB-BG991ABY) from AmpSentrix Pro.',
      price: 11.53,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '3 x 2 x 0.5 inch',
      category_id: 3,
      brand: 'AmpSentrix'
    },
    {
      name: 'Replacement Battery Compatible For Samsung Galaxy S21 5G (EB-BG991ABY) (Service Pack)',
      slug: 'replacement-battery-samsung-galaxy-s21-5g-eb-bg991aby-service-pack',
      sku: 'SS21-BATTERY-EB-BG991ABY-SP',
      description: 'Service pack replacement battery for Samsung Galaxy S21 5G (EB-BG991ABY) with professional installation support.',
      price: 20.97,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '3 x 2 x 0.5 inch',
      category_id: 3,
      brand: 'Samsung'
    },
    {
      name: 'Replacement Battery Compatible For Samsung Galaxy S21 5G (EB-BG991ABY) (Premium)',
      slug: 'replacement-battery-samsung-galaxy-s21-5g-eb-bg991aby-premium',
      sku: 'SS21-BATTERY-EB-BG991ABY-PREM',
      description: 'Premium quality replacement battery for Samsung Galaxy S21 5G (EB-BG991ABY).',
      price: 8.63,
      discount_percentage: 0,
      stock_quantity: 120,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '3 x 2 x 0.5 inch',
      category_id: 3,
      brand: 'Samsung'
    },

    // Charging Port Boards
    {
      name: 'Charging Port Board With Sim Card Reader Compatible For Samsung Galaxy S21 5G (G991U) (US Version) (Premium)',
      slug: 'charging-port-board-sim-reader-samsung-galaxy-s21-5g-g991u-us-premium',
      sku: 'SS21-CHARGING-PORT-G991U-PREM',
      description: 'Premium charging port board with SIM card reader for Samsung Galaxy S21 5G (G991U) US Version.',
      price: 6.71,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: 'Charging Port Board With Sim Card Reader Compatible For Samsung Galaxy S21 5G (G991B) (International Version) (Premium)',
      slug: 'charging-port-board-sim-reader-samsung-galaxy-s21-5g-g991b-intl-premium',
      sku: 'SS21-CHARGING-PORT-G991B-PREM',
      description: 'Premium charging port board with SIM card reader for Samsung Galaxy S21 5G (G991B) International Version.',
      price: 6.89,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: 'Charging Port Board With Sim Card Reader Compatible For Samsung Galaxy S21 5G (G9910) (Premium)',
      slug: 'charging-port-board-sim-reader-samsung-galaxy-s21-5g-g9910-premium',
      sku: 'SS21-CHARGING-PORT-G9910-PREM',
      description: 'Premium charging port board with SIM card reader for Samsung Galaxy S21 5G (G9910) Asia Version.',
      price: 12.07,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: 'Charging Port Board With Sim Card Reader Compatible For Samsung Galaxy S21 5G (G991U) (North American Version) (Service Pack)',
      slug: 'charging-port-board-sim-reader-samsung-galaxy-s21-5g-g991u-na-service-pack',
      sku: 'SS21-CHARGING-PORT-G991U-NA-SP',
      description: 'Service pack charging port board with SIM card reader for Samsung Galaxy S21 5G (G991U) North American Version.',
      price: 17.24,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: 'Charging Port Only Compatible For Samsung Galaxy S21 5G / S21 Plus 5G / S21 Ultra 5G / S21 FE 5G / S22 5G / S22 Plus 5G / S22 Ultra 5G / S23 5G / S23 Plus 5G / S23 Ultra 5G /S24 5G / S24 Plus 5G / S24U 5G  / S24 FE 5G (10 Pack)',
      slug: 'charging-port-only-samsung-galaxy-s21-series-10-pack',
      sku: 'SS21-CHARGING-PORT-ONLY-10PK',
      description: 'Bulk 10-pack charging port only compatible with Samsung Galaxy S21 series and newer models.',
      price: 3.15,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.10,
      dimensions: '4 x 3 x 1 inch',
      category_id: 4,
      brand: 'Samsung'
    },

    // NFC & Wireless Components
    {
      name: 'NFC Wireless Charging Flex Compatible For Samsung Galaxy S21',
      slug: 'nfc-wireless-charging-flex-samsung-galaxy-s21',
      sku: 'SS21-NFC-WIRELESS-FLEX',
      description: 'NFC wireless charging flex cable for Samsung Galaxy S21.',
      price: 1.53,
      discount_percentage: 0,
      stock_quantity: 90,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.05 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: 'NFC Wireless Charging Flex With Steel Plate Compatible For Samsung Galaxy S21',
      slug: 'nfc-wireless-charging-flex-steel-plate-samsung-galaxy-s21',
      sku: 'SS21-NFC-WIRELESS-FLEX-STEEL',
      description: 'NFC wireless charging flex with steel plate for Samsung Galaxy S21.',
      price: 3.16,
      discount_percentage: 0,
      stock_quantity: 85,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Samsung'
    },

    // Cameras
    {
      name: 'Back Camera (Wide & Telephoto) Compatible For Samsung Galaxy S21 5G (G991U) / S21 Plus 5G (G996U) (US Version) (Used OEM Pull: Grade A)',
      slug: 'back-camera-wide-telephoto-samsung-galaxy-s21-5g-g991u-us-oem-grade-a',
      sku: 'SS21-BACK-CAM-WT-G991U-OEM-A',
      description: 'Grade A used OEM back camera (Wide & Telephoto) for Samsung Galaxy S21 5G (G991U) / S21 Plus 5G (G996U) US Version.',
      price: 46.14,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '1 x 1 x 0.5 inch',
      category_id: 5,
      brand: 'Samsung'
    },
    {
      name: 'Back Camera (Ultra Wide) Compatible For Samsung Galaxy S21 5G (US Version) (Service Pack)',
      slug: 'back-camera-ultra-wide-samsung-galaxy-s21-5g-us-service-pack',
      sku: 'SS21-BACK-CAM-UW-US-SP',
      description: 'Service pack back camera (Ultra Wide) for Samsung Galaxy S21 5G US Version.',
      price: 8.93,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.015,
      dimensions: '1 x 1 x 0.4 inch',
      category_id: 5,
      brand: 'Samsung'
    },
    {
      name: 'Back Camera (Wide & Telephoto) Compatible For Samsung Galaxy S21 5G (G991U) / S21 Plus 5G (G996U) (US Version) (Service Pack)',
      slug: 'back-camera-wide-telephoto-samsung-galaxy-s21-5g-g991u-us-service-pack',
      sku: 'SS21-BACK-CAM-WT-G991U-US-SP',
      description: 'Service pack back camera (Wide & Telephoto) for Samsung Galaxy S21 5G (G991U) / S21 Plus 5G (G996U) US Version.',
      price: 15.65,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '1 x 1 x 0.5 inch',
      category_id: 5,
      brand: 'Samsung'
    },
    {
      name: 'Front Camera Compatible For Samsung Galaxy S21 5G / S21 Plus 5G (International Version / G991B / G996B)',
      slug: 'front-camera-samsung-galaxy-s21-5g-s21-plus-intl-g991b-g996b',
      sku: 'SS21-FRONT-CAM-G991B-G996B',
      description: 'Front camera for Samsung Galaxy S21 5G / S21 Plus 5G International Version (G991B / G996B).',
      price: 2.02,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '0.5 x 0.5 x 0.3 inch',
      category_id: 5,
      brand: 'Samsung'
    },
    {
      name: 'Front Camera Compatible For Samsung Galaxy S21 5G / S21 Plus 5G (US Version / G991U / G996U)',
      slug: 'front-camera-samsung-galaxy-s21-5g-s21-plus-us-g991u-g996u',
      sku: 'SS21-FRONT-CAM-G991U-G996U',
      description: 'Front camera for Samsung Galaxy S21 5G / S21 Plus 5G US Version (G991U / G996U).',
      price: 2.09,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '0.5 x 0.5 x 0.3 inch',
      category_id: 5,
      brand: 'Samsung'
    },
    {
      name: 'Back Camera (Ultra Wide) Compatible For Samsung Galaxy S21 5G / S21 Plus 5G',
      slug: 'back-camera-ultra-wide-samsung-galaxy-s21-5g-s21-plus',
      sku: 'SS21-BACK-CAM-UW-S21-S21P',
      description: 'Back camera (Ultra Wide) for Samsung Galaxy S21 5G / S21 Plus 5G.',
      price: 7.09,
      discount_percentage: 0,
      stock_quantity: 65,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.015,
      dimensions: '1 x 1 x 0.4 inch',
      category_id: 5,
      brand: 'Samsung'
    },
    {
      name: 'Back Camera (Wide & Telephoto & Ultra Wide) Compatible For Samsung Galaxy S21 5G (G991U) / S21 Plus 5G (G996U) (US Version)',
      slug: 'back-camera-wide-telephoto-ultra-wide-samsung-galaxy-s21-5g-g991u-s21-plus-g996u-us',
      sku: 'SS21-BACK-CAM-WTUW-G991U-G996U',
      description: 'Complete back camera set (Wide & Telephoto & Ultra Wide) for Samsung Galaxy S21 5G (G991U) / S21 Plus 5G (G996U) US Version.',
      price: 14.40,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '1.5 x 1 x 0.6 inch',
      category_id: 5,
      brand: 'Samsung'
    },
    {
      name: 'Back Camera (Wide & Telephoto) Compatible For Samsung Galaxy S21 5G / S21 Plus 5G (G991B) (International Version)',
      slug: 'back-camera-wide-telephoto-samsung-galaxy-s21-5g-s21-plus-g991b-intl',
      sku: 'SS21-BACK-CAM-WT-G991B-G996B',
      description: 'Back camera (Wide & Telephoto) for Samsung Galaxy S21 5G / S21 Plus 5G (G991B) International Version.',
      price: 29.05,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '1 x 1 x 0.5 inch',
      category_id: 5,
      brand: 'Samsung'
    },

    // Audio Components
    {
      name: 'Earpiece With Antenna Cover Compatible For Samsung Galaxy S21 5G',
      slug: 'earpiece-antenna-cover-samsung-galaxy-s21-5g',
      sku: 'SS21-EARPIECE-ANTENNA',
      description: 'Earpiece speaker with antenna cover for Samsung Galaxy S21 5G.',
      price: 2.02,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '1 x 0.5 x 0.2 inch',
      category_id: 6,
      brand: 'Samsung'
    },
    {
      name: 'Loudspeaker Compatible For Samsung Galaxy S21 5G',
      slug: 'loudspeaker-samsung-galaxy-s21-5g',
      sku: 'SS21-LOUDSPEAKER',
      description: 'Main loudspeaker for Samsung Galaxy S21 5G.',
      price: 3.11,
      discount_percentage: 0,
      stock_quantity: 85,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 6,
      brand: 'Samsung'
    },

    // Flex Cables
    {
      name: 'Volume Button Flex Cable Compatible For Samsung Galaxy S21 / S21 Plus',
      slug: 'volume-button-flex-cable-samsung-galaxy-s21-s21-plus',
      sku: 'SS21-VOLUME-FLEX-S21-S21P',
      description: 'Volume button flex cable for Samsung Galaxy S21 / S21 Plus.',
      price: 1.16,
      discount_percentage: 0,
      stock_quantity: 120,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: 'Power Button Flex Cable Compatible For Samsung Galaxy S21 5G / S21 Plus 5G',
      slug: 'power-button-flex-cable-samsung-galaxy-s21-5g-s21-plus-5g',
      sku: 'SS21-POWER-FLEX-S21-S21P',
      description: 'Power button flex cable for Samsung Galaxy S21 5G / S21 Plus 5G.',
      price: 1.19,
      discount_percentage: 0,
      stock_quantity: 115,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: 'LCD Flex Cable Compatible For Samsung Galaxy S21',
      slug: 'lcd-flex-cable-samsung-galaxy-s21',
      sku: 'SS21-LCD-FLEX',
      description: 'LCD display flex cable for Samsung Galaxy S21.',
      price: 1.65,
      discount_percentage: 0,
      stock_quantity: 90,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: 'Mainboard Flex Cable Compatible For Samsung Galaxy S21 5G',
      slug: 'mainboard-flex-cable-samsung-galaxy-s21-5g',
      sku: 'SS21-MAINBOARD-FLEX',
      description: 'Mainboard flex cable for Samsung Galaxy S21 5G.',
      price: 1.75,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Samsung'
    },

    // Antennas
    {
      name: '5G Antenna Flex Cable (Long) Compatible For Samsung Galaxy S21 (G991U)',
      slug: '5g-antenna-flex-cable-long-samsung-galaxy-s21-g991u',
      sku: 'SS21-5G-ANTENNA-LONG-G991U',
      description: 'Long 5G antenna flex cable for Samsung Galaxy S21 (G991U).',
      price: 0.58,
      discount_percentage: 0,
      stock_quantity: 150,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: '5G Antenna Flex Cable With Module Compatible For Samsung Galaxy S21 5G (G991U) (4 Piece Set)',
      slug: '5g-antenna-flex-cable-module-samsung-galaxy-s21-5g-g991u-4-piece',
      sku: 'SS21-5G-ANTENNA-MODULE-4PC',
      description: '5G antenna flex cable with module for Samsung Galaxy S21 5G (G991U) - 4 piece set.',
      price: 2.20,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6 x 4 x 0.5 inch',
      category_id: 4,
      brand: 'Samsung'
    },

    // Housings and Frames
    {
      name: 'Mid-Frame Housing Compatible For Samsung Galaxy S21 (Phantom Violet)',
      slug: 'mid-frame-housing-samsung-galaxy-s21-phantom-violet',
      sku: 'SS21-MID-FRAME-VIOLET',
      description: 'Mid-frame housing for Samsung Galaxy S21 in Phantom Violet.',
      price: 15.29,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '6 x 3 x 0.5 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Mid-Frame Housing Compatible For Samsung Galaxy S21 5G (Phantom Pink)',
      slug: 'mid-frame-housing-samsung-galaxy-s21-5g-phantom-pink',
      sku: 'SS21-MID-FRAME-PINK',
      description: 'Mid-frame housing for Samsung Galaxy S21 5G in Phantom Pink.',
      price: 15.36,
      discount_percentage: 0,
      stock_quantity: 28,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '6 x 3 x 0.5 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Mid-Frame Housing Compatible For Samsung Galaxy S21 (Phantom Gray)',
      slug: 'mid-frame-housing-samsung-galaxy-s21-phantom-gray',
      sku: 'SS21-MID-FRAME-GRAY',
      description: 'Mid-frame housing for Samsung Galaxy S21 in Phantom Gray.',
      price: 15.37,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '6 x 3 x 0.5 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Mid-Frame Housing Compatible For Compatible For Samsung Galaxy S21 5G (Phantom White)',
      slug: 'mid-frame-housing-samsung-galaxy-s21-5g-phantom-white',
      sku: 'SS21-MID-FRAME-WHITE',
      description: 'Mid-frame housing for Samsung Galaxy S21 5G in Phantom White.',
      price: 16.08,
      discount_percentage: 0,
      stock_quantity: 22,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '6 x 3 x 0.5 inch',
      category_id: 7,
      brand: 'Samsung'
    },

    // Buttons and SIM Trays
    {
      name: 'Hard Buttons (Power / Volume) Compatible For Samsung Galaxy S21 (Phantom Violet)',
      slug: 'hard-buttons-power-volume-samsung-galaxy-s21-phantom-violet',
      sku: 'SS21-HARD-BUTTONS-VIOLET',
      description: 'Hard buttons (Power / Volume) for Samsung Galaxy S21 in Phantom Violet.',
      price: 0.25,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Hard Buttons (Power / Volume) Compatible For Samsung Galaxy S21 5G (Phantom Pink)',
      slug: 'hard-buttons-power-volume-samsung-galaxy-s21-5g-phantom-pink',
      sku: 'SS21-HARD-BUTTONS-PINK',
      description: 'Hard buttons (Power / Volume) for Samsung Galaxy S21 5G in Phantom Pink.',
      price: 0.90,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Hard Buttons (Power / Volume) Compatible For Samsung Galaxy S21 (Phantom Gray)',
      slug: 'hard-buttons-power-volume-samsung-galaxy-s21-phantom-gray',
      sku: 'SS21-HARD-BUTTONS-GRAY',
      description: 'Hard buttons (Power / Volume) for Samsung Galaxy S21 in Phantom Gray.',
      price: 1.83,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Samsung'
    },

    // SIM Card Trays
    {
      name: 'Dual Sim Card Tray Compatible For Samsung Galaxy S21 (Black)',
      slug: 'dual-sim-card-tray-samsung-galaxy-s21-black',
      sku: 'SS21-DUAL-SIM-TRAY-BLK',
      description: 'Dual SIM card tray for Samsung Galaxy S21 in Black.',
      price: 0.63,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Dual Sim Card Tray Compatible For Samsung Galaxy S21 5G (Phantom Gray)',
      slug: 'dual-sim-card-tray-samsung-galaxy-s21-5g-phantom-gray',
      sku: 'SS21-DUAL-SIM-TRAY-GRAY',
      description: 'Dual SIM card tray for Samsung Galaxy S21 5G in Phantom Gray.',
      price: 0.64,
      discount_percentage: 0,
      stock_quantity: 95,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Single Sim Card Tray Compatible For Samsung Galaxy S21 (Phantom Gray)',
      slug: 'single-sim-card-tray-samsung-galaxy-s21-phantom-gray',
      sku: 'SS21-SINGLE-SIM-TRAY-GRAY',
      description: 'Single SIM card tray for Samsung Galaxy S21 in Phantom Gray.',
      price: 0.95,
      discount_percentage: 0,
      stock_quantity: 90,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Single Sim Card Tray Compatible For Samsung Galaxy S21 5G (Phantom Black)',
      slug: 'single-sim-card-tray-samsung-galaxy-s21-5g-phantom-black',
      sku: 'SS21-SINGLE-SIM-TRAY-BLK',
      description: 'Single SIM card tray for Samsung Galaxy S21 5G in Phantom Black.',
      price: 1.19,
      discount_percentage: 0,
      stock_quantity: 85,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Sim Card Reader Compatible For Samsung Galaxy S21 5G / S21 Plus 5G / S21 Ultra 5G',
      slug: 'sim-card-reader-samsung-galaxy-s21-5g-s21-plus-s21-ultra',
      sku: 'SS21-SIM-READER-S21-SERIES',
      description: 'SIM card reader compatible with Samsung Galaxy S21 5G / S21 Plus 5G / S21 Ultra 5G.',
      price: 1.27,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '0.5 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Dual Sim Card Tray Compatible For Samsung Galaxy S21 5G (Phantom White)',
      slug: 'dual-sim-card-tray-samsung-galaxy-s21-5g-phantom-white',
      sku: 'SS21-DUAL-SIM-TRAY-WHITE',
      description: 'Dual SIM card tray for Samsung Galaxy S21 5G in Phantom White.',
      price: 1.57,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Dual Sim Card Tray Compatible For Samsung Galaxy S21 (Phantom Pink)',
      slug: 'dual-sim-card-tray-samsung-galaxy-s21-phantom-pink',
      sku: 'SS21-DUAL-SIM-TRAY-PINK',
      description: 'Dual SIM card tray for Samsung Galaxy S21 in Phantom Pink.',
      price: 1.57,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },

    // Casper Tempered Glass (from the original list)
    {
      name: 'Casper Pro Tempered Glass Compatible For Samsung Galaxy S21 5G (Case Friendly) (Retail Pack)',
      slug: 'casper-pro-tempered-glass-samsung-galaxy-s21-5g-case-friendly-retail-pack',
      sku: 'CASPER-TG-SS21-CASE-FRIENDLY-RP',
      description: 'Casper Pro tempered glass screen protector for Samsung Galaxy S21 5G. Case friendly design with retail packaging.',
      price: 18.99,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6.2 x 2.8 x 0.1 inch',
      category_id: 2,
      brand: 'Casper'
    }
  ];

  for (const product of products) {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'slug' })
        .select();

      if (error) {
        console.error(`❌ Error inserting product ${product.name}:`, error.message);
      } else {
        console.log(`✅ Inserted product: ${product.name} (ID: ${data[0]?.id})`);
      }
    } catch (error) {
      console.error(`❌ Failed to insert product ${product.name}:`, error.message);
    }
  }
}

async function main() {
  console.log('🚀 Starting Samsung Galaxy S21 5G Products Data Insertion...');

  try {
    await insertProducts();

    console.log('✅ Samsung Galaxy S21 5G products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains comprehensive Samsung Galaxy S21 5G repair parts.');
    console.log('🎉 You can now view and manage these products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
