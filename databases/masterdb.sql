-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2025 at 02:40 AM
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
-- Database: `masterdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `application_settings`
--

CREATE TABLE `application_settings` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `data_type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `setting_key` varchar(255) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `application_settings`
--

INSERT INTO `application_settings` (`id`, `active`, `category`, `created_at`, `data_type`, `description`, `setting_key`, `setting_value`, `updated_at`) VALUES
(1, b'1', 'GENERAL', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'hospital.name', 'DLS Multispeciality Hospital', '2025-11-15 18:42:41.000000'),
(2, b'1', 'GENERAL', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'hospital.branch', 'Main Branch', '2025-11-15 18:42:41.000000'),
(3, b'1', 'GENERAL', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'hospital.code', 'DLS-H01', '2025-11-15 18:42:41.000000'),
(4, b'1', 'GENERAL', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'hospital.email', 'admin@dlshmis.com', '2025-11-15 18:42:41.000000'),
(5, b'1', 'GENERAL', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'hospital.phone', '+91 9876543210', '2025-11-15 18:42:41.000000'),
(6, b'1', 'GENERAL', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'hospital.timezone', 'Asia/Kolkata', '2025-11-15 18:42:41.000000'),
(7, b'1', 'MODULE', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'module.doctor', 'true', '2025-11-15 18:42:41.000000'),
(8, b'1', 'MODULE', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'module.pharmacy', 'true', '2025-11-15 18:42:41.000000'),
(9, b'1', 'MODULE', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'module.laboratory', 'true', '2025-11-15 18:42:41.000000'),
(10, b'1', 'MODULE', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'module.ipd', 'true', '2025-11-15 18:42:41.000000'),
(11, b'1', 'MODULE', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'module.appointments', 'true', '2025-11-15 18:42:41.000000'),
(12, b'1', 'MODULE', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'module.queue', 'true', '2025-11-15 18:42:41.000000'),
(13, b'1', 'MODULE', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'module.schedule', 'true', '2025-11-15 18:42:41.000000'),
(14, b'1', 'MODULE', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'module.billing', 'true', '2025-11-15 18:42:41.000000'),
(15, b'1', 'MODULE', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'module.insurance', 'true', '2025-11-15 18:42:41.000000'),
(16, b'1', 'SECURITY', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'security.password_expiry', '90', '2025-11-15 18:42:41.000000'),
(17, b'1', 'SECURITY', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'security.auto_logout', '30', '2025-11-15 18:42:41.000000'),
(18, b'1', 'SECURITY', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'security.strong_password', 'true', '2025-11-15 18:42:41.000000'),
(19, b'1', 'SECURITY', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'security.two_factor', 'false', '2025-11-15 18:42:41.000000'),
(20, b'1', 'SECURITY', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'security.captcha', 'false', '2025-11-15 18:42:41.000000'),
(21, b'1', 'NOTIFICATION', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'notification.email', 'true', '2025-11-15 18:42:41.000000'),
(22, b'1', 'NOTIFICATION', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'notification.sms', 'false', '2025-11-15 18:42:41.000000'),
(23, b'1', 'NOTIFICATION', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'notification.whatsapp', 'false', '2025-11-15 18:42:41.000000'),
(24, b'1', 'APPOINTMENT', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'appointment.slot_duration', '15', '2025-11-15 18:42:41.000000'),
(25, b'1', 'APPOINTMENT', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'appointment.max_per_slot', '1', '2025-11-15 18:42:41.000000'),
(26, b'1', 'APPOINTMENT', '2025-11-15 18:42:41.000000', 'BOOLEAN', NULL, 'appointment.allow_online', 'true', '2025-11-15 18:42:41.000000'),
(27, b'1', 'SYSTEM', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'system.pagination_size', '10', '2025-11-15 18:42:41.000000'),
(28, b'1', 'SYSTEM', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'system.theme', 'light', '2025-11-15 18:42:41.000000'),
(29, b'1', 'SYSTEM', '2025-11-15 18:42:41.000000', 'STRING', NULL, 'system.language', 'en', '2025-11-15 18:42:41.000000');

-- --------------------------------------------------------

--
-- Table structure for table `beds`
--

