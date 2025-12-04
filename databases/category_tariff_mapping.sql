-- Category Tariff Mapping Table
CREATE TABLE IF NOT EXISTS masterdb.category_tariff_mapping (
    mapping_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    tariff_id INT NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_category_id (category_id),
    INDEX idx_tariff_id (tariff_id),
    INDEX idx_effective_dates (effective_from, effective_to),
    INDEX idx_active (is_active)
);