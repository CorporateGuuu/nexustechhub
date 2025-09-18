-- Complete Nexus Tech Hub Database Setup
-- Run this script in Supabase SQL Editor to set up all tables, categories, and products

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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
    address_type VARCHAR(20) DEFAULT 'shipping' -- 'shipping', 'billing', 'both'
);

-- Shopping Cart Table
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100), -- For guest users
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Wishlist Table
CREATE TABLE wishlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Wishlist Items Table
CREATE TABLE wishlist_items (
    id SERIAL PRIMARY KEY,
    wishlist_id INTEGER REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscribers Table
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables with updated_at column
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

-- Samsung Galaxy S Series Parts - 20 products
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
('Galaxy Note 20 Ultra Camera Module', 'galaxy-note-20-ultra-camera', 'GN20U-CAM-001', 'Quad camera system with
