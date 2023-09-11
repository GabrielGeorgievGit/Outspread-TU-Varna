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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `fn` char(8) DEFAULT NULL,
  `specialty_id` int unsigned DEFAULT NULL,
  `semester` char(1) DEFAULT NULL,
  `role` varchar(15) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `id_UNIQUE` (`user_id`),
  UNIQUE KEY `usename_UNIQUE` (`username`),
  UNIQUE KEY `fn_UNIQUE` (`fn`),
  KEY `specialty_user_id_idx` (`specialty_id`),
  CONSTRAINT `specialty_user_id` FOREIGN KEY (`specialty_id`) REFERENCES `specialty` (`specialty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ivan','ivan','Иван Иванов','19281926',1,'1','STUDENT'),(2,'georgi','georgi','Георги Георгиев','19293934',2,'2','STUDENT'),(4,'galin','galin','Галин Петров','19281929',1,'6','STUDENT'),(6,'john','john','Джон Андерсън','12312312',2,'1','STUDENT'),(7,'john1','john','Мартин Едуардс','12312313',2,'1','STUDENT'),(8,'georgito','1234','Георги Петров','19293912',2,'1','STUDENT'),(9,'joro','joro','Йордан Йорданов','19281983',1,'1','STUDENT'),(10,'joro1','joro1','Кирил Йорданов','19281928',1,'1','STUDENT'),(12,'jorka34','jorka34','Стефан Димитров','19283494',1,'1','STUDENT'),(13,'jorkaks','jorkaks','Емил Асенов','19281736',1,'1','STUDENT'),(14,'jorojoro','jorojoro','Христо Каменов','19121341',1,'2','STUDENT'),(17,'hriszivkova','hriszivkova','Христина Живкова',NULL,1,'','TEACHER'),(18,'ivant','ivant','Иван Иванов','19281919',1,'1','STUDENT'),(26,'prep1','prep1','prep1',NULL,1,NULL,'teacher'),(27,'prep2','prep2','prep2',NULL,1,NULL,'teacher');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-11 23:03:09
