-- =====================================================
-- ZENITH.RA E-COMMERCE DATABASE SCHEMA
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ADMIN USERS TABLE
-- =====================================================
CREATE TABLE admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: jayajayajaya)
-- Note: In production, use proper password hashing via Supabase Auth
INSERT INTO admin_users (email, password_hash, name, role) VALUES 
('zenith@ra.com', 'jayajayajaya', 'Admin Zenith', 'super_admin');

-- =====================================================
-- 2. SITE SETTINGS TABLE (For Theme Colors, Logo, etc.)
-- =====================================================
CREATE TABLE site_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50) DEFAULT 'string', -- string, number, boolean, json, image
    group_name VARCHAR(100) DEFAULT 'general',
    label VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value, type, group_name, label, description) VALUES
-- General Settings
('site_name', 'Zenith.ra', 'string', 'general', 'Site Name', 'Website name'),
('site_tagline', 'Premium Futuristic Streetwear', 'string', 'general', 'Tagline', 'Website tagline'),
('site_description', 'Discover the future of streetwear with Zenith.ra. Premium quality t-shirts with futuristic designs.', 'string', 'general', 'Description', 'Website description for SEO'),

-- Logo & Images
('logo_url', '/images/logo.svg', 'image', 'branding', 'Logo', 'Main website logo'),
('logo_dark_url', '/images/logo-dark.svg', 'image', 'branding', 'Logo Dark', 'Logo for dark backgrounds'),
('favicon_url', '/favicon.ico', 'image', 'branding', 'Favicon', 'Browser favicon'),

-- Theme Colors (Neon Green Default - Dr. Doom Style)
('primary_color', '#39ff14', 'string', 'theme', 'Primary Color', 'Main accent color'),
('primary_color_50', '#f0fdf4', 'string', 'theme', 'Primary 50', 'Lightest shade'),
('primary_color_100', '#dcfce7', 'string', 'theme', 'Primary 100', 'Very light shade'),
('primary_color_200', '#bbf7d0', 'string', 'theme', 'Primary 200', 'Light shade'),
('primary_color_300', '#86efac', 'string', 'theme', 'Primary 300', 'Medium light shade'),
('primary_color_400', '#4ade80', 'string', 'theme', 'Primary 400', 'Medium shade'),
('primary_color_500', '#39ff14', 'string', 'theme', 'Primary 500', 'Main color'),
('primary_color_600', '#16a34a', 'string', 'theme', 'Primary 600', 'Medium dark shade'),
('primary_color_700', '#15803d', 'string', 'theme', 'Primary 700', 'Dark shade'),
('primary_color_800', '#166534', 'string', 'theme', 'Primary 800', 'Very dark shade'),
('primary_color_900', '#14532d', 'string', 'theme', 'Primary 900', 'Darkest shade'),

-- Contact Info
('contact_email', 'hello@zenith-ra.com', 'string', 'contact', 'Email', 'Contact email'),
('contact_phone', '+62 812 3456 7890', 'string', 'contact', 'Phone', 'Contact phone'),
('contact_address', 'Jakarta, Indonesia', 'string', 'contact', 'Address', 'Physical address'),
('contact_whatsapp', '+6281234567890', 'string', 'contact', 'WhatsApp', 'WhatsApp number'),

-- Social Media
('social_instagram', 'https://instagram.com/zenith.ra', 'string', 'social', 'Instagram', 'Instagram URL'),
('social_twitter', 'https://twitter.com/zenith_ra', 'string', 'social', 'Twitter', 'Twitter URL'),
('social_facebook', 'https://facebook.com/zenith.ra', 'string', 'social', 'Facebook', 'Facebook URL'),
('social_tiktok', 'https://tiktok.com/@zenith.ra', 'string', 'social', 'TikTok', 'TikTok URL'),

