-- Category seed data for Nexus Tech Hub
-- Run this after creating the database schema

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
