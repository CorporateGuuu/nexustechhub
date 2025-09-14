#!/usr/bin/env node

/**
 * Insert iPad Pro 13" 7th Gen (2024) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 13" 7th Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 13" 7th Gen products...');

  const products = [
    // OLED Assemblies - Genuine OEM
    {
      name: 'OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (All Colors)',
      slug: 'oled-assembly-with-digitizer-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem-all-colors',
      sku: 'IPAD13G7-OLED-WIFI-OEM-ALL',
      description: 'Genuine Apple OEM OLED assembly with digitizer for iPad Pro 13" 7th Gen (2024) WiFi Only model. Compatible with all colors.',
      price: 731.94,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '11 x 8.5 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Colors)',
      slug: 'oled-assembly-with-digitizer-ipad-pro-13-7th-gen-2024-wifi-cellular-genuine-oem-all-colors',
      sku: 'IPAD13G7-OLED-CELL-OEM-ALL',
      description: 'Genuine Apple OEM OLED assembly with digitizer for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model. Compatible with all colors.',
      price: 731.94,
      discount_percentage: 0,
      stock_quantity: 8,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '11 x 8.5 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // Display Assemblies - Nano Texture
    {
      name: 'Display Assembly (Nano-Texture) Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (All Colors)',
      slug: 'display-assembly-nano-texture-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem-all-colors',
      sku: 'IPAD13G7-DISP-NANO-WIFI-OEM-ALL',
      description: 'Genuine Apple OEM display assembly with nano-texture for iPad Pro 13" 7th Gen (2024) WiFi Only model. Compatible with all colors.',
      price: 731.94,
      discount_percentage: 0,
      stock_quantity: 6,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '11 x 8.5 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'Display Assembly Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Colors)',
      slug: 'display-assembly-ipad-pro-13-7th-gen-2024-wifi-cellular-genuine-oem-all-colors',
      sku: 'IPAD13G7-DISP-CELL-OEM-ALL',
      description: 'Genuine Apple OEM display assembly for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model. Compatible with all colors.',
      price: 731.94,
      discount_percentage: 0,
      stock_quantity: 5,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '11 x 8.5 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // OLED Assemblies - Refurbished
    {
      name: 'OLED Assembly With Digitizer Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Refurbished) (All Colors)',
      slug: 'oled-assembly-with-digitizer-ipad-pro-13-7th-gen-2024-wifi-cellular-refurbished-all-colors',
      sku: 'IPAD13G7-OLED-CELL-REF-ALL',
      description: 'Refurbished OLED assembly with digitizer for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model. Compatible with all colors.',
      price: 896.32,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '11 x 8.5 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // Digitizer
    {
      name: 'Digitizer Compatible For iPad Pro 13" 7th Gen (2024) (Glass Separation Required) (Premium) (Black)',
      slug: 'digitizer-ipad-pro-13-7th-gen-2024-glass-separation-required-premium-black',
      sku: 'IPAD13G7-DIGITIZER-PREM-BLK',
      description: 'Premium digitizer for iPad Pro 13" 7th Gen (2024). Glass separation required. Black color.',
      price: 125.13,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '11 x 8.5 x 0.3 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Batteries
    {
      name: 'Replacement Battery Compatible For iPad Pro 13" 7th Gen (2024) (Genuine OEM)',
      slug: 'replacement-battery-ipad-pro-13-7th-gen-2024-genuine-oem',
      sku: 'IPAD13G7-BATTERY-OEM',
      description: 'Genuine Apple OEM replacement battery for iPad Pro 13" 7th Gen (2024).',
      price: 156.64,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '8 x 6 x 0.3 inch',
      category_id: 3,
      brand: 'Apple'
    },

    // Charging Port Flex Cables - Genuine OEM
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Genuine OEM) (Gray)',
      slug: 'charging-port-flex-cable-ipad-pro-13-7th-gen-2024-genuine-oem-gray',
      sku: 'IPAD13G7-CHARGING-FLEX-OEM-GRAY',
      description: 'Genuine Apple OEM charging port flex cable for iPad Pro 13" 7th Gen (2024). Gray color.',
      price: 261.74,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Genuine OEM) (Silver)',
      slug: 'charging-port-flex-cable-ipad-pro-13-7th-gen-2024-genuine-oem-silver',
      sku: 'IPAD13G7-CHARGING-FLEX-OEM-SILVER',
      description: 'Genuine Apple OEM charging port flex cable for iPad Pro 13" 7th Gen (2024). Silver color.',
      price: 261.74,
      discount_percentage: 0,
      stock_quantity: 14,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Charging Port Flex Cables - Aftermarket Plus
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Aftermarket Plus) (Silver)',
      slug: 'charging-port-flex-cable-ipad-pro-13-7th-gen-2024-aftermarket-plus-silver',
      sku: 'IPAD13G7-CHARGING-FLEX-AP-SILVER',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 13" 7th Gen (2024). Silver color.',
      price: 9.23,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Aftermarket Plus) (Space Black)',
      slug: 'charging-port-flex-cable-ipad-pro-13-7th-gen-2024-aftermarket-plus-space-black',
      sku: 'IPAD13G7-CHARGING-FLEX-AP-BLACK',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 13" 7th Gen (2024). Space Black color.',
      price: 9.23,
      discount_percentage: 0,
      stock_quantity: 48,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Charging Port Flex Cables - Premium
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Premium) (Silver)',
      slug: 'charging-port-flex-cable-ipad-pro-13-7th-gen-2024-premium-silver',
      sku: 'IPAD13G7-CHARGING-FLEX-PREM-SILVER',
      description: 'Premium charging port flex cable for iPad Pro 13" 7th Gen (2024). Silver color.',
      price: 16.21,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Premium) (Space Black)',
      slug: 'charging-port-flex-cable-ipad-pro-13-7th-gen-2024-premium-space-black',
      sku: 'IPAD13G7-CHARGING-FLEX-PREM-BLACK',
      description: 'Premium charging port flex cable for iPad Pro 13" 7th Gen (2024). Space Black color.',
      price: 16.21,
      discount_percentage: 0,
      stock_quantity: 38,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Charging Port Only - 10 Pack
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (Soldering Required) (Premium) (10 Pack) (Silver)',
      slug: 'charging-port-only-ipad-pro-11-5th-gen-13-7th-gen-2024-soldering-required-premium-10-pack-silver',
      sku: 'IPAD-CHARGING-PORT-ONLY-10PK-SILVER',
      description: 'Premium charging port only for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). Soldering required. 10-pack in Silver.',
      price: 24.51,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '6 x 4 x 2 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (Soldering Required) (Premium) (10 Pack) (Space Black)',
      slug: 'charging-port-only-ipad-pro-11-5th-gen-13-7th-gen-2024-soldering-required-premium-10-pack-space-black',
      sku: 'IPAD-CHARGING-PORT-ONLY-10PK-BLACK',
      description: 'Premium charging port only for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). Soldering required. 10-pack in Space Black.',
      price: 24.51,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '6 x 4 x 2 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Cameras - Genuine OEM
    {
      name: 'Front Camera Compatible For iPad Pro 13" 7th Gen (2024) (Genuine OEM)',
      slug: 'front-camera-ipad-pro-13-7th-gen-2024-genuine-oem',
      sku: 'IPAD13G7-FRONT-CAM-OEM',
      description: 'Genuine Apple OEM front camera for iPad Pro 13" 7th Gen (2024).',
      price: 261.74,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM)',
      slug: 'back-camera-ipad-pro-13-7th-gen-2024-wifi-cellular-genuine-oem',
      sku: 'IPAD13G7-BACK-CAM-CELL-OEM',
      description: 'Genuine Apple OEM back camera for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model.',
      price: 263.20,
      discount_percentage: 0,
      stock_quantity: 16,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM)',
      slug: 'back-camera-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem',
      sku: 'IPAD13G7-BACK-CAM-WIFI-OEM',
      description: 'Genuine Apple OEM back camera for iPad Pro 13" 7th Gen (2024) WiFi Only model.',
      price: 301.74,
      discount_percentage: 0,
      stock_quantity: 14,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },

    // Cameras - Premium
    {
      name: 'Back Camera Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (Premium)',
      slug: 'back-camera-ipad-pro-11-5th-gen-13-7th-gen-2024-premium',
      sku: 'IPAD-BACK-CAM-11-13-PREM',
      description: 'Premium back camera compatible with iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 37.69,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Front Camera Compatible For iPad Pro 11" 5th Gen / 13" 7th Gen (2024) (Premium)',
      slug: 'front-camera-ipad-pro-11-5th-gen-13-7th-gen-2024-premium',
      sku: 'IPAD-FRONT-CAM-11-13-PREM',
      description: 'Premium front camera compatible with iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 38.17,
      discount_percentage: 0,
      stock_quantity: 32,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 5,
      brand: 'Apple'
    },

    // Audio Components - Genuine OEM
    {
      name: 'Loud Speaker Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM)',
      slug: 'loud-speaker-ipad-pro-13-7th-gen-2024-wifi-cellular-genuine-oem',
      sku: 'IPAD13G7-SPEAKER-CELL-OEM',
      description: 'Genuine Apple OEM loud speaker for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '3 x 2 x 0.5 inch',
      category_id: 6,
      brand: 'Apple'
    },
    {
      name: 'Loud Speaker Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM)',
      slug: 'loud-speaker-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem',
      sku: 'IPAD13G7-SPEAKER-WIFI-OEM',
      description: 'Genuine Apple OEM loud speaker for iPad Pro 13" 7th Gen (2024) WiFi Only model.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '3 x 2 x 0.5 inch',
      category_id: 6,
      brand: 'Apple'
    },
    {
      name: 'Earpiece Speaker Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM)',
      slug: 'earpiece-speaker-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem',
      sku: 'IPAD13G7-EARPIECE-WIFI-OEM',
      description: 'Genuine Apple OEM earpiece speaker for iPad Pro 13" 7th Gen (2024) WiFi Only model.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 16,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 6,
      brand: 'Apple'
    },

    // Buttons - Genuine OEM
    {
      name: 'Power Button Flex Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (Space Gray)',
      slug: 'power-button-flex-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem-space-gray',
      sku: 'IPAD13G7-POWER-BUTTON-WIFI-OEM-GRAY',
      description: 'Genuine Apple OEM power button flex for iPad Pro 13" 7th Gen (2024) WiFi Only model. Space Gray color.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 22,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Power Button Flex Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (Silver)',
      slug: 'power-button-flex-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem-silver',
      sku: 'IPAD13G7-POWER-BUTTON-WIFI-OEM-SILVER',
      description: 'Genuine Apple OEM power button flex for iPad Pro 13" 7th Gen (2024) WiFi Only model. Silver color.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Flex Cables - Various Types
    {
      name: 'Volume Button Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (WiFi Version) (Aftermarket Plus)',
      slug: 'volume-button-flex-cable-ipad-pro-11-5th-gen-13-7th-gen-2024-wifi-version-aftermarket-plus',
      sku: 'IPAD-VOLUME-FLEX-11-13-WIFI-AP',
      description: 'Aftermarket Plus volume button flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024) WiFi version.',
      price: 6.28,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (4G Version)',
      slug: 'volume-button-flex-cable-ipad-pro-11-5th-gen-13-7th-gen-2024-4g-version',
      sku: 'IPAD-VOLUME-FLEX-11-13-4G',
      description: 'Volume button flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024) 4G version.',
      price: 7.12,
      discount_percentage: 0,
      stock_quantity: 42,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Power Button Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (WiFi Version) (Aftermarket Plus)',
      slug: 'power-button-flex-cable-ipad-pro-11-5th-gen-13-7th-gen-2024-wifi-version-aftermarket-plus',
      sku: 'IPAD-POWER-FLEX-11-13-WIFI-AP',
      description: 'Aftermarket Plus power button flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024) WiFi version.',
      price: 7.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // LCD Flex Cables
    {
      name: 'LCD Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Aftermarket Plus) (2 Piece Set)',
      slug: 'lcd-flex-cable-ipad-pro-13-7th-gen-2024-aftermarket-plus-2-piece-set',
      sku: 'IPAD13G7-LCD-FLEX-AP-2PC',
      description: 'Aftermarket Plus LCD flex cable for iPad Pro 13" 7th Gen (2024). 2 piece set.',
      price: 11.17,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '6 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'LCD Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Premium) (2 Piece Set)',
      slug: 'lcd-flex-cable-ipad-pro-13-7th-gen-2024-premium-2-piece-set',
      sku: 'IPAD13G7-LCD-FLEX-PREM-2PC',
      description: 'Premium LCD flex cable for iPad Pro 13" 7th Gen (2024). 2 piece set.',
      price: 16.63,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '6 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Keyboard and Sensor Flex Cables
    {
      name: 'Keyboard Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Premium) (White)',
      slug: 'keyboard-flex-cable-ipad-pro-13-7th-gen-2024-premium-white',
      sku: 'IPAD13G7-KEYBOARD-FLEX-PREM-WHITE',
      description: 'Premium keyboard flex cable for iPad Pro 13" 7th Gen (2024). White color.',
      price: 4.90,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Keyboard Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Premium) (Black)',
      slug: 'keyboard-flex-cable-ipad-pro-13-7th-gen-2024-premium-black',
      sku: 'IPAD13G7-KEYBOARD-FLEX-PREM-BLACK',
      description: 'Premium keyboard flex cable for iPad Pro 13" 7th Gen (2024). Black color.',
      price: 4.90,
      discount_percentage: 0,
      stock_quantity: 48,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Infrared Radar Scanner Flex Cable Compatible For iPad Pro 11" 5th Gen / 13" 7th Gen (2024) (Premium)',
      slug: 'infrared-radar-scanner-flex-cable-ipad-pro-11-5th-gen-13-7th-gen-2024-premium',
      sku: 'IPAD-INFRARED-FLEX-11-13-PREM',
      description: 'Premium infrared radar scanner flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 5.81,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Proximity Sensor Flex Cable Compatible For iPad Pro 11" 5th Gen / 13" 7th Gen (2024) (Premium)',
      slug: 'proximity-sensor-flex-cable-ipad-pro-11-5th-gen-13-7th-gen-2024-premium',
      sku: 'IPAD-PROXIMITY-FLEX-11-13-PREM',
      description: 'Premium proximity sensor flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 5.81,
      discount_percentage: 0,
      stock_quantity: 38,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Microphone Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'microphone-flex-cable-ipad-pro-13-7th-gen-2024-premium',
      sku: 'IPAD13G7-MIC-FLEX-PREM',
      description: 'Premium microphone flex cable for iPad Pro 13" 7th Gen (2024).',
      price: 6.75,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Mainboard Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'mainboard-flex-cable-ipad-pro-13-7th-gen-2024-premium',
      sku: 'IPAD13G7-MAINBOARD-FLEX-PREM',
      description: 'Premium mainboard flex cable for iPad Pro 13" 7th Gen (2024).',
      price: 7.87,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Mainboard Transfer Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'mainboard-transfer-flex-cable-ipad-pro-13-7th-gen-2024-premium',
      sku: 'IPAD13G7-MAINBOARD-TRANSFER-FLEX-PREM',
      description: 'Premium mainboard transfer flex cable for iPad Pro 13" 7th Gen (2024).',
      price: 37.53,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '6 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Flashlight Flex Cable Compatible For iPad Pro 11" 5th Gen / 13" 7th Gen (2024) (Premium)',
      slug: 'flashlight-flex-cable-ipad-pro-11-5th-gen-13-7th-gen-2024-premium',
      sku: 'IPAD-FLASHLIGHT-FLEX-11-13-PREM',
      description: 'Premium flashlight flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 10.99,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Stylus Pen Flex Cable Compatible For iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'stylus-pen-flex-cable-ipad-pro-13-7th-gen-2024-premium',
      sku: 'IPAD13G7-STYLUS-FLEX-PREM',
      description: 'Premium stylus pen flex cable for iPad Pro 13" 7th Gen (2024).',
      price: 27.99,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Holding Brackets
    {
      name: 'Front Camera Microphone Flex Cable Holding Bracket Compatible For iPad Pro 11" 5th Gen (2024) / iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'front-camera-microphone-flex-cable-holding-bracket-ipad-pro-11-5th-gen-13-7th-gen-2024-premium',
      sku: 'IPAD-FRONT-MIC-BRACKET-11-13-PREM',
      description: 'Premium front camera microphone flex cable holding bracket for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 1.18,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '1 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'LCD Cable Holding Bracket Compatible For iPad Pro 11" 5th Gen (2024) / iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'lcd-cable-holding-bracket-ipad-pro-11-5th-gen-13-7th-gen-2024-premium',
      sku: 'IPAD-LCD-BRACKET-11-13-PREM',
      description: 'Premium LCD cable holding bracket for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 2.02,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Holding Bracket Compatible For iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'back-camera-holding-bracket-ipad-pro-13-7th-gen-2024-premium',
      sku: 'IPAD13G7-BACK-CAM-BRACKET-PREM',
      description: 'Premium back camera holding bracket for iPad Pro 13" 7th Gen (2024).',
      price: 2.95,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Link board Holding Bracket Compatible For iPad Pro 11" 5th Gen (2024) / iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'link-board-holding-bracket-ipad-pro-11-5th-gen-13-7th-gen-2024-premium',
      sku: 'IPAD-LINK-BRACKET-11-13-PREM',
      description: 'Premium link board holding bracket for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 2.95,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'LCD Holding Bracket Compatible For iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'lcd-holding-bracket-ipad-pro-13-7th-gen-2024-premium',
      sku: 'IPAD13G7-LCD-BRACKET-PREM',
      description: 'Premium LCD holding bracket for iPad Pro 13" 7th Gen (2024).',
      price: 6.83,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 2 x 0.4 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Mainboard Holding Bracket Compatible For iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'mainboard-holding-bracket-ipad-pro-13-7th-gen-2024-premium',
      sku: 'IPAD13G7-MAINBOARD-BRACKET-PREM',
      description: 'Premium mainboard holding bracket for iPad Pro 13" 7th Gen (2024).',
      price: 7.21,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 2 x 0.4 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Buttons
    {
      name: 'Hard Buttons (Power / Volume) Compatible For iPad Pro 11" (5th Gen, 2024) / iPad Pro 13" 7th Gen (2024) (Silver)',
      slug: 'hard-buttons-power-volume-ipad-pro-11-5th-gen-13-7th-gen-2024-silver',
      sku: 'IPAD-HARD-BUTTONS-11-13-SILVER',
      description: 'Hard buttons (Power / Volume) for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). Silver color.',
      price: 7.87,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '3 x 2 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Hard Buttons (Power / Volume) Compatible For iPad Pro 11" (5th Gen, 2024) / iPad Pro 13" 7th Gen (2024) (Space Black)',
      slug: 'hard-buttons-power-volume-ipad-pro-11-5th-gen-13-7th-gen-2024-space-black',
      sku: 'IPAD-HARD-BUTTONS-11-13-BLACK',
      description: 'Hard buttons (Power / Volume) for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). Space Black color.',
      price: 7.87,
      discount_percentage: 0,
      stock_quantity: 48,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '3 x 2 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Button Sets
    {
      name: 'Full Button And Bracket Set Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (11 Piece Set) (Gray)',
      slug: 'full-button-and-bracket-set-ipad-pro-11-5th-gen-13-7th-gen-2024-11-piece-gray',
      sku: 'IPAD-BUTTON-SET-11PC-GRAY',
      description: 'Full button and bracket set for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). 11 piece set in Gray.',
      price: 16.86,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Full Button And Bracket Set Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (11 Piece Set) (Silver)',
      slug: 'full-button-and-bracket-set-ipad-pro-11-5th-gen-13-7th-gen-2024-11-piece-silver',
      sku: 'IPAD-BUTTON-SET-11PC-SILVER',
      description: 'Full button and bracket set for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). 11 piece set in Silver.',
      price: 16.86,
      discount_percentage: 0,
      stock_quantity: 23,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Adhesive Tapes
    {
      name: 'Display Adhesive Tape Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM)',
      slug: 'display-adhesive-tape-ipad-pro-13-7th-gen-2024-wifi-cellular-genuine-oem',
      sku: 'IPAD13G7-DISPLAY-TAPE-CELL-OEM',
      description: 'Genuine Apple OEM display adhesive tape for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model.',
      price: 11.58,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '12 x 8 x 0.05 inch',
      category_id: 8,
      brand: 'Apple'
    },
    {
      name: 'Display Adhesive Tape Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM)',
      slug: 'display-adhesive-tape-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem',
      sku: 'IPAD13G7-DISPLAY-TAPE-WIFI-OEM',
      description: 'Genuine Apple OEM display adhesive tape for iPad Pro 13" 7th Gen (2024) WiFi Only model.',
      price: 9.33,
      discount_percentage: 0,
      stock_quantity: 38,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '12 x 8 x 0.05 inch',
      category_id: 8,
      brand: 'Apple'
    },

    // IC Chips and Electronic Components
    {
      name: 'Charging Port FPC Connector Compatible For iPad Pro 11" 3th Gen / Pro 11" 4th Gen / Pro 11" 5th Gen / Pro 12.9" 3th Gen / Pro 12.9" 4th Gen / iPad Pro 12.9" 5th Gen / Pro 12.9" 6th Gen / Pro 13" 7th Gen / Mini 6 / Mini 7 (28 Pin)',
      slug: 'charging-port-fpc-connector-ipad-pro-series-28-pin',
      sku: 'IPAD-CHARGING-FPC-28PIN',
      description: 'Charging port FPC connector compatible with iPad Pro series (28 pin).',
      price: 1.46,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Ace SPI Flash IC (Charge EEPROM) With Program Compatible For iPad Pro 11" 5th Gen / Pro 12.9" 7th Gen (M4 / 2024) (8N)',
      slug: 'ace-spi-flash-ic-charge-eeprom-ipad-pro-11-5th-gen-13-7th-gen-m4-2024-8n',
      sku: 'IPAD-ACE-SPI-FLASH-IC-8N',
      description: 'Ace SPI flash IC (charge EEPROM) with program for iPad Pro 11" 5th Gen / 13" 7th Gen (M4 / 2024) (8N).',
      price: 2.03,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Backlight IC Compatible For iPad Pro 13" / iPad 7 (2019) / iPad 9 (2021) (8566 5AR5)',
      slug: 'backlight-ic-ipad-pro-13-ipad-7-2019-ipad-9-2021-8566-5ar5',
      sku: 'IPAD-BACKLIGHT-IC-8566-5AR5',
      description: 'Backlight IC compatible with iPad Pro 13" / iPad 7 (2019) / iPad 9 (2021) (8566 5AR5).',
      price: 2.15,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Charging IC Compatible For iPad Pro 13" 7th Gen (2024) (SN25A23P)',
      slug: 'charging-ic-ipad-pro-13-7th-gen-2024-sn25a23p',
      sku: 'IPAD13G7-CHARGING-IC-SN25A23P',
      description: 'Charging IC for iPad Pro 13" 7th Gen (2024) (SN25A23P).',
      price: 17.26,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Tester Cables
    {
      name: 'Tester Cable (LCD + Digitizer) Compatible For iPad Pro 11" 5th Gen / 13" 7th Gen (Aftermarket Plus)',
      slug: 'tester-cable-lcd-digitizer-ipad-pro-11-5th-gen-13-7th-gen-aftermarket-plus',
      sku: 'IPAD-TESTER-CABLE-LCD-DIGITIZER-AP',
      description: 'Tester cable (LCD + Digitizer) for iPad Pro 11" 5th Gen / 13" 7th Gen. Aftermarket Plus quality.',
      price: 7.76,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '6 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Power Buttons - Genuine OEM
    {
      name: 'Power Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (Silver)',
      slug: 'power-button-ipad-pro-13-7th-gen-2024-wifi-cellular-genuine-oem-silver',
      sku: 'IPAD13G7-POWER-BUTTON-CELL-OEM-SILVER',
      description: 'Genuine Apple OEM power button for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model. Silver color.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Power Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (Space Gray)',
      slug: 'power-button-ipad-pro-13-7th-gen-2024-wifi-cellular-genuine-oem-space-gray',
      sku: 'IPAD13G7-POWER-BUTTON-CELL-OEM-GRAY',
      description: 'Genuine Apple OEM power button for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model. Space Gray color.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 14,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (Silver)',
      slug: 'volume-button-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem-silver',
      sku: 'IPAD13G7-VOLUME-BUTTON-WIFI-OEM-SILVER',
      description: 'Genuine Apple OEM volume button for iPad Pro 13" 7th Gen (2024) WiFi Only model. Silver color.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 13,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi / Cellular) (Genuine OEM) (Space Gray)',
      slug: 'volume-button-ipad-pro-13-7th-gen-2024-wifi-cellular-genuine-oem-space-gray',
      sku: 'IPAD13G7-VOLUME-BUTTON-CELL-OEM-GRAY',
      description: 'Genuine Apple OEM volume button for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model. Space Gray color.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi/ Cellular) (Genuine OEM) (Silver)',
      slug: 'volume-button-ipad-pro-13-7th-gen-2024-wifi-cellular-genuine-oem-silver',
      sku: 'IPAD13G7-VOLUME-BUTTON-CELL-OEM-SILVER',
      description: 'Genuine Apple OEM volume button for iPad Pro 13" 7th Gen (2024) WiFi/Cellular model. Silver color.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 11,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Compatible For iPad Pro 13" 7th Gen (2024) (WiFi Only) (Genuine OEM) (Space Gray)',
      slug: 'volume-button-ipad-pro-13-7th-gen-2024-wifi-only-genuine-oem-space-gray',
      sku: 'IPAD13G7-VOLUME-BUTTON-WIFI-OEM-GRAY',
      description: 'Genuine Apple OEM volume button for iPad Pro 13" 7th Gen (2024) WiFi Only model. Space Gray color.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Casper Tempered Glass
    {
      name: 'Casper Pro Tempered Glass Compatible For iPad Pro 12.9" 7th Gen (2024) (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-ipad-pro-12-9-7th-gen-2024-retail-pack-clear',
      sku: 'CASPER-TG-IPAD12-9-7TH-RP-CLEAR',
      description: 'Casper Pro tempered glass screen protector for iPad Pro 12.9" 7th Gen (2024). Retail pack with clear finish.',
      price: 29.99,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '12 x 9 x 0.1 inch',
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
  console.log('🚀 Starting iPad Pro 13" 7th Gen Products Data Insertion...');

  try {
    await insertProducts();

    console.log('✅ iPad Pro 13" 7th Gen products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains comprehensive iPad Pro 13" 7th Gen repair parts.');
    console.log('🎉 You can now view and manage these products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
