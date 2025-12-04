-- Recreate OPD Patient Registrations table based on simplified entity
DROP TABLE IF EXISTS opddb.opd_patient_registrations;

CREATE TABLE opddb.opd_patient_registrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    prn VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    date_of_birth DATE NOT NULL,
    age INT NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    address TEXT,
    country_id BIGINT,
    state_id BIGINT,
    district_id BIGINT,
    taluka_id BIGINT,
    city_id BIGINT,
    patient_category VARCHAR(50),
    id_proof_type ENUM('AADHAR', 'PAN', 'VOTER_ID', 'DRIVING_LICENSE', 'PASSPORT') NOT NULL,
    id_proof_number VARCHAR(50) NOT NULL,
    emergency_contact_name VARCHAR(100) NOT NULL,
    emergency_contact_mobile VARCHAR(15) NOT NULL,
    emergency_contact_relationship ENUM('FATHER', 'MOTHER', 'SPOUSE', 'SIBLING', 'CHILD', 'FRIEND', 'OTHER') NOT NULL,
    photo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_prn (prn),
    INDEX idx_mobile (mobile),
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);