-- language: postgresql
-- Complete Nexus Tech Hub Database Setup
-- Run this script in Supabase SQL Editor to set up all tables, categories, and products
-- PostgreSQL syntax - Compatible with Supabase

-- ==========================================
-- 1. CREATE TABLES (from schema.sql)
-- ==========================================

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255),
    parent_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    sku VARCHAR(50) UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount_percentage DECIMAL(5, 2),
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(255),
    weight DECIMAL(8, 2),
    dimensions VARCHAR(50),
    category_id INTEGER REFERENCES categories(id),
    brand VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Product Specifications Table
CREATE TABLE product_specifications (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    display VARCHAR(255),
    processor VARCHAR(255),
    memory VARCHAR(255),
    storage VARCHAR(255),
    camera VARCHAR(255),
    battery VARCHAR(255),
    connectivity VARCHAR(255),
    operating_system VARCHAR(255),
    additional_features TEXT
);

-- Product Images Table (for multiple images per product)
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

-- Product Variants Table (for color, size, etc.)
CREATE TABLE product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    variant_type VARCHAR(50) NOT NULL, -- e.g., 'color', 'size', 'capacity'
    variant_value VARCHAR(50) NOT NULL,
    price_adjustment DECIMAL(10, 2) DEFAULT 0.00,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    sku VARCHAR(50) UNIQUE
);

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User Addresses Table
CREATE TABLE user_addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    address_type VARCHAR(20) DEFAULT 'shipping', -- 'shipping', 'billing', 'both'
);

