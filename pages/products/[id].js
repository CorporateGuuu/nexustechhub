'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/ProductDetail.module.css';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get product by ID from mock data (same as category page)
  const getProductById = (productId) => {
    const allProducts = [
      // iPhone Parts - Extended comprehensive list (20+ products)
      {
        id: 'ip15-pro-max-screen',
        name: 'iPhone 15 Pro Max Super Retina XDR OLED Display',
        category: 'iPhone Parts',
        price: 399.99,
        discount_percentage: 5,
        stock: 25,
        image: '/images/products/iphone-15-pro-max-screen.svg',
        sku: 'NTH-IP15PM-SCREEN-001',
        brand: 'Apple',
        description: 'Genuine Apple OLED display with ProMotion technology, 120Hz refresh rate, and Super Retina XDR resolution. Compatible with iPhone 15 Pro Max models.',
        specifications: {
          'Display Size': '6.7 inches',
          'Resolution': '2796 x 1290 pixels',
          'Technology': 'Super Retina XDR OLED',
          'Refresh Rate': '120Hz ProMotion',
          'Brightness': '2000 nits peak',
          'Compatibility': 'iPhone 15 Pro Max'
        },
        warranty: '1 Year',
        tags: ['screen', 'oled', 'pro', '15', 'pro max']
      },
      {
        id: 'ip15-pro-screen',
        name: 'iPhone 15 Pro OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 349.99,
        discount_percentage: 0,
        stock: 35,
        image: '/images/products/iphone-15-pro-screen.jpg',
        sku: 'NTH-IP15P-SCREEN-001',
        brand: 'Apple',
        description: 'High-quality OLED replacement screen for iPhone 15 Pro with ProMotion technology and advanced color accuracy.',
        specifications: {
          'Display Size': '6.1 inches',
          'Resolution': '2556 x 1179 pixels',
          'Technology': 'Super Retina XDR OLED',
          'Refresh Rate': '120Hz ProMotion',
          'Brightness': '2000 nits peak',
          'Compatibility': 'iPhone 15 Pro'
        },
        warranty: '1 Year',
        tags: ['screen', 'oled', 'pro', '15']
      },
      {
        id: 'ip15-plus-screen',
        name: 'iPhone 15 Plus LCD Screen Assembly',
        category: 'iPhone Parts',
        price: 249.99,
        discount_percentage: 0,
        stock: 40,
        image: '/images/products/iphone-15-plus-screen.jpg',
        sku: 'NTH-IP15PLUS-SCREEN-001',
        brand: 'Apple',
        description: '6.7" Super Retina XDR LCD display for iPhone 15 Plus with excellent color reproduction and brightness.',
        specifications: {
          'Display Size': '6.7 inches',
          'Resolution': '2796 x 1290 pixels',
          'Technology': 'Super Retina XDR LCD',
          'Refresh Rate': '60Hz',
          'Brightness': '2000 nits peak',
          'Compatibility': 'iPhone 15 Plus'
        },
        warranty: '1 Year',
        tags: ['screen', 'lcd', 'plus', '15']
      },
      {
        id: 'ip15-battery',
        name: 'iPhone 15 Series Battery Replacement',
        category: 'iPhone Parts',
        price: 89.99,
        discount_percentage: 10,
        stock: 120,
        image: '/images/products/iphone-15-battery.jpg',
        sku: 'NTH-IP15-BAT-001',
        brand: 'Apple',
        description: 'Original capacity battery with 1-year warranty for all iPhone 15 models. Fast charging compatible.',
        specifications: {
          'Capacity': 'Original Apple capacity',
          'Compatibility': 'iPhone 15, 15 Plus, 15 Pro, 15 Pro Max',
          'Charging': 'USB-C Fast Charging',
          'Warranty': '1 Year',
          'Type': 'Lithium-ion'
        },
        warranty: '1 Year',
        tags: ['battery', '15', 'replacement']
      },
      {
        id: 'ip14-pro-max-screen',
        name: 'iPhone 14 Pro Max OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 329.99,
        discount_percentage: 0,
        stock: 28,
        image: '/images/products/iphone-14-pro-max-screen.jpg',
        sku: 'NTH-IP14PM-SCREEN-001',
        brand: 'Apple',
        description: '6.7" Super Retina XDR OLED display with ProMotion',
        tags: ['screen', 'oled', 'pro max', '14']
      },
      {
        id: 'ip14-pro-screen',
        name: 'iPhone 14 Pro OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 299.99,
        discount_percentage: 0,
        stock: 45,
        image: '/images/products/iphone-14-pro-screen.jpg',
        sku: 'NTH-IP14P-SCREEN-001',
        brand: 'Apple',
        description: 'ProMotion OLED display for iPhone 14 Pro models',
        tags: ['screen', 'oled', 'pro', '14']
      },
      {
        id: 'ip14-plus-screen',
        name: 'iPhone 14 Plus LCD Screen Assembly',
        category: 'iPhone Parts',
        price: 199.99,
        discount_percentage: 0,
        stock: 55,
        image: '/images/products/iphone-14-plus-screen.jpg',
        sku: 'NTH-IP14PLUS-SCREEN-001',
        brand: 'Apple',
        description: '6.7" Super Retina XDR LCD display for iPhone 14 Plus',
        tags: ['screen', 'lcd', 'plus', '14']
      },
      {
        id: 'ip14-battery',
        name: 'iPhone 14 Battery Replacement',
        category: 'iPhone Parts',
        price: 79.99,
        discount_percentage: 0,
        stock: 85,
        image: '/images/products/iphone-14-battery.jpg',
        sku: 'NTH-IP14-BAT-001',
        brand: 'Apple',
        description: 'Genuine Apple battery for all iPhone 14 models',
        tags: ['battery', '14', 'replacement']
      },
      {
        id: 'ip13-pro-max-screen',
        name: 'iPhone 13 Pro Max OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 279.99,
        discount_percentage: 0,
        stock: 32,
        image: '/images/products/iphone-13-pro-max-screen.jpg',
        sku: 'NTH-IP13PM-SCREEN-001',
        brand: 'Apple',
        description: '6.7" Super Retina XDR OLED display with ProMotion',
        tags: ['screen', 'oled', 'pro max', '13']
      },
      {
        id: 'ip13-pro-screen',
        name: 'iPhone 13 Pro OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 249.99,
        discount_percentage: 15,
        stock: 60,
        image: '/images/products/iphone-13-pro-screen.jpg',
        sku: 'NTH-IP13P-SCREEN-001',
        brand: 'Apple',
        description: 'Super Retina XDR OLED display replacement',
        tags: ['screen', 'oled', 'pro', '13']
      },
      {
        id: 'ip13-mini-screen',
        name: 'iPhone 13 Mini OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 199.99,
        discount_percentage: 0,
        stock: 45,
        image: '/images/products/iphone-13-mini-screen.jpg',
        sku: 'NTH-IP13MINI-SCREEN-001',
        brand: 'Apple',
        description: '5.4" Super Retina XDR OLED display for iPhone 13 mini',
        tags: ['screen', 'oled', 'mini', '13']
      },
      {
        id: 'ip13-battery',
        name: 'iPhone 13 Series Battery Replacement',
        category: 'iPhone Parts',
        price: 69.99,
        discount_percentage: 0,
        stock: 95,
        image: '/images/products/iphone-13-battery.jpg',
        sku: 'NTH-IP13-BAT-001',
        brand: 'Apple',
        description: 'Original capacity battery for iPhone 13 models',
        tags: ['battery', '13', 'replacement']
      },
      {
        id: 'ip12-pro-max-screen',
        name: 'iPhone 12 Pro Max OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 229.99,
        discount_percentage: 0,
        stock: 38,
        image: '/images/products/iphone-12-pro-max-screen.jpg',
        sku: 'NTH-IP12PM-SCREEN-001',
        brand: 'Apple',
        description: '6.7" Super Retina XDR OLED display',
        tags: ['screen', 'oled', 'pro max', '12']
      },
      {
        id: 'ip12-pro-screen',
        name: 'iPhone 12 Pro OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 199.99,
        discount_percentage: 0,
        stock: 52,
        image: '/images/products/iphone-12-pro-screen.jpg',
        sku: 'NTH-IP12P-SCREEN-001',
        brand: 'Apple',
        description: '6.1" Super Retina XDR OLED display',
        tags: ['screen', 'oled', 'pro', '12']
      },
      {
        id: 'ip12-mini-screen',
        name: 'iPhone 12 Mini OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 179.99,
        discount_percentage: 0,
        stock: 48,
        image: '/images/products/iphone-12-mini-screen.jpg',
        sku: 'NTH-IP12MINI-SCREEN-001',
        brand: 'Apple',
        description: '5.4" Super Retina XDR OLED display',
        tags: ['screen', 'oled', 'mini', '12']
      },
      {
        id: 'ip12-charging-port',
        name: 'iPhone 12 Series Charging Port Assembly',
        category: 'iPhone Parts',
        price: 49.99,
        discount_percentage: 0,
        stock: 150,
        image: '/images/products/iphone-12-charging.jpg',
        sku: 'NTH-IP12-CHARGING-001',
        brand: 'Apple',
        description: 'Lightning charging port with flex cable',
        tags: ['charging', 'port', 'lightning', '12']
      },
      {
        id: 'ip11-pro-max-screen',
        name: 'iPhone 11 Pro Max LCD Screen Assembly',
        category: 'iPhone Parts',
        price: 149.99,
        discount_percentage: 0,
        stock: 65,
        image: '/images/products/iphone-11-pro-max-screen.jpg',
        sku: 'NTH-IP11PM-SCREEN-001',
        brand: 'Apple',
        description: '6.5" Liquid Retina LCD display',
        tags: ['screen', 'lcd', 'pro max', '11']
      },
      {
        id: 'ip11-pro-screen',
        name: 'iPhone 11 Pro LCD Screen Assembly',
        category: 'iPhone Parts',
        price: 129.99,
        discount_percentage: 0,
        stock: 78,
        image: '/images/products/iphone-11-pro-screen.jpg',
        sku: 'NTH-IP11P-SCREEN-001',
        brand: 'Apple',
        description: '5.8" Liquid Retina LCD display',
        tags: ['screen', 'lcd', 'pro', '11']
      },
      {
        id: 'ip11-battery',
        name: 'iPhone 11 Series Battery Replacement',
        category: 'iPhone Parts',
        price: 59.99,
        discount_percentage: 0,
        stock: 110,
        image: '/images/products/iphone-11-battery.jpg',
        sku: 'NTH-IP11-BAT-001',
        brand: 'Apple',
        description: 'Original capacity battery for iPhone 11 models',
        tags: ['battery', '11', 'replacement']
      },
      {
        id: 'ip-se-2022-screen',
        name: 'iPhone SE (2022) LCD Screen Assembly',
        category: 'iPhone Parts',
        price: 89.99,
        discount_percentage: 0,
        stock: 85,
        image: '/images/products/iphone-se-2022-screen.jpg',
        sku: 'NTH-IPSE2022-SCREEN-001',
        brand: 'Apple',
        description: '4.7" Retina HD LCD display',
        tags: ['screen', 'lcd', 'se', '2022']
      },
      {
        id: 'ip-se-2020-screen',
        name: 'iPhone SE (2020) LCD Screen Assembly',
        category: 'iPhone Parts',
        price: 79.99,
        discount_percentage: 0,
        stock: 92,
        image: '/images/products/iphone-se-2020-screen.jpg',
        sku: 'NTH-IPSE2020-SCREEN-001',
        brand: 'Apple',
        description: '4.7" Retina HD LCD display',
        tags: ['screen', 'lcd', 'se', '2020']
      },

      // Samsung Parts - Extended Galaxy series (25+ products)
      {
        id: 'sg-s24-ultra-screen',
        name: 'Samsung Galaxy S24 Ultra AMOLED Screen',
        category: 'Samsung Parts',
        price: 349.99,
        discount_percentage: 8,
        stock: 20,
        image: '/images/products/samsung-s24-ultra-screen.jpg',
        sku: 'NTH-SGS24U-SCREEN-001',
        brand: 'Samsung',
        description: '6.8" Dynamic AMOLED 2X display with S Pen support',
        tags: ['screen', 'amoled', 'ultra', 's24', 's pen']
      },
      {
        id: 'sg-s24-plus-screen',
        name: 'Samsung Galaxy S24 Plus AMOLED Screen',
        category: 'Samsung Parts',
        price: 299.99,
        discount_percentage: 0,
        stock: 28,
        image: '/images/products/samsung-s24-plus-screen.jpg',
        sku: 'NTH-SGS24PLUS-SCREEN-001',
        brand: 'Samsung',
        description: '6.7" Dynamic AMOLED 2X display',
        tags: ['screen', 'amoled', 'plus', 's24']
      },
      {
        id: 'sg-s24-screen',
        name: 'Samsung Galaxy S24 OLED Screen Assembly',
        category: 'Samsung Parts',
        price: 279.99,
        discount_percentage: 0,
        stock: 30,
        image: '/images/products/samsung-s24-screen.jpg',
        sku: 'NTH-SGS24-SCREEN-001',
        brand: 'Samsung',
        description: 'Dynamic AMOLED 2X display for Galaxy S24',
        tags: ['screen', 'amoled', 's24']
      },
      {
        id: 'sg-s23-ultra-screen',
        name: 'Samsung Galaxy S23 Ultra AMOLED Screen',
        category: 'Samsung Parts',
        price: 319.99,
        discount_percentage: 0,
        stock: 22,
        image: '/images/products/samsung-s23-ultra-screen.jpg',
        sku: 'NTH-SGS23U-SCREEN-001',
        brand: 'Samsung',
        description: '6.8" Dynamic AMOLED 2X display with S Pen',
        tags: ['screen', 'amoled', 'ultra', 's23', 's pen']
      },
      {
        id: 'sg-s23-plus-screen',
        name: 'Samsung Galaxy S23 Plus AMOLED Screen',
        category: 'Samsung Parts',
        price: 269.99,
        discount_percentage: 0,
        stock: 35,
        image: '/images/products/samsung-s23-plus-screen.jpg',
        sku: 'NTH-SGS23PLUS-SCREEN-001',
        brand: 'Samsung',
        description: '6.6" Dynamic AMOLED 2X display',
        tags: ['screen', 'amoled', 'plus', 's23']
      },
      {
        id: 'sg-s23-ultra-battery',
        name: 'Samsung Galaxy S23 Ultra Battery',
        category: 'Samsung Parts',
        price: 89.99,
        discount_percentage: 5,
        stock: 55,
        image: '/images/products/samsung-s23-ultra-battery.jpg',
        sku: 'NTH-SGS23U-BAT-001',
        brand: 'Samsung',
        description: '5000mAh high-capacity battery replacement',
        tags: ['battery', 'ultra', 's23', '5000mah']
      },
      {
        id: 'sg-s23-battery',
        name: 'Samsung Galaxy S23 Battery Replacement',
        category: 'Samsung Parts',
        price: 79.99,
        discount_percentage: 0,
        stock: 80,
        image: '/images/products/samsung-s23-battery.jpg',
        sku: 'NTH-SGS23-BAT-001',
        brand: 'Samsung',
        description: '3900mAh battery for Galaxy S23 series',
        tags: ['battery', 's23', '3900mah']
      },
      {
        id: 'sg-s22-ultra-screen',
        name: 'Samsung Galaxy S22 Ultra AMOLED Screen',
        category: 'Samsung Parts',
        price: 289.99,
        discount_percentage: 0,
        stock: 25,
        image: '/images/products/samsung-s22-ultra-screen.jpg',
        sku: 'NTH-SGS22U-SCREEN-001',
        brand: 'Samsung',
        description: '6.8" Dynamic AMOLED 2X display with S Pen',
        tags: ['screen', 'amoled', 'ultra', 's22', 's pen']
      },
      {
        id: 'sg-s22-plus-screen',
        name: 'Samsung Galaxy S22 Plus AMOLED Screen',
        category: 'Samsung Parts',
        price: 249.99,
        discount_percentage: 0,
        stock: 40,
        image: '/images/products/samsung-s22-plus-screen.jpg',
        sku: 'NTH-SGS22PLUS-SCREEN-001',
        brand: 'Samsung',
        description: '6.6" Dynamic AMOLED 2X display',
        tags: ['screen', 'amoled', 'plus', 's22']
      },
      {
        id: 'sg-s22-screen',
        name: 'Samsung Galaxy S22 AMOLED Screen Assembly',
        category: 'Samsung Parts',
        price: 229.99,
        discount_percentage: 0,
        stock: 45,
        image: '/images/products/samsung-s22-screen.jpg',
        sku: 'NTH-SGS22-SCREEN-001',
        brand: 'Samsung',
        description: '6.1" Dynamic AMOLED 2X display',
        tags: ['screen', 'amoled', 's22']
      },
      {
        id: 'sg-s21-ultra-screen',
        name: 'Samsung Galaxy S21 Ultra AMOLED Screen',
        category: 'Samsung Parts',
        price: 259.99,
        discount_percentage: 0,
        stock: 30,
        image: '/images/products/samsung-s21-ultra-screen.jpg',
        sku: 'NTH-SGS21U-SCREEN-001',
        brand: 'Samsung',
        description: '6.8" Dynamic AMOLED 2X display',
        tags: ['screen', 'amoled', 'ultra', 's21']
      },
      {
        id: 'sg-s21-plus-screen',
        name: 'Samsung Galaxy S21 Plus AMOLED Screen',
        category: 'Samsung Parts',
        price: 219.99,
        discount_percentage: 0,
        stock: 42,
        image: '/images/products/samsung-s21-plus-screen.jpg',
        sku: 'NTH-SGS21PLUS-SCREEN-001',
        brand: 'Samsung',
        description: '6.7" Dynamic AMOLED 2X display',
        tags: ['screen', 'amoled', 'plus', 's21']
      },
      {
        id: 'sg-s21-screen',
        name: 'Samsung Galaxy S21 AMOLED Screen Assembly',
        category: 'Samsung Parts',
        price: 199.99,
        discount_percentage: 0,
        stock: 50,
        image: '/images/products/samsung-s21-screen.jpg',
        sku: 'NTH-SGS21-SCREEN-001',
        brand: 'Samsung',
        description: '6.2" Dynamic AMOLED 2X display',
        tags: ['screen', 'amoled', 's21']
      },
      {
        id: 'sg-z-fold5-screen',
        name: 'Samsung Galaxy Z Fold 5 Inner Screen',
        category: 'Samsung Parts',
        price: 599.99,
        discount_percentage: 10,
        stock: 15,
        image: '/images/products/samsung-z-fold5-screen.jpg',
        sku: 'NTH-ZFOLD5-SCREEN-001',
        brand: 'Samsung',
        description: '7.6" Dynamic AMOLED 2X foldable display',
        tags: ['screen', 'amoled', 'fold', 'z fold 5', 'foldable']
      },
      {
        id: 'sg-z-fold4-screen',
        name: 'Samsung Galaxy Z Fold 4 Inner Screen',
        category: 'Samsung Parts',
        price: 549.99,
        discount_percentage: 0,
        stock: 18,
        image: '/images/products/samsung-z-fold4-screen.jpg',
        sku: 'NTH-ZFOLD4-SCREEN-001',
        brand: 'Samsung',
        description: '7.6" Dynamic AMOLED 2X foldable display',
        tags: ['screen', 'amoled', 'fold', 'z fold 4', 'foldable']
      },
      {
        id: 'sg-z-fold3-screen',
        name: 'Samsung Galaxy Z Fold 3 Inner Screen',
        category: 'Samsung Parts',
        price: 499.99,
        discount_percentage: 0,
        stock: 20,
        image: '/images/products/samsung-z-fold3-screen.jpg',
        sku: 'NTH-ZFOLD3-SCREEN-001',
        brand: 'Samsung',
        description: '7.6" Dynamic AMOLED 2X foldable display',
        tags: ['screen', 'amoled', 'fold', 'z fold 3', 'foldable']
      },
      {
        id: 'sg-z-flip5-screen',
        name: 'Samsung Galaxy Z Flip 5 Outer Screen',
        category: 'Samsung Parts',
        price: 149.99,
        discount_percentage: 0,
        stock: 35,
        image: '/images/products/samsung-z-flip5-screen.jpg',
        sku: 'NTH-ZFLIP5-SCREEN-001',
        brand: 'Samsung',
        description: '3.4" Super AMOLED outer display',
        tags: ['screen', 'amoled', 'flip', 'z flip 5', 'outer']
      },
      {
        id: 'sg-z-flip4-screen',
        name: 'Samsung Galaxy Z Flip 4 Outer Screen',
        category: 'Samsung Parts',
        price: 129.99,
        discount_percentage: 0,
        stock: 40,
        image: '/images/products/samsung-z-flip4-screen.jpg',
        sku: 'NTH-ZFLIP4-SCREEN-001',
        brand: 'Samsung',
        description: '3.4" Super AMOLED outer display',
        tags: ['screen', 'amoled', 'flip', 'z flip 4', 'outer']
      },
      {
        id: 'sg-note20-ultra-screen',
        name: 'Samsung Galaxy Note 20 Ultra Screen',
        category: 'Samsung Parts',
        price: 199.99,
        discount_percentage: 0,
        stock: 40,
        image: '/images/products/samsung-note20-ultra-screen.jpg',
        sku: 'NTH-NOTE20U-SCREEN-001',
        brand: 'Samsung',
        description: '6.9" Super AMOLED Plus display with S Pen',
        tags: ['screen', 'amoled', 'note', 'note 20', 's pen']
      },
      {
        id: 'sg-note20-screen',
        name: 'Samsung Galaxy Note 20 Screen Assembly',
        category: 'Samsung Parts',
        price: 179.99,
        discount_percentage: 0,
        stock: 45,
        image: '/images/products/samsung-note20-screen.jpg',
        sku: 'NTH-NOTE20-SCREEN-001',
        brand: 'Samsung',
        description: '6.7" Super AMOLED Plus display with S Pen',
        tags: ['screen', 'amoled', 'note', 'note 20', 's pen']
      },
      {
        id: 'sg-a54-screen',
        name: 'Samsung Galaxy A54 LCD Screen Assembly',
        category: 'Samsung Parts',
        price: 149.99,
        discount_percentage: 0,
        stock: 65,
        image: '/images/products/samsung-a54-screen.jpg',
        sku: 'NTH-A54-SCREEN-001',
        brand: 'Samsung',
        description: '6.4" Super AMOLED display replacement',
        tags: ['screen', 'amoled', 'a54', 'a series']
      },
      {
        id: 'sg-a53-screen',
        name: 'Samsung Galaxy A53 LCD Screen Assembly',
        category: 'Samsung Parts',
        price: 129.99,
        discount_percentage: 0,
        stock: 70,
        image: '/images/products/samsung-a53-screen.jpg',
        sku: 'NTH-A53-SCREEN-001',
        brand: 'Samsung',
        description: '6.5" Super AMOLED display replacement',
        tags: ['screen', 'amoled', 'a53', 'a series']
      },
      {
        id: 'sg-a52-screen',
        name: 'Samsung Galaxy A52 LCD Screen Assembly',
        category: 'Samsung Parts',
        price: 119.99,
        discount_percentage: 0,
        stock: 75,
        image: '/images/products/samsung-a52-screen.jpg',
        sku: 'NTH-A52-SCREEN-001',
        brand: 'Samsung',
        description: '6.5" Super AMOLED display replacement',
        tags: ['screen', 'amoled', 'a52', 'a series']
      },
      {
        id: 'sg-a51-screen',
        name: 'Samsung Galaxy A51 LCD Screen Assembly',
        category: 'Samsung Parts',
        price: 99.99,
        discount_percentage: 0,
        stock: 80,
        image: '/images/products/samsung-a51-screen.jpg',
        sku: 'NTH-A51-SCREEN-001',
        brand: 'Samsung',
        description: '6.5" Super AMOLED display replacement',
        tags: ['screen', 'amoled', 'a51', 'a series']
      },
      {
        id: 'sg-usb-c-port',
        name: 'Samsung USB-C Charging Port Assembly',
        category: 'Samsung Parts',
        price: 39.99,
        discount_percentage: 0,
        stock: 120,
        image: '/images/products/samsung-usb-c-port.jpg',
        sku: 'NTH-SG-USBC-001',
        brand: 'Samsung',
        description: 'USB-C port with flex cable for Galaxy devices',
        tags: ['charging', 'port', 'usb-c', 'galaxy']
      },
      {
        id: 'sg-micro-usb-port',
        name: 'Samsung Micro USB Charging Port Assembly',
        category: 'Samsung Parts',
        price: 29.99,
        discount_percentage: 0,
        stock: 140,
        image: '/images/products/samsung-micro-usb-port.jpg',
        sku: 'NTH-SG-MICROUSB-001',
        brand: 'Samsung',
        description: 'Micro USB port with flex cable for older Galaxy devices',
        tags: ['charging', 'port', 'micro usb', 'galaxy']
      },

      // iPad Parts - Extended comprehensive list (15+ products)
      {
        id: 'ipad-pro-12-9-m4-screen',
        name: 'iPad Pro 12.9" (M4) Ultra Retina XDR Display',
        category: 'iPad Parts',
        price: 599.99,
        discount_percentage: 8,
        stock: 12,
        image: '/images/products/ipad-pro-12-9-m4-screen.jpg',
        sku: 'NTH-IPPRO129M4-SCREEN-001',
        brand: 'Apple',
        description: '12.9" Ultra Retina XDR OLED display with ProMotion',
        tags: ['screen', 'oled', 'pro', '12.9', 'm4']
      },
      {
        id: 'ipad-pro-12-9-screen',
        name: 'iPad Pro 12.9" Liquid Retina XDR Display',
        category: 'iPad Parts',
        price: 499.99,
        discount_percentage: 12,
        stock: 18,
        image: '/images/products/ipad-pro-12-9-screen.jpg',
        sku: 'NTH-IPPRO129-SCREEN-001',
        brand: 'Apple',
        description: '12.9" Liquid Retina XDR OLED display with ProMotion',
        tags: ['screen', 'oled', 'pro', '12.9']
      },
      {
        id: 'ipad-pro-11-m4-screen',
        name: 'iPad Pro 11" (M4) Ultra Retina Display',
        category: 'iPad Parts',
        price: 449.99,
        discount_percentage: 0,
        stock: 20,
        image: '/images/products/ipad-pro-11-m4-screen.jpg',
        sku: 'NTH-IPPRO11M4-SCREEN-001',
        brand: 'Apple',
        description: '11" Ultra Retina XDR OLED display with ProMotion',
        tags: ['screen', 'oled', 'pro', '11', 'm4']
      },
      {
        id: 'ipad-pro-11-screen',
        name: 'iPad Pro 11" Liquid Retina Display',
        category: 'iPad Parts',
        price: 349.99,
        discount_percentage: 0,
        stock: 25,
        image: '/images/products/ipad-pro-11-screen.jpg',
        sku: 'NTH-IPPRO11-SCREEN-001',
        brand: 'Apple',
        description: '11" Liquid Retina display with Tandem OLED',
        tags: ['screen', 'oled', 'pro', '11']
      },
      {
        id: 'ipad-pro-10-5-screen',
        name: 'iPad Pro 10.5" Liquid Retina Display',
        category: 'iPad Parts',
        price: 299.99,
        discount_percentage: 0,
        stock: 28,
        image: '/images/products/ipad-pro-10-5-screen.jpg',
        sku: 'NTH-IPPRO105-SCREEN-001',
        brand: 'Apple',
        description: '10.5" Liquid Retina display with True Tone',
        tags: ['screen', 'liquid retina', 'pro', '10.5']
      },
      {
        id: 'ipad-air-5-screen',
        name: 'iPad Air 5th Gen LCD Screen Assembly',
        category: 'iPad Parts',
        price: 249.99,
        discount_percentage: 8,
        stock: 35,
        image: '/images/products/ipad-air-5-screen.jpg',
        sku: 'NTH-IPAIR5-SCREEN-001',
        brand: 'Apple',
        description: '10.9" Liquid Retina display with True Tone',
        tags: ['screen', 'liquid retina', 'air', '10.9']
      },
      {
        id: 'ipad-air-4-screen',
        name: 'iPad Air 4th Gen LCD Screen Assembly',
        category: 'iPad Parts',
        price: 229.99,
        discount_percentage: 0,
        stock: 42,
        image: '/images/products/ipad-air-4-screen.jpg',
        sku: 'NTH-IPAIR4-SCREEN-001',
        brand: 'Apple',
        description: '10.9" Liquid Retina display',
        tags: ['screen', 'liquid retina', 'air', '10.9']
      },
      {
        id: 'ipad-mini-6-screen',
        name: 'iPad Mini 6 LCD Screen Assembly',
        category: 'iPad Parts',
        price: 199.99,
        discount_percentage: 0,
        stock: 40,
        image: '/images/products/ipad-mini-6-screen.jpg',
        sku: 'NTH-IPMINI6-SCREEN-001',
        brand: 'Apple',
        description: '8.3" Liquid Retina display with Tandem OLED',
        tags: ['screen', 'liquid retina', 'mini', '8.3']
      },
      {
        id: 'ipad-mini-5-screen',
        name: 'iPad Mini 5 LCD Screen Assembly',
        category: 'iPad Parts',
        price: 179.99,
        discount_percentage: 0,
        stock: 48,
        image: '/images/products/ipad-mini-5-screen.jpg',
        sku: 'NTH-IPMINI5-SCREEN-001',
        brand: 'Apple',
        description: '7.9" Retina display',
        tags: ['screen', 'retina', 'mini', '7.9']
      },
      {
        id: 'ipad-pro-battery',
        name: 'iPad Pro Battery Replacement',
        category: 'iPad Parts',
        price: 129.99,
        discount_percentage: 5,
        stock: 50,
        image: '/images/products/ipad-pro-battery.jpg',
        sku: 'NTH-IPPRO-BAT-001',
        brand: 'Apple',
        description: 'High-capacity battery for iPad Pro models',
        tags: ['battery', 'pro', 'replacement']
      },
      {
        id: 'ipad-air-battery',
        name: 'iPad Air Battery Replacement',
        category: 'iPad Parts',
        price: 99.99,
        discount_percentage: 0,
        stock: 65,
        image: '/images/products/ipad-air-battery.jpg',
        sku: 'NTH-IPAIR-BAT-001',
        brand: 'Apple',
        description: 'Original capacity battery for iPad Air models',
        tags: ['battery', 'air', 'replacement']
      },
      {
        id: 'ipad-home-button',
        name: 'iPad Home Button Assembly',
        category: 'iPad Parts',
        price: 49.99,
        discount_percentage: 0,
        stock: 90,
        image: '/images/products/ipad-home-button.jpg',
        sku: 'NTH-IPAD-HOME-001',
        brand: 'Apple',
        description: 'Touch ID home button with flex cable',
        tags: ['home button', 'touch id', 'flex cable']
      },
      {
        id: 'ipad-lightning-port',
        name: 'iPad Lightning Charging Port',
        category: 'iPad Parts',
        price: 39.99,
        discount_percentage: 0,
        stock: 110,
        image: '/images/products/ipad-lightning-port.jpg',
        sku: 'NTH-IPAD-LIGHTNING-001',
        brand: 'Apple',
        description: 'Lightning port assembly for older iPad models',
        tags: ['charging', 'port', 'lightning']
      },
      {
        id: 'ipad-usb-c-port',
        name: 'iPad USB-C Charging Port',
        category: 'iPad Parts',
        price: 45.99,
        discount_percentage: 0,
        stock: 85,
        image: '/images/products/ipad-usb-c-port.jpg',
        sku: 'NTH-IPAD-USBC-001',
        brand: 'Apple',
        description: 'USB-C port assembly for newer iPad models',
        tags: ['charging', 'port', 'usb-c']
      },
      {
        id: 'ipad-digitizer',
        name: 'iPad Touch Digitizer Replacement',
        category: 'iPad Parts',
        price: 89.99,
        discount_percentage: 0,
        stock: 60,
        image: '/images/products/ipad-digitizer.jpg',
        sku: 'NTH-IPAD-DIGITIZER-001',
        brand: 'Apple',
        description: 'Touch screen digitizer for various iPad models',
        tags: ['digitizer', 'touch screen', 'replacement']
      },
      {
        id: 'ipad-speaker',
        name: 'iPad Speaker Assembly',
        category: 'iPad Parts',
        price: 34.99,
        discount_percentage: 0,
        stock: 95,
        image: '/images/products/ipad-speaker.jpg',
        sku: 'NTH-IPAD-SPEAKER-001',
        brand: 'Apple',
        description: 'Speaker module for iPad audio',
        tags: ['speaker', 'audio', 'sound']
      },
      {
        id: 'ipad-mic',
        name: 'iPad Microphone Assembly',
        category: 'iPad Parts',
        price: 29.99,
        discount_percentage: 0,
        stock: 100,
        image: '/images/products/ipad-mic.jpg',
        sku: 'NTH-IPAD-MIC-001',
        brand: 'Apple',
        description: 'Microphone module for iPad audio input',
        tags: ['microphone', 'audio', 'input']
      },
      {
        id: 'ipad-camera',
        name: 'iPad Rear Camera Assembly',
        category: 'iPad Parts',
        price: 79.99,
        discount_percentage: 0,
        stock: 55,
        image: '/images/products/ipad-camera.jpg',
        sku: 'NTH-IPAD-CAMERA-001',
        brand: 'Apple',
        description: 'Rear camera module for iPad photography',
        tags: ['camera', 'rear', 'photography']
      },
      {
        id: 'ipad-front-camera',
        name: 'iPad Front Camera Assembly',
        category: 'iPad Parts',
        price: 59.99,
        discount_percentage: 0,
        stock: 70,
        image: '/images/products/ipad-front-camera.jpg',
        sku: 'NTH-IPAD-FRONT-CAMERA-001',
        brand: 'Apple',
        description: 'Front camera module with FaceTime',
        tags: ['camera', 'front', 'facetime']
      },

      // Repair Tools - Extended professional grade (20+ products)
      {
        id: 'toolkit-pro-65pc',
        name: 'Professional iFixit Repair Toolkit - 65 Pieces',
        category: 'Repair Tools',
        price: 199.99,
        discount_percentage: 15,
        stock: 15,
        image: '/images/products/professional-toolkit.jpg',
        sku: 'NTH-TOOLKIT-PRO65-001',
        brand: 'iFixit',
        description: 'Complete professional toolkit for mobile device repairs with precision tools and accessories.',
        specifications: {
          'Pieces': '65 precision tools',
          'Includes': 'Screwdrivers, pry tools, suction cups',
          'Case': 'Professional carrying case',
          'Quality': 'iFixit Pro Grade',
          'Compatibility': 'All mobile devices'
        },
        warranty: '2 Years',
        tags: ['toolkit', 'professional', '65 pieces', 'complete']
      },
      {
        id: 'toolkit-essentials',
        name: 'Essential Repair Toolkit - 32 Pieces',
        category: 'Repair Tools',
        price: 89.99,
        discount_percentage: 0,
        stock: 35,
        image: '/images/products/essentials-toolkit.jpg',
        sku: 'NTH-TOOLKIT-ESSENTIALS-001',
        brand: 'Generic',
        description: 'Essential tools for basic mobile repairs',
        tags: ['toolkit', 'essentials', '32 pieces', 'basic']
      },
      {
        id: 'screwdriver-precision-set',
        name: 'Precision Screwdriver Set - 24 Pieces',
        category: 'Repair Tools',
        price: 49.99,
        discount_percentage: 0,
        stock: 85,
        image: '/images/products/precision-screwdrivers.jpg',
        sku: 'NTH-SCREWDRIVER-24PC-001',
        brand: 'Wera',
        description: 'Magnetic precision screwdrivers for electronics repair',
        tags: ['screwdriver', 'precision', '24 pieces', 'magnetic']
      },
      {
        id: 'screwdriver-torx-set',
        name: 'Torx Screwdriver Set - 12 Pieces',
        category: 'Repair Tools',
        price: 39.99,
        discount_percentage: 0,
        stock: 95,
        image: '/images/products/torx-screwdrivers.jpg',
        sku: 'NTH-SCREWDRIVER-TORX-001',
        brand: 'Generic',
        description: 'Torx security screwdrivers for Apple devices',
        tags: ['screwdriver', 'torx', 'security', 'apple']
      },
      {
        id: 'screwdriver-phillips-set',
        name: 'Phillips Screwdriver Set - 8 Pieces',
        category: 'Repair Tools',
        price: 24.99,
        discount_percentage: 0,
        stock: 120,
        image: '/images/products/phillips-screwdrivers.jpg',
        sku: 'NTH-SCREWDRIVER-PHILLIPS-001',
        brand: 'Generic',
        description: 'Phillips head screwdrivers in various sizes',
        tags: ['screwdriver', 'phillips', 'various sizes']
      }
    ];

    return allProducts.find(product => product.id === productId);
  };

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Product not found');
      }
      setLoading(false);
    }
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product, quantity);
      // Success feedback could be added here
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Error handling could be added here
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading product...">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading product...</h3>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout title="Product Not Found" description="The requested product could not be found">
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products" className={styles.backButton}>
            Browse All Products
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${product.name} - Nexus Tech Hub`}
      description={product.description}
    >
      <div className={styles.productDetail}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <Link href={`/products/${product.category.toLowerCase().replace(' ', '-')}`}>
            {product.category}
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{product.name}</span>
        </div>

        <div className={styles.productContainer}>
          {/* Product Images */}
          <div className={styles.productImages}>
            <div className={styles.mainImage}>
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/images/products/placeholder.svg';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.productInfo}>
            <div className={styles.productHeader}>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <div className={styles.productMeta}>
                <span className={styles.sku}>SKU: {product.sku}</span>
                <span className={styles.brand}>Brand: {product.brand}</span>
              </div>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              {product.discount_percentage > 0 ? (
                <>
                  <span className={styles.originalPrice}>
                    ${(product.price * (1 + product.discount_percentage / 100)).toFixed(2)}
                  </span>
                  <span className={styles.currentPrice}>
                    ${product.price}
                  </span>
                  <span className={styles.discountBadge}>
                    -{product.discount_percentage}%
                  </span>
                </>
              ) : (
                <span className={styles.currentPrice}>
                  ${product.price}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className={styles.stockStatus}>
              {product.stock > 10 ? (
                <span className={styles.inStock}>
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : product.stock > 0 ? (
                <span className={styles.lowStock}>
                  ⚠ Only {product.stock} left in stock
                </span>
              ) : (
                <span className={styles.outOfStock}>
                  ✗ Out of Stock
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className={styles.quantitySection}>
              <label className={styles.quantityLabel}>Quantity:</label>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className={styles.purchaseSection}>
              <button
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
              >
                {product.stock === 0 ? 'Out of Stock' :
                 isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>

              <div className={styles.purchaseInfo}>
                <span className={styles.warranty}>
                  ✓ {product.warranty || '1 Year'} Warranty
                </span>
                <span className={styles.shipping}>
                  ✓ Free Shipping
                </span>
              </div>
            </div>

            {/* Category */}
            <div className={styles.categoryBadge}>
              <span className={styles.categoryIcon}>
                {product.category === 'iPhone Parts' ? '📱' :
                 product.category === 'Samsung Parts' ? '📱' :
                 product.category === 'iPad Parts' ? '📱' :
                 product.category === 'Repair Tools' ? '🔧' : '📦'}
              </span>
              <span>{product.category}</span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className={styles.productDetails}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.active}`}>
              Description
            </button>
            <button className={styles.tab}>
              Specifications
            </button>
            <button className={styles.tab}>
              Warranty
            </button>
          </div>

          <div className={styles.tabContent}>
            <div className={`${styles.tabPanel} ${styles.active}`}>
              <h3>Product Description</h3>
              <p className={styles.description}>{product.description}</p>

              <div className={styles.features}>
                <h4>Key Features:</h4>
                <ul>
                  <li>Premium quality replacement part</li>
                  <li>Compatible with specified models</li>
                  <li>Easy installation</li>
                  <li>Comprehensive warranty coverage</li>
                  <li>Professional grade components</li>
                </ul>
              </div>
            </div>

            <div className={styles.tabPanel}>
              <h3>Technical Specifications</h3>
              <div className={styles.specifications}>
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <span className={styles.specKey}>{key}:</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.tabPanel}>
              <h3>Warranty Information</h3>
              <div className={styles.warrantyInfo}>
                <h4>{product.warranty || '1 Year'} Limited Warranty</h4>
                <p>
                  This product comes with a {(product.warranty || '1 Year').toLowerCase()} limited warranty
                  covering manufacturing defects and functionality issues.
                </p>
                <ul>
                  <li>Covers manufacturing defects</li>
                  <li>Free repair or replacement</li>
                  <li>Professional technical support</li>
                  <li>Valid from date of purchase</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className={styles.relatedProducts}>
          <h2>Related Products</h2>
          <div className={styles.relatedGrid}>
            {/* Related products would be dynamically loaded here */}
            <div className={styles.relatedPlaceholder}>
              <p>Related products will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Enable static generation for better performance
export async function getStaticPaths() {
  // Generate paths for key products
  const paths = [
    { params: { id: 'ip15-pro-max-screen' } },
    { params: { id: 'ip15-pro-screen' } },
    { params: { id: 'ip15-plus-screen' } },
    { params: { id: 'ip15-battery' } },
    { params: { id: 'sg-s24-ultra-screen' } },
    { params: { id: 'toolkit-pro-65pc' } }
  ];

  return {
    paths,
    fallback: true // Enable fallback for dynamically generated pages
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {},
    revalidate: 60 // Regenerate page every 60 seconds
  };
}
