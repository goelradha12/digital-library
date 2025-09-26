-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: library_management
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ai_recommendation`
--

DROP TABLE IF EXISTS `ai_recommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_recommendation` (
  `Recommendation_ID` varchar(12) NOT NULL,
  `User_ID` varchar(12) DEFAULT NULL,
  `Book_ID` varchar(12) DEFAULT NULL,
  `Rank_Order` int NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`Recommendation_ID`),
  KEY `User_ID` (`User_ID`),
  KEY `Book_ID` (`Book_ID`),
  CONSTRAINT `ai_recommendation_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ai_recommendation_ibfk_2` FOREIGN KEY (`Book_ID`) REFERENCES `book` (`Book_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ai_recommendation_chk_1` CHECK ((`Rank_Order` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_recommendation`
--

LOCK TABLES `ai_recommendation` WRITE;
/*!40000 ALTER TABLE `ai_recommendation` DISABLE KEYS */;
INSERT INTO `ai_recommendation` VALUES ('REC000000001','USE000000001','B00000000001',1,'2025-04-21'),('REC000000002','USE000000002','B00000000002',2,'2025-04-22'),('REC000000003','USE000000003','B00000000003',1,'2025-04-22'),('REC000000004','USE000000004','B00000000004',2,'2025-04-23'),('REC000000005','USE000000005','B00000000005',1,'2025-04-23'),('REC000000006','USE000000006','B00000000006',2,'2025-04-24'),('REC000000007','USE000000007','B00000000007',1,'2025-04-24'),('REC000000008','USE000000008','B00000000008',2,'2025-04-25'),('REC000000009','USE000000009','B00000000009',1,'2025-04-25'),('REC000000010','USE000000010','B00000000010',2,'2025-04-26'),('REC000000011','USE000000011','B00000000011',1,'2025-04-26'),('REC000000012','USE000000012','B00000000012',2,'2025-04-27'),('REC000000013','USE000000013','B00000000013',1,'2025-04-27'),('REC000000014','USE000000014','B00000000014',2,'2025-04-28'),('REC000000015','USE000000015','B00000000015',1,'2025-04-28'),('REC000000016','USE000000016','B00000000016',2,'2025-04-29'),('REC000000017','USE000000017','B00000000017',1,'2025-04-29'),('REC000000018','USE000000018','B00000000018',2,'2025-04-30'),('REC000000019','USE000000019','B00000000019',1,'2025-04-30'),('REC000000020','USE000000020','B00000000020',2,'2025-05-01'),('REC000000021','USE000000021','B00000000021',1,'2025-05-01'),('REC000000022','USE000000022','B00000000022',2,'2025-05-02'),('REC000000023','USE000000023','B00000000023',1,'2025-05-02'),('REC000000024','USE000000024','B00000000024',2,'2025-05-03'),('REC000000025','USE000000025','B00000000025',1,'2025-05-03'),('REC000000026','USE000000026','B00000000026',2,'2025-05-04'),('REC000000027','USE000000027','B00000000027',1,'2025-05-04'),('REC000000028','USE000000028','B00000000028',2,'2025-05-05'),('REC000000029','USE000000029','B00000000029',1,'2025-05-05'),('REC000000030','USE000000030','B00000000030',2,'2025-05-06'),('REC000000031','USE000000031','B00000000031',1,'2025-05-06'),('REC000000032','USE000000032','B00000000032',2,'2025-05-07'),('REC000000033','USE000000033','B00000000033',1,'2025-05-07'),('REC000000034','USE000000034','B00000000034',2,'2025-05-08'),('REC000000035','USE000000035','B00000000035',1,'2025-05-08'),('REC000000036','USE000000036','B00000000036',2,'2025-05-09'),('REC000000037','USE000000037','B00000000037',1,'2025-05-09'),('REC000000038','USE000000038','B00000000038',2,'2025-05-10');
/*!40000 ALTER TABLE `ai_recommendation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `Author_ID` varchar(12) NOT NULL,
  `Author_Image` varchar(255) DEFAULT NULL,
  `Author_Name` varchar(100) NOT NULL,
  `Author_Introduction` text,
  PRIMARY KEY (`Author_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES ('AUT000000001',NULL,'Tolkien, J.R.R.','English writer, poet, philologist, and academic, best known for The Lord of the Rings.'),('AUT000000002',NULL,'Rowling, J.K.','British author, best known for the Harry Potter series.'),('AUT000000003',NULL,'Orwell, George','English novelist and critic, known for dystopian fiction like 1984 and Animal Farm.'),('AUT000000004',NULL,'Huxley, Aldous','English writer and philosopher, famous for Brave New World.'),('AUT000000005',NULL,'Shelley, Mary','English novelist who wrote Frankenstein, a pioneering work of science fiction.'),('AUT000000006',NULL,'Premchand','Hindi-Urdu writer, novelist, and dramatist, known for social realism in Indian literature.'),('AUT000000007',NULL,'Tagore, Rabindranath','Bengali polymath, poet, musician, and artist, Nobel Prize winner in Literature.'),('AUT000000008',NULL,'Kipling, Rudyard','English journalist, short-story writer, and poet, famous for The Jungle Book.'),('AUT000000009',NULL,'Verne, Jules','French novelist, poet, and playwright, known as a father of science fiction.'),('AUT000000010',NULL,'Narayan, R.K.','Indian writer known for his works set in the fictional South Indian town of Malgudi.'),('AUT000000011',NULL,'Rushdie, Salman','British-Indian novelist, known for Midnight\'s Children and magical realism.'),('AUT000000012',NULL,'Roy, Arundhati','Indian author and political activist, winner of the Booker Prize for The God of Small Things.'),('AUT000000013',NULL,'Murakami, Haruki','Japanese novelist, best known for Kafka on the Shore and Norwegian Wood.'),('AUT000000014',NULL,'Coelho, Paulo','Brazilian lyricist and novelist, best known for The Alchemist.'),('AUT000000015',NULL,'Austen, Jane','English novelist known for her six major novels like Pride and Prejudice.'),('AUT000000016',NULL,'Dostoevsky, Fyodor','Russian novelist, philosopher, and journalist, famous for Crime and Punishment.'),('AUT000000017',NULL,'Lee, Harper','American novelist widely known for To Kill a Mockingbird.'),('AUT000000018',NULL,'Salinger, J.D.','American writer best known for his novel The Catcher in the Rye.'),('AUT000000019',NULL,'Márquez, Gabriel García','Colombian novelist and Nobel laureate, known for One Hundred Years of Solitude.'),('AUT000000020',NULL,'Hosseini, Khaled','Afghan-American novelist and physician, famous for The Kite Runner.'),('AUT000000021',NULL,'Bachchan, Harivansh Rai','Indian poet noted for his early work Madhushala.');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `Book_ID` varchar(12) NOT NULL,
  `Accession_No` varchar(20) DEFAULT NULL,
  `Title` varchar(100) NOT NULL,
  `ISBN_No` varchar(20) DEFAULT NULL,
  `ISSN_No` varchar(20) DEFAULT NULL,
  `Publication_Year` char(4) DEFAULT NULL,
  `Cover_Image` varchar(255) DEFAULT NULL,
  `No_of_Pages` int NOT NULL,
  `Book_Summary` text,
  `Language` varchar(50) NOT NULL,
  `Series_ID` varchar(12) DEFAULT NULL,
  `Publisher_ID` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`Book_ID`),
  KEY `Series_ID` (`Series_ID`),
  KEY `Publisher_ID` (`Publisher_ID`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`Series_ID`) REFERENCES `series` (`Series_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `book_ibfk_2` FOREIGN KEY (`Publisher_ID`) REFERENCES `publisher` (`Publisher_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `book_chk_1` CHECK ((`No_of_Pages` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES ('B00000000001','1960004TOLT.000','The Fellowship of the Ring','9780261102354',NULL,'1954',NULL,423,'First of The Lord of the Rings trilogy.','English','SER000000003','PUB000000003'),('B00000000002','1954001TOLT.003','The Two Towers','9780261102361',NULL,'1954',NULL,352,'Second of The Lord of the Rings trilogy.','English','SER000000003','PUB000000003'),('B00000000003','1955001TOLT.003','The Return of the King','9780261102378',NULL,'1955',NULL,416,'Conclusion of The Lord of the Rings.','English','SER000000003','PUB000000003'),('B00000000004','1997001ROWH.002','Harry Potter and the Philosopher\'s Stone','9780747532743',NULL,'1997',NULL,223,'First novel in the Harry Potter series.','English','SER000000002','PUB000000002'),('B00000000005','1998001ROWH.002','Harry Potter and the Chamber of Secrets','9780747538486',NULL,'1998',NULL,251,'Second novel in the Harry Potter series.','English','SER000000002','PUB000000002'),('B00000000006','1999001ROWH.002','Harry Potter and the Prisoner of Azkaban','9780747542155',NULL,'1999',NULL,317,'Third novel in the Harry Potter series.','English','SER000000002','PUB000000002'),('B00000000007','2000001ROWH.002','Harry Potter and the Goblet of Fire','9780747546245',NULL,'2000',NULL,636,'Fourth novel in the Harry Potter series.','English','SER000000002','PUB000000002'),('B00000000008','1949003ORW1.000','1984','9780451524935',NULL,'1949',NULL,328,'A dystopian social science fiction novel.','English',NULL,'PUB000000003'),('B00000000009','1945019ORWA.000','Animal Farm','9780451526342',NULL,'1945',NULL,112,'Allegorical novella reflecting events leading up to the Russian Revolution.','English',NULL,'PUB000000003'),('B00000000010','1932002HUXB.000','Brave New World','9780060850524',NULL,'1932',NULL,268,'Dystopian novel set in futuristic World State.','English',NULL,'PUB000000004'),('B00000000011','1818004SHEF.000','Frankenstein','9780141439471',NULL,'1818',NULL,280,'Gothic novel about Victor Frankenstein creating life.','English',NULL,'PUB000000005'),('B00000000012','1936006PREG.000','Godaan','9788170285985',NULL,'1936',NULL,318,'The story of a poor peasant and the social injustices in rural India.','Hindi',NULL,'PUB000000006'),('B00000000013','1932006PREK.000','Karmabhoomi','9788170285992',NULL,'1932',NULL,312,'Premchand\'s novel about nationalism and non-violent resistance.','Hindi',NULL,'PUB000000006'),('B00000000014','1928006PREN.000','Nirmala',NULL,NULL,'1928',NULL,301,'A powerful critique of dowry system in India.','Hindi',NULL,'PUB000000006'),('B00000000015','1910011TAGG.000','Gitanjali','9780143418993',NULL,'1910',NULL,104,'Collection of poems by Rabindranath Tagore.','Hindi',NULL,'PUB000000007'),('B00000000016','1892019TAGK.000','Kabuliwala',NULL,NULL,'1892',NULL,32,'Short story about a Pashtun merchant.','Hindi',NULL,'PUB000000007'),('B00000000017','1894010KIPT.000','The Jungle Book','9781503332547',NULL,'1894',NULL,320,'Stories of a boy raised by wolves in Indian jungle.','English',NULL,'PUB000000008'),('B00000000018','1864002VERJ.000','Journey to the Center of the Earth','9780451532152',NULL,'1864',NULL,183,'Science fiction novel about subterranean adventure.','English',NULL,'PUB000000008'),('B00000000019','1943019NARM.000','Malgudi Days','9788185986178',NULL,'1943',NULL,247,'Short stories set in the fictional town of Malgudi.','English',NULL,'PUB000000008'),('B00000000020','1935010NARS.000','Swami and Friends','9788185986109',NULL,'1935',NULL,259,'Coming of age story set in Malgudi.','English',NULL,'PUB000000008'),('B00000000021','1981004RUSM.000','Midnight\'s Children','9780099578512',NULL,'1981',NULL,647,'Novel of India\'s transition from British colonialism to independence.','English',NULL,'PUB000000001'),('B00000000022','1997004ROYT.000','The God of Small Things','9780812979657',NULL,'1997',NULL,340,'Story of fraternal twins in Kerala, India.','English',NULL,'PUB000000002'),('B00000000023','2002012MURK.000','Kafka on the Shore','9781400079278',NULL,'2002',NULL,505,'Complex, metaphysical novel.','English',NULL,'PUB000000003'),('B00000000024','1987013MURN.000','Norwegian Wood','9780375704024',NULL,'1987',NULL,296,'Romantic coming-of-age story.','English',NULL,'PUB000000003'),('B00000000025','1988017COET.000','The Alchemist','9780061122415',NULL,'1988',NULL,208,'A shepherd\'s journey to the pyramids of Egypt.','English',NULL,'PUB000000001'),('B00000000026','1998016COEV.000','Veronika Decides to Die','9780061124266',NULL,'1998',NULL,224,'A young woman explores life after a failed suicide attempt.','English',NULL,'PUB000000001'),('B00000000027','1813013AUSP.000','Pride and Prejudice','9780141439518',NULL,'1813',NULL,279,'A romantic novel of manners.','English',NULL,'PUB000000002'),('B00000000028','1811013AUSS.000','Sense and Sensibility','9780141439662',NULL,'1811',NULL,409,'Tale of two sisters navigating love and heartbreak.','English',NULL,'PUB000000002'),('B00000000029','1866004DOSC.000','Crime and Punishment','9780140449136',NULL,'1866',NULL,671,'Psychological drama of guilt and redemption.','English',NULL,'PUB000000003'),('B00000000030','1880004DOST.000','The Brothers Karamazov','9780374528379',NULL,'1880',NULL,796,'Philosophical novel about faith, doubt, and reason.','English',NULL,'PUB000000003'),('B00000000031','1960004LEET.000','To Kill a Mockingbird','9780061120084',NULL,'1960',NULL,336,'Story of racial injustice in the Deep South.','English',NULL,'PUB000000004'),('B00000000032','2015004LEEG.000','Go Set a Watchman','9780062409850',NULL,'2015',NULL,278,'Prequel/sequel to To Kill a Mockingbird.','English',NULL,'PUB000000004'),('B00000000033','1951004SALT.000','The Catcher in the Rye','9780316769488',NULL,'1951',NULL,277,'Story of teenage angst and alienation.','English',NULL,'PUB000000005'),('B00000000034','1967004MÁRO.000','One Hundred Years of Solitude','9780060883280',NULL,'1967',NULL,417,'Epic tale of the Buendía family.','English',NULL,'PUB000000006'),('B00000000035','1985004MÁRL.000','Love in the Time of Cholera','9780307389732',NULL,'1985',NULL,368,'Romantic story set in Colombia.','English',NULL,'PUB000000006'),('B00000000036','2003004HOST.000','The Kite Runner','9781594631931',NULL,'2003',NULL,371,'Friendship and betrayal in Afghanistan.','English',NULL,'PUB000000007'),('B00000000037','2007004HOSA.000','A Thousand Splendid Suns','9781594483851',NULL,'2007',NULL,384,'Story of two women in Afghanistan.','English',NULL,'PUB000000007'),('B00000000038','1924006PRES.000','Shatranj ke Khiladi',NULL,NULL,'1924',NULL,45,'Short story about two chess-obsessed noblemen.','Hindi',NULL,'PUB000000006'),('B00000000039','1919011PRES.000','Sevasadan',NULL,NULL,'1919',NULL,102,'Social novel criticizing the exploitation of women.','Hindi',NULL,'PUB000000006'),('B00000000040','1935BACM.000','Madhushala','9788170286050',NULL,'1935',NULL,133,'Poetry collection by Harivansh Rai Bachchan.','Hindi',NULL,'PUB000000007');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_to_author`
--

DROP TABLE IF EXISTS `book_to_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_to_author` (
  `Author_ID` varchar(12) NOT NULL,
  `Book_ID` varchar(12) NOT NULL,
  PRIMARY KEY (`Author_ID`,`Book_ID`),
  KEY `Book_ID` (`Book_ID`),
  CONSTRAINT `book_to_author_ibfk_1` FOREIGN KEY (`Author_ID`) REFERENCES `author` (`Author_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_to_author_ibfk_2` FOREIGN KEY (`Book_ID`) REFERENCES `book` (`Book_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_to_author`
--

LOCK TABLES `book_to_author` WRITE;
/*!40000 ALTER TABLE `book_to_author` DISABLE KEYS */;
INSERT INTO `book_to_author` VALUES ('AUT000000001','B00000000001'),('AUT000000001','B00000000002'),('AUT000000001','B00000000003'),('AUT000000002','B00000000004'),('AUT000000002','B00000000005'),('AUT000000002','B00000000006'),('AUT000000002','B00000000007'),('AUT000000003','B00000000008'),('AUT000000003','B00000000009'),('AUT000000004','B00000000010'),('AUT000000005','B00000000011'),('AUT000000006','B00000000012'),('AUT000000006','B00000000013'),('AUT000000006','B00000000014'),('AUT000000007','B00000000015'),('AUT000000007','B00000000016'),('AUT000000008','B00000000017'),('AUT000000009','B00000000018'),('AUT000000010','B00000000019'),('AUT000000010','B00000000020'),('AUT000000011','B00000000021'),('AUT000000012','B00000000022'),('AUT000000013','B00000000023'),('AUT000000013','B00000000024'),('AUT000000014','B00000000025'),('AUT000000014','B00000000026'),('AUT000000015','B00000000027'),('AUT000000015','B00000000028'),('AUT000000016','B00000000029'),('AUT000000016','B00000000030'),('AUT000000017','B00000000031'),('AUT000000017','B00000000032'),('AUT000000018','B00000000033'),('AUT000000019','B00000000034'),('AUT000000019','B00000000035'),('AUT000000020','B00000000036'),('AUT000000020','B00000000037'),('AUT000000006','B00000000038'),('AUT000000006','B00000000039'),('AUT000000021','B00000000040');
/*!40000 ALTER TABLE `book_to_author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_to_category`
--

DROP TABLE IF EXISTS `book_to_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_to_category` (
  `Category_ID` varchar(12) NOT NULL,
  `Book_ID` varchar(12) NOT NULL,
  PRIMARY KEY (`Category_ID`,`Book_ID`),
  KEY `Book_ID` (`Book_ID`),
  CONSTRAINT `book_to_category_ibfk_1` FOREIGN KEY (`Category_ID`) REFERENCES `category` (`Category_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_to_category_ibfk_2` FOREIGN KEY (`Book_ID`) REFERENCES `book` (`Book_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_to_category`
--

LOCK TABLES `book_to_category` WRITE;
/*!40000 ALTER TABLE `book_to_category` DISABLE KEYS */;
INSERT INTO `book_to_category` VALUES ('CAT000000001','B00000000001'),('CAT000000001','B00000000002'),('CAT000000001','B00000000003'),('CAT000000001','B00000000004'),('CAT000000001','B00000000005'),('CAT000000001','B00000000006'),('CAT000000001','B00000000007'),('CAT000000003','B00000000008'),('CAT000000019','B00000000009'),('CAT000000002','B00000000010'),('CAT000000004','B00000000011'),('CAT000000006','B00000000012'),('CAT000000006','B00000000013'),('CAT000000006','B00000000014'),('CAT000000011','B00000000015'),('CAT000000019','B00000000016'),('CAT000000010','B00000000017'),('CAT000000002','B00000000018'),('CAT000000019','B00000000019'),('CAT000000010','B00000000020'),('CAT000000004','B00000000021'),('CAT000000004','B00000000022'),('CAT000000012','B00000000023'),('CAT000000013','B00000000024'),('CAT000000017','B00000000025'),('CAT000000016','B00000000026'),('CAT000000013','B00000000027'),('CAT000000013','B00000000028'),('CAT000000004','B00000000029'),('CAT000000004','B00000000030'),('CAT000000004','B00000000031'),('CAT000000004','B00000000032'),('CAT000000004','B00000000033'),('CAT000000004','B00000000034'),('CAT000000004','B00000000035'),('CAT000000004','B00000000036'),('CAT000000004','B00000000037'),('CAT000000006','B00000000038'),('CAT000000006','B00000000039'),('CAT000000011','B00000000039');
/*!40000 ALTER TABLE `book_to_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmarks` (
  `Bookmarks_ID` varchar(12) NOT NULL,
  `Bookmark_Note` text,
  `Page_Number` int NOT NULL,
  `Bookmark_Date` date NOT NULL,
  `User_ID` varchar(12) DEFAULT NULL,
  `Book_ID` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`Bookmarks_ID`),
  KEY `User_ID` (`User_ID`),
  KEY `Book_ID` (`Book_ID`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`Book_ID`) REFERENCES `book` (`Book_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarks_chk_1` CHECK ((`Page_Number` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
INSERT INTO `bookmarks` VALUES ('BOO000000001','Loved this quote about perseverance.',45,'2025-04-12','USE000000013','B00000000011'),('BOO000000002','Key turning point of the story.',120,'2025-04-13','USE000000014','B00000000012'),('BOO000000003','Interesting fact about the main character.',78,'2025-04-13','USE000000015','B00000000013'),('BOO000000004','Chapter that confused me a bit.',32,'2025-04-14','USE000000016','B00000000014'),('BOO000000005','Really emotional moment.',203,'2025-04-14','USE000000017','B00000000015'),('BOO000000006','Lovely description of nature.',55,'2025-04-15','USE000000018','B00000000016'),('BOO000000007','A major revelation happens here.',150,'2025-04-15','USE000000019','B00000000017'),('BOO000000008','Funny interaction between characters.',88,'2025-04-16','USE000000020','B00000000018'),('BOO000000009','Life advice worth noting.',210,'2025-04-16','USE000000021','B00000000019'),('BOO000000010','Motivational quote.',23,'2025-04-17','USE000000022','B00000000020'),('BOO000000011','This twist changed everything!',67,'2025-04-17','USE000000023','B00000000021'),('BOO000000012','Foreshadowing of the climax.',98,'2025-04-18','USE000000024','B00000000022'),('BOO000000013','Nice philosophical discussion.',142,'2025-04-18','USE000000025','B00000000023'),('BOO000000014','Loved the setting described here.',34,'2025-04-19','USE000000003','B00000000002'),('BOO000000015','Character’s backstory explained.',115,'2025-04-20','USE000000004','B00000000003'),('BOO000000016','Plot hole? Need to think.',90,'2025-04-20','USE000000006','B00000000005'),('BOO000000017','Insightful monologue.',56,'2025-04-21','USE000000008','B00000000007'),('BOO000000018','Poetic ending.',300,'2025-04-22','USE000000010','B00000000009'),('BOO000000019','First hint about the villain.',45,'2025-04-12','USE000000013','B00000000011'),('BOO000000020','Villain’s plan revealed.',220,'2025-04-15','USE000000013','B00000000011'),('BOO000000021','Initial philosophy mentioned.',30,'2025-04-13','USE000000014','B00000000012'),('BOO000000022','Deep discussion on morality.',130,'2025-04-17','USE000000014','B00000000012'),('BOO000000023','Beautiful metaphor.',77,'2025-04-14','USE000000016','B00000000014'),('BOO000000024','Emotional confrontation.',190,'2025-04-18','USE000000016','B00000000014'),('BOO000000025','Unexpected character development.',155,'2025-04-15','USE000000019','B00000000017'),('BOO000000026','Touching family scene.',178,'2025-04-19','USE000000019','B00000000017'),('BOO000000027','Mystery deepens.',87,'2025-04-16','USE000000020','B00000000018'),('BOO000000028','Shocking twist!',200,'2025-04-20','USE000000020','B00000000018'),('BOO000000029','Motivational story.',22,'2025-04-17','USE000000022','B00000000020'),('BOO000000030','Lessons learned.',208,'2025-04-21','USE000000022','B00000000020');
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `Category_ID` varchar(12) NOT NULL,
  `Category_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Category_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('CAT000000001','Fantasy'),('CAT000000002','Science Fiction'),('CAT000000003','Dystopian'),('CAT000000004','Historical Fiction'),('CAT000000005','Classic Literature'),('CAT000000006','Hindi Literature'),('CAT000000007','Mythology'),('CAT000000008','Mystery'),('CAT000000009','Adventure'),('CAT000000010','Children\'s Literature'),('CAT000000011','Poetry'),('CAT000000012','Philosophy'),('CAT000000013','Romance'),('CAT000000014','Horror'),('CAT000000015','Biography'),('CAT000000016','Self Help'),('CAT000000017','Spiritual'),('CAT000000018','Drama'),('CAT000000019','Short Stories'),('CAT000000020','Satire');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamification`
--

DROP TABLE IF EXISTS `gamification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamification` (
  `Gamification_ID` varchar(12) NOT NULL,
  `Badge_Name` varchar(100) NOT NULL,
  `Streak` int DEFAULT '0',
  `Leaderboard_Rank` int DEFAULT NULL,
  `Last_Activity_Date` date DEFAULT NULL,
  `Points_Earned` int DEFAULT '0',
  `User_ID` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`Gamification_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `gamification_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gamification_chk_1` CHECK ((`Streak` >= 0)),
  CONSTRAINT `gamification_chk_2` CHECK ((`Leaderboard_Rank` >= 0)),
  CONSTRAINT `gamification_chk_3` CHECK ((`Points_Earned` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamification`
--

LOCK TABLES `gamification` WRITE;
/*!40000 ALTER TABLE `gamification` DISABLE KEYS */;
INSERT INTO `gamification` VALUES ('GAM000000001','Bookworm',12,5,'2025-04-26',410,'USE000000001'),('GAM000000002','Top Reviewer',15,3,'2025-04-27',580,'USE000000002'),('GAM000000003','Literary Explorer',5,10,'2025-04-24',280,'USE000000003'),('GAM000000004','Bookworm',7,12,'2025-04-25',320,'USE000000004'),('GAM000000005','Speed Reader',21,2,'2025-04-27',720,'USE000000005'),('GAM000000006','Bookworm',4,15,'2025-04-20',190,'USE000000006'),('GAM000000007','Streak Master',25,1,'2025-04-27',880,'USE000000007'),('GAM000000008','Literary Explorer',8,9,'2025-04-23',340,'USE000000008'),('GAM000000009','Bookworm',6,11,'2025-04-22',270,'USE000000009'),('GAM000000010','Top Reviewer',18,4,'2025-04-26',600,'USE000000010'),('GAM000000011','Bookworm',5,14,'2025-04-25',250,'USE000000011'),('GAM000000012','Speed Reader',20,6,'2025-04-27',700,'USE000000012'),('GAM000000013','Literary Explorer',7,13,'2025-04-21',310,'USE000000013'),('GAM000000014','Bookworm',3,17,'2025-04-20',150,'USE000000014'),('GAM000000015','Bookworm',2,19,'2025-04-19',130,'USE000000015'),('GAM000000016','Top Reviewer',10,7,'2025-04-25',450,'USE000000016'),('GAM000000017','Streak Master',22,2,'2025-04-27',810,'USE000000017'),('GAM000000018','Bookworm',6,16,'2025-04-24',240,'USE000000018'),('GAM000000019','Literary Explorer',8,10,'2025-04-23',370,'USE000000019'),('GAM000000020','Bookworm',5,18,'2025-04-22',200,'USE000000020');
/*!40000 ALTER TABLE `gamification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `User_ID` varchar(12) NOT NULL,
  `Book_ID` varchar(12) NOT NULL,
  PRIMARY KEY (`User_ID`,`Book_ID`),
  KEY `Book_ID` (`Book_ID`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`Book_ID`) REFERENCES `book` (`Book_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES ('USE000000001','B00000000001'),('USE000000023','B00000000001'),('USE000000031','B00000000001'),('USE000000041','B00000000001'),('USE000000001','B00000000002'),('USE000000024','B00000000002'),('USE000000031','B00000000002'),('USE000000041','B00000000002'),('USE000000002','B00000000003'),('USE000000025','B00000000003'),('USE000000032','B00000000003'),('USE000000002','B00000000004'),('USE000000026','B00000000004'),('USE000000032','B00000000004'),('USE000000003','B00000000005'),('USE000000027','B00000000005'),('USE000000033','B00000000005'),('USE000000003','B00000000006'),('USE000000028','B00000000006'),('USE000000033','B00000000006'),('USE000000004','B00000000007'),('USE000000029','B00000000007'),('USE000000034','B00000000007'),('USE000000039','B00000000007'),('USE000000004','B00000000008'),('USE000000030','B00000000008'),('USE000000034','B00000000008'),('USE000000005','B00000000009'),('USE000000031','B00000000009'),('USE000000035','B00000000009'),('USE000000005','B00000000010'),('USE000000032','B00000000010'),('USE000000035','B00000000010'),('USE000000006','B00000000011'),('USE000000033','B00000000011'),('USE000000036','B00000000011'),('USE000000006','B00000000012'),('USE000000034','B00000000012'),('USE000000036','B00000000012'),('USE000000007','B00000000013'),('USE000000035','B00000000013'),('USE000000037','B00000000013'),('USE000000007','B00000000014'),('USE000000036','B00000000014'),('USE000000037','B00000000014'),('USE000000008','B00000000015'),('USE000000037','B00000000015'),('USE000000038','B00000000015'),('USE000000008','B00000000016'),('USE000000038','B00000000016'),('USE000000009','B00000000017'),('USE000000039','B00000000017'),('USE000000009','B00000000018'),('USE000000039','B00000000018'),('USE000000001','B00000000019'),('USE000000010','B00000000019'),('USE000000002','B00000000020'),('USE000000010','B00000000020'),('USE000000003','B00000000021'),('USE000000011','B00000000021'),('USE000000004','B00000000022'),('USE000000012','B00000000022'),('USE000000005','B00000000023'),('USE000000013','B00000000023'),('USE000000006','B00000000024'),('USE000000014','B00000000024'),('USE000000007','B00000000025'),('USE000000015','B00000000025'),('USE000000008','B00000000026'),('USE000000016','B00000000026'),('USE000000009','B00000000027'),('USE000000017','B00000000027'),('USE000000010','B00000000028'),('USE000000018','B00000000028'),('USE000000011','B00000000029'),('USE000000019','B00000000029'),('USE000000012','B00000000030'),('USE000000020','B00000000030'),('USE000000013','B00000000031'),('USE000000021','B00000000031'),('USE000000014','B00000000032'),('USE000000022','B00000000032'),('USE000000015','B00000000033'),('USE000000023','B00000000033'),('USE000000016','B00000000034'),('USE000000024','B00000000034'),('USE000000017','B00000000035'),('USE000000025','B00000000035'),('USE000000018','B00000000036'),('USE000000026','B00000000036'),('USE000000019','B00000000037'),('USE000000027','B00000000037'),('USE000000020','B00000000038'),('USE000000028','B00000000038'),('USE000000021','B00000000039'),('USE000000029','B00000000039'),('USE000000022','B00000000040'),('USE000000030','B00000000040');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `Status` enum('seen','not seen') NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Description` text,
  `User_ID` varchar(12) NOT NULL,
  PRIMARY KEY (`User_ID`,`Timestamp`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES ('not seen','2025-04-28 09:02:35','Hello Arjun Reddy, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000001'),('not seen','2025-04-28 09:02:35','Hello Sneha Gupta, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000002'),('not seen','2025-04-28 09:02:35','Hello Ananya Rao, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000003'),('not seen','2025-04-28 09:02:35','Hello Rohan Khanna, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000004'),('not seen','2025-04-28 09:02:35','Hello Sanya Deshmukh, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000005'),('not seen','2025-04-28 09:02:35','Hello Devansh Pillai, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000006'),('not seen','2025-04-28 09:02:35','Hello Tanya Menon, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000007'),('not seen','2025-04-28 09:02:35','Hello Noah Smith, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000008'),('not seen','2025-04-28 09:02:35','Hello Elijah Johnson, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000009'),('not seen','2025-04-28 09:02:35','Hello Isabella Martinez, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000010'),('not seen','2025-04-28 09:02:35','Hello Charlotte White, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000011'),('not seen','2025-04-28 09:02:35','Hello Lucas Harris, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000012'),('not seen','2025-04-28 09:02:35','Hello Evelyn Lewis, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000013'),('not seen','2025-04-28 09:02:35','Hello Niklas Müller, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000014'),('not seen','2025-04-28 09:02:35','Hello Daniela Silva, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000015'),('not seen','2025-04-28 09:02:35','Hello Emil Sørensen, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000016'),('not seen','2025-04-28 09:02:35','Hello Rajat Kapoor, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000017'),('not seen','2025-04-28 09:02:35','Hello Anjali Sharma, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000018'),('not seen','2025-04-28 09:02:35','Hello Isha Jain, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000019'),('not seen','2025-04-28 09:02:35','Hello Mason Miller, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000020'),('not seen','2025-04-28 09:02:35','Hello Shruti Menon, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000021'),('not seen','2025-04-28 09:02:35','Hello Rohit Seth, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000022'),('not seen','2025-04-28 09:02:35','Hello Kunal Bansal, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000023'),('not seen','2025-04-28 09:02:35','Hello Jacob Robinson, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000024'),('not seen','2025-04-28 09:02:35','Hello Lily Young, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000025'),('not seen','2025-04-28 09:02:35','Hello Alexander Adams, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000026'),('not seen','2025-04-28 09:02:35','Hello Sofia Gonzalez, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000027'),('not seen','2025-04-28 09:02:35','Hello Ines Fernández, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000028'),('not seen','2025-04-28 09:02:35','Hello Sara Karlsson, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000029'),('not seen','2025-04-28 09:02:35','Hello Henrik Sørensen, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000030'),('not seen','2025-04-28 09:02:35','Hello Ishaan Trivedi, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000031'),('not seen','2025-04-28 09:02:35','Hello Devika Reddy, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000032'),('not seen','2025-04-28 09:02:35','Hello Ira Kulkarni, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000033'),('not seen','2025-04-28 09:02:35','Hello Rahul Sharma, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000034'),('not seen','2025-04-28 09:02:35','Hello Abigail Wright, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000035'),('not seen','2025-04-28 09:02:35','Hello Liam Carter, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000036'),('not seen','2025-04-28 09:02:35','Hello Vikram Patel, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000037'),('not seen','2025-04-28 09:02:35','Hello Karan Malhotra, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000038'),('not seen','2025-04-28 09:02:35','Hello Nikhil Rao, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000039'),('not seen','2025-04-28 19:05:42','Hello Deepika Mehta, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000040'),('not seen','2025-04-29 02:43:50','Hello Suresh Kumar, Welcome to the platform. Feel free to Explore our Library Seeker.','USE000000041');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offline_content`
--

DROP TABLE IF EXISTS `offline_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offline_content` (
  `User_ID` varchar(12) NOT NULL,
  `Book_ID` varchar(12) NOT NULL,
  `Page_Number` int NOT NULL,
  `Last_Accessed` date DEFAULT NULL,
  `Download_Date` date DEFAULT NULL,
  `Percentage_Read` int DEFAULT '0',
  PRIMARY KEY (`User_ID`,`Book_ID`),
  KEY `Book_ID` (`Book_ID`),
  CONSTRAINT `offline_content_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offline_content_ibfk_2` FOREIGN KEY (`Book_ID`) REFERENCES `book` (`Book_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_accessed_date` CHECK ((`Last_Accessed` >= `Download_Date`)),
  CONSTRAINT `offline_content_chk_1` CHECK ((`Page_Number` > 0)),
  CONSTRAINT `offline_content_chk_2` CHECK ((`Percentage_Read` between 0 and 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offline_content`
--

LOCK TABLES `offline_content` WRITE;
/*!40000 ALTER TABLE `offline_content` DISABLE KEYS */;
INSERT INTO `offline_content` VALUES ('USE000000001','B00000000001',10,'2025-03-02','2025-03-01',2),('USE000000001','B00000000002',15,'2025-03-03','2025-03-01',4),('USE000000001','B00000000003',20,'2025-03-04','2025-03-01',5),('USE000000001','B00000000004',25,'2025-03-05','2025-03-01',11),('USE000000002','B00000000005',30,'2025-03-06','2025-03-04',12),('USE000000002','B00000000006',35,'2025-03-07','2025-03-04',11),('USE000000002','B00000000007',40,'2025-03-08','2025-03-04',6),('USE000000003','B00000000002',34,'2025-04-19','2025-04-18',10),('USE000000003','B00000000008',45,'2025-03-09','2025-03-08',14),('USE000000003','B00000000009',50,'2025-03-10','2025-03-08',45),('USE000000003','B00000000010',55,'2025-03-11','2025-03-08',21),('USE000000004','B00000000003',115,'2025-04-20','2025-04-19',28),('USE000000004','B00000000011',60,'2025-03-12','2025-03-10',21),('USE000000004','B00000000012',65,'2025-03-13','2025-03-10',20),('USE000000004','B00000000013',70,'2025-03-14','2025-03-10',22),('USE000000005','B00000000014',75,'2025-03-15','2025-03-13',25),('USE000000005','B00000000015',80,'2025-03-16','2025-03-13',77),('USE000000006','B00000000005',90,'2025-04-20','2025-04-19',36),('USE000000006','B00000000016',85,'2025-03-17','2025-03-15',100),('USE000000006','B00000000017',90,'2025-03-18','2025-03-15',28),('USE000000006','B00000000018',95,'2025-03-19','2025-03-15',52),('USE000000007','B00000000019',20,'2025-03-20','2025-03-18',8),('USE000000007','B00000000020',25,'2025-03-21','2025-03-18',10),('USE000000008','B00000000007',56,'2025-04-21','2025-04-20',9),('USE000000008','B00000000021',30,'2025-03-22','2025-03-20',5),('USE000000008','B00000000022',35,'2025-03-23','2025-03-20',10),('USE000000009','B00000000023',40,'2025-03-24','2025-03-22',8),('USE000000009','B00000000024',45,'2025-03-25','2025-03-22',15),('USE000000010','B00000000009',300,'2025-04-22','2025-04-21',100),('USE000000010','B00000000025',50,'2025-03-26','2025-03-24',24),('USE000000010','B00000000026',55,'2025-03-27','2025-03-24',25),('USE000000010','B00000000027',60,'2025-03-28','2025-03-24',22),('USE000000011','B00000000028',65,'2025-03-29','2025-03-26',16),('USE000000011','B00000000029',70,'2025-03-30','2025-03-26',10),('USE000000012','B00000000030',75,'2025-03-31','2025-03-28',9),('USE000000012','B00000000031',80,'2025-04-01','2025-03-28',24),('USE000000013','B00000000011',45,'2025-04-12','2025-04-11',16),('USE000000013','B00000000032',85,'2025-04-02','2025-03-30',31),('USE000000013','B00000000033',90,'2025-04-03','2025-03-30',32),('USE000000014','B00000000012',120,'2025-04-13','2025-04-12',38),('USE000000014','B00000000034',95,'2025-04-04','2025-04-01',23),('USE000000014','B00000000035',15,'2025-04-05','2025-04-01',4),('USE000000015','B00000000013',78,'2025-04-13','2025-04-12',25),('USE000000015','B00000000036',20,'2025-04-06','2025-04-03',5),('USE000000015','B00000000037',25,'2025-04-07','2025-04-03',7),('USE000000016','B00000000014',32,'2025-04-14','2025-04-13',11),('USE000000016','B00000000038',30,'2025-04-08','2025-04-05',67),('USE000000016','B00000000039',35,'2025-04-09','2025-04-05',34),('USE000000017','B00000000015',203,'2025-04-14','2025-04-13',100),('USE000000018','B00000000016',55,'2025-04-15','2025-04-14',100),('USE000000019','B00000000017',150,'2025-04-15','2025-04-14',47),('USE000000020','B00000000018',88,'2025-04-16','2025-04-15',48),('USE000000021','B00000000019',210,'2025-04-16','2025-04-15',85),('USE000000022','B00000000020',23,'2025-04-17','2025-04-16',9),('USE000000023','B00000000021',67,'2025-04-17','2025-04-16',10),('USE000000024','B00000000022',98,'2025-04-18','2025-04-17',29),('USE000000025','B00000000023',142,'2025-04-18','2025-04-17',28);
/*!40000 ALTER TABLE `offline_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `Publisher_ID` varchar(12) NOT NULL,
  `Publisher_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Publisher_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES ('PUB000000001','Penguin Random House'),('PUB000000002','HarperCollins'),('PUB000000003','Bloomsbury Publishing'),('PUB000000004','Rajkamal Prakashan'),('PUB000000005','Vani Prakashan'),('PUB000000006','Simon & Schuster'),('PUB000000007','Scholastic Corporation'),('PUB000000008','Macmillan Publishers');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `User_ID` varchar(12) NOT NULL,
  `Book_ID` varchar(12) NOT NULL,
  `Review_Text` text NOT NULL,
  `Review_Date` date NOT NULL,
  `Rating` int NOT NULL,
  PRIMARY KEY (`User_ID`,`Book_ID`),
  KEY `Book_ID` (`Book_ID`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`Book_ID`) REFERENCES `book` (`Book_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`Rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES ('USE000000003','B00000000002','A fun read, kept me entertained throughout.','2025-04-19',4),('USE000000004','B00000000003','Cleverly crafted plot with witty dialogues.','2025-04-20',5),('USE000000006','B00000000005','Not as good as the hype suggested.','2025-04-20',3),('USE000000008','B00000000007','Loved the ending! Very satisfying.','2025-04-21',5),('USE000000010','B00000000009','The plot twist blew my mind. Amazing!','2025-04-22',5),('USE000000013','B00000000011','Beautifully written, really enjoyed the narrative style.','2025-04-11',5),('USE000000014','B00000000012','The storyline felt repetitive and boring.','2025-04-12',2),('USE000000015','B00000000013','A timeless classic. It deserves all the praise.','2025-04-12',5),('USE000000016','B00000000014','Interesting concept but poor execution.','2025-04-13',3),('USE000000017','B00000000015','Loved the depth of characters and world-building.','2025-04-13',5),('USE000000018','B00000000016','Not my type of book, struggled to finish.','2025-04-14',2),('USE000000019','B00000000017','Couldn’t put it down! A thrilling masterpiece.','2025-04-14',5),('USE000000020','B00000000018','A decent book but not memorable.','2025-04-15',3),('USE000000021','B00000000019','Incredible writing. Every page was a delight.','2025-04-16',5),('USE000000022','B00000000020','Confusing at times, needed more clarity.','2025-04-17',2),('USE000000023','B00000000021','A satisfying story arc and rich characters.','2025-04-17',4),('USE000000024','B00000000022','Found some parts unnecessarily dragged out.','2025-04-18',3),('USE000000025','B00000000023','A heartwarming story. Highly recommend.','2025-04-18',5);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series` (
  `Series_ID` varchar(12) NOT NULL,
  `Series_Description` text,
  `Series_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Series_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series`
--

LOCK TABLES `series` WRITE;
/*!40000 ALTER TABLE `series` DISABLE KEYS */;
INSERT INTO `series` VALUES ('SER000000001','A series of fantasy novels written by J.K. Rowling.','Harry Potter'),('SER000000002','Epic fantasy novels by George R. R. Martin.','A Song of Ice and Fire'),('SER000000003','High fantasy novels written by J.R.R. Tolkien.','Lord of the Rings'),('SER000000004','Dystopian novels by Suzanne Collins.','Hunger Games'),('SER000000005','A modern retelling of the Ramayana epic.','Ramayana Series'),('SER000000006','Collection of works by Munshi Premchand.','Premchand Classics'),('SER000000007','Anthology of Hindi poems.','Hindi Kavita Sangrah'),('SER000000008','Detective stories by Arthur Conan Doyle.','Sherlock Holmes'),('SER000000009','Greek mythology-themed fantasy novels by Rick Riordan.','Percy Jackson');
/*!40000 ALTER TABLE `series` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `Transaction_ID` varchar(12) NOT NULL,
  `User_ID` varchar(12) NOT NULL,
  `Amount_Paid` decimal(10,2) NOT NULL,
  `Payment_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Payment_Method` varchar(50) NOT NULL,
  PRIMARY KEY (`Transaction_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transaction_chk_1` CHECK ((`Amount_Paid` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES ('TRA000000001','USE000000001',600.00,'2025-04-15 18:30:00','UPI'),('TRA000000002','USE000000002',600.00,'2025-04-17 18:30:00','Debit Card'),('TRA000000003','USE000000003',600.00,'2025-04-19 18:30:00','Credit Card'),('TRA000000004','USE000000004',600.00,'2025-04-18 18:30:00','UPI'),('TRA000000005','USE000000005',600.00,'2025-04-20 18:30:00','Credit Card'),('TRA000000006','USE000000006',600.00,'2025-04-23 18:30:00','Debit Card'),('TRA000000007','USE000000007',600.00,'2025-04-16 18:30:00','UPI'),('TRA000000008','USE000000008',600.00,'2025-04-18 18:30:00','Debit Card'),('TRA000000009','USE000000009',600.00,'2025-04-19 18:30:00','Credit Card'),('TRA000000010','USE000000010',600.00,'2025-04-21 18:30:00','UPI'),('TRA000000011','USE000000011',600.00,'2025-04-22 18:30:00','Debit Card'),('TRA000000012','USE000000012',600.00,'2025-04-23 18:30:00','UPI'),('TRA000000013','USE000000013',600.00,'2025-04-18 18:30:00','Credit Card'),('TRA000000014','USE000000014',600.00,'2025-04-20 18:30:00','UPI'),('TRA000000015','USE000000015',600.00,'2025-04-24 18:30:00','Debit Card'),('TRA000000016','USE000000016',600.00,'2025-04-16 18:30:00','Credit Card'),('TRA000000017','USE000000017',600.00,'2025-04-17 18:30:00','Debit Card'),('TRA000000018','USE000000018',600.00,'2025-04-21 18:30:00','UPI'),('TRA000000019','USE000000019',600.00,'2025-04-22 18:30:00','Credit Card'),('TRA000000020','USE000000020',600.00,'2025-04-23 18:30:00','UPI'),('TRA000000021','USE000000021',600.00,'2025-04-17 18:30:00','Credit Card'),('TRA000000022','USE000000022',600.00,'2025-04-19 18:30:00','Debit Card'),('TRA000000023','USE000000023',600.00,'2025-04-18 18:30:00','UPI'),('TRA000000024','USE000000024',600.00,'2025-04-22 18:30:00','Credit Card'),('TRA000000025','USE000000025',600.00,'2025-04-23 18:30:00','Debit Card'),('TRA000000026','USE000000026',600.00,'2025-04-24 18:30:00','UPI'),('TRA000000027','USE000000027',600.00,'2025-04-25 18:30:00','Credit Card'),('TRA000000028','USE000000028',600.00,'2025-04-23 18:30:00','UPI'),('TRA000000029','USE000000029',600.00,'2025-04-26 18:30:00','Debit Card'),('TRA000000030','USE000000030',600.00,'2025-04-24 18:30:00','UPI'),('TRA000000031','USE000000031',600.00,'2025-04-25 18:30:00','Credit Card'),('TRA000000032','USE000000032',600.00,'2025-04-25 18:30:00','Debit Card'),('TRA000000033','USE000000033',600.00,'2025-04-26 18:30:00','UPI'),('TRA000000034','USE000000034',600.00,'2025-04-26 18:30:00','Debit Card'),('TRA000000035','USE000000035',600.00,'2025-04-26 18:30:00','Credit Card'),('TRA000000036','USE000000036',600.00,'2025-04-26 18:30:00','UPI'),('TRA000000037','USE000000037',600.00,'2025-04-24 18:30:00','Debit Card'),('TRA000000038','USE000000038',600.00,'2025-04-24 18:30:00','Credit Card'),('TRX000000008','USE000000008',999.00,'2025-04-28 19:05:42','Credit Card');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User_ID` varchar(12) NOT NULL,
  `Start_Date` date NOT NULL,
  `Reward_Points` int DEFAULT '0',
  `Accessibility_Settings` json DEFAULT NULL,
  `Visitor_ID` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `Visitor_ID` (`Visitor_ID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Visitor_ID`) REFERENCES `visitor` (`Visitor_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_chk_1` CHECK ((`Reward_Points` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('USE000000001','2025-04-16',100,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000017'),('USE000000002','2025-04-18',0,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"12:1\", \"Text-to-Speech\": \"No\"}','VIS000000004'),('USE000000003','2025-04-20',80,'{\"Bold\": \"4\", \"Font-Size\": \"7\", \"Color-Contrast\": \"5:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000006'),('USE000000004','2025-04-19',10,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000009'),('USE000000005','2025-04-21',60,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000012'),('USE000000006','2025-04-24',30,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000015'),('USE000000007','2025-04-17',50,'{\"Bold\": \"2\", \"Font-Size\": \"4\", \"Color-Contrast\": \"8:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000018'),('USE000000008','2025-04-19',90,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000021'),('USE000000009','2025-04-20',0,'{\"Bold\": \"1\", \"Font-Size\": \"12\", \"Color-Contrast\": \"11:1\", \"Text-to-Speech\": \"No\"}','VIS000000024'),('USE000000010','2025-04-22',80,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000027'),('USE000000011','2025-04-23',80,'{\"Bold\": \"5\", \"Font-Size\": \"6\", \"Color-Contrast\": \"6:1\", \"Text-to-Speech\": \"No\"}','VIS000000030'),('USE000000012','2025-04-24',70,'{\"Bold\": \"1\", \"Font-Size\": \"3\", \"Color-Contrast\": \"9:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000032'),('USE000000013','2025-04-19',90,'{\"Bold\": \"2\", \"Font-Size\": \"1\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000035'),('USE000000014','2025-04-21',60,'{\"Bold\": \"5\", \"Font-Size\": \"11\", \"Color-Contrast\": \"2:1\", \"Text-to-Speech\": \"No\"}','VIS000000038'),('USE000000015','2025-04-25',20,'{\"Bold\": \"3\", \"Font-Size\": \"5\", \"Color-Contrast\": \"8:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000041'),('USE000000016','2025-04-17',50,'{\"Bold\": \"4\", \"Font-Size\": \"8\", \"Color-Contrast\": \"5:1\", \"Text-to-Speech\": \"No\"}','VIS000000044'),('USE000000017','2025-04-18',10,'{\"Bold\": \"1\", \"Font-Size\": \"7\", \"Color-Contrast\": \"10:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000047'),('USE000000018','2025-04-22',70,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000050'),('USE000000019','2025-04-23',80,'{\"Bold\": \"4\", \"Font-Size\": \"9\", \"Color-Contrast\": \"3:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000052'),('USE000000020','2025-04-24',40,'{\"Bold\": \"5\", \"Font-Size\": \"10\", \"Color-Contrast\": \"4:1\", \"Text-to-Speech\": \"No\"}','VIS000000055'),('USE000000021','2025-04-18',10,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000058'),('USE000000022','2025-04-20',50,'{\"Bold\": \"2\", \"Font-Size\": \"12\", \"Color-Contrast\": \"6:1\", \"Text-to-Speech\": \"No\"}','VIS000000061'),('USE000000023','2025-04-19',40,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000063'),('USE000000024','2025-04-23',60,'{\"Bold\": \"1\", \"Font-Size\": \"5\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000066'),('USE000000025','2025-04-24',30,'{\"Bold\": \"3\", \"Font-Size\": \"7\", \"Color-Contrast\": \"8:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000069'),('USE000000026','2025-04-25',19,'{\"Bold\": \"4\", \"Font-Size\": \"2\", \"Color-Contrast\": \"9:1\", \"Text-to-Speech\": \"No\"}','VIS000000072'),('USE000000027','2025-04-26',30,'{\"Bold\": \"5\", \"Font-Size\": \"4\", \"Color-Contrast\": \"10:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000075'),('USE000000028','2025-04-24',70,'{\"Bold\": \"2\", \"Font-Size\": \"11\", \"Color-Contrast\": \"11:1\", \"Text-to-Speech\": \"No\"}','VIS000000078'),('USE000000029','2025-04-27',13,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000081'),('USE000000030','2025-04-25',30,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000084'),('USE000000031','2025-04-26',40,'{\"Bold\": \"3\", \"Font-Size\": \"9\", \"Color-Contrast\": \"4:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000087'),('USE000000032','2025-04-26',9,'{\"Bold\": \"2\", \"Font-Size\": \"5\", \"Color-Contrast\": \"2:1\", \"Text-to-Speech\": \"No\"}','VIS000000090'),('USE000000033','2025-04-27',2,'{\"Bold\": \"4\", \"Font-Size\": \"10\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000093'),('USE000000034','2025-04-27',17,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000001'),('USE000000035','2025-04-27',24,'{\"Bold\": \"1\", \"Font-Size\": \"3\", \"Color-Contrast\": \"9:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000073'),('USE000000036','2025-04-27',21,'{\"Bold\": \"2\", \"Font-Size\": \"6\", \"Color-Contrast\": \"5:1\", \"Text-to-Speech\": \"No\"}','VIS000000010'),('USE000000037','2025-04-25',40,'{\"Bold\": \"4\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"Yes\"}','VIS000000005'),('USE000000038','2025-04-25',90,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000007'),('USE000000039','2025-04-25',90,'{\"Bold\": \"2\", \"Font-Size\": \"8\", \"Color-Contrast\": \"7:1\", \"Text-to-Speech\": \"No\"}','VIS000000057'),('USE000000040','2025-04-25',0,NULL,'VIS000000008'),('USE000000041','2025-04-25',0,'{\"Bold\": \"3\", \"Font-Size\": \"8\", \"Color-Contrast\": \"13:1\", \"Text-to-Speech\": \"No\"}','VIS000000096');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor`
--

DROP TABLE IF EXISTS `visitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitor` (
  `Visitor_ID` varchar(12) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Registration_Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Password` varchar(100) NOT NULL,
  `Avatar` varchar(255) DEFAULT NULL,
  `Country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Visitor_ID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor`
--

LOCK TABLES `visitor` WRITE;
/*!40000 ALTER TABLE `visitor` DISABLE KEYS */;
INSERT INTO `visitor` VALUES ('VIS000000001','Rahul Sharma','rahul.sharma@example.com','2025-04-15','a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea',NULL,'India'),('VIS000000002','Priya Singh','priya.singh@example.com','2025-04-15','182082470cb300dd99f50fc54f2790e17c7992845a627ea492c5052e332a9444',NULL,'India'),('VIS000000003','Aman Verma','aman.verma@example.com','2025-04-15','7943348037c7f61fef5e75087931fff25463dda010d52db84c61e528bb75a9c8',NULL,'India'),('VIS000000004','Sneha Gupta','sneha.gupta@example.com','2025-04-15','b9f8dcda817197f6c78d371c3d70ad00d7b9c4b76794fb2cb37b5896b4f47d6b',NULL,'India'),('VIS000000005','Vikram Patel','vikram.patel@example.com','2025-04-15','6b0f0d066ded9b97d04ac1a1c3bb1bae3b5699718338cbd9684a077c1b9afa97',NULL,'India'),('VIS000000006','Ananya Rao','ananya.rao@example.com','2025-04-15','1cb89036869f198bcc9eb30bab46956d3eab7b4776a0a5b1dc00426f45190233',NULL,'India'),('VIS000000007','Karan Malhotra','karan.malhotra@example.com','2025-04-15','81ccbefbd0adad93d912fcb02faa23fbd6f3556d7176027f48982359d44eef74',NULL,'India'),('VIS000000008','Deepika Mehta','deepika.mehta@example.com','2025-04-15','0e10808829a7dc8370b4175027975c652b5f63df18ffd783b3749b7fda6a9578',NULL,'India'),('VIS000000009','Rohan Khanna','rohan.khanna@example.com','2025-04-15','629d6360ee443cd975fd99adb240bff437d5f325a43ee50f818fed130e164818',NULL,'India'),('VIS000000010','Liam Carter','liam.carter01@example.com','2025-04-15','de7d0b3ca0baba4d9f757291366424492cbb5f8ab7cc889907da5de519b76ed8',NULL,'United States'),('VIS000000011','Aarav Bhatia','aarav.bhatia@example.com','2025-04-22','2806c115b849bc53ab120afd897b7f99f7e7dbdd984ee38b2a7210302a28811e',NULL,'India'),('VIS000000012','Sanya Deshmukh','sanya.deshmukh@example.com','2025-03-18','a53bd4b5e4f93bec34ddead5bd5cf9a7b5cd3a02c338de8c46fd64e2c782d756',NULL,'India'),('VIS000000013','Kabir Nair','kabir.nair@example.com','2025-04-08','698ad6d909ea0b84838c60020fcd10739aae3cf55f81c62f2cb15f35e37ae81e',NULL,'India'),('VIS000000014','Ishita Kapoor','ishita.kapoor@example.com','2025-03-30','577d72d68741237b98a1f68320e7dcf3a2cb405a1d46db39257956ae138cdbcb',NULL,'India'),('VIS000000015','Devansh Pillai','devansh.pillai@example.com','2025-04-20','bcc5572f691b7d52fb312dcb9e880f60544131c5014d25d0c45b58feb2086c03',NULL,'India'),('VIS000000016','Meera Joshi','meera.joshi@example.com','2025-03-15','e24d657d97c773383fdbc7c1709fd6995d64239ef8b8c76022d31913e1d8e906',NULL,'India'),('VIS000000017','Arjun Reddy','arjun.reddy@example.com','2025-04-06','d9a637866a2596b7cf837c773d058af803e1d66803607f0cf8d0c888da19bb95',NULL,'India'),('VIS000000018','Tanya Menon','tanya.menon@example.com','2025-04-02','53e780cae246be73e7f2f7c2385c88c26a988ff6a0d5e816d992d8b3b1757ef3',NULL,'India'),('VIS000000019','Rishabh Saxena','rishabh.saxena@example.com','2025-03-25','98ba80d64f907ad31a8963fe6f3271d239fffec2776617f79b6ee6b8f41fb158',NULL,'India'),('VIS000000020','Pooja Iyer','pooja.iyer@example.com','2025-03-19','4d356a66dd9280e466437651ee1a44bd18386f7478b38870b1bf78f49bcfa4e4',NULL,'India'),('VIS000000021','Noah Smith','noah.smith2025@example.com','2025-03-22','029d60b12fd4f0bdfe8bdef29f7f6f3f66e8ad48f5c353b2e5e282ccf0ba8f42',NULL,'United States'),('VIS000000022','Sophia Evans','sophia.evans@example.com','2025-04-04','87e4225650252d700da7c8433a5c5f6d414c4d81807c9f1629ff230d861085a0',NULL,'United States'),('VIS000000023','Olivia Brown','olivia.brown@example.com','2025-04-10','317b766197b90c11da08b80b68ccd40000435db7cb4f2184e02a26c1ae05b15b',NULL,'United States'),('VIS000000024','Elijah Johnson','elijah.johnson@example.com','2025-03-26','bc922b6d726cb49c2b6d3c470489567f0a3c646ff7814fa7a004ed41afbc0e5c',NULL,'United States'),('VIS000000025','Mia Wilson','mia.wilson@example.com','2025-04-12','d4c1a5f0a06a1f07b84b0b3794cb6a72eb7ef47217e0c86fa64e35d5e51201ce',NULL,'United States'),('VIS000000026','William Garcia','will.garcia@example.com','2025-03-29','3cf175df4578b5cb5e177d853b1145deb4e79f15eca63f675db585ea30ec6231',NULL,'United States'),('VIS000000027','Isabella Martinez','isa.martinez@example.com','2025-03-20','7623cc9890b19994b194f722da5669b29252a4cfbbbb88048c9daeb5cdc364b2',NULL,'United States'),('VIS000000028','James Anderson','james.anderson@example.com','2025-04-09','9690d206f90d723244e587c2cceea9b175ce69354265d2f6bee573bc1bbe3c71',NULL,'United States'),('VIS000000029','Amelia Taylor','amelia.taylor@example.com','2025-04-05','748415f164d934ef1a536bad6214a294adbe70eabee439f7039431192ba94ff1',NULL,'United States'),('VIS000000030','Charlotte White','charlotte.white@example.com','2025-03-24','1f1c938548f9e5ed22865ac26f0af27e38a75da1472b7ea4cd1975b07ef35db8',NULL,'United States'),('VIS000000031','Benjamin Thomas','benjamin.thomas@example.com','2025-03-27','0254bc6371ffc997c645dd35c47c6c3feee0486077124e250742cbf4ca4a2e55',NULL,'United States'),('VIS000000032','Lucas Harris','lucas.harris@example.com','2025-04-11','636b3f399e7747b0de81d9229bac09e0c09ccc4601b181a396f78eb4e3d4353f',NULL,'United States'),('VIS000000033','Harper Martin','harper.martin@example.com','2025-03-31','0ca3750de36200872269dba199f4dcde4ec55bf9139b2a5bb9afc45466e51362',NULL,'United States'),('VIS000000034','Henry Clark','henry.clark@example.com','2025-03-17','578004826565767de3f574d390539e093fe790a50ee161f927d487d2027923cd',NULL,'United States'),('VIS000000035','Evelyn Lewis','evelyn.lewis@example.com','2025-04-07','7ac91467b91572a32264c7485f9f8d80bc93e53fbf6d8450634e05c30a7cecfd',NULL,'United States'),('VIS000000036','Matteo Rossi','matteo.rossi@example.com','2025-03-21','47ad4082ab68f62993307fb3d31d891058beef48e5089a6169dc9bd78367dcbb',NULL,'Italy'),('VIS000000037','Emma Dubois','emma.dubois@example.com','2025-04-03','7276f61cea28186f6bb938efe3acfa9fa1829fb5848329289b1abe9023d64b5f',NULL,'France'),('VIS000000038','Niklas Müller','niklas.muller@example.com','2025-04-14','6bab5d639b308060bf5dd33dc38e6771b5f3f6a1a4efe4460b52c047be3034cb',NULL,'Germany'),('VIS000000039','Lucia Fernández','lucia.fernandez@example.com','2025-03-23','7cdca53bbdeeb47fc765adf403fc75288697eea2f805709823b0878208e8ac35',NULL,'Spain'),('VIS000000040','Anna Kowalska','anna.kowalska@example.com','2025-03-16','e075964aae9594eb3637d64fac9374c85afe06dcaa94f2d2cf0bcb1d3ae0d0dc',NULL,'Poland'),('VIS000000041','Daniela Silva','daniela.silva@example.com','2025-04-01','5da482cb0c6602d09fcc86e21c707c467396b7382ede25f0604dc141cf364223',NULL,'Brazil'),('VIS000000042','Luca Romano','luca.romano@example.com','2025-03-28','79f41582835c2094d8d6140d5dc97180b4cfaab8a8e04ed3636e3d3bd6594237',NULL,'Italy'),('VIS000000043','Sara Johansson','sara.johansson@example.com','2025-04-13','166e5fe25f7d9dd852b94e2686c3e3aa356a931ee6effe483b3efd7e787c6075',NULL,'Sweden'),('VIS000000044','Emil Sørensen','emil.sorensen@example.com','2025-04-17','5b932e5ec09e8af2c6b15a69a8f22c061b7072a4fedad0542efc76347347bea3',NULL,'Denmark'),('VIS000000045','Maja Nowak','maja.nowak@example.com','2025-03-13','e5d3f5945678bef774ce4652cdfd4518adc42ccc83e566c7f8dbe25f8927b46a',NULL,'Poland'),('VIS000000046','Neha Sinha','neha.sinha@example.com','2025-04-15','4dbe8c602fcc02d9ff969e999a78abf2f01d61b2901cc0860c6632fc44187a52',NULL,'India'),('VIS000000047','Rajat Kapoor','rajat.kapoor@example.com','2025-04-15','2c13b15f8e9987c36fd16c8cc367a89215eb65cba4aeb5d4b23388ba79ca4207',NULL,'India'),('VIS000000048','Pooja Mehta','pooja.mehta@example.com','2025-04-15','eca9d4bbe6536b4b652fcdbf59162c5f191daabcae6007f895ec6aec6a34f08c',NULL,'India'),('VIS000000049','Manish Gupta','manish.gupta@example.com','2025-04-15','82aac5c002c1e849d52777ffee7e6e3dca60b7bc36c8a7f2a28eb62d441e2300',NULL,'India'),('VIS000000050','Anjali Sharma','anjali.sharma@example.com','2025-04-15','0c8e9f96ea91077ee43b58be4b45df538dc0de4b4567ce5d921c50dff997e57c',NULL,'India'),('VIS000000051','Aditya Khurana','aditya.khurana@example.com','2025-04-15','c35d775b0a186d49762fffdcff73894b93ec0498d632b0429bb6fee98c6fbcba',NULL,'India'),('VIS000000052','Isha Jain','isha.jain@example.com','2025-04-15','02b3d9ea715716ffbfe0738fe3f1d307aae6d2463b5c36a3f542b4ffc9c7508e',NULL,'India'),('VIS000000053','Varun Nair','varun.nair@example.com','2025-04-15','b64ccc17e257057999b72072af397a8ab3f5aa7e923652dee9b18a7116ca85df',NULL,'India'),('VIS000000054','Kavya Iyer','kavya.iyer@example.com','2025-04-15','cf31c2d51943d7814c3d949acc86cea59185967e385447762c904a6489a8f72d',NULL,'India'),('VIS000000055','Mason Miller','mason.miller@example.com','2025-04-15','31ea3bbac929796dff9025bbfbe97a53061a99776660d36a21a36955921438ee',NULL,'United States'),('VIS000000056','Aditi Desai','aditi.desai@example.com','2025-03-20','76e32560f0bd496061e573d1948460d2478528c1167a2f20e91ac95f089f8213',NULL,'India'),('VIS000000057','Nikhil Rao','nikhil.rao@example.com','2025-04-02','1e7eb501c1ba52edde043e573237df61fd02daf7b116950ef7abfad54902581c',NULL,'India'),('VIS000000058','Shruti Menon','shruti.menon@example.com','2025-04-06','b8f537d003e62bbd53bffd3a17551519fe71537b11261843b90c32b61763bc2a',NULL,'India'),('VIS000000059','Yash Vora','yash.vora@example.com','2025-03-29','15428899856e1ba298cc1c7b9b425917b248f3426b21f755df683f14ce37587a',NULL,'India'),('VIS000000060','Divya Bhatt','divya.bhatt@example.com','2025-04-10','6bfee367b20810512d041f7f4c17693a3911ed50047818fbbdaa83bc64888322',NULL,'India'),('VIS000000061','Rohit Seth','rohit.seth@example.com','2025-03-18','cfe3f3d9eab42f1ca71a1b724e3e0e66d602064b32cd08f87991e28b31321cd3',NULL,'India'),('VIS000000062','Simran Kaur','simran.kaur@example.com','2025-04-07','61209fe5bb12ece00ac439ad8fb65a485c50238c597b9190680a063aba690aea',NULL,'India'),('VIS000000063','Kunal Bansal','kunal.bansal@example.com','2025-04-09','358747e6c82c69c3491294739048b1ad5538cb8963d7093e10caa6f4658c0a04',NULL,'India'),('VIS000000064','Tanvi Pandey','tanvi.pandey@example.com','2025-03-26','c0345a06979bbe4e1bb3958a6f859a944236cc39ccc00f31534c0fbde57e6ba5',NULL,'India'),('VIS000000065','Harshita Dixit','harshita.dixit@example.com','2025-04-12','a3df9982add299902cd332e00c403fb1996c0d389962079832d7a3a37dd589a2',NULL,'India'),('VIS000000066','Jacob Robinson','jacob.robinson@example.com','2025-03-19','c8b3865ecbfb3ba74a496e5786384bd4d2877e3aec65244ed0e4767e3637bc06',NULL,'United States'),('VIS000000067','Ava Walker','ava.walker@example.com','2025-04-04','b965de930b8941468234f1a2922a89a68ead0385a9f5f41cc4d219bc09fdc347',NULL,'United States'),('VIS000000068','Ethan Hall','ethan.hall@example.com','2025-03-30','a03c23d8438283990a08b33bafb19ece77014609cb87f8086c1c7894c9f0dded',NULL,'United States'),('VIS000000069','Lily Young','lily.young@example.com','2025-04-08','8337b92e4598d6f477ef395310bb8886e9f18bf2df65ec51a41fcbc8044b69ec',NULL,'United States'),('VIS000000070','Michael Allen','michael.allen@example.com','2025-04-13','005f59a81a40540f06c5676b620cc5004e11d9daa93204ae40920135bbcea023',NULL,'United States'),('VIS000000071','Emma Scott','emma.scott@example.com','2025-03-22','9f95e4c9317e3ef14b012aa396ee2c8206fb49bb76b91d866182386c06065f64',NULL,'United States'),('VIS000000072','Alexander Adams','alexander.adams@example.com','2025-03-24','4e68ba2e77bf2f87435ff21aa1d42927e4f8ca916a78ce7deed4044f2df12854',NULL,'United States'),('VIS000000073','Abigail Wright','abigail.wright@example.com','2025-03-16','a857673dfdeb27d6b38512bb7a674b44501e9d93e8440cfb5b7029a0e282c822',NULL,'United States'),('VIS000000074','Daniel Baker','daniel.baker@example.com','2025-04-05','c97b9f2c0e10f73461d2b0b7a0fca160e2e965006cb246e9f6f3b28807ee6090',NULL,'United States'),('VIS000000075','Sofia Gonzalez','sofia.gonzalez@example.com','2025-03-27','9aced222b6352e328e1f063c20fd7d9dd87517ccc173febbf1aa0a912f1617ce',NULL,'United States'),('VIS000000076','Lea Dubois','lea.dubois@example.com','2025-04-11','be8812c596f73d060b0fbe246b855513bdbd3fa21377adf25813b1bbd99bc0a1',NULL,'France'),('VIS000000077','Lukas Steiner','lukas.steiner@example.com','2025-03-25','5376739d4d9ae8add1f1c20fc88e24461da0d685a0e73dc060620f08ef8d4c5e',NULL,'Germany'),('VIS000000078','Ines Fernández','ines.fernandez@example.com','2025-03-17','dbb90abebe2515bd21e03bd01d92fb360c09f8e821d21746c4175f79b45e7db2',NULL,'Spain'),('VIS000000079','Oskar Nowak','oskar.nowak@example.com','2025-04-01','25c8f7f340407e3db0ccf077eea79dfd6b9002fc3167928ed8c74c2858e02683',NULL,'Poland'),('VIS000000080','Lucas Costa','lucas.costa@example.com','2025-04-03','e1f4e2003a83488c8677a4b554caaa18fdaca0250f9e5026110346daad6b5b14',NULL,'Brazil'),('VIS000000081','Sara Karlsson','sara.karlsson@example.com','2025-03-28','0c09bb60c44215230bd0b0581d8216a7dcafedd4a73961ad3ed99e211c6ce3ec',NULL,'Sweden'),('VIS000000082','Mateo Romano','mateo.romano@example.com','2025-04-14','d1da15cc144cd134cee138614e1a287e971071ba6bef49dc1fdb8f19624879de',NULL,'Italy'),('VIS000000083','Emilia Silva','emilia.silva@example.com','2025-03-21','0aa0da2c4d4d456d86f92bc7eec02aed7965b442976666c1e07c0a7304ccc31a',NULL,'Portugal'),('VIS000000084','Henrik Sørensen','henrik.sorensen@example.com','2025-04-17','a75c9a5e2dc2c5385bc84e7ede6b751f27a4e98fbc71bd34f84e87bef38e5385',NULL,'Denmark'),('VIS000000085','Julia Kowalska','julia.kowalska@example.com','2025-03-15','d24903ca8f77ae987cd42732234a1c1ecefec05be328cb35a4c9e1c11f11f369',NULL,'Poland'),('VIS000000086','Bhavya Sethi','bhavya.sethi@example.com','2025-04-06','6d353b8bd93c0360c0458c872cf52c7abb192d214089e781849d93f7fa88b3a1',NULL,'India'),('VIS000000087','Ishaan Trivedi','ishaan.trivedi@example.com','2025-03-23','8b4a31b636b8ef19eadf5f3397ec616dffb76c09c0d1c0f222900ad63b27ca7d',NULL,'India'),('VIS000000088','Mehul Joshi','mehul.joshi@example.com','2025-03-31','5730dbc94b2cc00e5bfba97c7f7aed081994e23ff92ba511c3f8b18c38093a0e',NULL,'India'),('VIS000000089','Anushka Pillai','anushka.pillai@example.com','2025-04-07','0f19628015e93525902d4067fbb8433925ed6b576c9c6c9a3e2ed3f4a8c05ef9',NULL,'India'),('VIS000000090','Devika Reddy','devika.reddy@example.com','2025-04-10','6c1d9e243f0162dd5ab74700372f5c127af45df5bda426a73952490a17e3ef26',NULL,'India'),('VIS000000091','Siddharth Nair','siddharth.nair@example.com','2025-03-14','b22caf76a14a0a3ab54d7512d2f00c3225cdefcd4dcd13b6cc4af3797d1c2976',NULL,'India'),('VIS000000092','Pranav Ghosh','pranav.ghosh@example.com','2025-03-13','11dbdd6ee6a40eecd00bd14378e7df74873e29bf942f3f65a0c3ac3eaaa4bdec',NULL,'India'),('VIS000000093','Ira Kulkarni','ira.kulkarni@example.com','2025-04-02','11471d5d9868dd4e4ce99355ecb80f59e56a2bebe62898947afabcea8f56c70b',NULL,'India'),('VIS000000094','Ritika Sharma','ritika.sharma@example.com','2025-04-05','d0ef374640d09de1686ad1df8ce5d713d78ef440319e2c54b515e28a3aee597c',NULL,'India'),('VIS000000095','Sameer Das','sameer.das@example.com','2025-03-18','90336706c3af04b7b30acf817fdd8b22288335f40175e019fa9aa55b4fbf8a2d',NULL,'India'),('VIS000000096','Suresh Kumar','suresh.kumar@example.com','2025-04-25','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',NULL,'India');
/*!40000 ALTER TABLE `visitor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-26 23:22:08
