-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2026 at 09:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` varchar(20) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `units` int(11) NOT NULL,
  `program_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_code`, `course_name`, `units`, `program_id`) VALUES
('CRS-101', 'CC101', 'Introduction to Computing', 3, 'PROG-IT-01'),
('CRS-102', 'PF101', 'Computer Programming 1', 3, 'PROG-IT-01'),
('CRS-103', 'PF102', 'Computer Programming 2', 3, 'PROG-IT-01'),
('CRS-104', 'IT101', 'Human Computer Interaction', 3, 'PROG-IT-01'),
('CRS-105', 'MATH101', 'Discrete Mathematics', 3, 'PROG-IT-01'),
('CRS-106', 'IT102', 'Web Systems and Technologies 1', 3, 'PROG-IT-01'),
('CRS-107', 'GE101', 'Understanding the Self', 3, 'PROG-IT-01'),
('CRS-108', 'GE102', 'Purposive Communication', 3, 'PROG-IT-01'),
('CRS-109', 'PE101', 'Physical Fitness and Wellness', 2, 'PROG-IT-01'),
('CRS-110', 'NSTP101', 'National Service Training Program 1', 3, 'PROG-IT-01'),
('CRS-201', 'DS101', 'Data Structures and Algorithms', 3, 'PROG-IT-01'),
('CRS-202', 'IM101', 'Information Management (Database Systems)', 3, 'PROG-IT-01'),
('CRS-203', 'IPT101', 'Integrative Programming and Technologies', 3, 'PROG-IT-01'),
('CRS-204', 'NET101', 'Networking 1 (Basics)', 3, 'PROG-IT-01'),
('CRS-205', 'OS101', 'Operating Systems Concepts', 3, 'PROG-IT-01'),
('CRS-206', 'SAM101', 'Systems Analysis and Design', 3, 'PROG-IT-01'),
('CRS-207', 'GE103', 'The Contemporary World', 3, 'PROG-IT-01'),
('CRS-208', 'GE104', 'Readings in Philippine History', 3, 'PROG-IT-01'),
('CRS-209', 'PE102', 'Rhythmic Activities', 2, 'PROG-IT-01'),
('CRS-210', 'NSTP102', 'National Service Training Program 2', 3, 'PROG-IT-01'),
('CRS-301', 'IAS101', 'Information Assurance and Security 1', 3, 'PROG-IT-01'),
('CRS-302', 'MOB101', 'Mobile Application Development', 3, 'PROG-IT-01'),
('CRS-303', 'NET102', 'Networking 2 (Advanced)', 3, 'PROG-IT-01'),
('CRS-304', 'SAD102', 'Software Engineering', 3, 'PROG-IT-01'),
('CRS-305', 'WEB102', 'Web Systems and Technologies 2', 3, 'PROG-IT-01'),
('CRS-306', 'CAP101', 'Capstone Project and Research 1', 3, 'PROG-IT-01'),
('CRS-307', 'GE105', 'Art Appreciation', 3, 'PROG-IT-01'),
('CRS-308', 'GE106', 'Ethics', 3, 'PROG-IT-01'),
('CRS-309', 'PE103', 'Individual and Dual Sports', 2, 'PROG-IT-01'),
('CRS-310', 'LIT101', 'Philippine Literature', 3, 'PROG-IT-01'),
('CRS-401', 'IAS102', 'Information Assurance and Security 2', 3, 'PROG-IT-01'),
('CRS-402', 'CAP102', 'Capstone Project and Research 2', 3, 'PROG-IT-01'),
('CRS-403', 'SA101', 'Systems Administration and Maintenance', 3, 'PROG-IT-01'),
('CRS-404', 'SOC101', 'Social and Professional Issues in IT', 3, 'PROG-IT-01'),
('CRS-405', 'SEM101', 'Seminars and Field Trips', 2, 'PROG-IT-01'),
('CRS-406', 'INT101', 'Practicum / Internship (480 hours)', 6, 'PROG-IT-01'),
('CRS-407', 'GE107', 'Science, Technology, and Society', 3, 'PROG-IT-01'),
('CRS-408', 'GE108', 'The Life and Works of Rizal', 3, 'PROG-IT-01'),
('CRS-409', 'PE104', 'Team Sports', 2, 'PROG-IT-01'),
('CRS-410', 'HUM101', 'Philosophy of Human Person', 3, 'PROG-IT-01');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `program_id` varchar(20) NOT NULL,
  `program_code` varchar(20) NOT NULL,
  `program_name` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`program_id`, `program_code`, `program_name`, `department`) VALUES
('PROG-IT-01', 'BSIT-WMA', 'BSIT - Web and Mobile Application', 'College of Information Technology'),
('PROG-IT-02', 'BSIT-NS', 'BSIT - Network and Security', 'College of Information Technology'),
('PROG-IT-03', 'BSIT-DA', 'BSIT - Data Analytics', 'College of Information Technology'),
('PROG-IT-04', 'BSCS', 'BS Computer Science', 'College of Information Technology'),
('PROG-IT-05', 'BSIS', 'BS Information Systems', 'College of Information Technology'),
('PROG-IT-06', 'BSEMC', 'BS Entertainment and Multimedia Computing', 'College of Information Technology');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `registration_id` int(11) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `student_type` enum('New','Old') NOT NULL,
  `program_id` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`registration_id`, `student_id`, `password`, `first_name`, `last_name`, `student_type`, `program_id`, `email`, `status`) VALUES
(1, 'IT-2023-001', 'password123', 'Juan', 'Dela Cruz', 'Old', 'PROG-IT-01', 'juan.delacruz@student.edu', 'Enrolled'),
(2, 'IT-2023-042', 'password123', 'Maria', 'Clara', 'Old', 'PROG-IT-01', 'maria.clara@student.edu', 'Enrolled'),
(3, 'IT-2024-115', 'password123', 'Crisostomo', 'Ibarra', 'Old', 'PROG-IT-02', 'c.ibarra@student.edu', 'Enrolled'),
(4, 'IT-2024-088', 'password123', 'Leonor', 'Rivera', 'Old', 'PROG-IT-03', 'leonor.r@student.edu', 'Enrolled'),
(5, 'IT-2026-9694', 'password123', 'seb', 'garcia', 'New', 'PROG-IT-01', 'sebg@xample.com', 'Pending'),
(6, 'ADMIN-MAIN', 'adminpass123', 'Registrar', 'Office User', 'Old', NULL, 'admin.office@student.edu', 'Enrolled');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` varchar(20) NOT NULL,
  `course_id` varchar(20) DEFAULT NULL,
  `teacher_id` varchar(20) DEFAULT NULL,
  `day` varchar(20) NOT NULL,
  `time` varchar(50) NOT NULL,
  `room` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `course_id`, `teacher_id`, `day`, `time`, `room`) VALUES
