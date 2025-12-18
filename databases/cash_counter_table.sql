-- Cash Counter Master table
CREATE TABLE IF NOT EXISTS masterdb.cash_counters (
    cash_counter_id INT AUTO_INCREMENT PRIMARY KEY,
    counter_name VARCHAR(150) NOT NULL,
    description VARCHAR(150),
    system_name VARCHAR(150),
    token_required BOOLEAN DEFAULT FALSE,
    counter_type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_counter_name (counter_name),
    INDEX idx_counter_type (counter_type),
    INDEX idx_system_name (system_name)
);