#!/usr/bin/env node

/**
 * Insert iPad Pro 11" 4th Gen (2022) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 11" 4th Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 11" 4th Gen products...');

  const products = [
    // Display Assemblies
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (Blemish: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-11-3rd-gen-2021-4th-gen-2022-blemish-grade-a-all-colors',
      sku: 'IPAD11G4-LCD-BLEMISH-A-ALL',
      description: 'Blemish Grade A LCD assembly with digitizer for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022). Compatible with all colors.',
      price: 141.67,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.3,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 11" 3rd Gen (2021) / iPad Pro 11" 4th Gen (2022) (Aftermarket Plus) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-11-3rd-gen-2021-4th-gen-2022-aftermarket-plus-all-colors',
      sku: 'IPAD11G4-LCD-AP-ALL',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022). Compatible with all colors.',
      price: 120.50,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.3,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (Aftermarket Pro: XO7) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-11-3rd-gen-2021-4th-gen-2022-aftermarket-pro-xo7-all-colors',
      sku: 'IPAD11G4-LCD-XO7-ALL',
      description: 'XO7 Aftermarket Pro LCD assembly with digitizer for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022). Compatible with all colors.',
      price: 133.13,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.3,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 11" 3rd Gen (2021) / iPad Pro 11" 4th Gen (2022) (Premium) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-11-3rd-gen-2021-4th-gen-2022-premium-all-colors',
      sku: 'IPAD11G4-LCD-REFURBISHED-ALL',
      description: 'Premium refurbished LCD assembly with digitizer for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022). Compatible with all colors.',
      price: 239.50,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.3,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // Digitizers
    {
      name: 'Digitizer Compatible For iPad Pro 11" 3rd Gen (2021) / iPad Pro 11" 4th Gen (2022) (Glass Separation Required) (Premium) (All Colors)',
      slug: 'digitizer-ipad-pro-11-3rd-gen-2021-4th-gen-2022-glass-separation-required-premium-all-colors',
      sku: 'IPAD11G4-DIGITIZER-PREMIUM',
      description: 'Premium digitizer for iPad Pro 11" 3rd/4th Gen. Glass separation required. Compatible with all colors.',
      price: 38.12,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '11 x 8 x 0.2 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Front Glass
    {
      name: 'Front Glass Compatible For iPad Pro 11" 3rd Gen (2021) / iPad Pro 11" 4th Gen (2022) (Glass Separation Required)',
      slug: 'front-glass-ipad-pro-11-3rd-gen-2021-4th-gen-2022-glass-separation-required',
      sku: 'IPAD11G4-FRONT-GLASS',
      description: 'Front glass for iPad Pro 11" 3rd/4th Gen. Glass separation required.',
      price: 4.03,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '11 x 8 x 0.1 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Batteries
    {
      name: 'Replacement Battery Compatible For iPad Pro 11" 3rd Gen (2021) (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-11-3rd-gen-2021-ampsentrix-pro',
      sku: 'IPAD11G4-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 11" 3rd Gen (2021) from AmpSentrix Pro.',
      price: 30.35,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '9 x 7 x 0.2 inch',
      category_id: 3,
      brand: 'AmpSentrix'
    },

    // Charging Port Flex Cables
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Space Gray) (Aftermarket Plus)',
      slug: 'charging-port-flex-cable-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022-space-gray-aftermarket-plus',
      sku: 'IPAD11G4-CHARGING-FLEX-AP-GRAY',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Space Gray color.',
      price: 3.92,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Silver) (Aftermarket Plus)',
      slug: 'charging-port-flex-cable-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022-silver-aftermarket-plus',
      sku: 'IPAD11G4-CHARGING-FLEX-AP-SILVER',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Silver color.',
      price: 3.92,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Silver) (Premium)',
      slug: 'charging-port-flex-cable-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022-silver-premium',
      sku: 'IPAD11G4-CHARGING-FLEX-PREMIUM-SILVER',
      description: 'Premium charging port flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Silver color.',
      price: 5.48,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Space Gray) (Premium)',
      slug: 'charging-port-flex-cable-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022-space-gray-premium',
      sku: 'IPAD11G4-CHARGING-FLEX-PREMIUM-GRAY',
      description: 'Premium charging port flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Space Gray color.',
      price: 5.49,
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

    // Charging Port Only - 10 Pack
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" (2018 / 2020 / 2021 / 2022) / Pro 12.9" (2018 / 2020 / 2021 / 2022) (Soldering Required) (Space Gray) (10 Pack)',
      slug: 'charging-port-only-ipad-pro-11-2018-2020-2021-2022-12-9-2018-2020-2021-2022-soldering-required-space-gray-10-pack',
      sku: 'IPAD11G4-CHARGING-PORT-10PK-GRAY',
      description: 'Charging port only for iPad Pro 11"/12.9" various generations. Soldering required. Space Gray 10-pack.',
      price: 13.07,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '5 x 4 x 1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" (2018 / 2020 / 2021 / 2022) / Pro 12.9" (2018 / 2020 / 2021 / 2022) (Soldering Required) (Silver) (10 Pack)',
      slug: 'charging-port-only-ipad-pro-11-2018-2020-2021-2022-12-9-2018-2020-2021-2022-soldering-required-silver-10-pack',
      sku: 'IPAD11G4-CHARGING-PORT-10PK-SILVER',
      description: 'Charging port only for iPad Pro 11"/12.9" various generations. Soldering required. Silver 10-pack.',
      price: 16.68,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '5 x 4 x 1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" (2018 / 2020 / 2021 / 2022) / Pro 12.9" (2018 / 2020 / 2021 / 2022) (Soldering Required) (Silver)',
      slug: 'charging-port-only-ipad-pro-11-2018-2020-2021-2022-12-9-2018-2020-2021-2022-soldering-required-silver',
      sku: 'IPAD11G4-CHARGING-PORT-SINGLE-SILVER',
      description: 'Single charging port only for iPad Pro 11"/12.9" various generations. Soldering required. Silver.',
      price: 1.80,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Cameras
    {
      name: 'Front Camera Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022)',
      slug: 'front-camera-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022',
      sku: 'IPAD11G4-FRONT-CAMERA',
      description: 'Front camera compatible with iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen.',
      price: 19.57,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Compatible For iPad Pro 11" 2nd Gen (2020) / 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 4th Gen (2020) / Pro 5th Gen (2021) / Pro 12.9" 6th Gen (2022)',
      slug: 'back-camera-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-4th-gen-2022-12-9-4th-gen-2020-5th-gen-2021-6th-gen-2022',
      sku: 'IPAD11G4-BACK-CAMERA',
      description: 'Back camera compatible with iPad Pro 11" 2nd/3rd/4th Gen and 12.9" 4th/5th/6th Gen.',
      price: 33.11,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },

    // Speakers
    {
      name: 'Loudspeaker Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (4 Piece Set)',
      slug: 'loudspeaker-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-4th-gen-2022-4-piece-set',
      sku: 'IPAD11G4-SPEAKER-4PC',
      description: 'Loudspeaker 4-piece set for iPad Pro 11" 2nd/3rd/4th Gen.',
      price: 24.70,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 6,
      brand: 'Apple'
    },

    // Button Flex Cables
    {
      name: 'Power Button Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (China Version) (4G Version)',
      slug: 'power-button-flex-cable-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-11-3rd-gen-2021-4th-gen-2022-china-version-4g-version',
      sku: 'IPAD11G4-POWER-BUTTON-CHINA-4G',
      description: 'Power button flex cable for iPad Pro 12.9" 5th/6th Gen and 11" 3rd/4th Gen. China version, 4G.',
      price: 3.75,
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
      name: 'Power Button Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (WiFi Version)',
      slug: 'power-button-flex-cable-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-11-3rd-gen-2021-4th-gen-2022-wifi-version',
      sku: 'IPAD11G4-POWER-BUTTON-WIFI',
      description: 'Power button flex cable for iPad Pro 12.9" 5th/6th Gen and 11" 3rd/4th Gen. WiFi version.',
      price: 3.77,
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
      name: 'Power Button Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (US Version) (4G Version)',
      slug: 'power-button-flex-cable-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-11-3rd-gen-2021-4th-gen-2022-us-version-4g-version',
      sku: 'IPAD11G4-POWER-BUTTON-US-4G',
      description: 'Power button flex cable for iPad Pro 12.9" 5th/6th Gen and 11" 3rd/4th Gen. US version, 4G.',
      price: 3.77,
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
      name: 'Volume Button Flex Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (WiFi Version)',
      slug: 'volume-button-flex-ipad-pro-11-3rd-gen-2021-4th-gen-2022-wifi-version',
      sku: 'IPAD11G4-VOLUME-BUTTON-WIFI',
      description: 'Volume button flex for iPad Pro 11" 3rd/4th Gen. WiFi version.',
      price: 4.29,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Flex Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (Cellular Version)',
      slug: 'volume-button-flex-ipad-pro-11-3rd-gen-2021-4th-gen-2022-cellular-version',
      sku: 'IPAD11G4-VOLUME-BUTTON-CELLULAR',
      description: 'Volume button flex for iPad Pro 11" 3rd/4th Gen. Cellular version.',
      price: 4.42,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Face ID Flex Cable
    {
      name: 'Face ID FPC Flex Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / Pro 12.9" 3rd Gen (2018) /Pro 12.9" 4th Gen (2020) (JCID)',
      slug: 'face-id-fpc-flex-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-3rd-gen-2018-4th-gen-2020-jcid',
      sku: 'IPAD11G4-FACE-ID-FLEX-JCID',
      description: 'JCID Face ID FPC flex for iPad Pro 11" 3rd/4th Gen and 12.9" 3rd/4th Gen.',
      price: 9.43,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'JCID'
    },

    // Keyboard Flex Cables
    {
      name: 'Keyboard Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Silver)',
      slug: 'keyboard-flex-cable-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022-silver',
      sku: 'IPAD11G4-KEYBOARD-FLEX-SILVER',
      description: 'Keyboard flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Silver color.',
      price: 1.23,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Keyboard Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022)(Space Gray)',
      slug: 'keyboard-flex-cable-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022-space-gray',
      sku: 'IPAD11G4-KEYBOARD-FLEX-GRAY',
      description: 'Keyboard flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Space Gray color.',
      price: 3.07,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Microphone Flex Cable
    {
      name: 'Microphone Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / iPad Pro 12.9" 5th Gen (2021)',
      slug: 'microphone-flex-cable-ipad-pro-11-3rd-gen-2021-12-9-5th-gen-2021',
      sku: 'IPAD11G4-MICROPHONE-FLEX',
      description: 'Microphone flex cable for iPad Pro 11" 3rd Gen / 12.9" 5th Gen.',
      price: 2.55,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Flashlight Flex Cable
    {
      name: 'Flashlight Flex Cable Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022)',
      slug: 'flashlight-flex-cable-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-4th-gen-2022-12-9-4th-gen-2020-5th-gen-2021-6th-gen-2022',
      sku: 'IPAD11G4-FLASHLIGHT-FLEX',
      description: 'Flashlight flex cable compatible with iPad Pro 11" 2nd/3rd/4th Gen and 12.9" 4th/5th/6th Gen.',
      price: 3.17,
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

    // Proximity Sensor Flex Cable
    {
      name: 'Proximity Sensor Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021)',
      slug: 'proximity-sensor-flex-cable-ipad-pro-11-3rd-gen-2021',
      sku: 'IPAD11G4-PROXIMITY-SENSOR',
      description: 'Proximity sensor flex cable for iPad Pro 11" 3rd Gen (2021).',
      price: 6.94,
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
      name: 'LCD Flex Cable Compatible For iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (2 Piece Set)',
      slug: 'lcd-flex-cable-ipad-pro-11-1st-gen-2018-2nd-gen-2020-3rd-gen-2021-4th-gen-2022-2-piece-set',
      sku: 'IPAD11G4-LCD-FLEX-2PC',
      description: 'LCD flex cable for iPad Pro 11" 1st/2nd/3rd/4th Gen. 2-piece set.',
      price: 7.91,
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

    // Face ID Flex Cable
    {
      name: 'Face ID Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021)',
      slug: 'face-id-flex-cable-ipad-pro-11-3rd-gen-2021',
      sku: 'IPAD11G4-FACE-ID-FLEX',
      description: 'Face ID flex cable for iPad Pro 11" 3rd Gen (2021).',
      price: 8.93,
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

    // WiFi & GPS Antenna Flex Cable
    {
      name: 'WiFi & GPS Antenna Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th (2022)',
      slug: 'wifi-gps-antenna-flex-cable-ipad-pro-11-3rd-gen-2021-4th-2022',
      sku: 'IPAD11G4-WIFI-GPS-ANTENNA',
      description: 'WiFi & GPS antenna flex cable for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022).',
      price: 3.87,
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

    // Camera Lens Components
    {
      name: 'Back Camera Lens Bracket Compatible For iPad Pro 11" 2nd Gen / Pro 11" 3rd Gen / iPad Pro 12.9" 4th Gen (2020) / iPad Pro 12.9" 5th Gen (2021)',
      slug: 'back-camera-lens-bracket-ipad-pro-11-2nd-gen-3rd-gen-12-9-4th-gen-2020-5th-gen-2021',
      sku: 'IPAD11G4-BACK-CAM-LENS-BRACKET',
      description: 'Back camera lens bracket for iPad Pro 11" 2nd/3rd Gen and 12.9" 4th/5th Gen.',
      price: 1.75,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '1 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Lens Compatible For iPad Pro 11" 2nd Gen / Pro 11" 3rd Gen / iPad Pro 12.9" 4th Gen (2020) / iPad Pro 12.9" 5th Gen (2021)',
      slug: 'back-camera-lens-ipad-pro-11-2nd-gen-3rd-gen-12-9-4th-gen-2020-5th-gen-2021',
      sku: 'IPAD11G4-BACK-CAM-LENS',
      description: 'Back camera lens for iPad Pro 11" 2nd/3rd Gen and 12.9" 4th/5th Gen.',
      price: 5.93,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 1 x 0.1 inch',
      category_id: 2,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Lens With Bracket Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022)',
      slug: 'back-camera-lens-with-bracket-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-4th-gen-2022-12-9-4th-gen-2020-5th-gen-2021-6th-gen-2022',
      sku: 'IPAD11G4-BACK-CAM-LENS-BRACKET-SET',
      description: 'Back camera lens with bracket for iPad Pro 11" 2nd/3rd/4th Gen and 12.9" 4th/5th/6th Gen.',
      price: 6.84,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 1 x 0.2 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // 4G Antenna Cable
    {
      name: '4G Antenna Cable Compatible For iPad Pro 11" 3rd Gen (2021) / iPad Pro 11" 4th Gen (2022) (Premium)',
      slug: '4g-antenna-cable-ipad-pro-11-3rd-gen-2021-4th-gen-2022-premium',
      sku: 'IPAD11G4-4G-ANTENNA-PREMIUM',
      description: 'Premium 4G antenna cable for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022).',
      price: 10.99,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Holding Brackets
    {
      name: 'Face Holding Bracket Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (4G / WIFi Version) (Premium)',
      slug: 'face-holding-bracket-ipad-pro-11-3rd-gen-2021-4th-gen-2022-4g-wifi-version-premium',
      sku: 'IPAD11G4-FACE-BRACKET-PREMIUM',
      description: 'Premium face holding bracket for iPad Pro 11" 3rd/4th Gen (4G/WiFi version).',
      price: 1.16,
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
    {
      name: 'LCD Cable Holding Bracket Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (4G / WIFi Version) (Premium)',
      slug: 'lcd-cable-holding-bracket-ipad-pro-11-3rd-gen-2021-4th-gen-2022-4g-wifi-version-premium',
      sku: 'IPAD11G4-LCD-CABLE-BRACKET-PREMIUM',
      description: 'Premium LCD cable holding bracket for iPad Pro 11" 3rd/4th Gen (4G/WiFi version).',
      price: 2.00,
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
    {
      name: 'Front Camera Holding Bracket Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (4G / WIFi Version) (Premium)',
      slug: 'front-camera-holding-bracket-ipad-pro-11-3rd-gen-2021-4th-gen-2022-4g-wifi-version-premium',
      sku: 'IPAD11G4-FRONT-CAMERA-BRACKET-PREMIUM',
      description: 'Premium front camera holding bracket for iPad Pro 11" 3rd/4th Gen (4G/WiFi version).',
      price: 3.17,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Holding Bracket Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (4G / WIFi Version) (Premium)',
      slug: 'back-camera-holding-bracket-ipad-pro-11-3rd-gen-2021-4th-gen-2022-4g-wifi-version-premium',
      sku: 'IPAD11G4-BACK-CAMERA-BRACKET-PREMIUM',
      description: 'Premium back camera holding bracket for iPad Pro 11" 3rd/4th Gen (4G/WiFi version).',
      price: 3.17,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'LCD Touch Holding Bracket Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (4G Version) (Premium)',
      slug: 'lcd-touch-holding-bracket-ipad-pro-11-3rd-gen-2021-4th-gen-2022-4g-version-premium',
      sku: 'IPAD11G4-LCD-TOUCH-BRACKET-4G-PREMIUM',
      description: 'Premium LCD touch holding bracket for iPad Pro 11" 3rd/4th Gen (4G version).',
      price: 6.79,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 2 x 0.4 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'LCD Touch Holding Bracket Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (WIFi Version) (Premium)',
      slug: 'lcd-touch-holding-bracket-ipad-pro-11-3rd-gen-2021-4th-gen-2022-wifi-version-premium',
      sku: 'IPAD11G4-LCD-TOUCH-BRACKET-WIFI-PREMIUM',
      description: 'Premium LCD touch holding bracket for iPad Pro 11" 3rd/4th Gen (WiFi version).',
      price: 6.79,
      discount_percentage: 0,
      stock_quantity: 20,
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
      name: 'Hard Buttons (Power / Volume) Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) (Space Gray)',
      slug: 'hard-buttons-power-volume-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-12-9-4th-gen-2020-5th-gen-2021-space-gray',
      sku: 'IPAD11G4-HARD-BUTTONS-GRAY',
      description: 'Hard buttons (Power / Volume) for iPad Pro 11" 2nd/3rd Gen and 12.9" 4th/5th Gen. Space Gray.',
      price: 4.23,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '3 x 2 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Hard Buttons (Power / Volume) Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) (Silver)',
      slug: 'hard-buttons-power-volume-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-12-9-4th-gen-2020-5th-gen-2021-silver',
      sku: 'IPAD11G4-HARD-BUTTONS-SILVER',
      description: 'Hard buttons (Power / Volume) for iPad Pro 11" 2nd/3rd Gen and 12.9" 4th/5th Gen. Silver.',
      price: 4.28,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '3 x 2 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Complete Screw Set
    {
      name: 'Complete Screw Set Compatible For iPad Pro 11" (1st Gen: 2018 / 2nd Gen: 2020 / 3rd Gen, 2021)',
      slug: 'complete-screw-set-ipad-pro-11-1st-gen-2018-2nd-gen-2020-3rd-gen-2021',
      sku: 'IPAD11G4-COMPLETE-SCREW-SET',
      description: 'Complete screw set for iPad Pro 11" 1st Gen (2018) / 2nd Gen (2020) / 3rd Gen (2021).',
      price: 1.06,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // SIM Card Components
    {
      name: 'Sim Card Tray Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022) (Silver)',
      slug: 'sim-card-tray-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022-silver',
      sku: 'IPAD11G4-SIM-TRAY-SILVER',
      description: 'SIM card tray for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Silver.',
      price: 3.27,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Sim Card Tray Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022) (Space Gray)',
      slug: 'sim-card-tray-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022-space-gray',
      sku: 'IPAD11G4-SIM-TRAY-GRAY',
      description: 'SIM card tray for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Space Gray.',
      price: 3.31,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Sim Card Reader With Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (US Version)',
      slug: 'sim-card-reader-with-flex-cable-ipad-pro-11-3rd-gen-2021-4th-gen-2022-us-version',
      sku: 'IPAD11G4-SIM-READER-US',
      description: 'SIM card reader with flex cable for iPad Pro 11" 3rd/4th Gen. US version.',
      price: 4.13,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Sim Card Reader With Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (China Version)',
      slug: 'sim-card-reader-with-flex-cable-ipad-pro-11-3rd-gen-2021-4th-gen-2022-china-version',
      sku: 'IPAD11G4-SIM-READER-CHINA',
      description: 'SIM card reader with flex cable for iPad Pro 11" 3rd/4th Gen. China version.',
      price: 5.36,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // LCD Adhesive Tape
    {
      name: 'LCD Adhesive Tape Compatible For iPad Pro 11" 3rd Gen (2021) (Tesa Tape) (10 Pack)',
      slug: 'lcd-adhesive-tape-ipad-pro-11-3rd-gen-2021-tesa-tape-10-pack',
      sku: 'IPAD11G4-LCD-TAPE-TESA-10PK',
      description: 'LCD adhesive tape for iPad Pro 11" 3rd Gen (2021). Tesa brand. 10-pack.',
      price: 8.95,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '6 x 4 x 1 inch',
      category_id: 8,
      brand: 'Tesa'
    },

    // Backlight
    {
      name: 'Backlight Only Compatible For iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) (4 Pack)',
      slug: 'backlight-only-ipad-pro-11-1st-gen-2018-2nd-gen-2020-3rd-gen-2021-4-pack',
      sku: 'IPAD11G4-BACKLIGHT-4PK',
      description: 'Backlight only for iPad Pro 11" 1st/2nd/3rd Gen. 4-pack.',
      price: 58.18,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '8 x 6 x 2 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'Backlight Filter Compatible For iPad Pro 11" 3rd Gen (2021) (10 Pack)',
      slug: 'backlight-filter-ipad-pro-11-3rd-gen-2021-10-pack',
      sku: 'IPAD11G4-BACKLIGHT-FILTER-10PK',
      description: 'Backlight filter for iPad Pro 11" 3rd Gen (2021). 10-pack.',
      price: 0.86,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '6 x 4 x 1 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // OCA Film
    {
      name: 'OCA Film Lamination Compatible For iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (175um) (10 Pack)',
      slug: 'oca-film-lamination-ipad-pro-11-1st-gen-2018-2nd-gen-2020-3rd-gen-2021-4th-gen-2022-175um-10-pack',
      sku: 'IPAD11G4-OCA-FILM-10PK',
      description: 'OCA film lamination for iPad Pro 11" various generations. 175um thickness. 10-pack.',
      price: 19.72,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.2,
      dimensions: '8 x 6 x 2 inch',
      category_id: 2,
      brand: 'OCA'
    },

    // Gas Gauge
    {
      name: 'Gas Gauge Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th (2022) (U8900)',
      slug: 'gas-gauge-ipad-pro-11-3rd-gen-2021-12-9-5th-gen-2021-6th-2022-u8900',
      sku: 'IPAD11G4-GAS-GAUGE-U8900',
      description: 'Gas gauge for iPad Pro 11" 3rd Gen / 12.9" 5th/6th Gen (U8900).',
      price: 0.58,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.5 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Stylus Charging Coil
    {
      name: 'Stylus Charging Coil Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) / Air 4 / Air 5 / Mini 6',
      slug: 'stylus-charging-coil-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-4th-gen-2022-12-9-4th-gen-2020-5th-gen-2021-6th-gen-2022-air-4-air-5-mini-6',
      sku: 'IPAD11G4-STYLUS-COIL',
      description: 'Stylus charging coil compatible with iPad Pro various generations and iPad Air/Mini models.',
      price: 3.90,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Stylus Pen Flex Cable
    {
      name: 'Stylus Pen Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021)',
      slug: 'stylus-pen-flex-cable-ipad-pro-11-3rd-gen-2021',
      sku: 'IPAD11G4-STYLUS-PEN-FLEX',
      description: 'Stylus pen flex cable for iPad Pro 11" 3rd Gen (2021).',
      price: 28.44,
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

    // Touch Controller IC
    {
      name: 'Touch Controller IC Compatible For iPad Mini 5 / iPad 6 / iPad 7 / iPad 9 / Pro 9.7" / Pro 10.5" / Pro 11" (1st / 2nd Gen / 3rd Gen 2021) / Air 3 / Pro 12.9" 1st Gen (2015) / 2nd Gen (2017) / 3rd Gen (2018) / 4th Gen (BCM15900B0: 225 Pins) (10 Pack)',
      slug: 'touch-controller-ic-ipad-mini-5-ipad-6-ipad-7-ipad-9-pro-9-7-pro-10-5-pro-11-1st-2nd-gen-3rd-gen-2021-air-3-pro-12-9-1st-gen-2015-2nd-gen-2017-3rd-gen-2018-4th-gen-bcm15900b0-225-pins-10-pack',
      sku: 'IPAD11G4-TOUCH-CONTROLLER-IC-10PK',
      description: 'Touch controller IC for various iPad models (BCM15900B0: 225 pins). 10-pack.',
      price: 10.41,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 9,
      brand: 'Broadcom'
    },

    // PMU Power Coil
    {
      name: 'PMU Power Coil Compatible For iPad 7 (2019) / iPad 8 (2020) / iPad 9 (2021) / iPad 10 (2022) / iPad Air 3 / iPad Air 5 / iPad Mini 5 / iPad Pro 11"( 2nd Gen / 3rd Gen ) / iPad Pro 12.9" (3rd Gen / 4th Gen) (L8425) (051 10uh)',
      slug: 'pmu-power-coil-ipad-7-2019-ipad-8-2020-ipad-9-2021-ipad-10-2022-ipad-air-3-ipad-air-5-ipad-mini-5-ipad-pro-11-2nd-gen-3rd-gen-ipad-pro-12-9-3rd-gen-4th-gen-l8425-051-10uh',
      sku: 'IPAD11G4-PMU-POWER-COIL-L8425',
      description: 'PMU power coil for various iPad models (L8425, 051 10uh).',
      price: 0.88,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // FPC Connectors
    {
      name: 'LCD (On The Motherboard) FPC Connector Compatible For iPad Pro 11" 3rd Gen (2021) (46 Pin)',
      slug: 'lcd-on-the-motherboard-fpc-connector-ipad-pro-11-3rd-gen-2021-46-pin',
      sku: 'IPAD11G4-LCD-FPC-46PIN',
      description: 'LCD FPC connector (on the motherboard) for iPad Pro 11" 3rd Gen (2021). 46 pin.',
      price: 0.88,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'LCD FPC Connector (On The Motherboard) Compatible For iPad Pro 11" 3rd Gen (2021) (18 Pin)',
      slug: 'lcd-fpc-connector-on-the-motherboard-ipad-pro-11-3rd-gen-2021-18-pin',
      sku: 'IPAD11G4-LCD-FPC-18PIN',
      description: 'LCD FPC connector (on the motherboard) for iPad Pro 11" 3rd Gen (2021). 18 pin.',
      price: 0.90,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Charging Port FPC Connector Compatible For iPad Pro 11" 3th Gen / Pro 11" 4th Gen / Pro 11" 5th Gen / Pro 12.9" 3th Gen  / Pro 12.9" 4th Gen / iPad Pro 12.9" 5th Gen  / Pro 12.9" 6th Gen / Pro 13" 7th Gen /  Mini 6  / Mini 7  (28 Pin)',
      slug: 'charging-port-fpc-connector-ipad-pro-series-28-pin',
      sku: 'IPAD11G4-CHARGING-FPC-28PIN',
      description: 'Charging port FPC connector compatible with iPad Pro series (28 pin).',
      price: 1.46,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Touch Controller IC Compatible For iPad Mini 5/iPad 6/iPad 7/iPad 8/iPad 9/Pro 9.7"/Pro 10.5"/Pro 11" (1st/2nd Gen/3rd Gen 2021)/Air 3/Pro 12.9" 1st Gen (2015)/2nd Gen (2017)/ 3rd Gen (2018)/4th Gen (2020)(BCM15900B0: 225 Pins)',
      slug: 'touch-controller-ic-ipad-mini-5-ipad-6-ipad-7-ipad-8-ipad-9-pro-9-7-pro-10-5-pro-11-1st-2nd-gen-3rd-gen-2021-air-3-pro-12-9-1st-gen-2015-2nd-gen-2017-3rd-gen-2018-4th-gen-2020-bcm15900b0-225-pins',
      sku: 'IPAD11G4-TOUCH-CONTROLLER-IC-BCM15900B0',
      description: 'Touch controller IC for various iPad models (BCM15900B0: 225 pins).',
      price: 1.88,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Broadcom'
    },

    // IC Chips
    {
      name: 'Ace SPI Flash IC (Charge EEPROM) With Program Compatible For iPad Pro 11" 3th Gen /Pro 12.9" 5th Gen ( 2021) (8N)',
      slug: 'ace-spi-flash-ic-charge-eeprom-ipad-pro-11-3th-gen-pro-12-9-5th-gen-2021-8n',
      sku: 'IPAD11G4-ACE-SPI-FLASH-8N',
      description: 'Ace SPI flash IC (charge EEPROM) with program for iPad Pro 11" 3rd Gen / 12.9" 5th Gen (2021) (8N).',
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
    {
      name: 'Charging IC Compatible For iPad Pro 12.9" 3rd Gen (2018)/iPad Pro 12.9" 4th Gen (2020)/iPad Pro 11" 1st Gen (2018)/iPad Pro 11" 2nd Gen (2020)/iPad 7 (2019)/iPad 8 (2020)/iPad Air 3/iPad 9 (2021)/iPad Pro 11" 3rd Gen (2021)/iPad Air 5/4 (343S00235)',
      slug: 'charging-ic-ipad-pro-12-9-3rd-gen-2018-12-9-4th-gen-2020-11-1st-gen-2018-11-2nd-gen-2020-ipad-7-2019-ipad-8-2020-ipad-air-3-ipad-9-2021-11-3rd-gen-2021-ipad-air-5-4-343s00235',
      sku: 'IPAD11G4-CHARGING-IC-343S00235',
      description: 'Charging IC for various iPad Pro and iPad models (343S00235).',
      price: 2.64,
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
    {
      name: 'Charging IC Compatible For iPad Pro 12.9" 5th Gen (2021) / iPad Pro 12.9" 6th Gen (2022) / iPad Pro 11" 3rd Gen (2021) / iPad Air 4 / iPad Air 5 / iPad Mini 6 (343S00377)',
      slug: 'charging-ic-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-11-3rd-gen-2021-ipad-air-4-ipad-air-5-ipad-mini-6-343s00377',
      sku: 'IPAD11G4-CHARGING-IC-343S00377',
      description: 'Charging IC for iPad Pro 12.9" 5th/6th Gen and other models (343S00377).',
      price: 4.37,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Touch Controller IC Compatible For iPad 10 (2022) / iPad Pro 12.9" 4th Gen (2020) / iPad Pro 11" 2rd Gen (2020) / 3rd Gen (2021) / iPad Air 4 / iPad Air 5 (Bcm15957a0,210 Pin)',
      slug: 'touch-controller-ic-ipad-10-2022-ipad-pro-12-9-4th-gen-2020-ipad-pro-11-2rd-gen-2020-3rd-gen-2021-ipad-air-4-ipad-air-5-bcm15957a0-210-pin',
      sku: 'IPAD11G4-TOUCH-CONTROLLER-IC-BCM15957A0',
      description: 'Touch controller IC for iPad 10 and various iPad Pro/Air models (Bcm15957a0, 210 pin).',
      price: 7.17,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Broadcom'
    },
    {
      name: 'Power Management IC Compatible For iPad Pro 11" 3rd Gen (2021)',
      slug: 'power-management-ic-ipad-pro-11-3rd-gen-2021',
      sku: 'IPAD11G4-PM-IC-343S00482',
      description: 'Power management IC for iPad Pro 11" 3rd Gen (2021) (343S00482).',
      price: 11.72,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Charging IC Compatible For iPad Pro 11" 3rd Gen (2021) (343S00477)',
      slug: 'charging-ic-ipad-pro-11-3rd-gen-2021-343s00477',
      sku: 'IPAD11G4-CHARGING-IC-343S00477',
      description: 'Charging IC for iPad Pro 11" 3rd Gen (2021) (343S00477).',
      price: 22.31,
      discount_percentage: 0,
      stock_quantity: 10,
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
      name: 'Tester Flex Cable For iTestBox (S800 Ultra) Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022)',
      slug: 'tester-flex-cable-for-itestbox-s800-ultra-ipad-pro-11-3rd-gen-2021-4th-gen-2022',
      sku: 'IPAD11G4-ITESTBOX-CABLE',
      description: 'Tester flex cable for iTestBox (S800 Ultra) compatible with iPad Pro 11" 3rd/4th Gen.',
      price: 6.95,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '6 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'iTestBox'
    },

    // Tempered Glass
    {
      name: 'Casper Pro Tempered Glass Compatible For iPad Pro 11" 1st Gen / Pro 11" 2nd Gen / Pro 11" 3rd Gen / Pro 11" 4th 2022 / Air 4 / Air 5 (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-ipad-pro-11-1st-gen-2nd-gen-3rd-gen-4th-2022-air-4-air-5-retail-pack-clear',
      sku: 'IPAD11G4-CASPER-TEMPERED-GLASS-CLEAR',
      description: 'Casper Pro tempered glass for iPad Pro 11" various generations and iPad Air models. Retail pack. Clear.',
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

    // USB Cable
    {
      name: 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (10 Pack) (Generic)',
      slug: 'usb-a-to-lightning-cable-3ft-iphone-ipad-10-pack-generic',
      sku: 'IPAD11G4-USB-LIGHTNING-10PK',
      description: 'USB-A to Lightning cable (3ft.) for iPhone/iPad. Generic. 10-pack.',
      price: 0, // Price not specified in the data
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.5,
      dimensions: '12 x 8 x 2 inch',
      category_id: 4,
      brand: 'Generic'
    },

    // Additional Buttons
    {
      name: 'Hard Buttons (Power / Volume) Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) (Space Gray)',
      slug: 'hard-buttons-power-volume-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-12-9-4th-gen-2020-5th-gen-2021-space-gray',
      sku: 'IPAD11G4-HARD-BUTTONS-GRAY-2',
      description: 'Hard buttons (Power / Volume) for iPad Pro 11" 2nd/3rd Gen and 12.9" 4th/5th Gen. Space Gray.',
      price: 4.23,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '3 x 2 x 0.3 inch',
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

    console.log(`✅ Successfully processed ${totalInserted} iPad Pro 11" 4th Gen products into Supabase!`);
    console.log('📊 Products processed:', insertedProducts.map(p => `${p.name} (${p.sku})`));
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

insertProducts();
