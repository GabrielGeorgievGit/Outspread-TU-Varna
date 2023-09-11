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
-- Table structure for table `discipline`
--

DROP TABLE IF EXISTS `discipline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discipline` (
  `discipline_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`discipline_id`),
  UNIQUE KEY `id_UNIQUE` (`discipline_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discipline`
--

LOCK TABLES `discipline` WRITE;
/*!40000 ALTER TABLE `discipline` DISABLE KEYS */;
INSERT INTO `discipline` VALUES (66,'Cloud технологии'),(1,'discipline1'),(3,'Web дизайн'),(23,'WEB програмиране'),(16,'Бази от данни'),(4,'Базово програмиране'),(70,'Бизнес интелигентни системи'),(75,'Въведение в машинното обучение'),(72,'Възобновяеми енергийни източници - принципи и софтуерни решения'),(26,'Графични системи'),(15,'Дискретни структури'),(54,'Езикови процесори '),(74,'Езици за функционално програмиране'),(5,'Електроника'),(67,'Електронна търговия'),(57,'Извличане на информация в Интернет'),(55,'Изкуствен интелект '),(46,'Интернет сървъри и услуги'),(50,'Интернет технологии'),(65,'Информационни системи'),(43,'Компютърни мрежи и Интернет '),(69,'Криптография и защита на данните'),(10,'Логика и автомати '),(2,'Математика - 1 част'),(8,'Математика - 2 част'),(24,'Микропроцесорна техника'),(71,'Моделиране и анализ на данни'),(53,'Мрежово администриране'),(63,'Мултимедийни системи и технологии'),(64,'Обектно-ориентирани приложения'),(17,'Обектно-ориентирано програмиране - 1част'),(22,'Обектно-ориентирано програмиране - 2част'),(27,'Обектно-ориентирано програмиране -1част - проект'),(18,'Организация на компютъра'),(58,'Основи на киберсигурността'),(60,'Офис технологии'),(40,'Принципи на операционните системи '),(42,'Програмиране за бази от данни '),(56,'Програмиране за мобилни и Интернет устройства'),(25,'Програмни системи'),(48,'Проектиране на потребителски интерфейс'),(61,'Разпределена обработка в Интернет '),(9,'Синтез и анализ на алгоритми'),(19,'Системен анализ'),(45,'Системно програмиране'),(49,'Скриптови езици и функционално програмиране'),(41,'Софтуерни изисквания и спецификации'),(6,'Специализирана спортна подготовка - 1 част'),(12,'Специализирана спортна подготовка - 2част'),(20,'Специализирана спортна подготовка - 3част'),(28,'Специализирана спортна подготовка - 4част'),(52,'Специализираща практика'),(7,'Спорт и социална адаптация - 1част'),(13,'Спорт и социална адаптация - 2част'),(21,'Спортен мениджмънт - 1част'),(29,'Спортен мениджмънт - 2част'),(73,'Тайм мениджмънт (управление на времето)'),(44,'Технология на софтуерното производство'),(68,'Управление на екипи'),(47,'Управление на софтуерни проекти '),(14,'Учебна практика - 1част'),(30,'Учебна практика - 2част'),(59,'Учебна практика - 3част '),(62,'Фирмен мениджмънт'),(11,'Чужд език');
/*!40000 ALTER TABLE `discipline` ENABLE KEYS */;
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