-- Shopping Cart Table
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100), -- For guest users
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items Table
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    variant_id INTEGER REFERENCES product_variants(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price_at_addition DECIMAL(10, 2) NOT NULL
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address_id INTEGER REFERENCES user_addresses(id),
    billing_address_id INTEGER REFERENCES user_addresses(id),
    shipping_method VARCHAR(50),
    shipping_cost DECIMAL(10, 2) DEFAULT 0.00,
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    variant_id INTEGER REFERENCES product_variants(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

-- Reviews Table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255),
    comment TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Wishlist Table
CREATE TABLE wishlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Wishlist Items Table
CREATE TABLE wishlist_items (
    id SERIAL PRIMARY KEY,
    wishlist_id INTEGER REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscribers Table
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_is_new ON products(is_new);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_is_active ON newsletter_subscribers(is_active);

-- Create triggers for all tables with updated_at column

-- Function to update updated_at column
DROP FUNCTION IF EXISTS update_updated_at_column();
CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS '
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
';

-- Create triggers for each table
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carts_updated_at
    BEFORE UPDATE ON carts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at
    BEFORE UPDATE ON newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 2. INSERT CATEGORIES (from categories-seed.sql)
-- ==========================================

-- Insert main categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Apple', 'apple', 'Premium Apple products including iPhone, iPad, Mac, and accessories', '/images/categories/apple.jpg'),
('Samsung', 'samsung', 'Samsung Galaxy devices and accessories', '/images/categories/samsung.jpg'),
('Motorola', 'motorola', 'Motorola smartphones and devices', '/images/categories/motorola.jpg'),
('Google', 'google', 'Google Pixel devices and accessories', '/images/categories/google.jpg'),
('Other Parts', 'other-parts', 'Parts and accessories for other brands', '/images/categories/other-parts.jpg'),
('Game Console', 'game-console', 'Gaming consoles and accessories', '/images/categories/game-console.jpg'),
('Accessories', 'accessories', 'Phone and device accessories', '/images/categories/accessories.jpg'),
('Tools & Supplies', 'tools-supplies', 'Repair tools and workshop supplies', '/images/categories/tools-supplies.jpg'),
('Refurbishing', 'refurbishing', 'Refurbished devices and parts', '/images/categories/refurbishing.jpg'),
('Board Components', 'board-components', 'Electronic board components and parts', '/images/categories/board-components.jpg'),
('Pre-Owned Devices', 'pre-owned-devices', 'Pre-owned and refurbished devices', '/images/categories/pre-owned.jpg');

-- Insert Apple subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('iPhone', 'iphone', 'iPhone models and parts', (SELECT id FROM categories WHERE slug = 'apple')),
('iPad', 'ipad', 'iPad tablets and accessories', (SELECT id FROM categories WHERE slug = 'apple')),
('Watch', 'watch', 'Apple Watch devices', (SELECT id FROM categories WHERE slug = 'apple')),
('iPod', 'ipod', 'iPod devices', (SELECT id FROM categories WHERE slug = 'apple')),
('AirPods', 'airpods', 'AirPods wireless earbuds', (SELECT id FROM categories WHERE slug = 'apple')),
('iMac', 'imac', 'iMac desktop computers', (SELECT id FROM categories WHERE slug = 'apple')),
('MacBook Pro', 'macbook-pro', 'MacBook Pro laptops', (SELECT id FROM categories WHERE slug = 'apple')),
('MacBook Air', 'macbook-air', 'MacBook Air laptops', (SELECT id FROM categories WHERE slug = 'apple')),
('MacBook', 'macbook', 'MacBook laptops', (SELECT id FROM categories WHERE slug = 'apple')),
('Apollo SSDs', 'apollo-ssds', 'Apollo SSD storage solutions', (SELECT id FROM categories WHERE slug = 'apple'));

-- Insert Samsung subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('S Series', 's-series', 'Galaxy S series smartphones', (SELECT id FROM categories WHERE slug = 'samsung')),
('Note Series', 'note-series', 'Galaxy Note series devices', (SELECT id FROM categories WHERE slug = 'samsung')),
('A Series', 'a-series', 'Galaxy A series smartphones', (SELECT id FROM categories WHERE slug = 'samsung')),
('Z Series', 'z-series', 'Galaxy Z foldable devices', (SELECT id FROM categories WHERE slug = 'samsung')),
('J Series', 'j-series', 'Galaxy J series smartphones', (SELECT id FROM categories WHERE slug = 'samsung')),
('Tab A Series', 'tab-a-series', 'Galaxy Tab A tablets', (SELECT id FROM categories WHERE slug = 'samsung')),
('Tab S Series', 'tab-s-series', 'Galaxy Tab S tablets', (SELECT id FROM categories WHERE slug = 'samsung')),
('Tab Active Series', 'tab-active-series', 'Galaxy Tab Active rugged tablets', (SELECT id FROM categories WHERE slug = 'samsung')),
('Tab Note Series', 'tab-note-series', 'Galaxy Tab Note devices', (SELECT id FROM categories WHERE slug = 'samsung')),
('Tab Series', 'tab-series', 'Other Galaxy Tab devices', (SELECT id FROM categories WHERE slug = 'samsung')),
('XCover Series', 'xcover-series', 'Galaxy XCover rugged phones', (SELECT id FROM categories WHERE slug = 'samsung')),
('Watch Series', 'watch-series', 'Galaxy Watch smartwatches', (SELECT id FROM categories WHERE slug = 'samsung')),
('Mega Series', 'mega-series', 'Galaxy Mega large-screen phones', (SELECT id FROM categories WHERE slug = 'samsung')),
('M Series', 'm-series', 'Galaxy M series smartphones', (SELECT id FROM categories WHERE slug = 'samsung')),
('Core Series', 'core-series', 'Galaxy Core series devices', (SELECT id FROM categories WHERE slug = 'samsung')),
('Grand Series', 'grand-series', 'Galaxy Grand series phones', (SELECT id FROM categories WHERE slug = 'samsung')),
('F Series', 'f-series', 'Galaxy F series smartphones', (SELECT id FROM categories WHERE slug = 'samsung')),
('Book Series', 'book-series', 'Galaxy Book laptops', (SELECT id FROM categories WHERE slug = 'samsung')),
('Chromebook Series', 'chromebook-series', 'Samsung Chromebooks', (SELECT id FROM categories WHERE slug = 'samsung')),
('Others', 'others', 'Other Samsung devices', (SELECT id FROM categories WHERE slug = 'samsung'));

-- Insert Motorola subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Moto G Series', 'moto-g-series', 'Moto G series smartphones', (SELECT id FROM categories WHERE slug = 'motorola')),
('Moto E Series', 'moto-e-series', 'Moto E series smartphones', (SELECT id FROM categories WHERE slug = 'motorola')),
('Moto Edge Series', 'moto-edge-series', 'Moto Edge series devices', (SELECT id FROM categories WHERE slug = 'motorola')),
('Razr Series', 'razr-series', 'Razr foldable smartphones', (SELECT id FROM categories WHERE slug = 'motorola')),
('Moto One Series', 'moto-one-series', 'Moto One series devices', (SELECT id FROM categories WHERE slug = 'motorola')),
('Droid Series', 'droid-series', 'Droid series devices', (SELECT id FROM categories WHERE slug = 'motorola')),
('Moto Z Series', 'moto-z-series', 'Moto Z modular devices', (SELECT id FROM categories WHERE slug = 'motorola')),
('X Series', 'x-series', 'Moto X series devices', (SELECT id FROM categories WHERE slug = 'motorola')),
('Watch Series', 'watch-series', 'Moto 360 smartwatches', (SELECT id FROM categories WHERE slug = 'motorola'));

-- Insert Google subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Pixel', 'pixel-series', 'Google Pixel smartphones', (SELECT id FROM categories WHERE slug = 'google')),
('Pixelbook', 'pixelbook-series', 'Pixelbook laptops', (SELECT id FROM categories WHERE slug = 'google')),
('Pixel Tablet', 'pixel-tablet-series', 'Pixel Tablet devices', (SELECT id FROM categories WHERE slug = 'google'));

-- Insert Other Parts subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('LG', 'lg-series', 'LG smartphones and devices', (SELECT id FROM categories WHERE slug = 'other-parts')),
('Microsoft', 'microsoft-series', 'Microsoft devices', (SELECT id FROM categories WHERE slug = 'other-parts')),
('Asus', 'asus-series', 'Asus devices', (SELECT id FROM categories WHERE slug = 'other-parts')),
('OnePlus', 'oneplus-series', 'OnePlus smartphones', (SELECT id FROM categories WHERE slug = 'other-parts')),
('ZTE', 'zte-series', 'ZTE devices', (SELECT id FROM categories WHERE slug = 'other-parts')),
('Huawei', 'huawei-series', 'Huawei devices', (SELECT id FROM categories WHERE slug = 'other-parts')),
('Xiaomi', 'xiaomi-series', 'Xiaomi devices', (SELECT id FROM categories WHERE slug = 'other-parts')),
('Sony', 'sony-series', 'Sony devices', (SELECT id FROM categories WHERE slug = 'other-parts')),
('TCL', 'tcl-series', 'TCL devices', (SELECT id FROM categories WHERE slug = 'other-parts')),
('Lenovo', 'lenovo-series', 'Lenovo devices', (SELECT id FROM categories WHERE slug = 'other-parts')),
('Amazon', 'amazon-series', 'Amazon devices', (SELECT id FROM categories WHERE slug = 'other-parts'));

-- Insert Game Console subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Microsoft', 'microsoft-series', 'Xbox gaming consoles', (SELECT id FROM categories WHERE slug = 'game-console')),
('Sony', 'sony-series', 'PlayStation gaming consoles', (SELECT id FROM categories WHERE slug = 'game-console')),
('Nintendo', 'nintendo-series', 'Nintendo gaming consoles', (SELECT id FROM categories WHERE slug = 'game-console')),
('Oculus', 'oculus-series', 'Meta Quest VR headsets', (SELECT id FROM categories WHERE slug = 'game-console')),
('Valve', 'valve-series', 'Steam Deck and Valve devices', (SELECT id FROM categories WHERE slug = 'game-console'));

-- Insert Accessories subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Recently Added', 'recently-added', 'Newly added accessories', (SELECT id FROM categories WHERE slug = 'accessories')),
('Brands', 'brands', 'Accessories by brand', (SELECT id FROM categories WHERE slug = 'accessories')),
('Categories', 'categories', 'Accessories by category', (SELECT id FROM categories WHERE slug = 'accessories')),
('Recent Add', 'recent-add', 'Recently added items', (SELECT id FROM categories WHERE slug = 'accessories'));

-- Insert Tools & Supplies subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Shop by Brand', 'shop-by-brand', 'Tools organized by brand', (SELECT id FROM categories WHERE slug = 'tools-supplies')),
('Essentials', 'essentials', 'Essential repair tools', (SELECT id FROM categories WHERE slug = 'tools-supplies')),
('OEM Service Tools', 'oem-service-tools', 'Original equipment manufacturer tools', (SELECT id FROM categories WHERE slug = 'tools-supplies')),
('Supplies', 'supplies', 'Workshop supplies', (SELECT id FROM categories WHERE slug = 'tools-supplies')),
('Back Glass Repair', 'back-glass-repair', 'Back glass repair tools and supplies', (SELECT id FROM categories WHERE slug = 'tools-supplies')),
('Testing Devices', 'testing-devices', 'Device testing equipment', (SELECT id FROM categories WHERE slug = 'tools-supplies')),
('Microsoldering', 'microsoldering', 'Microsoldering equipment', (SELECT id FROM categories WHERE slug = 'tools-supplies')),
('Soldering Supplies', 'soldering-supplies', 'Soldering materials and supplies', (SELECT id FROM categories WHERE slug = 'tools-supplies')),
('Refurbishing', 'refurbishing', 'Refurbishing tools and supplies', (SELECT id FROM categories WHERE slug = 'tools-supplies')),
('ScrewBox Refills', 'screwbox-refills', 'Screw organizer refills', (SELECT id FROM categories WHERE slug = 'tools-supplies'));

-- Insert Refurbishing subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('iPhone', 'iphone-series', 'Refurbished iPhone devices', (SELECT id FROM categories WHERE slug = 'refurbishing')),
('iPad', 'ipad-series', 'Refurbished iPad devices', (SELECT id FROM categories WHERE slug = 'refurbishing')),
('Watch', 'watch-series', 'Refurbished Apple Watch devices', (SELECT id FROM categories WHERE slug = 'refurbishing')),
('Galaxy S Series', 'galaxy-s-series', 'Refurbished Galaxy S devices', (SELECT id FROM categories WHERE slug = 'refurbishing')),
('Galaxy Note Series', 'galaxy-note-series', 'Refurbished Galaxy Note devices', (SELECT id FROM categories WHERE slug = 'refurbishing')),
('Galaxy J Series', 'galaxy-j-series', 'Refurbished Galaxy J devices', (SELECT id FROM categories WHERE slug = 'refurbishing')),
('Galaxy A Series', 'galaxy-a-series', 'Refurbished Galaxy A devices', (SELECT id FROM categories WHERE slug = 'refurbishing')),
('Galaxy Tab Series', 'galaxy-tab-series', 'Refurbished Galaxy Tab devices', (SELECT id FROM categories WHERE slug = 'refurbishing')),
('Google', 'google-series', 'Refurbished Google devices', (SELECT id FROM categories WHERE slug = 'refurbishing')),
('Motorola', 'motorola-series', 'Refurbished Motorola devices', (SELECT id FROM categories WHERE slug = 'refurbishing'));

-- Insert Board Components subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Interactive View', 'interactive-view', 'Interactive board component views', (SELECT id FROM categories WHERE slug = 'board-components')),
('iPhone', 'iphone-series', 'iPhone board components', (SELECT id FROM categories WHERE slug = 'board-components')),
('iPad', 'ipad-series', 'iPad board components', (SELECT id FROM categories WHERE slug = 'board-components')),
('Galaxy S Series', 'galaxy-s-series', 'Galaxy S board components', (SELECT id FROM categories WHERE slug = 'board-components')),
('Galaxy Note Series', 'galaxy-note-series', 'Galaxy Note board components', (SELECT id FROM categories WHERE slug = 'board-components'));

-- ==========================================
-- 3. INSERT PRODUCTS (from products-seed.sql)
-- ==========================================

-- iPhone Parts (Apple > iPhone) - 20 products
INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, brand, category_id, image_url) VALUES
('iPhone 17 Air Screen', 'iphone-17-air-screen', 'IPH17A-SCRN-001', 'Super Retina XDR OLED display for iPhone 17 Air with Dynamic Island', 349.99, 8, 60, true, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-17-air-screen.jpg'),
('iPhone 17 Air Battery', 'iphone-17-air-battery', 'IPH17A-BATT-001', 'Lithium-ion battery replacement for iPhone 17 Air with fast charging support', 79.99, 0, 120, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-17-air-battery.jpg'),
('iPhone 17 Air Charging Port', 'iphone-17-air-charging-port', 'IPH17A-CHRG-001', 'USB-C charging assembly for iPhone 17 Air with Lightning compatibility', 49.99, 5, 90, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-17-air-charging-port.jpg'),
('iPhone 17 Air Camera Module', 'iphone-17-air-camera-module', 'IPH17A-CAM-001', 'Dual camera system for iPhone 17 Air with advanced computational photography', 149.99, 10, 40, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-17-air-camera.jpg'),
('iPhone 17 Air Frame', 'iphone-17-air-frame', 'IPH17A-FRAME-001', 'Aluminum frame replacement for iPhone 17 Air with Ceramic Shield', 179.99, 0, 35, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-17-air-frame.jpg'),
('iPhone 15 Pro Max Screen', 'iphone-15-pro-max-screen', 'IPH15PM-SCRN-001', 'Original OEM screen replacement for iPhone 15 Pro Max with premium glass and LCD', 299.99, 10, 50, true, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-pro-max-screen.jpg'),
('iPhone 15 Pro Battery', 'iphone-15-pro-battery', 'IPH15P-BATT-001', 'Genuine Apple battery replacement for iPhone 15 Pro with 1-year warranty', 89.99, 5, 100, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-pro-battery.jpg'),
('iPhone 15 Pro Max Charging Port', 'iphone-15-pro-max-charging-port', 'IPH15PM-CHRG-001', 'USB-C charging port assembly for iPhone 15 Pro Max with flex cable', 49.99, 0, 75, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-pro-max-charging-port.jpg'),
('iPhone 15 Pro Camera Module', 'iphone-15-pro-camera-module', 'IPH15P-CAM-001', 'Triple camera module replacement for iPhone 15 Pro with lens protection', 149.99, 15, 30, true, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-pro-camera.jpg'),
('iPhone 15 Pro Max Frame', 'iphone-15-pro-max-frame', 'IPH15PM-FRAME-001', 'Titanium frame replacement for iPhone 15 Pro Max with all ports', 199.99, 0, 25, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-pro-max-frame.jpg'),
('iPhone 15 Screen', 'iphone-15-screen', 'IPH15-SCRN-001', 'Super Retina XDR OLED screen for iPhone 15 with Dynamic Island', 249.99, 8, 60, true, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-screen.jpg'),
('iPhone 15 Battery', 'iphone-15-battery', 'IPH15-BATT-001', 'Lithium-ion battery replacement for iPhone 15 with fast charging support', 69.99, 0, 120, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-battery.jpg'),
('iPhone 15 Charging Port', 'iphone-15-charging-port', 'IPH15-CHRG-001', 'USB-C charging assembly for iPhone 15 with Lightning compatibility', 39.99, 5, 90, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-charging-port.jpg'),
('iPhone 15 Camera', 'iphone-15-camera', 'IPH15-CAM-001', 'Dual camera system for iPhone 15 with advanced computational photography', 119.99, 10, 40, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-camera.jpg'),
('iPhone 15 Frame', 'iphone-15-frame', 'IPH15-FRAME-001', 'Aluminum frame replacement for iPhone 15 with Ceramic Shield', 149.99, 0, 35, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-15-frame.jpg'),
('iPhone 14 Pro Max Screen', 'iphone-14-pro-max-screen', 'IPH14PM-SCRN-001', 'Super Retina XDR OLED display for iPhone 14 Pro Max', 279.99, 12, 45, true, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-14-pro-max-screen.jpg'),
('iPhone 14 Pro Battery', 'iphone-14-pro-battery', 'IPH14P-BATT-001', 'High-capacity battery for iPhone 14 Pro with MagSafe compatibility', 79.99, 0, 85, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-14-pro-battery.jpg'),
('iPhone 14 Pro Max Camera', 'iphone-14-pro-max-camera-module', 'IPH14PM-CAM-001', 'Pro camera system with 48MP main sensor for iPhone 14 Pro Max', 169.99, 8, 28, true, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-14-pro-max-camera.jpg'),
('iPhone 14 Screen', 'iphone-14-screen', 'IPH14-SCRN-001', 'Super Retina XDR display for iPhone 14 with Ceramic Shield', 229.99, 10, 55, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-14-screen.jpg'),
('iPhone 14 Battery', 'iphone-14-battery', 'IPH14-BATT-001', 'Optimized battery replacement for iPhone 14', 59.99, 0, 95, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-14-battery.jpg'),
('iPhone 13 Pro Max Screen', 'iphone-13-pro-max-screen', 'IPH13PM-SCRN-001', 'ProMotion OLED display for iPhone 13 Pro Max with 120Hz refresh rate', 259.99, 15, 40, true, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-13-pro-max-screen.jpg'),
('iPhone 13 Pro Battery', 'iphone-13-pro-battery', 'IPH13P-BATT-001', 'Long-lasting battery for iPhone 13 Pro with MagSafe wireless charging', 69.99, 5, 70, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-13-pro-battery.jpg'),
('iPhone 13 Camera Module', 'iphone-13-camera-module', 'IPH13-CAM-001', 'Advanced dual camera system for iPhone 13 with Cinematic mode', 99.99, 0, 50, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-13-camera.jpg'),
('iPhone 13 Screen', 'iphone-13-screen', 'IPH13-SCRN-001', 'Super Retina XDR display for iPhone 13', 199.99, 12, 65, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-13-screen.jpg'),
('iPhone 13 Battery', 'iphone-13-battery', 'IPH13-BATT-001', 'Reliable battery replacement for iPhone 13', 49.99, 0, 110, false, 'Apple', (SELECT id FROM categories WHERE slug = 'iphone'), '/images/products/iphone-13-battery.jpg');

-- Samsung Galaxy S Series Parts
INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, brand, category_id, image_url) VALUES
('Galaxy S24 Ultra Screen', 'galaxy-s24-ultra-screen', 'GS24U-SCRN-001', '6.8-inch Dynamic AMOLED 2X display for Galaxy S24 Ultra with S Pen support', 349.99, 10, 35, true, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-ultra-screen.jpg'),
('Galaxy S24 Ultra Battery', 'galaxy-s24-ultra-battery', 'GS24U-BATT-001', '5000mAh battery replacement for Galaxy S24 Ultra with fast charging', 79.99, 5, 60, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-ultra-battery.jpg'),
('Galaxy S24 Ultra Camera Module', 'galaxy-s24-ultra-camera', 'GS24U-CAM-001', 'Quad camera system with 200MP main sensor for Galaxy S24 Ultra', 199.99, 8, 25, true, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-ultra-camera.jpg'),
('Galaxy S24 Ultra Charging Port', 'galaxy-s24-ultra-charging-port', 'GS24U-CHRG-001', 'USB-C charging assembly for Galaxy S24 Ultra with DeX support', 39.99, 0, 70, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-ultra-charging-port.jpg'),
('Galaxy S24 Ultra Frame', 'galaxy-s24-ultra-frame', 'GS24U-FRAME-001', 'Titanium frame replacement for Galaxy S24 Ultra with IP68 rating', 149.99, 0, 30, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-ultra-frame.jpg'),
('Galaxy S24 Plus Screen', 'galaxy-s24-plus-screen', 'GS24P-SCRN-001', '6.7-inch Dynamic AMOLED 2X display for Galaxy S24 Plus', 299.99, 12, 40, true, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-plus-screen.jpg'),
('Galaxy S24 Plus Battery', 'galaxy-s24-plus-battery', 'GS24P-BATT-001', '4900mAh battery for Galaxy S24 Plus with 45W fast charging', 69.99, 0, 75, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-plus-battery.jpg'),
('Galaxy S24 Screen', 'galaxy-s24-screen', 'GS24-SCRN-001', '6.2-inch Dynamic AMOLED 2X display for Galaxy S24', 249.99, 15, 50, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-screen.jpg'),
('Galaxy S24 Battery', 'galaxy-s24-battery', 'GS24-BATT-001', '4000mAh battery replacement for Galaxy S24', 59.99, 5, 85, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-battery.jpg'),
('Galaxy S24 Camera Module', 'galaxy-s24-camera', 'GS24-CAM-001', 'Triple camera system for Galaxy S24 with 50MP main sensor', 129.99, 10, 35, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s24-camera.jpg'),
('Galaxy S23 Ultra Screen', 'galaxy-s23-ultra-screen', 'GS23U-SCRN-001', '6.8-inch Dynamic AMOLED 2X display for Galaxy S23 Ultra', 329.99, 10, 38, true, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s23-ultra-screen.jpg'),
('Galaxy S23 Ultra Battery', 'galaxy-s23-ultra-battery', 'GS23U-BATT-001', '5000mAh battery for Galaxy S23 Ultra with S Pen compatibility', 74.99, 0, 55, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s23-ultra-battery.jpg'),
('Galaxy S23 Ultra Camera', 'galaxy-s23-ultra-camera', 'GS23U-CAM-001', 'Quad camera system with 200MP sensor for Galaxy S23 Ultra', 179.99, 8, 28, true, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s23-ultra-camera.jpg'),
('Galaxy S23 Plus Screen', 'galaxy-s23-plus-screen', 'GS23P-SCRN-001', '6.6-inch Dynamic AMOLED 2X display for Galaxy S23 Plus', 279.99, 12, 42, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s23-plus-screen.jpg'),
('Galaxy S23 Screen', 'galaxy-s23-screen', 'GS23-SCRN-001', '6.1-inch Dynamic AMOLED 2X display for Galaxy S23', 229.99, 15, 48, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s23-screen.jpg'),
('Galaxy S22 Ultra Screen', 'galaxy-s22-ultra-screen', 'GS22U-SCRN-001', '6.8-inch Dynamic AMOLED 2X display for Galaxy S22 Ultra', 309.99, 18, 32, true, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s22-ultra-screen.jpg'),
('Galaxy S22 Ultra Battery', 'galaxy-s22-ultra-battery', 'GS22U-BATT-001', '5000mAh battery replacement for Galaxy S22 Ultra', 69.99, 5, 50, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s22-ultra-battery.jpg'),
('Galaxy S22 Plus Screen', 'galaxy-s22-plus-screen', 'GS22P-SCRN-001', '6.6-inch Dynamic AMOLED 2X display for Galaxy S22 Plus', 259.99, 15, 38, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s22-plus-screen.jpg'),
('Galaxy S22 Screen', 'galaxy-s22-screen', 'GS22-SCRN-001', '6.2-inch Dynamic AMOLED 2X display for Galaxy S22', 209.99, 20, 45, false, 'Samsung', (SELECT id FROM categories WHERE slug = 's-series'), '/images/products/galaxy-s22-screen.jpg');

-- iPad Parts (Apple > iPad) - 20 products
INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, brand, category_id, image_url) VALUES
('iPad Pro 12.9" M2 Screen', 'ipad-pro-12-9-m2-screen', 'IPD12M2-SCRN-001', 'Liquid Retina XDR display for iPad Pro 12.9" M2 with Tandem OLED technology', 599.99, 8, 20, true, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-12-9-screen.jpg'),
('iPad Pro 12.9" M2 Battery', 'ipad-pro-12-9-m2-battery', 'IPD12M2-BATT-001', 'High-capacity battery replacement for iPad Pro 12.9" M2', 129.99, 5, 35, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-battery.jpg'),
('iPad Pro 12.9" M2 Charging Port', 'ipad-pro-12-9-m2-charging-port', 'IPD12M2-CHRG-001', 'USB-C charging assembly for iPad Pro 12.9" M2 with Thunderbolt support', 79.99, 0, 40, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-charging-port.jpg'),
('iPad Pro 12.9" M2 Camera Module', 'ipad-pro-12-9-m2-camera', 'IPD12M2-CAM-001', 'Ultra Wide front camera and LiDAR scanner for iPad Pro 12.9" M2', 149.99, 10, 25, true, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-camera.jpg'),
('iPad Pro 12.9" M2 Frame', 'ipad-pro-12-9-m2-frame', 'IPD12M2-FRAME-001', 'Aluminum frame replacement for iPad Pro 12.9" M2 with all ports', 249.99, 0, 15, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-frame.jpg'),
('iPad Pro 11" M2 Screen', 'ipad-pro-11-m2-screen', 'IPD11M2-SCRN-001', 'Liquid Retina display for iPad Pro 11" M2 with Tandem OLED', 499.99, 10, 25, true, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-11-screen.jpg'),
('iPad Pro 11" M2 Battery', 'ipad-pro-11-m2-battery', 'IPD11M2-BATT-001', 'Optimized battery for iPad Pro 11" M2 with all-day performance', 109.99, 0, 45, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-11-battery.jpg'),
('iPad Pro 11" M2 Charging Port', 'ipad-pro-11-m2-charging-port', 'IPD11M2-CHRG-001', 'USB-C port assembly for iPad Pro 11" M2 with Thunderbolt', 69.99, 5, 50, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-11-charging-port.jpg'),
('iPad Pro 11" M2 Camera', 'ipad-pro-11-m2-camera', 'IPD11M2-CAM-001', 'Advanced camera system for iPad Pro 11" M2 with Center Stage', 129.99, 8, 30, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-11-camera.jpg'),
('iPad Pro 11" M2 Frame', 'ipad-pro-11-m2-frame', 'IPD11M2-FRAME-001', 'Premium aluminum frame for iPad Pro 11" M2', 199.99, 0, 20, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-pro-11-frame.jpg'),
('iPad Air 5 Screen', 'ipad-air-5-screen', 'IPDA5-SCRN-001', 'Liquid Retina display for iPad Air 5 with True Tone', 349.99, 12, 30, true, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-air-5-screen.jpg'),
('iPad Air 5 Battery', 'ipad-air-5-battery', 'IPDA5-BATT-001', 'Lithium-polymer battery for iPad Air 5 with fast charging', 89.99, 0, 55, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-air-5-battery.jpg'),
('iPad Air 5 Charging Port', 'ipad-air-5-charging-port', 'IPDA5-CHRG-001', 'USB-C charging port for iPad Air 5', 49.99, 5, 60, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-air-5-charging-port.jpg'),
('iPad Air 5 Camera Module', 'ipad-air-5-camera', 'IPDA5-CAM-001', '12MP Wide camera for iPad Air 5 with 4K video', 99.99, 10, 35, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-air-5-camera.jpg'),
('iPad Air 5 Frame', 'ipad-air-5-frame', 'IPDA5-FRAME-001', 'Aluminum frame replacement for iPad Air 5', 149.99, 0, 25, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-air-5-frame.jpg'),
('iPad 10th Gen Screen', 'ipad-10th-gen-screen', 'IPD10-SCRN-001', 'Liquid Retina display for iPad 10th generation', 249.99, 15, 40, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-10-screen.jpg'),
('iPad 10th Gen Battery', 'ipad-10th-gen-battery', 'IPD10-BATT-001', 'Battery replacement for iPad 10th generation', 69.99, 5, 65, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-10-battery.jpg'),
('iPad 10th Gen Charging Port', 'ipad-10th-gen-charging-port', 'IPD10-CHRG-001', 'USB-C charging assembly for iPad 10th generation', 39.99, 0, 70, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-10-charging-port.jpg'),
('iPad 10th Gen Camera', 'ipad-10th-gen-camera', 'IPD10-CAM-001', '12MP camera system for iPad 10th generation', 79.99, 8, 40, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-10-camera.jpg'),
('iPad 10th Gen Frame', 'ipad-10th-gen-frame', 'IPD10-FRAME-001', 'Aluminum frame for iPad 10th generation', 119.99, 0, 30, false, 'Apple', (SELECT id FROM categories WHERE slug = 'ipad'), '/images/products/ipad-10-frame.jpg');

-- Samsung Galaxy Note Series Parts - 20 products
INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, brand, category_id, image_url) VALUES
('Galaxy Note 20 Ultra Screen', 'galaxy-note-20-ultra-screen', 'GN20U-SCRN-001', '6.9-inch Dynamic AMOLED 2X display for Galaxy Note 20 Ultra with S Pen', 329.99, 15, 25, true, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-ultra-screen.jpg'),
('Galaxy Note 20 Ultra Battery', 'galaxy-note-20-ultra-battery', 'GN20U-BATT-001', '4500mAh battery replacement for Galaxy Note 20 Ultra', 74.99, 5, 40, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-ultra-battery.jpg'),
('Galaxy Note 20 Ultra S Pen', 'galaxy-note-20-ultra-s-pen', 'GN20U-SPEN-001', 'Bluetooth S Pen replacement for Galaxy Note 20 Ultra', 49.99, 0, 60, true, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-ultra-s-pen.jpg'),
('Galaxy Note 20 Ultra Camera Module', 'galaxy-note-20-ultra-camera', 'GN20U-CAM-001', 'Quad camera system with 108MP main sensor for Galaxy Note 20 Ultra', 179.99, 10, 20, true, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-ultra-camera.jpg'),
('Galaxy Note 20 Ultra Charging Port', 'galaxy-note-20-ultra-charging-port', 'GN20U-CHRG-001', 'USB-C charging assembly for Galaxy Note 20 Ultra', 39.99, 0, 55, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-ultra-charging-port.jpg'),
('Galaxy Note 20 Ultra Frame', 'galaxy-note-20-ultra-frame', 'GN20U-FRAME-001', 'Premium frame replacement for Galaxy Note 20 Ultra', 149.99, 0, 25, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-ultra-frame.jpg'),
('Galaxy Note 20 Screen', 'galaxy-note-20-screen', 'GN20-SCRN-001', '6.7-inch Super AMOLED Plus display for Galaxy Note 20', 279.99, 12, 30, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-screen.jpg'),
('Galaxy Note 20 Battery', 'galaxy-note-20-battery', 'GN20-BATT-001', '4300mAh battery for Galaxy Note 20', 64.99, 5, 50, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-battery.jpg'),
('Galaxy Note 20 S Pen', 'galaxy-note-20-s-pen', 'GN20-SPEN-001', 'Bluetooth S Pen for Galaxy Note 20', 39.99, 0, 70, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-s-pen.jpg'),
('Galaxy Note 20 Camera Module', 'galaxy-note-20-camera', 'GN20-CAM-001', 'Triple camera system for Galaxy Note 20', 139.99, 8, 35, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-20-camera.jpg'),
('Galaxy Note 10 Plus Screen', 'galaxy-note-10-plus-screen', 'GN10P-SCRN-001', '6.8-inch Dynamic AMOLED display for Galaxy Note 10 Plus', 259.99, 20, 20, true, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-plus-screen.jpg'),
('Galaxy Note 10 Plus Battery', 'galaxy-note-10-plus-battery', 'GN10P-BATT-001', '4300mAh battery replacement for Galaxy Note 10 Plus', 59.99, 10, 35, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-plus-battery.jpg'),
('Galaxy Note 10 Plus S Pen', 'galaxy-note-10-plus-s-pen', 'GN10P-SPEN-001', 'Bluetooth S Pen for Galaxy Note 10 Plus', 34.99, 0, 45, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-plus-s-pen.jpg'),
('Galaxy Note 10 Plus Camera', 'galaxy-note-10-plus-camera', 'GN10P-CAM-001', 'Triple camera system with 12MP sensors for Note 10 Plus', 119.99, 12, 25, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-plus-camera.jpg'),
('Galaxy Note 10 Plus Charging Port', 'galaxy-note-10-plus-charging-port', 'GN10P-CHRG-001', 'USB-C charging port for Galaxy Note 10 Plus', 29.99, 5, 60, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-plus-charging-port.jpg'),
('Galaxy Note 10 Screen', 'galaxy-note-10-screen', 'GN10-SCRN-001', '6.3-inch Dynamic AMOLED display for Galaxy Note 10', 229.99, 18, 25, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-screen.jpg'),
('Galaxy Note 10 Battery', 'galaxy-note-10-battery', 'GN10-BATT-001', '3500mAh battery for Galaxy Note 10', 49.99, 8, 40, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-battery.jpg'),
('Galaxy Note 10 S Pen', 'galaxy-note-10-s-pen', 'GN10-SPEN-001', 'Bluetooth S Pen replacement for Galaxy Note 10', 29.99, 0, 55, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-s-pen.jpg'),
('Galaxy Note 10 Camera Module', 'galaxy-note-10-camera', 'GN10-CAM-001', 'Dual camera system for Galaxy Note 10', 99.99, 10, 30, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-camera.jpg'),
('Galaxy Note 10 Frame', 'galaxy-note-10-frame', 'GN10-FRAME-001', 'Aluminum frame replacement for Galaxy Note 10', 89.99, 0, 20, false, 'Samsung', (SELECT id FROM categories WHERE slug = 'note-series'), '/images/products/note-10-frame.jpg');

-- Motorola Parts (Moto G Series) - 20 products
INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, brand, category_id, image_url) VALUES
('Moto G Stylus 5G Screen', 'moto-g-stylus-5g-screen', 'MGST5G-SCRN-001', '6.8-inch IPS LCD display for Moto G Stylus 5G', 149.99, 10, 40, true, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-screen.jpg'),
('Moto G Stylus 5G Battery', 'moto-g-stylus-5g-battery', 'MGST5G-BATT-001', '5000mAh battery replacement for Moto G Stylus 5G', 39.99, 5, 80, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-battery.jpg'),
('Moto G Stylus 5G Charging Port', 'moto-g-stylus-5g-charging-port', 'MGST5G-CHRG-001', 'USB-C charging port for Moto G Stylus 5G', 19.99, 0, 100, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-charging-port.jpg'),
('Moto G Stylus 5G Camera Module', 'moto-g-stylus-5g-camera', 'MGST5G-CAM-001', 'Quad camera system for Moto G Stylus 5G with 50MP main sensor', 79.99, 8, 45, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-camera.jpg'),
('Moto G Stylus 5G Stylus Pen', 'moto-g-stylus-5g-stylus', 'MGST5G-STYL-001', 'Precision stylus pen for Moto G Stylus 5G', 29.99, 0, 90, true, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-pen.jpg'),
('Moto G Power 5G Screen', 'moto-g-power-5g-screen', 'MGPO5G-SCRN-001', '6.5-inch IPS LCD display for Moto G Power 5G', 129.99, 12, 50, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-power-screen.jpg'),
('Moto G Power 5G Battery', 'moto-g-power-5g-battery', 'MGPO5G-BATT-001', '5000mAh extended battery for Moto G Power 5G', 49.99, 0, 70, true, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-power-battery.jpg'),
('Moto G Power 5G Charging Port', 'moto-g-power-5g-charging-port', 'MGPO5G-CHRG-001', 'USB-C charging assembly for Moto G Power 5G', 24.99, 5, 85, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-power-charging-port.jpg'),
('Moto G Power 5G Camera', 'moto-g-power-5g-camera', 'MGPO5G-CAM-001', 'Triple camera system for Moto G Power 5G', 69.99, 10, 55, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-power-camera.jpg'),
('Moto G Power 5G Frame', 'moto-g-power-5g-frame', 'MGPO5G-FRAME-001', 'Plastic frame replacement for Moto G Power 5G', 39.99, 0, 75, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-power-frame.jpg'),
('Moto G 5G Screen', 'moto-g-5g-screen', 'MG5G-SCRN-001', '6.5-inch IPS LCD display for Moto G 5G', 119.99, 15, 45, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-5g-screen.jpg'),
('Moto G 5G Battery', 'moto-g-5g-battery', 'MG5G-BATT-001', '5000mAh battery for Moto G 5G', 44.99, 5, 65, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-5g-battery.jpg'),
('Moto G 5G Charging Port', 'moto-g-5g-charging-port', 'MG5G-CHRG-001', 'USB-C port for Moto G 5G', 22.99, 0, 80, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-5g-charging-port.jpg'),
('Moto G 5G Camera Module', 'moto-g-5g-camera', 'MG5G-CAM-001', 'Triple camera system for Moto G 5G', 64.99, 8, 50, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-5g-camera.jpg'),
('Moto G 5G Frame', 'moto-g-5g-frame', 'MG5G-FRAME-001', 'Plastic frame for Moto G 5G', 34.99, 0, 70, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-5g-frame.jpg'),
('Moto G Stylus Screen', 'moto-g-stylus-screen', 'MGST-SCRN-001', '6.8-inch IPS LCD for Moto G Stylus (2022)', 139.99, 10, 35, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-2022-screen.jpg'),
('Moto G Stylus Battery', 'moto-g-stylus-battery', 'MGST-BATT-001', '5000mAh battery for Moto G Stylus (2022)', 37.99, 5, 60, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-2022-battery.jpg'),
('Moto G Stylus Charging Port', 'moto-g-stylus-charging-port', 'MGST-CHRG-001', 'USB-C charging port for Moto G Stylus (2022)', 18.99, 0, 75, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-2022-charging-port.jpg'),
('Moto G Stylus Camera', 'moto-g-stylus-camera', 'MGST-CAM-001', 'Quad camera system for Moto G Stylus (2022)', 74.99, 8, 40, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-2022-camera.jpg'),
('Moto G Stylus Stylus', 'moto-g-stylus-stylus', 'MGST-STYL-001', 'Replacement stylus for Moto G Stylus (2022)', 27.99, 0, 85, false, 'Motorola', (SELECT id FROM categories WHERE slug = 'moto-g-series'), '/images/products/moto-g-stylus-2022-stylus.jpg');

-- Google Pixel Parts - 20 products
INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, brand, category_id, image_url) VALUES
('Pixel 8 Pro Screen', 'pixel-8-pro-screen', 'P8P-SCRN-001', '6.7-inch LTPO OLED display for Pixel 8 Pro with 120Hz refresh rate', 249.99, 10, 30, true, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-pro-screen.jpg'),
('Pixel 8 Pro Battery', 'pixel-8-pro-battery', 'P8P-BATT-001', '5050mAh battery replacement for Pixel 8 Pro', 69.99, 5, 50, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-pro-battery.jpg'),
('Pixel 8 Pro Camera Module', 'pixel-8-pro-camera', 'P8P-CAM-001', 'Triple camera system with 50MP main sensor for Pixel 8 Pro', 149.99, 8, 25, true, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-pro-camera.jpg'),
('Pixel 8 Pro Charging Port', 'pixel-8-pro-charging-port', 'P8P-CHRG-001', 'USB-C charging assembly for Pixel 8 Pro', 39.99, 0, 60, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-pro-charging-port.jpg'),
('Pixel 8 Pro Frame', 'pixel-8-pro-frame', 'P8P-FRAME-001', 'Aluminum frame replacement for Pixel 8 Pro', 119.99, 0, 35, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-pro-frame.jpg'),
('Pixel 8 Screen', 'pixel-8-screen', 'P8-SCRN-001', '6.2-inch OLED display for Pixel 8', 199.99, 12, 40, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-screen.jpg'),
('Pixel 8 Battery', 'pixel-8-battery', 'P8-BATT-001', '4575mAh battery for Pixel 8', 59.99, 5, 55, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-battery.jpg'),
('Pixel 8 Camera Module', 'pixel-8-camera', 'P8-CAM-001', 'Dual camera system for Pixel 8 with 50MP main sensor', 129.99, 10, 30, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-camera.jpg'),
('Pixel 8 Charging Port', 'pixel-8-charging-port', 'P8-CHRG-001', 'USB-C port for Pixel 8', 34.99, 0, 65, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-charging-port.jpg'),
('Pixel 8 Frame', 'pixel-8-frame', 'P8-FRAME-001', 'Aluminum frame for Pixel 8', 99.99, 0, 40, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-8-frame.jpg'),
('Pixel 7 Pro Screen', 'pixel-7-pro-screen', 'P7P-SCRN-001', '6.7-inch LTPO OLED display for Pixel 7 Pro', 229.99, 15, 35, true, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-7-pro-screen.jpg'),
('Pixel 7 Pro Battery', 'pixel-7-pro-battery', 'P7P-BATT-001', '5000mAh battery replacement for Pixel 7 Pro', 64.99, 5, 45, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-7-pro-battery.jpg'),
('Pixel 7 Pro Camera', 'pixel-7-pro-camera', 'P7P-CAM-001', 'Triple camera system for Pixel 7 Pro', 139.99, 8, 28, true, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-7-pro-camera.jpg'),
('Pixel 7 Screen', 'pixel-7-screen', 'P7-SCRN-001', '6.3-inch OLED display for Pixel 7', 179.99, 12, 42, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-7-screen.jpg'),
('Pixel 7 Battery', 'pixel-7-battery', 'P7-BATT-001', '4270mAh battery for Pixel 7', 54.99, 5, 50, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-7-battery.jpg'),
('Pixel 6 Pro Screen', 'pixel-6-pro-screen', 'P6P-SCRN-001', '6.7-inch OLED display for Pixel 6 Pro', 209.99, 18, 30, true, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-6-pro-screen.jpg'),
('Pixel 6 Pro Battery', 'pixel-6-pro-battery', 'P6P-BATT-001', '5003mAh battery for Pixel 6 Pro', 59.99, 8, 40, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-6-pro-battery.jpg'),
('Pixel 6 Pro Camera', 'pixel-6-pro-camera', 'P6P-CAM-001', 'Triple camera system for Pixel 6 Pro', 119.99, 10, 35, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-6-pro-camera.jpg'),
('Pixel 6 Screen', 'pixel-6-screen', 'P6-SCRN-001', '6.4-inch OLED display for Pixel 6', 169.99, 15, 38, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-6-screen.jpg'),
('Pixel 6 Battery', 'pixel-6-battery', 'P6-BATT-001', '4614mAh battery for Pixel 6', 49.99, 5, 55, false, 'Google', (SELECT id FROM categories WHERE slug = 'pixel-series'), '/images/products/pixel-6-battery.jpg');

-- Tools & Supplies (Essential Tools) - 20 products
INSERT INTO products (name, slug, sku, description, price, discount_percentage, stock_quantity, is_featured, brand, category_id, image_url) VALUES
('Precision Screwdriver Set', 'precision-screwdriver-set', 'TOOL-SD-001', 'Professional 64-piece precision screwdriver set with magnetic tips', 49.99, 10, 100, true, 'iFixit', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/screwdriver-set.jpg'),
('Anti-Static Wrist Strap', 'anti-static-wrist-strap', 'TOOL-AS-001', 'ESD protection wrist strap for safe electronics repair', 12.99, 0, 200, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/wrist-strap.jpg'),
('Plastic Pry Tools Set', 'plastic-pry-tools-set', 'TOOL-PRY-001', '8-piece nylon pry tool set for opening devices safely', 19.99, 5, 150, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/pry-tools.jpg'),
('LED Magnifying Lamp', 'led-magnifying-lamp', 'TOOL-MAG-001', '5-inch LED magnifying lamp with adjustable arm', 79.99, 15, 50, true, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/magnifying-lamp.jpg'),
('Digital Multimeter', 'digital-multimeter', 'TOOL-MULT-001', 'Auto-ranging digital multimeter for electronics testing', 39.99, 8, 75, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/multimeter.jpg'),
('Heat Gun', 'heat-gun', 'TOOL-HEAT-001', 'Professional heat gun for BGA rework and plastic forming', 89.99, 10, 40, true, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/heat-gun.jpg'),
('Soldering Iron Station', 'soldering-iron-station', 'TOOL-SOLD-001', 'Digital soldering station with temperature control', 129.99, 12, 30, true, 'Hakko', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/soldering-station.jpg'),
('Microscope', 'microscope', 'TOOL-MICRO-001', 'Digital USB microscope for detailed component inspection', 69.99, 15, 25, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/microscope.jpg'),
('Cable Tester', 'cable-tester', 'TOOL-CABLE-001', 'Multi-function cable tester for USB, HDMI, and network cables', 34.99, 5, 60, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/cable-tester.jpg'),
('Component Storage Case', 'component-storage-case', 'TOOL-STOR-001', 'Organized storage case for small electronic components', 24.99, 0, 80, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/storage-case.jpg'),
('Logic Board Holder', 'logic-board-holder', 'TOOL-HOLD-001', 'Adjustable PCB holder for soldering and repair work', 29.99, 8, 70, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/board-holder.jpg'),
('Flux Pen', 'flux-pen', 'TOOL-FLUX-001', 'No-clean flux pen for precision soldering', 8.99, 0, 150, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/flux-pen.jpg'),
('Desoldering Pump', 'desoldering-pump', 'TOOL-DESOL-001', 'High-quality desoldering pump for removing solder', 14.99, 5, 100, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/desoldering-pump.jpg'),
('Wire Stripper', 'wire-stripper', 'TOOL-STRIP-001', 'Precision wire stripper for various gauge wires', 16.99, 0, 90, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/wire-stripper.jpg'),
('Thermal Paste', 'thermal-paste', 'TOOL-THERM-001', 'High-performance thermal paste for heat sinks', 9.99, 10, 120, false, 'Arctic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/thermal-paste.jpg'),
('Cleaning Brush Set', 'cleaning-brush-set', 'TOOL-BRUSH-001', 'Anti-static brush set for cleaning electronics', 11.99, 0, 110, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/cleaning-brushes.jpg'),
('Tweezers Set', 'tweezers-set', 'TOOL-TWEEZ-001', 'Precision stainless steel tweezers set', 22.99, 8, 85, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/tweezers.jpg'),
('Suction Cup', 'suction-cup', 'TOOL-SUCT-001', 'Large suction cup for screen removal', 7.99, 0, 200, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/suction-cup.jpg'),
('Opening Picks Set', 'opening-picks-set', 'TOOL-PICKS-001', '12-piece opening pick set for device disassembly', 15.99, 5, 95, false, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/opening-picks.jpg'),
('UV Curing Light', 'uv-curing-light', 'TOOL-UV-001', 'UV light for curing adhesives in screen repairs', 39.99, 10, 45, true, 'Generic', (SELECT id FROM categories WHERE slug = 'essentials'), '/images/products/uv-light.jpg');
