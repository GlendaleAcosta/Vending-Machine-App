-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 22, 2016 at 09:04 AM
-- Server version: 5.6.33
-- PHP Version: 7.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vending_machine_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_possessions`
--

CREATE TABLE `user_possessions` (
  `possession_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_possessions`
--

INSERT INTO `user_possessions` (`possession_id`, `item_name`, `quantity`) VALUES
(5, 'Lemonade', 10),
(6, 'Dr. Pepper', 7);

-- --------------------------------------------------------

--
-- Table structure for table `vending_machine_items`
--

CREATE TABLE `vending_machine_items` (
  `vending_machine_item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vending_machine_items`
--

INSERT INTO `vending_machine_items` (`vending_machine_item_id`, `item_name`, `quantity`, `price`) VALUES
(1, 'Sprite', 700, 2),
(2, 'Coca-Cola', 999, 3),
(3, 'Dr. Pepper', 872, 2),
(4, 'Root Beer', 529, 2),
(5, 'Slurm', 799, 4),
(6, 'Lemonade', 698, 1),
(7, 'Seven-Down', 401, 2),
(8, 'Pepsi', 997, 3),
(9, 'Mountain Dew', 773, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_possessions`
--
ALTER TABLE `user_possessions`
  ADD PRIMARY KEY (`possession_id`);

--
-- Indexes for table `vending_machine_items`
--
ALTER TABLE `vending_machine_items`
  ADD PRIMARY KEY (`vending_machine_item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_possessions`
--
ALTER TABLE `user_possessions`
  MODIFY `possession_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `vending_machine_items`
--
ALTER TABLE `vending_machine_items`
  MODIFY `vending_machine_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
