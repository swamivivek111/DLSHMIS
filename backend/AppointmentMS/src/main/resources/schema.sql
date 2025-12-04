CREATE TABLE IF NOT EXISTS appointment (
    appointment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT,
    patient_name VARCHAR(255),
    doctor_id BIGINT,
    doctor_name VARCHAR(255),
    department_id BIGINT,
    department_name VARCHAR(255),
    appointment_date DATETIME,
    time_slot VARCHAR(50),
    session_type VARCHAR(20),
    status INT DEFAULT 0,
    notes TEXT,
    booked_by VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);