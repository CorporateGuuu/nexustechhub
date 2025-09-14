#!/usr/bin/env node

/**
 * Insert iPad Pro 9.7" Products Data into Supabase
 * This script inserts comprehensive iPad Pro 9.7" repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 9.7" products...');

  const products = [
    // LCD Assemblies
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 9.7" (Aftermarket Plus) (Black)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-9-7-aftermarket-plus-black',
      sku: 'IPAD97-LCD-AP-BLK',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 9.7". Black color.',
      price: 73.79,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '9 x 7 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 9.7" (Aftermarket Pro: XO7-2) (Black)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-9-7-aftermarket-pro-xo7-2-black',
      sku: 'IPAD97-LCD-XO7-BLK',
      description: 'XO7-2 LCD assembly with digitizer for iPad Pro 9.7". Black color.',
      price: 87.51,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '9 x 7 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 9.7" (Aftermarket Pro: XO7) (White)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-9-7-aftermarket-pro-xo7-white',
      sku: 'IPAD97-LCD-XO7-WHT',
      description: 'XO7 LCD assembly with digitizer for iPad Pro 9.7". White color.',
      price: 89.15,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '9 x 7 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 9.7" (Refurbished) (White)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-9-7-refurbished-white',
      sku: 'IPAD97-LCD-REF-WHT',
      description: 'Refurbished LCD assembly with digitizer for iPad Pro 9.7". White color.',
      price: 105.25,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '9 x 7 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 9.7" (Refurbished) (Black)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-9-7-refurbished-black',
      sku: 'IPAD97-LCD-REF-BLK',
      description: 'Refurbished LCD assembly with digitizer for iPad Pro 9.7". Black color.',
      price: 110.06,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '9 x 7 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // Digitizers
    {
      name: 'Digitizer Compatible For iPad Pro 9.7" (Glass Separation Required) (Aftermarket Plus) (Black)',
      slug: 'digitizer-ipad-pro-9-7-glass-separation-required-aftermarket-plus-black',
      sku: 'IPAD97-DIGITIZER-AP-BLK',
      description: 'Aftermarket Plus digitizer for iPad Pro 9.7". Glass separation required. Black color.',
      price: 15.40,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '9 x 7 x 0.2 inch',
      category_id: 2,
      brand: 'Apple'
    },
    {
      name: 'Digitizer Compatible For iPad Pro 9.7" (Glass Separation Required) (Aftermarket Plus) (White)',
      slug: 'digitizer-ipad-pro-9-7-glass-separation-required-aftermarket-plus-white',
      sku: 'IPAD97-DIGITIZER-AP-WHT',
      description: 'Aftermarket Plus digitizer for iPad Pro 9.7". Glass separation required. White color.',
      price: 15.81,
      discount_percentage: 0,
      stock_quantity: 38,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '9 x 7 x 0.2 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Batteries
    {
      name: 'Replacement Battery Compatible For iPad Pro 9.7" (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-9-7-ampsentrix-pro',
      sku: 'IPAD97-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 9.7" from AmpSentrix Pro.',
      price: 21.68,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '8 x 6 x 0.2 inch',
      category_id: 3,
      brand: 'AmpSentrix'
    },

    // Charging Port Flex Cables
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 9.7" (Space Gray) (Aftermarket Plus)',
      slug: 'charging-port-flex-cable-ipad-pro-9-7-space-gray-aftermarket-plus',
      sku: 'IPAD97-CHARGING-FLEX-AP-GRAY',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 9.7". Space Gray color.',
      price: 2.11,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 9.7" (Gold / Rose Gold) (Aftermarket Plus)',
      slug: 'charging-port-flex-cable-ipad-pro-9-7-gold-rose-gold-aftermarket-plus',
      sku: 'IPAD97-CHARGING-FLEX-AP-GOLD',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 9.7". Gold/Rose Gold color.',
      price: 2.12,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 9.7" (Silver) (Aftermarket Plus)',
      slug: 'charging-port-flex-cable-ipad-pro-9-7-silver-aftermarket-plus',
      sku: 'IPAD97-CHARGING-FLEX-AP-SILVER',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 9.7". Silver color.',
      price: 2.12,
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
      name: 'Charging Port Flex Cable Compatible For iPad Pro 9.7" (Premium) (Silver)',
      slug: 'charging-port-flex-cable-ipad-pro-9-7-premium-silver',
      sku: 'IPAD97-CHARGING-FLEX-PREM-SILVER',
      description: 'Premium charging port flex cable for iPad Pro 9.7". Silver color.',
      price: 3.65,
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

    // Charging Port Only - 10 Pack
    {
      name: 'Charging Port Only Compatible For iPad Mini 4 / Air 2 / Air 3 / Pro 9.7" (Soldering Required) (White) (10 Pack)',
      slug: 'charging-port-only-ipad-mini-4-air-2-air-3-pro-9-7-soldering-required-white-10-pack',
      sku: 'IPAD-CHARGING-PORT-10PK-WHT',
      description: 'Charging port only for iPad Mini 4/Air 2/Air 3/Pro 9.7". Soldering required. White 10-pack.',
      price: 6.31,
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
      name: 'Charging Port Only Compatible For iPad Mini 4 / Air 2 / Air 3 / Pro 9.7" (Soldering Required) (Black) (10 Pack)',
      slug: 'charging-port-only-ipad-mini-4-air-2-air-3-pro-9-7-soldering-required-black-10-pack',
      sku: 'IPAD-CHARGING-PORT-10PK-BLK',
      description: 'Charging port only for iPad Mini 4/Air 2/Air 3/Pro 9.7". Soldering required. Black 10-pack.',
      price: 6.32,
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
    {
      name: 'Charging Port Only Compatible For iPad Mini 4 / Air 2 / Air 3 / Pro 9.7" (Soldering Required) (White)',
      slug: 'charging-port-only-ipad-mini-4-air-2-air-3-pro-9-7-soldering-required-white',
      sku: 'IPAD-CHARGING-PORT-SINGLE-WHT',
      description: 'Single charging port only for iPad Mini 4/Air 2/Air 3/Pro 9.7". Soldering required. White.',
      price: 0.78,
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

    // Home Button Components
    {
      name: 'Home Button With Flex Cable Compatible For iPad Pro 9.7" (Space Gray)',
      slug: 'home-button-with-flex-cable-ipad-pro-9-7-space-gray',
      sku: 'IPAD97-HOME-BUTTON-GRAY',
      description: 'Home button with flex cable for iPad Pro 9.7". Space Gray color.',
      price: 4.31,
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
      name: 'Home Button With Flex Cable Compatible For iPad Pro 9.7" (Silver)',
      slug: 'home-button-with-flex-cable-ipad-pro-9-7-silver',
      sku: 'IPAD97-HOME-BUTTON-SILVER',
      description: 'Home button with flex cable for iPad Pro 9.7". Silver color.',
      price: 4.31,
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
      name: 'Home Button With Flex Cable Compatible For iPad Pro 9.7" (Gold)',
      slug: 'home-button-with-flex-cable-ipad-pro-9-7-gold',
      sku: 'IPAD97-HOME-BUTTON-GOLD',
      description: 'Home button with flex cable for iPad Pro 9.7". Gold color.',
      price: 4.32,
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
      name: 'Home Button With Flex Cable Compatible For iPad Pro 9.7" (Rose Gold)',
      slug: 'home-button-with-flex-cable-ipad-pro-9-7-rose-gold',
      sku: 'IPAD97-HOME-BUTTON-ROSE-GOLD',
      description: 'Home button with flex cable for iPad Pro 9.7". Rose Gold color.',
      price: 4.34,
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
      name: 'Front Camera Compatible For iPad Pro 9.7"',
      slug: 'front-camera-ipad-pro-9-7',
      sku: 'IPAD97-FRONT-CAM',
      description: 'Front camera for iPad Pro 9.7".',
      price: 2.69,
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
      name: 'Back Camera Compatible For iPad Pro 9.7"',
      slug: 'back-camera-ipad-pro-9-7',
      sku: 'IPAD97-BACK-CAM',
      description: 'Back camera for iPad Pro 9.7".',
      price: 19.96,
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

    // Loudspeaker Components
    {
      name: 'Loudspeaker Flex Cable Ribbon (4G Version) Compatible For iPad Pro 9.7"',
      slug: 'loudspeaker-flex-cable-ribbon-4g-version-ipad-pro-9-7',
      sku: 'IPAD97-SPEAKER-FLEX-4G',
      description: 'Loudspeaker flex cable ribbon for iPad Pro 9.7". 4G version.',
      price: 2.06,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Loudspeaker Flex Cable Ribbon (WiFi Version) Compatible For iPad Pro 9.7"',
      slug: 'loudspeaker-flex-cable-ribbon-wifi-version-ipad-pro-9-7',
      sku: 'IPAD97-SPEAKER-FLEX-WIFI',
      description: 'Loudspeaker flex cable ribbon for iPad Pro 9.7". WiFi version.',
      price: 2.11,
      discount_percentage: 0,
      stock_quantity: 53,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Loudspeaker Compatible For iPad Pro 9.7" (3 Piece Set)',
      slug: 'loudspeaker-ipad-pro-9-7-3-piece-set',
      sku: 'IPAD97-SPEAKER-3PC',
      description: 'Loudspeaker 3-piece set for iPad Pro 9.7".',
      price: 12.72,
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
      name: 'Volume Button Flex Cable Compatible For iPad Pro 9.7"',
      slug: 'volume-button-flex-cable-ipad-pro-9-7',
      sku: 'IPAD97-VOLUME-FLEX',
      description: 'Volume button flex cable for iPad Pro 9.7".',
      price: 1.32,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '4 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Power Button Flex Cable Compatible For iPad Pro 9.7"',
      slug: 'power-button-flex-cable-ipad-pro-9-7',
      sku: 'IPAD97-POWER-FLEX',
      description: 'Power button flex cable for iPad Pro 9.7".',
      price: 2.18,
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

    // LCD Components
    {
      name: 'LCD Flex Cable Holding Bracket (On The Mainboard) Compatible For iPad Pro 9.7"',
      slug: 'lcd-flex-cable-holding-bracket-on-the-mainboard-ipad-pro-9-7',
      sku: 'IPAD97-LCD-BRACKET',
      description: 'LCD flex cable holding bracket (on the mainboard) for iPad Pro 9.7".',
      price: 1.55,
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
      name: 'LCD Flex Cable Compatible For iPad Pro 9.7"',
      slug: 'lcd-flex-cable-ipad-pro-9-7',
      sku: 'IPAD97-LCD-FLEX',
      description: 'LCD flex cable for iPad Pro 9.7".',
      price: 2.57,
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

    // Headphone Jack
    {
      name: 'Headphone Jack Flex Compatible For iPad Pro 9.7" (Black)',
      slug: 'headphone-jack-flex-ipad-pro-9-7-black',
      sku: 'IPAD97-HEADPHONE-JACK-BLK',
      description: 'Headphone jack flex for iPad Pro 9.7". Black color.',
      price: 1.79,
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
      name: 'Headphone Jack Flex Compatible For iPad Pro 9.7" (White)',
      slug: 'headphone-jack-flex-ipad-pro-9-7-white',
      sku: 'IPAD97-HEADPHONE-JACK-WHT',
      description: 'Headphone jack flex for iPad Pro 9.7". White color.',
      price: 1.80,
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

    // Back Camera Lens
    {
      name: 'Back Camera Lens Compatible For iPad Pro 9.7" (Silver)',
      slug: 'back-camera-lens-ipad-pro-9-7-silver',
      sku: 'IPAD97-BACK-CAM-LENS-SILVER',
      description: 'Back camera lens for iPad Pro 9.7". Silver color.',
      price: 0.25,
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
      name: 'Back Camera Lens Compatible For iPad Pro 9.7" (Space Gray)',
      slug: 'back-camera-lens-ipad-pro-9-7-space-gray',
      sku: 'IPAD97-BACK-CAM-LENS-GRAY',
      description: 'Back camera lens for iPad Pro 9.7". Space Gray color.',
      price: 0.83,
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
      name: 'Back Camera Lens Compatible For iPad Pro 9.7" (Rose Gold)',
      slug: 'back-camera-lens-ipad-pro-9-7-rose-gold',
      sku: 'IPAD97-BACK-CAM-LENS-ROSE-GOLD',
      description: 'Back camera lens for iPad Pro 9.7". Rose Gold color.',
      price: 0.99,
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

    // Antennas
    {
      name: 'GPS Signal Antenna Flex Cable Compatible For iPad Pro 9.7" (Long Flex)',
      slug: 'gps-signal-antenna-flex-cable-ipad-pro-9-7-long-flex',
      sku: 'IPAD97-GPS-ANTENNA-LONG',
      description: 'GPS signal antenna flex cable for iPad Pro 9.7". Long flex.',
      price: 0.47,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Antenna Flex Connector (On Mainboard) Compatible For iPad Pro 9.7"',
      slug: 'antenna-flex-connector-on-mainboard-ipad-pro-9-7',
      sku: 'IPAD97-ANTENNA-CONNECTOR',
      description: 'Antenna flex connector (on mainboard) for iPad Pro 9.7".',
      price: 0.57,
      discount_percentage: 0,
      stock_quantity: 65,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Apple'
    },
    {
      name: 'GPS Signal Antenna Flex Cable Compatible For iPad Pro 9.7" (Short Flex)',
      slug: 'gps-signal-antenna-flex-cable-ipad-pro-9-7-short-flex',
      sku: 'IPAD97-GPS-ANTENNA-SHORT',
      description: 'GPS signal antenna flex cable for iPad Pro 9.7". Short flex.',
      price: 0.58,
      discount_percentage: 0,
      stock_quantity: 68,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Home Button FPC Connector (On Motherboard) Compatible For iPad Pro 9.7 / iPad 7 (2019) / iPad 8 (2020) / iPad 9 (2021)',
      slug: 'home-button-fpc-connector-on-motherboard-ipad-pro-9-7-ipad-7-2019-ipad-8-2020-ipad-9-2021',
      sku: 'IPAD-HOME-BUTTON-FPC-CONNECTOR',
      description: 'Home button FPC connector (on motherboard) for iPad Pro 9.7" and various iPad models.',
      price: 0.58,
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
      name: 'Left & Right Antenna Flex Cable Compatible For iPad Pro 9.7" (4G Version) (2 Piece Set)',
      slug: 'left-right-antenna-flex-cable-ipad-pro-9-7-4g-version-2-piece-set',
      sku: 'IPAD97-LR-ANTENNA-4G',
      description: 'Left & right antenna flex cable for iPad Pro 9.7". 4G version. 2-piece set.',
      price: 1.69,
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
      name: 'WiFi Antenna Cable Compatible For iPad Pro 9.7" (Behind The Loudspeaker)',
      slug: 'wifi-antenna-cable-ipad-pro-9-7-behind-the-loudspeaker',
      sku: 'IPAD97-WIFI-ANTENNA',
      description: 'WiFi antenna cable for iPad Pro 9.7" (behind the loudspeaker).',
      price: 2.19,
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

    // Home Button Accessories
    {
      name: 'Home Button Clicker / Nipple (Behind Home Button) Compatible For iPad Models (10 Pack)',
      slug: 'home-button-clicker-nipple-behind-home-button-ipad-models-10-pack',
      sku: 'IPAD-HOME-BUTTON-CLICKER-10PK',
      description: 'Home button clicker / nipple (behind home button) for iPad models. 10-pack.',
      price: 1.08,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Home Button Gasket Compatible For iPad Mini 3 / Air 2 / Pro 9.7" (White) (10 Pack)',
      slug: 'home-button-gasket-ipad-mini-3-air-2-pro-9-7-white-10-pack',
      sku: 'IPAD-HOME-BUTTON-GASKET-WHT-10PK',
      description: 'Home button gasket for iPad Mini 3/Air 2/Pro 9.7". White color. 10-pack.',
      price: 1.80,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Home Button Gasket Compatible For iPad Mini 3 / Air 2 / Pro 9.7" (Black) (10 Pack)',
      slug: 'home-button-gasket-ipad-mini-3-air-2-pro-9-7-black-10-pack',
      sku: 'IPAD-HOME-BUTTON-GASKET-BLK-10PK',
      description: 'Home button gasket for iPad Mini 3/Air 2/Pro 9.7". Black color. 10-pack.',
      price: 1.80,
      discount_percentage: 0,
      stock_quantity: 23,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Home Button Holding Bracket Compatible For iPad Air 2 / iPad Pro 9.7" / iPad Pro 12.9" 1st Gen (2015)',
      slug: 'home-button-holding-bracket-ipad-air-2-ipad-pro-9-7-ipad-pro-12-9-1st-gen-2015',
      sku: 'IPAD-HOME-BUTTON-BRACKET',
      description: 'Home button holding bracket for iPad Air 2/Pro 9.7"/Pro 12.9" 1st Gen.',
      price: 0.58,
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
      name: 'Home Button Holding Bracket With Rubber Gasket Compatible For iPad Air 2 / iPad Pro 9.7" / iPad Pro 12.9" 1st Gen (2015)',
      slug: 'home-button-holding-bracket-with-rubber-gasket-ipad-air-2-ipad-pro-9-7-ipad-pro-12-9-1st-gen-2015',
      sku: 'IPAD-HOME-BUTTON-BRACKET-GASKET',
      description: 'Home button holding bracket with rubber gasket for iPad Air 2/Pro 9.7"/Pro 12.9" 1st Gen.',
      price: 0.76,
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

    // Hard Buttons
    {
      name: 'Hard Buttons Set (Power / Volume) Compatible For iPad Pro 9.7" (Silver)',
      slug: 'hard-buttons-set-power-volume-ipad-pro-9-7-silver',
      sku: 'IPAD97-HARD-BUTTONS-SILVER',
      description: 'Hard buttons set (Power / Volume) for iPad Pro 9.7". Silver color.',
      price: 0.25,
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
      name: 'Hard Buttons Set (Power / Volume) Compatible For iPad Pro 9.7" (Space Gray)',
      slug: 'hard-buttons-set-power-volume-ipad-pro-9-7-space-gray',
      sku: 'IPAD97-HARD-BUTTONS-GRAY',
      description: 'Hard buttons set (Power / Volume) for iPad Pro 9.7". Space Gray color.',
      price: 0.90,
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
      name: 'Hard Buttons Set (Power / Volume) Compatible For iPad Pro 9.7" (Rose Gold)',
      slug: 'hard-buttons-set-power-volume-ipad-pro-9-7-rose-gold',
      sku: 'IPAD97-HARD-BUTTONS-ROSE-GOLD',
      description: 'Hard buttons set (Power / Volume) for iPad Pro 9.7". Rose Gold color.',
      price: 1.24,
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
      name: 'Complete Screw Set Compatible For iPad Pro 9.7"',
      slug: 'complete-screw-set-ipad-pro-9-7',
      sku: 'IPAD97-SCREW-SET',
      description: 'Complete screw set for iPad Pro 9.7".',
      price: 1.02,
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
      name: 'Sim Card Reader With Flex Cable Compatible For iPad Pro 12.9" 1st Gen (2015) / iPad Pro 9.7"',
      slug: 'sim-card-reader-with-flex-cable-ipad-pro-12-9-1st-gen-2015-ipad-pro-9-7',
      sku: 'IPAD97-SIM-READER',
      description: 'SIM card reader with flex cable for iPad Pro 12.9" 1st Gen / 9.7".',
      price: 0.25,
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
      name: 'Sim Card Tray Compatible For iPad Pro 9.7" / Mini 4 / Pro 10.5 (Gold)',
      slug: 'sim-card-tray-ipad-pro-9-7-mini-4-pro-10-5-gold',
      sku: 'IPAD97-SIM-TRAY-GOLD',
      description: 'SIM card tray for iPad Pro 9.7" / Mini 4 / Pro 10.5. Gold color.',
      price: 0.51,
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
      name: 'Sim Card Tray Compatible For iPad Pro 9.7" / Mini 4 / Mini 5 / Pro 10.5 / Air 3 (Silver)',
      slug: 'sim-card-tray-ipad-pro-9-7-mini-4-mini-5-pro-10-5-air-3-silver',
      sku: 'IPAD97-SIM-TRAY-SILVER',
      description: 'SIM card tray for iPad Pro 9.7" / Mini 4 / Mini 5 / Pro 10.5 / Air 3. Silver color.',
      price: 0.54,
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
    {
      name: 'Sim Card Tray Compatible For iPad Pro 9.7" / Mini 4 (Space Gray)',
      slug: 'sim-card-tray-ipad-pro-9-7-mini-4-space-gray',
      sku: 'IPAD97-SIM-TRAY-GRAY',
      description: 'SIM card tray for iPad Pro 9.7" / Mini 4. Space Gray color.',
      price: 0.90,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Apple'
    },
    {
      name: 'Sim Card Tray Compatible For iPad Pro 9.7" / Pro 10.5 (Rose Gold)',
      slug: 'sim-card-tray-ipad-pro-9-7-pro-10-5-rose-gold',
      sku: 'IPAD97-SIM-TRAY-ROSE-GOLD',
      description: 'SIM card tray for iPad Pro 9.7" / Pro 10.5. Rose Gold color.',
      price: 0.90,
      discount_percentage: 0,
      stock_quantity: 48,
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
      name: 'LCD Adhesive Tape Compatible For iPad Pro 9.7" (Tesa Tape)',
      slug: 'lcd-adhesive-tape-ipad-pro-9-7-tesa-tape',
      sku: 'IPAD97-LCD-TAPE-TESA',
      description: 'LCD adhesive tape for iPad Pro 9.7". Tesa brand.',
      price: 0.29,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '6 x 4 x 0.05 inch',
      category_id: 8,
      brand: 'Tesa'
    },
    {
      name: 'LCD Adhesive Tape Compatible For iPad Pro 9.7" (10 Pack)(Tesa Tape)',
      slug: 'lcd-adhesive-tape-ipad-pro-9-7-10-pack-tesa-tape',
      sku: 'IPAD97-LCD-TAPE-TESA-10PK',
      description: 'LCD adhesive tape for iPad Pro 9.7". Tesa brand. 10-pack.',
      price: 5.79,
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

    // Backlight Components
    {
      name: 'Backlight Only Compatible For iPad Pro 9.7" (4 Pack)',
      slug: 'backlight-only-ipad-pro-9-7-4-pack',
      sku: 'IPAD97-BACKLIGHT-4PK',
      description: 'Backlight only for iPad Pro 9.7". 4-pack.',
      price: 27.56,
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
      name: 'Backlight Only Compatible For iPad Pro 9.7" (5 Pack)',
      slug: 'backlight-only-ipad-pro-9-7-5-pack',
      sku: 'IPAD97-BACKLIGHT-5PK',
      description: 'Backlight only for iPad Pro 9.7". 5-pack.',
      price: 15.70,
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

    // Polarizer Film
    {
      name: 'Polarizer Film Compatible For iPad Pro 9.7" (Premium) (10 Pack)',
      slug: 'polarizer-film-ipad-pro-9-7-premium-10-pack',
      sku: 'IPAD97-POLARIZER-FILM-10PK',
      description: 'Polarizer film for iPad Pro 9.7". Premium quality. 10-pack.',
      price: 7.57,
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

    // OCA Film
    {
      name: 'OCA Film Lamination Compatible For iPad Air 2 / iPad Pro 9.7" (175um) (10 Pack)',
      slug: 'oca-film-lamination-ipad-air-2-ipad-pro-9-7-175um-10-pack',
      sku: 'IPAD97-OCA-FILM-10PK',
      description: 'OCA film lamination for iPad Air 2 / iPad Pro 9.7". 175um. 10-pack.',
      price: 15.89,
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
      name: 'Casper Pro Tempered Glass Compatible For iPad Air 1 / Air 2 / iPad Pro 9.7 / iPad 5 (2017) / iPad 6 (2018) (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-ipad-air-1-air-2-ipad-pro-9-7-ipad-5-2017-ipad-6-2018-retail-pack-clear',
      sku: 'CASPER-TG-IPAD97-AIR-RP-CLEAR',
      description: 'Casper Pro tempered glass screen protector for iPad Air 1/2 / Pro 9.7 / iPad 5/6. Retail pack with clear finish.',
      price: 29.99,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '9 x 7 x 0.1 inch',
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
  console.log('🚀 Starting iPad Pro 9.7" Products Data Insertion...');

  try {
    await insertProducts();

    console.log('✅ iPad Pro 9.7" products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains comprehensive iPad Pro 9.7" repair parts.');
    console.log('🎉 You can now view and manage these products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
