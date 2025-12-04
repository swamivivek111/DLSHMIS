-- Test Data Setup for Hospital Management System

-- Master Data Setup
INSERT INTO countries (id, name, code) VALUES 
(1, 'India', 'IN'),
(2, 'United States', 'US'),
(3, 'United Kingdom', 'UK');

INSERT INTO states (id, name, code, country_id) VALUES 
(1, 'Karnataka', 'KA', 1),
(2, 'Maharashtra', 'MH', 1),
(3, 'California', 'CA', 2);

INSERT INTO cities (id, name, code, state_id) VALUES 
(1, 'Bangalore', 'BLR', 1),
(2, 'Mumbai', 'MUM', 2),
(3, 'Los Angeles', 'LA', 3);

INSERT INTO departments (id, name, description, status) VALUES 
(1, 'Cardiology', 'Heart and cardiovascular system', 'ACTIVE'),
(2, 'Orthopedics', 'Bones and joints', 'ACTIVE'),
(3, 'Neurology', 'Brain and nervous system', 'ACTIVE'),
(4, 'Pediatrics', 'Children healthcare', 'ACTIVE'),
(5, 'Gynecology', 'Women healthcare', 'ACTIVE');

INSERT INTO blood_groups (id, name, description) VALUES 
(1, 'A+', 'A Positive'),
(2, 'A-', 'A Negative'),
(3, 'B+', 'B Positive'),
(4, 'B-', 'B Negative'),
(5, 'AB+', 'AB Positive'),
(6, 'AB-', 'AB Negative'),
(7, 'O+', 'O Positive'),
(8, 'O-', 'O Negative');

-- Test Users Setup
INSERT INTO users (id, email, password, role, status, created_date) VALUES 
(1, 'admin@hms.com', '$2a$10$encrypted_password', 'ADMIN', 'ACTIVE', NOW()),
(2, 'doctor1@hms.com', '$2a$10$encrypted_password', 'DOCTOR', 'ACTIVE', NOW()),
(3, 'doctor2@hms.com', '$2a$10$encrypted_password', 'DOCTOR', 'ACTIVE', NOW()),
(4, 'patient1@hms.com', '$2a$10$encrypted_password', 'PATIENT', 'ACTIVE', NOW()),
(5, 'patient2@hms.com', '$2a$10$encrypted_password', 'PATIENT', 'ACTIVE', NOW());

-- Test Doctors Setup
INSERT INTO doctors (id, user_id, name, specialization, qualification, experience, department_id, phone, status) VALUES 
(1, 2, 'Dr. John Smith', 'Cardiologist', 'MD Cardiology', 15, 1, '+1234567890', 'ACTIVE'),
(2, 3, 'Dr. Sarah Johnson', 'Orthopedic Surgeon', 'MS Orthopedics', 12, 2, '+1234567891', 'ACTIVE');

-- Test Patients Setup
INSERT INTO patients (id, user_id, name, age, gender, blood_group_id, phone, address, emergency_contact, status) VALUES 
(1, 4, 'Alice Brown', 35, 'FEMALE', 1, '+1234567892', '123 Main St, City', '+1234567893', 'ACTIVE'),
(2, 5, 'Bob Wilson', 42, 'MALE', 3, '+1234567894', '456 Oak Ave, City', '+1234567895', 'ACTIVE');

-- Test Medicines Setup
INSERT INTO medicines (id, name, generic_name, manufacturer, category, unit_price, stock_quantity, expiry_date) VALUES 
(1, 'Aspirin 75mg', 'Acetylsalicylic Acid', 'PharmaCorp', 'Cardiovascular', 0.50, 1000, '2025-12-31'),
(2, 'Paracetamol 500mg', 'Acetaminophen', 'MediLab', 'Analgesic', 0.25, 2000, '2025-06-30'),
(3, 'Amoxicillin 250mg', 'Amoxicillin', 'AntibioTech', 'Antibiotic', 1.20, 500, '2024-12-31');

-- Test Lab Tests Setup
INSERT INTO lab_tests (id, name, category, normal_range, unit, price) VALUES 
(1, 'Complete Blood Count', 'Hematology', 'Various ranges', 'Multiple', 25.00),
(2, 'Blood Sugar Fasting', 'Biochemistry', '70-100 mg/dL', 'mg/dL', 15.00),
(3, 'Lipid Profile', 'Biochemistry', 'Various ranges', 'mg/dL', 35.00);

-- Test Beds Setup
INSERT INTO beds (id, bed_number, ward_name, bed_type, status, daily_charge) VALUES 
(1, 'ICU-001', 'ICU', 'ICU', 'AVAILABLE', 500.00),
(2, 'GEN-001', 'General Ward', 'GENERAL', 'AVAILABLE', 100.00),
(3, 'PVT-001', 'Private Room', 'PRIVATE', 'AVAILABLE', 200.00);

-- Sample Appointments for Testing
INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, appointment_time, status, reason, created_date) VALUES 
(1, 1, 1, '2024-01-15', '10:00:00', 'SCHEDULED', 'Chest pain consultation', NOW()),
(2, 2, 2, '2024-01-16', '14:30:00', 'SCHEDULED', 'Knee pain evaluation', NOW());

-- Sample Medical Records
INSERT INTO medical_records (id, patient_id, doctor_id, visit_date, diagnosis, symptoms, treatment, notes) VALUES 
(1, 1, 1, '2024-01-10', 'Hypertension', 'High blood pressure, headache', 'Prescribed antihypertensive medication', 'Follow up in 2 weeks'),
(2, 2, 2, '2024-01-12', 'Osteoarthritis', 'Joint pain, stiffness', 'Physical therapy recommended', 'Avoid high impact activities');

-- Sample Prescriptions
INSERT INTO prescriptions (id, patient_id, doctor_id, medicine_id, dosage, frequency, duration, instructions) VALUES 
(1, 1, 1, 1, '75mg', 'Once daily', '30 days', 'Take after breakfast'),
(2, 1, 1, 2, '500mg', 'Twice daily', '5 days', 'Take with food if stomach upset'),
(3, 2, 2, 2, '500mg', 'Three times daily', '7 days', 'Complete the course');