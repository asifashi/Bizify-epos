-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2023 at 12:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `company`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountstransactions`
--

CREATE TABLE `accountstransactions` (
  `transsno` bigint(20) NOT NULL,
  `accno` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CompanyId` varchar(20) NOT NULL,
  `transdate` datetime NOT NULL,
  `particulars` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `debit` decimal(18,4) NOT NULL,
  `credit` decimal(18,4) NOT NULL,
  `fcdebit` decimal(18,4) DEFAULT NULL,
  `fccredit` decimal(18,4) DEFAULT NULL,
  `vouchertype` varchar(25) NOT NULL,
  `voucherno` varchar(50) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `status` varchar(25) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `tstamp` datetime NOT NULL,
  `refno` char(50) DEFAULT NULL,
  `fsno` decimal(18,0) NOT NULL,
  `allocdebit` decimal(18,4) DEFAULT NULL,
  `alloccredit` decimal(18,4) DEFAULT NULL,
  `allocbalance` decimal(18,4) DEFAULT NULL,
  `fcallocdebit` decimal(18,4) DEFAULT NULL,
  `fcalloccredit` decimal(18,4) DEFAULT NULL,
  `fcallocbalance` decimal(18,4) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `jobno` bigint(20) DEFAULT NULL,
  `costcenter_id` bigint(20) DEFAULT NULL,
  `approvaldt` datetime DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `fcrate` decimal(18,4) DEFAULT NULL,
  `currencyid` int(11) DEFAULT NULL,
  `drgram` float DEFAULT NULL,
  `crgram` float DEFAULT NULL,
  `cheqno` varchar(50) DEFAULT NULL,
  `lpono` varchar(50) DEFAULT NULL,
  `cheqdate` datetime DEFAULT NULL,
  `opposentrydesc` varchar(2000) DEFAULT NULL,
  `allocupdatebal` float DEFAULT NULL,
  `deptid` bigint(20) DEFAULT NULL,
  `vatno` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `retailcrdr` bit(10) DEFAULT NULL,
  `vatableamount` decimal(18,4) DEFAULT NULL,
  `duedate` datetime DEFAULT NULL,
  `transtype` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `isapproval` bit(10) DEFAULT NULL,
  `agent_id` int(11) DEFAULT NULL,
  `payrollid` varchar(50) DEFAULT NULL,
  `pay_transdate` datetime DEFAULT NULL,
  `breakup_id` int(11) DEFAULT NULL,
  `cheqbankname` varchar(130) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `cheqbankaccno` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `salesmanid` int(11) DEFAULT NULL,
  `unitid` int(11) DEFAULT NULL,
  `propertyid` int(11) DEFAULT NULL,
  `stationcode` int(11) DEFAULT NULL,
  `instrumenttype` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `oppsitaccno` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accountstransactions`
--

INSERT INTO `accountstransactions` (`transsno`, `accno`, `CompanyId`, `transdate`, `particulars`, `debit`, `credit`, `fcdebit`, `fccredit`, `vouchertype`, `voucherno`, `user_id`, `status`, `description`, `tstamp`, `refno`, `fsno`, `allocdebit`, `alloccredit`, `allocbalance`, `fcallocdebit`, `fcalloccredit`, `fcallocbalance`, `location`, `jobno`, `costcenter_id`, `approvaldt`, `department`, `fcrate`, `currencyid`, `drgram`, `crgram`, `cheqno`, `lpono`, `cheqdate`, `opposentrydesc`, `allocupdatebal`, `deptid`, `vatno`, `retailcrdr`, `vatableamount`, `duedate`, `transtype`, `isapproval`, `agent_id`, `payrollid`, `pay_transdate`, `breakup_id`, `cheqbankname`, `cheqbankaccno`, `salesmanid`, `unitid`, `propertyid`, `stationcode`, `instrumenttype`, `oppsitaccno`) VALUES
(9, 'AS2361', 'w1245', '2023-11-20 23:54:22', 'sha', 276000.0000, 0.0000, 114000.0000, 0.0000, 'Sales', 'INV001', 0, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'AS2361', 'w1245', '2023-11-20 23:54:22', 'Sales Income', 0.0000, 276000.0000, 0.0000, 114000.0000, 'Sales Voucher', 'INV001', 0, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'AS2365', 'ws9000', '2023-11-21 07:17:15', 'Saleem', 93100.0000, 0.0000, 93100.0000, 0.0000, 'Sales', 'INV004', 0, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'AS2365', 'ws9000', '2023-11-21 07:17:15', 'Sales Income', 0.0000, 93100.0000, 0.0000, 93100.0000, 'Sales Voucher', 'INV004', 0, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'AS2546', 'w1245', '2023-11-21 08:02:42', 'Saheer', 335130.0000, 0.0000, 335130.0000, 0.0000, 'Sales', 'INV0100', 0, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'AS2546', 'w1245', '2023-11-21 08:02:42', 'Sales Income', 0.0000, 335130.0000, 0.0000, 335130.0000, 'Sales Voucher', 'INV0100', 0, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'AS1005', 'ws9000', '2023-11-25 06:49:06', 'Limra sofech', 40968.0000, 0.0000, 40968.0000, 0.0000, 'Sales', 'INV005', 0, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'IN33', 'ws9000', '2023-11-25 06:49:06', 'Sales Income', 0.0000, 40968.0000, 0.0000, 40968.0000, 'Sales Voucher', 'INV005', 0, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(66, 'AS2098', '45MN00', '2023-11-21 01:47:15', 'Saleem', 0.0000, 93100.0000, 0.0000, 93100.0000, 'Sales', 'INV014', 0, 'null', 'null', '0000-00-00 00:00:00', 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(69, 'AS2198', '45MN00', '2023-11-20 20:17:15', 'Salaem', 0.0000, 9100.0000, 0.0000, 9100.0000, 'Sales', 'INV019', 0, 'null', 'null', '0000-00-00 00:00:00', 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `type` varchar(20) DEFAULT NULL,
  `types` varchar(10) DEFAULT NULL,
  `customerId` int(11) NOT NULL,
  `accno` varchar(20) NOT NULL,
  `relativeno` varchar(20) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `primaryContact` varchar(50) DEFAULT NULL,
  `customerDisplayName` varchar(50) DEFAULT NULL,
  `companyName` varchar(50) DEFAULT NULL,
  `currency` varchar(20) DEFAULT NULL,
  `customerEmail` varchar(50) DEFAULT NULL,
  `customerPhone` varchar(20) DEFAULT NULL,
  `workPhone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `dueOnReceipt` varchar(50) DEFAULT NULL,
  `paymentTerms` varchar(50) DEFAULT NULL,
  `billingAttention` varchar(50) DEFAULT NULL,
  `billingCountry` varchar(50) DEFAULT NULL,
  `billingAddress` varchar(255) DEFAULT NULL,
  `billingCity` varchar(50) DEFAULT NULL,
  `billingState` varchar(50) DEFAULT NULL,
  `billingZipCode` varchar(20) DEFAULT NULL,
  `billingPhone` varchar(20) DEFAULT NULL,
  `billingFax` varchar(20) DEFAULT NULL,
  `billingEmail` varchar(50) DEFAULT NULL,
  `shippingAttention` varchar(50) DEFAULT NULL,
  `shippingCountry` varchar(50) DEFAULT NULL,
  `shippingAddress` varchar(255) DEFAULT NULL,
  `shippingCity` varchar(50) DEFAULT NULL,
  `shippingState` varchar(50) DEFAULT NULL,
  `shippingZipCode` varchar(20) DEFAULT NULL,
  `shippingPhone` varchar(20) DEFAULT NULL,
  `shippingFax` varchar(20) DEFAULT NULL,
  `shippingEmail` varchar(50) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`type`, `types`, `customerId`, `accno`, `relativeno`, `firstName`, `lastName`, `primaryContact`, `customerDisplayName`, `companyName`, `currency`, `customerEmail`, `customerPhone`, `workPhone`, `mobile`, `dueOnReceipt`, `paymentTerms`, `billingAttention`, `billingCountry`, `billingAddress`, `billingCity`, `billingState`, `billingZipCode`, `billingPhone`, `billingFax`, `billingEmail`, `shippingAttention`, `shippingCountry`, `shippingAddress`, `shippingCity`, `shippingState`, `shippingZipCode`, `shippingPhone`, `shippingFax`, `shippingEmail`, `remarks`, `created_at`) VALUES
