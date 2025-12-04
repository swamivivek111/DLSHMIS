-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2025 at 02:38 AM
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
-- Database: `auditdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `audit_id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `entity_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `request_data` varchar(2000) DEFAULT NULL,
  `response_data` varchar(2000) DEFAULT NULL,
  `entity_type` varchar(255) DEFAULT NULL,
  `error_message` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `microservice` varchar(255) NOT NULL,
  `module_name` varchar(255) NOT NULL,
  `operation` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `log_level` enum('DEBUG','INFO','WARN','ERROR','CRITICAL') DEFAULT NULL,
  `operation_type` enum('LOGIN','LOGOUT','REGISTER','PASSWORD_RESET','CREATE','READ','UPDATE','DELETE','APPOINTMENT_BOOK','APPOINTMENT_CANCEL','CONSULTATION','ADMISSION','DISCHARGE','PRESCRIPTION','LAB_ORDER','RADIOLOGY_ORDER','BILLING','PAYMENT','INVOICE','NOTIFICATION','REPORT_GENERATE','DATA_EXPORT','BACKUP','USER_MANAGEMENT','ROLE_ASSIGNMENT','SYSTEM_CONFIG') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`audit_id`, `created_at`, `entity_id`, `user_id`, `description`, `request_data`, `response_data`, `entity_type`, `error_message`, `ip_address`, `microservice`, `module_name`, `operation`, `status`, `user_agent`, `user_email`, `user_role`, `log_level`, `operation_type`) VALUES
(1, '2025-11-18 09:22:20.000000', NULL, 1, 'Admin user logged in successfully', NULL, NULL, NULL, NULL, '192.168.1.154', 'UserMS', 'Authentication', 'USER_LOGIN', 'SUCCESS', NULL, 'admin@hms.com', 'ADMIN', 'INFO', 'LOGIN'),
(2, '2025-11-18 10:22:20.000000', NULL, 1, 'Admin user logged out', NULL, NULL, NULL, NULL, '192.168.1.133', 'UserMS', 'Authentication', 'USER_LOGOUT', 'SUCCESS', NULL, 'admin@hms.com', 'ADMIN', 'INFO', 'LOGOUT'),
(3, '2025-11-19 09:22:20.000000', NULL, 2, 'Doctor user logged in successfully', NULL, NULL, NULL, NULL, '192.168.1.159', 'UserMS', 'Authentication', 'USER_LOGIN', 'SUCCESS', NULL, 'doctor@hms.com', 'DOCTOR', 'INFO', 'LOGIN'),
(4, '2025-11-19 10:22:20.000000', NULL, 2, 'Doctor user logged out', NULL, NULL, NULL, NULL, '192.168.1.75', 'UserMS', 'Authentication', 'USER_LOGOUT', 'SUCCESS', NULL, 'doctor@hms.com', 'DOCTOR', 'INFO', 'LOGOUT'),
(5, '2025-11-19 21:22:20.000000', NULL, 3, 'Patient user logged in successfully', NULL, NULL, NULL, NULL, '192.168.1.78', 'UserMS', 'Authentication', 'USER_LOGIN', 'SUCCESS', NULL, 'patient@hms.com', 'PATIENT', 'INFO', 'LOGIN'),
(6, '2025-11-19 22:22:20.000000', NULL, 3, 'Patient user logged out', NULL, NULL, NULL, NULL, '192.168.1.124', 'UserMS', 'Authentication', 'USER_LOGOUT', 'SUCCESS', NULL, 'patient@hms.com', 'PATIENT', 'INFO', 'LOGOUT'),
(7, '2025-11-20 01:22:20.000000', NULL, 1, 'Admin user logged in successfully', NULL, NULL, NULL, NULL, '192.168.1.62', 'UserMS', 'Authentication', 'USER_LOGIN', 'SUCCESS', NULL, 'admin@hms.com', 'ADMIN', 'INFO', 'LOGIN'),
(8, '2025-11-20 02:22:20.000000', NULL, 1, 'Admin user logged out', NULL, NULL, NULL, NULL, '192.168.1.2', 'UserMS', 'Authentication', 'USER_LOGOUT', 'SUCCESS', NULL, 'admin@hms.com', 'ADMIN', 'INFO', 'LOGOUT'),
(9, '2025-11-20 05:22:20.000000', NULL, 2, 'Doctor user logged in successfully', NULL, NULL, NULL, NULL, '192.168.1.98', 'UserMS', 'Authentication', 'USER_LOGIN', 'SUCCESS', NULL, 'doctor@hms.com', 'DOCTOR', 'INFO', 'LOGIN'),
(10, '2025-11-20 08:22:20.000000', NULL, 1, 'Admin user logged in successfully', NULL, NULL, NULL, NULL, '192.168.1.143', 'UserMS', 'Authentication', 'USER_LOGIN', 'SUCCESS', NULL, 'admin@hms.com', 'ADMIN', 'INFO', 'LOGIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`audit_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `audit_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
