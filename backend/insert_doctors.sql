-- Insert 10 dummy doctors
USE masterdb;

INSERT INTO doctors (doctor_name, specialization, qualification, experience_years, phone_number, email, department_id, hospital_id, active, created_date) VALUES
('Dr. John Smith', 'Cardiology', 'MBBS, MD Cardiology', 15, '9876543210', 'john.smith@hospital.com', 1, 1, 1, NOW()),
('Dr. Sarah Johnson', 'Neurology', 'MBBS, DM Neurology', 12, '9876543211', 'sarah.johnson@hospital.com', 2, 1, 1, NOW()),
('Dr. Michael Brown', 'Orthopedics', 'MBBS, MS Orthopedics', 10, '9876543212', 'michael.brown@hospital.com', 3, 1, 1, NOW()),
('Dr. Emily Davis', 'Pediatrics', 'MBBS, MD Pediatrics', 8, '9876543213', 'emily.davis@hospital.com', 4, 1, 1, NOW()),
('Dr. Robert Wilson', 'General Surgery', 'MBBS, MS Surgery', 18, '9876543214', 'robert.wilson@hospital.com', 5, 1, 1, NOW()),
('Dr. Lisa Anderson', 'Gynecology', 'MBBS, MD Gynecology', 14, '9876543215', 'lisa.anderson@hospital.com', 6, 1, 1, NOW()),
('Dr. David Miller', 'Dermatology', 'MBBS, MD Dermatology', 9, '9876543216', 'david.miller@hospital.com', 7, 1, 1, NOW()),
('Dr. Jennifer Garcia', 'Psychiatry', 'MBBS, MD Psychiatry', 11, '9876543217', 'jennifer.garcia@hospital.com', 8, 1, 1, NOW()),
('Dr. Christopher Lee', 'Radiology', 'MBBS, MD Radiology', 13, '9876543218', 'christopher.lee@hospital.com', 9, 1, 1, NOW()),
('Dr. Amanda Taylor', 'Anesthesiology', 'MBBS, MD Anesthesia', 7, '9876543219', 'amanda.taylor@hospital.com', 10, 1, 1, NOW());