('Business', 'online', 45145, 'AS1000', 'ASB5111', 'Aramcpamc', 'Ar', '85669700', 'Aramco', 'Traders', 'US Dollar', 'aramco@info.in', '08281926998', '08281926998', '08281926998', 'yes', NULL, 'Safe', 'india', '#1876', 'kannur', 'kerala', '890076', '08281926998', '78#77711', 'asifmuhammed@gmail.com', 'Safe', 'india', '#1876', 'kannur', 'kerala', '890076', '08281926998', '78#77711', 'asifmuhammed@gmail.com', 'new', '2023-11-23 16:56:10'),
('Business', 'online', 45149, 'AS1005', 'ASB5111', 'Limra', 'softech', '90089721', 'Limra sofech', 'limra', 'US Dollar', 'info@qoneqatar.com', 'sjfdsj', NULL, NULL, '879888', NULL, 'sadjaja', 'india', 'sahdsad', 'kannur', 'kerala', '890076', '08281926998', '78#77711', 'asifmuhammed@gmail.com', 'Safe', 'india', '#1876', 'kannur', 'kerala', '890076', '08281926998', '78#77711', 'asifmuhammed@gmail.com', 'new', '2023-11-23 00:42:55'),
('Individual', 'offline', 45150, 'AS1053', 'ASB5111', 'aslam', 'keethadath', 'asasasda', 'Ashraf', 'zxsfd', 'Dubai Dirham', 'demo@freespacerp.com', '08281926998', '08281926998', '08281926998', 'yes', NULL, 'sadadad', 'ksadsadad', 'as', 'sdskfd', NULL, 'nsds', 'sdsdsdf', 'sdsds', 'sdsdsds', 'sadadad', 'ksadsadad', 'as', 'sdskfd', NULL, 'nsds', 'sdsdsdf', 'sdsds', 'sdsdsds', NULL, '2023-11-25 02:03:11');

-- --------------------------------------------------------

--
-- Table structure for table `invbrand`
--

