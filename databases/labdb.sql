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
-- Database: `labdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `lab_orders`
--

CREATE TABLE `lab_orders` (
  `id` bigint(20) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  `patient_id` bigint(20) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `priority` enum('ROUTINE','URGENT','STAT') NOT NULL,
  `status` enum('PENDING','SAMPLE_COLLECTED','PROCESSING','COMPLETED','CANCELLED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab_order_items`
--

CREATE TABLE `lab_order_items` (
  `id` bigint(20) NOT NULL,
  `expected_time` datetime(6) DEFAULT NULL,
  `sample_type` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','COLLECTED','PROCESSING','VALIDATED','REPORTED') DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `test_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab_reports`
--

CREATE TABLE `lab_reports` (
  `id` bigint(20) NOT NULL,
  `generated_at` datetime(6) DEFAULT NULL,
  `generated_by` bigint(20) DEFAULT NULL,
  `report_pdf` varchar(255) DEFAULT NULL,
  `verified_url` varchar(255) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab_samples`
--

CREATE TABLE `lab_samples` (
  `id` bigint(20) NOT NULL,
  `barcode` varchar(255) NOT NULL,
  `collected_by` bigint(20) DEFAULT NULL,
  `collection_datetime` datetime(6) DEFAULT NULL,
  `container` varchar(255) DEFAULT NULL,
  `rejection_reason` varchar(255) DEFAULT NULL,
  `sample_type` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','COLLECTED','REJECTED') DEFAULT NULL,
  `order_item_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab_test_results`
--

CREATE TABLE `lab_test_results` (
  `id` bigint(20) NOT NULL,
  `comments` text DEFAULT NULL,
  `completed_at` datetime(6) DEFAULT NULL,
  `result_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`result_data`)),
  `technician_id` bigint(20) DEFAULT NULL,
  `validated` bit(1) NOT NULL,
  `validation_time` datetime(6) DEFAULT NULL,
  `validator_id` bigint(20) DEFAULT NULL,
  `order_item_id` bigint(20) DEFAULT NULL,
  `sample_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `master_lab_tests`
--

CREATE TABLE `master_lab_tests` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `category` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `reference_range` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`reference_range`)),
  `specimen_type` varchar(255) DEFAULT NULL,
  `turnaround_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lab_orders`
--
ALTER TABLE `lab_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lab_order_items`
--
ALTER TABLE `lab_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2gs8rcy4q4g2t93qm0difp73s` (`order_id`),
  ADD KEY `FKfamjimomg0da48r7w0fhkvtqi` (`test_id`);

--
-- Indexes for table `lab_reports`
--
ALTER TABLE `lab_reports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_bar4nj8bh3tm9kw1wu5benb5q` (`order_id`);

--
-- Indexes for table `lab_samples`
--
ALTER TABLE `lab_samples`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_nf1taofftktlcnykx8tcrp2jh` (`barcode`),
  ADD UNIQUE KEY `UK_bfu39ypxh91ena7b7cuchlkvm` (`order_item_id`);

--
-- Indexes for table `lab_test_results`
--
ALTER TABLE `lab_test_results`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_sccqrlukr7qcfuy5u6iabx92b` (`order_item_id`),
  ADD UNIQUE KEY `UK_ex4n37qgnqmgkghwu6k4he0pd` (`sample_id`);

--
-- Indexes for table `master_lab_tests`
--
ALTER TABLE `master_lab_tests`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lab_orders`
--
ALTER TABLE `lab_orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lab_order_items`
--
ALTER TABLE `lab_order_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lab_reports`
--
ALTER TABLE `lab_reports`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lab_samples`
--
ALTER TABLE `lab_samples`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lab_test_results`
--
ALTER TABLE `lab_test_results`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_lab_tests`
--
ALTER TABLE `master_lab_tests`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lab_order_items`
--
ALTER TABLE `lab_order_items`
  ADD CONSTRAINT `FK2gs8rcy4q4g2t93qm0difp73s` FOREIGN KEY (`order_id`) REFERENCES `lab_orders` (`id`),
  ADD CONSTRAINT `FKfamjimomg0da48r7w0fhkvtqi` FOREIGN KEY (`test_id`) REFERENCES `master_lab_tests` (`id`);

--
-- Constraints for table `lab_reports`
--
ALTER TABLE `lab_reports`
  ADD CONSTRAINT `FKk5qpx2l652xgttfq3yys55xxx` FOREIGN KEY (`order_id`) REFERENCES `lab_orders` (`id`);

--
-- Constraints for table `lab_samples`
--
ALTER TABLE `lab_samples`
  ADD CONSTRAINT `FKpdidkk5jgqox3uxa2rq9fpr1e` FOREIGN KEY (`order_item_id`) REFERENCES `lab_order_items` (`id`);

--
-- Constraints for table `lab_test_results`
--
ALTER TABLE `lab_test_results`
  ADD CONSTRAINT `FK59mn3c2ompon69aghlmgvv9nw` FOREIGN KEY (`order_item_id`) REFERENCES `lab_order_items` (`id`),
  ADD CONSTRAINT `FKn4r2qe7d6l2pay1qmx0fou7dd` FOREIGN KEY (`sample_id`) REFERENCES `lab_samples` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