('SCH-01', 'CRS-101', 'TCH-001', 'MWF', '08:00 AM - 09:00 AM', 'Lab 3'),
('SCH-02', 'CRS-102', 'TCH-002', 'TTH', '09:30 AM - 11:00 AM', 'Lab 1'),
('SCH-03', 'CRS-107', 'TCH-005', 'MWF', '11:00 AM - 12:00 PM', 'Room 302'),
('SCH-04', 'CRS-201', 'TCH-003', 'TTH', '01:00 PM - 02:30 PM', 'Lab 2'),
('SCH-05', 'CRS-202', 'TCH-003', 'MWF', '02:00 PM - 03:00 PM', 'Lab 2'),
('SCH-06', 'CRS-204', 'TCH-006', 'TTH', '04:00 PM - 05:30 PM', 'Lab 4'),
('SCH-07', 'CRS-302', 'TCH-007', 'MWF', '09:00 AM - 10:30 AM', 'Lab 1'),
('SCH-08', 'CRS-306', 'TCH-004', 'Sat', '08:00 AM - 12:00 PM', 'Incubation Room'),
('SCH-09', 'CRS-402', 'TCH-004', 'Sat', '01:00 PM - 05:00 PM', 'Incubation Room'),
('SCH-10', 'CRS-404', 'TCH-008', 'TTH', '11:00 AM - 12:30 PM', 'Room 401');

-- --------------------------------------------------------

--
-- Table structure for table `student_enrollments`
--

CREATE TABLE `student_enrollments` (
  `enrollment_id` int(11) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `schedule_id` varchar(20) NOT NULL,
  `enrollment_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` varchar(20) NOT NULL,
  `teacher_name` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`teacher_id`, `teacher_name`, `department`) VALUES
('TCH-001', 'Engr. Maria Santos', 'BSIT'),
('TCH-002', 'Prof. Alan Turing Cruz', 'BSIT'),
('TCH-003', 'Dr. Sarah Jane Reyes', 'BSIT'),
('TCH-004', 'Dr. John Doe Aquino', 'BSIT'),
('TCH-005', 'Prof. Grace Hopper Lim', 'BSIT'),
('TCH-006', 'Mr. Linus Torvalds Dela Cruz', 'BSIT'),
('TCH-007', 'Ms. Ada Lovelace Ramos', 'BSIT'),
('TCH-008', 'Engr. Tim Berners Sy', 'BSIT');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`program_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`registration_id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `student_enrollments`
--
ALTER TABLE `student_enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD UNIQUE KEY `unique_student_schedule` (`student_id`,`schedule_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_enrollments`
--
ALTER TABLE `student_enrollments`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `registration_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `student_enrollments`
--
ALTER TABLE `student_enrollments`
  ADD CONSTRAINT `student_enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `registration` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_enrollments_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