-- Hero Section
('hero_title', 'ZENITH.RA', 'string', 'hero', 'Hero Title', 'Main hero section title'),
('hero_subtitle', 'Premium Futuristic Streetwear', 'string', 'hero', 'Hero Subtitle', 'Hero section subtitle'),
('hero_description', 'Elevate your style with our exclusive collection of premium t-shirts. Where future meets fashion.', 'string', 'hero', 'Hero Description', 'Hero section description'),
('hero_image', '/images/hero-product.png', 'image', 'hero', 'Hero Image', '3D product image for hero section'),
('hero_cta_text', 'Explore Collection', 'string', 'hero', 'CTA Button Text', 'Call to action button text'),

-- Footer
('footer_text', '© 2026 Zenith.ra. All rights reserved.', 'string', 'footer', 'Footer Text', 'Footer copyright text');

-- =====================================================
-- 3. CATEGORIES TABLE
-- =====================================================
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_id VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_en TEXT,
    description_id TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name_en, name_id, slug, description_en, description_id, sort_order) VALUES
('All Products', 'Semua Produk', 'all', 'Browse all our products', 'Lihat semua produk kami', 0),
('New Arrivals', 'Produk Baru', 'new-arrivals', 'Latest additions to our collection', 'Koleksi terbaru kami', 1),
('Best Sellers', 'Terlaris', 'best-sellers', 'Our most popular items', 'Produk paling populer', 2),
('Limited Edition', 'Edisi Terbatas', 'limited-edition', 'Exclusive limited edition pieces', 'Koleksi edisi terbatas eksklusif', 3),
('Collaboration', 'Kolaborasi', 'collaboration', 'Special collaboration collections', 'Koleksi kolaborasi spesial', 4),
('Basic Collection', 'Koleksi Basic', 'basic', 'Essential everyday wear', 'Pakaian esensial sehari-hari', 5),
('Premium Collection', 'Koleksi Premium', 'premium', 'High-end premium quality', 'Kualitas premium tinggi', 6);

-- =====================================================
-- 4. PRODUCTS TABLE
-- =====================================================
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_id VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_en TEXT,
    description_id TEXT,
    short_description_en VARCHAR(500),
    short_description_id VARCHAR(500),
    price DECIMAL(12, 2) NOT NULL,
    compare_price DECIMAL(12, 2), -- Original price for showing discounts
    cost_price DECIMAL(12, 2), -- For profit calculation
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 5,
    weight DECIMAL(8, 2), -- in grams
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    meta_title VARCHAR(255),
    meta_description TEXT,
    views_count INTEGER DEFAULT 0,
    sales_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. PRODUCT IMAGES TABLE
-- =====================================================
CREATE TABLE product_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. PRODUCT SIZES TABLE
-- =====================================================
CREATE TABLE product_sizes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(20) NOT NULL, -- XS, S, M, L, XL, XXL
    quantity INTEGER DEFAULT 0,
    price_adjustment DECIMAL(10, 2) DEFAULT 0, -- Extra price for certain sizes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. PRODUCT COLORS TABLE
-- =====================================================
CREATE TABLE product_colors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    color_name_en VARCHAR(50) NOT NULL,
    color_name_id VARCHAR(50) NOT NULL,
    color_code VARCHAR(7), -- Hex code like #39ff14
    image_url TEXT, -- Color-specific product image
    quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. BANNERS TABLE (For Hero Slider, Promotions)
-- =====================================================
CREATE TABLE banners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_en VARCHAR(255),
    title_id VARCHAR(255),
    subtitle_en VARCHAR(255),
    subtitle_id VARCHAR(255),
    description_en TEXT,
    description_id TEXT,
    image_url TEXT NOT NULL,
    image_mobile_url TEXT, -- Separate image for mobile
    link_url VARCHAR(500),
    link_text_en VARCHAR(100),
    link_text_id VARCHAR(100),
    position VARCHAR(50) DEFAULT 'hero', -- hero, sidebar, popup, etc.
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default hero banner
INSERT INTO banners (title_en, title_id, subtitle_en, subtitle_id, image_url, position, is_active) VALUES
('Welcome to Zenith.ra', 'Selamat Datang di Zenith.ra', 'Premium Futuristic Streetwear', 'Streetwear Futuristik Premium', '/images/hero-banner.jpg', 'hero', true);

-- =====================================================
-- 9. PAGES TABLE (For CMS - About, FAQ, etc.)
-- =====================================================
CREATE TABLE pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_id VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content_en TEXT,
    content_id TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default pages
