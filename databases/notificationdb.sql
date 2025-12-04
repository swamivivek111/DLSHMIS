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
-- Database: `notificationdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `error_message` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `sent_at` datetime(6) DEFAULT NULL,
  `status` enum('PENDING','SENT','FAILED') NOT NULL,
  `subject` varchar(255) NOT NULL,
  `type` enum('EMAIL','SMS','PUSH') NOT NULL,
  `is_read` bit(1) NOT NULL,
  `module` varchar(255) DEFAULT NULL,
  `priority` enum('LOW','NORMAL','HIGH','URGENT') DEFAULT NULL,
  `read_at` datetime(6) DEFAULT NULL,
  `reference_id` bigint(20) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `created_at`, `error_message`, `message`, `recipient`, `sent_at`, `status`, `subject`, `type`, `is_read`, `module`, `priority`, `read_at`, `reference_id`, `title`, `user_id`) VALUES
(1, '2025-11-18 08:39:15.000000', 'string', 'string', 'string', '2025-11-18 08:39:15.000000', 'SENT', 'string', 'EMAIL', b'0', NULL, NULL, NULL, NULL, '', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
