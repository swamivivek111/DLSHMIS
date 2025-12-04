-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2025 at 02:37 AM
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
-- Database: `appointmentdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` bigint(20) NOT NULL,
  `appointment_date_time` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `appointment_date` datetime(6) DEFAULT NULL,
  `booked_by` varchar(255) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `session_type` varchar(255) DEFAULT NULL,
  `time_slot` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `appointment_date_time`, `created_at`, `doctor_id`, `notes`, `patient_id`, `reason`, `status`, `updated_at`, `appointment_date`, `booked_by`, `department_id`, `department_name`, `doctor_name`, `patient_name`, `session_type`, `time_slot`) VALUES
(5, NULL, '2025-11-15 21:28:57.000000', 2, '', 1, NULL, 0, NULL, '2025-11-16 18:30:00.000000', 'Admin', 4, 'Neurology', 'Dr. Prashant Salgar - MD', 'John Doe', 'MORNING', '09:00 AM - 09:15 AM'),
(6, NULL, '2025-11-15 21:34:05.000000', 2, '', 2, NULL, 0, NULL, '2025-11-16 18:30:00.000000', 'Admin', 4, 'Neurology', 'Dr. Prashant Salgar - MD', 'Jane Smith', 'MORNING', '09:00 AM - 09:15 AM'),
(7, NULL, '2025-11-15 22:38:01.000000', 3, '10:00 AM - 10:20 AM', 1, NULL, 0, NULL, '2025-11-16 18:30:00.000000', 'Admin', 1, 'Pathalogy', 'Dr. Vivekanand Swami - MD', 'John Doe', 'MORNING', '10:00 AM - 10:20 AM'),
(8, NULL, '2025-11-15 22:47:55.000000', 3, '', 2, NULL, 0, NULL, '2025-11-16 18:30:00.000000', 'Admin', 1, 'Pathalogy', 'Dr. Vivekanand Swami - MD', 'Jane Smith', 'MORNING', '10:20 AM - 10:40 AM'),
(9, NULL, '2025-11-15 22:53:48.000000', 2, '', 3, NULL, 0, '2025-11-15 22:55:10.000000', '2025-11-17 13:00:00.000000', 'Admin', 4, 'Neurology', 'Dr. Prashant Salgar - MD', 'Bob Johnson', 'MORNING', '09:15 AM - 09:30 AM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
