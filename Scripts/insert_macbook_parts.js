#!/usr/bin/env node

/**
 * Insert MacBook Parts Script for Nexus TechHub
 * Inserts 50 MacBook parts products into the Supabase database
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

async function insertMacBookParts() {
  console.log('📦 Inserting 50 MacBook parts products...');

  // Get MacBook Parts category ID
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'macbook-parts')
    .single();

  if (categoryError || !category) {
    console.error('❌ MacBook Parts category not found. Please run setup_supabase_database.js first.');
    process.exit(1);
  }

  const categoryId = category.id;

  // MacBook Parts Products Data
  const macBookProducts = [
    {
      name: 'MacBook Pro 16" Retina Display (2019-2021)',
      slug: 'macbook-pro-16-retina-display-2019-2021',
      sku: 'MBP16-DISP-2019',
      description: '16-inch Retina display replacement for MacBook Pro 2019-2021 models with True Tone technology',
      price: 599.99,
      discount_percentage: 5,
      stock_quantity: 15,
      is_featured: true,
      is_new: false,
      image_url: '/images/macbook-pro-16-display.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro 14" Liquid Retina XDR Display (2021+)',
      slug: 'macbook-pro-14-liquid-retina-xdr-display-2021',
      sku: 'MBP14-DISP-2021',
      description: '14-inch Liquid Retina XDR display for MacBook Pro 2021+ with ProMotion technology',
      price: 699.99,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: true,
      is_new: true,
      image_url: '/images/macbook-pro-14-display.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air 13" Retina Display (2018-2020)',
      slug: 'macbook-air-13-retina-display-2018-2020',
      sku: 'MBA13-DISP-2018',
      description: '13-inch Retina display replacement for MacBook Air 2018-2020 models',
      price: 349.99,
      discount_percentage: 10,
      stock_quantity: 25,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-13-display.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro 13" Retina Display (2016-2020)',
      slug: 'macbook-pro-13-retina-display-2016-2020',
      sku: 'MBP13-DISP-2016',
      description: '13-inch Retina display for MacBook Pro 2016-2020 with Touch Bar compatibility',
      price: 299.99,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-13-display.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro 16" Battery (2019-2021)',
      slug: 'macbook-pro-16-battery-2019-2021',
      sku: 'MBP16-BATT-2019',
      description: 'High-capacity lithium-polymer battery for MacBook Pro 16" 2019-2021 models',
      price: 149.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: true,
      is_new: false,
      image_url: '/images/macbook-pro-16-battery.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro 14" Battery (2021+)',
      slug: 'macbook-pro-14-battery-2021',
      sku: 'MBP14-BATT-2021',
      description: 'Apple original battery for MacBook Pro 14" 2021+ with M1 Pro/Max chips',
      price: 129.99,
      discount_percentage: 5,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: '/images/macbook-pro-14-battery.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air M2 Battery (2022+)',
      slug: 'macbook-air-m2-battery-2022',
      sku: 'MBA-M2-BATT-2022',
      description: 'Lithium-polymer battery replacement for MacBook Air with M2 chip',
      price: 99.99,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: true,
      is_new: true,
      image_url: '/images/macbook-air-m2-battery.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Keyboard Assembly (2016-2019)',
      slug: 'macbook-pro-keyboard-assembly-2016-2019',
      sku: 'MBP-KBD-2016',
      description: 'Complete keyboard assembly with butterfly mechanism for MacBook Pro 2016-2019',
      price: 199.99,
      discount_percentage: 15,
      stock_quantity: 20,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-keyboard.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Magic Keyboard (2021+)',
      slug: 'macbook-pro-magic-keyboard-2021',
      sku: 'MBP-MGKBD-2021',
      description: 'Magic Keyboard with scissor mechanism for MacBook Pro 2021+ models',
      price: 149.99,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: true,
      is_new: true,
      image_url: '/images/macbook-pro-magic-keyboard.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air Keyboard Assembly (2018-2020)',
      slug: 'macbook-air-keyboard-assembly-2018-2020',
      sku: 'MBA-KBD-2018',
      description: 'Butterfly keyboard assembly for MacBook Air 2018-2020 models',
      price: 129.99,
      discount_percentage: 10,
      stock_quantity: 28,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-keyboard.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Trackpad (2016-2020)',
      slug: 'macbook-pro-trackpad-2016-2020',
      sku: 'MBP-TRACK-2016',
      description: 'Force Touch trackpad replacement for MacBook Pro 2016-2020 models',
      price: 89.99,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-trackpad.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Trackpad (2021+)',
      slug: 'macbook-pro-trackpad-2021',
      sku: 'MBP-TRACK-2021',
      description: 'Haptic Touch trackpad for MacBook Pro 2021+ with M1/M2 chips',
      price: 119.99,
      discount_percentage: 5,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: '/images/macbook-pro-trackpad-new.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air Trackpad (2018-2020)',
      slug: 'macbook-air-trackpad-2018-2020',
      sku: 'MBA-TRACK-2018',
      description: 'Force Touch trackpad for MacBook Air 2018-2020 models',
      price: 79.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-trackpad.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Logic Board (Intel 13" 2016-2019)',
      slug: 'macbook-pro-logic-board-intel-13-2016-2019',
      sku: 'MBP-LB-INTEL13',
      description: 'Main logic board replacement for 13" MacBook Pro Intel models 2016-2019',
      price: 399.99,
      discount_percentage: 10,
      stock_quantity: 8,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-logic-board.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro M1 Logic Board (13" 2020)',
      slug: 'macbook-pro-m1-logic-board-13-2020',
      sku: 'MBP-LB-M1-13',
      description: 'Apple M1 chip logic board for 13" MacBook Pro 2020 model',
      price: 499.99,
      discount_percentage: 0,
      stock_quantity: 6,
      is_featured: true,
      is_new: false,
      image_url: '/images/macbook-pro-m1-logic-board.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air M2 Logic Board (2022+)',
      slug: 'macbook-air-m2-logic-board-2022',
      sku: 'MBA-LB-M2-2022',
      description: 'Apple M2 chip logic board for MacBook Air 2022+ models',
      price: 599.99,
      discount_percentage: 5,
      stock_quantity: 5,
      is_featured: true,
      is_new: true,
      image_url: '/images/macbook-air-m2-logic-board.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Cooling Fan (13" 2016-2020)',
      slug: 'macbook-pro-cooling-fan-13-2016-2020',
      sku: 'MBP-FAN-13',
      description: 'Cooling fan assembly for 13" MacBook Pro models 2016-2020',
      price: 49.99,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-fan.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Cooling Fan (16" 2019-2021)',
      slug: 'macbook-pro-cooling-fan-16-2019-2021',
      sku: 'MBP-FAN-16',
      description: 'Dual cooling fan system for 16" MacBook Pro 2019-2021 models',
      price: 89.99,
      discount_percentage: 10,
      stock_quantity: 25,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-16-fan.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Heat Sink (14" 2021+)',
      slug: 'macbook-pro-heat-sink-14-2021',
      sku: 'MBP-HS-14',
      description: 'Heat sink assembly for MacBook Pro 14" 2021+ with M1 Pro/Max',
      price: 79.99,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: true,
      image_url: '/images/macbook-pro-heat-sink.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro SSD 512GB (2016-2020)',
      slug: 'macbook-pro-ssd-512gb-2016-2020',
      sku: 'MBP-SSD-512',
      description: '512GB SSD storage upgrade for MacBook Pro 2016-2020 models',
      price: 149.99,
      discount_percentage: 15,
      stock_quantity: 18,
      is_featured: true,
      is_new: false,
      image_url: '/images/macbook-pro-ssd.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro SSD 1TB (2021+)',
      slug: 'macbook-pro-ssd-1tb-2021',
      sku: 'MBP-SSD-1TB',
      description: '1TB SSD storage module for MacBook Pro 2021+ with M1/M2 chips',
      price: 299.99,
      discount_percentage: 5,
      stock_quantity: 12,
      is_featured: true,
      is_new: true,
      image_url: '/images/macbook-pro-ssd-new.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air SSD 256GB (2018-2020)',
      slug: 'macbook-air-ssd-256gb-2018-2020',
      sku: 'MBA-SSD-256',
      description: '256GB SSD replacement for MacBook Air 2018-2020 models',
      price: 99.99,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-ssd.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro RAM 16GB (2016-2020)',
      slug: 'macbook-pro-ram-16gb-2016-2020',
      sku: 'MBP-RAM-16GB',
      description: '16GB DDR4 RAM upgrade kit for MacBook Pro Intel models 2016-2020',
      price: 89.99,
      discount_percentage: 10,
      stock_quantity: 22,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-ram.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro RAM 32GB (2021+)',
      slug: 'macbook-pro-ram-32gb-2021',
      sku: 'MBP-RAM-32GB',
      description: '32GB unified memory for MacBook Pro 2021+ with Apple Silicon',
      price: 199.99,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: true,
      image_url: '/images/macbook-pro-ram-new.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro USB-C Port (2016-2020)',
      slug: 'macbook-pro-usb-c-port-2016-2020',
      sku: 'MBP-USBC-2016',
      description: 'USB-C port assembly replacement for MacBook Pro 2016-2020 models',
      price: 39.99,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-usb-c.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro MagSafe Charging Port (2016-2019)',
      slug: 'macbook-pro-magsafe-charging-port-2016-2019',
      sku: 'MBP-MAGSAFE-2016',
      description: 'MagSafe charging port for MacBook Pro 2016-2019 models',
      price: 49.99,
      discount_percentage: 5,
      stock_quantity: 50,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-magsafe.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Speaker Assembly (13" 2016-2020)',
      slug: 'macbook-pro-speaker-assembly-13-2016-2020',
      sku: 'MBP-SPK-13',
      description: 'Dual speaker assembly for 13" MacBook Pro models 2016-2020',
      price: 69.99,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-speaker.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Speaker Assembly (16" 2019-2021)',
      slug: 'macbook-pro-speaker-assembly-16-2019-2021',
      sku: 'MBP-SPK-16',
      description: 'Six-speaker sound system for 16" MacBook Pro 2019-2021 models',
      price: 99.99,
      discount_percentage: 10,
      stock_quantity: 20,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-16-speaker.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air Speaker Assembly (2018-2020)',
      slug: 'macbook-air-speaker-assembly-2018-2020',
      sku: 'MBA-SPK-2018',
      description: 'Speaker assembly for MacBook Air 2018-2020 models',
      price: 59.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-speaker.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Microphone Assembly (2016-2020)',
      slug: 'macbook-pro-microphone-assembly-2016-2020',
      sku: 'MBP-MIC-2016',
      description: 'Three-microphone array for MacBook Pro 2016-2020 models',
      price: 29.99,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-microphone.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Camera Assembly (2016-2020)',
      slug: 'macbook-pro-camera-assembly-2016-2020',
      sku: 'MBP-CAM-2016',
      description: '720p FaceTime HD camera for MacBook Pro 2016-2020 models',
      price: 39.99,
      discount_percentage: 5,
      stock_quantity: 45,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-camera.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Camera Assembly (2021+)',
      slug: 'macbook-pro-camera-assembly-2021',
      sku: 'MBP-CAM-2021',
      description: '1080p FaceTime HD camera for MacBook Pro 2021+ with M1/M2 chips',
      price: 49.99,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: true,
      is_new: true,
      image_url: '/images/macbook-pro-camera-new.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air Camera Assembly (2018-2020)',
      slug: 'macbook-air-camera-assembly-2018-2020',
      sku: 'MBA-CAM-2018',
      description: '720p FaceTime HD camera for MacBook Air 2018-2020 models',
      price: 34.99,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-camera.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro WiFi/Bluetooth Module (2016-2020)',
      slug: 'macbook-pro-wifi-bluetooth-module-2016-2020',
      sku: 'MBP-WIFI-2016',
      description: 'WiFi/Bluetooth module replacement for MacBook Pro 2016-2020 models',
      price: 59.99,
      discount_percentage: 10,
      stock_quantity: 30,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-wifi.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro WiFi/Bluetooth Module (2021+)',
      slug: 'macbook-pro-wifi-bluetooth-module-2021',
      sku: 'MBP-WIFI-2021',
      description: 'WiFi 6/Bluetooth 5.0 module for MacBook Pro 2021+ with Apple Silicon',
      price: 79.99,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: '/images/macbook-pro-wifi-new.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Touch Bar Assembly (2016-2020)',
      slug: 'macbook-pro-touch-bar-assembly-2016-2020',
      sku: 'MBP-TOUCHBAR-2016',
      description: 'Touch Bar with Touch ID for MacBook Pro 2016-2020 models',
      price: 149.99,
      discount_percentage: 15,
      stock_quantity: 15,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-touchbar.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Function Row Keys (2016-2020)',
      slug: 'macbook-pro-function-row-keys-2016-2020',
      sku: 'MBP-FNKEYS-2016',
      description: 'Function row key assembly for MacBook Pro without Touch Bar 2016-2020',
      price: 39.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-function-keys.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Hinge Assembly (13" 2016-2020)',
      slug: 'macbook-pro-hinge-assembly-13-2016-2020',
      sku: 'MBP-HINGE-13',
      description: 'Display hinge assembly for 13" MacBook Pro models 2016-2020',
      price: 79.99,
      discount_percentage: 5,
      stock_quantity: 25,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-hinge.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Hinge Assembly (16" 2019-2021)',
      slug: 'macbook-pro-hinge-assembly-16-2019-2021',
      sku: 'MBP-HINGE-16',
      description: 'Dual hinge assembly for 16" MacBook Pro 2019-2021 models',
      price: 119.99,
      discount_percentage: 10,
      stock_quantity: 18,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-16-hinge.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air Hinge Assembly (2018-2020)',
      slug: 'macbook-air-hinge-assembly-2018-2020',
      sku: 'MBA-HINGE-2018',
      description: 'Display hinge for MacBook Air 2018-2020 models',
      price: 69.99,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-hinge.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro LCD Backlight (13" 2016-2020)',
      slug: 'macbook-pro-lcd-backlight-13-2016-2020',
      sku: 'MBP-BACKLIGHT-13',
      description: 'LED backlight assembly for 13" MacBook Pro displays 2016-2020',
      price: 49.99,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-backlight.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro LCD Backlight (16" 2019-2021)',
      slug: 'macbook-pro-lcd-backlight-16-2019-2021',
      sku: 'MBP-BACKLIGHT-16',
      description: 'LED backlight system for 16" MacBook Pro Retina displays',
      price: 79.99,
      discount_percentage: 5,
      stock_quantity: 20,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-16-backlight.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air LCD Backlight (2018-2020)',
      slug: 'macbook-air-lcd-backlight-2018-2020',
      sku: 'MBA-BACKLIGHT-2018',
      description: 'LED backlight for MacBook Air Retina displays 2018-2020',
      price: 39.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-backlight.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro I/O Board (2016-2020)',
      slug: 'macbook-pro-io-board-2016-2020',
      sku: 'MBP-IOBOARD-2016',
      description: 'I/O board assembly for MacBook Pro 2016-2020 models',
      price: 89.99,
      discount_percentage: 10,
      stock_quantity: 22,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-io-board.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro T2 Security Chip (2018-2020)',
      slug: 'macbook-pro-t2-security-chip-2018-2020',
      sku: 'MBP-T2-2018',
      description: 'Apple T2 security chip replacement for MacBook Pro 2018-2020 models',
      price: 129.99,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: false,
      image_url: '/images/macbook-pro-t2-chip.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro M1 Security Enclave (2020+)',
      slug: 'macbook-pro-m1-security-enclave-2020',
      sku: 'MBP-M1-SE-2020',
      description: 'Secure Enclave coprocessor for MacBook Pro with M1 chip',
      price: 99.99,
      discount_percentage: 5,
      stock_quantity: 18,
      is_featured: true,
      is_new: false,
      image_url: '/images/macbook-pro-m1-enclave.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Flex Cable Set (13" 2016-2020)',
      slug: 'macbook-pro-flex-cable-set-13-2016-2020',
      sku: 'MBP-FLEX-13',
      description: 'Complete flex cable set for 13" MacBook Pro internal connections',
      price: 59.99,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-flex-cables.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Flex Cable Set (16" 2019-2021)',
      slug: 'macbook-pro-flex-cable-set-16-2019-2021',
      sku: 'MBP-FLEX-16',
      description: 'Comprehensive flex cable assembly for 16" MacBook Pro models',
      price: 89.99,
      discount_percentage: 10,
      stock_quantity: 28,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-16-flex-cables.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Air Flex Cable Set (2018-2020)',
      slug: 'macbook-air-flex-cable-set-2018-2020',
      sku: 'MBA-FLEX-2018',
      description: 'Internal flex cable set for MacBook Air 2018-2020 models',
      price: 49.99,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-flex-cables.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Antenna Assembly (2016-2020)',
      slug: 'macbook-pro-antenna-assembly-2016-2020',
      sku: 'MBP-ANTENNA-2016',
      description: 'WiFi/Bluetooth antenna assembly for MacBook Pro 2016-2020 models',
      price: 34.99,
      discount_percentage: 5,
      stock_quantity: 38,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-antenna.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Power Button Assembly (2016-2020)',
      slug: 'macbook-pro-power-button-assembly-2016-2020',
      sku: 'MBP-POWERBTN-2016',
      description: 'Power button with Touch ID for MacBook Pro 2016-2020 models',
      price: 69.99,
      discount_percentage: 0,
      stock_quantity: 32,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-power-button.jpg',
      brand: 'Apple',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Screw Kit (13" 2016-2020)',
      slug: 'macbook-pro-screw-kit-13-2016-2020',
      sku: 'MBP-SCREWS-13',
      description: 'Complete screw kit for 13" MacBook Pro disassembly and reassembly',
      price: 19.99,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-screws.jpg',
      brand: 'Generic',
      category_id: categoryId
    },
    {
      name: 'MacBook Pro Screw Kit (16" 2019-2021)',
      slug: 'macbook-pro-screw-kit-16-2019-2021',
      sku: 'MBP-SCREWS-16',
      description: 'Specialized screw set for 16" MacBook Pro repair and maintenance',
      price: 24.99,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-pro-16-screws.jpg',
      brand: 'Generic',
      category_id: categoryId
    },
    {
      name: 'MacBook Air Screw Kit (2018-2020)',
      slug: 'macbook-air-screw-kit-2018-2020',
      sku: 'MBA-SCREWS-2018',
      description: 'Complete screw kit for MacBook Air 2018-2020 models',
      price: 17.99,
      discount_percentage: 0,
      stock_quantity: 120,
      is_featured: false,
      is_new: false,
      image_url: '/images/macbook-air-screws.jpg',
      brand: 'Generic',
      category_id: categoryId
    }
  ];

  // Insert products
  for (const product of macBookProducts) {
    const { error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Error inserting product ${product.name}:`, error);
    } else {
      console.log(`✅ Inserted product: ${product.name}`);
    }
  }

  console.log('🎉 Successfully inserted 50 MacBook parts products!');
}

async function main() {
  console.log('🚀 Starting MacBook Parts Database Insertion...');

  try {
    await insertMacBookParts();
    console.log('✅ MacBook parts database insertion completed successfully!');
  } catch (error) {
    console.error('❌ Database insertion failed:', error);
    process.exit(1);
  }
}

main();
