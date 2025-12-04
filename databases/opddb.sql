-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2025 at 02:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `opddb`
--

-- --------------------------------------------------------

--
-- Table structure for table `consultation_notes`
--

CREATE TABLE `consultation_notes` (
  `note_id` bigint(20) NOT NULL,
  `additional_notes` varchar(1000) DEFAULT NULL,
  `chief_complaint` varchar(2000) DEFAULT NULL,
  `consultation_date` datetime(6) NOT NULL,
  `diagnosis` varchar(1000) DEFAULT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `family_history` varchar(1000) DEFAULT NULL,
  `follow_up_instructions` varchar(1000) DEFAULT NULL,
  `history_of_present_illness` varchar(2000) DEFAULT NULL,
  `next_follow_up` datetime(6) DEFAULT NULL,
  `past_medical_history` varchar(1000) DEFAULT NULL,
  `patient_id` bigint(20) NOT NULL,
  `physical_examination` varchar(2000) DEFAULT NULL,
  `social_history` varchar(1000) DEFAULT NULL,
  `treatment_plan` varchar(2000) DEFAULT NULL,
  `visit_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `opd_patient_registrations`
--

CREATE TABLE `opd_patient_registrations` (
  `id` bigint(20) NOT NULL,
  `address` text DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `amount_paid` decimal(10,2) DEFAULT NULL,
  `appointment_id` bigint(20) DEFAULT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `consulting_doctor_id` bigint(20) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `date_of_birth` datetime(6) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `discount_percent` decimal(5,2) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `gender` enum('MALE','FEMALE','OTHER') NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `marital_status` enum('SINGLE','MARRIED','DIVORCED','WIDOWED') DEFAULT NULL,
  `mobile` varchar(255) NOT NULL,
  `payment_mode` enum('CASH','CARD','UPI','NET_BANKING','CHEQUE') DEFAULT NULL,
  `payment_reference_no` varchar(255) DEFAULT NULL,
  `registration_date` datetime(6) NOT NULL,
  `registration_fee` decimal(10,2) DEFAULT NULL,
  `uhid` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `visit_source` enum('WALK_IN','APPOINTMENT') NOT NULL,
  `visit_type` enum('NEW','FOLLOW_UP') NOT NULL,
  `allergies` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_phone` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `medical_history` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `prn_number` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `opd_patient_registrations`
--

INSERT INTO `opd_patient_registrations` (`id`, `address`, `age`, `amount_paid`, `appointment_id`, `blood_group`, `consulting_doctor_id`, `created_at`, `date_of_birth`, `department_id`, `discount_percent`, `email`, `first_name`, `gender`, `last_name`, `marital_status`, `mobile`, `payment_mode`, `payment_reference_no`, `registration_date`, `registration_fee`, `uhid`, `updated_at`, `visit_source`, `visit_type`, `allergies`, `city`, `country`, `emergency_contact_name`, `emergency_contact_phone`, `full_name`, `medical_history`, `middle_name`, `pincode`, `prefix`, `prn_number`, `state`) VALUES
(1, '123 Main Street', 30, 100.00, NULL, 'O+', 1, '2025-11-19 17:22:07.000000', '1995-11-19 17:22:07.000000', 1, 0.00, 'john.doe@example.com', 'John', 'MALE', 'Doe', 'MARRIED', '9876543210', 'CASH', NULL, '2025-11-19 17:22:07.000000', 100.00, 'PAT000001', '2025-11-19 17:22:07.000000', 'WALK_IN', 'NEW', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `opd_prescriptions`
--

CREATE TABLE `opd_prescriptions` (
  `prescription_id` bigint(20) NOT NULL,
  `dispensed_by` varchar(255) DEFAULT NULL,
  `dispensed_date` datetime(6) DEFAULT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `dosage` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `instructions` varchar(255) DEFAULT NULL,
  `medication_name` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) NOT NULL,
  `prescribed_date` datetime(6) NOT NULL,
  `route` varchar(255) DEFAULT NULL,
  `status` enum('PRESCRIBED','DISPENSED','CANCELLED','MODIFIED') DEFAULT NULL,
  `visit_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `opd_queue`
--

CREATE TABLE `opd_queue` (
  `queue_id` bigint(20) NOT NULL,
  `called_time` datetime(6) DEFAULT NULL,
  `completed_time` datetime(6) DEFAULT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) NOT NULL,
  `priority` enum('LOW','NORMAL','HIGH','EMERGENCY') DEFAULT NULL,
  `queue_time` datetime(6) NOT NULL,
  `status` enum('WAITING','CALLED','IN_PROGRESS','COMPLETED','SKIPPED') DEFAULT NULL,
  `token_number` int(11) NOT NULL,
  `visit_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `opd_visits`
--

CREATE TABLE `opd_visits` (
  `visit_id` bigint(20) NOT NULL,
  `chief_complaint` varchar(255) DEFAULT NULL,
  `consultation_fee` double DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `hospital_id` bigint(20) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) NOT NULL,
  `referred_by` varchar(255) DEFAULT NULL,
  `status` enum('REGISTERED','WAITING','IN_CONSULTATION','COMPLETED','CANCELLED') DEFAULT NULL,
  `symptoms` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `visit_date` datetime(6) NOT NULL,
  `visit_type` enum('CONSULTATION','FOLLOW_UP','EMERGENCY','ROUTINE_CHECKUP') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vitals`
--

CREATE TABLE `vitals` (
  `vital_id` bigint(20) NOT NULL,
  `blood_pressure` varchar(255) DEFAULT NULL,
  `bmi` double DEFAULT NULL,
  `heart_rate` int(11) DEFAULT NULL,
  `height` double DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `oxygen_saturation` double DEFAULT NULL,
  `pain_scale` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) NOT NULL,
  `recorded_at` datetime(6) NOT NULL,
  `recorded_by` varchar(255) DEFAULT NULL,
  `respiratory_rate` int(11) DEFAULT NULL,
  `temperature` double DEFAULT NULL,
  `visit_id` bigint(20) NOT NULL,
  `weight` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consultation_notes`
--
ALTER TABLE `consultation_notes`
  ADD PRIMARY KEY (`note_id`);

--
-- Indexes for table `opd_patient_registrations`
--
ALTER TABLE `opd_patient_registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_muki8n7ii7xfuxql8mmk6poxw` (`uhid`),
  ADD UNIQUE KEY `UK_r0h4vf1o04c025c2darbtpwmo` (`prn_number`);

--
-- Indexes for table `opd_prescriptions`
--
ALTER TABLE `opd_prescriptions`
  ADD PRIMARY KEY (`prescription_id`);

--
-- Indexes for table `opd_queue`
--
ALTER TABLE `opd_queue`
  ADD PRIMARY KEY (`queue_id`);

--
-- Indexes for table `opd_visits`
--
ALTER TABLE `opd_visits`
  ADD PRIMARY KEY (`visit_id`);

--
-- Indexes for table `vitals`
--
ALTER TABLE `vitals`
  ADD PRIMARY KEY (`vital_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consultation_notes`
--
ALTER TABLE `consultation_notes`
  MODIFY `note_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `opd_patient_registrations`
--
ALTER TABLE `opd_patient_registrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `opd_prescriptions`
--
ALTER TABLE `opd_prescriptions`
  MODIFY `prescription_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `opd_queue`
--
ALTER TABLE `opd_queue`
  MODIFY `queue_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `opd_visits`
--
ALTER TABLE `opd_visits`
  MODIFY `visit_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vitals`
--
ALTER TABLE `vitals`
  MODIFY `vital_id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
