#!/usr/bin/env node

/**
 * Insert iPad Pro 11" 5th Gen (2024) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 11" 5th Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 11" 5th Gen products...');

  const products = [
    // Display Assemblies
    {
      name: 'Display Assembly (Nano- Texture) Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)',
      slug: 'display-assembly-nano-texture-ipad-pro-11-5th-gen-2024-wifi-cellular-genuine-oem-all-color',
      sku: 'IPAD11G5-DISPLAY-NANO-WIFI-GENUINE',
      description: 'Genuine OEM display assembly with nano-texture for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models. Compatible with all colors.',
      price: 554.86,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.3,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly With Digitizer (Nano- Texture) Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)',
      slug: 'oled-assembly-with-digitizer-nano-texture-ipad-pro-11-5th-gen-2024-wifi-cellular-genuine-oem-all-color',
      sku: 'IPAD11G5-OLED-DIGITIZER-WIFI-GENUINE',
      description: 'Genuine OEM OLED assembly with digitizer and nano-texture for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models. Compatible with all colors.',
      price: 589.86,
      discount_percentage: 0,
      stock_quantity: 8,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.32,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'Display Assembly (Nano- Texture) Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (All Color)',
      slug: 'display-assembly-nano-texture-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem-all-color',
      sku: 'IPAD11G5-DISPLAY-NANO-WIFI-ONLY-GENUINE',
      description: 'Genuine OEM display assembly with nano-texture for iPad Pro 11" 5th Gen (2024) WiFi-only models. Compatible with all colors.',
      price: 554.86,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.3,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (All Color)',
      slug: 'oled-assembly-with-digitizer-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem-all-color',
      sku: 'IPAD11G5-OLED-DIGITIZER-WIFI-ONLY-GENUINE',
      description: 'Genuine OEM OLED assembly with digitizer for iPad Pro 11" 5th Gen (2024) WiFi-only models. Compatible with all colors.',
      price: 591.51,
      discount_percentage: 0,
      stock_quantity: 9,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.32,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM) (All Color)',
      slug: 'oled-assembly-with-digitizer-ipad-pro-11-5th-gen-2024-wifi-cellular-genuine-oem-all-color',
      sku: 'IPAD11G5-OLED-DIGITIZER-WIFI-CELLULAR-GENUINE',
      description: 'Genuine OEM OLED assembly with digitizer for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models. Compatible with all colors.',
      price: 626.51,
      discount_percentage: 0,
      stock_quantity: 7,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.32,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly With Digitizer Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular)(Refurbished) (All Colors)',
      slug: 'oled-assembly-with-digitizer-ipad-pro-11-5th-gen-2024-wifi-cellular-refurbished-all-colors',
      sku: 'IPAD11G5-OLED-DIGITIZER-WIFI-CELLULAR-REFURBISHED',
      description: 'Refurbished OLED assembly with digitizer for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models. Compatible with all colors.',
      price: 713.34,
      discount_percentage: 0,
      stock_quantity: 5,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.32,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // Digitizers
    {
      name: 'Digitizer Compatible For iPad Pro 11" 5th Gen (2024) (Glass Separation Required) (Premium) (All Colors)',
      slug: 'digitizer-ipad-pro-11-5th-gen-2024-glass-separation-required-premium-all-colors',
      sku: 'IPAD11G5-DIGITIZER-PREMIUM',
      description: 'Premium digitizer for iPad Pro 11" 5th Gen (2024). Glass separation required. Compatible with all colors.',
      price: 122.21,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '11 x 8 x 0.2 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Batteries
    {
      name: 'Replacement Battery Compatible For iPad Pro 11" 5th Gen (2024) (Genuine OEM)',
      slug: 'replacement-battery-ipad-pro-11-5th-gen-2024-genuine-oem',
      sku: 'IPAD11G5-BATTERY-GENUINE',
      description: 'Genuine OEM replacement battery for iPad Pro 11" 5th Gen (2024).',
      price: 140.47,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '9 x 7 x 0.2 inch',
      category_id: 3,
      brand: 'Apple'
    },

    // Charging Port Flex Cables
    {
      name: 'Charging Port (I/O) Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Genuine OEM) (Silver)',
      slug: 'charging-port-io-flex-cable-ipad-pro-11-5th-gen-2024-genuine-oem-silver',
      sku: 'IPAD11G5-CHARGING-FLEX-GENUINE-SILVER',
      description: 'Genuine OEM charging port flex cable for iPad Pro 11" 5th Gen (2024). Silver color.',
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Genuine OEM) (Gray)',
      slug: 'charging-port-flex-cable-ipad-pro-11-5th-gen-2024-genuine-oem-gray',
      sku: 'IPAD11G5-CHARGING-FLEX-GENUINE-GRAY',
      description: 'Genuine OEM charging port flex cable for iPad Pro 11" 5th Gen (2024). Gray color.',
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Aftermarket Plus) (Space Black)',
      slug: 'charging-port-flex-cable-ipad-pro-11-5th-gen-2024-aftermarket-plus-space-black',
      sku: 'IPAD11G5-CHARGING-FLEX-AP-BLACK',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 11" 5th Gen (2024). Space Black color.',
      price: 9.23,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Aftermarket Plus) (Silver)',
      slug: 'charging-port-flex-cable-ipad-pro-11-5th-gen-2024-aftermarket-plus-silver',
      sku: 'IPAD11G5-CHARGING-FLEX-AP-SILVER',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 11" 5th Gen (2024). Silver color.',
      price: 9.23,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium) (Silver)',
      slug: 'charging-port-flex-cable-ipad-pro-11-5th-gen-2024-premium-silver',
      sku: 'IPAD11G5-CHARGING-FLEX-PREMIUM-SILVER',
      description: 'Premium charging port flex cable for iPad Pro 11" 5th Gen (2024). Silver color.',
      price: 16.21,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium) (Space Black)',
      slug: 'charging-port-flex-cable-ipad-pro-11-5th-gen-2024-premium-space-black',
      sku: 'IPAD11G5-CHARGING-FLEX-PREMIUM-BLACK',
      description: 'Premium charging port flex cable for iPad Pro 11" 5th Gen (2024). Space Black color.',
      price: 16.22,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (Soldering Required) (Premium) (10 Pack) (Space Black)',
      slug: 'charging-port-only-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-soldering-required-premium-10-pack-space-black',
      sku: 'IPAD11G5-CHARGING-PORT-10PK-BLACK',
      description: 'Charging port only for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). Soldering required. Premium quality. 10-pack. Space Black.',
      price: 24.51,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '5 x 4 x 1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (Soldering Required) (Premium) (10 Pack) (Silver)',
      slug: 'charging-port-only-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-soldering-required-premium-10-pack-silver',
      sku: 'IPAD11G5-CHARGING-PORT-10PK-SILVER',
      description: 'Charging port only for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). Soldering required. Premium quality. 10-pack. Silver.',
      price: 24.51,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '5 x 4 x 1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Cameras
    {
      name: 'Front Camera Compatible For iPad Pro 11" 5th Gen (2024) (Genuine OEM)',
      slug: 'front-camera-ipad-pro-11-5th-gen-2024-genuine-oem',
      sku: 'IPAD11G5-FRONT-CAMERA-GENUINE',
      description: 'Genuine OEM front camera for iPad Pro 11" 5th Gen (2024).',
      price: 261.74,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM)',
      slug: 'back-camera-ipad-pro-11-5th-gen-2024-wifi-cellular-genuine-oem',
      sku: 'IPAD11G5-BACK-CAMERA-WIFI-GENUINE',
      description: 'Genuine OEM back camera for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models.',
      price: 263.20,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM)',
      slug: 'back-camera-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem',
      sku: 'IPAD11G5-BACK-CAMERA-WIFI-ONLY-GENUINE',
      description: 'Genuine OEM back camera for iPad Pro 11" 5th Gen (2024) WiFi-only models.',
      price: 301.74,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (Premium)',
      slug: 'back-camera-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-premium',
      sku: 'IPAD11G5-BACK-CAMERA-PREMIUM',
      description: 'Premium back camera for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 37.69,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Front Camera Compatible For iPad Pro 11" 5rd Gen / 13" 7th Gen (2024) (Premium)',
      slug: 'front-camera-ipad-pro-11-5rd-gen-13-7th-gen-2024-premium',
      sku: 'IPAD11G5-FRONT-CAMERA-PREMIUM',
      description: 'Premium front camera for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 38.17,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 5,
      brand: 'Apple'
    },

    // Speakers
    {
      name: 'Top Speaker Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Celluar) (Genuine OEM)',
      slug: 'top-speaker-ipad-pro-11-5th-gen-2024-wifi-celluar-genuine-oem',
      sku: 'IPAD11G5-TOP-SPEAKER-WIFI-GENUINE',
      description: 'Genuine OEM top speaker for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '3 x 2 x 0.5 inch',
      category_id: 6,
      brand: 'Apple'
    },
    {
      name: 'Bottom Speaker Compatible For iPad Pro 11" 5th Gen (2024) (Wifi Only) (Genuine OEM)',
      slug: 'bottom-speaker-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem',
      sku: 'IPAD11G5-BOTTOM-SPEAKER-WIFI-GENUINE',
      description: 'Genuine OEM bottom speaker for iPad Pro 11" 5th Gen (2024) WiFi-only models.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '3 x 2 x 0.5 inch',
      category_id: 6,
      brand: 'Apple'
    },
    {
      name: 'Top Speaker Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM)',
      slug: 'top-speaker-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem',
      sku: 'IPAD11G5-TOP-SPEAKER-WIFI-ONLY-GENUINE',
      description: 'Genuine OEM top speaker for iPad Pro 11" 5th Gen (2024) WiFi-only models.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '3 x 2 x 0.5 inch',
      category_id: 6,
      brand: 'Apple'
    },

    // Button Flex Cables
    {
      name: 'Power Button Flex Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (Space Gray)',
      slug: 'power-button-flex-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem-space-gray',
      sku: 'IPAD11G5-POWER-BUTTON-GENUINE-GRAY',
      description: 'Genuine OEM power button flex for iPad Pro 11" 5th Gen (2024) WiFi-only models. Space Gray.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Power Button Flex Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (Silver)',
      slug: 'power-button-flex-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem-silver',
      sku: 'IPAD11G5-POWER-BUTTON-GENUINE-SILVER',
      description: 'Genuine OEM power button flex for iPad Pro 11" 5th Gen (2024) WiFi-only models. Silver.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (WiFi Version)',
      slug: 'volume-button-flex-cable-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-wifi-version',
      sku: 'IPAD11G5-VOLUME-BUTTON-WIFI',
      description: 'Volume button flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). WiFi version.',
      price: 6.28,
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
      name: 'Volume Button Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (4G Version)',
      slug: 'volume-button-flex-cable-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-4g-version',
      sku: 'IPAD11G5-VOLUME-BUTTON-4G',
      description: 'Volume button flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). 4G version.',
      price: 7.12,
      discount_percentage: 0,
      stock_quantity: 28,
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
      slug: 'power-button-flex-cable-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-wifi-version-aftermarket-plus',
      sku: 'IPAD11G5-POWER-BUTTON-WIFI-AP',
      description: 'Power button flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). WiFi version. Aftermarket Plus.',
      price: 7.99,
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

    // LCD Flex Cables
    {
      name: 'LCD Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Aftermarket Plus) (2 Piece Set)',
      slug: 'lcd-flex-cable-ipad-pro-11-5th-gen-2024-aftermarket-plus-2-piece-set',
      sku: 'IPAD11G5-LCD-FLEX-AP-2PC',
      description: 'LCD flex cable for iPad Pro 11" 5th Gen (2024). Aftermarket Plus. 2-piece set.',
      price: 11.13,
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
      name: 'Keyboard Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium) (Black)',
      slug: 'keyboard-flex-cable-ipad-pro-11-5th-gen-2024-premium-black',
      sku: 'IPAD11G5-KEYBOARD-FLEX-PREMIUM-BLACK',
      description: 'Premium keyboard flex cable for iPad Pro 11" 5th Gen (2024). Black.',
      price: 4.90,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Keyboard Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium) (White)',
      slug: 'keyboard-flex-cable-ipad-pro-11-5th-gen-2024-premium-white',
      sku: 'IPAD11G5-KEYBOARD-FLEX-PREMIUM-WHITE',
      description: 'Premium keyboard flex cable for iPad Pro 11" 5th Gen (2024). White.',
      price: 4.90,
      discount_percentage: 0,
      stock_quantity: 25,
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
      sku: 'IPAD11G5-INFRARED-SCANNER-PREMIUM',
      description: 'Premium infrared radar scanner flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 5.81,
      discount_percentage: 0,
      stock_quantity: 20,
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
      sku: 'IPAD11G5-PROXIMITY-SENSOR-PREMIUM',
      description: 'Premium proximity sensor flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 5.81,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Microphone Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium)',
      slug: 'microphone-flex-cable-ipad-pro-11-5th-gen-2024-premium',
      sku: 'IPAD11G5-MICROPHONE-FLEX-PREMIUM',
      description: 'Premium microphone flex cable for iPad Pro 11" 5th Gen (2024).',
      price: 7.17,
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
    {
      name: 'Microphone Noise Reduction Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium)',
      slug: 'microphone-noise-reduction-cable-ipad-pro-11-5th-gen-2024-premium',
      sku: 'IPAD11G5-MICROPHONE-NOISE-PREMIUM',
      description: 'Premium microphone noise reduction cable for iPad Pro 11" 5th Gen (2024).',
      price: 7.48,
      discount_percentage: 0,
      stock_quantity: 22,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Mainboard Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium)',
      slug: 'mainboard-flex-cable-ipad-pro-11-5th-gen-2024-premium',
      sku: 'IPAD11G5-MAINBOARD-FLEX-PREMIUM',
      description: 'Premium mainboard flex cable for iPad Pro 11" 5th Gen (2024).',
      price: 7.87,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '6 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Microphone Flex Cable Compatible For iPad Pro 11" (5th Gen, 2024) (Premium)',
      slug: 'microphone-flex-cable-ipad-pro-11-5th-gen-2024-premium-front',
      sku: 'IPAD11G5-FRONT-MICROPHONE-PREMIUM',
      description: 'Premium front camera microphone flex cable for iPad Pro 11" 5th Gen (2024).',
      price: 8.12,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'LCD Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium) (2 Piece Set)',
      slug: 'lcd-flex-cable-ipad-pro-11-5th-gen-2024-premium-2-piece-set',
      sku: 'IPAD11G5-LCD-FLEX-PREMIUM-2PC',
      description: 'Premium LCD flex cable for iPad Pro 11" 5th Gen (2024). 2-piece set.',
      price: 16.63,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '6 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Mainboard Transfer Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium)',
      slug: 'mainboard-transfer-flex-cable-ipad-pro-11-5th-gen-2024-premium',
      sku: 'IPAD11G5-MAINBOARD-TRANSFER-PREMIUM',
      description: 'Premium mainboard transfer flex cable for iPad Pro 11" 5th Gen (2024).',
      price: 37.53,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '6 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Flashlight Flex Cable Compatible For iPad Pro 11" 5th Gen / 13" 7th Gen (2024) (Premium)',
      slug: 'flashlight-flex-cable-ipad-pro-11-5th-gen-13-7th-gen-2024-premium',
      sku: 'IPAD11G5-FLASHLIGHT-FLEX-PREMIUM',
      description: 'Premium flashlight flex cable for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 10.99,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Front Camera Microphone Flex Cable Holding Bracket Compatible For iPad Pro 11" 5th Gen (2024) / iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'front-camera-microphone-flex-cable-holding-bracket-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-premium',
      sku: 'IPAD11G5-FRONT-MIC-BRACKET-PREMIUM',
      description: 'Premium front camera microphone flex cable holding bracket for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 1.18,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // LCD Cable Holding Bracket
    {
      name: 'LCD Cable Holding Bracket Compatible For iPad Pro 11" 5th Gen (2024) / iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'lcd-cable-holding-bracket-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-premium',
      sku: 'IPAD11G5-LCD-CABLE-BRACKET-PREMIUM',
      description: 'Premium LCD cable holding bracket for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 2.02,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Back Camera Holding Bracket
    {
      name: 'Back Camera Holding Bracket Compatible For iPad Pro 11" 5th Gen (2024) (Premium)',
      slug: 'back-camera-holding-bracket-ipad-pro-11-5th-gen-2024-premium',
      sku: 'IPAD11G5-BACK-CAMERA-BRACKET-PREMIUM',
      description: 'Premium back camera holding bracket for iPad Pro 11" 5th Gen (2024).',
      price: 2.95,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Link Board Holding Bracket
    {
      name: 'Link board Holding Bracket Compatible For iPad Pro 11" 5th Gen (2024) / iPad Pro 13" 7th Gen (2024) (Premium)',
      slug: 'link-board-holding-bracket-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-premium',
      sku: 'IPAD11G5-LINK-BOARD-BRACKET-PREMIUM',
      description: 'Premium link board holding bracket for iPad Pro 11" 5th Gen / 13" 7th Gen (2024).',
      price: 2.95,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // LCD Holding Bracket
    {
      name: 'LCD Holding Bracket Compatible For iPad Pro 11" 5th Gen (2024) (Premium)',
      slug: 'lcd-holding-bracket-ipad-pro-11-5th-gen-2024-premium',
      sku: 'IPAD11G5-LCD-BRACKET-PREMIUM',
      description: 'Premium LCD holding bracket for iPad Pro 11" 5th Gen (2024).',
      price: 6.83,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 2 x 0.4 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Mainboard Holding Bracket
    {
      name: 'Mainboard Holding Bracket Compatible For iPad Pro 11" 5th Gen (2024) (Premium)',
      slug: 'mainboard-holding-bracket-ipad-pro-11-5th-gen-2024-premium',
      sku: 'IPAD11G5-MAINBOARD-BRACKET-PREMIUM',
      description: 'Premium mainboard holding bracket for iPad Pro 11" 5th Gen (2024).',
      price: 7.21,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 2 x 0.4 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Hard Buttons
    {
      name: 'Hard Buttons (Power / Volume) Compatible For iPad Pro 11" (5th Gen, 2024) / iPad Pro 13" 7th Gen (2024) (Silver)',
      slug: 'hard-buttons-power-volume-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-silver',
      sku: 'IPAD11G5-HARD-BUTTONS-SILVER',
      description: 'Hard buttons (Power / Volume) for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). Silver.',
      price: 7.87,
      discount_percentage: 0,
      stock_quantity: 25,
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
      slug: 'hard-buttons-power-volume-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-space-black',
      sku: 'IPAD11G5-HARD-BUTTONS-BLACK',
      description: 'Hard buttons (Power / Volume) for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). Space Black.',
      price: 7.87,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '3 x 2 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Full Button And Bracket Set
    {
      name: 'Full Button And Bracket Set Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (11 Piece Set) (Gray)',
      slug: 'full-button-and-bracket-set-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-11-piece-set-gray',
      sku: 'IPAD11G5-FULL-BUTTON-SET-GRAY',
      description: 'Full button and bracket set for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). 11-piece set. Gray.',
      price: 16.86,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '6 x 4 x 1 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Full Button And Bracket Set Compatible For iPad Pro 11" 5th Gen (2024) / Pro 13" 7th Gen (2024) (11 Piece Set) (Silver)',
      slug: 'full-button-and-bracket-set-ipad-pro-11-5th-gen-2024-13-7th-gen-2024-11-piece-set-silver',
      sku: 'IPAD11G5-FULL-BUTTON-SET-SILVER',
      description: 'Full button and bracket set for iPad Pro 11" 5th Gen / 13" 7th Gen (2024). 11-piece set. Silver.',
      price: 16.86,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '6 x 4 x 1 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Display Adhesive Tapes
    {
      name: 'Display Adhesive Tape Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM)',
      slug: 'display-adhesive-tape-ipad-pro-11-5th-gen-2024-wifi-cellular-genuine-oem',
      sku: 'IPAD11G5-DISPLAY-TAPE-WIFI-GENUINE',
      description: 'Genuine OEM display adhesive tape for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models.',
      price: 9.33,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '6 x 4 x 0.05 inch',
      category_id: 8,
      brand: 'Apple'
    },
    {
      name: 'Display Adhesive Tape Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM)',
      slug: 'display-adhesive-tape-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem',
      sku: 'IPAD11G5-DISPLAY-TAPE-WIFI-ONLY-GENUINE',
      description: 'Genuine OEM display adhesive tape for iPad Pro 11" 5th Gen (2024) WiFi-only models.',
      price: 9.33,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '6 x 4 x 0.05 inch',
      category_id: 8,
      brand: 'Apple'
    },

    // Stylus Pen Flex Cable
    {
      name: 'Stylus Pen Flex Cable Compatible For iPad Pro 11" 5th Gen (2024) (Premium)',
      slug: 'stylus-pen-flex-cable-ipad-pro-11-5th-gen-2024-premium',
      sku: 'IPAD11G5-STYLUS-PEN-FLEX-PREMIUM',
      description: 'Premium stylus pen flex cable for iPad Pro 11" 5th Gen (2024).',
      price: 27.99,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // SPI Flash IC
    {
      name: 'Ace SPI Flash IC (Charge EEPROM) With Program Compatible For iPad Pro 11" 5th Gen /Pro 12.9" 7th Gen ( M4 / 2024) (8N)',
      slug: 'ace-spi-flash-ic-charge-eeprom-ipad-pro-11-5th-gen-12-9-7th-gen-m4-2024-8n',
      sku: 'IPAD11G5-ACE-SPI-FLASH-8N',
      description: 'Ace SPI flash IC (charge EEPROM) with program for iPad Pro 11" 5th Gen / 12.9" 7th Gen (M4 / 2024) (8N).',
      price: 2.03,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Tester Cable
    {
      name: 'Tester Cable (LCD + Digitizer) Compatible For iPad Pro 11" 5th Gen / 13" 7th Gen (Aftermarket Plus)',
      slug: 'tester-cable-lcd-digitizer-ipad-pro-11-5th-gen-13-7th-gen-aftermarket-plus',
      sku: 'IPAD11G5-TESTER-CABLE-AP',
      description: 'Tester cable (LCD + Digitizer) for iPad Pro 11" 5th Gen / 13" 7th Gen. Aftermarket Plus.',
      price: 7.76,
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

    // Tempered Glass
    {
      name: 'Casper Pro Tempered Glass Compatible For iPad Pro 11 "5th Gen (2024) (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-ipad-pro-11-5th-gen-2024-retail-pack-clear',
      sku: 'IPAD11G5-CASPER-TEMPERED-GLASS-CLEAR',
      description: 'Casper Pro tempered glass for iPad Pro 11" 5th Gen (2024). Retail pack. Clear.',
      price: 0, // Price not specified in the data
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '11 x 8 x 0.1 inch',
      category_id: 2,
      brand: 'Casper'
    },

    // Additional Buttons
    {
      name: 'Volume Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (Space Gray)',
      slug: 'volume-button-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem-space-gray',
      sku: 'IPAD11G5-VOLUME-BUTTON-GENUINE-GRAY',
      description: 'Genuine OEM volume button for iPad Pro 11" 5th Gen (2024) WiFi-only models. Space Gray.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Power Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Celluar) (Genuine OEM) (Silver)',
      slug: 'power-button-ipad-pro-11-5th-gen-2024-wifi-celluar-genuine-oem-silver',
      sku: 'IPAD11G5-POWER-BUTTON-GENUINE-SILVER',
      description: 'Genuine OEM power button for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models. Silver.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Power Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Celluar) (Genuine OEM) (Space Gray)',
      slug: 'power-button-ipad-pro-11-5th-gen-2024-wifi-celluar-genuine-oem-space-gray',
      sku: 'IPAD11G5-POWER-BUTTON-GENUINE-GRAY',
      description: 'Genuine OEM power button for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models. Space Gray.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Celluar) (Genuine OEM) (Silver)',
      slug: 'volume-button-ipad-pro-11-5th-gen-2024-wifi-celluar-genuine-oem-silver',
      sku: 'IPAD11G5-VOLUME-BUTTON-GENUINE-SILVER',
      description: 'Genuine OEM volume button for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models. Silver.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi Only) (Genuine OEM) (Silver)',
      slug: 'volume-button-ipad-pro-11-5th-gen-2024-wifi-only-genuine-oem-silver',
      sku: 'IPAD11G5-VOLUME-BUTTON-WIFI-ONLY-GENUINE-SILVER',
      description: 'Genuine OEM volume button for iPad Pro 11" 5th Gen (2024) WiFi-only models. Silver.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Compatible For iPad Pro 11" 5th Gen (2024) (WiFi / Cellular) (Genuine OEM) (Space Gray)',
      slug: 'volume-button-ipad-pro-11-5th-gen-2024-wifi-cellular-genuine-oem-space-gray',
      sku: 'IPAD11G5-VOLUME-BUTTON-WIFI-CELLULAR-GENUINE-GRAY',
      description: 'Genuine OEM volume button for iPad Pro 11" 5th Gen (2024) WiFi/Cellular models. Space Gray.',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    }
  ];

  try {
    // Process products in batches to handle potential conflicts
    const batchSize = 10;
    let totalInserted = 0;
    const insertedProducts = [];

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(products.length / batchSize)}...`);

      try {
        const { data, error } = await supabase
          .from('products')
          .upsert(batch, { onConflict: 'sku' })
          .select();

        if (error) {
          console.error(`❌ Error upserting batch ${Math.floor(i / batchSize) + 1}:`, error);
          continue; // Continue with next batch instead of exiting
        }

        totalInserted += data.length;
        insertedProducts.push(...data);
        console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} completed: ${data.length} products upserted`);
      } catch (batchError) {
        console.error(`❌ Unexpected error in batch ${Math.floor(i / batchSize) + 1}:`, batchError);
        continue;
      }
    }

    console.log(`✅ Successfully processed ${totalInserted} iPad Pro 11" 5th Gen products into Supabase!`);
    console.log('📊 Products processed:', insertedProducts.map(p => `${p.name} (${p.sku})`));
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

insertProducts();