INSERT INTO pages (title_en, title_id, slug, content_en, content_id) VALUES
('About Us', 'Tentang Kami', 'about', 
'<h2>Welcome to Zenith.ra</h2><p>Zenith.ra is a premium streetwear brand that combines futuristic aesthetics with high-quality craftsmanship. Founded with a vision to redefine urban fashion, we create pieces that speak to those who dare to stand out.</p><h3>Our Mission</h3><p>To provide premium quality streetwear that empowers individuals to express their unique style while pushing the boundaries of fashion.</p><h3>Our Values</h3><ul><li>Quality over quantity</li><li>Sustainable practices</li><li>Innovation in design</li><li>Community first</li></ul>',
'<h2>Selamat Datang di Zenith.ra</h2><p>Zenith.ra adalah brand streetwear premium yang menggabungkan estetika futuristik dengan keahlian berkualitas tinggi. Didirikan dengan visi untuk mendefinisikan ulang fashion urban, kami menciptakan karya yang berbicara kepada mereka yang berani tampil beda.</p><h3>Misi Kami</h3><p>Menyediakan streetwear berkualitas premium yang memberdayakan individu untuk mengekspresikan gaya unik mereka sambil mendorong batasan fashion.</p><h3>Nilai Kami</h3><ul><li>Kualitas di atas kuantitas</li><li>Praktik berkelanjutan</li><li>Inovasi dalam desain</li><li>Komunitas adalah prioritas</li></ul>');

-- =====================================================
-- 10. FAQ TABLE
-- =====================================================
CREATE TABLE faqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question_en VARCHAR(500) NOT NULL,
    question_id VARCHAR(500) NOT NULL,
    answer_en TEXT NOT NULL,
    answer_id TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'general',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default FAQs
INSERT INTO faqs (question_en, question_id, answer_en, answer_id, category, sort_order) VALUES
('What materials are your t-shirts made of?', 'Bahan apa yang digunakan untuk kaos kalian?', 
'Our t-shirts are made from premium 100% cotton with a weight of 220-250 GSM, ensuring comfort and durability.', 
'Kaos kami terbuat dari katun premium 100% dengan berat 220-250 GSM, memastikan kenyamanan dan daya tahan.', 
'product', 1),

('How do I choose the right size?', 'Bagaimana cara memilih ukuran yang tepat?', 
'Please refer to our size guide on each product page. We recommend measuring your favorite t-shirt and comparing it to our size chart.', 
'Silakan lihat panduan ukuran di setiap halaman produk. Kami merekomendasikan untuk mengukur kaos favorit Anda dan membandingkannya dengan tabel ukuran kami.', 
'product', 2),

('What are your shipping options?', 'Apa saja pilihan pengiriman kalian?', 
'We offer standard shipping (3-5 business days) and express shipping (1-2 business days). Free shipping for orders above Rp 500,000.', 
'Kami menawarkan pengiriman standar (3-5 hari kerja) dan pengiriman ekspres (1-2 hari kerja). Gratis ongkir untuk pesanan di atas Rp 500.000.', 
'shipping', 3),

('Can I return or exchange my order?', 'Bisakah saya mengembalikan atau menukar pesanan?', 
'Yes, we accept returns and exchanges within 14 days of delivery. Items must be unworn, unwashed, and in original packaging.', 
'Ya, kami menerima pengembalian dan penukaran dalam 14 hari setelah pengiriman. Barang harus belum dipakai, belum dicuci, dan dalam kemasan asli.', 
'returns', 4),

('How can I track my order?', 'Bagaimana cara melacak pesanan saya?', 
'Once your order is shipped, you will receive a tracking number via email. You can use this to track your package on our website or the courier''s site.', 
'Setelah pesanan Anda dikirim, Anda akan menerima nomor resi melalui email. Anda dapat menggunakan ini untuk melacak paket di website kami atau situs kurir.', 
'shipping', 5);

-- =====================================================
-- 11. TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_avatar TEXT,
    customer_location VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    content_en TEXT NOT NULL,
    content_id TEXT NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 12. SALES STATISTICS TABLE (For Dashboard Charts)
