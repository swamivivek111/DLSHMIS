-- Drop and recreate tariffs table
DROP TABLE IF EXISTS masterdb.tariffs;

CREATE TABLE masterdb.tariffs (
    mapping_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    tariff_name VARCHAR(255) NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_category_name (category_name),
    INDEX idx_tariff_name (tariff_name),
    INDEX idx_active (is_active),
    INDEX idx_effective_dates (effective_from, effective_to)
);