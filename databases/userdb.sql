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
-- Database: `userdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL,
  `permission_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `active`, `category`, `created_at`, `description`, `role_name`, `updated_at`) VALUES
(1, b'1', 'Administrative', '2025-11-15 18:30:14.000000', 'Full system access, manages hospitals and global settings', 'SUPER_ADMIN', '2025-11-15 18:30:14.000000'),
(2, b'1', 'Administrative', '2025-11-15 18:30:14.000000', 'Admin for one hospital or branch', 'ADMIN', '2025-11-15 18:30:14.000000'),
(3, b'1', 'Administrative', '2025-11-15 18:30:14.000000', 'Manages system configuration, users, backups', 'IT_ADMIN', '2025-11-15 18:30:14.000000'),
(4, b'1', 'Administrative', '2025-11-15 18:30:14.000000', 'Staff recruitment, attendance, payroll', 'HR_MANAGER', '2025-11-15 18:30:14.000000'),
(6, b'1', 'Administrative', '2025-11-15 18:30:14.000000', 'Patient registration, appointment booking', 'RECEPTIONIST', '2025-11-15 18:30:14.000000'),
(7, b'1', 'Clinical', '2025-11-15 18:30:14.000000', 'Treats patients, writes prescriptions', 'DOCTOR', '2025-11-15 18:30:14.000000'),
(8, b'1', 'Clinical', '2025-11-15 18:30:14.000000', 'Operation theatre specialist', 'SURGEON', '2025-11-15 18:30:14.000000'),
(9, b'1', 'Clinical', '2025-11-15 18:30:14.000000', 'General OPD consultant', 'PHYSICIAN', '2025-11-15 18:30:14.000000'),
(10, b'1', 'Clinical', '2025-11-15 18:30:14.000000', 'X-Ray, CT, MRI reporting', 'RADIOLOGIST', '2025-11-15 18:30:14.000000'),
(11, b'1', 'Nursing', '2025-11-15 18:30:14.000000', 'Nursing department supervisor', 'HEAD_NURSE', '2025-11-15 18:30:14.000000'),
(12, b'1', 'Nursing', '2025-11-15 18:30:14.000000', 'Patient care, ward duties', 'STAFF_NURSE', '2025-11-15 18:30:14.000000'),
(13, b'1', 'Nursing', '2025-11-15 18:30:14.000000', 'Critical care management', 'ICU_NURSE', '2025-11-15 18:30:14.000000'),
(14, b'1', 'Laboratory', '2025-11-15 18:30:14.000000', 'Handles test processing', 'LAB_TECHNICIAN', '2025-11-15 18:30:14.000000'),
(15, b'1', 'Laboratory', '2025-11-15 18:30:14.000000', 'Reviews lab results, signs reports', 'PATHOLOGIST', '2025-11-15 18:30:14.000000'),
(16, b'1', 'Pharmacy', '2025-11-15 18:30:15.000000', 'Dispenses medicine', 'PHARMACIST', '2025-11-15 18:30:15.000000'),
(17, b'1', 'Pharmacy', '2025-11-15 18:30:15.000000', 'Manages pharma stock, billing', 'PHARMACY_ADMIN', '2025-11-15 18:30:15.000000'),
(18, b'1', 'Support', '2025-11-15 18:30:15.000000', 'Hospital security', 'SECURITY_GUARD', '2025-11-15 18:30:15.000000'),
(19, b'1', 'Support', '2025-11-15 18:30:15.000000', 'Cleaning and maintenance', 'HOUSEKEEPING', '2025-11-15 18:30:15.000000'),
(20, b'1', 'Patient', '2025-11-15 18:30:15.000000', 'Hospital patient', 'PATIENT', '2025-11-15 18:30:15.000000'),
(21, b'1', 'Billing', '2025-11-15 19:20:10.000000', 'Test', 'Test', '2025-11-15 19:20:10.000000'),
(22, b'1', 'Administrative', '2025-11-15 19:40:01.000000', 'Super Admin', 'Super Admin', '2025-11-15 19:40:01.000000'),
(23, b'1', 'Administrative', '2025-11-15 19:53:48.000000', 'Billing, accounts, financial reports', 'ACCOUNTANT', '2025-11-19 17:03:31.000000');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` bigint(20) NOT NULL,
  `can_create` bit(1) DEFAULT NULL,
  `can_delete` bit(1) DEFAULT NULL,
  `can_read` bit(1) DEFAULT NULL,
  `can_update` bit(1) DEFAULT NULL,
  `permission_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` tinyint(4) DEFAULT NULL,
  `profile_id` bigint(20) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `password`, `role`, `profile_id`, `active`, `role_id`) VALUES
(1, 'dlsservices@gmail.com', 'DLSServices', '$2a$10$4R2/n0BzjBcV1Dk6W9KjPevrqWDcKMJuteFcQayY9jS6JfbI8Iv3q', 0, NULL, NULL, NULL),
(3, 'daya@gmail.com', 'Dayanand Lingayya Swami', '$2a$10$82moAvLyRcENoDhUy2gFwuGlmJPTO88/AxtRX8muMa1UCDkvSbdSS', NULL, NULL, NULL, NULL),
(4, 'Vina.swami@gmail.com', 'Vina', '$2a$10$/1yldNWmzyDIkdj7Hwyt/e4qseCvIIqRo0hi4gIyVB9/1r.CR0XLu', 0, NULL, NULL, NULL),
(5, 'Vina@gmail.com', 'Vina', '$2a$10$KpmHW98.fz0jgso/pIbMROoshW5HrbwsbywghiGbaoZQPC3iM08Fe', 0, NULL, NULL, NULL),
(6, 'soham.swami@gmail.com', 'Vishu', '$2a$10$8f0Z3Ure7xFtQMs8ckmDTOhcK2kqdJuACeRL9ShFZxi04jLq5Q0zu', 0, NULL, NULL, NULL),
(7, 'test@gmail.com', 'Test', '$2a$10$NBYcrkF6aZ9xzZmFvcqoReMZSpQbBmhEasxDZBM6CtcRAfiyQLfZC', 0, NULL, NULL, NULL),
(8, 'srh@gmail.com', 'SRH', '$2a$10$znyZTdm8BvwXiTlwJJdudevsABqqFzMD6Byu0CQmzQwpBTN1rl5ce', 0, NULL, NULL, NULL),
(9, 'asdf@gmail.com', 'Aman', '$2a$10$lTI2HjLmA.VYXqs9G7eZm.KSnR8AI/EnGPxZaIBW8v9yr/25WsCJW', 0, NULL, NULL, NULL),
(10, 'haridas@gmail.com', 'Haridas', '$2a$10$VaD29WKCOiQzUn/VAVszheWubmdIVIF54WLBIKL4MmAHWdTRzwFQW', 1, NULL, NULL, NULL),
(11, 'dany@gmail.com', 'Dany', '$2a$10$ZlmBCAXf7XLS0tVpDrsreudIDqR1lje.3c3IujSp1GyoSr3hAvyny', 0, NULL, NULL, NULL),
(12, 'yogi@gmail.com', 'Yogesh', '$2a$10$Q2emqPcrR56fLlWn.2EySu2KhXdlv64KxkHtHYvVuZngscDiF9dui', 0, NULL, NULL, NULL),
(13, 'ram.vi@gmail.com', 'Ram', '$2a$10$ml/URvnHiKG3p.7NdKnPk.35/PF2UmaeDNlKVgwtgVIwIw9G8roq6', 0, NULL, NULL, NULL),
(14, 'ramvi@gmail.com', 'Ram', '$2a$10$dFygUA8dxnX//O9xbk1ngumN4GeiQnYkLs2vgwrTz/wcgPjab2jRW', 0, NULL, NULL, NULL),
(15, 'ramvi11@gmail.com', 'Ram', '$2a$10$cvNaJbs9EWQBal6TO9hfSO/QUyKFJhkEIRSB4DW49BV9d86.tel/m', 0, NULL, NULL, NULL),
(16, 'bhaukadam@gmail.com', 'Bhau', '$2a$10$xxmYNXOxq6S7hV4rSlAsv.KE6gGzwfoQpP3KERZ.9elMoFmVkl3f2', 0, NULL, NULL, NULL),
(17, 'drpawan@gmail.com', 'Dr. Pawan', '$2a$10$6E0ZVvBF7ID4dOrV1ivK9.MuVFUFsMclvrJ5mOA9ZQt3Bo7J0FC5m', 1, NULL, NULL, NULL),
(18, 'swami@gmail.com', 'Swami', '$2a$10$qBYxH3tvGb89lvKqohneP.XIz9fMBwXxdDvM2p2J0D9DbfhlRlMOa', 2, NULL, NULL, NULL),
(19, 'drswami@gmail.com', 'DRSwami', '$2a$10$nbQWxyCGz84456nS8MgdwuO8MJmKKg.Hf94.kT4ullBCQuS5ukrt2', 1, NULL, NULL, NULL),
(20, 'mrswami@gmail.com', 'MRPatient', '$2a$10$riUPbAOvXK.9FyNUOEFC4Omxsp..JFCPFFYIgujm2D75RzUJ91wLG', 0, NULL, NULL, NULL),
(21, 'swami111@gmail.com', 'Swami Vivekanand', '$2a$10$o3Y4REvM3j7tZ/QJoeHw7OQIk3NvQOt2Yq8lBv8.KqEYVLwe7UVgG', 0, 2, NULL, NULL),
(22, 'swamis@gmail.com', 'Swmai Soham', '$2a$10$PPikelhlkX1RND5ITAOimuNGf646hjfo1aVkWE1nu1yqxu/UdffYi', 0, 3, NULL, NULL),
(23, 'dhanraj@gmail.com', 'dhanraj', '$2a$10$rIFC3XXvy67DRaPa7yJVN.o0AL6FmjSalLYcur5uMyRv1dE/mkfO.', 1, 2, NULL, NULL),
(24, 'rajpure@gmail.com', 'Dr. Mohan Rajpure', '$2a$10$3MOhgvFANjyjWjVl5Ol/leMKzz4gIQODAzuTplq.Vt15ywtspWQwe', 1, 3, NULL, NULL),
(25, 'swamitp@gmail.com', 'Testing Profile', '$2a$10$raqJQoVHuvN2ceHUEhqsduGMRMDHjGt0FMQv/b1lhrfKzc3eY1ca6', 0, 4, NULL, NULL),
(26, 'dradmin@gmail.com', 'DLS Admin', '$2a$10$p6KVIrvE/KtljzRZLP04DeYMIId/o.WW5QiF5cGSbU8iQp/xyuO0i', 1, 4, NULL, NULL),
(27, 'admin@gmail.com', 'DLS Services Admin', '$2a$10$1AiXG9QljG40./Pk2/3Ws.jdqldSzcMINn4nh0zoqtycZ6iO.w2vy', 2, NULL, b'1', NULL),
(28, 'admin123@gmail.com', 'Test Admin', '$2a$10$lq0W19BfpG3Ja07JT7IohO01Fe0/nVFSE8CRGn3epG9bokIi7Hy6u', 2, NULL, b'1', NULL),
(29, 'patient@gmail.com', 'Patient', '$2a$10$n0E5juzmtyI1VYVdnf8sXODcsMBZzlFcPrlnaxY1gGV8HYwFMX/pe', 0, 7, NULL, NULL),
(30, 'newadmin123@gmail.com', 'New Admin', '$2a$10$acEk5tqA1kHA69TMpj9wiemt90vUK2nR.qKg1AwtWcsRf.PynEe.O', 2, 8, NULL, NULL),
(31, 'PrashantSalgar@gmail.com', 'Prashant Salgar', '$2a$10$TulLih0of1WcDdo6mUpN0OcRwOGNzohS4B76x9OtsT0cL6Pe/FRVW', 1, NULL, b'1', NULL),
(32, 'VivekanandSwami@gmail.com', 'Vivekanand Swami', '$2a$10$kwFj714mnNylUUkZjPB2VembOoxabDHDF.sVSRkjYaw84Bce97APe', 1, NULL, b'1', NULL),
(33, 'dswami01@gmail.com', 'Dayanand Swami', '$2a$10$Yo.sWER3yV0ecN72UiE/sOaNt/ImL14eSYgKdfteHg1Jnx9pYPrdS', 1, NULL, b'1', NULL),
(34, 'ds@gmail.com', 'Dayanand swami', '$2a$10$EhoykjIQlAVR65b8VJe27.SfC3QpNM4puDtr245o45iZM2hm8Cuay', 1, NULL, b'1', NULL),
(35, 'S@GMAIL.COM', 'DAYANAND SWAMI', '$2a$10$iBqUOMQO1/WE.JGV0XEjXeT/6PHx06.O4jeXIoHDw6wl97re9/2ai', 1, NULL, b'1', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `UKnry1f3jmc4abb5yvkftlvn6vg` (`permission_name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `UK716hgxp60ym1lifrdgp67xt5k` (`role_name`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKegdk29eiy7mdtefy5c7eirr6e` (`permission_id`),
  ADD KEY `FKn5fotdgk8d1xvo8nav9uv3muc` (`role_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  ADD KEY `FK60qlg9oata44io3a80yh31536` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `FKegdk29eiy7mdtefy5c7eirr6e` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`),
  ADD CONSTRAINT `FKn5fotdgk8d1xvo8nav9uv3muc` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK60qlg9oata44io3a80yh31536` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
