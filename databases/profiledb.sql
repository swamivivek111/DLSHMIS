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
-- Database: `profiledb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL,
  `aadhar_no` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` bigint(20) NOT NULL,
  `aadhar_no` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `license_no` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `total_experience` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `aadhar_no`, `address`, `department`, `dob`, `email`, `license_no`, `name`, `phone`, `specialization`, `total_experience`) VALUES
(1, NULL, NULL, NULL, NULL, 'drdalvi1@gmail.com', NULL, 'Dr. Dalvi1', NULL, NULL, NULL),
(2, NULL, NULL, NULL, NULL, 'dhanraj@gmail.com', NULL, 'dhanraj', NULL, NULL, NULL),
(3, '787785676567', 'Pune', 'Neurology', '1989-02-01', 'rajpure@gmail.com', '567567675677', 'Dr. Mohan Rajpure', '7350256781', 'Neurology', 26),
(4, NULL, NULL, NULL, NULL, 'dradmin@gmail.com', NULL, 'DLS Admin', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `city_id` bigint(20) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `district_id` bigint(20) DEFAULT NULL,
  `doctor_share` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_consultation_fees` varchar(255) DEFAULT NULL,
  `follow_up_fees` varchar(255) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `panno` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `active`, `address`, `city`, `created_at`, `created_by`, `department_id`, `hospital_id`, `qualification`, `specialization`, `updated_at`, `updated_by`, `city_id`, `code`, `contact_number`, `district_id`, `doctor_share`, `email_id`, `first_consultation_fees`, `follow_up_fees`, `joining_date`, `name`, `panno`, `type`) VALUES
(11, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 1, 1, 'MBBS, MD Cardiology', 'Cardiology', '2025-11-18 13:44:09.000000', NULL, 2, 'DOC001', '9876543210', 2, '20%', 'john.smith@hospital.com', '1500', '1000', '2023-11-18', 'Dr. John Smith', 'PAN001', 'Senior'),
(12, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 2, 1, 'MBBS, DM Neurology', 'Neurology', '2025-11-18 13:43:27.000000', NULL, 1, 'DOC002', '9876543211', 1, '25%', 'sarah.johnson@hospital.com', '1800', '1200', '2023-11-18', 'Dr. Sarah Johnson', 'PAN002', 'Senior'),
(13, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 3, 1, 'MBBS, MS Orthopedics', 'Orthopedics', '2025-11-18 13:43:27.000000', NULL, 1, 'DOC003', '9876543212', 1, '22%', 'michael.brown@hospital.com', '1600', '1100', '2023-11-18', 'Dr. Michael Brown', 'PAN003', 'Senior'),
(14, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 4, 1, 'MBBS, MD Pediatrics', 'Pediatrics', '2025-11-18 13:43:27.000000', NULL, 1, 'DOC004', '9876543213', 1, '18%', 'emily.davis@hospital.com', '1400', '900', '2023-11-18', 'Dr. Emily Davis', 'PAN004', 'Senior'),
(15, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 5, 1, 'MBBS, MS Surgery', 'General Surgery', '2025-11-18 13:43:27.000000', NULL, 1, 'DOC005', '9876543214', 1, '30%', 'robert.wilson@hospital.com', '2000', '1500', '2023-11-18', 'Dr. Robert Wilson', 'PAN005', 'Senior'),
(16, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 6, 1, 'MBBS, MD Gynecology', 'Gynecology', '2025-11-18 13:43:27.000000', NULL, 1, 'DOC006', '9876543215', 1, '25%', 'lisa.anderson@hospital.com', '1700', '1200', '2023-11-18', 'Dr. Lisa Anderson', 'PAN006', 'Senior'),
(17, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 7, 1, 'MBBS, MD Dermatology', 'Dermatology', '2025-11-18 13:43:27.000000', NULL, 1, 'DOC007', '9876543216', 1, '15%', 'david.miller@hospital.com', '1300', '800', '2023-11-18', 'Dr. David Miller', 'PAN007', 'Senior'),
(18, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 8, 1, 'MBBS, MD Psychiatry', 'Psychiatry', '2025-11-18 13:43:27.000000', NULL, 1, 'DOC008', '9876543217', 1, '20%', 'jennifer.garcia@hospital.com', '1600', '1000', '2023-11-18', 'Dr. Jennifer Garcia', 'PAN008', 'Senior'),
(19, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 9, 1, 'MBBS, MD Radiology', 'Radiology', '2025-11-18 13:43:27.000000', NULL, 1, 'DOC009', '9876543218', 1, '20%', 'christopher.lee@hospital.com', '1500', '1000', '2023-11-18', 'Dr. Christopher Lee', 'PAN009', 'Senior'),
(20, b'1', 'Hospital Medical District, Mumbai', NULL, '2025-11-18 13:43:27.000000', 'System', 10, 1, 'MBBS, MD Anesthesia', 'Anesthesiology', '2025-11-18 13:43:27.000000', NULL, 1, 'DOC010', '9876543219', 1, '18%', 'amanda.taylor@hospital.com', '1400', '900', '2023-11-18', 'Dr. Amanda Taylor', 'PAN010', 'Senior');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` bigint(20) NOT NULL,
  `aadhar_no` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `blood_group` tinyint(4) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `allergies` varchar(255) DEFAULT NULL,
  `cronic_disease` varchar(255) DEFAULT NULL,
  `aadhar_number` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `prn_no` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `aadhar_no`, `address`, `blood_group`, `dob`, `email`, `name`, `phone`, `allergies`, `cronic_disease`, `aadhar_number`, `age`, `first_name`, `gender`, `last_name`, `middle_name`, `mobile_number`, `prefix`, `prn_no`) VALUES
