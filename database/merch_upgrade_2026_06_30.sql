-- Big Bean Café Merchandise Module Upgrade
-- Run this migration against the existing database

-- 1. Merchandise Categories
CREATE TABLE IF NOT EXISTS merchandise_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NULL,
  description TEXT NULL,
  icon VARCHAR(100) NULL,
  image VARCHAR(500) NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Merchandise Banners
CREATE TABLE IF NOT EXISTS merchandise_banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  eyebrow VARCHAR(100) DEFAULT 'BIG BEAN CAFÉ MERCH',
  title VARCHAR(255) NOT NULL,
  subtitle TEXT NULL,
  button_text VARCHAR(100) DEFAULT 'Shop Now',
  button_url VARCHAR(500) DEFAULT '/merchandise',
  image VARCHAR(500) NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Ensure base merchandise table exists (matches current controller schema)
CREATE TABLE IF NOT EXISTS merchandise (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NULL,
  description TEXT NULL,
  price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2) NULL,
  sku VARCHAR(100) NULL,
  stock INT DEFAULT 0,
  image VARCHAR(500) NULL,
  rating DECIMAL(2,1) DEFAULT 4.8,
  badge_text VARCHAR(255) NULL,
  category VARCHAR(255) NULL,
  category_id INT NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Link merchandise to categories (safe to re-run)
ALTER TABLE merchandise
  ADD COLUMN IF NOT EXISTS category_id INT NULL AFTER badge_text;

-- 5. Seed default categories
INSERT INTO merchandise_categories (name, slug, icon, status, sort_order) VALUES
('Coffee Beans', 'coffee-beans', 'coffee', 'active', 1),
('Mugs & Cups', 'mugs-cups', 'cup', 'active', 2),
('Brewing Tools', 'brewing-tools', 'flask', 'active', 3),
('Apparel', 'apparel', 'shirt', 'active', 4),
('Gift Packs', 'gift-packs', 'gift', 'active', 5),
('Accessories', 'accessories', 'sparkles', 'active', 6)
ON DUPLICATE KEY UPDATE name = VALUES(name), slug = VALUES(slug), icon = VALUES(icon);

-- 6. Rename legacy categories from previous migration
UPDATE merchandise_categories SET name = 'Mugs & Cups', slug = 'mugs-cups' WHERE name = 'Mugs' OR slug = 'mugs';
