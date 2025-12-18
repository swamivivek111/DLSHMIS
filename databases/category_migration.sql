-- Migration script to update categories table structure
USE masterdb;

-- Drop existing categories table if it exists
DROP TABLE IF EXISTS categories;

-- Create new categories table with updated structure
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_code VARCHAR(20) NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY uk_category_code (category_code),
    UNIQUE KEY uk_category_name (category_name),
    INDEX idx_category_name (category_name),
    INDEX idx_is_active (is_active)
);