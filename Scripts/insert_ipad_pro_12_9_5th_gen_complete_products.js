#!/usr/bin/env node

/**
 * Insert iPad Pro 12.9" 5th Gen (2021) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 12.9" 5th Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 12.9" 5th Gen products...');

  const products = [
    // LCD Assemblies
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (OEM Pull: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-oem-pull-grade-a-all-colors',
      sku: 'IPAD129G5-LCD-OEM-A-ALL',
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
      sku: 'IPAD129G5-LCD-AP-ALL',
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
      sku: 'IPAD129G5-LCD-PREM-ALL',
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
      sku: 'IPAD129G5-DIGITIZER-AP-ALL',
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
      sku: 'IPAD129G5-DIGITIZER-PREM-ALL',
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
      sku: 'IPAD129G5-FRONT-GLASS-PREM-ALL',
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
      sku: 'IPAD129G5-BATTERY-AMP-PRO',
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
      name: 'Charging Port Only Compatible For iPad Pro 10.5" / iPad Pro 12.9" 1st Gen (2015) / iPad Pro 12.9" 2nd (2017) (Soldering Required) (Space Gray) (10 Pack)',
      slug: 'charging-port-only-ipad-pro-10-5-12-9-1st-gen-2015-12-9-2nd-2017-soldering-required-space-gray-10-pack',
      sku: 'IPAD-CHARGING-PORT-10PK-GRAY-OLD',
      description: 'Charging port only for iPad Pro 10.5" / 12.9" 1st/2nd Gen. Soldering required. Space Gray 10-pack.',
      price: 10.48,
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
      name: 'Loudspeaker Compatible For iPad Pro 12.9" 5th Gen (2021) (4 Piece Set) / 12.9" 6th Gen (2022) (WiFi Version)',
      slug: 'loudspeaker-ipad-pro-12-9-5th-gen-2021-4-piece-set-12-9-6th-gen-2022-wifi-version',
      sku: 'IPAD129G5-SPEAKER-4PC-WIFI',
      description: 'Loudspeaker 4-piece set for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) WiFi version.',
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
      name: 'Loudspeaker Compatible For iPad Pro 12.9" 5th Gen (2021) (4 Piece Set) / 12.9" 6th Gen (2022) (LTE Version)',
      slug: 'loudspeaker-ipad-pro-12-9-5th-gen-2021-4-piece-set-12-9-6th-gen-2022-lte-version',
      sku: 'IPAD129G5-SPEAKER-4PC-LTE',
      description: 'Loudspeaker 4-piece set for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) LTE version.',
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
      name: 'Power Button Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (WiFi Version)',
      slug: 'power-button-flex-cable-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-11-3rd-gen-2021-11-4th-gen-2022-wifi-version',
      sku: 'IPAD-POWER-FLEX-WIFI',
      description: 'Power button flex cable for iPad Pro 12.9" 5th/6th Gen and 11" 3rd/4th Gen. WiFi version.',
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
      name: 'Power Button Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (US Version) (4G Version)',
      slug: 'power-button-flex-cable-ipad-pro-12-9-5th-gen-2021-12-9-6th-gen-2022-11-3rd-gen-2021-11-4th-gen-2022-us-version-4g-version',
      sku: 'IPAD-POWER-FLEX-US-4G',
      description: 'Power button flex cable for iPad Pro 12.9" 5th/6th Gen and 11" 3rd/4th Gen. US version, 4G.',
      price: 3.77,
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
    {
      name: 'Volume Button Flex Cable Compatible For iPad Pro 12.9" 5th Gen (2021) (Wifi Version)',
      slug: 'volume-button-flex-cable-ipad-pro-12-9-5th-gen-2021-wifi-version',
      sku: 'IPAD-VOLUME-FLEX-WIFI',
      description: 'Volume button flex cable for iPad Pro 12.9" 5th Gen. WiFi version.',
      price: 3.95,
      discount_percentage: 0,
      stock_quantity: 46,
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
      sku: 'IPAD129G5-LCD-FLEX-AP',
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
      sku: 'IPAD129G5-LCD-FLEX-PREM',
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
      name: 'Microphone Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / iPad Pro 12.9" 5th Gen (2021)',
      slug: 'microphone-flex-cable-ipad-pro-11-3rd-gen-2021-12-9-5th-gen-2021',
      sku: 'IPAD-MIC-FLEX-11-12-9',
      description: 'Microphone flex cable for iPad Pro 11" 3rd Gen / 12.9" 5th Gen.',
      price: 2.55,
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
      sku: 'IPAD129G5-FACE-ID-FLEX',
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
      sku: 'IPAD129G5-4G-ANTENNA-PREM',
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
      name: '5G Antenna Cover Compatible For iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020) / Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / Pro 12.9" 3rd Gen (2018) / Pro 12.9" 4th Gen (2020) / Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (White)',
      slug: '5g-antenna-cover-ipad-pro-11-1st-gen-2018-11-2nd-gen-2020-11-3rd-gen-2021-11-4th-gen-2022-12-9-3rd-gen-2018-12-9-4th-gen-2020-12
