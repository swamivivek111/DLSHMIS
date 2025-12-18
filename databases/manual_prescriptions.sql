-- Manual Prescriptions Table for OPD Database
USE opddb;

CREATE TABLE IF NOT EXISTS manual_prescriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    medicine_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    morning_dose BOOLEAN DEFAULT FALSE,
    afternoon_dose BOOLEAN DEFAULT FALSE,
    evening_dose BOOLEAN DEFAULT FALSE,
    before_food BOOLEAN DEFAULT FALSE,
    after_food BOOLEAN DEFAULT FALSE,
    duration VARCHAR(50),
    prescription_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_patient_id (patient_id),
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_created_at (created_at)
);