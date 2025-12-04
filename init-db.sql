CREATE DATABASE IF NOT EXISTS userdb;
CREATE DATABASE IF NOT EXISTS profiledb;
CREATE DATABASE IF NOT EXISTS appointmentdb;
CREATE DATABASE IF NOT EXISTS masterdb;
CREATE DATABASE IF NOT EXISTS opddb;
CREATE DATABASE IF NOT EXISTS auditdb;
CREATE DATABASE IF NOT EXISTS billingdb;
CREATE DATABASE IF NOT EXISTS inventorydb;
CREATE DATABASE IF NOT EXISTS ipddb;
CREATE DATABASE IF NOT EXISTS labdb;
CREATE DATABASE IF NOT EXISTS medicalrecordsdb;
CREATE DATABASE IF NOT EXISTS notificationdb;
CREATE DATABASE IF NOT EXISTS otdb;
CREATE DATABASE IF NOT EXISTS pharmacydb;
CREATE DATABASE IF NOT EXISTS radiologydb;

USE userdb;

-- Insert admin user into the correct table structure
INSERT IGNORE INTO user (email, password, role, name, profile_id, active) VALUES 
('admin123@gmail.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9P8jS6pM8qyoicq', 0, 'System Admin', 1, 1);

USE profiledb;
CREATE TABLE IF NOT EXISTS admin_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO admin_profiles (id, user_id, name, email, phone) VALUES 
(1, 1, 'System Admin', 'admin123@gmail.com', '9999999999');