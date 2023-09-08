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
-- Table structure for table `specialty_discipline`
--

DROP TABLE IF EXISTS `specialty_discipline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialty_discipline` (
  `specialty_discipline_id` int unsigned NOT NULL AUTO_INCREMENT,
  `specialty_id` int unsigned NOT NULL,
  `discipline_id` int unsigned NOT NULL,
  `semester` char(1) NOT NULL,
  PRIMARY KEY (`specialty_discipline_id`),
  UNIQUE KEY `id_UNIQUE` (`specialty_discipline_id`),
  KEY `discipline_id_specialty_idx` (`discipline_id`),
  KEY `specialty_id_discipline_idx` (`specialty_id`),
  CONSTRAINT `discipline_id_specialty` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`discipline_id`),
  CONSTRAINT `specialty_id_discipline` FOREIGN KEY (`specialty_id`) REFERENCES `specialty` (`specialty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialty_discipline`
--

LOCK TABLES `specialty_discipline` WRITE;
/*!40000 ALTER TABLE `specialty_discipline` DISABLE KEYS */;
INSERT INTO `specialty_discipline` VALUES (8,2,2,'1'),(9,2,4,'1'),(10,2,5,'1'),(11,2,6,'1'),(12,2,7,'1'),(13,1,8,'2'),(14,3,2,'1'),(15,3,5,'1'),(16,3,6,'1'),(25,1,9,'2'),(26,1,10,'2'),(27,1,11,'2'),(28,1,12,'2'),(29,1,13,'2'),(30,1,14,'2'),(31,1,15,'3'),(32,1,16,'3'),(33,1,17,'3'),(34,1,18,'3'),(35,1,19,'3'),(36,1,20,'3'),(37,1,21,'3'),(38,1,22,'4'),(39,1,23,'4'),(40,1,24,'4'),(41,1,25,'4'),(42,1,26,'4'),(43,1,27,'4'),(44,1,28,'4'),(45,1,29,'4'),(46,1,30,'4'),(47,1,40,'5'),(48,1,41,'5'),(49,1,42,'5'),(50,1,43,'5'),(51,1,44,'5'),(52,1,25,'5'),(53,1,22,'5'),(54,1,23,'5'),(55,1,26,'5'),(63,1,45,'6'),(64,1,46,'6'),(65,1,47,'6'),(66,1,48,'6'),(67,1,49,'6'),(68,1,50,'6'),(69,1,40,'6'),(70,1,43,'6'),(71,1,44,'6'),(72,1,42,'6'),(73,1,52,'6'),(74,1,53,'7'),(75,1,54,'7'),(76,1,55,'7'),(77,1,56,'7'),(78,1,57,'7'),(79,1,58,'7'),(80,1,59,'7'),(81,1,60,'8'),(82,1,61,'8'),(83,1,62,'8'),(84,1,63,'8'),(85,1,64,'8'),(86,1,65,'8'),(87,1,66,'8'),(88,1,67,'8'),(89,1,68,'8'),(90,1,69,'8'),(91,1,70,'8'),(92,1,71,'8'),(93,1,72,'8'),(94,1,73,'8'),(95,1,74,'8'),(96,1,2,'1'),(97,1,3,'1'),(98,1,4,'1'),(99,1,5,'1'),(100,1,6,'1'),(101,1,7,'1');
/*!40000 ALTER TABLE `specialty_discipline` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-08 18:05:25
