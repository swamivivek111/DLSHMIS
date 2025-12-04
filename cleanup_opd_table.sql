-- Clean up OPD patient registrations table to match entity
USE opddb;

-- Drop existing table and recreate with only required fields
DROP TABLE IF EXISTS opd_patient_registrations;

CREATE TABLE opd_patient_registrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    prn_number VARCHAR(255) UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    date_of_birth DATETIME(6),
    age INT,
    mobile VARCHAR(255) NOT NULL,
    alternate_mobile VARCHAR(255),
    aadhar_number VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    address TEXT,
    country_id BIGINT,
    state_id BIGINT,
    city_id BIGINT,
    pincode VARCHAR(255),
    patient_category_id BIGINT,
    id_proof_type ENUM('AADHAR', 'PAN', 'PASSPORT', 'DRIVING_LICENSE', 'VOTER_ID', 'OTHER'),
    id_proof_number VARCHAR(255),
    emergency_contact_name VARCHAR(255) NOT NULL,
    emergency_contact_phone VARCHAR(255) NOT NULL,
    relationship ENUM('FATHER', 'MOTHER', 'SPOUSE', 'SON', 'DAUGHTER', 'BROTHER', 'SISTER', 'FRIEND', 'OTHER') NOT NULL,
    patient_photo_path VARCHAR(255),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6)
);