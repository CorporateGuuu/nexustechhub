-- Database Schema for Phone Electronics Store

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
    address_type VARCHAR(20) DEFAULT 'shipping' -- 'shipping', 'billing', 'both'
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
GO

-- Create triggers for all tables with updated_at column
CREATE TRIGGER update_categories_updated_at
ON categories
FOR UPDATE
AS
BEGIN
UPDATE categories SET updated_at = GETDATE() WHERE id IN (SELECT id FROM inserted);
END;
GO

CREATE TRIGGER update_products_updated_at
ON products
FOR UPDATE
AS
BEGIN
UPDATE products SET updated_at = GETDATE() WHERE id IN (SELECT id FROM inserted);
END;
GO

CREATE TRIGGER update_users_updated_at
ON users
FOR UPDATE
AS
BEGIN
UPDATE users SET updated_at = GETDATE() WHERE id IN (SELECT id FROM inserted);
END;
GO

CREATE TRIGGER update_carts_updated_at
ON carts
FOR UPDATE
AS
BEGIN
UPDATE carts SET updated_at = GETDATE() WHERE id IN (SELECT id FROM inserted);
END;
GO

CREATE TRIGGER update_orders_updated_at
ON orders
FOR UPDATE
AS
BEGIN
UPDATE orders SET updated_at = GETDATE() WHERE id IN (SELECT id FROM inserted);
END;
GO

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

-- Create index for newsletter subscribers
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_is_active ON newsletter_subscribers(is_active);
GO

-- Create trigger for newsletter subscribers
CREATE TRIGGER update_newsletter_subscribers_updated_at
ON newsletter_subscribers
FOR UPDATE
AS
BEGIN
UPDATE newsletter_subscribers SET updated_at = GETDATE() WHERE id IN (SELECT id FROM inserted);
END;
GO

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
