-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: outspreaddb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise` (
  `exercise_id` int unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int unsigned NOT NULL,
  `title` varchar(100) NOT NULL,
  `discipline_id` int unsigned NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `room_id` int unsigned DEFAULT NULL,
  `signed` int unsigned NOT NULL,
  PRIMARY KEY (`exercise_id`),
  UNIQUE KEY `id_UNIQUE` (`exercise_id`),
  KEY `discipline_exercise_id_idx` (`discipline_id`),
  KEY `owner_user_id_idx` (`owner_id`),
  KEY `exercise_room_id_idx` (`room_id`),
  CONSTRAINT `discipline_exercise_id` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`discipline_id`),
  CONSTRAINT `exercise_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `owner_user_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,1,'Упражнение за обучаване по математика първа част',2,'Добре дошли да се упражняваме по математика','2023-09-27 17:10:00','02:20:00',3,2),(17,2,'Изучаване на математика 1 част',2,'Тук ще изучаваме математика','2023-08-13 14:00:00','03:00:00',13,3),(19,4,'Упражнение по математика втора част',8,'Упражнения помагащи на студентите за начални знания по дисциплината','2023-09-26 15:00:00','01:30:00',8,1),(20,1,'Упражнение по първите упражнения по математиак',8,'Упражнение по първите упражнения от 1 до 8','2023-08-01 00:00:00','02:00:00',13,0),(24,9,'Упражнение по базово програмиране',4,'Предлагам упражняване на взетия материал до момента по базово програмиране.','2023-09-25 13:15:00','02:00:00',15,0);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-08 18:05:26
