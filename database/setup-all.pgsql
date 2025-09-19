-- language: postgresql
-- Add iPhone 17 Air Products to Existing Database
-- Run this script in Supabase SQL Editor to add iPhone 17 Air products

-- Insert iPhone 17 Air products (assuming iPhone category exists)
INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, brand, category_id, image_url) VALUES
('iPhone 17 Air Screen', 'iphone-17-air-screen', 'IPH17A-SCRN-001', 'Super Retina XDR OLED display for iPhone 17 Air with Dynamic Island', 349.99, 8, 60, true, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone' LIMIT 1), '/images/products/iphone-17-air-screen.jpg'),
('iPhone 17 Air Battery', 'iphone-17-air-battery', 'IPH17A-BATT-001', 'Lithium-ion battery replacement for iPhone 17 Air with fast charging support', 79.99, 0, 120, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone' LIMIT 1), '/images/products/iphone-17-air-battery.jpg'),
('iPhone 17 Air Charging Port', 'iphone-17-air-charging-port', 'IPH17A-CHRG-001', 'USB-C charging assembly for iPhone 17 Air with Lightning compatibility', 49.99, 5, 90, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone' LIMIT 1), '/images/products/iphone-17-air-charging-port.jpg'),
('iPhone 17 Air Camera Module', 'iphone-17-air-camera-module', 'IPH17A-CAM-001', 'Dual camera system for iPhone 17 Air with advanced computational photography', 149.99, 10, 40, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone' LIMIT 1), '/images/products/iphone-17-air-camera.jpg'),
('iPhone 17 Air Frame', 'iphone-17-air-frame', 'IPH17A-FRAME-001', 'Aluminum frame replacement for iPhone 17 Air with Ceramic Shield', 179.99, 0, 35, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone' LIMIT 1), '/images/products/iphone-17-air-frame.jpg');
