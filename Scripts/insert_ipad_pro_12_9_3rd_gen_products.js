#!/usr/bin/env node

/**
 * Insert iPad Pro 12.9" 3rd Gen (2018) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 12.9" 3rd Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 12.9" 3rd Gen products...');

  const products = [
    // LCD Assemblies
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) (Blemish: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-blemish-grade-a-all-colors',
      sku: 'IPAD129G3-LCD-BLEMISH-A-ALL',
      description: 'Blemish Grade A LCD assembly with digitizer for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020). Compatible with all colors.',
      price: 120.03,
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
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) (Aftermarket Plus) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-aftermarket-plus-all-colors',
      sku: 'IPAD129G3-LCD-AP-ALL',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020). Compatible with all colors.',
      price: 130.56,
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
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) (XO7) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-xo7-all-colors',
      sku: 'IPAD129G3-LCD-XO7-ALL',
      description: 'XO7 LCD assembly with digitizer for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020). Compatible with all colors.',
      price: 137.79,
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
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) (Premium) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-premium-all-colors',
      sku: 'IPAD129G3-LCD-PREM-ALL',
      description: 'Premium LCD assembly with digitizer for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020). Compatible with all colors.',
      price: 170.97,
      discount_percentage: 0,
      stock_quantity: 18,
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
      name: 'Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / 12.9" 4th Gen (2020) (Glass Separation Required) (Aftermarket Plus) (All Colors)',
      slug: 'digitizer-ipad-pro-12-9-3rd-gen-2018-12-9-4th-gen-2020-glass-separation-required-aftermarket-plus-all-colors',
      sku: 'IPAD129G3-DIGITIZER-AP-ALL',
      description: 'Aftermarket Plus digitizer for iPad Pro 12.9" 3rd/4th Gen. Glass separation required. Compatible with all colors.',
      price: 28.22,
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
      name: 'Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / 12.9" 4th Gen (2020) (Glass Separation Required) (Premium) (All Colors)',
      slug: 'digitizer-ipad-pro-12-9-3rd-gen-2018-12-9-4th-gen-2020-glass-separation-required-premium-all-colors',
      sku: 'IPAD129G3-DIGITIZER-PREM-ALL',
      description: 'Premium digitizer for iPad Pro 12.9" 3rd/4th Gen. Glass separation required. Compatible with all colors.',
      price: 45.49,
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
      name: 'Front Glass Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) (Glass Separation Required) (All Colors)',
      slug: 'front-glass-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-glass-separation-required-all-colors',
      sku: 'IPAD129G3-FRONT-GLASS-ALL',
      description: 'Front glass for iPad Pro 12.9" 3rd/4th Gen. Glass separation required. Compatible with all colors.',
      price: 4.80,
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
      name: 'Replacement Battery Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-ampsentrix-pro',
      sku: 'IPAD129G3-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) from AmpSentrix Pro.',
      price: 35.31,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) / iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) (Aftermarket Plus) (Black)',
      slug: 'charging-port-flex-cable-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-ipad-pro-11-1st-gen-2018-pro-11-2nd-gen-2020-aftermarket-plus-black',
      sku: 'IPAD129G3-CHARGING-FLEX-AP-BLK',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 12.9" 3rd/4th Gen and 11" 1st/2nd Gen. Black color.',
      price: 3.67,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) / iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) (Aftermarket Plus) (White)',
      slug: 'charging-port-flex-cable-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-ipad-pro-11-1st-gen-2018-pro-11-2nd-gen-2020-aftermarket-plus-white',
      sku: 'IPAD129G3-CHARGING-FLEX-AP-WHT',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 12.9" 3rd/4th Gen and 11" 1st/2nd Gen. White color.',
      price: 3.75,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) / iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) (Premium) (Black)',
      slug: 'charging-port-flex-cable-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-ipad-pro-11-1st-gen-2018-pro-11-2nd-gen-2020-premium-black',
      sku: 'IPAD129G3-CHARGING-FLEX-PREM-BLK',
      description: 'Premium charging port flex cable for iPad Pro 12.9" 3rd/4th Gen and 11" 1st/2nd Gen. Black color.',
      price: 4.95,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) / iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) (Premium) (White)',
      slug: 'charging-port-flex-cable-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-ipad-pro-11-1st-gen-2018-pro-11-2nd-gen-2020-premium-white',
      sku: 'IPAD129G3-CHARGING-FLEX-PREM-WHT',
      description: 'Premium charging port flex cable for iPad Pro 12.9" 3rd/4th Gen and 11" 1st/2nd Gen. White color.',
      price: 5.33,
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
      sku: 'IPAD-CHARGING-PORT-10PK-GRAY-NEW',
      description: 'Charging port only for iPad Pro 11"/12.9" various generations. Soldering required. Space Gray 10-pack.',
      price: 13.07,
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
      name: 'Charging Port Only Compatible For iPad Pro 11" (2018 / 2020 / 2021 / 2022) / Pro 12.9" (2018 / 2020 / 2021 / 2022) (Soldering Required) (Silver) (10 Pack)',
      slug: 'charging-port-only-ipad-pro-11-2018-2020-2021-2022-12-9-2018-2020-2021-2022-soldering-required-silver-10-pack',
      sku: 'IPAD-CHARGING-PORT-10PK-SILVER-NEW',
      description: 'Charging port only for iPad Pro 11"/12.9" various generations. Soldering required. Silver 10-pack.',
      price: 16.68,
      discount_percentage: 0,
      stock_quantity: 16,
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
      sku: 'IPAD-CHARGING-PORT-SINGLE-SILVER-NEW',
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

    // Back Camera & Power Extension Flex Cable
    {
      name: 'Back Camera & Power Extension Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018)',
      slug: 'back-camera-power-extension-flex-cable-ipad-pro-12-9-3rd-gen-2018',
      sku: 'IPAD129G3-BACK-CAM-POWER-FLEX',
      description: 'Back camera & power extension flex cable for iPad Pro 12.9" 3rd Gen (2018).',
      price: 4.58,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '6 x 1 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Cameras
    {
      name: 'Back Camera Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 11" 1st Gen (2018) / iPad Air 4 / iPad Air 5 / iPad Mini 6 / iPad 10 (2022)',
      slug: 'back-camera-ipad-pro-12-9-3rd-gen-2018-ipad-pro-11-1st-gen-2018-ipad-air-4-ipad-air-5-ipad-mini-6-ipad-10-2022',
      sku: 'IPAD129G3-BACK-CAM-GEN',
      description: 'Back camera compatible with iPad Pro 12.9" 3rd Gen and various other iPad models.',
      price: 9.95,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Front Camera Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) / iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020)',
      slug: 'front-camera-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-ipad-pro-11-1st-gen-2018-pro-11-2nd-gen-2020',
      sku: 'IPAD129G3-FRONT-CAM-GEN',
      description: 'Front camera compatible with iPad Pro 12.9" 3rd/4th Gen and 11" 1st/2nd Gen.',
      price: 14.73,
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

    // Loudspeakers
    {
      name: 'Loudspeaker Compatible For iPad Pro 12.9" 3rd Gen (2018) (4 Piece Set / Small)',
      slug: 'loudspeaker-ipad-pro-12-9-3rd-gen-2018-4-piece-set-small',
      sku: 'IPAD129G3-SPEAKER-4PC-SMALL',
      description: 'Loudspeaker 4-piece set (small) for iPad Pro 12.9" 3rd Gen (2018).',
      price: 19.09,
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
      name: 'Loudspeaker Compatible For iPad Pro 12.9" 3rd Gen (2018) (4 Piece Set / Big)',
      slug: 'loudspeaker-ipad-pro-12-9-3rd-gen-2018-4-piece-set-big',
      sku: 'IPAD129G3-SPEAKER-4PC-BIG',
      description: 'Loudspeaker 4-piece set (big) for iPad Pro 12.9" 3rd Gen (2018).',
      price: 38.47,
      discount_percentage: 0,
      stock_quantity: 20,
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
      name: 'Power / Volume Button Flex Compatible For iPad Pro 12.9" 3rd Gen (2018) (4G Version)',
      slug: 'power-volume-button-flex-ipad-pro-12-9-3rd-gen-2018-4g-version',
      sku: 'IPAD129G3-POWER-VOLUME-FLEX-4G',
      description: 'Power / Volume button flex for iPad Pro 12.9" 3rd Gen (2018). 4G version.',
      price: 3.09,
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
      name: 'Power / Volume Button Flex Compatible For iPad Pro 12.9" 3rd Gen (2018) (WiFi Version)',
      slug: 'power-volume-button-flex-ipad-pro-12-9-3rd-gen-2018-wifi-version',
      sku: 'IPAD129G3-POWER-VOLUME-FLEX-WIFI',
      description: 'Power / Volume button flex for iPad Pro 12.9" 3rd Gen (2018). WiFi version.',
      price: 3.11,
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

    // LCD Flex Cables
    {
      name: 'LCD Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) (Aftermarket Plus) (2 Piece)',
      slug: 'lcd-flex-cable-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-aftermarket-plus-2-piece',
      sku: 'IPAD129G3-LCD-FLEX-AP-2PC',
      description: 'Aftermarket Plus LCD flex cable for iPad Pro 12.9" 3rd/4th Gen. 2-piece set.',
      price: 4.46,
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
      name: 'LCD Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) (Premium) (2 Piece)',
      slug: 'lcd-flex-cable-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-premium-2-piece',
      sku: 'IPAD129G3-LCD-FLEX-PREM-2PC',
      description: 'Premium LCD flex cable for iPad Pro 12.9" 3rd/4th Gen. 2-piece set.',
      price: 7.92,
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

    // Face ID Components
    {
      name: 'Face ID FPC Flex Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / Pro 12.9" 3rd Gen (2018) / Pro 12.9" 4th Gen (2020) (JCID)',
      slug: 'face-id-fpc-flex-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-3rd-gen-2018-12-9-4th-gen-2020-jcid',
      sku: 'IPAD129G3-FACE-ID-FPC-JCID',
      description: 'Face ID FPC flex cable for iPad Pro various generations. JCID brand.',
      price: 9.43,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'JCID'
    },
    {
      name: 'Face ID Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 12.9" 4th Gen (2020)',
      slug: 'face-id-flex-cable-ipad-pro-12-9-3rd-gen-2018-ipad-pro-12-9-4th-gen-2020',
      sku: 'IPAD129G3-FACE-ID-FLEX',
      description: 'Face ID flex cable for iPad Pro 12.9" 3rd/4th Gen.',
      price: 8.93,
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

    // Infrared Sensor
    {
      name: 'Infrared Sensor Flex Cable Compatible For iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) / 12.9" 3rd Gen (2018) / 4th Gen (2020) (Soldering Required)',
      slug: 'infrared-sensor-flex-cable-ipad-pro-11-1st-gen-2018-11-2nd-gen-2020-12-9-3rd-gen-2018-4th-gen-2020-soldering-required',
      sku: 'IPAD129G3-INFRARED-FLEX',
      description: 'Infrared sensor flex cable for iPad Pro various generations. Soldering required.',
      price: 6.52,
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

    // Keyboard Flex Cable
    {
      name: 'Keyboard Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 11" 1st Gen (2018) (Black)',
      slug: 'keyboard-flex-cable-ipad-pro-12-9-3rd-gen-2018-ipad-pro-11-1st-gen-2018-black',
      sku: 'IPAD129G3-KEYBOARD-FLEX-BLK',
      description: 'Keyboard flex cable for iPad Pro 12.9" 3rd Gen / 11" 1st Gen. Black color.',
      price: 1.55,
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

    // Microphone Flex Cable
    {
      name: 'Microphone Flex Cable Compatible For iPad Pro 11" (1st Gen: 2018) / Pro 12.9" (3rd Gen  2018)',
      slug: 'microphone-flex-cable-ipad-pro-11-1st-gen-2018-pro-12-9-3rd-gen-2018',
      sku: 'IPAD129G3-MIC-FLEX',
      description: 'Microphone flex cable for iPad Pro 11" 1st Gen / 12.9" 3rd Gen.',
      price: 2.98,
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

    // Back Camera Lens
    {
      name: 'Back Camera Lens Compatible For iPad Pro 12.9" 3rd Gen (2018) / Pro 11" 1st Gen (2018) / Mini 6 (2021) / Mini 7 (2024) (Space Gray)',
      slug: 'back-camera-lens-ipad-pro-12-9-3rd-gen-2018-pro-11-1st-gen-2018-mini-6-2021-mini-7-2024-space-gray',
      sku: 'IPAD129G3-BACK-CAM-LENS-GRAY',
      description: 'Back camera lens for iPad Pro 12.9" 3rd Gen and various other models. Space Gray color.',
      price: 2.38,
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
      name: 'Back Camera Lens Compatible For iPad Pro 12.9" 3rd Gen (2018) (Silver)',
      slug: 'back-camera-lens-ipad-pro-12-9-3rd-gen-2018-silver',
      sku: 'IPAD129G3-BACK-CAM-LENS-SILVER',
      description: 'Back camera lens for iPad Pro 12.9" 3rd Gen (2018). Silver color.',
      price: 2.57,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 1 x 0.1 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Antennas
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
      name: 'WiFi & GPS Antenna Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020)',
      slug: 'wifi-gps-antenna-flex-cable-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020',
      sku: 'IPAD129G3-WIFI-GPS-ANTENNA',
      description: 'WiFi & GPS antenna flex cable for iPad Pro 12.9" 3rd/4th Gen.',
      price: 5.73,
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

    // Holding Brackets
    {
      name: 'LCD Cable Holding Bracket Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020)',
      slug: 'lcd-cable-holding-bracket-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020',
      sku: 'IPAD129G3-LCD-BRACKET',
      description: 'LCD cable holding bracket for iPad Pro 12.9" 3rd/4th Gen.',
      price: 3.16,
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

    // Buttons
    {
      name: 'Hard Buttons Set (Power / Volume) Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 11" 1st Gen (2018) (Space Gray)',
      slug: 'hard-buttons-set-power-volume-ipad-pro-12-9-3rd-gen-2018-ipad-pro-11-1st-gen-2018-space-gray',
      sku: 'IPAD129G3-HARD-BUTTONS-GRAY',
      description: 'Hard buttons set (Power / Volume) for iPad Pro 12.9" 3rd Gen / 11" 1st Gen. Space Gray color.',
      price: 3.00,
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
      name: 'Hard Buttons Set (Power / Volume) Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 11" 1st Gen (2018) (Silver)',
      slug: 'hard-buttons-set-power-volume-ipad-pro-12-9-3rd-gen-2018-ipad-pro-11-1st-gen-2018-silver',
      sku: 'IPAD129G3-HARD-BUTTONS-SILVER',
      description: 'Hard buttons set (Power / Volume) for iPad Pro 12.9" 3rd Gen / 11" 1st Gen. Silver color.',
      price: 3.02,
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

    // Complete Screw Set
    {
      name: 'Complete Screw Set Compatible For iPad Pro 12.9" (2nd Gen: 2017 / 3rd Gen: 2018 / 4th Gen: 2020)',
      slug: 'complete-screw-set-ipad-pro-12-9-2nd-gen-2017-3rd-gen-2018-4th-gen-2020',
      sku: 'IPAD129G3-SCREW-SET',
      description: 'Complete screw set for iPad Pro 12.9" 2nd Gen (2017) / 3rd Gen (2018) / 4th Gen (2020).',
      price: 1.55,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // SIM Card Components
    {
      name: 'Sim Card Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020)',
      slug: 'sim-card-flex-cable-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020',
      sku: 'IPAD129G3-SIM-FLEX',
      description: 'SIM card flex cable for iPad Pro 12.9" 3rd/4th Gen.',
      price: 1.84,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 1 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Sim Card Tray Compatible For iPad Pro 11" 1st Gen (2018) / Pro 11" 2rd Gen (2020) / Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) (Space Gray)',
      slug: 'sim-card-tray-ipad-pro-11-1st-gen-2018-pro-11-2rd-gen-2020-pro-12-9-3rd-gen-2018-4th-gen-2020-space-gray',
      sku: 'IPAD129G3-SIM-TRAY-GRAY',
      description: 'SIM card tray for iPad Pro 11" 1st/2nd Gen and 12.9" 3rd/4th Gen. Space Gray color.',
      price: 2.86,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Sim Card Tray Compatible For iPad Pro 11" 1st Gen (2018) / Pro 11" 2rd Gen (2020) / Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) (Silver)',
      slug: 'sim-card-tray-ipad-pro-11-1st-gen-2018-pro-11-2rd-gen-2020-pro-12-9-3rd-gen-2018-4th-gen-2020-silver',
      sku: 'IPAD129G3-SIM-TRAY-SILVER',
      description: 'SIM card tray for iPad Pro 11" 1st/2nd Gen and 12.9" 3rd/4th Gen. Silver color.',
      price: 3.02,
      discount_percentage: 0,
      stock_quantity: 53,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Adhesive Tapes
    {
      name: 'LCD Adhesive Tape Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) (10 Pack) (Tesa Tape)',
      slug: 'lcd-adhesive-tape-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-10-pack-tesa-tape',
      sku: 'IPAD129G3-LCD-TAPE-TESA-10PK',
      description: 'LCD adhesive tape (Tesa brand) for iPad Pro 12.9" 3rd/4th Gen. 10-pack.',
      price: 8.80,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '6 x 4 x 1 inch',
      category_id: 8,
      brand: 'Tesa'
    },
    {
      name: 'LCD Adhesive Tape Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020)',
      slug: 'lcd-adhesive-tape-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020',
      sku: 'IPAD129G3-LCD-TAPE',
      description: 'LCD adhesive tape for iPad Pro 12.9" 3rd/4th Gen.',
      price: 2.40,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '6 x 4 x 0.05 inch',
      category_id: 8,
      brand: 'Apple'
    },

    // Polarizer Film
    {
      name: 'Polarizer Film Compatible For iPad Pro 12.9" 3rd Gen (2018) (Premium) (10 Pack)',
      slug: 'polarizer-film-ipad-pro-12-9-3rd-gen-2018-premium-10-pack',
      sku: 'IPAD129G3-POLARIZER-FILM-10PK',
      description: 'Polarizer film for iPad Pro 12.9" 3rd Gen (2018). Premium quality. 10-pack.',
      price: 9.96,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '6 x 4 x 0.5 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Stylus Components
    {
      name: 'Stylus Charging Coil Compatible For iPad Pro 11" 1st Gen (2018) / Pro 12.9" 3rd Gen (2018)',
      slug: 'stylus-charging-coil-ipad-pro-11-1st-gen-2018-pro-12-9-3rd-gen-2018',
      sku: 'IPAD129G3-STYLUS-COIL',
      description: 'Stylus charging coil for iPad Pro 11" 1st Gen / 12.9" 3rd Gen.',
      price: 4.48,
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
    {
      name: 'Stylus Pen Flex Cable Compatible For iPad Pro 12.9" 3rd Gen (2018) / Pro 12.9" 4th Gen (2020)',
      slug: 'stylus-pen-flex-cable-ipad-pro-12-9-3rd-gen-2018-pro-12-9-4th-gen-2020',
      sku: 'IPAD129G3-STYLUS-FLEX',
      description: 'Stylus pen flex cable for iPad Pro 12.9" 3rd/4th Gen.',
      price: 12.65,
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

    // Touch Controller IC
    {
      name: 'Touch Controller IC Compatible For iPad Mini 5 / iPad 6 / iPad 7 / iPad 9 / Pro 9.7" / Pro 10.5" / Pro 11" (1st / 2nd Gen / 3rd Gen 2021) / Air 3 / Pro 12.9" 1st Gen (2015) / 2nd Gen (2017) / 3rd Gen (2018) / 4th Gen (BCM15900B0: 225 Pins) (10 Pack)',
      slug: 'touch-controller-ic-ipad-mini-5-ipad-6-ipad-7-ipad-9-pro-9-7-pro-10-5-pro-11-1st-2nd-gen-3rd-gen-2021-air-3-pro-12-9-1st-gen-2015-2nd-gen-2017-3rd-gen-2018-4th-gen-bcm15900b0-225-pins-10-pack',
      sku: 'IPAD-TOUCH-IC-BCM15900B0-10PK',
      description: 'Touch controller IC for various iPad models (BCM15900B0: 225 pins). 10-pack.',
      price: 10.41,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '4 x 3 x 1 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Touch Coil
    {
      name: 'Touch Coil Compatible For iPad 7 (2019) / iPad 8 (2020) / iPad 9 (2021) / iPad Mini 5 / iPad Air 3 / iPad Pro 12.9" 3rd Gen (L3301 / L2201)',
      slug: 'touch-coil-ipad-7-2019-ipad-8-2020-ipad-9-2021-ipad-mini-5-ipad-air-3-ipad-pro-12-9-3rd-gen-l3301-l2201',
      sku: 'IPAD-TOUCH-COIL-L3301',
      description: 'Touch coil for iPad 7/8/9 and various iPad Pro/Air/Mini models (L3301 / L2201).',
      price: 0.58,
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

    // Audio Codec IC
    {
      name: 'Audio Codec IC Compatible For iPad Pro 11" 1st Gen (2018) / 2nd Gen (2020) / iPad Pro 12.9" 3rd Gen (2018) (98728B / 30 Pin)',
      slug: 'audio-codec-ic-ipad-pro-11-1st-gen-2018-2nd-gen-2020-ipad-pro-12-9-3rd-gen-2018-98728b-30-pin',
      sku: 'IPAD-AUDIO-CODEC-IC-98728B',
      description: 'Audio codec IC for iPad Pro 11" 1st/2nd Gen and 12.9" 3rd Gen (98728B / 30 pin).',
      price: 0.62,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Touch Mosfet
    {
      name: 'Touch Mosfet Compatible For iPad 7 (2019) / iPad 8 (2020) / iPad 9 (2021) / iPad Mini 5 / iPad Air 3 / iPad Pro 12.9" 3rd Gen (Q3002 / Q2202) (XCQ)',
      slug: 'touch-mosfet-ipad-7-2019-ipad-8-2020-ipad-9-2021-ipad-mini-5-ipad-air-3-ipad-pro-12-9-3rd-gen-q3002-q2202-xcq',
      sku: 'IPAD-TOUCH-MOSFET-Q3002',
      description: 'Touch MOSFET for iPad 7/8/9 and various iPad Pro/Air/Mini models (Q3002 / Q2202) (XCQ).',
      price: 0.88,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Small Audio IC
    {
      name: 'Small Audio IC Chip Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 6 (2018) / iPad 7 (2019) / iPad 8 (2020) (AKN / MAX98357B)',
      slug: 'small-audio-ic-chip-ipad-pro-12-9-3rd-gen-2018-ipad-6-2018-ipad-7-2019-ipad-8-2020-akn-max98357b',
      sku: 'IPAD-SMALL-AUDIO-IC-AKN',
      description: 'Small audio IC chip for iPad Pro 12.9" 3rd Gen and various iPad models (AKN / MAX98357B).',
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

    // Charging Port FPC Connector
    {
      name: 'Charging Port FPC Connector Compatible For iPad Pro 11" 3th Gen / Pro 11" 4th Gen / Pro 11" 5th Gen / Pro 12.9" 3th Gen / Pro 12.9" 4th Gen / iPad Pro 12.9" 5th Gen / Pro 12.9" 6th Gen / Pro 13" 7th Gen / Mini 6 / Mini 7 (28 Pin)',
      slug: 'charging-port-fpc-connector-ipad-pro-series-28-pin',
      sku: 'IPAD-CHARGING-FPC-28PIN',
      description: 'Charging port FPC connector compatible with iPad Pro series (28 pin).',
      price: 1.46,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Gyroscope IC
    {
      name: 'Gyroscoope IC Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 11" 1st Gen (2018) (FY)',
      slug: 'gyroscoope-ic-ipad-pro-12-9-3rd-gen-2018-ipad-pro-11-1st-gen-2018-fy',
      sku: 'IPAD-GYROSCOPE-IC-FY',
      description: 'Gyroscope IC for iPad Pro 12.9" 3rd Gen / 11" 1st Gen (FY).',
      price: 1.86,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // LCD Display eDP Connector
    {
      name: 'LCD Display eDP Connector Compatible For iPad Pro 12.9" 4th Gen / Pro 12.9" 3rd Gen (2018) / Pro 12.9" 2nd Gen / Pro 11" 1st Gen / Pro 11" 2rd Gen / iPad 7 / Mini 5 / Air 3 /iPad 6 (2018) / iPad 8 (2020) / Air / iPad Mini 2 / Mini 3 (IXB/IXU/302V)',
      slug: 'lcd-display-edp-connector-ipad-pro-12-9-4th-gen-pro-12-9-3rd-gen-2018-pro-12-9-2nd-gen-pro-11-1st-gen-pro-11-2rd-gen-ipad-7-mini-5-air-3-ipad-6-2018-ipad-8-2020-air-ipad-mini-2-mini-3-ixb-ixu-302v',
      sku: 'IPAD-LCD-EDP-IXB-IXU-302V',
      description: 'LCD display eDP connector for iPad Pro various generations (IXB/IXU/302V).',
      price: 1.86,
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

    // Touch Controller IC
    {
      name: 'Touch Controller IC Compatible For iPad Mini 5/iPad 6/iPad 7/iPad 8/iPad 9/Pro 9.7"/Pro 10.5"/Pro 11" (1st/2nd Gen/3rd Gen 2021)/Air 3/Pro 12.9" 1st Gen (2015)/2nd Gen (2017)/ 3rd Gen (2018)/4th Gen (2020)(BCM15900B0: 225 Pins)',
      slug: 'touch-controller-ic-ipad-mini-5-ipad-6-ipad-7-ipad-8-ipad-9-pro-9-7-pro-10-5-pro-11-1st-2nd-gen-3rd-gen-2021-air-3-pro-12-9-1st-gen-2015-2nd-gen-2017-3rd-gen-2018-4th-gen-2020-bcm15900b0-225-pins',
      sku: 'IPAD-TOUCH-IC-BCM15900B0',
      description: 'Touch controller IC for various iPad models (BCM15900B0: 225 pins).',
      price: 1.88,
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

    // Ace SPI Flash IC
    {
      name: 'Ace SPI Flash IC (Charge EEPROM) With Program Compatible For iPad Pro 11" 1st Gen /Pro 12.9" 3th Gen ( 2018) (8N)',
      slug: 'ace-spi-flash-ic-charge-eeprom-ipad-pro-11-1st-gen-pro-12-9-3th-gen-2018-8n',
      sku: 'IPAD-ACE-SPI-FLASH-8N',
      description: 'Ace SPI flash IC (charge EEPROM) with program for iPad Pro 11" 1st Gen / 12.9" 3rd Gen (2018) (8N).',
      price: 2.03,
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

    // Backlight IC
    {
      name: 'Backlight IC Compatible For iPad Pro 13" / iPad 7 (2019) / iPad 9 (2021) (8566 5AR5)',
      slug: 'backlight-ic-ipad-pro-13-ipad-7-2019-ipad-9-2021-8566-5ar5',
      sku: 'IPAD-BACKLIGHT-IC-8566-5AR5',
      description: 'Backlight IC compatible with iPad Pro 13" / iPad 7 (2019) / iPad 9 (2021) (8566 5AR5).',
      price: 2.15,
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

    // Ace SPI Flash IC
    {
      name: 'Ace SPI Flash IC Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 12.9" 4th Gen (2020) / iPad Pro 11" 1st Gen (2018) / iPad Pro 11" 2rd Gen (2020) (8N8)',
      slug: 'ace-spi-flash-ic-ipad-pro-12-9-3rd-gen-2018-ipad-pro-12-9-4th-gen-2020-ipad-pro-11-1st-gen-2018-ipad-pro-11-2rd-gen-2020-8n8',
      sku: 'IPAD-ACE-SPI-FLASH-8N8',
      description: 'Ace SPI flash IC for iPad Pro 12.9" 3rd/4th Gen and 11" 1st/2nd Gen (8N8).',
      price: 2.17,
      discount_percentage: 0,
      stock_quantity: 48,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Small Audio IC
    {
      name: 'Small Audio IC Chip Compatible For iPad Pro 11" 1st Gen (2018) / iPad Mini 5 / iPad Air 3 / Pro 12.9" 3rd Gen (2018)(MAX98728B)',
      slug: 'small-audio-ic-chip-ipad-pro-11-1st-gen-2018-ipad-mini-5-ipad-air-3-pro-12-9-3rd-gen-2018-max98728b',
      sku: 'IPAD-SMALL-AUDIO-IC-MAX98728B',
      description: 'Small audio IC chip for iPad Pro 11" 1st Gen and various models (MAX98728B).',
      price: 2.31,
      discount_percentage: 0,
      stock_quantity: 46,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Charging IC
    {
      name: 'Charging IC Compatible For iPad Pro 12.9" 3rd Gen (2018)/iPad Pro 12.9" 4th Gen (2020)/iPad Pro 11" 1st Gen (2018)/iPad Pro 11" 2nd Gen (2020)/iPad 7 (2019)/iPad 8 (2020)/iPad Air 3/iPad 9 (2021)/iPad Pro 11" 3rd Gen (2021)/iPad Air 5/4 (343S00235)',
      slug: 'charging-ic-ipad-pro-12-9-3rd-gen-2018-12-9-4th-gen-2020-11-1st-gen-2018-11-2nd-gen-2020-ipad-7-2019-ipad-8-2020-ipad-air-3-ipad-9-2021-11-3rd-gen-2021-ipad-air-5-4-343s00235',
      sku: 'IPAD-CHARGING-IC-343S00235',
      description: 'Charging IC for iPad Pro various generations (343S00235).',
      price: 2.64,
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

    // WiFi / Bluetooth IC
    {
      name: 'WiFi / Bluetooth IC Chip Compatible For iPhone XS / XS Max / iPad Pro 11" 1st Gen (2018) / Mini 5 / Air 3 / Pro 12.9" 3rd Gen (2018) (339S00540)',
      slug: 'wifi-bluetooth-ic-chip-ipad-pro-11-1st-gen-2018-mini-5-air-3-pro-12-9-3rd-gen-2018-339s00540',
      sku: 'IPAD-WIFI-BT-IC-339S00540',
      description: 'WiFi / Bluetooth IC chip for iPad Pro 11" 1st Gen and various models (339S00540).',
      price: 3.82,
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

    // Tristar U2 Charging IC
    {
      name: 'Tristar U2 Charging IC Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 11" 1st Gen (2018) (610A3C)',
      slug: 'tristar-u2-charging-ic-ipad-pro-12-9-3rd-gen-2018-ipad-pro-11-1st-gen-2018-610a3c',
      sku: 'IPAD-TRISTAR-U2-IC-610A3C',
      description: 'Tristar U2 charging IC for iPad Pro 12.9" 3rd Gen / 11" 1st Gen (610A3C).',
      price: 4.32,
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

    // USB RE-drive IC
    {
      name: 'USB RE-drive IC Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 11" 1st Gen (2018) (Pi3dpx1205)',
      slug: 'usb-re-drive-ic-ipad-pro-12-9-3rd-gen-2018-ipad-pro-11-1st-gen-2018-pi3dpx1205',
      sku: 'IPAD-USB-RE-DRIVE-IC-PI3DPX1205',
      description: 'USB RE-drive IC for iPad Pro 12.9" 3rd Gen / 11" 1st Gen (Pi3dpx1205).',
      price: 4.82,
      discount_percentage: 0,
      stock_quantity: 28,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },

    // Power Management ICs
    {
      name: 'Power Management IC Compatible For iPad Pro 12.9" 3rd Gen (2018) (343S00256)',
      slug: 'power-management-ic-ipad-pro-12-9-3rd-gen-2018-343s00256',
      sku: 'IPAD-PM-IC-343S00256',
      description: 'Power management IC for iPad Pro 12.9" 3rd Gen (2018) (343S00256).',
      price: 7.96,
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
      name: 'Power Management IC Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 11" 1st Gen (2018) (343S00247)',
      slug: 'power-management-ic-ipad-pro-12-9-3rd-gen-2018-ipad-pro-11-1st-gen-2018-343s00247',
      sku: 'IPAD-PM-IC-343S00247',
      description: 'Power management IC for iPad Pro 12.9" 3rd Gen / 11" 1st Gen (343S00247).',
      price: 9.32,
      discount_percentage: 0,
      stock_quantity: 22,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'Power Management IC (Big) Compatible For iPad Pro 12.9" 3rd Gen (2018) (343S00251)',
      slug: 'power-management-ic-big-ipad-pro-12-9-3rd-gen-2018-343s00251',
      sku: 'IPAD-PM-IC-BIG-343S00251',
      description: 'Power management IC (big) for iPad Pro 12.9" 3rd Gen (2018) (343S00251).',
      price: 11.64,
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

    // USB Cables
    {
      name: 'USB-A to Lightning Cable (3ft.) For iPhone / iPad (10 Pack) (Generic)',
      slug: 'usb-a-to-lightning-cable-3ft-ipad-10-pack-generic',
      sku: 'USB-LIGHTNING-3FT-10PK',
      description: 'USB-A to Lightning cable (3ft) for iPhone/iPad. 10-pack. Generic.',
      price: 25.00,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.5,
      dimensions: '8 x 6 x 2 inch',
      category_id: 10,
      brand: 'Generic'
    },

    // Casper Tempered Glass
    {
      name: 'Casper Pro Tempered Glass Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) / iPad 12.9" 5th Gen (2021) / iPad 12.9" 6th Gen (2022) (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-ipad-12-9-5th-gen-2021-ipad-12-9-6th-gen-2022-retail-pack-clear',
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
    },

    // LCD FPC Connector / MainBoard Charger USB FPC Connector
    {
      name: 'LCD FPC Connector / MainBoard Charger USB FPC Connector Compatible For MacBook Pro Retina 13"/15"/Air 13" (A1706/A1707/A1708/A1989/A2159/A2251/A2289/A1990/A1932/A2179)/iPad Pro 11" (2018)/Pro 11" (2020)/Pro 12.9" (2018)/Pro 12.9" (2020) (42 Pin)',
      slug: 'lcd-fpc-connector-mainboard-charger-usb-fpc-connector-macbook-pro-retina-13-15-air-13-a1706-a1707-a1708-a1989-a2159-a2251-a2289-a1990-a1932-a2179-ipad-pro-11-2018-pro-11-2020-pro-12-9-2018-pro-12-9-2020-42-pin',
      sku: 'IPAD-LCD-FPC-MAINBOARD-USB-42PIN',
      description: 'LCD FPC connector / MainBoard charger USB FPC connector for MacBook Pro Retina and iPad Pro models (42 pin).',
      price: 2.24,
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

    // USB And Power Delivery IC
    {
      name: 'USB And Power Delivery IC Compatible For MacBook Pro / Air (CD3217 B12, 2016-2021 Year) / iPad Pro 11" ( 2nd Gen / 3rd Gen) / iPad Air 4 / iPad Air 5 (2022) / Mini 6 / Pro 12.9" (4th Gen,2020 / 5th Gen,2021) (123 Pin)',
      slug: 'usb-and-power-delivery-ic-macbook-pro-air-cd3217-b12-2016-2021-ipad-pro-11-2nd-gen-3rd-gen-ipad-air-4-ipad-air-5-2022-mini-6-pro-12-9-4th-gen-2020-5th-gen-2021-123-pin',
      sku: 'IPAD-USB-PD-IC-CD3217-B12',
      description: 'USB and power delivery IC for MacBook Pro/Air and iPad Pro/Air/Mini models (CD3217 B12, 123 pin).',
      price: 7.40,
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

    // Screen Read / Write FPC
    {
      name: 'Screen Read / Write FPC Compatible For iPad Pro 12.
