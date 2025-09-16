'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import ProductGrid from '../../components/ProductGrid';
import styles from '../../styles/Products.module.css';

export default function ProductCategory() {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get category info based on slug
  const getCategoryInfo = (categorySlug) => {
    const categories = {
      'iphone-parts': {
        name: 'iPhone Parts',
        description: 'High-quality replacement parts for all iPhone models',
        apiCategory: 'iPhone Parts'
      },
      'samsung-parts': {
        name: 'Samsung Parts',
        description: 'Original and compatible parts for Samsung Galaxy devices',
        apiCategory: 'Samsung Parts'
      },
      'ipad-parts': {
        name: 'iPad Parts',
        description: 'Professional replacement parts for all iPad models',
        apiCategory: 'iPad Parts'
      },
      'repair-tools': {
        name: 'Repair Tools',
        description: 'Professional tools and equipment for device repairs',
        apiCategory: 'Repair Tools'
      }
    };

    return categories[categorySlug] || {
      name: 'Products',
      description: 'Professional repair parts and tools',
      apiCategory: 'all'
    };
  };

  // Fetch products from API
  const fetchProducts = async (categorySlug) => {
    try {
      setLoading(true);
      const categoryInfo = getCategoryInfo(categorySlug);

      let url = '/api/products?limit=50';
      if (categoryInfo.apiCategory !== 'all') {
        url += `&category=${encodeURIComponent(categoryInfo.apiCategory)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        // Fallback to mock data if API fails
        setProducts(getMockProducts(categorySlug));
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      // Fallback to mock data
      setProducts(getMockProducts(categorySlug));
    } finally {
      setLoading(false);
    }
  };

  // Enhanced mock products for fallback - simulating comprehensive Supabase database
  const getMockProducts = (categorySlug) => {
    const categoryInfo = getCategoryInfo(categorySlug);

    const allProducts = [
      // iPhone Parts - Extended comprehensive list (20+ products)
      {
        id: 'ip15-pro-max-screen',
        name: 'iPhone 15 Pro Max Super Retina XDR OLED Display',
        category: 'iPhone Parts',
        price: 399.99,
        discount_percentage: 5,
        stock: 25,
        image: '/images/products/iphone-15-pro-max-screen.jpg',
        sku: 'NTH-IP15PM-SCREEN-001',
        brand: 'Apple',
        description: 'Genuine Apple OLED display with ProMotion technology',
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
        description: 'High-quality OLED replacement screen for iPhone 15 Pro',
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
        description: '6.7" Super Retina XDR LCD display for iPhone 15 Plus',
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
        description: 'Original capacity battery with 1-year warranty',
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
        description: 'Complete professional toolkit for mobile device repairs',
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
      },
      {
        id: 'heat-gun-professional',
        name: 'Professional Heat Gun with LCD Display',
        category: 'Repair Tools',
        price: 89.99,
        discount_percentage: 10,
        stock: 30,
        image: '/images/products/professional-heat-gun.jpg',
        sku: 'NTH-HEAT-GUN-PRO-001',
        brand: 'Atten',
        description: 'Digital heat gun with temperature control and LCD display',
        tags: ['heat gun', 'digital', 'temperature control', 'lcd']
      },
      {
        id: 'heat-gun-basic',
        name: 'Basic Heat Gun for Repairs',
        category: 'Repair Tools',
        price: 49.99,
        discount_percentage: 0,
        stock: 60,
        image: '/images/products/basic-heat-gun.jpg',
        sku: 'NTH-HEAT-GUN-BASIC-001',
        brand: 'Generic',
        description: 'Basic heat gun for screen removal and repairs',
        tags: ['heat gun', 'basic', 'screen removal']
      },
      {
        id: 'suction-cup-set',
        name: 'Professional Suction Cup Set - 6 Pieces',
        category: 'Repair Tools',
        price: 29.99,
        discount_percentage: 0,
        stock: 120,
        image: '/images/products/suction-cup-set.jpg',
        sku: 'NTH-SUCTION-6PC-001',
        brand: 'Generic',
        description: 'Various sizes of suction cups for screen removal',
        tags: ['suction cup', 'screen removal', 'various sizes']
      },
      {
        id: 'suction-cup-large',
        name: 'Large Suction Cup for iPad Repairs',
        category: 'Repair Tools',
        price: 19.99,
        discount_percentage: 0,
        stock: 150,
        image: '/images/products/large-suction-cup.jpg',
        sku: 'NTH-SUCTION-LARGE-001',
        brand: 'Generic',
        description: 'Large suction cup specifically for iPad screen removal',
        tags: ['suction cup', 'large', 'ipad', 'screen removal']
      },
      {
        id: 'opening-tool-kit',
        name: 'Plastic Opening Tool Kit - 12 Pieces',
        category: 'Repair Tools',
        price: 24.99,
        discount_percentage: 0,
        stock: 150,
        image: '/images/products/opening-tools.jpg',
        sku: 'NTH-OPENING-TOOLS-001',
        brand: 'iSesamo',
        description: 'Non-conductive plastic pry tools for safe opening',
        tags: ['opening tools', 'plastic', 'pry tools', 'non-conductive']
      },
      {
        id: 'metal-pry-tools',
        name: 'Metal Pry Tool Set - 6 Pieces',
        category: 'Repair Tools',
        price: 34.99,
        discount_percentage: 0,
        stock: 90,
        image: '/images/products/metal-pry-tools.jpg',
        sku: 'NTH-METAL-PRY-TOOLS-001',
        brand: 'Generic',
        description: 'Stainless steel pry tools for professional repairs',
        tags: ['pry tools', 'metal', 'stainless steel', 'professional']
      },
      {
        id: 'microscope-digital',
        name: 'Digital Microscope for Repair Work',
        category: 'Repair Tools',
        price: 79.99,
        discount_percentage: 5,
        stock: 25,
        image: '/images/products/digital-microscope.jpg',
        sku: 'NTH-MICROSCOPE-DIGITAL-001',
        brand: 'Andonstar',
        description: 'USB digital microscope with 200x magnification',
        tags: ['microscope', 'digital', 'usb', '200x magnification']
      },
      {
        id: 'magnifying-lamp',
        name: 'LED Magnifying Lamp with Stand',
        category: 'Repair Tools',
        price: 69.99,
        discount_percentage: 0,
        stock: 40,
        image: '/images/products/magnifying-lamp.jpg',
        sku: 'NTH-MAGNIFYING-LAMP-001',
        brand: 'Generic',
        description: 'LED magnifying lamp with adjustable stand',
        tags: ['magnifying lamp', 'led', 'adjustable stand']
      },
      {
        id: 'glue-adhesive-set',
        name: 'Professional Adhesive Glue Set',
        category: 'Repair Tools',
        price: 34.99,
        discount_percentage: 0,
        stock: 70,
        image: '/images/products/adhesive-set.jpg',
        sku: 'NTH-ADHESIVE-SET-001',
        brand: 'B7000',
        description: 'Various adhesives for screen repairs and assembly',
        tags: ['adhesive', 'glue', 'screen repair', 'assembly']
      },
      {
        id: 'screen-adhesive-tape',
        name: 'Screen Adhesive Tape Roll',
        category: 'Repair Tools',
        price: 14.99,
        discount_percentage: 0,
        stock: 200,
        image: '/images/products/screen-adhesive.jpg',
        sku: 'NTH-SCREEN-ADHESIVE-001',
        brand: 'Generic',
        description: 'Double-sided adhesive tape for screen installation',
        tags: ['adhesive tape', 'screen', 'installation', 'double-sided']
      },
      {
        id: 'anti-static-mat',
        name: 'Anti-Static Work Mat - 24x18 inches',
        category: 'Repair Tools',
        price: 39.99,
        discount_percentage: 0,
        stock: 45,
        image: '/images/products/anti-static-mat.jpg',
        sku: 'NTH-ANTISTATIC-MAT-001',
        brand: 'Generic',
        description: 'ESD safe work surface for electronics repair',
        tags: ['anti-static', 'work mat', 'esd safe', 'electronics']
      },
      {
        id: 'anti-static-wrist-strap',
        name: 'Anti-Static Wrist Strap',
        category: 'Repair Tools',
        price: 12.99,
        discount_percentage: 0,
        stock: 180,
        image: '/images/products/anti-static-wrist-strap.jpg',
        sku: 'NTH-ANTISTATIC-WRIST-001',
        brand: 'Generic',
        description: 'ESD protection wrist strap for safe repairs',
        tags: ['anti-static', 'wrist strap', 'esd protection']
      },
      {
        id: 'soldering-iron-kit',
        name: 'Soldering Iron Kit with Stand',
        category: 'Repair Tools',
        price: 59.99,
        discount_percentage: 0,
        stock: 35,
        image: '/images/products/soldering-iron-kit.jpg',
        sku: 'NTH-SOLDERING-KIT-001',
        brand: 'Generic',
        description: 'Complete soldering kit with iron, stand, and tips',
        tags: ['soldering iron', 'kit', 'stand', 'tips']
      },
      {
        id: 'multimeter-digital',
        name: 'Digital Multimeter for Electronics',
        category: 'Repair Tools',
        price: 44.99,
        discount_percentage: 0,
        stock: 55,
        image: '/images/products/digital-multimeter.jpg',
        sku: 'NTH-MULTIMETER-DIGITAL-001',
        brand: 'Generic',
        description: 'Digital multimeter for electronic testing and diagnostics',
        tags: ['multimeter', 'digital', 'electronics', 'testing']
      },
      {
        id: 'logic-board-tester',
        name: 'Logic Board Tester for iPhone',
        category: 'Repair Tools',
        price: 149.99,
        discount_percentage: 0,
        stock: 20,
        image: '/images/products/logic-board-tester.jpg',
        sku: 'NTH-LOGIC-BOARD-TESTER-001',
        brand: 'Generic',
        description: 'Professional logic board testing device for iPhone repairs',
        tags: ['logic board', 'tester', 'iphone', 'diagnostics']
      },
      {
        id: 'battery-tester',
        name: 'Battery Health Tester',
        category: 'Repair Tools',
        price: 79.99,
        discount_percentage: 0,
        stock: 40,
        image: '/images/products/battery-tester.jpg',
        sku: 'NTH-BATTERY-TESTER-001',
        brand: 'Generic',
        description: 'Professional battery testing and health analysis tool',
        tags: ['battery tester', 'health', 'analysis', 'professional']
      }
    ];

    if (categoryInfo.apiCategory === 'all') {
      return allProducts;
    }

    return allProducts.filter(product => product.category === categoryInfo.apiCategory);
  };

  // Load products when slug changes
  useEffect(() => {
    if (slug) {
      const categorySlug = Array.isArray(slug) ? slug[0] : slug;
      fetchProducts(categorySlug);
    }
  }, [slug]);

  // Handle loading state
  if (router.isFallback) {
    return (
      <Layout title="Loading..." description="Loading products...">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const categorySlug = Array.isArray(slug) ? slug[0] : slug;
  const categoryInfo = getCategoryInfo(categorySlug);

  return (
    <Layout
      title={`${categoryInfo.name} - Nexus Tech Hub`}
      description={categoryInfo.description}
    >
      <div className={styles.productsPage}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/products">Products</Link>
                <span>/</span>
                <span>{categoryInfo.name}</span>
              </div>

              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>{categoryInfo.name}</h1>
                <p className={styles.heroDescription}>{categoryInfo.description}</p>

                {/* Quick Stats */}
                <div className={styles.heroStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>
                      {products.length > 0 ? products.length : '50+'}
                    </span>
                    <span className={styles.statLabel}>Products</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>24/7</span>
                    <span className={styles.statLabel}>Support</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>1 Year</span>
                    <span className={styles.statLabel}>Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Category Navigation */}
          <div className={styles.categoryNav}>
            <div className={styles.categoryNavWrapper}>
              <Link href="/products" className={`${styles.categoryButton} ${!categorySlug ? styles.active : ''}`}>
                <span className={styles.categoryIcon}>📦</span>
                <span>All Products</span>
              </Link>
              <Link href="/products/iphone-parts" className={`${styles.categoryButton} ${categorySlug === 'iphone-parts' ? styles.active : ''}`}>
                <span className={styles.categoryIcon}>📱</span>
                <span>iPhone Parts</span>
              </Link>
              <Link href="/products/samsung-parts" className={`${styles.categoryButton} ${categorySlug === 'samsung-parts' ? styles.active : ''}`}>
                <span className={styles.categoryIcon}>📱</span>
                <span>Samsung Parts</span>
              </Link>
              <Link href="/products/ipad-parts" className={`${styles.categoryButton} ${categorySlug === 'ipad-parts' ? styles.active : ''}`}>
                <span className={styles.categoryIcon}>📱</span>
                <span>iPad Parts</span>
              </Link>
              <Link href="/products/repair-tools" className={`${styles.categoryButton} ${categorySlug === 'repair-tools' ? styles.active : ''}`}>
                <span className={styles.categoryIcon}>🔧</span>
                <span>Repair Tools</span>
              </Link>
            </div>
          </div>

          {/* Filters and Sorting */}
          <div className={styles.filtersSection}>
            <div className={styles.filtersWrapper}>
              <div className={styles.resultsCount}>
                <span>{products.length} products found</span>
              </div>

              <div className={styles.filters}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Sort by:</label>
                  <select className={styles.filterSelect}>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Price Range:</label>
                  <select className={styles.filterSelect}>
                    <option value="all">All Prices</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200+">$200+</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Availability:</label>
                  <select className={styles.filterSelect}>
                    <option value="all">All Products</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className={styles.loadingSection}>
              <div className={styles.loadingSpinner}></div>
              <h3>Loading {categoryInfo.name.toLowerCase()}...</h3>
              <p>Please wait while we fetch the latest products</p>
            </div>
          ) : error ? (
            <div className={styles.errorSection}>
              <div className={styles.errorIcon}>⚠️</div>
              <h3>Error Loading Products</h3>
              <p>{error}</p>
              <button onClick={() => fetchProducts(categorySlug)} className={styles.retryButton}>
                Try Again
              </button>
            </div>
          ) : (
            <div className={styles.productsSection}>
              <ProductGrid
                products={products}
                categoryTitle={categoryInfo.name}
              />
            </div>
          )}

          {/* Category Information */}
          {categorySlug && !loading && !error && (
            <div className={styles.categoryInfoSection}>
              <div className={styles.categoryInfo}>
                <div className={styles.categoryHeader}>
                  <h2>About {categoryInfo.name}</h2>
                  <div className={styles.categoryBadge}>
                    <span className={styles.badgeIcon}>
                      {categorySlug === 'iphone-parts' ? '🍎' :
                       categorySlug === 'samsung-parts' ? '📱' :
                       categorySlug === 'ipad-parts' ? '📱' :
                       categorySlug === 'repair-tools' ? '🔧' : '📦'}
                    </span>
                    <span>Premium Quality</span>
                  </div>
                </div>

                {categorySlug === 'iphone-parts' && (
                  <div className={styles.categoryContent}>
                    <p className={styles.categoryDescription}>
                      We carry genuine Apple parts and high-quality compatible replacements for all iPhone models
                      from iPhone 6 to iPhone 15 series. Our parts are sourced from trusted manufacturers and
                      come with comprehensive warranties.
                    </p>
                    <div className={styles.categoryFeatures}>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>📱</div>
                        <div className={styles.featureContent}>
                          <h4>Screen Assemblies</h4>
                          <p>OLED and LCD screens with touch digitizer included</p>
                        </div>
                      </div>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>🔋</div>
                        <div className={styles.featureContent}>
                          <h4>Batteries</h4>
                          <p>Original capacity batteries with 1-year warranty</p>
                        </div>
                      </div>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>⚡</div>
                        <div className={styles.featureContent}>
                          <h4>Charging Ports</h4>
                          <p>Lightning and USB-C charging assemblies</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {categorySlug === 'samsung-parts' && (
                  <div className={styles.categoryContent}>
                    <p className={styles.categoryDescription}>
                      Complete range of parts for Samsung Galaxy S, Note, A, and Z series devices.
                      All parts are tested for compatibility and come with manufacturer warranties.
                    </p>
                    <div className={styles.categoryFeatures}>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>📱</div>
                        <div className={styles.featureContent}>
                          <h4>AMOLED Screens</h4>
                          <p>High-quality AMOLED displays for all Galaxy models</p>
                        </div>
                      </div>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>🔋</div>
                        <div className={styles.featureContent}>
                          <h4>Batteries</h4>
                          <p>Original and compatible batteries with warranty</p>
                        </div>
                      </div>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>⚡</div>
                        <div className={styles.featureContent}>
                          <h4>USB-C Ports</h4>
                          <p>Complete charging port assemblies</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {categorySlug === 'ipad-parts' && (
                  <div className={styles.categoryContent}>
                    <p className={styles.categoryDescription}>
                      Professional replacement parts for all iPad models including iPad Pro, iPad Air, and iPad Mini.
                      All parts are designed for easy installation and maximum compatibility.
                    </p>
                    <div className={styles.categoryFeatures}>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>📱</div>
                        <div className={styles.featureContent}>
                          <h4>LCD Assemblies</h4>
                          <p>High-resolution LCD screens with digitizer</p>
                        </div>
                      </div>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>🔋</div>
                        <div className={styles.featureContent}>
                          <h4>Batteries</h4>
                          <p>High-capacity batteries for extended use</p>
                        </div>
                      </div>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>🏠</div>
                        <div className={styles.featureContent}>
                          <h4>Home Buttons</h4>
                          <p>Touch ID and Face ID components</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {categorySlug === 'repair-tools' && (
                  <div className={styles.categoryContent}>
                    <p className={styles.categoryDescription}>
                      Complete toolkit for professional mobile device technicians and DIY enthusiasts.
                      All tools are designed for precision work and long-lasting durability.
                    </p>
                    <div className={styles.categoryFeatures}>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>🔧</div>
                        <div className={styles.featureContent}>
                          <h4>Precision Tools</h4>
                          <p>Screwdrivers, pry tools, and specialized equipment</p>
                        </div>
                      </div>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>📦</div>
                        <div className={styles.featureContent}>
                          <h4>Tool Kits</h4>
                          <p>Complete sets for specific device repairs</p>
                        </div>
                      </div>
                      <div className={styles.feature}>
                        <div className={styles.featureIcon}>🔥</div>
                        <div className={styles.featureContent}>
                          <h4>Heat Equipment</h4>
                          <p>Professional heat guns and adhesive removers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaText}>
                <h2>Need Help Finding the Right Part?</h2>
                <p>Our expert technicians are here to help you find the perfect replacement parts for your repair needs.</p>
              </div>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className={styles.ctaPrimary}>
                  <span>Contact Support</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </Link>
                <Link href="/products" className={styles.ctaSecondary}>
                  <span>Browse All Products</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Enable static generation for better performance
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: ['iphone-parts'] } },
      { params: { slug: ['samsung-parts'] } },
      { params: { slug: ['ipad-parts'] } },
      { params: { slug: ['repair-tools'] } }
    ],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {},
    revalidate: 60 // Regenerate page every 60 seconds
  };
}