-- =====================================================
CREATE TABLE sales_statistics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL,
    total_sales DECIMAL(15, 2) DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    total_items_sold INTEGER DEFAULT 0,
    new_customers INTEGER DEFAULT 0,
    returning_customers INTEGER DEFAULT 0,
    average_order_value DECIMAL(12, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert dummy sales data for charts (Last 365 days)
INSERT INTO sales_statistics (date, total_sales, total_orders, total_items_sold, new_customers, returning_customers, average_order_value)
SELECT 
    generate_series::date as date,
    (random() * 5000000 + 500000)::decimal(15,2) as total_sales,
    (random() * 50 + 10)::integer as total_orders,
    (random() * 100 + 20)::integer as total_items_sold,
    (random() * 20 + 5)::integer as new_customers,
    (random() * 15 + 3)::integer as returning_customers,
    (random() * 300000 + 150000)::decimal(12,2) as average_order_value
FROM generate_series(
    CURRENT_DATE - INTERVAL '365 days',
    CURRENT_DATE,
    INTERVAL '1 day'
);

-- =====================================================
-- 13. PRODUCT VIEWS TABLE (For Analytics)
-- =====================================================
CREATE TABLE product_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address VARCHAR(50),
    user_agent TEXT
);

-- =====================================================
-- 14. MEDIA LIBRARY TABLE
-- =====================================================
CREATE TABLE media (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50), -- image, video, document
    file_size INTEGER, -- in bytes
    mime_type VARCHAR(100),
    alt_text VARCHAR(255),
    folder VARCHAR(100) DEFAULT 'general',
    uploaded_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 15. CONTACT MESSAGES TABLE
-- =====================================================
CREATE TABLE contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INSERT DUMMY PRODUCTS
-- =====================================================

-- Get category IDs
DO $$
DECLARE
    cat_new UUID;
    cat_best UUID;
    cat_limited UUID;
    cat_collab UUID;
    cat_basic UUID;
    cat_premium UUID;
    prod_id UUID;
