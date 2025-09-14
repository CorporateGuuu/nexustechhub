#!/usr/bin/env node

/**
 * Insert Samsung Galaxy S25 Edge Products Data into Supabase
 * This script inserts comprehensive Samsung Galaxy S25 Edge repair parts and accessories
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
  console.log('📱 Inserting Samsung Galaxy S25 Edge products...');

  const products = [
    // OLED Assemblies - Refurbished
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S25 Edge (Refurbished) (Titanium Jetblack)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s25-edge-refurbished-titanium-jetblack',
      sku: 'SS25E-OLED-FRAME-REF-JETBLACK',
      description: 'Refurbished OLED assembly with frame for Samsung Galaxy S25 Edge in Titanium Jet Black. Tested and guaranteed to work.',
      price: 274.29,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.09,
      dimensions: '6.4 x 3.0 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },
    {
      name: 'OLED Assembly With Frame Compatible For Samsung Galaxy S25 Edge (Refurbished) (Titanium Silver)',
      slug: 'oled-assembly-with-frame-samsung-galaxy-s25-edge-refurbished-titanium-silver',
      sku: 'SS25E-OLED-FRAME-REF-SILVER',
      description: 'Refurbished OLED assembly with frame for Samsung Galaxy S25 Edge in Titanium Silver. Tested and guaranteed to work.',
      price: 274.29,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
      weight: 0.09,
      dimensions: '6.4 x 3.0 x 0.3 inch',
      category_id: 1,
      brand: 'Samsung'
    },

    // Charging Components
    {
      name: 'Charging Port Flex Cable Compatible For Samsung Galaxy S25 Edge',
      slug: 'charging-port-flex-cable-samsung-galaxy-s25-edge',
      sku: 'SS25E-CHARGING-PORT-FLEX',
      description: 'Charging port flex cable for Samsung Galaxy S25 Edge. Essential component for charging and data transfer.',
      price: 5.89,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.05 inch',
      category_id: 4,
      brand: 'Samsung'
    },

    // Cameras
    {
      name: 'Back Camera (Ultra Wide) Compatible For Samsung Galaxy S25 Edge (S937) (Premium)',
      slug: 'back-camera-ultra-wide-samsung-galaxy-s25-edge-s937-premium',
      sku: 'SS25E-BACK-CAM-UW-S937-PREM',
      description: 'Premium quality back camera (Ultra Wide) for Samsung Galaxy S25 Edge (S937).',
      price: 6.97,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.015,
      dimensions: '1 x 1 x 0.4 inch',
      category_id: 5,
      brand: 'Samsung'
    },
    {
      name: 'Front Camera Compatible For Samsung Galaxy S25 Edge (S937) (Premium)',
      slug: 'front-camera-samsung-galaxy-s25-edge-s937-premium',
      sku: 'SS25E-FRONT-CAM-S937-PREM',
      description: 'Premium quality front camera for Samsung Galaxy S25 Edge (S937).',
      price: 11.75,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '0.5 x 0.5 x 0.3 inch',
      category_id: 5,
      brand: 'Samsung'
    },

    // Audio Components
    {
      name: 'Loud Speaker Compatible For Samsung Galaxy S25 Edge (S937)',
      slug: 'loud-speaker-samsung-galaxy-s25-edge-s937',
      sku: 'SS25E-LOUDSPEAKER-S937',
      description: 'Main loudspeaker for Samsung Galaxy S25 Edge (S937).',
      price: 3.45,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.3 inch',
      category_id: 6,
      brand: 'Samsung'
    },
    {
      name: 'Earpiece Speaker Compatible For Samsung Galaxy S25 Edge (S937)',
      slug: 'earpiece-speaker-samsung-galaxy-s25-edge-s937',
      sku: 'SS25E-EARPIECE-S937',
      description: 'Earpiece speaker for Samsung Galaxy S25 Edge (S937).',
      price: 2.69,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '1 x 0.5 x 0.2 inch',
      category_id: 6,
      brand: 'Samsung'
    },

    // Camera Lenses and Bezels
    {
      name: 'Back Camera Lens (Glass Only) With Adhesive Compatible For Samsung Galaxy S25 Edge (S937) (2 Piece Set) (All Colors)',
      slug: 'back-camera-lens-glass-only-adhesive-samsung-galaxy-s25-edge-s937-2-piece-all-colors',
      sku: 'SS25E-CAM-LENS-GLASS-2PC-ALL',
      description: 'Back camera lens (glass only) with adhesive for Samsung Galaxy S25 Edge (S937). 2 piece set compatible with all colors.',
      price: 1.04,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 1 x 0.1 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Back Camera Lens With Cover Bezel Ring Compatible For Samsung Galaxy S25 Edge (S937) (Titanium Silver)',
      slug: 'back-camera-lens-cover-bezel-ring-samsung-galaxy-s25-edge-s937-titanium-silver',
      sku: 'SS25E-CAM-LENS-BEZEL-SILVER',
      description: 'Back camera lens with cover bezel ring for Samsung Galaxy S25 Edge (S937) in Titanium Silver.',
      price: 1.59,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 1 x 0.2 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Back Camera Lens With Cover Bezel Ring Compatible For Samsung Galaxy S25 Edge (S937) (Titanium Icyblue)',
      slug: 'back-camera-lens-cover-bezel-ring-samsung-galaxy-s25-edge-s937-titanium-icyblue',
      sku: 'SS25E-CAM-LENS-BEZEL-BLUE',
      description: 'Back camera lens with cover bezel ring for Samsung Galaxy S25 Edge (S937) in Titanium Icy Blue.',
      price: 1.59,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 1 x 0.2 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Back Camera Lens With Cover Bezel Ring Compatible For Samsung Galaxy S25 Edge (S937) (Titanium Jetblack)',
      slug: 'back-camera-lens-cover-bezel-ring-samsung-galaxy-s25-edge-s937-titanium-jetblack',
      sku: 'SS25E-CAM-LENS-BEZEL-JETBLACK',
      description: 'Back camera lens with cover bezel ring for Samsung Galaxy S25 Edge (S937) in Titanium Jet Black.',
      price: 2.39,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 1 x 0.2 inch',
      category_id: 2,
      brand: 'Samsung'
    },

    // Back Cover Glass
    {
      name: 'Back Cover Glass With Camera Lens Compatible For Samsung Galaxy S25 Edge (No Logo) (Aftermarket Plus) (Titanium Jetblack)',
      slug: 'back-cover-glass-camera-lens-samsung-galaxy-s25-edge-no-logo-aftermarket-plus-titanium-jetblack',
      sku: 'SS25E-BACK-COVER-GLASS-JETBLACK',
      description: 'Back cover glass with camera lens (no logo) for Samsung Galaxy S25 Edge. Aftermarket Plus quality in Titanium Jet Black.',
      price: 14.18,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6.4 x 3.0 x 0.1 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Back Cover Glass With Camera Lens Compatible For Samsung Galaxy S25 Edge (No Logo) (Aftermarket Plus) (Titanium Silver)',
      slug: 'back-cover-glass-camera-lens-samsung-galaxy-s25-edge-no-logo-aftermarket-plus-titanium-silver',
      sku: 'SS25E-BACK-COVER-GLASS-SILVER',
      description: 'Back cover glass with camera lens (no logo) for Samsung Galaxy S25 Edge. Aftermarket Plus quality in Titanium Silver.',
      price: 14.18,
      discount_percentage: 0,
      stock_quantity: 28,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6.4 x 3.0 x 0.1 inch',
      category_id: 2,
      brand: 'Samsung'
    },

    // Antennas and Cables
    {
      name: 'Antenna Connecting Cable Compatible For Samsung Galaxy S25 Edge (S937) (Premium)',
      slug: 'antenna-connecting-cable-samsung-galaxy-s25-edge-s937-premium',
      sku: 'SS25E-ANTENNA-CABLE-S937-PREM',
      description: 'Premium antenna connecting cable for Samsung Galaxy S25 Edge (S937).',
      price: 1.90,
      discount_percentage: 0,
      stock_quantity: 65,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '3 x 0.5 x 0.05 inch',
      category_id: 4,
      brand: 'Samsung'
    },

    // PCB Boards
    {
      name: 'PCB Board With Sim Card Reader Compatible For Samsung Galaxy S25 Edge (S937B) (Premium)',
      slug: 'pcb-board-sim-card-reader-samsung-galaxy-s25-edge-s937b-premium',
      sku: 'SS25E-PCB-SIM-S937B-PREM',
      description: 'Premium PCB board with SIM card reader for Samsung Galaxy S25 Edge (S937B).',
      price: 7.09,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Samsung'
    },
    {
      name: 'PCB Board With Sim Card Reader Compatible For Samsung Galaxy S25 Edge (S937U) (Premium)',
      slug: 'pcb-board-sim-card-reader-samsung-galaxy-s25-edge-s937u-premium',
      sku: 'SS25E-PCB-SIM-S937U-PREM',
      description: 'Premium PCB board with SIM card reader for Samsung Galaxy S25 Edge (S937U).',
      price: 7.09,
      discount_percentage: 0,
      stock_quantity: 38,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Samsung'
    },

    // Wireless Charging Components
    {
      name: 'Wireless Charging Flex Holding Metal Bracket Compatible For Samsung Galaxy S25 Edge (S937)',
      slug: 'wireless-charging-flex-holding-metal-bracket-samsung-galaxy-s25-edge-s937',
      sku: 'SS25E-WIRELESS-BRACKET-S937',
      description: 'Wireless charging flex holding metal bracket for Samsung Galaxy S25 Edge (S937).',
      price: 1.90,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '2 x 1 x 0.1 inch',
      category_id: 4,
      brand: 'Samsung'
    },

    // Buttons
    {
      name: 'Hard Buttons (Power / Volume) Compatible For Samsung Galaxy S25 Edge (S937) (Premium)(Titanium Jetblack)',
      slug: 'hard-buttons-power-volume-samsung-galaxy-s25-edge-s937-premium-titanium-jetblack',
      sku: 'SS25E-HARD-BUTTONS-JETBLACK',
      description: 'Premium hard buttons (Power / Volume) for Samsung Galaxy S25 Edge (S937) in Titanium Jet Black.',
      price: 0.92,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '2 x 1 x 0.2 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Hard Buttons (Power / Volume) Compatible For Samsung Galaxy S25 Edge (S937) (Premium) (Titanium Silver)',
      slug: 'hard-buttons-power-volume-samsung-galaxy-s25-edge-s937-premium-titanium-silver',
      sku: 'SS25E-HARD-BUTTONS-SILVER',
      description: 'Premium hard buttons (Power / Volume) for Samsung Galaxy S25 Edge (S937) in Titanium Silver.',
      price: 0.92,
      discount_percentage: 0,
      stock_quantity: 48,
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
      name: 'Dual Sim Card Tray Compatible For Samsung Galaxy S25 Edge (S937) (Premium) (Titanium Silver)',
      slug: 'dual-sim-card-tray-samsung-galaxy-s25-edge-s937-premium-titanium-silver',
      sku: 'SS25E-DUAL-SIM-TRAY-SILVER',
      description: 'Premium dual SIM card tray for Samsung Galaxy S25 Edge (S937) in Titanium Silver.',
      price: 0.96,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Dual Sim Card Tray Compatible For Samsung Galaxy S25 Edge (S937) (Premium)(Titanium Jetblack)',
      slug: 'dual-sim-card-tray-samsung-galaxy-s25-edge-s937-premium-titanium-jetblack',
      sku: 'SS25E-DUAL-SIM-TRAY-JETBLACK',
      description: 'Premium dual SIM card tray for Samsung Galaxy S25 Edge (S937) in Titanium Jet Black.',
      price: 0.96,
      discount_percentage: 0,
      stock_quantity: 58,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Single Sim Card Tray Compatible For Samsung Galaxy S25 Edge (S937) (Premium) (Titanium Jetblack)',
      slug: 'single-sim-card-tray-samsung-galaxy-s25-edge-s937-premium-titanium-jetblack',
      sku: 'SS25E-SINGLE-SIM-TRAY-JETBLACK',
      description: 'Premium single SIM card tray for Samsung Galaxy S25 Edge (S937) in Titanium Jet Black.',
      price: 1.02,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },
    {
      name: 'Single Sim Card Tray Compatible For Samsung Galaxy S25 Edge (S937) (Premium) (Titanium Silver)',
      slug: 'single-sim-card-tray-samsung-galaxy-s25-edge-s937-premium-titanium-silver',
      sku: 'SS25E-SINGLE-SIM-TRAY-SILVER',
      description: 'Premium single SIM card tray for Samsung Galaxy S25 Edge (S937) in Titanium Silver.',
      price: 1.02,
      discount_percentage: 0,
      stock_quantity: 53,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.1 inch',
      category_id: 7,
      brand: 'Samsung'
    },

    // Adhesive Tapes
    {
      name: 'Battery Adhesive Tape Compatible For Samsung Galaxy S25 Edge (S937)',
      slug: 'battery-adhesive-tape-samsung-galaxy-s25-edge-s937',
      sku: 'SS25E-BATTERY-TAPE-S937',
      description: 'Battery adhesive tape for Samsung Galaxy S25 Edge (S937).',
      price: 0.89,
      discount_percentage: 0,
      stock_quantity: 120,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '5 x 2 x 0.05 inch',
      category_id: 8,
      brand: 'Samsung'
    },
    {
      name: 'Back Cover Adhesive Tape Compatible For Samsung Galaxy S25 Edge (S937)',
      slug: 'back-cover-adhesive-tape-samsung-galaxy-s25-edge-s937',
      sku: 'SS25E-BACK-COVER-TAPE-S937',
      description: 'Back cover adhesive tape for Samsung Galaxy S25 Edge (S937).',
      price: 1.07,
      discount_percentage: 0,
      stock_quantity: 110,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '6 x 3 x 0.05 inch',
      category_id: 8,
      brand: 'Samsung'
    },

    // IC Chips and Electronic Components
    {
      name: 'Antenna FPC / NFC FPC Connector Compatible For Samsung Galaxy S21 5G / S21 Plus 5G / S21 Ultra 5G / S22 Ultra 5G (12 Pins)',
      slug: 'antenna-fpc-nfc-fpc-connector-samsung-galaxy-s21-s22-series-12-pins',
      sku: 'SS21-S22-ANTENNA-NFC-CONNECTOR-12P',
      description: 'Antenna FPC / NFC FPC connector compatible with Samsung Galaxy S21/S22 series (12 pins).',
      price: 0.95,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.5 x 0.3 x 0.1 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Camera Power IC Compatible For Samsung Galaxy S8 Plus / S9 / S9 Plus / S10E / S10 Plus 5G / S20 Ultra / S22 / S22 Ultra / Note 9 / Note 10 Plus 5G / Note 20 5G / S23 Plus / S23 Ultra (MPB02)',
      slug: 'camera-power-ic-samsung-galaxy-s8-to-s23-series-mpb02',
      sku: 'SS8-S23-CAMERA-POWER-IC-MPB02',
      description: 'Camera power IC compatible with Samsung Galaxy S8 to S23 series (MPB02).',
      price: 1.14,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Ringtone Audio Compatible For Samsung Galaxy S23 Series / S24 Series / S25 Series (CS35L42)',
      slug: 'ringtone-audio-samsung-galaxy-s23-s24-s25-series-cs35l42',
      sku: 'SS23-S25-RINGTONE-AUDIO-CS35L42',
      description: 'Ringtone audio IC compatible with Samsung Galaxy S23/S24/S25 series (CS35L42).',
      price: 1.16,
      discount_percentage: 0,
      stock_quantity: 65,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Power Amplifier IC Compatible For Samsung Galaxy S25 Series (Qpm7815A)',
      slug: 'power-amplifier-ic-samsung-galaxy-s25-series-qpm7815a',
      sku: 'SS25-POWER-AMP-IC-QPM7815A',
      description: 'Power amplifier IC for Samsung Galaxy S25 series (Qpm7815A).',
      price: 1.44,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'UHF Amplifier Power Compatible For Samsung Galaxy S24 Series / S25 Series (R20DA2AA)',
      slug: 'uhf-amplifier-power-samsung-galaxy-s24-s25-series-r20da2aa',
      sku: 'SS24-S25-UHF-AMP-R20DA2AA',
      description: 'UHF amplifier power IC for Samsung Galaxy S24/S25 series (R20DA2AA).',
      price: 1.44,
      discount_percentage: 0,
      stock_quantity: 58,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Intermediate Radio Frequency Compatible For Samsung Galaxy S24 Series / S25 Series (Sdr875004)',
      slug: 'intermediate-radio-frequency-samsung-galaxy-s24-s25-series-sdr875004',
      sku: 'SS24-S25-IRF-SDR875004',
      description: 'Intermediate radio frequency IC for Samsung Galaxy S24/S25 series (Sdr875004).',
      price: 1.99,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Audio IC Compatible For Samsung Galaxy S25 Series (SA257X)',
      slug: 'audio-ic-samsung-galaxy-s25-series-sa257x',
      sku: 'SS25-AUDIO-IC-SA257X',
      description: 'Audio IC for Samsung Galaxy S25 series (SA257X).',
      price: 1.99,
      discount_percentage: 0,
      stock_quantity: 53,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Display IC Compatible For Samsung Galaxy S24 Series / S25 Series (S2D0S07P)',
      slug: 'display-ic-samsung-galaxy-s24-s25-series-s2d0s07p',
      sku: 'SS24-S25-DISPLAY-IC-S2D0S07P',
      description: 'Display IC for Samsung Galaxy S24/S25 series (S2D0S07P).',
      price: 2.28,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'WiFi IC Compatible For Samsung Galaxy S23 Ultra / S24 Series / S25 Series (WCN7851-101)',
      slug: 'wifi-ic-samsung-galaxy-s23-s24-s25-series-wcn7851-101',
      sku: 'SS23-S25-WIFI-IC-WCN7851-101',
      description: 'WiFi IC for Samsung Galaxy S23/S24/S25 series (WCN7851-101).',
      price: 2.36,
      discount_percentage: 0,
      stock_quantity: 48,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Touch ID Driver IC Compatible For Samsung Galaxy S23 Series / S24 Series / S25 Series (CS40L26)',
      slug: 'touch-id-driver-ic-samsung-galaxy-s23-s24-s25-series-cs40l26',
      sku: 'SS23-S25-TOUCH-ID-IC-CS40L26',
      description: 'Touch ID driver IC for Samsung Galaxy S23/S24/S25 series (CS40L26).',
      price: 2.62,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Wireless Charging IC Compatible For Samsung Galaxy S23 Ultra / S24 Series / S25 Series (CPS4038)',
      slug: 'wireless-charging-ic-samsung-galaxy-s23-s24-s25-series-cps4038',
      sku: 'SS23-S25-WIRELESS-CHARGING-IC-CPS4038',
      description: 'Wireless charging IC for Samsung Galaxy S23/S24/S25 series (CPS4038).',
      price: 2.62,
      discount_percentage: 0,
      stock_quantity: 43,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Power Management IC Chip Compatible For Samsung Galaxy S25 Series (Max77775P)',
      slug: 'power-management-ic-chip-samsung-galaxy-s25-series-max77775p',
      sku: 'SS25-PM-IC-MAX77775P',
      description: 'Power management IC chip for Samsung Galaxy S25 series (Max77775P).',
      price: 2.64,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Charging Fast Charging IC Compatible For Samsung Galaxy S25 Series (Nu2111A)',
      slug: 'charging-fast-charging-ic-samsung-galaxy-s25-series-nu2111a',
      sku: 'SS25-FAST-CHARGING-IC-NU2111A',
      description: 'Fast charging IC for Samsung Galaxy S25 series (Nu2111A).',
      price: 2.65,
      discount_percentage: 0,
      stock_quantity: 38,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Power Supply Compatible For Samsung Galaxy S25 Edge (4C3)',
      slug: 'power-supply-samsung-galaxy-s25-edge-4c3',
      sku: 'SS25E-POWER-SUPPLY-4C3',
      description: 'Power supply component for Samsung Galaxy S25 Edge (4C3).',
      price: 3.60,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '1 x 0.5 x 0.2 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Power Management IC Compatible For Samsung Galaxy S23 Plus (PM8550VE-001)',
      slug: 'power-management-ic-samsung-galaxy-s23-plus-pm8550ve-001',
      sku: 'SS23P-PM-IC-PM8550VE-001',
      description: 'Power management IC for Samsung Galaxy S23 Plus (PM8550VE-001).',
      price: 4.80,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },
    {
      name: 'Power Management IC Compatible For Samsung Galaxy S23 Plus (PM8550VS-001)',
      slug: 'power-management-ic-samsung-galaxy-s23-plus-pm8550vs-001',
      sku: 'SS23P-PM-IC-PM8550VS-001',
      description: 'Power management IC for Samsung Galaxy S23 Plus (PM8550VS-001).',
      price: 4.82,
      discount_percentage: 0,
      stock_quantity: 28,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.001,
      dimensions: '0.2 x 0.2 x 0.05 inch',
      category_id: 9,
      brand: 'Samsung'
    },

    // Casper Tempered Glass
    {
      name: 'Casper Pro Tempered Glass Compatible For Samsung Galaxy S25 Edge (Retail Pack) (Privacy)',
      slug: 'casper-pro-tempered-glass-samsung-galaxy-s25-edge-retail-pack-privacy',
      sku: 'CASPER-TG-SS25E-RP-PRIVACY',
      description: 'Casper Pro tempered glass screen protector for Samsung Galaxy S25 Edge. Retail pack with privacy filter.',
      price: 24.99,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6.4 x 3.0 x 0.1 inch',
      category_id: 2,
      brand: 'Casper'
    },
    {
      name: 'Casper Pro Tempered Glass Compatible For Samsung Galaxy S25 Edge (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-samsung-galaxy-s25-edge-retail-pack-clear',
      sku: 'CASPER-TG-SS25E-RP-CLEAR',
      description: 'Casper Pro tempered glass screen protector for Samsung Galaxy S25 Edge. Retail pack with clear finish.',
      price: 22.99,
      discount_percentage: 0,
      stock_quantity: 85,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6.4 x 3.0 x 0.1 inch',
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
  console.log('🚀 Starting Samsung Galaxy S25 Edge Products Data Insertion...');

  try {
    await insertProducts();

    console.log('✅ Samsung Galaxy S25 Edge products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains comprehensive Samsung Galaxy S25 Edge repair parts.');
    console.log('🎉 You can now view and manage these products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
