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
-- Database: `radiologydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `radiology_orders`
--

CREATE TABLE `radiology_orders` (
  `order_id` bigint(20) NOT NULL,
  `body_part` varchar(255) DEFAULT NULL,
  `clinical_history` varchar(255) DEFAULT NULL,
  `completed_date` datetime(6) DEFAULT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `instructions` varchar(255) DEFAULT NULL,
  `order_date` datetime(6) NOT NULL,
  `patient_id` bigint(20) NOT NULL,
  `priority` enum('LOW','NORMAL','HIGH','URGENT') DEFAULT NULL,
  `scheduled_date` datetime(6) DEFAULT NULL,
  `status` enum('ORDERED','SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED') DEFAULT NULL,
  `test_code` varchar(255) DEFAULT NULL,
  `test_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `radiology_orders`
--
ALTER TABLE `radiology_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `radiology_orders`
--
ALTER TABLE `radiology_orders`
  MODIFY `order_id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
