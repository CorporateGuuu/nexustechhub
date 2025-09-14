#!/usr/bin/env node

/**
 * Insert iPad Pro 12.9" 6th Gen (2022) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 12.9" 6th Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 12.9" 6th Gen products...');

  const products = [
    // LCD Assemblies
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (OEM Pull: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-oem-pull-grade-a-all-colors',
      sku: 'IPAD129G6-LCD-OEM-A-ALL',
      description: 'Grade A OEM Pull LCD assembly with digitizer for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022). Compatible with all colors.',
      price: 237.56,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.35,
      dimensions: '12 x 9 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Aftermarket Plus) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-aftermarket-plus-all-colors',
      sku: 'IPAD129G6-LCD-AP-ALL',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022). Compatible with all colors.',
      price: 210.24,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.35,
      dimensions: '12 x 9 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Premium) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-premium-all-colors',
      sku: 'IPAD129G6-LCD-PREM-ALL',
      description: 'Premium LCD assembly with digitizer for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022). Compatible with all colors.',
      price: 274.46,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.35,
      dimensions: '12 x 9 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // Digitizers
    {
      name: 'Digitizer Compatible For iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022) (Glass Separation Required) (Aftermarket Plus) (All Colors)',
      slug: 'digitizer-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-glass-separation-required-aftermarket-plus-all-colors',
      sku: 'IPAD129G6-DIGITIZER-AP-ALL',
      description: 'Aftermarket Plus digitizer for iPad Pro 12.9" 5th/6th Gen. Glass separation required. Compatible with all colors.',
      price: 29.86,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.2,
      dimensions: '12 x 9 x 0.3 inch',
      category_id: 2,
      brand: 'Apple'
    },
    {
      name: 'Digitizer Compatible For iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022) (Glass Separation Required) (Premium) (All Colors)',
      slug: 'digitizer-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-glass-separation-required-premium-all-colors',
      sku: 'IPAD129G6-DIGITIZER-PREM-ALL',
      description: 'Premium digitizer for iPad Pro 12.9" 5th/6th Gen. Glass separation required. Compatible with all colors.',
      price: 48.28,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.2,
      dimensions: '12 x 9 x 0.3 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Front Glass
    {
      name: 'Front Glass Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Glass Separation Required) (Premium) (All Colors)',
      slug: 'front-glass-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-glass-separation-required-premium-all-colors',
      sku: 'IPAD129G6-FRONT-GLASS-PREM-ALL',
      description: 'Premium front glass for iPad Pro 12.9" 5th/6th Gen. Glass separation required. Compatible with all colors.',
      price: 14.44,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '12 x 9 x 0.1 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Batteries
    {
      name: 'Replacement Battery Compatible For iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-ampsentrix-pro',
      sku: 'IPAD129G6-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) from AmpSentrix Pro.',
      price: 34.68,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.12,
      dimensions: '10 x 8 x 0.3 inch',
      category_id: 3,
      brand: 'AmpSentrix'
    },

    // Charging Port Flex Cables
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Space Gray) (Aftermarket Plus)',
      slug: 'charging-port-flex-cable-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022-space-gray-aftermarket-plus',
      sku: 'IPAD-CHARGING-FLEX-AP-GRAY',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Space Gray color.',
      price: 3.92,
      discount_percentage: 0,
      stock_quantity: 60,
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
      slug: 'charging-port-flex-cable-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022-silver-aftermarket-plus',
      sku: 'IPAD-CHARGING-FLEX-AP-SILVER',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Silver color.',
      price: 3.92,
      discount_percentage: 0,
      stock_quantity: 58,
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
      slug: 'charging-port-flex-cable-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022-silver-premium',
      sku: 'IPAD-CHARGING-FLEX-PREM-SILVER',
      description: 'Premium charging port flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Silver color.',
      price: 5.48,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Space Gray) (Premium)',
      slug: 'charging-port-flex-cable-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022-space-gray-premium',
      sku: 'IPAD-CHARGING-FLEX-PREM-GRAY',
      description: 'Premium charging port flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Space Gray color.',
      price: 5.49,
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

    // Charging Port Only - 10 Pack
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" (2018 / 2020 / 2021 / 2022) / Pro 12.9" (2018 / 2020 / 2021 / 2022) (Soldering Required) (Space Gray) (10 Pack)',
      slug: 'charging-port-only-ipad-pro-11-2018-2020-2021-2022-12-9-2018-2020-2021-2022-soldering-required-space-gray-10-pack',
      sku: 'IPAD-CHARGING-PORT-10PK-GRAY',
      description: 'Charging port only for iPad Pro 11"/12.9" various generations. Soldering required. Space Gray 10-pack.',
      price: 13.07,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.12,
      dimensions: '6 x 4 x 2 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" (2018 / 2020 / 2021 / 2022) / Pro 12.9" (2018 / 2020 / 2021 / 2022) (Soldering Required) (Silver) (10 Pack)',
      slug: 'charging-port-only-ipad-pro-11-2018-2020-2021-2022-12-9-2018-2020-2021-2022-soldering-required-silver-10-pack',
      sku: 'IPAD-CHARGING-PORT-10PK-SILVER',
      description: 'Charging port only for iPad Pro 11"/12.9" various generations. Soldering required. Silver 10-pack.',
      price: 16.68,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.12,
      dimensions: '6 x 4 x 2 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Only Compatible For iPad Pro 11" (2018 / 2020 / 2021 / 2022) / Pro 12.9" (2018 / 2020 / 2021 / 2022) (Soldering Required) (Silver)',
      slug: 'charging-port-only-ipad-pro-11-2018-2020-2021-2022-12-9-2018-2020-2021-2022-soldering-required-silver',
      sku: 'IPAD-CHARGING-PORT-SINGLE-SILVER',
      description: 'Single charging port only for iPad Pro 11"/12.9" various generations. Soldering required. Silver.',
      price: 1.80,
      discount_percentage: 0,
      stock_quantity: 80,
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
      slug: 'front-camera-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022',
      sku: 'IPAD-FRONT-CAM-11-12-9-GEN',
      description: 'Front camera compatible with iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen.',
      price: 19.57,
      discount_percentage: 0,
      stock_quantity: 40,
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
      slug: 'back-camera-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-11-4th-gen-2022-12-9-4th-gen-2020-5th-gen-2021-12-9-6th-gen-2022',
      sku: 'IPAD-BACK-CAM-11-12-9-GEN',
      description: 'Back camera compatible with iPad Pro 11" 2nd/3rd/4th Gen and 12.9" 4th/5th/6th Gen.',
      price: 33.11,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },

    // Loudspeakers
    {
      name: 'Loudspeaker Compatible For iPad Pro 12.9" 5th Gen (2021) (4 Piece Set) / 12.9" 6th Gen (2022) (LTE Version)',
      slug: 'loudspeaker-ipad-pro-12-9-5th-gen-2021-4-piece-set-12-9-6th-gen-2022-lte-version',
      sku: 'IPAD129G6-SPEAKER-4PC-LTE',
      description: 'Loudspeaker 4-piece set for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) LTE version.',
      price: 50.53,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 6,
      brand: 'Apple'
    },
    {
      name: 'Loudspeaker Compatible For iPad Pro 12.9" 5th Gen (2021) (4 Piece Set) / 12.9" 6th Gen (2022) (WiFi Version)',
      slug: 'loudspeaker-ipad-pro-12-9-5th-gen-2021-4-piece-set-12-9-6th-gen-2022-wifi-version',
      sku: 'IPAD129G6-SPEAKER-4PC-WIFI',
      description: 'Loudspeaker 4-piece set for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) WiFi version.',
      price: 50.53,
      discount_percentage: 0,
      stock_quantity: 23,
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
      name: 'Power Button Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (China Version) (4G Version)',
      slug: 'power-button-flex-cable-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-11-3rd-gen-2021-11-4th-gen-2022-china-version-4g-version',
      sku: 'IPAD-POWER-FLEX-CHINA-4G',
      description: 'Power button flex cable for iPad Pro 12.9" 5th/6th Gen and 11" 3rd/4th Gen. China version, 4G.',
      price: 3.75,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022) (4G Version)',
      slug: 'volume-button-flex-cable-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-4g-version',
      sku: 'IPAD-VOLUME-FLEX-4G',
      description: 'Volume button flex cable for iPad Pro 12.9" 5th/6th Gen. 4G version.',
      price: 3.75,
      discount_percentage: 0,
      stock_quantity: 53,
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
      slug: 'power-button-flex-cable-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-11-3rd-gen-2021-11-4th-gen-2022-us-version-4g-version',
      sku: 'IPAD-POWER-FLEX-US-4G',
      description: 'Power button flex cable for iPad Pro 12.9" 5th/6th Gen and 11" 3rd/4th Gen. US version, 4G.',
      price: 3.77,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Volume Button Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) (Wifi Version)',
      slug: 'volume-button-flex-cable-ipad-pro-12-9-5th-gen-2021-wifi-version',
      sku: 'IPAD-VOLUME-FLEX-WIFI',
      description: 'Volume button flex cable for iPad Pro 12.9" 5th Gen. WiFi version.',
      price: 3.95,
      discount_percentage: 0,
      stock_quantity: 48,
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
      name: 'LCD Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022) (Aftermarket Plus)',
      slug: 'lcd-flex-cable-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-aftermarket-plus',
      sku: 'IPAD129G6-LCD-FLEX-AP',
      description: 'Aftermarket Plus LCD flex cable for iPad Pro 12.9" 5th/6th Gen.',
      price: 4.49,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '6 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'LCD Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022) (Premium)',
      slug: 'lcd-flex-cable-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-premium',
      sku: 'IPAD129G6-LCD-FLEX-PREM',
      description: 'Premium LCD flex cable for iPad Pro 12.9" 5th/6th Gen.',
      price: 6.63,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '6 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Keyboard Flex Cables
    {
      name: 'Keyboard Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Silver)',
      slug: 'keyboard-flex-cable-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022-silver',
      sku: 'IPAD-KEYBOARD-FLEX-SILVER',
      description: 'Keyboard flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Silver color.',
      price: 1.23,
      discount_percentage: 0,
      stock_quantity: 60,
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
      slug: 'keyboard-flex-cable-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022-space-gray',
      sku: 'IPAD-KEYBOARD-FLEX-GRAY',
      description: 'Keyboard flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Space Gray color.',
      price: 3.07,
      discount_percentage: 0,
      stock_quantity: 58,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Flashlight Flex Cable
    {
      name: 'Flashlight Flex Cable Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022)',
      slug: 'flashlight-flex-cable-ipad-pro-11-2nd-gen-2020-11-3rd-gen-2021-11-4th-gen-2022-12-9-4th-gen-2020-12-9-5th-gen-2021-12-9-6th-gen-2022',
      sku: 'IPAD-FLASHLIGHT-FLEX-GEN',
      description: 'Flashlight flex cable compatible with iPad Pro 11" 2nd/3rd/4th Gen and 12.9" 4th/5th/6th Gen.',
      price: 3.17,
      discount_percentage: 0,
      stock_quantity: 55,
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
      name: 'Face ID Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / iPad Pro 12.9" 6th Gen (2022)',
      slug: 'face-id-flex-cable-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022',
      sku: 'IPAD129G6-FACE-ID-FLEX',
      description: 'Face ID flex cable for iPad Pro 12.9" 5th/6th Gen.',
      price: 23.38,
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

    // Camera Lens Components
    {
      name: 'Back Camera Lens Bracket Compatible For iPad Pro 11" 2nd Gen / Pro 11" 3rd Gen / iPad Pro 12.9" 4th Gen (2020) / iPad Pro 12.9" 5th Gen (2021)',
      slug: 'back-camera-lens-bracket-ipad-pro-11-2nd-gen-11-3rd-gen-12-9-4th-gen-2020-12-9-5th-gen-2021',
      sku: 'IPAD-BACK-CAM-BRACKET-GEN',
      description: 'Back camera lens bracket for iPad Pro 11" 2nd/3rd Gen and 12.9" 4th/5th Gen.',
      price: 1.75,
      discount_percentage: 0,
      stock_quantity: 70,
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
      slug: 'back-camera-lens-ipad-pro-11-2nd-gen-11-3rd-gen-12-9-4th-gen-2020-12-9-5th-gen-2021',
      sku: 'IPAD-BACK-CAM-LENS-GEN',
      description: 'Back camera lens for iPad Pro 11" 2nd/3rd Gen and 12.9" 4th/5th Gen.',
      price: 5.93,
      discount_percentage: 0,
      stock_quantity: 65,
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
      slug: 'back-camera-lens-with-bracket-ipad-pro-11-2nd-gen-2020-11-3rd-gen-2021-11-4th-gen-2022-12-9-4th-gen-2020-12-9-5th-gen-2021-12-9-6th-gen-2022',
      sku: 'IPAD-BACK-CAM-LENS-BRACKET-GEN',
      description: 'Back camera lens with bracket for iPad Pro 11" 2nd/3rd/4th Gen and 12.9" 4th/5th/6th Gen.',
      price: 6.84,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 1 x 0.2 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Antennas
    {
      name: '4G Antenna Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Premium)',
      slug: '4g-antenna-cable-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-premium',
      sku: 'IPAD129G6-4G-ANTENNA-PREM',
      description: 'Premium 4G antenna cable for iPad Pro 12.9" 5th/6th Gen.',
      price: 11.08,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: '5G Antenna Cover Compatible For iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / Pro 12.9" 3rd Gen (2018) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Black)',
      slug: '5g-antenna-cover-ipad-pro-11-1st-gen-2018-11-2nd-gen-2020-11-3rd-gen-2021-11-4th-gen-2022-12-9-3rd-gen-2018-12-9-4th-gen-2020-12-9-5th-gen-2021-12-9-6th-gen-2022-black',
      sku: 'IPAD-5G-ANTENNA-COVER-BLK',
      description: '5G antenna cover for iPad Pro various generations. Black color.',
      price: 0.88,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: '5G Antenna Cover Compatible For iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / Pro 12.9" 3rd Gen (2018) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (White)',
      slug: '5g-antenna-cover-ipad-pro-11-1st-gen-2018-11-2nd-gen-2020-11-3rd-gen-2021-11-4th-gen-2022-12-9-3rd-gen-2018-12-9-4th-gen-2020-12-9-5th-gen-2021-12-9-6th-gen-2022-white',
      sku: 'IPAD-5G-ANTENNA-COVER-WHT',
      description: '5G antenna cover for iPad Pro various generations. White color.',
      price: 0.88,
      discount_percentage: 0,
      stock_quantity: 95,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: '5G Module Compatible For iPad 12.9" 5th Gen (2021) / iPad 12.9" 6th Gen (2022) (2 Piece Set)',
      slug: '5g-module-ipad-12-9-5th-gen-2021-12-9-6th-gen-2022-2-piece-set',
      sku: 'IPAD129G6-5G-MODULE-2PC',
      description: '5G module for iPad Pro 12.9" 5th/6th Gen. 2 piece set.',
      price: 4.11,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '3 x 2 x 0.2 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'USB Filter Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (10 Pack)',
      slug: 'usb-filter-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-10-pack',
      sku: 'IPAD129G6-USB-FILTER-10PK',
      description: 'USB filter for iPad Pro 12.9" 5th/6th Gen. 10-pack.',
      price: 2.65,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '4 x 3 x 1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Holding Brackets
    {
      name: 'Face Holding Bracket Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Premium)',
      slug: 'face-holding-bracket-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-premium',
      sku: 'IPAD129G6-FACE-BRACKET-PREM',
      description: 'Premium face holding bracket for iPad Pro 12.9" 5th/6th Gen.',
      price: 1.16,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'LCD Cable Holding Bracket Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Premium)',
      slug: 'lcd-cable-holding-bracket-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-premium',
      sku: 'IPAD129G6-LCD-BRACKET-PREM',
      description: 'Premium LCD cable holding bracket for iPad Pro 12.9" 5th/6th Gen.',
      price: 2.00,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Touch Holding Bracket Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Premium)',
      slug: 'touch-holding-bracket-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-premium',
      sku: 'IPAD129G6-TOUCH-BRACKET-PREM',
      description: 'Premium touch holding bracket for iPad Pro 12.9" 5th/6th Gen.',
      price: 2.65,
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
      name: 'Front Camera Holding Bracket Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Premium)',
      slug: 'front-camera-holding-bracket-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-premium',
      sku: 'IPAD129G6-FRONT-CAM-BRACKET-PREM',
      description: 'Premium front camera holding bracket for iPad Pro 12.9" 5th/6th Gen.',
      price: 2.65,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Holding Bracket Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Premium)',
      slug: 'back-camera-holding-bracket-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-premium',
      sku: 'IPAD129G6-BACK-CAM-BRACKET-PREM',
      description: 'Premium back camera holding bracket for iPad Pro 12.9" 5th/6th Gen.',
      price: 2.65,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'LCD Holding Bracket Compatible For iPad Pro 12.9" 6th Gen (2022) (Premium)',
      slug: 'lcd-holding-bracket-ipad-pro-12-9-6th-gen-2022-premium',
      sku: 'IPAD129G6-LCD-BRACKET-PREM',
      description: 'Premium LCD holding bracket for iPad Pro 12.9" 6th Gen (2022).',
      price: 6.79,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 2 x 0.4 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Buttons
    {
      name: 'Hard Buttons (Power / Volume) Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) (Space Gray)',
      slug: 'hard-buttons-power-volume-ipad-pro-11-2nd-gen-2020-11-3rd-gen-2021-12-9-4th-gen-2020-12-9-5th-gen-2021-space-gray',
      sku: 'IPAD-HARD-BUTTONS-GRAY',
      description: 'Hard buttons (Power / Volume) for iPad Pro 11" 2nd/3rd Gen and 12.9" 4th/5th Gen. Space Gray color.',
      price: 4.23,
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
      name: 'Hard Buttons (Power / Volume) Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) (Silver)',
      slug: 'hard-buttons-power-volume-ipad-pro-11-2nd-gen-2020-11-3rd-gen-2021-12-9-4th-gen-2020-12-9-5th-gen-2021-silver',
      sku: 'IPAD-HARD-BUTTONS-SILVER',
      description: 'Hard buttons (Power / Volume) for iPad Pro 11" 2nd/3rd Gen and 12.9" 4th/5th Gen. Silver color.',
      price: 4.28,
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

    // SIM Card Components
    {
      name: 'Sim Card Tray Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022) (Silver)',
      slug: 'sim-card-tray-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022-silver',
      sku: 'IPAD-SIM-TRAY-SILVER',
      description: 'SIM card tray for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Silver color.',
      price: 3.27,
      discount_percentage: 0,
      stock_quantity: 60,
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
      slug: 'sim-card-tray-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022-space-gray',
      sku: 'IPAD-SIM-TRAY-GRAY',
      description: 'SIM card tray for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Space Gray color.',
      price: 3.31,
      discount_percentage: 0,
      stock_quantity: 58,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Sim Card Reader With Flex Cable Compatible For iPad Pro 12.9" 6th Gen (2022) (International Version)',
      slug: 'sim-card-reader-with-flex-cable-ipad-pro-12-9-6th-gen-2022-international-version',
      sku: 'IPAD129G6-SIM-READER-INTL',
      description: 'SIM card reader with flex cable for iPad Pro 12.9" 6th Gen (2022) International version.',
      price: 3.83,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Sim Card Reader With Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) (US Version)',
      slug: 'sim-card-reader-with-flex-cable-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-us-version',
      sku: 'IPAD129G6-SIM-READER-US',
      description: 'SIM card reader with flex cable for iPad Pro 12.9" 5th/6th Gen (2021/2022) US version.',
      price: 4.02,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Adhesive Tapes
    {
      name: 'LCD Adhesive Tape Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Tesa Tape) (10 Pack)',
      slug: 'lcd-adhesive-tape-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-tesa-tape-10-pack',
      sku: 'IPAD129G6-LCD-TAPE-TESA-10PK',
      description: 'LCD adhesive tape (Tesa brand) for iPad Pro 12.9" 5th/6th Gen. 10-pack.',
      price: 8.37,
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

    // Gas Gauge
    {
      name: 'Gas Gauge Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th (2022) (U8900)',
      slug: 'gas-gauge-ipad-pro-11-3rd-gen-2021-12-9-5th-gen-2021-12-9-6th-2022-u8900',
      sku: 'IPAD-GAS-GAUGE-U8900',
      description: 'Gas gauge for iPad Pro 11" 3rd Gen / 12.9" 5th/6th Gen (U8900).',
      price: 0.58,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.5 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Backlight
    {
      name: 'Backlight Only Compatible For iPad Pro 12.9" 5th Gen (2021) / 12.9" 6th Gen (2022)',
      slug: 'backlight-only-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022',
      sku: 'IPAD129G6-BACKLIGHT',
      description: 'Backlight only for iPad Pro 12.9" 5th/6th Gen.',
      price: 81.13,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '12 x 9 x 0.1 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // Stylus Charging Coil
    {
      name: 'Stylus Charging Coil Compatible For iPad Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) / Air 4 / Air 5 / Mini 6',
      slug: 'stylus-charging-coil-ipad-pro-11-2nd-gen-2020-11-3rd-gen-2021-11-4th-gen-2022-12-9-4th-gen-2020-12-9-5th-gen-2021-12-9-6th-gen-2022-air-4-air-5-mini-6',
      sku: 'IPAD-STYLUS-COIL-GEN',
      description: 'Stylus charging coil compatible with iPad Pro various generations and iPad Air/Mini models.',
      price: 3.90,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Battery Flex FPC Connector
    {
      name: 'Battery Flex FPC Connector Compatible For iPad Air 3/Pro 11" 1st Gen (2018)/Pro 11" 2nd Gen (2020)/Pro 10.5/Pro 12.9" 1st Gen (2015)/Pro 12.9" 3rd Gen (2018)/Pro 12.9" 4th Gen (2020)/Pro 12.9" 5th Gen (2021)/Pro 12.9" 6th Gen (2022)/Air 4 (5 Pin)',
      slug: 'battery-flex-fpc-connector-ipad-air-3-pro-11-1st-gen-2018-pro-11-2nd-gen-2020-pro-10-5-pro-12-9-1st-gen-2015-pro-12-9-3rd-gen-2018-pro-12-9-4th-gen-2020-pro-12-9-5th-gen-2021-pro-12-9-6th-gen-2022-air-4-5-pin',
      sku: 'IPAD-BATTERY-FPC-5PIN',
      description: 'Battery flex FPC connector for iPad Air 3/Pro various generations (5 pin).',
      price: 0.60,
      discount_percentage: 0,
      stock_quantity: 100,
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
      name: 'Digitizer FPC Connector Compatible For iPad Pro 12.9" 5th Gen (2021) / iPad Pro 12.9" 6th Gen (2022) (44 Pin)',
      slug: 'digitizer-fpc-connector-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-44-pin',
      sku: 'IPAD129G6-DIGITIZER-FPC-44PIN',
      description: 'Digitizer FPC connector for iPad Pro 12.9" 5th/6th Gen (44 pin).',
      price: 0.72,
      discount_percentage: 0,
      stock_quantity: 90,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Digitizer FPC Connector Compatible For iPad Pro 12.9" 5th Gen (2021) / iPad Pro 12.9" 6th Gen (2022) (40 Pin)',
      slug: 'digitizer-fpc-connector-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-40-pin',
      sku: 'IPAD129G6-DIGITIZER-FPC-40PIN',
      description: 'Digitizer FPC connector for iPad Pro 12.9" 5th/6th Gen (40 pin).',
      price: 0.76,
      discount_percentage: 0,
      stock_quantity: 85,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'LCD FPC Connector Compatible For iPad Pro 12.9" 5th Gen (2021) / iPad Pro 12.9" 6th Gen (2022) (60 Pin)',
      slug: 'lcd-fpc-connector-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-60-pin',
      sku: 'IPAD129G6-LCD-FPC-60PIN',
      description: 'LCD FPC connector for iPad Pro 12.9" 5th/6th Gen (60 pin).',
      price: 0.86,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Face ID Flex Cable FPC Connector (On The Board) Compatible For iPad pro 12.9" (4th Gen,2020) / (5th Gen,2021) / (6th Gen,2022) (14 Pin)',
      slug: 'face-id-flex-cable-fpc-connector-on-the-board-ipad-pro-12-9-4th-gen-2020-5th-gen-2021-6th-gen-2022-14-pin',
      sku: 'IPAD129G6-FACE-ID-FPC-14PIN',
      description: 'Face ID flex cable FPC connector (on the board) for iPad Pro 12.9" 4th/5th/6th Gen (14 pin).',
      price: 1.16,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'LCD FPC Connector Compatible For iPad Pro 12.9" (5th Gen, 2021) / Pro 12.9" (6th Gen,2022) (56 Pin)',
      slug: 'lcd-fpc-connector-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-56-pin',
      sku: 'IPAD129G6-LCD-FPC-56PIN',
      description: 'LCD FPC connector for iPad Pro 12.9" 5th/6th Gen (56 pin).',
      price: 1.16,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // IC Chips
    {
      name: 'Light Mosfet IC Compatible For iPad Pro 12.9" 5th Gen (2021) / iPad Pro 12.9" 6th Gen (2022) (6688P)',
      slug: 'light-mosfet-ic-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-6688p',
      sku: 'IPAD129G6-LIGHT-MOSFET-6688P',
      description: 'Light MOSFET IC for iPad Pro 12.9" 5th/6th Gen (6688P).',
      price: 1.44,
      discount_percentage: 0,
      stock_quantity: 65,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },
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
      name: 'Ace SPI Flash IC (Charge EEPROM) With Program Compatible For iPad Pro 11" 4th Gen /Pro 12.9" 6th Gen ( 2022) (8N)',
      slug: 'ace-spi-flash-ic-charge-eeprom-ipad-pro-11-4th-gen-12-9-6th-gen-2022-8n',
      sku: 'IPAD-ACE-SPI-FLASH-8N',
      description: 'Ace SPI flash IC (charge EEPROM) with program for iPad Pro 11" 4th Gen / 12.9" 6th Gen (2022) (8N).',
      price: 2.03,
      discount_percentage: 0,
      stock_quantity: 55,
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
      stock_quantity: 50,
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
      sku: 'IPAD-CHARGING-IC-343S00235',
      description: 'Charging IC for iPad Pro various generations (343S00235).',
      price: 2.64,
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
      name: 'Charging IC Compatible For iPad Pro 12.9" 5th Gen (2021) / iPad Pro 12.9" 6th Gen (2022) / iPad Pro 11" 3rd Gen (2021) / iPad Air 4 / iPad Air 5 / iPad Mini 6 (343S00377)',
      slug: 'charging-ic-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-11-3rd-gen-2021-ipad-air-4-ipad-air-5-ipad-mini-6-343s00377',
      sku: 'IPAD-CHARGING-IC-343S00377',
      description: 'Charging IC for iPad Pro 12.9" 5th/6th Gen and other models (343S00377).',
      price: 4.37,
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
      name: 'Power Delivery IC Compatible For iPad 10 (2022) / Pro 11" 4th Gen (2022) / Pro 12.9" 6th Gen (2022) (CD3217B13)',
      slug: 'power-delivery-ic-ipad-10-2022-pro-11-4th-gen-2022-pro-12-9-6th-gen-2022-cd3217b13',
      sku: 'IPAD-POWER-DELIVERY-IC-CD3217B13',
      description: 'Power delivery IC for iPad 10 (2022) / Pro 11" 4th Gen (2022) / Pro 12.9" 6th Gen (2022) (CD3217B13).',
      price: 7.96,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Casper Tempered Glass
    {
      name: 'Casper Pro Tempered Glass Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) / iPad 12.9" 5th Gen (2021) / iPad 12.9" 6th Gen (2022) (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-5th-gen-2021-6th-gen-2022-retail-pack-clear',
      sku: 'CASPER-TG-IPAD12-9-GEN-RP-CLEAR',
      description: 'Casper Pro tempered glass screen protector for iPad Pro 12.9" various generations. Retail pack with clear finish.',
      price: 34.99,
      discount_percentage: 0,
      stock_quantity: 60,
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
  console.log('🚀 Starting iPad Pro 12.9" 6th Gen Products Data Insertion...');

  try {
    await insertProducts();

    console.log('✅ iPad Pro 12.9" 6th Gen products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains comprehensive iPad Pro 12.9" 6th Gen repair parts.');
    console.log('🎉 You can now view and manage these products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
