-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 12, 2016 at 05:20 AM
-- Server version: 10.0.20-MariaDB
-- PHP Version: 5.6.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `test`(IN `pass_code` INT)
    NO SQL
select * from users where passcode = pass_code$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `CheckIfExists`(`pass_code` INT(3)) RETURNS int(1)
    NO SQL
begin
	if exists(select * from users where passcode = pass_code) then
		return 1;
	else
		return 0;
	end if;
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `social_id` varchar(10) NOT NULL,
  `passcode` varchar(3) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `social_id`, `passcode`) VALUES
(1, 'Ólafur Hólm Eyþórsson', '1710943059', '059');

-- --------------------------------------------------------

--
-- Table structure for table `timeentries`
--

CREATE TABLE IF NOT EXISTS `timeentries` (
  `id` int(10) unsigned NOT NULL,
  `employee_id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ClockIn` datetime NOT NULL,
  `ClockOut` datetime DEFAULT NULL,
  `logged_in` int(10) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `timeentries`
--

INSERT INTO `timeentries` (`id`, `employee_id`, `ClockIn`, `ClockOut`, `logged_in`) VALUES
(11, '1710943059', '2016-05-09 14:56:46', '2016-05-09 14:58:32', 0),
(12, '1710943059', '2016-05-09 14:58:35', '2016-05-09 14:58:42', 0),
(13, '1710943059', '2016-05-09 14:58:48', '2016-05-09 14:59:35', 0),
(14, '1710943059', '2016-05-09 14:59:41', '2016-05-09 14:59:45', 0),
(15, '1710943059', '2016-05-09 14:59:55', '2016-05-09 17:07:37', 0),
(16, '1710943059', '2016-05-09 17:08:09', '2016-05-09 17:32:36', 0),
(17, '1710943059', '2016-05-09 17:35:42', '2016-05-09 17:36:04', 0),
(18, '1710943059', '2016-05-09 17:36:14', '2016-05-09 17:36:22', 0),
(19, '1710943059', '2016-05-09 18:27:42', '2016-05-09 18:29:16', 0),
(20, '1710943059', '2016-05-09 18:29:19', '2016-05-09 18:29:37', 0),
(21, '1710943059', '2016-05-09 18:30:49', '2016-05-09 18:30:54', 0),
(22, '1710943059', '2016-05-09 18:30:58', '2016-05-09 18:41:42', 0),
(23, '1710943059', '2016-05-09 18:42:51', '2016-05-09 18:43:50', 0),
(24, '1710943059', '2016-05-09 18:44:42', '2016-05-09 18:46:27', 0),
(25, '1710943059', '2016-05-09 18:46:49', '2016-05-09 18:47:08', 0),
(26, '1710943059', '2016-05-09 18:47:45', '2016-05-09 18:48:35', 0),
(27, '1710943059', '2016-05-09 18:48:51', '2016-05-09 19:30:42', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeentries`
--
ALTER TABLE `timeentries`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `timeentries`
--
ALTER TABLE `timeentries`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