CREATE TABLE `beds` (
  `id` bigint(20) NOT NULL,
  `bed_charges_per_day` double DEFAULT NULL,
  `bed_number` varchar(255) NOT NULL,
  `bed_status` varchar(255) NOT NULL,
  `bed_type` varchar(255) NOT NULL,
  `current_patient_id` bigint(20) DEFAULT NULL,
  `last_cleaned_date` date DEFAULT NULL,
  `monitor_available` bit(1) NOT NULL,
  `monitor_charge` double DEFAULT NULL,
  `nursing_charge` double DEFAULT NULL,
  `oxygen_point_available` bit(1) NOT NULL,
  `room_id` bigint(20) NOT NULL,
  `room_number` varchar(255) DEFAULT NULL,
  `special_equipment_charge` double DEFAULT NULL,
  `suction_point_available` bit(1) NOT NULL,
  `ventilator_charge` double DEFAULT NULL,
  `ward_id` bigint(20) NOT NULL,
  `ward_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beds`
--

INSERT INTO `beds` (`id`, `bed_charges_per_day`, `bed_number`, `bed_status`, `bed_type`, `current_patient_id`, `last_cleaned_date`, `monitor_available`, `monitor_charge`, `nursing_charge`, `oxygen_point_available`, `room_id`, `room_number`, `special_equipment_charge`, `suction_point_available`, `ventilator_charge`, `ward_id`, `ward_name`) VALUES
(1, 1000, '10', 'AVAILABLE', 'GENERAL', NULL, '2025-11-02', b'1', 1000, 500, b'1', 2, '101', 1000, b'1', 1000, 1, 'wing');

-- --------------------------------------------------------

--
-- Table structure for table `blood_group`
--

CREATE TABLE `blood_group` (
  `blood_group_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_group`
--

INSERT INTO `blood_group` (`blood_group_id`, `active`, `blood_group`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(1, b'1', 'B+', '2025-07-19 15:26:03.000000', 'Test', NULL, NULL),
(2, b'1', 'o -', '2025-11-17 17:54:13.000000', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `city_name` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `pin_code` varchar(255) DEFAULT NULL,
  `taluka_id` bigint(20) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `active`, `city_name`, `created_at`, `created_by`, `pin_code`, `taluka_id`, `updated_at`, `updated_by`) VALUES
(2, b'1', 'Hipparga', '2025-11-17 16:21:39.000000', '', '413605', 2, '2025-11-17 16:23:02.000000', NULL),
(3, b'1', 'Pune', '2025-11-18 14:44:38.000000', '', 'PUN', 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `country_name` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`country_id`, `active`, `country_code`, `country_name`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(1, b'1', 'IND', 'India', '2025-07-19 15:09:29.000000', 'Test Admin', '2025-11-17 14:49:18.000000', NULL),
(2, b'1', 'SRK', 'Shrilanka', '2025-07-19 15:11:51.000000', 'Test Adm,in', '2025-11-17 14:49:13.000000', NULL),
(3, b'1', '123', 'aMERICA', '2025-11-17 12:42:30.000000', '', NULL, NULL),
(4, b'1', 'IND', 'indiiia', '2025-11-17 14:49:43.000000', '', '2025-11-17 14:51:39.000000', NULL),
(5, b'1', 'om', 'om', '2025-11-17 14:53:08.000000', '', '2025-11-17 14:54:48.000000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `head_of_department` varchar(255) DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `active`, `contact_number`, `created_at`, `description`, `email`, `head_of_department`, `hospital_id`, `name`, `updated_at`, `code`, `type`) VALUES
(1, b'1', '9076876786', NULL, 'Pathalogy', 'swami@gmail.com', 'Dayanand L. Swami', 1, 'Pathalogy', '2025-11-17 10:14:54.000000', 'PATH0001', NULL),
(2, b'1', '9776876781', '2025-05-25 00:00:00.000000', 'Cardialogy', 'yuvaraj.swami@gmail.com', 'Yuvaraj I Swami', 1, 'Cardialogy', '2025-11-17 10:07:08.000000', 'CARD0001', NULL),
(4, b'1', '9088888884', NULL, 'Newurology', 'dhanaraj@hmis.com', 'Dhanaraj I Swami', 1, 'Neurology', NULL, 'NEU001', NULL),
(5, b'1', '8899045645', NULL, 'Orthopedics', 'samirm@gmail.com', 'Samir M Divane', 1, 'Orthopedics', NULL, 'ORTH0001', NULL),
(6, b'1', '8767856666', NULL, 'Pediatrics', 'sangam@gmail.com', 'Sangamnerkar', 1, 'Pediatrics', NULL, 'PEDI001', NULL),
(7, b'1', '9089768678', NULL, 'Radiology', 'Radiology@gmail.com', 'Radiology', 1, 'Radiology', NULL, 'Radiology', NULL),
(8, b'1', '7350256796', NULL, 'Oncology', 'Oncology@mail.com', 'Oncology', 1, 'Oncology', NULL, 'Oncology', NULL),
(9, b'1', '8878765756', NULL, 'Emergency Medicine', 'emergency@gmail.com', 'Emergency Medicine', 1, 'Emergency Medicine', NULL, 'Emergency Medicine', NULL),
(10, b'1', '8878978989', NULL, 'Anesthesiology', 'Anesthesiology@gmail.com', 'Anesthesiology', 1, 'Anesthesiology', NULL, 'Anesthesiology', NULL),
(12, b'1', '7350256781', NULL, 'Test', 'Test@gmail.com', 'Test', 2, 'Test Department', '2025-11-17 10:16:04.000000', 'Test', NULL),
(13, b'1', '9989867866', NULL, 'Dermatology', 'Dermatology@gmail.com', 'Dermatology', 1, 'Dermatology', NULL, 'DERM001', NULL),
(14, b'1', '8967867861', NULL, 'Test', 'Test@gmail.com', 'Test', 1, 'Test', NULL, 'Test', NULL),
(15, b'1', '7879456125', '2025-11-17 09:58:54.000000', '', 'dswami@gmail.com', '', 1, 'Testing Department', NULL, '123456', NULL),
(16, b'1', '8547854785', '2025-11-19 18:45:03.000000', '', 'test@gmail.com', 'Test', 2, 'test', NULL, '12456', NULL),
(17, b'1', '9858475896', '2025-11-19 18:45:45.000000', '', 'd@gmail.com', 'test', 1, 'test', NULL, '77485', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `designation_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `designation_code` varchar(255) DEFAULT NULL,
  `designation_name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`designation_id`, `active`, `created_at`, `created_by`, `description`, `designation_code`, `designation_name`, `updated_at`, `updated_by`, `hospital_id`) VALUES
(1, b'1', '2025-07-19 15:26:47.000000', 'Ttres', 'Test', 'MD', 'Master in Doctorate', '2025-11-17 16:27:00.000000', NULL, NULL),
(2, b'1', '2025-11-17 16:26:46.000000', '', '', '54857', 'Manager', NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `district_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `district_code` varchar(255) DEFAULT NULL,
  `district_name` varchar(255) DEFAULT NULL,
  `state_id` bigint(20) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`district_id`, `active`, `created_at`, `created_by`, `district_code`, `district_name`, `state_id`, `updated_at`, `updated_by`) VALUES
(2, b'1', '2025-11-17 15:41:33.000000', '', 'DH', 'Dharashiv', 4, '2025-11-17 15:42:43.000000', NULL),
(3, b'1', '2025-11-17 15:45:37.000000', '', 'PUN', 'PUNE', 4, '2025-11-17 15:50:21.000000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `doctor_share` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_consultation_fees` double DEFAULT NULL,
  `follow_up_fees` double DEFAULT NULL,
  `joining_date` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `panno` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `city_id` bigint(20) DEFAULT NULL,
  `district_id` bigint(20) DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `active`, `address`, `city`, `code`, `contact_number`, `created_at`, `created_by`, `department_id`, `district`, `doctor_share`, `email_id`, `first_consultation_fees`, `follow_up_fees`, `joining_date`, `name`, `panno`, `qualification`, `specialization`, `type`, `updated_at`, `updated_by`, `city_id`, `district_id`, `hospital_id`) VALUES
(5, b'1', 'PUNE', NULL, '4578', '8746522154', '2025-11-17 16:50:34.000000', 'Test Admin', 12, NULL, '', 'S@GMAIL.COM', 1000, 100, '2025-01-05', 'DAYANAND SWAMI', 'HHSWP1234D', 'MASTER', 'MD', 'TYPE', '2025-11-17 17:06:19.000000', NULL, 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city_id` bigint(20) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `district_id` bigint(20) DEFAULT NULL,
  `doctor_share` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_consultation_fees` varchar(255) DEFAULT NULL,
  `follow_up_fees` varchar(255) DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `panno` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `active`, `address`, `city_id`, `code`, `contact_number`, `created_at`, `created_by`, `department_id`, `district_id`, `doctor_share`, `email_id`, `first_consultation_fees`, `follow_up_fees`, `hospital_id`, `joining_date`, `name`, `panno`, `qualification`, `specialization`, `type`, `updated_at`) VALUES
(1, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC001', '9876543210', '2025-11-18 13:31:06.000000', 'System', 1, 1, '20%', 'john.smith@hospital.com', '1500', '1000', 1, '2023-11-18', 'Dr. John Smith', 'PAN001', 'MBBS, MD Cardiology', 'Cardiology', 'Senior', '2025-11-18 13:31:06.000000'),
(2, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC002', '9876543211', '2025-11-18 13:31:07.000000', 'System', 2, 1, '25%', 'sarah.johnson@hospital.com', '1800', '1200', 1, '2023-11-18', 'Dr. Sarah Johnson', 'PAN002', 'MBBS, DM Neurology', 'Neurology', 'Senior', '2025-11-18 13:31:07.000000'),
(3, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC003', '9876543212', '2025-11-18 13:31:07.000000', 'System', 3, 1, '22%', 'michael.brown@hospital.com', '1600', '1100', 1, '2023-11-18', 'Dr. Michael Brown', 'PAN003', 'MBBS, MS Orthopedics', 'Orthopedics', 'Senior', '2025-11-18 13:31:07.000000'),
(4, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC004', '9876543213', '2025-11-18 13:31:07.000000', 'System', 4, 1, '18%', 'emily.davis@hospital.com', '1400', '900', 1, '2023-11-18', 'Dr. Emily Davis', 'PAN004', 'MBBS, MD Pediatrics', 'Pediatrics', 'Senior', '2025-11-18 13:31:07.000000'),
(5, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC005', '9876543214', '2025-11-18 13:31:07.000000', 'System', 5, 1, '30%', 'robert.wilson@hospital.com', '2000', '1500', 1, '2023-11-18', 'Dr. Robert Wilson', 'PAN005', 'MBBS, MS Surgery', 'General Surgery', 'Senior', '2025-11-18 13:31:07.000000'),
(6, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC006', '9876543215', '2025-11-18 13:31:07.000000', 'System', 6, 1, '25%', 'lisa.anderson@hospital.com', '1700', '1200', 1, '2023-11-18', 'Dr. Lisa Anderson', 'PAN006', 'MBBS, MD Gynecology', 'Gynecology', 'Senior', '2025-11-18 13:31:07.000000'),
(7, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC007', '9876543216', '2025-11-18 13:31:07.000000', 'System', 7, 1, '15%', 'david.miller@hospital.com', '1300', '800', 1, '2023-11-18', 'Dr. David Miller', 'PAN007', 'MBBS, MD Dermatology', 'Dermatology', 'Senior', '2025-11-18 13:31:07.000000'),
(8, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC008', '9876543217', '2025-11-18 13:31:07.000000', 'System', 8, 1, '20%', 'jennifer.garcia@hospital.com', '1600', '1000', 1, '2023-11-18', 'Dr. Jennifer Garcia', 'PAN008', 'MBBS, MD Psychiatry', 'Psychiatry', 'Senior', '2025-11-18 13:31:07.000000'),
(9, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC009', '9876543218', '2025-11-18 13:31:07.000000', 'System', 9, 1, '20%', 'christopher.lee@hospital.com', '1500', '1000', 1, '2023-11-18', 'Dr. Christopher Lee', 'PAN009', 'MBBS, MD Radiology', 'Radiology', 'Senior', '2025-11-18 13:31:07.000000'),
(10, b'1', 'Hospital Medical District, Mumbai', 1, 'DOC010', '9876543219', '2025-11-18 13:31:07.000000', 'System', 10, 1, '18%', 'amanda.taylor@hospital.com', '1400', '900', 1, '2023-11-18', 'Dr. Amanda Taylor', 'PAN010', 'MBBS, MD Anesthesia', 'Anesthesiology', 'Senior', '2025-11-18 13:31:07.000000');

-- --------------------------------------------------------

--
-- Table structure for table `doctors_schedule`
--

CREATE TABLE `doctors_schedule` (
  `id` bigint(20) NOT NULL,
  `afternoon_slot_from` varchar(255) DEFAULT NULL,
  `afternoon_slot_to` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `evening_slot_from` varchar(255) DEFAULT NULL,
  `evening_slot_to` varchar(255) DEFAULT NULL,
  `morning_slot_from` varchar(255) DEFAULT NULL,
  `morning_slot_to` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_schedules`
--

CREATE TABLE `doctor_schedules` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `day_of_week` enum('FRIDAY','MONDAY','SATURDAY','SUNDAY','THURSDAY','TUESDAY','WEDNESDAY') NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `end_time` time(6) NOT NULL,
  `holiday_reason` varchar(255) DEFAULT NULL,
  `is_available` bit(1) NOT NULL,
  `is_holiday` bit(1) NOT NULL,
  `is_leave` bit(1) NOT NULL,
  `leave_reason` varchar(255) DEFAULT NULL,
  `max_patients` int(11) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `schedule_date` date NOT NULL,
  `schedule_type` enum('DAILY','MONTHLY','WEEKLY') NOT NULL,
  `session_type` enum('AFTERNOON','EVENING','MORNING') NOT NULL,
  `slot_duration` int(11) NOT NULL,
  `start_time` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_schedules`
--

INSERT INTO `doctor_schedules` (`id`, `active`, `day_of_week`, `doctor_id`, `doctor_name`, `end_time`, `holiday_reason`, `is_available`, `is_holiday`, `is_leave`, `leave_reason`, `max_patients`, `notes`, `schedule_date`, `schedule_type`, `session_type`, `slot_duration`, `start_time`) VALUES
(1, b'1', 'MONDAY', 1, 'Dayanand Swami', '17:00:00.000000', '', b'1', b'0', b'0', '', 10, 'Only available in afternoon session', '2025-11-14', 'DAILY', 'AFTERNOON', 15, '14:00:00.000000'),
(2, b'1', 'MONDAY', 1, 'Dayanand Swami', '21:00:00.000000', '', b'1', b'0', b'0', '', 10, 'Evening', '2025-11-16', 'DAILY', 'EVENING', 15, '18:00:00.000000'),
(3, b'0', 'MONDAY', 1, 'Dayanand Swami', '12:00:00.000000', '', b'1', b'0', b'0', '', 10, 'Testing', '2025-11-17', 'DAILY', 'MORNING', 15, '09:00:00.000000'),
(4, b'0', 'MONDAY', 1, 'Dayanand Swami', '11:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-17', 'DAILY', 'MORNING', 20, '10:00:00.000000'),
(5, b'1', 'MONDAY', 3, 'Vivekanand Swami', '11:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-16', 'DAILY', 'MORNING', 20, '10:00:00.000000'),
(6, b'1', 'MONDAY', 1, 'Dr. Vivekanand Swami', '11:00:00.000000', NULL, b'1', b'0', b'0', NULL, 3, NULL, '2024-12-16', 'WEEKLY', 'MORNING', 20, '10:00:00.000000'),
(7, b'1', 'MONDAY', 2, 'Prashant Salgar', '12:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-17', 'DAILY', 'MORNING', 15, '09:00:00.000000'),
(8, b'1', 'MONDAY', 2, 'Prashant Salgar', '21:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-17', 'DAILY', 'EVENING', 15, '18:00:00.000000'),
(9, b'1', 'MONDAY', 11, 'Dr. John Smith', '21:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-17', 'DAILY', 'EVENING', 15, '18:00:00.000000'),
(10, b'1', 'MONDAY', 17, 'Dr. David Miller', '11:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-17', 'DAILY', 'MORNING', 15, '09:00:00.000000'),
(11, b'1', 'MONDAY', 17, 'Dr. David Miller', '21:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-17', 'DAILY', 'EVENING', 15, '18:00:00.000000'),
(12, b'1', 'MONDAY', 11, 'Dr. John Smith', '21:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-19', 'DAILY', 'EVENING', 20, '18:00:00.000000'),
(13, b'1', 'MONDAY', 14, 'Dr. Emily Davis', '21:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-19', 'DAILY', 'EVENING', 15, '18:00:00.000000'),
(14, b'1', 'MONDAY', 14, 'Dr. Emily Davis', '21:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-19', 'DAILY', 'EVENING', 15, '18:00:00.000000'),
(15, b'1', 'MONDAY', 11, 'Dr. John Smith', '12:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-19', 'DAILY', 'MORNING', 15, '09:00:00.000000'),
(16, b'1', 'MONDAY', 11, 'Dr. John Smith', '17:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-19', 'DAILY', 'AFTERNOON', 15, '14:00:00.000000'),
(17, b'1', 'MONDAY', 11, 'Dr. John Smith', '21:00:00.000000', '', b'1', b'0', b'0', '', 10, '', '2025-11-19', 'DAILY', 'EVENING', 15, '18:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city_id` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `designation_id` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `employee_code` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `joining_date` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `state_id` varchar(255) DEFAULT NULL,
  `title_id` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `country_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `active`, `address`, `city_id`, `country`, `created_at`, `created_by`, `department_id`, `designation_id`, `dob`, `email_id`, `employee_code`, `first_name`, `gender`, `joining_date`, `last_name`, `middle_name`, `mobile_no`, `pincode`, `qualification`, `remark`, `role_id`, `state_id`, `title_id`, `updated_at`, `updated_by`, `country_id`) VALUES
(1, b'1', '', '2', NULL, '2025-11-17 17:36:49.000000', '', 12, '1', '2025-11-05T18:30:00.000Z', 'ram@gmail.com', '1245', 'Ram', 'Male', '2025-11-11T18:30:00.000Z', 'Vibhute', 'Rajkumar', '8457744458', '413604', 'master', '', '245', '4', 'Mr.', '2025-11-17 17:57:43.000000', NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `hospital_id` bigint(20) NOT NULL,
  `accreditation` varchar(255) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `emergency_beds` int(11) DEFAULT NULL,
  `established_year` varchar(255) DEFAULT NULL,
  `hospital_code` varchar(255) NOT NULL,
  `hospital_name` varchar(255) NOT NULL,
  `hospital_type` varchar(255) DEFAULT NULL,
  `icu_beds` int(11) DEFAULT NULL,
  `license_number` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `registration_number` varchar(255) DEFAULT NULL,
  `specialties` varchar(2000) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `total_beds` int(11) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`hospital_id`, `accreditation`, `active`, `address`, `city`, `country`, `created_at`, `created_by`, `description`, `email_id`, `emergency_beds`, `established_year`, `hospital_code`, `hospital_name`, `hospital_type`, `icu_beds`, `license_number`, `logo_url`, `phone_number`, `pincode`, `registration_number`, `specialties`, `state`, `total_beds`, `updated_at`, `updated_by`, `website`) VALUES
(1, '', b'1', '', '', '', '2025-11-17 08:46:06.000000', NULL, '', '', 0, '', '1234567', 'DLS Hospitals', 'Private', 0, '', '', '7845478488', '', '', '', '', 0, '2025-11-17 08:46:31.000000', NULL, ''),
(2, '', b'1', '', '', '', '2025-11-17 10:15:21.000000', NULL, '', '', 0, '', '8745874', 'Hospital Test', 'Private', 0, '', '', '', '', '', '', '', 0, '2025-11-17 10:15:21.000000', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` bigint(20) NOT NULL,
  `aadhar_number` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `prn_no` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) NOT NULL,
  `block_wing` varchar(255) NOT NULL,
  `floor_no` varchar(255) NOT NULL,
  `max_beds_allowed` int(11) NOT NULL,
  `room_number` varchar(255) NOT NULL,
  `room_status` varchar(255) NOT NULL,
  `room_type` varchar(255) NOT NULL,
  `ward_id` bigint(20) NOT NULL,
  `ward_name` varchar(255) DEFAULT NULL,
  `has_attached_washroom` bit(1) NOT NULL,
  `has_monitor` bit(1) NOT NULL,
  `has_oxygen_point` bit(1) NOT NULL,
  `has_ventilator_support` bit(1) NOT NULL,
  `is_ac` bit(1) NOT NULL,
  `nursing_charges` double DEFAULT NULL,
  `room_charges_per_day` double DEFAULT NULL,
  `utility_charges` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `block_wing`, `floor_no`, `max_beds_allowed`, `room_number`, `room_status`, `room_type`, `ward_id`, `ward_name`, `has_attached_washroom`, `has_monitor`, `has_oxygen_point`, `has_ventilator_support`, `is_ac`, `nursing_charges`, `room_charges_per_day`, `utility_charges`) VALUES
(2, 'A wing', '1st', 2, '101', 'ACTIVE', 'SINGLE', 1, 'wing - samruddhi', b'1', b'1', b'1', b'1', b'0', 500, 1000, 200);

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `state_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `state_code` varchar(255) DEFAULT NULL,
  `state_name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `country_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`state_id`, `active`, `created_at`, `created_by`, `state_code`, `state_name`, `updated_at`, `updated_by`, `country_id`) VALUES
(2, b'1', '2025-11-17 14:57:41.000000', '', 'goa', 'Goa', '2025-11-17 15:33:35.000000', NULL, 1),
(3, b'1', '2025-11-17 14:59:34.000000', '', 'PJB', 'Punjab', NULL, NULL, 1),
(4, b'1', '2025-11-17 15:42:25.000000', '', 'MH', 'Maharashtra', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `taluka`
--

CREATE TABLE `taluka` (
  `taluka_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `district_id` bigint(20) DEFAULT NULL,
  `taluka_code` varchar(255) DEFAULT NULL,
  `taluka_name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taluka`
--

INSERT INTO `taluka` (`taluka_id`, `active`, `created_at`, `created_by`, `district_id`, `taluka_code`, `taluka_name`, `updated_at`, `updated_by`) VALUES
(2, b'1', '2025-11-17 16:18:19.000000', '', 2, 'TULJ', 'Tuljapur', '2025-11-17 16:18:32.000000', NULL),
(3, b'1', '2025-11-18 14:44:10.000000', '', 3, 'HAV', 'Haveli', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `title`
--

CREATE TABLE `title` (
  `title_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `title_name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `title`
--

INSERT INTO `title` (`title_id`, `active`, `created_at`, `gender`, `title_name`, `updated_at`) VALUES
(1, b'1', NULL, 'Male', 'Mr', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_menu`
--

CREATE TABLE `user_menu` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `employee_code` bigint(20) DEFAULT NULL,
  `menu_fields_list` varchar(255) DEFAULT NULL,
  `permissions` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_profile_role`
--

CREATE TABLE `user_profile_role` (
  `role_id` bigint(20) NOT NULL,
  `access_level` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wards`
--

CREATE TABLE `wards` (
  `id` bigint(20) NOT NULL,
  `block_building_name` varchar(255) NOT NULL,
  `department_id` bigint(20) NOT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `floor_no` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `ward_name` varchar(255) NOT NULL,
  `ward_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wards`
--

INSERT INTO `wards` (`id`, `block_building_name`, `department_id`, `department_name`, `description`, `floor_no`, `status`, `ward_name`, `ward_type`) VALUES
(1, 'samruddhi', 16, 'test', '', '1st', 'ACTIVE', 'wing', 'GENERAL');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application_settings`
--
ALTER TABLE `application_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKkv7b5blpcxon1c1mte851f385` (`setting_key`);

--
-- Indexes for table `beds`
--
ALTER TABLE `beds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blood_group`
--
ALTER TABLE `blood_group`
  ADD PRIMARY KEY (`blood_group_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`designation_id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`district_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `doctors_schedule`
--
ALTER TABLE `doctors_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_schedules`
--
ALTER TABLE `doctor_schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`hospital_id`),
  ADD UNIQUE KEY `UKojngqbqhjb0eusexc2vnmfjsy` (`hospital_code`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`state_id`),
  ADD KEY `FKghic7mqjt6qb9vq7up7awu0er` (`country_id`);

--
-- Indexes for table `taluka`
--
ALTER TABLE `taluka`
  ADD PRIMARY KEY (`taluka_id`);

--
-- Indexes for table `title`
--
ALTER TABLE `title`
  ADD PRIMARY KEY (`title_id`);

--
-- Indexes for table `user_menu`
--
ALTER TABLE `user_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profile_role`
--
ALTER TABLE `user_profile_role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `wards`
--
ALTER TABLE `wards`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application_settings`
--
ALTER TABLE `application_settings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `beds`
--
ALTER TABLE `beds`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blood_group`
--
ALTER TABLE `blood_group`
  MODIFY `blood_group_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `country_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `designation_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `district_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctor_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `doctors_schedule`
--
ALTER TABLE `doctors_schedule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor_schedules`
--
ALTER TABLE `doctor_schedules`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `hospital_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `state_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `taluka`
--
ALTER TABLE `taluka`
  MODIFY `taluka_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `title`
--
ALTER TABLE `title`
  MODIFY `title_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_menu`
--
ALTER TABLE `user_menu`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_profile_role`
--
ALTER TABLE `user_profile_role`
  MODIFY `role_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wards`
--
ALTER TABLE `wards`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_code` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `category_type` varchar(50) DEFAULT NULL,
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_code`, `description`, `category_type`, `is_active`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES
(1, 'Medical Services', 'MED001', 'General medical services and consultations', 'MEDICAL', b'1', '2025-11-29 15:00:00.000000', '2025-11-29 15:00:00.000000', 'System', 'System'),
(2, 'Diagnostic Services', 'DIAG001', 'Laboratory and diagnostic services', 'DIAGNOSTIC', b'1', '2025-11-29 15:00:00.000000', '2025-11-29 15:00:00.000000', 'System', 'System'),
(3, 'Administrative', 'ADM001', 'Administrative and billing categories', 'ADMINISTRATIVE', b'1', '2025-11-29 15:00:00.000000', '2025-11-29 15:00:00.000000', 'System', 'System');

-- --------------------------------------------------------

--
-- Table structure for table `tariffs`
--

CREATE TABLE `tariffs` (
  `tariff_id` bigint(20) NOT NULL,
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
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tariffs`
--

INSERT INTO `tariffs` (`tariff_id`, `service_name`, `service_code`, `description`, `base_price`, `discount_price`, `service_category`, `department`, `unit`, `tax_percentage`, `is_active`, `effective_from`, `effective_to`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES
(1, 'General Consultation', 'CONS001', 'General doctor consultation', 500.00, 450.00, 'CONSULTATION', 'General Medicine', 'PER_VISIT', 18.00, b'1', '2025-11-29 15:00:00.000000', NULL, '2025-11-29 15:00:00.000000', '2025-11-29 15:00:00.000000', 'System', 'System'),
(2, 'Blood Test - CBC', 'LAB001', 'Complete Blood Count test', 300.00, 270.00, 'DIAGNOSTIC', 'Laboratory', 'PER_TEST', 18.00, b'1', '2025-11-29 15:00:00.000000', NULL, '2025-11-29 15:00:00.000000', '2025-11-29 15:00:00.000000', 'System', 'System'),
(3, 'X-Ray Chest', 'RAD001', 'Chest X-Ray examination', 800.00, 720.00, 'DIAGNOSTIC', 'Radiology', 'PER_TEST', 18.00, b'1', '2025-11-29 15:00:00.000000', NULL, '2025-11-29 15:00:00.000000', '2025-11-29 15:00:00.000000', 'System', 'System');

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `UK_category_name` (`category_name`);

--
-- Indexes for table `tariffs`
--
ALTER TABLE `tariffs`
  ADD PRIMARY KEY (`tariff_id`),
  ADD UNIQUE KEY `UK_service_code` (`service_code`);

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tariffs`
--
ALTER TABLE `tariffs`
  MODIFY `tariff_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for table `state`
--
ALTER TABLE `state`
  ADD CONSTRAINT `FKghic7mqjt6qb9vq7up7awu0er` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
