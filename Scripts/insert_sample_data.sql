-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('iPhone Parts', 'iphone-parts', 'High-quality replacement parts for iPhone devices'),
('Samsung Parts', 'samsung-parts', 'Genuine Samsung replacement components'),
('iPad Parts', 'ipad-parts', 'iPad screens, batteries, and accessories'),
('Tools', 'tools', 'Professional repair tools and equipment'),
('MacBook Parts', 'macbook-parts', 'MacBook repair parts and components')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, is_new, category_id, brand) VALUES
('iPhone 15 Pro Screen', 'iphone-15-pro-screen', 'IP15P-SCR-001', 'High-quality OLED screen replacement for iPhone 15 Pro with premium glass', 299.99, 0, 50, true, true, (SELECT id FROM categories WHERE slug = 'iphone-parts'), 'Apple'),
('Samsung S24 Battery', 'samsung-s24-battery', 'SS24-BAT-001', 'Original Samsung battery for Galaxy S24 with 5000mAh capacity', 89.99, 10, 100, false, true, (SELECT id FROM categories WHERE slug = 'samsung-parts'), 'Samsung'),
('iPad Pro 12.9" Screen', 'ipad-pro-12-9-screen', 'IPAD12-SCR-001', 'Liquid Retina XDR display replacement for iPad Pro 12.9"', 399.99, 0, 25, true, false, (SELECT id FROM categories WHERE slug = 'ipad-parts'), 'Apple'),
('Professional Repair Kit', 'professional-repair-kit', 'TOOL-KIT-001', 'Complete repair toolkit with precision screwdrivers and tools', 149.99, 15, 30, true, false, (SELECT id FROM categories WHERE slug = 'tools'), 'Generic'),
('iPhone 15 Pro Max Screen', 'iphone-15-pro-max-screen', 'IP15PM-SCR-001', 'Premium OLED screen for iPhone 15 Pro Max with advanced touch technology', 349.99, 0, 40, false, true, (SELECT id FROM categories WHERE slug = 'iphone-parts'), 'Apple'),
('Samsung Z Fold 5 Hinge', 'samsung-z-fold-5-hinge', 'SZF5-HNG-001', 'Replacement hinge mechanism for Samsung Galaxy Z Fold 5', 129.99, 0, 20, false, true, (SELECT id FROM categories WHERE slug = 'samsung-parts'), 'Samsung'),
('MacBook Pro 16" Screen', 'macbook-pro-16-screen', 'MBP16-SCR-001', 'Retina display replacement for MacBook Pro 16" with True Tone', 599.99, 5, 15, true, false, (SELECT id FROM categories WHERE slug = 'macbook-parts'), 'Apple'),
('Soldering Station Pro', 'soldering-station-pro', 'SOLDER-PRO-001', 'Professional digital soldering station with temperature control', 199.99, 0, 25, false, true, (SELECT id FROM categories WHERE slug = 'tools'), 'Generic'),
('iPhone 14 Screen', 'iphone-14-screen', 'IP14-SCR-001', 'High-quality LCD screen replacement for iPhone 14', 249.99, 0, 60, false, false, (SELECT id FROM categories WHERE slug = 'iphone-parts'), 'Apple'),
('Samsung S23 Battery', 'samsung-s23-battery', 'SS23-BAT-001', 'Replacement battery for Samsung Galaxy S23 series', 69.99, 0, 80, false, false, (SELECT id FROM categories WHERE slug = 'samsung-parts'), 'Samsung'),
('iPad Air 5 Screen', 'ipad-air-5-screen', 'IPA5-SCR-001', 'Liquid Retina display for iPad Air 5th generation', 299.99, 10, 35, false, false, (SELECT id FROM categories WHERE slug = 'ipad-parts'), 'Apple'),
('Screwdriver Set 64pcs', 'screwdriver-set-64pcs', 'SCREW-64-001', 'Professional precision screwdriver set with 64 pieces', 79.99, 0, 45, true, false, (SELECT id FROM categories WHERE slug = 'tools'), 'Generic')
ON CONFLICT (slug) DO NOTHING;

-- Insert product images (using placeholder URLs - replace with actual image URLs)
INSERT INTO product_images (product_id, image_url, is_primary, display_order) VALUES
((SELECT id FROM products WHERE slug = 'iphone-15-pro-screen'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'samsung-s24-battery'), 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'ipad-pro-12-9-screen'), 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'professional-repair-kit'), 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'iphone-15-pro-max-screen'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'samsung-z-fold-5-hinge'), 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'macbook-pro-16-screen'), 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'soldering-station-pro'), 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'iphone-14-screen'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'samsung-s23-battery'), 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'ipad-air-5-screen'), 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop', true, 1),
((SELECT id FROM products WHERE slug = 'screwdriver-set-64pcs'), 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop', true, 1)
ON CONFLICT DO NOTHING;

-- Insert product specifications for a few products
INSERT INTO product_specifications (product_id, display, processor, memory, storage, camera, battery, operating_system) VALUES
((SELECT id FROM products WHERE slug = 'iphone-15-pro-screen'), '6.1" Super Retina XDR OLED', 'A17 Pro chip', '8GB RAM', '128GB-1TB', '48MP Triple Camera', '3274mAh', 'iOS 17'),
((SELECT id FROM products WHERE slug = 'samsung-s24-battery'), '6.2" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '8GB RAM', '128GB-512GB', '50MP Triple Camera', '4000mAh', 'Android 14'),
((SELECT id FROM products WHERE slug = 'ipad-pro-12-9-screen'), '12.9" Liquid Retina XDR', 'M2 chip', '8GB-16GB RAM', '128GB-2TB', '12MP Wide', '40.88Wh', 'iPadOS 17')
ON CONFLICT DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (product_id, user_id, rating, title, comment) VALUES
((SELECT id FROM products WHERE slug = 'iphone-15-pro-screen'), NULL, 5, 'Excellent quality', 'Perfect replacement screen, works flawlessly'),
((SELECT id FROM products WHERE slug = 'samsung-s24-battery'), NULL, 4, 'Good battery life', 'Battery performs well, good value for money'),
((SELECT id FROM products WHERE slug = 'professional-repair-kit'), NULL, 5, 'Professional tools', 'High-quality tools, essential for repairs')
ON CONFLICT DO NOTHING;
