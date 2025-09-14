#!/usr/bin/env node

/**
 * Insert iPad Pro 12.9" 2nd Gen (2017) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 12.9" 2nd Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 12.9" 2nd Gen products...');

  const products = [
    // LCD Assemblies
    {
      name: 'LCD Assembly With Digitizer & Daughter Board Flex Pre-Installed Compatible For iPad Pro 12.9" 2nd Gen (2017) (Aftermarket Plus) (White)',
      slug: 'lcd-assembly-with-digitizer-daughter-board-flex-pre-installed-ipad-pro-12-9-2nd-gen-2017-aftermarket-plus-white',
      sku: 'IPAD129G2-LCD-AP-WHT',
      description: 'Aftermarket Plus LCD assembly with digitizer & daughter board flex pre-installed for iPad Pro 12.9" 2nd Gen (2017). White color.',
      price: 269.50,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.35,
      dimensions: '12 x 9 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer & Daughter Board Flex Pre-Installed Compatible For iPad Pro 12.9" 2nd Gen (2017) (Aftermarket Plus) (Black)',
      slug: 'lcd-assembly-with-digitizer-daughter-board-flex-pre-installed-ipad-pro-12-9-2nd-gen-2017-aftermarket-plus-black',
      sku: 'IPAD129G2-LCD-AP-BLK',
      description: 'Aftermarket Plus LCD assembly with digitizer & daughter board flex pre-installed for iPad Pro 12.9" 2nd Gen (2017). Black color.',
      price: 338.09,
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
      name: 'LCD Assembly With Digitizer & Daughter Board Flex Pre-Installed Compatible For iPad Pro 12.9" 2nd Gen (2017) (Refurbished) (Black)',
      slug: 'lcd-assembly-with-digitizer-daughter-board-flex-pre-installed-ipad-pro-12-9-2nd-gen-2017-refurbished-black',
      sku: 'IPAD129G2-LCD-REF-BLK',
      description: 'Refurbished LCD assembly with digitizer & daughter board flex pre-installed for iPad Pro 12.9" 2nd Gen (2017). Black color.',
      price: 400.03,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.35,
      dimensions: '12 x 9 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer & Daughter Board Flex Pre-Installed Compatible For iPad Pro 12.9" 2nd Gen (2017) (Premium) (White)',
      slug: 'lcd-assembly-with-digitizer-daughter-board-flex-pre-installed-ipad-pro-12-9-2nd-gen-2017-premium-white',
      sku: 'IPAD129G2-LCD-PREM-WHT',
      description: 'Premium LCD assembly with digitizer & daughter board flex pre-installed for iPad Pro 12.9" 2nd Gen (2017). White color.',
      price: 421.21,
      discount_percentage: 0,
      stock_quantity: 10,
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
      name: 'Digitizer Compatible For iPad Pro 12.9" 2nd Gen (2017) (Glass Separation Required) (Aftermarket Plus) (White)',
      slug: 'digitizer-ipad-pro-12-9-2nd-gen-2017-glass-separation-required-aftermarket-plus-white',
      sku: 'IPAD129G2-DIGITIZER-AP-WHT',
      description: 'Aftermarket Plus digitizer for iPad Pro 12.9" 2nd Gen (2017). Glass separation required. White color.',
      price: 21.31,
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
      name: 'Digitizer Compatible For iPad Pro 12.9" (2nd Gen / 2017) (Glass Separation Required) (Aftermarket Plus) (Black)',
      slug: 'digitizer-ipad-pro-12-9-2nd-gen-2017-glass-separation-required-aftermarket-plus-black',
      sku: 'IPAD129G2-DIGITIZER-AP-BLK',
      description: 'Aftermarket Plus digitizer for iPad Pro 12.9" 2nd Gen (2017). Glass separation required. Black color.',
      price: 28.27,
      discount_percentage: 0,
      stock_quantity: 38,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.2,
      dimensions: '12 x 9 x 0.3 inch',
      category_id: 2,
      brand: 'Apple'
    },
    {
      name: 'Digitizer Compatible For iPad Pro 12.9" 2nd Gen (2017) (Glass Separation Required) (Premium) (Black)',
      slug: 'digitizer-ipad-pro-12-9-2nd-gen-2017-glass-separation-required-premium-black',
      sku: 'IPAD129G2-DIGITIZER-PREM-BLK',
      description: 'Premium digitizer for iPad Pro 12.9" 2nd Gen (2017). Glass separation required. Black color.',
      price: 45.36,
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
    {
      name: 'Digitizer Compatible For iPad Pro 12.9" 2nd Gen (2017) (Glass Separation Required) (Premium) (White)',
      slug: 'digitizer-ipad-pro-12-9-2nd-gen-2017-glass-separation-required-premium-white',
      sku: 'IPAD129G2-DIGITIZER-PREM-WHT',
      description: 'Premium digitizer for iPad Pro 12.9" 2nd Gen (2017). Glass separation required. White color.',
      price: 45.76,
      discount_percentage: 0,
      stock_quantity: 33,
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
      name: 'Front Glass Only Compatible For iPad Pro 12.9" 2nd Gen (2017) (White) (Glass Separation Required)',
      slug: 'front-glass-only-ipad-pro-12-9-2nd-gen-2017-white-glass-separation-required',
      sku: 'IPAD129G2-FRONT-GLASS-WHT',
      description: 'Front glass only for iPad Pro 12.9" 2nd Gen (2017). White color. Glass separation required.',
      price: 3.48,
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
    {
      name: 'Front Glass Only Compatible For iPad Pro 12.9" 2nd Gen (2017) (Black) (Glass Separation Required)',
      slug: 'front-glass-only-ipad-pro-12-9-2nd-gen-2017-black-glass-separation-required',
      sku: 'IPAD129G2-FRONT-GLASS-BLK',
      description: 'Front glass only for iPad Pro 12.9" 2nd Gen (2017). Black color. Glass separation required.',
      price: 4.04,
      discount_percentage: 0,
      stock_quantity: 48,
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
      name: 'Replacement Battery Compatible For iPad Pro 12.9" 2nd Gen (2017) (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-12-9-2nd-gen-2017-ampsentrix-pro',
      sku: 'IPAD129G2-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 12.9" 2nd Gen (2017) from AmpSentrix Pro.',
      price: 32.08,
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

    // Charging Port Only - 10 Pack
    {
      name: 'Charging Port Only Compatible For iPad Pro 10.5" / iPad Pro 12.9" 1st Gen (2015) / iPad Pro 12.9" 2nd (2017) (Soldering Required) (Space Gray) (10 Pack)',
      slug: 'charging-port-only-ipad-pro-10-5-ipad-pro-12-9-1st-gen-2015-ipad-pro-12-9-2nd-2017-soldering-required-space-gray-10-pack',
      sku: 'IPAD-CHARGING-PORT-10PK-GRAY',
      description: 'Charging port only for iPad Pro 10.5"/12.9" various generations. Soldering required. Space Gray 10-pack.',
      price: 10.48,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '4 x 3 x 1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Only Compatible For iPad Pro 10.5" / iPad Pro 12.9" 1st Gen (2015) / iPad Pro 12.9" 2nd (2017) (Soldering Required) (White) (10 Pack)',
      slug: 'charging-port-only-ipad-pro-10-5-ipad-pro-12-9-1st-gen-2015-ipad-pro-12-9-2nd-2017-soldering-required-white-10-pack',
      sku: 'IPAD-CHARGING-PORT-10PK-WHT',
      description: 'Charging port only for iPad Pro 10.5"/12.9" various generations. Soldering required. White 10-pack.',
      price: 18.39,
      discount_percentage: 0,
      stock_quantity: 16,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '4 x 3 x 1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Charging Port Flex Cables
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (WiFi Version) (Silver / Gold)',
      slug: 'charging-port-flex-cable-ipad-pro-12-9-2nd-gen-2017-wifi-version-silver-gold',
      sku: 'IPAD129G2-CHARGING-FLEX-WIFI-SG',
      description: 'Charging port flex cable for iPad Pro 12.9" 2nd Gen (2017). WiFi version. Silver/Gold color.',
      price: 2.17,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (Cellular Version) (Silver / Gold)',
      slug: 'charging-port-flex-cable-ipad-pro-12-9-2nd-gen-2017-cellular-version-silver-gold',
      sku: 'IPAD129G2-CHARGING-FLEX-CELL-SG',
      description: 'Charging port flex cable for iPad Pro 12.9" 2nd Gen (2017). Cellular version. Silver/Gold color.',
      price: 2.19,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (Cellular Version) (Space Gray)',
      slug: 'charging-port-flex-cable-ipad-pro-12-9-2nd-gen-2017-cellular-version-space-gray',
      sku: 'IPAD129G2-CHARGING-FLEX-CELL-GRAY',
      description: 'Charging port flex cable for iPad Pro 12.9" 2nd Gen (2017). Cellular version. Space Gray color.',
      price: 2.19,
      discount_percentage: 0,
      stock_quantity: 56,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (WiFi Version) (Space Gray)',
      slug: 'charging-port-flex-cable-ipad-pro-12-9-2nd-gen-2017-wifi-version-space-gray',
      sku: 'IPAD129G2-CHARGING-FLEX-WIFI-GRAY',
      description: 'Charging port flex cable for iPad Pro 12.9" 2nd Gen (2017). WiFi version. Space Gray color.',
      price: 2.20,
      discount_percentage: 0,
      stock_quantity: 54,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // Home Button Components
    {
      name: 'Home Button Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (Rose Gold)',
      slug: 'home-button-flex-cable-ipad-pro-12-9-2nd-gen-2017-rose-gold',
      sku: 'IPAD129G2-HOME-BUTTON-ROSE-GOLD',
      description: 'Home button flex cable for iPad Pro 12.9" 2nd Gen (2017). Rose Gold color.',
      price: 0.39,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Home Button Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (Gold)',
      slug: 'home-button-flex-cable-ipad-pro-12-9-2nd-gen-2017-gold',
      sku: 'IPAD129G2-HOME-BUTTON-GOLD',
      description: 'Home button flex cable for iPad Pro 12.9" 2nd Gen (2017). Gold color.',
      price: 2.40,
      discount_percentage: 0,
      stock_quantity: 43,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Home Button Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (Space Gray)',
      slug: 'home-button-flex-cable-ipad-pro-12-9-2nd-gen-2017-space-gray',
      sku: 'IPAD129G2-HOME-BUTTON-GRAY',
      description: 'Home button flex cable for iPad Pro 12.9" 2nd Gen (2017). Space Gray color.',
      price: 2.40,
      discount_percentage: 0,
      stock_quantity: 41,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Home Button Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (Silver)',
      slug: 'home-button-flex-cable-ipad-pro-12-9-2nd-gen-2017-silver',
      sku: 'IPAD129G2-HOME-BUTTON-SILVER',
      description: 'Home button flex cable for iPad Pro 12.9" 2nd Gen (2017). Silver color.',
      price: 2.42,
      discount_percentage: 0,
      stock_quantity: 39,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Cameras
    {
      name: 'Front Camera With Flex Cable Compatible For iPad Pro 10.5" / Air 3 / Mini 5 / 12.9" 2nd Gen (2017)',
      slug: 'front-camera-with-flex-cable-ipad-pro-10-5-air-3-mini-5-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-FRONT-CAM-GEN',
      description: 'Front camera with flex cable for iPad Pro 10.5"/Air 3/Mini 5/12.9" 2nd Gen.',
      price: 3.75,
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
      name: 'Back Camera Compatible For iPad Pro 10.5" / iPad Pro 12.9" (2nd Gen: 2017)',
      slug: 'back-camera-ipad-pro-10-5-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-BACK-CAM-GEN',
      description: 'Back camera for iPad Pro 10.5"/12.9" 2nd Gen (2017).',
      price: 21.15,
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

    // Loudspeaker
    {
      name: 'Loudspeaker Compatible For iPad Pro 12.9" 2nd Gen (2017)',
      slug: 'loudspeaker-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-SPEAKER',
      description: 'Loudspeaker for iPad Pro 12.9" 2nd Gen (2017).',
      price: 7.16,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 6,
      brand: 'Apple'
    },

    // Button Flex Cables
    {
      name: 'Power / Volume Button Flex Compatible For iPad Pro 12.9" 2nd Gen (2017)',
      slug: 'power-volume-button-flex-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-POWER-VOLUME-FLEX',
      description: 'Power / Volume button flex for iPad Pro 12.9" 2nd Gen (2017).',
      price: 6.89,
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

    // Headphone Jack
    {
      name: 'Headphone Jack Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (Black)',
      slug: 'headphone-jack-flex-cable-ipad-pro-12-9-2nd-gen-2017-black',
      sku: 'IPAD129G2-HEADPHONE-JACK-BLK',
      description: 'Headphone jack flex cable for iPad Pro 12.9" 2nd Gen (2017). Black color.',
      price: 1.58,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Headphone Jack Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017) (White)',
      slug: 'headphone-jack-flex-cable-ipad-pro-12-9-2nd-gen-2017-white',
      sku: 'IPAD129G2-HEADPHONE-JACK-WHT',
      description: 'Headphone jack flex cable for iPad Pro 12.9" 2nd Gen (2017). White color.',
      price: 2.06,
      discount_percentage: 0,
      stock_quantity: 38,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },

    // LCD Components
    {
      name: 'LCD Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017)',
      slug: 'lcd-flex-cable-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-LCD-FLEX',
      description: 'LCD flex cable for iPad Pro 12.9" 2nd Gen (2017).',
      price: 5.77,
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
      name: 'LCD Daughter Board Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017)',
      slug: 'lcd-daughter-board-flex-cable-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-LCD-DAUGHTER-FLEX',
      description: 'LCD daughter board flex cable for iPad Pro 12.9" 2nd Gen (2017).',
      price: 50.64,
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

    // Back Camera Lens
    {
      name: 'Back Camera Lens Compatible For iPad Pro 12.9" 2nd Gen (2017) (Gold)',
      slug: 'back-camera-lens-ipad-pro-12-9-2nd-gen-2017-gold',
      sku: 'IPAD129G2-BACK-CAM-LENS-GOLD',
      description: 'Back camera lens for iPad Pro 12.9" 2nd Gen (2017). Gold color.',
      price: 0.59,
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
      name: 'Back Camera Lens Compatible For iPad Pro 12.9" 2nd Gen (2017) (Space Gray)',
      slug: 'back-camera-lens-ipad-pro-12-9-2nd-gen-2017-space-gray',
      sku: 'IPAD129G2-BACK-CAM-LENS-GRAY',
      description: 'Back camera lens for iPad Pro 12.9" 2nd Gen (2017). Space Gray color.',
      price: 1.59,
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
    {
      name: 'Back Camera Lens Compatible For iPad Pro 12.9" (2nd Gen: 2017) (Silver)',
      slug: 'back-camera-lens-ipad-pro-12-9-2nd-gen-2017-silver',
      sku: 'IPAD129G2-BACK-CAM-LENS-SILVER',
      description: 'Back camera lens for iPad Pro 12.9" 2nd Gen (2017). Silver color.',
      price: 2.69,
      discount_percentage: 0,
      stock_quantity: 58,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 1 x 0.1 inch',
      category_id: 2,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Lens Compatible For iPad Pro 12.9" 2nd Gen (2017) (Rose Gold)',
      slug: 'back-camera-lens-ipad-pro-12-9-2nd-gen-2017-rose-gold',
      sku: 'IPAD129G2-BACK-CAM-LENS-ROSE-GOLD',
      description: 'Back camera lens for iPad Pro 12.9" 2nd Gen (2017). Rose Gold color.',
      price: 3.04,
      discount_percentage: 0,
      stock_quantity: 56,
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
      name: 'WiFi & GPS Antenna Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017)',
      slug: 'wifi-gps-antenna-flex-cable-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-WIFI-GPS-ANTENNA',
      description: 'WiFi & GPS antenna flex cable for iPad Pro 12.9" 2nd Gen (2017).',
      price: 3.17,
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
      name: 'Home Button Holding Bracket With Rubber Gasket Compatible For iPad Pro 12.9" 2nd Gen (2017)',
      slug: 'home-button-holding-bracket-with-rubber-gasket-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-HOME-BRACKET-GASKET',
      description: 'Home button holding bracket with rubber gasket for iPad Pro 12.9" 2nd Gen (2017).',
      price: 0.90,
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
      name: 'LCD Cable Holding Bracket Compatible For iPad Pro 12.9" 2nd Gen (2017)',
      slug: 'lcd-cable-holding-bracket-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-LCD-BRACKET',
      description: 'LCD cable holding bracket for iPad Pro 12.9" 2nd Gen (2017).',
      price: 0.90,
      discount_percentage: 0,
      stock_quantity: 48,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 1 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },

    // Hard Buttons
    {
      name: 'Hard Buttons Set (Power / Volume) Compatible For iPad Pro 10.5" / iPad Air 3 / Mini 5 / iPad Pro 12.9" 2nd Gen (2017) (Silver)',
      slug: 'hard-buttons-set-power-volume-ipad-pro-10-5-ipad-air-3-mini-5-ipad-pro-12-9-2nd-gen-2017-silver',
      sku: 'IPAD129G2-HARD-BUTTONS-SILVER',
      description: 'Hard buttons set (Power / Volume) for iPad Pro 10.5"/Air 3/Mini 5/12.9" 2nd Gen. Silver color.',
      price: 0.86,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '3 x 2 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Hard Buttons Set (Power / Volume) Compatible For iPad Pro 10.5" / iPad Pro 12.9" 2nd Gen (2017) (Space Gray)',
      slug: 'hard-buttons-set-power-volume-ipad-pro-10-5-ipad-pro-12-9-2nd-gen-2017-space-gray',
      sku: 'IPAD129G2-HARD-BUTTONS-GRAY',
      description: 'Hard buttons set (Power / Volume) for iPad Pro 10.5"/12.9" 2nd Gen. Space Gray color.',
      price: 0.98,
      discount_percentage: 0,
      stock_quantity: 65,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '3 x 2 x 0.3 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Hard Buttons Set (Power / Volume) Compatible For iPad Pro 10.5" / iPad Air 3 / Mini 5 / iPad Pro 12.9" 2nd Gen (2017) (Space Gray)',
      slug: 'hard-buttons-set-power-volume-ipad-pro-10-5-ipad-air-3-mini-5-ipad-pro-12-9-2nd-gen-2017-space-gray-alt',
      sku: 'IPAD129G2-HARD-BUTTONS-GRAY-ALT',
      description: 'Hard buttons set (Power / Volume) for iPad Pro 10.5"/Air 3/Mini 5/12.9" 2nd Gen. Space Gray color.',
      price: 2.45,
      discount_percentage: 0,
      stock_quantity: 60,
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
      sku: 'IPAD129G2-SCREW-SET',
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
      name: 'Sim Card Reader With Flex Cable Compatible For iPad Pro 12.9" 2nd Gen (2017)',
      slug: 'sim-card-reader-with-flex-cable-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-SIM-READER',
      description: 'SIM card reader with flex cable for iPad Pro 12.9" 2nd Gen (2017).',
      price: 1.80,
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
      name: 'Sim Card Tray Compatible For iPad Pro 12.9" 2nd Gen (2017) (Space Gray)',
      slug: 'sim-card-tray-ipad-pro-12-9-2nd-gen-2017-space-gray',
      sku: 'IPAD129G2-SIM-TRAY-GRAY',
      description: 'SIM card tray for iPad Pro 12.9" 2nd Gen (2017). Space Gray color.',
      price: 1.93,
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

    // Adhesive Tapes
    {
      name: 'LCD Adhesive Tape Compatible For iPad Pro 12.9" 2nd Gen (2017) (Tesa Tape) (10 Pack)',
      slug: 'lcd-adhesive-tape-ipad-pro-12-9-2nd-gen-2017-tesa-tape-10-pack',
      sku: 'IPAD129G2-LCD-TAPE-TESA-10PK',
      description: 'LCD adhesive tape for iPad Pro 12.9" 2nd Gen (2017). Tesa brand. 10-pack.',
      price: 7.44,
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
      name: 'LCD Adhesive Tape Compatible For iPad Pro 12.9" 2nd Gen (2017)',
      slug: 'lcd-adhesive-tape-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD129G2-LCD-TAPE',
      description: 'LCD adhesive tape for iPad Pro 12.9" 2nd Gen (2017).',
      price: 4.11,
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

    // Backlight Components
    {
      name: 'Backlight Only Compatible For iPad Pro 12.9" 2nd Gen (2017) (4 Pack)',
      slug: 'backlight-only-ipad-pro-12-9-2nd-gen-2017-4-pack',
      sku: 'IPAD129G2-BACKLIGHT-4PK',
      description: 'Backlight only for iPad Pro 12.9" 2nd Gen (2017). 4-pack.',
      price: 62.66,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 2,
      brand: 'Apple'
    },
    {
      name: 'Backlight Only Compatible For iPad Pro 12.9" 2nd Gen (2017) (5 Pack)',
      slug: 'backlight-only-ipad-pro-12-9-2nd-gen-2017-5-pack',
      sku: 'IPAD129G2-BACKLIGHT-5PK',
      description: 'Backlight only for iPad Pro 12.9" 2nd Gen (2017). 5-pack.',
      price: 38.56,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // OCA Film
    {
      name: 'OCA Film Lamination Compatible For iPad Pro 12.9" 1st Gen (2015) / iPad Pro 12.9" 2nd Gen (2017) (175um) (10 Pack)',
      slug: 'oca-film-lamination-ipad-pro-12-9-1st-gen-2015-ipad-pro-12-9-2nd-gen-2017-175um-10-pack',
      sku: 'IPAD129G2-OCA-FILM-10PK',
      description: 'OCA film lamination for iPad Pro 12.9" 1st/2nd Gen. 175um. 10-pack.',
      price: 28.61,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '6 x 4 x 1 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Casper Tempered Glass
    {
      name: 'Casper Pro Tempered Glass Compatible For iPad Pro 12.9" 1st Gen (2015) / iPad 12.9" 2nd Gen (2017) (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-ipad-pro-12-9-1st-gen-2015-ipad-12-9-2nd-gen-2017-retail-pack-clear',
      sku: 'CASPER-TG-IPAD129G2-RP-CLEAR',
      description: 'Casper Pro tempered glass screen protector for iPad Pro 12.9" 1st/2nd Gen. Retail pack with clear finish.',
      price: 29.99,
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
  console.log('🚀 Starting iPad Pro 12.9" 2nd Gen Products Data Insertion...');

  try {
    await insertProducts();

    console.log('✅ iPad Pro 12.9" 2nd Gen products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains comprehensive iPad Pro 12.9" 2nd Gen repair parts.');
    console.log('🎉 You can now view and manage these products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