BEGIN
    SELECT id INTO cat_new FROM categories WHERE slug = 'new-arrivals';
    SELECT id INTO cat_best FROM categories WHERE slug = 'best-sellers';
    SELECT id INTO cat_limited FROM categories WHERE slug = 'limited-edition';
    SELECT id INTO cat_collab FROM categories WHERE slug = 'collaboration';
    SELECT id INTO cat_basic FROM categories WHERE slug = 'basic';
    SELECT id INTO cat_premium FROM categories WHERE slug = 'premium';

    -- Product 1: Dr. Doom Collab
    INSERT INTO products (name_en, name_id, slug, description_en, description_id, short_description_en, short_description_id, price, compare_price, sku, category_id, is_active, is_featured, is_new, quantity, sales_count) VALUES
    ('Dr. Doom Neon Tee', 'Kaos Dr. Doom Neon', 'dr-doom-neon-tee', 
    'Limited edition collaboration featuring the iconic Dr. Doom design with neon green accents. Premium 250 GSM cotton with glow-in-the-dark print technology.',
    'Edisi terbatas kolaborasi menampilkan desain ikonik Dr. Doom dengan aksen neon hijau. Katun premium 250 GSM dengan teknologi cetak glow-in-the-dark.',
    'Limited edition Dr. Doom collaboration with neon green glow-in-the-dark print',
    'Edisi terbatas kolaborasi Dr. Doom dengan cetak neon hijau glow-in-the-dark',
    450000, 550000, 'ZR-DOOM-001', cat_collab, true, true, true, 100, 87)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
    (prod_id, '/images/products/doom-tee-1.jpg', true, 1),
    (prod_id, '/images/products/doom-tee-2.jpg', false, 2),
    (prod_id, '/images/products/doom-tee-3.jpg', false, 3);
    
    INSERT INTO product_sizes (product_id, size, quantity) VALUES
    (prod_id, 'S', 15), (prod_id, 'M', 25), (prod_id, 'L', 30), (prod_id, 'XL', 20), (prod_id, 'XXL', 10);
    
    INSERT INTO product_colors (product_id, color_name_en, color_name_id, color_code, quantity) VALUES
    (prod_id, 'Phantom Black', 'Hitam Phantom', '#0a0a0a', 70),
    (prod_id, 'Doom Green', 'Hijau Doom', '#1a2f1a', 30);

    -- Product 2: Cyber Pulse
    INSERT INTO products (name_en, name_id, slug, description_en, description_id, short_description_en, short_description_id, price, compare_price, sku, category_id, is_active, is_featured, is_bestseller, quantity, sales_count) VALUES
    ('Cyber Pulse Oversized Tee', 'Kaos Oversized Cyber Pulse', 'cyber-pulse-tee', 
    'Futuristic oversized t-shirt featuring dynamic pulse wave design. Made from ultra-soft 240 GSM cotton with reflective print details.',
    'Kaos oversized futuristik menampilkan desain gelombang pulse dinamis. Terbuat dari katun ultra-lembut 240 GSM dengan detail cetak reflektif.',
    'Futuristic oversized tee with reflective pulse wave design',
    'Kaos oversized futuristik dengan desain gelombang pulse reflektif',
    350000, NULL, 'ZR-CYBER-001', cat_best, true, true, true, 150, 234)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
    (prod_id, '/images/products/cyber-tee-1.jpg', true, 1),
    (prod_id, '/images/products/cyber-tee-2.jpg', false, 2);
    
    INSERT INTO product_sizes (product_id, size, quantity) VALUES
    (prod_id, 'M', 40), (prod_id, 'L', 50), (prod_id, 'XL', 40), (prod_id, 'XXL', 20);
    
    INSERT INTO product_colors (product_id, color_name_en, color_name_id, color_code, quantity) VALUES
    (prod_id, 'Midnight Black', 'Hitam Midnight', '#121212', 100),
    (prod_id, 'Neon Matrix', 'Matrix Neon', '#0d1f0d', 50);

    -- Product 3: Zenith Core
    INSERT INTO products (name_en, name_id, slug, description_en, description_id, short_description_en, short_description_id, price, sku, category_id, is_active, is_bestseller, quantity, sales_count) VALUES
    ('Zenith Core Basic Tee', 'Kaos Basic Zenith Core', 'zenith-core-basic', 
    'Essential everyday tee featuring the iconic Zenith.ra logo. Premium 220 GSM combed cotton for ultimate comfort.',
    'Kaos esensial sehari-hari menampilkan logo ikonik Zenith.ra. Katun combed premium 220 GSM untuk kenyamanan maksimal.',
    'Essential everyday tee with iconic Zenith.ra logo',
    'Kaos esensial sehari-hari dengan logo ikonik Zenith.ra',
    250000, 'ZR-CORE-001', cat_basic, true, true, 200, 456)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
    (prod_id, '/images/products/core-tee-1.jpg', true, 1);
    
    INSERT INTO product_sizes (product_id, size, quantity) VALUES
    (prod_id, 'S', 30), (prod_id, 'M', 50), (prod_id, 'L', 60), (prod_id, 'XL', 40), (prod_id, 'XXL', 20);
    
    INSERT INTO product_colors (product_id, color_name_en, color_name_id, color_code, quantity) VALUES
    (prod_id, 'Black', 'Hitam', '#0a0a0a', 120),
    (prod_id, 'White', 'Putih', '#ffffff', 80);

    -- Product 4: Neon Grid
    INSERT INTO products (name_en, name_id, slug, description_en, description_id, short_description_en, short_description_id, price, compare_price, sku, category_id, is_active, is_featured, is_new, quantity, sales_count) VALUES
    ('Neon Grid Premium Tee', 'Kaos Premium Neon Grid', 'neon-grid-premium', 
    'Premium collection featuring geometric neon grid pattern. Heavyweight 260 GSM cotton with UV-reactive print.',
    'Koleksi premium menampilkan pola grid geometris neon. Katun heavyweight 260 GSM dengan cetak UV-reaktif.',
    'Premium tee with geometric neon grid UV-reactive print',
    'Kaos premium dengan cetak grid geometris neon UV-reaktif',
    420000, 500000, 'ZR-GRID-001', cat_premium, true, true, true, 80, 123)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
    (prod_id, '/images/products/grid-tee-1.jpg', true, 1),
    (prod_id, '/images/products/grid-tee-2.jpg', false, 2);
    
    INSERT INTO product_sizes (product_id, size, quantity) VALUES
    (prod_id, 'S', 10), (prod_id, 'M', 20), (prod_id, 'L', 25), (prod_id, 'XL', 15), (prod_id, 'XXL', 10);
    
    INSERT INTO product_colors (product_id, color_name_en, color_name_id, color_code, quantity) VALUES
    (prod_id, 'Void Black', 'Hitam Void', '#050505', 80);

    -- Product 5: Future Vision
    INSERT INTO products (name_en, name_id, slug, description_en, description_id, short_description_en, short_description_id, price, sku, category_id, is_active, is_new, quantity, sales_count) VALUES
    ('Future Vision Tee', 'Kaos Future Vision', 'future-vision-tee', 
    'New arrival featuring holographic-style print design. 230 GSM premium cotton with innovative printing technique.',
    'Produk baru menampilkan desain cetak bergaya holografik. Katun premium 230 GSM dengan teknik cetak inovatif.',
    'New arrival with holographic-style innovative print',
    'Produk baru dengan cetak inovatif bergaya holografik',
    380000, 'ZR-FUTURE-001', cat_new, true, true, 120, 67)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
    (prod_id, '/images/products/future-tee-1.jpg', true, 1);
    
    INSERT INTO product_sizes (product_id, size, quantity) VALUES
    (prod_id, 'S', 20), (prod_id, 'M', 35), (prod_id, 'L', 35), (prod_id, 'XL', 20), (prod_id, 'XXL', 10);
    
    INSERT INTO product_colors (product_id, color_name_en, color_name_id, color_code, quantity) VALUES
    (prod_id, 'Deep Space', 'Deep Space', '#0a0a12', 120);

    -- Product 6: Glitch Effect
    INSERT INTO products (name_en, name_id, slug, description_en, description_id, short_description_en, short_description_id, price, sku, category_id, is_active, quantity, sales_count) VALUES
    ('Glitch Effect Tee', 'Kaos Glitch Effect', 'glitch-effect-tee', 
    'Digital glitch-inspired design representing the fusion of technology and fashion. 240 GSM cotton with distorted print effect.',
    'Desain terinspirasi glitch digital merepresentasikan fusi teknologi dan fashion. Katun 240 GSM dengan efek cetak terdistorsi.',
    'Digital glitch-inspired design with distorted print effect',
    'Desain terinspirasi glitch digital dengan efek cetak terdistorsi',
    320000, 'ZR-GLITCH-001', cat_best, true, 90, 189)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
    (prod_id, '/images/products/glitch-tee-1.jpg', true, 1);
    
    INSERT INTO product_sizes (product_id, size, quantity) VALUES
    (prod_id, 'S', 15), (prod_id, 'M', 25), (prod_id, 'L', 25), (prod_id, 'XL', 15), (prod_id, 'XXL', 10);
    
    INSERT INTO product_colors (product_id, color_name_en, color_name_id, color_code, quantity) VALUES
    (prod_id, 'Charcoal', 'Charcoal', '#1a1a1a', 90);

    -- Product 7: Minimal Zenith
    INSERT INTO products (name_en, name_id, slug, description_en, description_id, short_description_en, short_description_id, price, sku, category_id, is_active, quantity, sales_count) VALUES
    ('Minimal Zenith Tee', 'Kaos Minimal Zenith', 'minimal-zenith-tee', 
    'Clean minimalist design with subtle Zenith branding. Perfect for everyday wear. 220 GSM premium cotton.',
    'Desain minimalis bersih dengan branding Zenith yang halus. Sempurna untuk pakaian sehari-hari. Katun premium 220 GSM.',
    'Clean minimalist design with subtle Zenith branding',
    'Desain minimalis bersih dengan branding Zenith yang halus',
    280000, 'ZR-MINI-001', cat_basic, true, 180, 312)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
    (prod_id, '/images/products/minimal-tee-1.jpg', true, 1);
    
    INSERT INTO product_sizes (product_id, size, quantity) VALUES
    (prod_id, 'S', 30), (prod_id, 'M', 45), (prod_id, 'L', 50), (prod_id, 'XL', 35), (prod_id, 'XXL', 20);
    
    INSERT INTO product_colors (product_id, color_name_en, color_name_id, color_code, quantity) VALUES
    (prod_id, 'Black', 'Hitam', '#0a0a0a', 100),
    (prod_id, 'Navy', 'Navy', '#0a0a1a', 80);

    -- Product 8: Limited Collab V2
    INSERT INTO products (name_en, name_id, slug, description_en, description_id, short_description_en, short_description_id, price, compare_price, sku, category_id, is_active, is_featured, quantity, sales_count) VALUES
    ('Collab Series V2 Tee', 'Kaos Collab Series V2', 'collab-series-v2', 
    'Second edition of our collaboration series. Limited to 200 pieces worldwide. Premium 250 GSM with special packaging.',
    'Edisi kedua dari seri kolaborasi kami. Terbatas 200 piece di seluruh dunia. Premium 250 GSM dengan kemasan khusus.',
    'Limited edition collaboration - only 200 pieces worldwide',
    'Edisi terbatas kolaborasi - hanya 200 piece di seluruh dunia',
    550000, 650000, 'ZR-COLV2-001', cat_limited, true, true, 50, 150)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
    (prod_id, '/images/products/collab-v2-1.jpg', true, 1),
    (prod_id, '/images/products/collab-v2-2.jpg', false, 2);
    
    INSERT INTO product_sizes (product_id, size, quantity) VALUES
    (prod_id, 'M', 15), (prod_id, 'L', 20), (prod_id, 'XL', 15);
    
    INSERT INTO product_colors (product_id, color_name_en, color_name_id, color_code, quantity) VALUES
    (prod_id, 'Shadow Black', 'Hitam Shadow', '#080808', 50);