CREATE TABLE `invbrand` (
  `id` int(11) NOT NULL,
  `brandname` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invbrand`
--

INSERT INTO `invbrand` (`id`, `brandname`, `created_at`) VALUES
(1, 'TERRA', '2023-10-21 18:47:39');

-- --------------------------------------------------------

--
-- Table structure for table `invcategory`
--

CREATE TABLE `invcategory` (
  `id` int(11) NOT NULL,
  `itemgroup` varchar(50) NOT NULL,
  `itemcategory` varchar(50) NOT NULL,
  `region` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invcategory`
--

INSERT INTO `invcategory` (`id`, `itemgroup`, `itemcategory`, `region`, `created_at`) VALUES
(1, 'Building Materials', 'Cement Ambujan', 'india', '2023-10-21 18:14:55'),
(2, 'Building Materials', 'Steel TMT Bars', 'South africa', '2023-10-28 05:15:32'),
(3, 'Timber', 'Teak Wood', 'kerala', '2023-10-28 05:16:37');

-- --------------------------------------------------------

--
-- Table structure for table `invgroup`
--

CREATE TABLE `invgroup` (
  `id` int(11) NOT NULL,
  `groupName` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invgroup`
--

INSERT INTO `invgroup` (`id`, `groupName`, `created_at`) VALUES
(1, 'Building Materials', '2023-10-21 11:54:55'),
(2, 'Timber', '2023-10-21 11:56:43'),
(3, 'Automobile', '2023-10-21 17:11:50'),
(4, 'Building materials', '2023-10-24 21:34:42');

-- --------------------------------------------------------

--
-- Table structure for table `invunit`
--

CREATE TABLE `invunit` (
  `id` int(11) NOT NULL,
  `shortname` varchar(50) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invunit`
--

INSERT INTO `invunit` (`id`, `shortname`, `fullname`, `created_at`) VALUES
(1, 'kl', 'Kilogram', '2023-10-21 19:15:32'),
(2, 'pcs', 'PIECES', '2023-10-28 06:01:47');

-- --------------------------------------------------------

--
-- Table structure for table `itemmaster`
--

CREATE TABLE `itemmaster` (
  `ItemId` bigint(20) NOT NULL,
  `RelativeNo` bigint(20) NOT NULL,
  `ItemName` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Region` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ItemType` varchar(20) NOT NULL DEFAULT 'Inventory',
  `CategoryId` int(11) DEFAULT NULL,
  `MaterialCode` varchar(50) DEFAULT NULL,
  `VendorId` bigint(20) DEFAULT NULL,
  `LoationId` bigint(20) DEFAULT NULL,
  `ReOrderLevel` int(11) DEFAULT NULL,
  `UnitPrice` decimal(18,4) DEFAULT NULL,
  `BatchCode` varchar(50) DEFAULT NULL,
  `UnitPrice1` decimal(18,4) DEFAULT NULL,
  `UnitPrice2` decimal(18,4) DEFAULT NULL,
  `PartNo` varchar(50) DEFAULT NULL,
  `Color` varchar(50) DEFAULT NULL,
  `Packing` varchar(50) DEFAULT NULL,
  `Weight` varchar(50) DEFAULT NULL,
  `Shape` varchar(50) DEFAULT NULL,
  `ItemSize` varchar(10000) DEFAULT NULL,
  `Ref1` varchar(50) DEFAULT NULL,
  `Ref2` varchar(50) DEFAULT NULL,
  `StockType` bit(1) DEFAULT NULL,
  `UnitId` varchar(20) DEFAULT NULL,
  `ExpenseACC` varchar(40) DEFAULT NULL,
  `Image` longblob DEFAULT NULL,
  `Active` bit(1) DEFAULT NULL,
  `LastPurPrice` decimal(18,4) DEFAULT NULL,
  `Services` bit(1) DEFAULT NULL,
  `AssetACC` varchar(40) DEFAULT NULL,
  `SupCode` varchar(50) DEFAULT NULL,
  `Barcode` varchar(50) DEFAULT NULL,
  `AliasName` varchar(50) DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `GroupDebitAcc` varchar(20) DEFAULT NULL,
  `GroupCreditAcc` varchar(20) DEFAULT NULL,
  `LandingCost` float DEFAULT NULL,
  `BaseValue` float DEFAULT NULL,
  `RackID` bigint(20) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Height_N` float DEFAULT NULL,
  `Width_N` float DEFAULT NULL,
  `CurStock` float DEFAULT NULL,
  `Type_ID` bigint(20) DEFAULT NULL,
  `Model_ID` bigint(20) DEFAULT NULL,
  `TaxID` int(11) DEFAULT NULL,
  `Show_hide` bit(1) DEFAULT NULL,
  `showSalesman` bit(1) DEFAULT NULL,
  `ReorderCheck` bit(1) DEFAULT NULL,
  `deflocationname` varchar(50) DEFAULT NULL,
  `deflocation` int(11) DEFAULT NULL,
  `CountryId` int(11) DEFAULT NULL,
  `Redm_rewardPoint` decimal(18,2) DEFAULT NULL,
  `VAT` bigint(20) DEFAULT NULL,
  `VATPERC` decimal(18,2) DEFAULT NULL,
  `Vat_Inclus` bit(1) DEFAULT NULL,
  `PackageID` varchar(50) DEFAULT NULL,
  `GenericName` varchar(500) DEFAULT NULL,
  `ManufName` varchar(500) DEFAULT NULL,
  `MinimumQty` bigint(20) DEFAULT NULL,
  `SupplierName` varchar(500) DEFAULT NULL,
  `c_PromoCode` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ISserialNo` bit(1) DEFAULT NULL,
  `isAddi_Barcode` bit(1) DEFAULT NULL,
  `AddDesc` varchar(800) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Is_Subscription` bit(1) DEFAULT NULL,
  `IswaingScale` bit(1) DEFAULT NULL,
  `Percantage` decimal(18,2) DEFAULT NULL,
  `NoofDays` int(11) DEFAULT NULL,
  `WarrantyType` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `IsWarranty` bit(1) DEFAULT NULL,
  `StationCode` int(11) DEFAULT NULL,
  `isbatchWise` bit(1) DEFAULT NULL,
  `Opening_Acc` varchar(50) DEFAULT NULL,
  `BatchNumber` varchar(50) DEFAULT NULL,
  `Opening_SeriesNo` varchar(50) DEFAULT NULL,
  `Opening_Qty` int(11) DEFAULT NULL,
  `Opening_Rate` decimal(18,3) DEFAULT NULL,
  `JV_No` varchar(50) DEFAULT NULL,
  `LocId` int(11) DEFAULT NULL,
  `Add_PartNo` varchar(60) DEFAULT NULL,
  `BOMNO` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itemmaster`
--

INSERT INTO `itemmaster` (`ItemId`, `RelativeNo`, `ItemName`, `Region`, `ItemType`, `CategoryId`, `MaterialCode`, `VendorId`, `LoationId`, `ReOrderLevel`, `UnitPrice`, `BatchCode`, `UnitPrice1`, `UnitPrice2`, `PartNo`, `Color`, `Packing`, `Weight`, `Shape`, `ItemSize`, `Ref1`, `Ref2`, `StockType`, `UnitId`, `ExpenseACC`, `Image`, `Active`, `LastPurPrice`, `Services`, `AssetACC`, `SupCode`, `Barcode`, `AliasName`, `UserId`, `GroupDebitAcc`, `GroupCreditAcc`, `LandingCost`, `BaseValue`, `RackID`, `status`, `Type`, `Height_N`, `Width_N`, `CurStock`, `Type_ID`, `Model_ID`, `TaxID`, `Show_hide`, `showSalesman`, `ReorderCheck`, `deflocationname`, `deflocation`, `CountryId`, `Redm_rewardPoint`, `VAT`, `VATPERC`, `Vat_Inclus`, `PackageID`, `GenericName`, `ManufName`, `MinimumQty`, `SupplierName`, `c_PromoCode`, `ISserialNo`, `isAddi_Barcode`, `AddDesc`, `Is_Subscription`, `IswaingScale`, `Percantage`, `NoofDays`, `WarrantyType`, `IsWarranty`, `StationCode`, `isbatchWise`, `Opening_Acc`, `BatchNumber`, `Opening_SeriesNo`, `Opening_Qty`, `Opening_Rate`, `JV_No`, `LocId`, `Add_PartNo`, `BOMNO`, `created_at`) VALUES
(123, 0, 'sample item', 'qatar', 'Service', 3, '', NULL, NULL, NULL, 800.0000, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, 'pcs', NULL, 0x5b6f626a656374204f626a6563745d, NULL, NULL, NULL, NULL, NULL, '3311', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-08 18:16:31'),
(2100, 0, 'Nelco', 'india', 'Inventory', 3, 'AS511', NULL, NULL, NULL, 410.0000, NULL, NULL, NULL, NULL, NULL, NULL, '200kg', NULL, NULL, NULL, NULL, NULL, 'pcs', NULL, 0x5b6f626a656374204f626a6563745d, NULL, NULL, NULL, NULL, NULL, '2312222', NULL, NULL, NULL, NULL, 415, 410, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 19, NULL, NULL, NULL, NULL, 'Steel Product', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1111, '2023-10-27 19:29:39'),
(2101, 0, 'Suzuki Belt', 'USA', 'Inventory', 2, '2233#', NULL, NULL, NULL, 870.6700, NULL, NULL, NULL, NULL, NULL, NULL, '10kg', NULL, NULL, NULL, NULL, NULL, 'pcs', NULL, 0x5b6f626a656374204f626a6563745d, NULL, NULL, NULL, NULL, NULL, 'as12121', NULL, NULL, NULL, NULL, 870, 870, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 215, NULL, NULL, NULL, NULL, 'Steel belt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-10-28 02:13:18'),
(2102, 0, 'walve2.5mm', 'سشتشستا', 'Service', 2, '', NULL, NULL, NULL, 290.0000, NULL, NULL, NULL, NULL, NULL, NULL, '2.5', NULL, NULL, NULL, NULL, NULL, 'pcs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '#1113345', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6000, NULL, NULL, NULL, NULL, 'Toyota parts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 07:14:24'),
(2110, 0, 'nail 1/2', '', 'Service', 2, '', NULL, NULL, NULL, 2.0000, NULL, NULL, NULL, NULL, NULL, NULL, '10kg', NULL, NULL, NULL, NULL, NULL, 'pcs', NULL, 0x5b6f626a656374204f626a6563745d, NULL, NULL, NULL, NULL, NULL, '9900', NULL, NULL, NULL, NULL, NULL, 1.9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1000, NULL, NULL, NULL, NULL, 'steel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-10 08:08:33');

-- --------------------------------------------------------

--
-- Table structure for table `masteraccounts`
--

CREATE TABLE `masteraccounts` (
  `sno` int(20) NOT NULL,
  `relativeno` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `accno` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accname` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `acctype` char(20) NOT NULL DEFAULT 'A',
  `mainhead` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Assets',
  `subhead` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Current Assets',
  `imagekey` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'A',
  `fsno` decimal(18,0) NOT NULL DEFAULT 1,
  `systemacc` char(1) NOT NULL DEFAULT 'U',
  `status` char(1) DEFAULT 'R',
  `userid` bigint(20) DEFAULT 1,
  `dtcreate` datetime DEFAULT current_timestamp(),
  `currencyid` decimal(18,0) DEFAULT 0,
  `gpacc` char(1) DEFAULT 'N',
  `acacc` char(1) DEFAULT 'N',
  `edacc` char(1) DEFAULT 'N',
  `openbalance` decimal(18,4) DEFAULT 0.0000,
  `totaldebit` decimal(18,4) DEFAULT NULL,
  `totalcredit` decimal(18,4) DEFAULT NULL,
  `manualcode` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `costcenterid` bigint(20) DEFAULT NULL,
  `showsumintb` bit(20) DEFAULT NULL,
  `assetvalue` float DEFAULT NULL,
  `assetdepvalue` float DEFAULT NULL,
  `assetqty` float DEFAULT NULL,
  `lifeinyrs` float DEFAULT NULL,
  `assetdepmode` varchar(50) DEFAULT NULL,
  `assetdate` datetime DEFAULT NULL,
  `isasset` bit(20) DEFAULT NULL,
  `costcentersub` bit(20) DEFAULT NULL,
  `sortno` int(11) DEFAULT NULL,
  `isairacc` bit(20) DEFAULT NULL,
  `isseaacc` bit(20) DEFAULT NULL,
  `ispayhead` int(11) DEFAULT NULL,
  `openbalcr` decimal(18,3) DEFAULT 0.000,
  `close_cr` decimal(18,3) DEFAULT 0.000,
  `crdr` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `openingvalue` float DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `masteraccounts`
--

INSERT INTO `masteraccounts` (`sno`, `relativeno`, `accno`, `accname`, `acctype`, `mainhead`, `subhead`, `imagekey`, `fsno`, `systemacc`, `status`, `userid`, `dtcreate`, `currencyid`, `gpacc`, `acacc`, `edacc`, `openbalance`, `totaldebit`, `totalcredit`, `manualcode`, `costcenterid`, `showsumintb`, `assetvalue`, `assetdepvalue`, `assetqty`, `lifeinyrs`, `assetdepmode`, `assetdate`, `isasset`, `costcentersub`, `sortno`, `isairacc`, `isseaacc`, `ispayhead`, `openbalcr`, `close_cr`, `crdr`, `openingvalue`, `created_at`) VALUES
(8018, 'ASB5111', 'AS1000', 'Aramco', 'A', 'Assets', 'Current Assets', 'A', 1, 'U', 'R', 1, '2023-11-23 22:27:24', 0, 'N', 'N', 'N', 0.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.000, 0.000, NULL, 0, '2023-11-23 16:57:24'),
(8021, 'ASB5111', 'AS1005', 'Limra sofech', 'A', 'Assets', 'Current Assets', 'A', 1, 'U', 'R', 1, '2023-11-23 22:42:56', 0, 'N', 'N', 'N', 0.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.000, 0.000, NULL, 0, '2023-11-23 17:12:56'),
(8022, 'ASB5111', 'AS1051', 'Ashraf', 'A', 'Assets', 'Current Assets', 'A', 1, 'U', 'R', 1, '2023-11-25 13:00:09', 0, 'N', 'N', 'N', 0.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.000, 0.000, NULL, 0, '2023-11-25 07:30:09'),
(8023, 'ASB5111', 'AS1053', 'Ashraf', 'A', 'Assets', 'Current Assets', 'A', 1, 'U', 'R', 1, '2023-11-25 13:03:12', 0, 'N', 'N', 'N', 0.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.000, 0.000, NULL, 0, '2023-11-25 07:33:12');

-- --------------------------------------------------------

--
-- Table structure for table `sales_voucher`
--

CREATE TABLE `sales_voucher` (
  `V_ID` int(20) NOT NULL,
  `VoucherNo` varchar(20) NOT NULL,
  `ShortNo` bigint(20) NOT NULL,
  `VoucherDate` datetime DEFAULT NULL,
  `Voucher_Type` varchar(20) DEFAULT NULL,
  `CustomerName` varchar(250) DEFAULT NULL,
  `Customer_ID` decimal(18,0) DEFAULT NULL,
  `Location` bigint(20) DEFAULT NULL,
  `Salesman` bigint(20) DEFAULT NULL,
  `Discount` decimal(18,4) DEFAULT NULL,
  `GrossAmount` decimal(18,4) DEFAULT NULL,
  `NetAmount` decimal(18,4) DEFAULT NULL,
  `Remarks` text DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `CurrencyId` bigint(20) DEFAULT NULL,
  `FSNO` decimal(18,0) DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `CONO` varchar(50) DEFAULT NULL,
  `DeliveryNote` varchar(100) DEFAULT NULL,
  `Cust_PONo` varchar(20) DEFAULT NULL,
  `Fc_Rate` decimal(18,4) DEFAULT NULL,
  `CompanyId` varchar(11) DEFAULT NULL,
  `JobId` bigint(20) DEFAULT NULL,
  `Currency_ID` bigint(20) DEFAULT NULL,
  `Refrence` varchar(50) DEFAULT NULL,
  `Cust_PODate` datetime DEFAULT NULL,
  `NetDiscount` decimal(18,4) DEFAULT NULL,
  `CashCustName` varchar(100) DEFAULT NULL,
  `DiscountPer` decimal(18,4) DEFAULT NULL,
  `Shipping_Address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `InvoiceType` varchar(50) DEFAULT NULL,
  `ContractId` bigint(20) DEFAULT NULL,
  `PamentTerms_V` varchar(1000) DEFAULT NULL,
  `PaymentTerms_V` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `TermsAndConditions_V` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `InvoiceStatus` varchar(50) DEFAULT NULL,
  `SV_QtnID_N` int(11) DEFAULT NULL,
  `CREDIT_CUST_ID` bigint(20) DEFAULT NULL,
  `VatAmount` decimal(18,4) DEFAULT NULL,
  `Vat_Per` decimal(18,4) DEFAULT NULL,
  `Vat_RoundSign` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Vat_RountAmt` decimal(18,4) DEFAULT NULL,
  `DeptID` bigint(20) DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Currency_Rate` decimal(18,4) DEFAULT NULL,
  `Advance` decimal(18,3) DEFAULT NULL,
  `Vat_No` varchar(50) DEFAULT NULL,
  `ExcludeVAT` bit(1) DEFAULT NULL,
  `CAddress` varchar(500) DEFAULT NULL,
  `VATNo` varchar(50) DEFAULT NULL,
  `KFCAmount` decimal(18,5) DEFAULT NULL,
  `KFC_perc` decimal(18,5) DEFAULT NULL,
  `StationID` int(11) DEFAULT NULL,
  `WorkPeriodID` int(11) DEFAULT NULL,
  `Vatable_TotAmt` float DEFAULT NULL,
  `SV_VesselId` int(11) DEFAULT NULL,
  `HOLD_B` bit(1) DEFAULT NULL,
  `Counter_ID_N` int(11) DEFAULT NULL,
  `Shift_ID_N` int(11) DEFAULT NULL,
  `Retail_B` bit(1) DEFAULT NULL,
  `Vat_AMT` decimal(18,4) DEFAULT NULL,
  `SVVatPosted` bit(1) DEFAULT NULL,
  `QtnCode` varchar(80) DEFAULT NULL,
  `DueDate` datetime DEFAULT NULL,
  `ContactPerson` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sales_Acc` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `CompBranchId` int(11) DEFAULT NULL,
  `Branchid` int(11) DEFAULT NULL,
  `Salesman_perc` decimal(18,2) DEFAULT NULL,
  `Salesman_perc_Value` decimal(18,2) DEFAULT NULL,
  `Adv_V_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Isposted` bit(1) DEFAULT NULL,
  `PaidAmount` int(11) DEFAULT NULL,
  `IsCust_GroupWise` int(11) DEFAULT NULL,
  `Mobile` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Vehicil_no` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `StationCode` int(11) DEFAULT NULL,
  `VehicleDetails` varchar(150) DEFAULT NULL,
  `VehicleNo` varchar(50) DEFAULT NULL,
  `ItemDiscount` decimal(18,2) DEFAULT NULL,
  `vehicleCustomer` varchar(150) DEFAULT NULL,
  `VeichleCust_Mobile` varchar(50) DEFAULT NULL,
  `Coupen` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales_voucher`
--

INSERT INTO `sales_voucher` (`V_ID`, `VoucherNo`, `ShortNo`, `VoucherDate`, `Voucher_Type`, `CustomerName`, `Customer_ID`, `Location`, `Salesman`, `Discount`, `GrossAmount`, `NetAmount`, `Remarks`, `UserId`, `CurrencyId`, `FSNO`, `Description`, `CONO`, `DeliveryNote`, `Cust_PONo`, `Fc_Rate`, `CompanyId`, `JobId`, `Currency_ID`, `Refrence`, `Cust_PODate`, `NetDiscount`, `CashCustName`, `DiscountPer`, `Shipping_Address`, `InvoiceType`, `ContractId`, `PamentTerms_V`, `PaymentTerms_V`, `TermsAndConditions_V`, `InvoiceStatus`, `SV_QtnID_N`, `CREDIT_CUST_ID`, `VatAmount`, `Vat_Per`, `Vat_RoundSign`, `Vat_RountAmt`, `DeptID`, `Name`, `Currency_Rate`, `Advance`, `Vat_No`, `ExcludeVAT`, `CAddress`, `VATNo`, `KFCAmount`, `KFC_perc`, `StationID`, `WorkPeriodID`, `Vatable_TotAmt`, `SV_VesselId`, `HOLD_B`, `Counter_ID_N`, `Shift_ID_N`, `Retail_B`, `Vat_AMT`, `SVVatPosted`, `QtnCode`, `DueDate`, `ContactPerson`, `sales_Acc`, `CompBranchId`, `Branchid`, `Salesman_perc`, `Salesman_perc_Value`, `Adv_V_no`, `Isposted`, `PaidAmount`, `IsCust_GroupWise`, `Mobile`, `Vehicil_no`, `StationCode`, `VehicleDetails`, `VehicleNo`, `ItemDiscount`, `vehicleCustomer`, `VeichleCust_Mobile`, `Coupen`, `created_at`) VALUES
(5, 'INV001', 0, '2023-11-20 23:54:22', NULL, 'sha', 45134, NULL, NULL, NULL, 276000.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'w1245', NULL, NULL, 'Asif', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 05:24:52'),
(7, 'INV004', 0, '2023-11-21 07:17:15', NULL, 'Saleem', 44411, NULL, NULL, NULL, 93100.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ws9000', NULL, NULL, 'LEM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 07:17:15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 07:17:46'),
(8, 'INV0100', 0, '2023-11-21 08:02:42', NULL, 'Saheer', 45124, NULL, NULL, NULL, 335130.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'w1245', NULL, NULL, 'DAS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 08:02:42', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 08:03:59'),
(11, 'INV005', 0, '2023-11-25 06:49:06', NULL, 'Limra sofech', 45149, NULL, NULL, NULL, 40968.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ws9000', NULL, NULL, 'k ARUN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 06:49:06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 06:49:50'),
(12, 'INV023', 0, '2023-11-25 08:59:19', NULL, 'Limra sofech', 45149, NULL, NULL, NULL, 892.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'undefined', NULL, NULL, 'k ARUN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 08:59:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 08:59:53');

-- --------------------------------------------------------

--
-- Table structure for table `sales_voucher_details`
--

CREATE TABLE `sales_voucher_details` (
  `SDet_ID` bigint(20) NOT NULL,
  `VoucherNo` varchar(20) NOT NULL,
  `ItemId` decimal(18,0) NOT NULL,
  `Description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `BatchCode` varchar(50) DEFAULT NULL,
  `UnitId` varchar(18) DEFAULT NULL,
  `Sold_Qty` decimal(18,3) DEFAULT NULL,
  `UnitPrice` decimal(18,4) DEFAULT NULL,
  `CostPrice` decimal(18,4) DEFAULT NULL,
  `GrossAmt` decimal(18,4) DEFAULT NULL,
  `Discount` decimal(18,4) DEFAULT NULL,
  `NetAmount` decimal(18,4) DEFAULT NULL,
  `FSNO` decimal(18,0) NOT NULL,
  `SNO` int(11) DEFAULT NULL,
  `DeliveryNote` bigint(20) DEFAULT NULL,
  `LocationID` int(11) DEFAULT NULL,
  `CompanyId` varchar(11) DEFAULT NULL,
  `POD_ID` bigint(20) DEFAULT NULL,
  `delv_id` bigint(20) DEFAULT NULL,
  `Del_DetId` int(11) DEFAULT NULL,
  `VatAmount` decimal(18,4) DEFAULT NULL,
  `Delv_No` varchar(50) DEFAULT NULL,
  `Delv_Date` datetime DEFAULT NULL,
  `WorkPeriodID` int(11) DEFAULT NULL,
  `StationID` int(11) DEFAULT NULL,
  `SV_Remarks_V` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SV_Origin_V` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SerialNo_V` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SV_VendorName_V` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SalesManid` int(11) DEFAULT NULL,
  `CostPriceBk` decimal(18,4) DEFAULT NULL,
  `S_Barcode` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Addi_Desc` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `LedgerHead` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `CostCenterid` int(11) DEFAULT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  `Disc_Perc` decimal(18,3) DEFAULT NULL,
  `SERIEALNO` int(11) DEFAULT NULL,
  `Exp_Date` datetime DEFAULT NULL,
  `Create At` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales_voucher_details`
--

INSERT INTO `sales_voucher_details` (`SDet_ID`, `VoucherNo`, `ItemId`, `Description`, `BatchCode`, `UnitId`, `Sold_Qty`, `UnitPrice`, `CostPrice`, `GrossAmt`, `Discount`, `NetAmount`, `FSNO`, `SNO`, `DeliveryNote`, `LocationID`, `CompanyId`, `POD_ID`, `delv_id`, `Del_DetId`, `VatAmount`, `Delv_No`, `Delv_Date`, `WorkPeriodID`, `StationID`, `SV_Remarks_V`, `SV_Origin_V`, `SerialNo_V`, `SV_VendorName_V`, `SalesManid`, `CostPriceBk`, `S_Barcode`, `Addi_Desc`, `LedgerHead`, `CostCenterid`, `CustomerID`, `Disc_Perc`, `SERIEALNO`, `Exp_Date`, `Create At`) VALUES
(3, 'INV001', 2102, 'Toyota parts', NULL, 'pcs', 120.000, 800.0000, NULL, 96000.0000, NULL, NULL, 0, NULL, NULL, NULL, 'w1245', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 10:54:52'),
(4, 'INV001', 2100, 'Steel Product', NULL, 'pcs', 200.000, 900.0000, NULL, 180000.0000, NULL, NULL, 0, NULL, NULL, NULL, 'w1245', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 10:54:52'),
(6, 'INV004', 2101, 'Steel belt', NULL, 'pcs', 133.000, 700.0000, NULL, 93100.0000, NULL, NULL, 0, NULL, NULL, NULL, 'ws9000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 12:47:46'),
(7, 'INV0100', 2100, 'Steel Product', NULL, 'pcs', 122.000, 900.0000, NULL, 109800.0000, NULL, NULL, 0, NULL, NULL, NULL, 'w1245', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 13:33:59'),
(8, 'INV0100', 2102, 'Toyota parts', NULL, 'pcs', 111.000, 230.0000, NULL, 25530.0000, NULL, NULL, 0, NULL, NULL, NULL, 'w1245', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 13:33:59'),
(9, 'INV0100', 2101, 'Steel belt', NULL, 'pcs', 222.000, 900.0000, NULL, 199800.0000, NULL, NULL, 0, NULL, NULL, NULL, 'w1245', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-21 13:33:59'),
(13, 'INV005', 2100, 'Steel Product', NULL, 'pcs', 12.000, 789.0000, NULL, 9468.0000, NULL, NULL, 0, NULL, NULL, NULL, 'ws9000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 12:19:50'),
(14, 'INV005', 2110, 'steel', NULL, 'pcs', 45.000, 700.0000, NULL, 31500.0000, NULL, NULL, 0, NULL, NULL, NULL, 'ws9000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 12:19:50'),
(15, 'INV023', 2100, 'Steel Product', NULL, 'pcs', 23.000, 12.0000, NULL, 276.0000, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 14:29:53'),
(16, 'INV023', 2101, 'Steel belt', NULL, 'pcs', 11.000, 56.0000, NULL, 616.0000, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 14:29:53');

-- --------------------------------------------------------

--
-- Table structure for table `stationmaster`
--

CREATE TABLE `stationmaster` (
  `StationCode` varchar(30) NOT NULL,
  `StationName` varchar(200) NOT NULL,
  `Address` varchar(200) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `PostOffice` varchar(100) DEFAULT NULL,
  `Tele1` varchar(30) DEFAULT NULL,
  `Tele2` varchar(30) DEFAULT NULL,
  `Fax` varchar(30) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `WebSite` varchar(100) DEFAULT NULL,
  `Country` varchar(50) DEFAULT NULL,
  `LogoPath` varchar(100) DEFAULT NULL,
  `SignPath` varchar(100) DEFAULT NULL,
  `LogoImg` longblob DEFAULT NULL,
  `SignImg` longblob DEFAULT NULL,
  `SealImg` longblob DEFAULT NULL,
  `Vat_No` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `BankName` varchar(100) DEFAULT NULL,
  `AccountName` varchar(100) DEFAULT NULL,
  `AccountNo` varchar(100) DEFAULT NULL,
  `IBAN` varchar(100) DEFAULT NULL,
  `SwiftCode` varchar(100) DEFAULT NULL,
  `BankBranch` varchar(100) DEFAULT NULL,
  `BankCurrency` varchar(100) DEFAULT NULL,
  `CityID` int(11) DEFAULT NULL,
  `CountryID` int(11) DEFAULT NULL,
  `RegCode` varchar(100) DEFAULT NULL,
  `CurrencyID` int(11) DEFAULT NULL,
  `Stamp` longblob DEFAULT NULL,
  `Stamp_Path` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Periodicity` varchar(30) DEFAULT NULL,
  `Reg_Date` datetime DEFAULT NULL,
  `Enable_Tax` bit(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stationmaster`
--

INSERT INTO `stationmaster` (`StationCode`, `StationName`, `Address`, `City`, `PostOffice`, `Tele1`, `Tele2`, `Fax`, `Email`, `WebSite`, `Country`, `LogoPath`, `SignPath`, `LogoImg`, `SignImg`, `SealImg`, `Vat_No`, `BankName`, `AccountName`, `AccountNo`, `IBAN`, `SwiftCode`, `BankBranch`, `BankCurrency`, `CityID`, `CountryID`, `RegCode`, `CurrencyID`, `Stamp`, `Stamp_Path`, `Periodicity`, `Reg_Date`, `Enable_Tax`, `created_at`) VALUES
('w1245', 'Limraaaaa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 16:48:44'),
('ws9000', 'Limra', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-25 16:43:13');

-- --------------------------------------------------------

--
-- Table structure for table `stock_register`
--

CREATE TABLE `stock_register` (
  `Store_ID` decimal(18,0) NOT NULL,
  `PurchaseID` varchar(20) DEFAULT NULL,
  `Ref_Voucher_No` varchar(50) DEFAULT NULL,
  `SNo` decimal(18,0) DEFAULT NULL,
  `BatchCode` varchar(50) DEFAULT NULL,
  `Exp_Date` datetime DEFAULT NULL,
  `Mat_ID` bigint(20) DEFAULT NULL,
  `Quantity` decimal(18,4) DEFAULT NULL,
  `SIN` decimal(18,4) DEFAULT NULL,
  `SOUT` decimal(18,4) DEFAULT NULL,
  `Rate` decimal(18,4) DEFAULT NULL,
  `Amount` decimal(18,4) DEFAULT NULL,
  `Fc_Amount` decimal(18,4) DEFAULT NULL,
  `AssignedDate` datetime DEFAULT NULL,
  `Dep_Code` varchar(50) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `TransType` char(30) DEFAULT NULL,
  `Remarks` varchar(200) DEFAULT NULL,
  `Unit` int(11) DEFAULT NULL,
  `LocationId` int(11) DEFAULT NULL,
  `JobId` int(11) DEFAULT NULL,
  `FSNO` int(11) DEFAULT NULL,
  `NetStkBal` float DEFAULT NULL,
  `LandingCost` float DEFAULT NULL,
  `CalcDone` bit(1) DEFAULT NULL,
  `PartyName` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SERIEALNO` int(11) DEFAULT NULL,
  `CurrentCost` decimal(18,3) DEFAULT NULL,
  `Sales_Price` decimal(18,3) DEFAULT NULL,
  `Sup_Id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `CompanyId` varchar(20) NOT NULL,
  `role` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `CompanyId`, `role`, `created_at`) VALUES
(1, 'SuperAdmin', 'admin@technosoft.qa', 'ASDF1234asdf@$', 'Admin', 'admin', '2023-10-18 20:26:21'),
(8, 'Asif Muhammed k', 'asifmuhammed@gmail.com', 'FDSA1234fdsa@$', 'w1245', 'user', '2023-11-20 08:07:58'),
(9, 'Limra', 'admin@doorsoft.co', 'ASEWR1245ASD@$asw', 'qw1279', 'user', '2023-11-20 12:35:31'),
(10, 'Luminous', 'asasas@info.in', 'aQWer1289@$', 'qw1278', 'user', '2023-11-20 12:43:58'),
(12, 'Shakeer', 'shakeee@gmail.com', 'DERF4567derf@$', 'ws9000', 'user', '2023-11-21 05:36:23'),
(13, 'Sales', 'sales@info.in', 'AGFDwert2345@$', '45MN00', 'user', '2023-11-25 09:43:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountstransactions`
--
ALTER TABLE `accountstransactions`
  ADD PRIMARY KEY (`transsno`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`);

--
-- Indexes for table `invbrand`
--
ALTER TABLE `invbrand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invcategory`
--
ALTER TABLE `invcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invgroup`
--
ALTER TABLE `invgroup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invunit`
--
ALTER TABLE `invunit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itemmaster`
--
ALTER TABLE `itemmaster`
  ADD PRIMARY KEY (`ItemId`);

--
-- Indexes for table `masteraccounts`
--
ALTER TABLE `masteraccounts`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `sales_voucher`
--
ALTER TABLE `sales_voucher`
  ADD PRIMARY KEY (`V_ID`);

--
-- Indexes for table `sales_voucher_details`
--
ALTER TABLE `sales_voucher_details`
  ADD PRIMARY KEY (`SDet_ID`);

--
-- Indexes for table `stationmaster`
--
ALTER TABLE `stationmaster`
  ADD PRIMARY KEY (`StationCode`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountstransactions`
--
ALTER TABLE `accountstransactions`
  MODIFY `transsno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45151;

--
-- AUTO_INCREMENT for table `invbrand`
--
ALTER TABLE `invbrand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invcategory`
--
ALTER TABLE `invcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `invgroup`
--
ALTER TABLE `invgroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invunit`
--
ALTER TABLE `invunit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `masteraccounts`
--
ALTER TABLE `masteraccounts`
  MODIFY `sno` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8024;

--
-- AUTO_INCREMENT for table `sales_voucher`
--
ALTER TABLE `sales_voucher`
  MODIFY `V_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sales_voucher_details`
--
ALTER TABLE `sales_voucher_details`
  MODIFY `SDet_ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
