-- Category and Tariff Master Tables for masterdb

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `category_code` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `category_type` varchar(50) DEFAULT NULL,
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `UK_category_name` (`category_name`),
  UNIQUE KEY `UK_category_code` (`category_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_code`, `description`, `category_type`, `is_active`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES
(1, 'Medical Equipment', 'MED_EQ', 'Medical equipment and devices', 'MEDICAL', b'1', NOW(), NOW(), 'system', 'system'),
(2, 'Pharmaceuticals', 'PHARMA', 'Medicines and pharmaceutical products', 'PHARMACY', b'1', NOW(), NOW(), 'system', 'system'),
(3, 'Diagnostic Services', 'DIAG', 'Diagnostic and laboratory services', 'DIAGNOSTIC', b'1', NOW(), NOW(), 'system', 'system'),
(4, 'Administrative', 'ADMIN', 'Administrative and office supplies', 'ADMINISTRATIVE', b'1', NOW(), NOW(), 'system', 'system'),
(5, 'Treatment Procedures', 'TREAT', 'Medical treatment procedures', 'TREATMENT', b'1', NOW(), NOW(), 'system', 'system');

--
-- Table structure for table `tariffs`
--

CREATE TABLE `tariffs` (
  `tariff_id` bigint NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) NOT NULL,
  `service_code` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `service_category` varchar(50) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `tax_percentage` decimal(5,2) DEFAULT NULL,
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `effective_from` datetime(6) DEFAULT NULL,
  `effective_to` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tariff_id`),
  UNIQUE KEY `UK_service_name` (`service_name`),
  UNIQUE KEY `UK_service_code` (`service_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tariffs`
--

INSERT INTO `tariffs` (`tariff_id`, `service_name`, `service_code`, `description`, `base_price`, `discount_price`, `service_category`, `department`, `unit`, `tax_percentage`, `is_active`, `effective_from`, `effective_to`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES
(1, 'General Consultation', 'GEN_CONS', 'General physician consultation', 500.00, 450.00, 'CONSULTATION', 'GENERAL_MEDICINE', 'PER_VISIT', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system'),
(2, 'Blood Test - CBC', 'CBC_TEST', 'Complete Blood Count test', 300.00, 270.00, 'LABORATORY', 'LABORATORY', 'PER_TEST', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system'),
(3, 'X-Ray Chest', 'XRAY_CHEST', 'Chest X-Ray examination', 800.00, 720.00, 'RADIOLOGY', 'RADIOLOGY', 'PER_TEST', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system'),
(4, 'ECG', 'ECG_TEST', 'Electrocardiogram test', 200.00, 180.00, 'DIAGNOSTIC', 'CARDIOLOGY', 'PER_TEST', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system'),
(5, 'Emergency Consultation', 'EMRG_CONS', 'Emergency department consultation', 1000.00, 900.00, 'CONSULTATION', 'EMERGENCY', 'PER_VISIT', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system'),
(6, 'Cardiology Consultation', 'CARD_CONS', 'Specialist cardiology consultation', 800.00, 720.00, 'CONSULTATION', 'CARDIOLOGY', 'PER_VISIT', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system'),
(7, 'Orthopedic Consultation', 'ORTHO_CONS', 'Orthopedic specialist consultation', 700.00, 630.00, 'CONSULTATION', 'ORTHOPEDICS', 'PER_VISIT', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system'),
(8, 'MRI Scan', 'MRI_SCAN', 'Magnetic Resonance Imaging', 5000.00, 4500.00, 'RADIOLOGY', 'RADIOLOGY', 'PER_TEST', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system'),
(9, 'CT Scan', 'CT_SCAN', 'Computed Tomography scan', 3000.00, 2700.00, 'RADIOLOGY', 'RADIOLOGY', 'PER_TEST', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system'),
(10, 'Ultrasound', 'USG', 'Ultrasonography examination', 1200.00, 1080.00, 'RADIOLOGY', 'RADIOLOGY', 'PER_TEST', 18.00, b'1', NOW(), NULL, NOW(), NOW(), 'system', 'system');

COMMIT;