(9, NULL, 'Pune', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123456789412', 28, 'test', 'Male', 'test', 'test', '7845744458', 'Mr.', '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` bigint(20) NOT NULL,
  `aadhar_number` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_number` varchar(255) DEFAULT NULL,
  `emergency_contact_relation` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `prn_no` varchar(255) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `aadhar_number`, `active`, `address`, `age`, `city`, `created_at`, `created_by`, `date_of_birth`, `email`, `emergency_contact_name`, `emergency_contact_number`, `emergency_contact_relation`, `first_name`, `gender`, `last_name`, `middle_name`, `mobile_number`, `pincode`, `prefix`, `prn_no`, `state`, `updated_at`, `updated_by`) VALUES
(3, 'TEMP1763559690472', NULL, 'Pune\n110', NULL, NULL, '2025-11-19 19:11:30.000000', NULL, NULL, NULL, NULL, NULL, NULL, 'Vivekanand', 'MALE', 'Swami', '', '07350256781', NULL, 'Mr.', 'PRN1763559690472', NULL, '2025-11-19 19:11:30.000000', NULL),
(4, 'TEMP1763559793712', NULL, 'Pune\n110', NULL, NULL, '2025-11-19 19:13:13.000000', NULL, NULL, NULL, NULL, NULL, NULL, 'Vivekanand', 'MALE', 'Swami', '', '07350256781', NULL, 'Mr.', 'PRN1763559793712', NULL, '2025-11-19 19:13:13.000000', NULL),
(5, '841118713659', NULL, 'Pune\n110', 25, NULL, '2025-11-19 19:20:36.000000', NULL, NULL, NULL, NULL, NULL, NULL, 'om', 'MALE', 'Swami', '', '07350256781', NULL, 'Mr.', 'PRN1763560235967', NULL, '2025-11-19 19:20:36.000000', NULL),
(6, '924274501534', NULL, 'Pune\n110', 25, NULL, '2025-11-19 19:26:15.000000', NULL, NULL, NULL, NULL, NULL, NULL, 'Vivekanand', 'MALE', 'Swami', '', '07350256781', NULL, 'Mr.', 'PRN1763560574831', NULL, '2025-11-19 19:26:15.000000', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKhrr0tshs8ws3mgeajht6rnyub` (`aadhar_no`),
  ADD UNIQUE KEY `UKc0r9atamxvbhjjvy5j8da1kam` (`email`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKi5ykxeo4vifsky0njqcsh374` (`aadhar_no`),
  ADD UNIQUE KEY `UKjdtgexk368pq6d2yb3neec59d` (`email`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK3njs7hgmdryjqvdl6g6rcyyda` (`aadhar_no`),
  ADD UNIQUE KEY `UKbawli8xm92f30ei6x9p3h8eju` (`email`),
  ADD UNIQUE KEY `UKe32h3vy3qwlidbc7fqv14yol5` (`aadhar_number`),
  ADD UNIQUE KEY `UKswvn2r4obut7hxjbymthe7yss` (`prn_no`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKe0woe9jh6an4r9xtugooy7hxt` (`prn_no`),
  ADD UNIQUE KEY `UK2iebfs2t2e6pu66ho8h34d3xx` (`aadhar_number`),
  ADD UNIQUE KEY `UKa370hmxgv0l5c9panryr1ji7d` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctor_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
