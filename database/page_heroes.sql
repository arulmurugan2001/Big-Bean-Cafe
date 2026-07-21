-- Generic page heroes table for editable page hero sections
CREATE TABLE IF NOT EXISTS page_heroes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_key VARCHAR(100) NOT NULL UNIQUE,
  page_name VARCHAR(150) NOT NULL,
  label VARCHAR(150) NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT NULL,
  hero_image VARCHAR(500) NULL,
  mobile_hero_image VARCHAR(500) NULL,
  primary_button_text VARCHAR(100) NULL,
  primary_button_url VARCHAR(255) NULL,
  secondary_button_text VARCHAR(100) NULL,
  secondary_button_url VARCHAR(255) NULL,
  overlay_opacity DECIMAL(3,2) DEFAULT 0.45,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Remove legacy contact row before re-seeding (generic page heroes should not include contact)
DELETE FROM page_heroes WHERE page_key = 'contact';

-- Default seed for generic page heroes
INSERT IGNORE INTO page_heroes
  (page_key, page_name, label, title, subtitle,
   primary_button_text, primary_button_url,
   secondary_button_text, secondary_button_url,
   overlay_opacity, status)
VALUES
  ('our-story', 'Our Story', 'BIG BEAN CAFE', 'Our Story',
   'From one café dream to a growing coffee community across Bengaluru.',
   'Explore Our Menu', '/menu',
   'Visit Our Outlets', '/outlets',
   0.45, 'active');