END $$;

-- Insert dummy testimonials
INSERT INTO testimonials (customer_name, customer_location, rating, content_en, content_id, is_featured) VALUES
('Andi Pratama', 'Jakarta', 5, 
'Amazing quality! The neon print really glows in the dark. Best streetwear brand in Indonesia.', 
'Kualitas luar biasa! Print neon benar-benar menyala dalam gelap. Brand streetwear terbaik di Indonesia.',
true),
('Sarah Chen', 'Singapore', 5, 
'Love the futuristic design. The cotton quality is premium and very comfortable.',
'Suka dengan desain futuristiknya. Kualitas katunnya premium dan sangat nyaman.',
true),
('Budi Santoso', 'Bandung', 4, 
'Great design and fast shipping. Will definitely buy more from Zenith.ra!',
'Desain bagus dan pengiriman cepat. Pasti akan beli lagi dari Zenith.ra!',
true),
('Maya Wong', 'Kuala Lumpur', 5, 
'The Dr. Doom collab is fire! Limited edition worth every penny.',
'Kolaborasi Dr. Doom keren banget! Edisi terbatas yang worth it.',
true);

-- =====================================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_sizes_product ON product_sizes(product_id);
CREATE INDEX idx_product_colors_product ON product_colors(product_id);
CREATE INDEX idx_sales_statistics_date ON sales_statistics(date);
CREATE INDEX idx_banners_position ON banners(position);
CREATE INDEX idx_faqs_category ON faqs(category);

-- =====================================================
-- CREATE UPDATED_AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read active content)
CREATE POLICY "Public can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active banners" ON banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active pages" ON pages FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active faqs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

-- =====================================================
-- STORAGE BUCKETS SETUP (Run in Supabase Dashboard)
-- =====================================================
-- Create these buckets in Supabase Storage:
-- 1. 'products' - for product images
-- 2. 'banners' - for banner images  
-- 3. 'media' - for general media uploads
-- 4. 'logos' - for logo files

-- Example storage policies (set in Supabase Dashboard):
-- Public read access for all buckets
-- Authenticated write access for admin operations

-- =====================================================
-- DONE! Your database is ready.
-- =====================================================
