-- Company Master Table
CREATE TABLE IF NOT EXISTS companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_code VARCHAR(20),
    company_name VARCHAR(150) NOT NULL,
    company_type ENUM('Corporate','Insurance','TPA') NOT NULL,
    address TEXT,
    email VARCHAR(100),
    phone VARCHAR(20),
    effective_from DATE,
    effective_to DATE NULL,
    org_percentage VARCHAR(20),
    emp_percentage VARCHAR(20),
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO companies (company_code, company_name, company_type, address, email, phone, effective_from, org_percentage, emp_percentage, is_active) VALUES
('CORP001', 'ABC Corporation', 'Corporate', '123 Business Street, Mumbai', 'contact@abccorp.com', '9876543210', '2024-01-01', '80', '20', 1),
('INS001', 'XYZ Insurance Ltd', 'Insurance', '456 Insurance Plaza, Delhi', 'info@xyzinsurance.com', '9876543211', '2024-01-01', '70', '30', 1),
('TPA001', 'Healthcare TPA Services', 'TPA', '789 Medical Center, Bangalore', 'support@healthtpa.com', '9876543212', '2024-01-01', '75', '25', 1),
('CORP002', 'Global Tech Solutions', 'Corporate', '321 Tech Park, Pune', 'admin@globaltech.com', '9876543213', '2024-01-01', '85', '15', 1),
('INS002', 'National Health Insurance', 'Insurance', '654 Health Tower, Chennai', 'care@nationalhealth.com', '9876543214', '2024-01-01', '65', '35', 1);