-- Treatment Sessions Table for OPD Database
USE opddb;

CREATE TABLE IF NOT EXISTS treatment_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    audio_transcript TEXT,
    generated_prescription TEXT,
    session_status VARCHAR(50) DEFAULT 'STARTED',
    session_start_time DATETIME,
    session_end_time DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_patient_id (patient_id),
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_session_status (session_status),
    INDEX idx_created_at (created_at)
);

-- Insert sample data for testing
INSERT INTO treatment_sessions (patient_id, doctor_id, session_status, session_start_time) VALUES
(1, 1, 'COMPLETED', NOW() - INTERVAL 1 DAY),
(2, 1, 'COMPLETED', NOW() - INTERVAL 2 HOUR);