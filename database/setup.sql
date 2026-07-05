DROP DATABASE IF EXISTS  Library_Management; 
CREATE DATABASE Library_Management;

USE Library_Management;

CREATE TABLE Visitor (
  Visitor_ID VARCHAR(12) PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Email VARCHAR(100) UNIQUE NOT NULL,
  Registration_Date DATE NOT NULL DEFAULT (Current_Date),
  Password VARCHAR(100) NOT NULL,
  Avatar VARCHAR(255) NULL,
  Country VARCHAR (50) NULL
  
);


CREATE TABLE User (
    User_ID VARCHAR(12) PRIMARY KEY,
    Start_Date DATE NOT NULL,
    Reward_Points INT DEFAULT 0 CHECK (Reward_Points >= 0),
    Accessibility_Settings JSON,
    Visitor_ID VARCHAR(12) UNIQUE,
    FOREIGN KEY (Visitor_ID) REFERENCES Visitor(Visitor_ID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Transaction (
    Transaction_ID VARCHAR(12) PRIMARY KEY,
    User_ID VARCHAR(12) NOT NULL,
    Amount_Paid DECIMAL(10,2) NOT NULL CHECK (Amount_Paid >= 0),
    Payment_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Payment_Method VARCHAR(50) NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Publisher (
    Publisher_ID VARCHAR(12) PRIMARY KEY,
    Publisher_Name VARCHAR(100) NOT NULL
);

CREATE TABLE Series (
    Series_ID VARCHAR(12) PRIMARY KEY,
    Series_Description TEXT,
    Series_Name VARCHAR(100) NOT NULL
);

CREATE TABLE Book (
    Book_ID VARCHAR(12) PRIMARY KEY,
    Accession_No VARCHAR(20) NULL,
    Title VARCHAR(100) UNIQUE NOT NULL,
    ISBN_No VARCHAR(20),
    ISSN_No VARCHAR(20) ,
    Publication_Year CHAR(4) NOT NULL,
    Cover_Image VARCHAR(255),
    No_of_Pages INT NOT NULL CHECK(No_of_Pages > 0),
    Book_Summary TEXT,
    Language VARCHAR(50) NOT NULL,
    Series_ID VARCHAR(12),
    Publisher_ID VARCHAR(12),
    FOREIGN KEY (Series_ID) REFERENCES Series(Series_ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (Publisher_ID) REFERENCES Publisher(Publisher_ID) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE Notification (
    Status ENUM('seen', 'not seen') NOT NULL,
    Timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Description TEXT,
    User_ID VARCHAR(12),
    PRIMARY KEY (User_ID, Timestamp),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Gamification (
    Gamification_ID VARCHAR(12) PRIMARY KEY,
    Badge_Name VARCHAR(100) NOT NULL,
    Streak INT DEFAULT 0 CHECK (Streak >= 0),
    Leaderboard_Rank INT CHECK (Leaderboard_Rank >= 0),
    Last_Activity_Date DATE,
    Points_Earned INT DEFAULT 0 CHECK (Points_Earned >= 0),
    User_ID VARCHAR(12),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE Bookmarks (
    Bookmarks_ID VARCHAR(12) PRIMARY KEY,
    Bookmark_Note TEXT,
    Page_Number INT NOT NULL CHECK (Page_Number > 0),
    Bookmark_Date DATE NOT NULL,
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Offline_Content (
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    Page_Number INT NOT NULL CHECK (Page_Number > 0),
    Last_Accessed DATE,
    Download_Date DATE,
    Percentage_Read INT DEFAULT 0 CHECK (Percentage_Read BETWEEN 0 AND 100),
    PRIMARY KEY (User_ID, Book_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_accessed_date
     CHECK (Last_Accessed >= Download_Date)
);


CREATE TABLE Reviews (
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    Review_Text TEXT NOT NULL,
    Review_Date DATE NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    PRIMARY KEY (User_ID, Book_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE AI_Recommendation (
    Recommendation_ID VARCHAR(12) PRIMARY KEY,
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    Rank_Order INT NOT NULL CHECK (Rank_Order > 0),
    Date DATE NOT NULL,
	FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE ON UPDATE CASCADE

    
);



CREATE TABLE Category (
    Category_ID VARCHAR(12) PRIMARY KEY,
    Category_Name VARCHAR(100) NOT NULL
);

CREATE TABLE Author (
    Author_ID VARCHAR(12) PRIMARY KEY,
    Author_Image VARCHAR(255),
    Author_Name VARCHAR(100) NOT NULL,
    Author_Introduction TEXT
);

CREATE TABLE Likes (
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    PRIMARY KEY (User_ID, Book_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE Book_To_Category (
    Category_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    PRIMARY KEY (Category_ID, Book_ID),
    FOREIGN KEY (Category_ID) REFERENCES Category(Category_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE
);


CREATE TABLE Book_To_Author (
    Author_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    PRIMARY KEY (Author_ID, Book_ID),
    FOREIGN KEY (Author_ID) REFERENCES Author(Author_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE
);

SHOW TABLES;





-- Required Triggers for Various Primary Keys auto generated by the system

-- Visitor_ID
DELIMITER $$

CREATE TRIGGER	generate_Visitor_ID 
before insert on visitor
For each row
begin
	SET NEW.Visitor_ID = CONCAT('VIS', LPAD(
            IFNULL(
                (SELECT MAX(CAST(SUBSTRING(Visitor_ID, 4) AS UNSIGNED)) FROM Visitor),
                0
            ) + 1, 9, '0')); 
	-- Hash Visitor Password Trigger using Secure Hash Algorithm 2:  always produces exactly 64 character
	SET NEW.Password = SHA2(NEW.Password, 256);
 END $$
 
DELIMITER ;




-- Publisher_ID
DELIMITER $$
CREATE TRIGGER  generate_Publisher_ID 
before insert on Publisher
For each ROW
begin
	SET NEW.Publisher_ID = CONCAT('PUB', LPAD(
            IFNULL(
                (SELECT MAX(CAST(SUBSTRING(Publisher_ID, 4) AS UNSIGNED)) FROM Publisher),
                0
            ) + 1, 9, '0')); 
 END $$
DELIMITER ;



-- Series_ID
DELIMITER $$
CREATE TRIGGER	generate_Series_ID 
before insert on Series
For each ROW
begin
	SET NEW.Series_ID = CONCAT('SER', LPAD(
            IFNULL(
                (SELECT MAX(CAST(SUBSTRING(Series_ID, 4) AS UNSIGNED)) FROM Series),
                0
            ) + 1, 9, '0')); 
 END $$
DELIMITER ;

-- NOTE: The old standalone "generate_Book_ID" trigger was removed here.
-- It duplicated the ID-generation logic already performed by
-- "generate_Book_ID_Accession" below (two BEFORE INSERT triggers on the
-- same table both recomputing Book_ID is redundant and error-prone).
-- Book_ID + Accession_No are now generated together in a single trigger
-- (see generate_Book_ID_Accession further down).


-- User_ID
DELIMITER $$
CREATE TRIGGER generate_User_ID
BEFORE INSERT On User
For each row
begin 
	 SET NEW.User_ID = CONCAT('USE',LPAD(
     IFNULL(
     (SELECT MAX(CAST(SUBSTRING(User_ID,4)AS UNSIGNED))FROM User),
     0
     ) + 1,9,'0'));
     
END $$
DELIMITER ;

-- Notification
DELIMITER $$
CREATE TRIGGER generate_welcome_notification
AFTER INSERT On User
For each row
begin 
     DECLARE msg VARCHAR(200);
     SET msg = CONCAT("Hello ",
		(SELECT name FROM Visitor where Visitor_ID=NEW.Visitor_ID),
        ", Welcome to the platform. Feel free to Explore our Library Seeker.");
     insert into notification(status, description, user_ID) values 
     ('not seen',msg,NEW.User_ID);
END $$
DELIMITER ;



-- Gamification
DELIMITER $$

CREATE TRIGGER generate_Gamification_ID
BEFORE INSERT ON Gamification
FOR EACH ROW
BEGIN
    SET NEW.Gamification_ID = CONCAT('GAM', LPAD(
        IFNULL(
            (SELECT MAX(CAST(SUBSTRING(Gamification_ID, 4) AS UNSIGNED)) 
             FROM Gamification),
            0
        ) + 1, 9, '0'
    ));
END $$

DELIMITER ;

--Bookmarks

DELIMITER $$

CREATE TRIGGER generate_Bookmarks_ID
BEFORE INSERT ON Bookmarks
FOR EACH ROW
BEGIN
    SET NEW.Bookmarks_ID = CONCAT('BOO', LPAD(
        IFNULL(
            (SELECT MAX(CAST(SUBSTRING(Bookmarks_ID, 4) AS UNSIGNED)) 
             FROM Bookmarks),
            0
        ) + 1, 9, '0'
    ));
END $$

DELIMITER ;

-- Recommendation
DELIMITER $$

CREATE TRIGGER generate_Recommendation_ID
BEFORE INSERT ON AI_Recommendation
FOR EACH ROW
BEGIN
    SET NEW.Recommendation_ID = CONCAT('REC', LPAD(
        IFNULL(
            (SELECT MAX(CAST(SUBSTRING(Recommendation_ID, 4) AS UNSIGNED)) 
             FROM AI_Recommendation),
            0
        ) + 1, 9, '0'
    ));
END $$

DELIMITER ;

-- Category
DELIMITER $$

CREATE TRIGGER generate_Category_ID
BEFORE INSERT ON Category
FOR EACH ROW
BEGIN
    SET NEW.Category_ID = CONCAT('CAT', LPAD(
        IFNULL(
            (SELECT MAX(CAST(SUBSTRING(Category_ID, 4) AS UNSIGNED)) 
             FROM Category),
            0
        ) + 1, 9, '0'
    ));
END $$

DELIMITER ;

-- Author

DELIMITER $$

CREATE TRIGGER generate_Author_ID
BEFORE INSERT ON Author
FOR EACH ROW
BEGIN
    SET NEW.Author_ID = CONCAT('AUT', LPAD(
        IFNULL(
            (SELECT MAX(CAST(SUBSTRING(Author_ID, 4) AS UNSIGNED)) 
             FROM Author),
            0
        ) + 1, 9, '0'
    ));
END $$

DELIMITER ;


    
-- accession no and book ID (single trigger now handles both Book_ID and Accession_No)
DELIMITER $$

CREATE TRIGGER generate_Book_ID_Accession
BEFORE INSERT ON Book
FOR EACH ROW
BEGIN
    DECLARE book_first_char CHAR(1);
    DECLARE series_number CHAR(3) default '00';
    DECLARE publish_year CHAR(4) default '0000';
    
    SET NEW.Book_ID = CONCAT('B', LPAD(
        IFNULL(
            (SELECT MAX(CAST(SUBSTRING(Book_ID, 2) AS UNSIGNED)) 
             FROM Book),
            0
        ) + 1, 11, '0'
    ));
    
    
    -- Get the first letter of Book Title
    SET book_first_char = UPPER(SUBSTRING(NEW.Title, 1, 1));
    
    -- Check if the book has a Series, if not, set series_number to 000
    IF NEW.Series_ID IS NULL OR NEW.Series_ID = '' THEN
        SET series_number = '000';
    ELSE
        -- Get the 3-digit Series Number (if Series exists)
        SET series_number = RIGHT(NEW.Series_Id,3);
    END IF;
    
    -- Get the 4-digit Publish Year
    SET publish_year = CAST(NEW.Publication_Year AS CHAR);
 
    -- Generate the Accession_No in the required format
    SET NEW.Accession_No = CONCAT(
          publish_year,
          ':', 
          book_first_char, 
          '.', 
          series_number
      );
END $$

DELIMITER ;

-- add to accession number as new category is mapped to any book
DELIMITER $$
CREATE trigger update_Accession_on_category
AFTER insert on Book_To_Category 
FOR each row
begin
	update book a
    set a.accession_no = CONCAT(SUBSTRING(a.accession_no,1,4),RIGHT(NEW.category_ID,3),RIGHT(a.accession_no,6))
    where a.Book_ID = NEW.Book_ID;
end$$

DELIMITER ;

 -- Add into accession number as any entry occurs in Book to Author table
DELIMITER $$
CREATE trigger update_accession_on_author
AFTER insert on Book_To_Author
FOR EACH ROW
BEGIN
    UPDATE Book b
    SET Accession_no = concat(SUBSTRING_INDEX(b.Accession_no, ':', 1),
    UPPER((Select SUBSTRING(Author_Name,1,3) from Author where Author_ID = NEW.Author_ID)),
    SUBSTRING_INDEX(b.Accession_no, ':', -1))
    where b.Book_ID = NEW.Book_ID;
END$$

DELIMITER ;


-- Start a trigger to calculate percentage read whenever there is a insert or update in offline_content table
DELIMITER $$

CREATE TRIGGER trg_offline_content_before_insert
BEFORE INSERT ON Offline_Content
FOR EACH ROW
BEGIN
    DECLARE total_pages INT;

    -- Get total pages of the book
    SELECT No_of_Pages INTO total_pages
    FROM Book
    WHERE Book_ID = NEW.Book_ID;

    -- Avoid division by zero
    IF total_pages IS NULL OR total_pages = 0 THEN
        SET NEW.Percentage_Read = 0;
	ELSEIF NEW.Page_Number > total_pages THEN
		SET NEW.Percentage_Read = 100;
    ELSE
        SET NEW.Percentage_Read = ROUND((NEW.Page_Number / total_pages) * 100);
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_offline_content_before_update
BEFORE UPDATE ON Offline_Content
FOR EACH ROW
BEGIN
    DECLARE total_pages INT;

    -- Get total pages of the book
    SELECT No_of_Pages INTO total_pages
    FROM Book
    WHERE Book_ID = NEW.Book_ID;

    -- Avoid division by zero
    IF total_pages IS NULL OR total_pages = 0 THEN
        SET NEW.Percentage_Read = 0;
    ELSE
        SET NEW.Percentage_Read = ROUND((NEW.Page_Number / total_pages) * 100);
    END IF;
END$$

DELIMITER ;

-- NOTE: the premature "DROP TRIGGER trg_offline_content_before_insert" that
-- originally appeared here (before any data was inserted) has been removed.
-- Dropping it at this point in the script disabled Percentage_Read
-- calculation for every Offline_Content row inserted later, which defeats
-- the purpose of the trigger. The insert trigger is intentionally kept
-- active through the data-loading section below.

show triggers;



-- 100 visitors visits our DLMS

INSERT INTO Visitor (Name, Email, Registration_Date, Password, Avatar, Country) VALUES
('Rahul Sharma', 'rahul.sharma@example.com', '2025-04-15', 'Password123!', NULL, 'India'),
('Priya Singh', 'priya.singh@example.com', '2025-04-15', 'SafePass456!', NULL, 'India'),
('Aman Verma', 'aman.verma@example.com', '2025-04-15', 'MySecret789!', NULL, 'India'),
('Sneha Gupta', 'sneha.gupta@example.com', '2025-04-15', 'PassMe321!', NULL, 'India'),
('Vikram Patel', 'vikram.patel@example.com', '2025-04-15', 'LetMeIn987!', NULL, 'India'),
('Ananya Rao', 'ananya.rao@example.com', '2025-04-15', 'Secure456!', NULL, 'India'),
('Karan Malhotra', 'karan.malhotra@example.com', '2025-04-15', 'TrustNo1!', NULL, 'India'),
('Deepika Mehta', 'deepika.mehta@example.com', '2025-04-15', 'NoEntry654!', NULL, 'India'),
('Rohan Khanna', 'rohan.khanna@example.com', '2025-04-15', 'OpenSesame999!', NULL, 'India'),
('Liam Carter', 'liam.carter01@example.com', '2025-04-15', 'Hunter321!', NULL, 'United States'),

('Aarav Bhatia', 'aarav.bhatia@example.com', '2025-04-22', 'Qwerty098!', NULL, 'India'),
('Sanya Deshmukh', 'sanya.deshmukh@example.com', '2025-03-18', 'Asdfgh567!', NULL, 'India'),
('Kabir Nair', 'kabir.nair@example.com', '2025-04-08', 'Zxcvbn345!', NULL, 'India'),
('Ishita Kapoor', 'ishita.kapoor@example.com', '2025-03-30', 'Mypass555!', NULL, 'India'),
('Devansh Pillai', 'devansh.pillai@example.com', '2025-04-20', 'SecureMe321!', NULL, 'India'),
('Meera Joshi', 'meera.joshi@example.com', '2025-03-15', 'Trust321!', NULL, 'India'),
('Arjun Reddy', 'arjun.reddy@example.com', '2025-04-06', 'Pass432!', NULL, 'India'),
('Tanya Menon', 'tanya.menon@example.com', '2025-04-02', 'NoWay321!', NULL, 'India'),
('Rishabh Saxena', 'rishabh.saxena@example.com', '2025-03-25', 'Login321!', NULL, 'India'),
('Pooja Iyer', 'pooja.iyer@example.com', '2025-03-19', 'Hidden123!', NULL, 'India'),

('Noah Smith', 'noah.smith2025@example.com', '2025-03-22', 'Guarded123!', NULL, 'United States'),
('Sophia Evans', 'sophia.evans@example.com', '2025-04-04', 'Block123!', NULL, 'United States'),
('Olivia Brown', 'olivia.brown@example.com', '2025-04-10', 'KnightPass!', NULL, 'United States'),
('Elijah Johnson', 'elijah.johnson@example.com', '2025-03-26', 'Barrier321!', NULL, 'United States'),
('Mia Wilson', 'mia.wilson@example.com', '2025-04-12', 'KeepSafe111!', NULL, 'United States'),
('William Garcia', 'will.garcia@example.com', '2025-03-29', 'FastLock999!', NULL, 'United States'),
('Isabella Martinez', 'isa.martinez@example.com', '2025-03-20', 'QuickPass321!', NULL, 'United States'),
('James Anderson', 'james.anderson@example.com', '2025-04-09', 'EntryBlocked!', NULL, 'United States'),
('Amelia Taylor', 'amelia.taylor@example.com', '2025-04-05', 'NoEntryAllowed!', NULL, 'United States'),
('Charlotte White', 'charlotte.white@example.com', '2025-03-24', 'FinalGate321!', NULL, 'United States'),

('Benjamin Thomas', 'benjamin.thomas@example.com', '2025-03-27', 'BehindDoor321!', NULL, 'United States'),
('Lucas Harris', 'lucas.harris@example.com', '2025-04-11', 'TrustedEntry!', NULL, 'United States'),
('Harper Martin', 'harper.martin@example.com', '2025-03-31', 'HiddenValley!', NULL, 'United States'),
('Henry Clark', 'henry.clark@example.com', '2025-03-17', 'SecretHill123!', NULL, 'United States'),
('Evelyn Lewis', 'evelyn.lewis@example.com', '2025-04-07', 'FinalStep123!', NULL, 'United States'),

('Matteo Rossi', 'matteo.rossi@example.com', '2025-03-21', 'NearSafe999!', NULL, 'Italy'),
('Emma Dubois', 'emma.dubois@example.com', '2025-04-03', 'ExtraSafe123!', NULL, 'France'),
('Niklas Müller', 'niklas.muller@example.com', '2025-04-14', 'SilentEntry!', NULL, 'Germany'),
('Lucia Fernández', 'lucia.fernandez@example.com', '2025-03-23', 'HiddenLock321!', NULL, 'Spain'),
('Anna Kowalska', 'anna.kowalska@example.com', '2025-03-16', 'ShieldedPass!', NULL, 'Poland'),
('Daniela Silva', 'daniela.silva@example.com', '2025-04-01', 'Outside321!', NULL, 'Brazil'),
('Luca Romano', 'luca.romano@example.com', '2025-03-28', 'OpenRoad123!', NULL, 'Italy'),
('Sara Johansson', 'sara.johansson@example.com', '2025-04-13', 'UnderCover!', NULL, 'Sweden'),
('Emil Sørensen', 'emil.sorensen@example.com', '2025-04-17', 'FarAway321!', NULL, 'Denmark'),
('Maja Nowak', 'maja.nowak@example.com', '2025-03-13', 'MidnightPass!', NULL, 'Poland'),
('Neha Sinha', 'neha.sinha@example.com', '2025-04-15', 'TigerPass123!', NULL, 'India'),
('Rajat Kapoor', 'rajat.kapoor@example.com', '2025-04-15', 'Ocean321!', NULL, 'India'),
('Pooja Mehta', 'pooja.mehta@example.com', '2025-04-15', 'SkyWalk999!', NULL, 'India'),
('Manish Gupta', 'manish.gupta@example.com', '2025-04-15', 'RiverRun321!', NULL, 'India'),
('Anjali Sharma', 'anjali.sharma@example.com', '2025-04-15', 'DesertStorm!', NULL, 'India'),
('Aditya Khurana', 'aditya.khurana@example.com', '2025-04-15', 'ForestKing!', NULL, 'India'),
('Isha Jain', 'isha.jain@example.com', '2025-04-15', 'StormBreaker!', NULL, 'India'),
('Varun Nair', 'varun.nair@example.com', '2025-04-15', 'MoonWalker!', NULL, 'India'),
('Kavya Iyer', 'kavya.iyer@example.com', '2025-04-15', 'GalaxyPass!', NULL, 'India'),
('Mason Miller', 'mason.miller@example.com', '2025-04-15', 'HiddenSky!', NULL, 'United States'),

('Aditi Desai', 'aditi.desai@example.com', '2025-03-20', 'JungleBook!', NULL, 'India'),
('Nikhil Rao', 'nikhil.rao@example.com', '2025-04-02', 'IslandDream!', NULL, 'India'),
('Shruti Menon', 'shruti.menon@example.com', '2025-04-06', 'BlazePass!', NULL, 'India'),
('Yash Vora', 'yash.vora@example.com', '2025-03-29', 'FireShield!', NULL, 'India'),
('Divya Bhatt', 'divya.bhatt@example.com', '2025-04-10', 'MagicForest!', NULL, 'India'),
('Rohit Seth', 'rohit.seth@example.com', '2025-03-18', 'DreamLand!', NULL, 'India'),
('Simran Kaur', 'simran.kaur@example.com', '2025-04-07', 'ShieldedHeart!', NULL, 'India'),
('Kunal Bansal', 'kunal.bansal@example.com', '2025-04-09', 'SpeedWay321!', NULL, 'India'),
('Tanvi Pandey', 'tanvi.pandey@example.com', '2025-03-26', 'LockSmith123!', NULL, 'India'),
('Harshita Dixit', 'harshita.dixit@example.com', '2025-04-12', 'SilentGuard!', NULL, 'India'),

('Jacob Robinson', 'jacob.robinson@example.com', '2025-03-19', 'StonePass123!', NULL, 'United States'),
('Ava Walker', 'ava.walker@example.com', '2025-04-04', 'IceShield!', NULL, 'United States'),
('Ethan Hall', 'ethan.hall@example.com', '2025-03-30', 'SteelHeart!', NULL, 'United States'),
('Lily Young', 'lily.young@example.com', '2025-04-08', 'ShadowEntry!', NULL, 'United States'),
('Michael Allen', 'michael.allen@example.com', '2025-04-13', 'MidnightRun!', NULL, 'United States'),
('Emma Scott', 'emma.scott@example.com', '2025-03-22', 'DarkKnight!', NULL, 'United States'),
('Alexander Adams', 'alexander.adams@example.com', '2025-03-24', 'CrimsonGuard!', NULL, 'United States'),
('Abigail Wright', 'abigail.wright@example.com', '2025-03-16', 'RapidPass!', NULL, 'United States'),
('Daniel Baker', 'daniel.baker@example.com', '2025-04-05', 'SwiftMove!', NULL, 'United States'),
('Sofia Gonzalez', 'sofia.gonzalez@example.com', '2025-03-27', 'FrozenLake!', NULL, 'United States'),

('Lea Dubois', 'lea.dubois@example.com', '2025-04-11', 'NightWolf!', NULL, 'France'),
('Lukas Steiner', 'lukas.steiner@example.com', '2025-03-25', 'IceBlaze!', NULL, 'Germany'),
('Ines Fernández', 'ines.fernandez@example.com', '2025-03-17', 'SecretLake!', NULL, 'Spain'),
('Oskar Nowak', 'oskar.nowak@example.com', '2025-04-01', 'ShiningSun!', NULL, 'Poland'),
('Lucas Costa', 'lucas.costa@example.com', '2025-04-03', 'WhiteSands!', NULL, 'Brazil'),
('Sara Karlsson', 'sara.karlsson@example.com', '2025-03-28', 'SkyCastle!', NULL, 'Sweden'),
('Mateo Romano', 'mateo.romano@example.com', '2025-04-14', 'DarkPass123!', NULL, 'Italy'),
('Emilia Silva', 'emilia.silva@example.com', '2025-03-21', 'MagicSword!', NULL, 'Portugal'),
('Henrik Sørensen', 'henrik.sorensen@example.com', '2025-04-17', 'BladeRunner!', NULL, 'Denmark'),
('Julia Kowalska', 'julia.kowalska@example.com', '2025-03-15', 'HiddenRose!', NULL, 'Poland'),

('Bhavya Sethi', 'bhavya.sethi@example.com', '2025-04-06', 'PearlHaven!', NULL, 'India'),
('Ishaan Trivedi', 'ishaan.trivedi@example.com', '2025-03-23', 'FinalShield!', NULL, 'India'),
('Mehul Joshi', 'mehul.joshi@example.com', '2025-03-31', 'MirrorLake!', NULL, 'India'),
('Anushka Pillai', 'anushka.pillai@example.com', '2025-04-07', 'SnowCastle!', NULL, 'India'),
('Devika Reddy', 'devika.reddy@example.com', '2025-04-10', 'MysticGate!', NULL, 'India'),
('Siddharth Nair', 'siddharth.nair@example.com', '2025-03-14', 'TwilightRoad!', NULL, 'India'),
('Pranav Ghosh', 'pranav.ghosh@example.com', '2025-03-13', 'HunterQuest!', NULL, 'India'),
('Ira Kulkarni', 'ira.kulkarni@example.com', '2025-04-02', 'HiddenTreasure!', NULL, 'India'),
('Ritika Sharma', 'ritika.sharma@example.com', '2025-04-05', 'Guardians321!', NULL, 'India'),
('Sameer Das', 'sameer.das@example.com', '2025-03-18', 'SkyNetPass!', NULL, 'India');

Select * from Visitor;




-- 39 visitors becomes the user

INSERT INTO User (Start_Date, Reward_Points, Accessibility_Settings, Visitor_ID) VALUES
('2025-04-16', 100,'{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000017'),
('2025-04-18', 00, '{"Text-to-Speech":"No","Color-Contrast":"12:1","Font-Size":"8","Bold":"2"}', 'VIS000000004'),
('2025-04-20', 80, '{"Text-to-Speech":"Yes","Color-Contrast":"5:1","Font-Size":"7","Bold":"4"}', 'VIS000000006'),
('2025-04-19', 10, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000009'),
('2025-04-21', 60, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000012'),
('2025-04-24', 30, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000015'),
('2025-04-17', 50, '{"Text-to-Speech":"Yes","Color-Contrast":"8:1","Font-Size":"4","Bold":"2"}', 'VIS000000018'),
('2025-04-19', 90, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000021'),
('2025-04-20', 00, '{"Text-to-Speech":"No","Color-Contrast":"11:1","Font-Size":"12","Bold":"1"}', 'VIS000000024'),
('2025-04-22', 80, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000027'),

('2025-04-23', 80, '{"Text-to-Speech":"No","Color-Contrast":"6:1","Font-Size":"6","Bold":"5"}', 'VIS000000030'),
('2025-04-24', 70, '{"Text-to-Speech":"Yes","Color-Contrast":"9:1","Font-Size":"3","Bold":"1"}', 'VIS000000032'),
('2025-04-19', 90, '{"Text-to-Speech":"Yes","Color-Contrast":"7:1","Font-Size":"1","Bold":"2"}', 'VIS000000035'),
('2025-04-21', 60, '{"Text-to-Speech":"No","Color-Contrast":"2:1","Font-Size":"11","Bold":"5"}', 'VIS000000038'),
('2025-04-25', 20, '{"Text-to-Speech":"Yes","Color-Contrast":"8:1","Font-Size":"5","Bold":"3"}', 'VIS000000041'),
('2025-04-17', 50, '{"Text-to-Speech":"No","Color-Contrast":"5:1","Font-Size":"8","Bold":"4"}', 'VIS000000044'),
('2025-04-18', 10, '{"Text-to-Speech":"Yes","Color-Contrast":"10:1","Font-Size":"7","Bold":"1"}', 'VIS000000047'),
('2025-04-22', 70, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000050'),
('2025-04-23', 80, '{"Text-to-Speech":"Yes","Color-Contrast":"3:1","Font-Size":"9","Bold":"4"}', 'VIS000000052'),
('2025-04-24', 40, '{"Text-to-Speech":"No","Color-Contrast":"4:1","Font-Size":"10","Bold":"5"}', 'VIS000000055'),

('2025-04-18', 10, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000058'),
('2025-04-20', 50, '{"Text-to-Speech":"No","Color-Contrast":"6:1","Font-Size":"12","Bold":"2"}', 'VIS000000061'),
('2025-04-19', 40, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000063'),
('2025-04-23', 60, '{"Text-to-Speech":"No","Color-Contrast":"7:1","Font-Size":"5","Bold":"1"}', 'VIS000000066'),
('2025-04-24', 30, '{"Text-to-Speech":"Yes","Color-Contrast":"8:1","Font-Size":"7","Bold":"3"}', 'VIS000000069'),
('2025-04-25', 19, '{"Text-to-Speech":"No","Color-Contrast":"9:1","Font-Size":"2","Bold":"4"}', 'VIS000000072'),
('2025-04-26', 30, '{"Text-to-Speech":"Yes","Color-Contrast":"10:1","Font-Size":"4","Bold":"5"}', 'VIS000000075'),
('2025-04-24', 70, '{"Text-to-Speech":"No","Color-Contrast":"11:1","Font-Size":"11","Bold":"2"}', 'VIS000000078'),
('2025-04-27', 13, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000081'),
('2025-04-25', 30, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000084'),

('2025-04-26', 40, '{"Text-to-Speech":"Yes","Color-Contrast":"4:1","Font-Size":"9","Bold":"3"}', 'VIS000000087'),
('2025-04-26', 9, '{"Text-to-Speech":"No","Color-Contrast":"2:1","Font-Size":"5","Bold":"2"}', 'VIS000000090'),
('2025-04-27', 2, '{"Text-to-Speech":"Yes","Color-Contrast":"7:1","Font-Size":"10","Bold":"4"}', 'VIS000000093'),
('2025-04-27', 17, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000001'),
('2025-04-27', 24, '{"Text-to-Speech":"Yes","Color-Contrast":"9:1","Font-Size":"3","Bold":"1"}', 'VIS000000073'),
('2025-04-27', 21, '{"Text-to-Speech":"No","Color-Contrast":"5:1","Font-Size":"6","Bold":"2"}', 'VIS000000010'),
('2025-04-25', 40, '{"Text-to-Speech":"Yes","Color-Contrast":"7:1","Font-Size":"8","Bold":"4"}', 'VIS000000005'),
('2025-04-25', 90, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000007'),
('2025-04-25', 90, '{"Text-to-Speech": "No","Color-Contrast": "7:1","Font-Size": "8","Bold": "2"}', 'VIS000000057');

select user_ID, start_Date from user;
select * from user;




--  Transaction INSERTS with mixed Payment_Methods
INSERT INTO Transaction (Transaction_ID, User_ID, Amount_Paid, Payment_Date, Payment_Method) VALUES
('TRA000000001', 'USE000000001', 600.00, '2025-04-16', 'UPI'),
('TRA000000002', 'USE000000002', 600.00, '2025-04-18', 'Debit Card'),
('TRA000000003', 'USE000000003', 600.00, '2025-04-20', 'Credit Card'),
('TRA000000004', 'USE000000004', 600.00, '2025-04-19', 'UPI'),
('TRA000000005', 'USE000000005', 600.00, '2025-04-21', 'Credit Card'),
('TRA000000006', 'USE000000006', 600.00, '2025-04-24', 'Debit Card'),
('TRA000000007', 'USE000000007', 600.00, '2025-04-17', 'UPI'),
('TRA000000008', 'USE000000008', 600.00, '2025-04-19', 'Debit Card'),
('TRA000000009', 'USE000000009', 600.00, '2025-04-20', 'Credit Card'),
('TRA000000010', 'USE000000010', 600.00, '2025-04-22', 'UPI'),

('TRA000000011', 'USE000000011', 600.00, '2025-04-23', 'Debit Card'),
('TRA000000012', 'USE000000012', 600.00, '2025-04-24', 'UPI'),
('TRA000000013', 'USE000000013', 600.00, '2025-04-19', 'Credit Card'),
('TRA000000014', 'USE000000014', 600.00, '2025-04-21', 'UPI'),
('TRA000000015', 'USE000000015', 600.00, '2025-04-25', 'Debit Card'),
('TRA000000016', 'USE000000016', 600.00, '2025-04-17', 'Credit Card'),
('TRA000000017', 'USE000000017', 600.00, '2025-04-18', 'Debit Card'),
('TRA000000018', 'USE000000018', 600.00, '2025-04-22', 'UPI'),
('TRA000000019', 'USE000000019', 600.00, '2025-04-23', 'Credit Card'),
('TRA000000020', 'USE000000020', 600.00, '2025-04-24', 'UPI'),

('TRA000000021', 'USE000000021', 600.00, '2025-04-18', 'Credit Card'),
('TRA000000022', 'USE000000022', 600.00, '2025-04-20', 'Debit Card'),
('TRA000000023', 'USE000000023', 600.00, '2025-04-19', 'UPI'),
('TRA000000024', 'USE000000024', 600.00, '2025-04-23', 'Credit Card'),
('TRA000000025', 'USE000000025', 600.00, '2025-04-24', 'Debit Card'),
('TRA000000026', 'USE000000026', 600.00, '2025-04-25', 'UPI'),
('TRA000000027', 'USE000000027', 600.00, '2025-04-26', 'Credit Card'),
('TRA000000028', 'USE000000028', 600.00, '2025-04-24', 'UPI'),
('TRA000000029', 'USE000000029', 600.00, '2025-04-27', 'Debit Card'),
('TRA000000030', 'USE000000030', 600.00, '2025-04-25', 'UPI'),

('TRA000000031', 'USE000000031', 600.00, '2025-04-26', 'Credit Card'),
('TRA000000032', 'USE000000032', 600.00, '2025-04-26', 'Debit Card'),
('TRA000000033', 'USE000000033', 600.00, '2025-04-27', 'UPI'),
('TRA000000034', 'USE000000034', 600.00, '2025-04-27', 'Debit Card'),
('TRA000000035', 'USE000000035', 600.00, '2025-04-27', 'Credit Card'),
('TRA000000036', 'USE000000036', 600.00, '2025-04-27', 'UPI'),
('TRA000000037', 'USE000000037', 600.00, '2025-04-25', 'Debit Card'),
('TRA000000038', 'USE000000038', 600.00, '2025-04-25', 'Credit Card');


select * from transaction;


-- Insert Publishers
INSERT INTO Publisher (Publisher_Name) VALUES
('Penguin Random House'),
('HarperCollins'),
('Bloomsbury Publishing'),
('Rajkamal Prakashan'),
('Vani Prakashan'),
('Simon & Schuster'),
('Scholastic Corporation'),
('Macmillan Publishers');

select * from publisher;

-- Insert Series
INSERT INTO Series (Series_Name, Series_Description) VALUES
('Harry Potter', 'A series of fantasy novels written by J.K. Rowling.'),
('A Song of Ice and Fire', 'Epic fantasy novels by George R. R. Martin.'),
('Lord of the Rings', 'High fantasy novels written by J.R.R. Tolkien.'),
('Hunger Games', 'Dystopian novels by Suzanne Collins.'),
('Ramayana Series', 'A modern retelling of the Ramayana epic.'),
('Premchand Classics', 'Collection of works by Munshi Premchand.'),
('Hindi Kavita Sangrah', 'Anthology of Hindi poems.'),
('Sherlock Holmes', 'Detective stories by Arthur Conan Doyle.'),
('Percy Jackson', 'Greek mythology-themed fantasy novels by Rick Riordan.');

-- Insert Categories
INSERT INTO Category (Category_Name) VALUES
('Fantasy'),
('Science Fiction'),
('Dystopian'),
('Historical Fiction'),
('Classic Literature'),
('Hindi Literature'),
('Mythology'),
('Mystery'),
('Adventure'),
('Children''s Literature'),
('Poetry'),
('Philosophy'),
('Romance'),
('Horror'),
('Biography'),
('Self Help'),
('Spiritual'),
('Drama'),
('Short Stories'),
('Satire');
select * from category;

INSERT INTO Author (Author_ID, Author_Name, Author_Introduction) VALUES
('AUT000000001', 'Tolkien, J.R.R.', 'English writer, poet, philologist, and academic, best known for The Lord of the Rings.'),
('AUT000000002', 'Rowling, J.K.', 'British author, best known for the Harry Potter series.'),
('AUT000000003', 'Orwell, George', 'English novelist and critic, known for dystopian fiction like 1984 and Animal Farm.'),
('AUT000000004', 'Huxley, Aldous', 'English writer and philosopher, famous for Brave New World.'),
('AUT000000005', 'Shelley, Mary', 'English novelist who wrote Frankenstein, a pioneering work of science fiction.'),
('AUT000000006', 'Premchand', 'Hindi-Urdu writer, novelist, and dramatist, known for social realism in Indian literature.'),
('AUT000000007', 'Tagore, Rabindranath', 'Bengali polymath, poet, musician, and artist, Nobel Prize winner in Literature.'),
('AUT000000008', 'Kipling, Rudyard', 'English journalist, short-story writer, and poet, famous for The Jungle Book.'),
('AUT000000009', 'Verne, Jules', 'French novelist, poet, and playwright, known as a father of science fiction.'),
('AUT000000010', 'Narayan, R.K.', 'Indian writer known for his works set in the fictional South Indian town of Malgudi.'),
('AUT000000011', 'Rushdie, Salman', 'British-Indian novelist, known for Midnight\'s Children and magical realism.'),
('AUT000000012', 'Roy, Arundhati', 'Indian author and political activist, winner of the Booker Prize for The God of Small Things.'),
('AUT000000013', 'Murakami, Haruki', 'Japanese novelist, best known for Kafka on the Shore and Norwegian Wood.'),
('AUT000000014', 'Coelho, Paulo', 'Brazilian lyricist and novelist, best known for The Alchemist.'),
('AUT000000015', 'Austen, Jane', 'English novelist known for her six major novels like Pride and Prejudice.'),
('AUT000000016', 'Dostoevsky, Fyodor', 'Russian novelist, philosopher, and journalist, famous for Crime and Punishment.'),
('AUT000000017', 'Lee, Harper', 'American novelist widely known for To Kill a Mockingbird.'),
('AUT000000018', 'Salinger, J.D.', 'American writer best known for his novel The Catcher in the Rye.'),
('AUT000000019', 'Márquez, Gabriel García', 'Colombian novelist and Nobel laureate, known for One Hundred Years of Solitude.'),
('AUT000000020', 'Hosseini, Khaled', 'Afghan-American novelist and physician, famous for The Kite Runner.'),
('AUT000000021', 'Bachchan, Harivansh Rai', 'Indian poet noted for his early work Madhushala.');


select * from author;


INSERT INTO Book (Title, ISBN_No, ISSN_No, Publication_Year, Cover_Image, No_of_Pages, Book_Summary, Language, Series_ID, Publisher_ID) 
VALUES 
('The Fellowship of the Ring', '9780261102354', NULL, 1954, NULL, 423, 'First of The Lord of the Rings trilogy.', 'English', 'SER000000003', 'PUB000000003'),
('The Two Towers', '9780261102361', NULL, 1954, NULL, 352, 'Second of The Lord of the Rings trilogy.', 'English', 'SER000000003', 'PUB000000003'),
('The Return of the King', '9780261102378', NULL, 1955, NULL, 416, 'Conclusion of The Lord of the Rings.', 'English', 'SER000000003', 'PUB000000003'),
('Harry Potter and the Philosopher\'s Stone', '9780747532743', NULL, 1997, NULL, 223, 'First novel in the Harry Potter series.', 'English', 'SER000000002', 'PUB000000002'),
('Harry Potter and the Chamber of Secrets', '9780747538486', NULL, 1998, NULL, 251, 'Second novel in the Harry Potter series.', 'English', 'SER000000002', 'PUB000000002'),
('Harry Potter and the Prisoner of Azkaban', '9780747542155', NULL, 1999, NULL, 317, 'Third novel in the Harry Potter series.', 'English', 'SER000000002', 'PUB000000002'),
('Harry Potter and the Goblet of Fire', '9780747546245', NULL, 2000, NULL, 636, 'Fourth novel in the Harry Potter series.', 'English', 'SER000000002', 'PUB000000002'),
('1984', '9780451524935', NULL, 1949, NULL, 328, 'A dystopian social science fiction novel.', 'English', NULL, 'PUB000000003'),
('Animal Farm', '9780451526342', NULL, 1945, NULL, 112, 'Allegorical novella reflecting events leading up to the Russian Revolution.', 'English', NULL, 'PUB000000003'),
('Brave New World', '9780060850524', NULL, 1932, NULL, 268, 'Dystopian novel set in futuristic World State.', 'English', NULL, 'PUB000000004'),
('Frankenstein', '9780141439471', NULL, 1818, NULL, 280, 'Gothic novel about Victor Frankenstein creating life.', 'English', NULL, 'PUB000000005'),
('Godaan', '9788170285985', NULL, 1936, NULL, 318, 'The story of a poor peasant and the social injustices in rural India.', 'Hindi', NULL, 'PUB000000006'),
('Karmabhoomi', '9788170285992', NULL, 1932, NULL, 312, 'Premchand\'s novel about nationalism and non-violent resistance.', 'Hindi', NULL, 'PUB000000006'),
('Nirmala', NULL, NULL, 1928, NULL, 301, 'A powerful critique of dowry system in India.', 'Hindi', NULL, 'PUB000000006'),
('Gitanjali', '9780143418993', NULL, 1910, NULL, 104, 'Collection of poems by Rabindranath Tagore.', 'Hindi', NULL, 'PUB000000007'),
('Kabuliwala', NULL, NULL, 1892, NULL, 32, 'Short story about a Pashtun merchant.', 'Hindi', NULL, 'PUB000000007'),
('The Jungle Book', '9781503332547', NULL, 1894, NULL, 320, 'Stories of a boy raised by wolves in Indian jungle.', 'English', NULL, 'PUB000000008'),
('Journey to the Center of the Earth', '9780451532152', NULL, 1864, NULL, 183, 'Science fiction novel about subterranean adventure.', 'English', NULL, 'PUB000000008'),
('Malgudi Days', '9788185986178', NULL, 1943, NULL, 247, 'Short stories set in the fictional town of Malgudi.', 'English', NULL, 'PUB000000008'),
('Swami and Friends', '9788185986109', NULL, 1935, NULL, 259, 'Coming of age story set in Malgudi.', 'English', NULL, 'PUB000000008'),
('Midnight\'s Children', '9780099578512', NULL, 1981, NULL, 647, 'Novel of India\'s transition from British colonialism to independence.', 'English', NULL, 'PUB000000001'),
('The God of Small Things', '9780812979657', NULL, 1997, NULL, 340, 'Story of fraternal twins in Kerala, India.', 'English', NULL, 'PUB000000002'),
('Kafka on the Shore', '9781400079278', NULL, 2002, NULL, 505, 'Complex, metaphysical novel.', 'English', NULL, 'PUB000000003'),
('Norwegian Wood', '9780375704024', NULL, 1987, NULL, 296, 'Romantic coming-of-age story.', 'English', NULL, 'PUB000000003'),
('The Alchemist', '9780061122415', NULL, 1988, NULL, 208, 'A shepherd\'s journey to the pyramids of Egypt.', 'English', NULL, 'PUB000000001'),
('Veronika Decides to Die', '9780061124266', NULL, 1998, NULL, 224, 'A young woman explores life after a failed suicide attempt.', 'English', NULL, 'PUB000000001'),
('Pride and Prejudice', '9780141439518', NULL, 1813, NULL, 279, 'A romantic novel of manners.', 'English', NULL, 'PUB000000002'),
('Sense and Sensibility', '9780141439662', NULL, 1811, NULL, 409, 'Tale of two sisters navigating love and heartbreak.', 'English', NULL, 'PUB000000002'),
('Crime and Punishment', '9780140449136', NULL, 1866, NULL, 671, 'Psychological drama of guilt and redemption.', 'English', NULL, 'PUB000000003'),
('The Brothers Karamazov', '9780374528379', NULL, 1880, NULL, 796, 'Philosophical novel about faith, doubt, and reason.', 'English', NULL, 'PUB000000003'),
('To Kill a Mockingbird', '9780061120084', NULL, 1960, NULL, 336, 'Story of racial injustice in the Deep South.', 'English', NULL, 'PUB000000004'),
('Go Set a Watchman', '9780062409850', NULL, 2015, NULL, 278, 'Prequel/sequel to To Kill a Mockingbird.', 'English', NULL, 'PUB000000004'),
('The Catcher in the Rye', '9780316769488', NULL, 1951, NULL, 277, 'Story of teenage angst and alienation.', 'English', NULL, 'PUB000000005'),
('One Hundred Years of Solitude', '9780060883280', NULL, 1967, NULL, 417, 'Epic tale of the Buendía family.', 'English', NULL, 'PUB000000006'),
('Love in the Time of Cholera', '9780307389732', NULL, 1985, NULL, 368, 'Romantic story set in Colombia.', 'English', NULL, 'PUB000000006'),
('The Kite Runner', '9781594631931', NULL, 2003, NULL, 371, 'Friendship and betrayal in Afghanistan.', 'English', NULL, 'PUB000000007'),
('A Thousand Splendid Suns', '9781594483851', NULL, 2007, NULL, 384, 'Story of two women in Afghanistan.', 'English', NULL, 'PUB000000007'),
('Shatranj ke Khiladi', NULL, NULL, 1924, NULL, 45, 'Short story about two chess-obsessed noblemen.', 'Hindi', NULL, 'PUB000000006'),
('Sevasadan', NULL, NULL, 1919, NULL, 102, 'Social novel criticizing the exploitation of women.', 'Hindi', NULL, 'PUB000000006'),
('Madhushala', '9788170286050', NULL, 1935, NULL, 133, 'Poetry collection by Harivansh Rai Bachchan.', 'Hindi', NULL, 'PUB000000007');


select * from book;


INSERT INTO Book_To_Author (Book_ID, Author_ID)
VALUES
('B00000000001', 'AUT000000001'), -- The Fellowship of the Ring => Tolkien
('B00000000002', 'AUT000000001'), -- The Two Towers => Tolkien
('B00000000003', 'AUT000000001'), -- The Return of the King => Tolkien
('B00000000004', 'AUT000000002'), -- Harry Potter and the Philosopher's Stone => Rowling
('B00000000005', 'AUT000000002'), -- Harry Potter and the Chamber of Secrets => Rowling
('B00000000006', 'AUT000000002'), -- Harry Potter and the Prisoner of Azkaban => Rowling
('B00000000007', 'AUT000000002'), -- Harry Potter and the Goblet of Fire => Rowling
('B00000000008', 'AUT000000003'), -- 1984 => Orwell
('B00000000009', 'AUT000000003'), -- Animal Farm => Orwell
('B00000000010', 'AUT000000004'), -- Brave New World => Huxley
('B00000000011', 'AUT000000005'), -- Frankenstein => Shelley
('B00000000012', 'AUT000000006'), -- Godaan => Premchand
('B00000000013', 'AUT000000006'), -- Karmabhoomi => Premchand
('B00000000014', 'AUT000000006'), -- Nirmala => Premchand
('B00000000015', 'AUT000000007'), -- Gitanjali => Tagore
('B00000000016', 'AUT000000007'), -- Kabuliwala => Tagore
('B00000000017', 'AUT000000008'), -- The Jungle Book => Kipling
('B00000000018', 'AUT000000009'), -- Journey to the Center of the Earth => Verne
('B00000000019', 'AUT000000010'), -- Malgudi Days => Narayan
('B00000000020', 'AUT000000010'), -- Swami and Friends => Narayan
('B00000000021', 'AUT000000011'), -- Midnight's Children => Rushdie
('B00000000022', 'AUT000000012'), -- The God of Small Things => Roy
('B00000000023', 'AUT000000013'), -- Kafka on the Shore => Murakami
('B00000000024', 'AUT000000013'), -- Norwegian Wood => Murakami
('B00000000025', 'AUT000000014'), -- The Alchemist => Coelho
('B00000000026', 'AUT000000014'), -- Veronika Decides to Die => Coelho
('B00000000027', 'AUT000000015'), -- Pride and Prejudice => Austen
('B00000000028', 'AUT000000015'), -- Sense and Sensibility => Austen
('B00000000029', 'AUT000000016'), -- Crime and Punishment => Dostoevsky
('B00000000030', 'AUT000000016'), -- The Brothers Karamazov => Dostoevsky
('B00000000031', 'AUT000000017'), -- To Kill a Mockingbird => Harper Lee
('B00000000032', 'AUT000000017'), -- Go Set a Watchman => Harper Lee
('B00000000033', 'AUT000000018'), -- The Catcher in the Rye => J.D. Salinger
('B00000000034', 'AUT000000019'), -- One Hundred Years of Solitude => Gabriel García Márquez
('B00000000035', 'AUT000000019'), -- Love in the Time of Cholera => Gabriel García Márquez
('B00000000036', 'AUT000000020'), -- The Kite Runner => Khaled Hosseini
('B00000000037', 'AUT000000020'), -- A Thousand Splendid Suns => Khaled Hosseini
('B00000000038', 'AUT000000006'), -- Shatranj ke Khiladi => Premchand
('B00000000039', 'AUT000000006'), -- Sevasadan => Premchand
('B00000000040', 'AUT000000021'); -- Madhushala => Harivansh Rai Bachchan


INSERT INTO Book_To_Category (Book_ID, Category_ID) VALUES
('B00000000001', 'CAT000000001'), -- The Fellowship of the Ring -> Fantasy
('B00000000002', 'CAT000000001'), -- The Two Towers -> Fantasy
('B00000000003', 'CAT000000001'), -- The Return of the King -> Fantasy
('B00000000004', 'CAT000000001'), -- Harry Potter and the Philosopher's Stone -> Fantasy
('B00000000005', 'CAT000000001'), -- Harry Potter and the Chamber of Secrets -> Fantasy
('B00000000006', 'CAT000000001'), -- Harry Potter and the Prisoner of Azkaban -> Fantasy
('B00000000007', 'CAT000000001'), -- Harry Potter and the Goblet of Fire -> Fantasy
('B00000000008', 'CAT000000003'), -- 1984 -> Dystopian
('B00000000009', 'CAT000000019'), -- Animal Farm -> Satire
('B00000000010', 'CAT000000002'), -- Brave New World -> Science Fiction
('B00000000011', 'CAT000000004'), -- Frankenstein -> Classic Literature
('B00000000012', 'CAT000000006'), -- Godaan -> Hindi Literature
('B00000000013', 'CAT000000006'), -- Karmabhoomi -> Hindi Literature
('B00000000014', 'CAT000000006'), -- Nirmala -> Hindi Literature
('B00000000015', 'CAT000000011'), -- Gitanjali -> Poetry
('B00000000016', 'CAT000000019'), -- Kabuliwala -> Short Stories
('B00000000017', 'CAT000000010'), -- The Jungle Book -> Children's Literature
('B00000000018', 'CAT000000002'), -- Journey to the Center of the Earth -> Science Fiction
('B00000000019', 'CAT000000019'), -- Malgudi Days -> Short Stories
('B00000000020', 'CAT000000010'), -- Swami and Friends -> Children's Literature
('B00000000021', 'CAT000000004'), -- Midnight's Children -> Historical Fiction
('B00000000022', 'CAT000000004'), -- The God of Small Things -> Historical Fiction
('B00000000023', 'CAT000000012'), -- Kafka on the Shore -> Philosophy
('B00000000024', 'CAT000000013'), -- Norwegian Wood -> Romance
('B00000000025', 'CAT000000017'), -- The Alchemist -> Spiritual
('B00000000026', 'CAT000000016'), -- Veronika Decides to Die -> Self Help
('B00000000027', 'CAT000000013'), -- Pride and Prejudice -> Romance
('B00000000028', 'CAT000000013'), -- Sense and Sensibility -> Romance
('B00000000029', 'CAT000000004'), -- Crime and Punishment -> Classic Literature
('B00000000030', 'CAT000000004'), -- The Brothers Karamazov -> Classic Literature
('B00000000031', 'CAT000000004'), -- To Kill a Mockingbird -> Classic Literature
('B00000000032', 'CAT000000004'), -- Go Set a Watchman -> Classic Literature
('B00000000033', 'CAT000000004'), -- The Catcher in the Rye -> Classic Literature
('B00000000034', 'CAT000000004'), -- One Hundred Years of Solitude -> Classic Literature
('B00000000035', 'CAT000000004'), -- Love in the Time of Cholera -> Classic Literature
('B00000000036', 'CAT000000004'), -- The Kite Runner -> Historical Fiction
('B00000000037', 'CAT000000004'), -- A Thousand Splendid Suns -> Historical Fiction
('B00000000038', 'CAT000000006'), -- Shatranj ke Khiladi -> Hindi Literature
('B00000000039', 'CAT000000006'), -- Sevasadan -> Hindi Literature
('B00000000040', 'CAT000000011'); -- Madhushala -> Poetry (fixed: was incorrectly B00000000039)

-- delete from Book_To_Category;-- 
SELECT * FROM Book_To_Category;

INSERT INTO Likes (User_ID, Book_ID) VALUES
('USE000000001', 'B00000000001'),
('USE000000001', 'B00000000002'),
('USE000000002', 'B00000000003'),
('USE000000002', 'B00000000004'),
('USE000000003', 'B00000000005'),
('USE000000003', 'B00000000006'),
('USE000000004', 'B00000000007'),
('USE000000004', 'B00000000008'),
('USE000000005', 'B00000000009'),
('USE000000005', 'B00000000010'),
('USE000000006', 'B00000000011'),
('USE000000006', 'B00000000012'),
('USE000000007', 'B00000000013'),
('USE000000007', 'B00000000014'),
('USE000000008', 'B00000000015'),
('USE000000008', 'B00000000016'),
('USE000000009', 'B00000000017'),
('USE000000009', 'B00000000018'),
('USE000000010', 'B00000000019'),
('USE000000010', 'B00000000020'),
('USE000000011', 'B00000000021'),
('USE000000012', 'B00000000022'),
('USE000000013', 'B00000000023'),
('USE000000014', 'B00000000024'),
('USE000000015', 'B00000000025'),
('USE000000016', 'B00000000026'),
('USE000000017', 'B00000000027'),
('USE000000018', 'B00000000028'),
('USE000000019', 'B00000000029'),
('USE000000020', 'B00000000030'),
('USE000000021', 'B00000000031'),
('USE000000022', 'B00000000032'),
('USE000000023', 'B00000000033'),
('USE000000024', 'B00000000034'),
('USE000000025', 'B00000000035'),
('USE000000026', 'B00000000036'),
('USE000000027', 'B00000000037'),
('USE000000028', 'B00000000038'),
('USE000000029', 'B00000000039'),
('USE000000030', 'B00000000040'),
('USE000000031', 'B00000000001'),
('USE000000031', 'B00000000002'),
('USE000000032', 'B00000000003'),
('USE000000032', 'B00000000004'),
('USE000000033', 'B00000000005'),
('USE000000033', 'B00000000006'),
('USE000000034', 'B00000000007'),
('USE000000034', 'B00000000008'),
('USE000000035', 'B00000000009'),
('USE000000035', 'B00000000010'),
('USE000000036', 'B00000000011'),
('USE000000036', 'B00000000012'),
('USE000000037', 'B00000000013'),
('USE000000037', 'B00000000014'),
('USE000000038', 'B00000000015'),
('USE000000038', 'B00000000016'),
('USE000000039', 'B00000000017'),
('USE000000039', 'B00000000018'),
('USE000000001', 'B00000000019'),
('USE000000002', 'B00000000020'),
('USE000000003', 'B00000000021'),
('USE000000004', 'B00000000022'),
('USE000000005', 'B00000000023'),
('USE000000006', 'B00000000024'),
('USE000000007', 'B00000000025'),
('USE000000008', 'B00000000026'),
('USE000000009', 'B00000000027'),
('USE000000010', 'B00000000028'),
('USE000000011', 'B00000000029'),
('USE000000012', 'B00000000030'),
('USE000000013', 'B00000000031'),
('USE000000014', 'B00000000032'),
('USE000000015', 'B00000000033'),
('USE000000016', 'B00000000034'),
('USE000000017', 'B00000000035'),
('USE000000018', 'B00000000036'),
('USE000000019', 'B00000000037'),
('USE000000020', 'B00000000038'),
('USE000000021', 'B00000000039'),
('USE000000022', 'B00000000040'),
('USE000000023', 'B00000000001'),
('USE000000024', 'B00000000002'),
('USE000000025', 'B00000000003'),
('USE000000026', 'B00000000004'),
('USE000000027', 'B00000000005'),
('USE000000028', 'B00000000006'),
('USE000000029', 'B00000000007'),
('USE000000030', 'B00000000008'),
('USE000000031', 'B00000000009'),
('USE000000032', 'B00000000010'),
('USE000000033', 'B00000000011'),
('USE000000034', 'B00000000012'),
('USE000000035', 'B00000000013'),
('USE000000036', 'B00000000014'),
('USE000000037', 'B00000000015'),
('USE000000039', 'B00000000007');




INSERT INTO Bookmarks (Bookmark_Note, Page_Number, Bookmark_Date, User_ID, Book_ID) VALUES
('Loved this quote about perseverance.', 45, '2025-04-12', 'USE000000013', 'B00000000011'),
('Key turning point of the story.', 120, '2025-04-13', 'USE000000014', 'B00000000012'),
('Interesting fact about the main character.', 78, '2025-04-13', 'USE000000015', 'B00000000013'),
('Chapter that confused me a bit.', 32, '2025-04-14', 'USE000000016', 'B00000000014'),
('Really emotional moment.', 203, '2025-04-14', 'USE000000017', 'B00000000015'),
('Lovely description of nature.', 55, '2025-04-15', 'USE000000018', 'B00000000016'),
('A major revelation happens here.', 150, '2025-04-15', 'USE000000019', 'B00000000017'),
('Funny interaction between characters.', 88, '2025-04-16', 'USE000000020', 'B00000000018'),
('Life advice worth noting.', 210, '2025-04-16', 'USE000000021', 'B00000000019'),
('Motivational quote.', 23, '2025-04-17', 'USE000000022', 'B00000000020'),
('This twist changed everything!', 67, '2025-04-17', 'USE000000023', 'B00000000021'),
('Foreshadowing of the climax.', 98, '2025-04-18', 'USE000000024', 'B00000000022'),
('Nice philosophical discussion.', 142, '2025-04-18', 'USE000000025', 'B00000000023'),
('Loved the setting described here.', 34, '2025-04-19', 'USE000000003', 'B00000000002'),
('Character’s backstory explained.', 115, '2025-04-20', 'USE000000004', 'B00000000003'),
('Plot hole? Need to think.', 90, '2025-04-20', 'USE000000006', 'B00000000005'),
('Insightful monologue.', 56, '2025-04-21', 'USE000000008', 'B00000000007'),
('Poetic ending.', 300, '2025-04-22', 'USE000000010', 'B00000000009');

INSERT INTO Bookmarks (Bookmark_Note, Page_Number, Bookmark_Date, User_ID, Book_ID) VALUES
('First hint about the villain.', 45, '2025-04-12', 'USE000000013', 'B00000000011'),
('Villain’s plan revealed.', 220, '2025-04-15', 'USE000000013', 'B00000000011'),

('Initial philosophy mentioned.', 30, '2025-04-13', 'USE000000014', 'B00000000012'),
('Deep discussion on morality.', 130, '2025-04-17', 'USE000000014', 'B00000000012'),

('Beautiful metaphor.', 77, '2025-04-14', 'USE000000016', 'B00000000014'),
('Emotional confrontation.', 190, '2025-04-18', 'USE000000016', 'B00000000014'),

('Unexpected character development.', 155, '2025-04-15', 'USE000000019', 'B00000000017'),
('Touching family scene.', 178, '2025-04-19', 'USE000000019', 'B00000000017'),

('Mystery deepens.', 87, '2025-04-16', 'USE000000020', 'B00000000018'),
('Shocking twist!', 200, '2025-04-20', 'USE000000020', 'B00000000018'),

('Motivational story.', 22, '2025-04-17', 'USE000000022', 'B00000000020'),
('Lessons learned.', 208, '2025-04-21', 'USE000000022', 'B00000000020');






INSERT INTO Reviews (User_ID, Book_ID, Review_Text, Review_Date, Rating) VALUES
('USE000000013', 'B00000000011', 'Beautifully written, really enjoyed the narrative style.', '2025-04-11', 5),
('USE000000014', 'B00000000012', 'The storyline felt repetitive and boring.', '2025-04-12', 2),
('USE000000015', 'B00000000013', 'A timeless classic. It deserves all the praise.', '2025-04-12', 5),
('USE000000016', 'B00000000014', 'Interesting concept but poor execution.', '2025-04-13', 3),
('USE000000017', 'B00000000015', 'Loved the depth of characters and world-building.', '2025-04-13', 5),
('USE000000018', 'B00000000016', 'Not my type of book, struggled to finish.', '2025-04-14', 2),
('USE000000019', 'B00000000017', 'Couldn’t put it down! A thrilling masterpiece.', '2025-04-14', 5),
('USE000000020', 'B00000000018', 'A decent book but not memorable.', '2025-04-15', 3),
('USE000000021', 'B00000000019', 'Incredible writing. Every page was a delight.', '2025-04-16', 5),
('USE000000022', 'B00000000020', 'Confusing at times, needed more clarity.', '2025-04-17', 2),
('USE000000023', 'B00000000021', 'A satisfying story arc and rich characters.', '2025-04-17', 4),
('USE000000024', 'B00000000022', 'Found some parts unnecessarily dragged out.', '2025-04-18', 3),
('USE000000025', 'B00000000023', 'A heartwarming story. Highly recommend.', '2025-04-18', 5),
('USE000000003', 'B00000000002', 'A fun read, kept me entertained throughout.', '2025-04-19', 4),
('USE000000004', 'B00000000003', 'Cleverly crafted plot with witty dialogues.', '2025-04-20', 5),
('USE000000006', 'B00000000005', 'Not as good as the hype suggested.', '2025-04-20', 3),
('USE000000008', 'B00000000007', 'Loved the ending! Very satisfying.', '2025-04-21', 5),
('USE000000010', 'B00000000009', 'The plot twist blew my mind. Amazing!', '2025-04-22', 5);


INSERT INTO Gamification (Gamification_ID, Badge_Name, Streak, Leaderboard_Rank, Last_Activity_Date, Points_Earned, User_ID) VALUES
('GAM000000001', 'Bookworm', 12, 5, '2025-04-26', 410, 'USE000000001'),
('GAM000000002', 'Top Reviewer', 15, 3, '2025-04-27', 580, 'USE000000002'),
('GAM000000003', 'Literary Explorer', 5, 10, '2025-04-24', 280, 'USE000000003'),
('GAM000000004', 'Bookworm', 7, 12, '2025-04-25', 320, 'USE000000004'),
('GAM000000005', 'Speed Reader', 21, 2, '2025-04-27', 720, 'USE000000005'),
('GAM000000006', 'Bookworm', 4, 15, '2025-04-20', 190, 'USE000000006'),
('GAM000000007', 'Streak Master', 25, 1, '2025-04-27', 880, 'USE000000007'),
('GAM000000008', 'Literary Explorer', 8, 9, '2025-04-23', 340, 'USE000000008'),
('GAM000000009', 'Bookworm', 6, 11, '2025-04-22', 270, 'USE000000009'),
('GAM000000010', 'Top Reviewer', 18, 4, '2025-04-26', 600, 'USE000000010'),
('GAM000000011', 'Bookworm', 5, 14, '2025-04-25', 250, 'USE000000011'),
('GAM000000012', 'Speed Reader', 20, 6, '2025-04-27', 700, 'USE000000012'),
('GAM000000013', 'Literary Explorer', 7, 13, '2025-04-21', 310, 'USE000000013'),
('GAM000000014', 'Bookworm', 3, 17, '2025-04-20', 150, 'USE000000014'),
('GAM000000015', 'Bookworm', 2, 19, '2025-04-19', 130, 'USE000000015'),
('GAM000000016', 'Top Reviewer', 10, 7, '2025-04-25', 450, 'USE000000016'),
('GAM000000017', 'Streak Master', 22, 2, '2025-04-27', 810, 'USE000000017'),
('GAM000000018', 'Bookworm', 6, 16, '2025-04-24', 240, 'USE000000018'),
('GAM000000019', 'Literary Explorer', 8, 10, '2025-04-23', 370, 'USE000000019'),
('GAM000000020', 'Bookworm', 5, 18, '2025-04-22', 200, 'USE000000020');



-- Missing downloads for bookmarks - inserting
INSERT INTO Offline_Content (User_ID, Book_ID, Page_Number, Last_Accessed, Download_Date)
VALUES
('USE000000013', 'B00000000011', 45, '2025-04-12', '2025-04-11'),
('USE000000014', 'B00000000012', 120, '2025-04-13', '2025-04-12'),
('USE000000015', 'B00000000013', 78, '2025-04-13', '2025-04-12'),
('USE000000016', 'B00000000014', 32, '2025-04-14', '2025-04-13'),
('USE000000017', 'B00000000015', 203, '2025-04-14', '2025-04-13'),
('USE000000018', 'B00000000016', 55, '2025-04-15', '2025-04-14'),
('USE000000019', 'B00000000017', 150, '2025-04-15', '2025-04-14'),
('USE000000020', 'B00000000018', 88, '2025-04-16', '2025-04-15'),
('USE000000021', 'B00000000019', 210, '2025-04-16', '2025-04-15'),
('USE000000022', 'B00000000020', 23, '2025-04-17', '2025-04-16'),
('USE000000023', 'B00000000021', 67, '2025-04-17', '2025-04-16'),
('USE000000024', 'B00000000022', 98, '2025-04-18', '2025-04-17'),
('USE000000025', 'B00000000023', 142, '2025-04-18', '2025-04-17'),
('USE000000003', 'B00000000002', 34, '2025-04-19', '2025-04-18'),
('USE000000004', 'B00000000003', 115, '2025-04-20', '2025-04-19'),
('USE000000006', 'B00000000005', 90, '2025-04-20', '2025-04-19'),
('USE000000008', 'B00000000007', 56, '2025-04-21', '2025-04-20'),
('USE000000010', 'B00000000009', 300, '2025-04-22', '2025-04-21');


INSERT INTO Offline_Content (User_ID, Book_ID, Page_Number, Last_Accessed, Download_Date)
VALUES
('USE000000001', 'B00000000001', 10, '2025-03-02', '2025-03-01'),
('USE000000001', 'B00000000002', 15, '2025-03-03', '2025-03-01'),
('USE000000001', 'B00000000003', 20, '2025-03-04', '2025-03-01'),
('USE000000001', 'B00000000004', 25, '2025-03-05', '2025-03-01'),
('USE000000002', 'B00000000005', 30, '2025-03-06', '2025-03-04'),
('USE000000002', 'B00000000006', 35, '2025-03-07', '2025-03-04'),
('USE000000002', 'B00000000007', 40, '2025-03-08', '2025-03-04'),
('USE000000003', 'B00000000008', 45, '2025-03-09', '2025-03-08'),
('USE000000003', 'B00000000009', 50, '2025-03-10', '2025-03-08'),
('USE000000003', 'B00000000010', 55, '2025-03-11', '2025-03-08'),
('USE000000004', 'B00000000011', 60, '2025-03-12', '2025-03-10'),
('USE000000004', 'B00000000012', 65, '2025-03-13', '2025-03-10'),
('USE000000004', 'B00000000013', 70, '2025-03-14', '2025-03-10'),
('USE000000005', 'B00000000014', 75, '2025-03-15', '2025-03-13'),
('USE000000005', 'B00000000015', 80, '2025-03-16', '2025-03-13'),
('USE000000006', 'B00000000016', 85, '2025-03-17', '2025-03-15'),
('USE000000006', 'B00000000017', 90, '2025-03-18', '2025-03-15'),
('USE000000006', 'B00000000018', 95, '2025-03-19', '2025-03-15'),
('USE000000007', 'B00000000019', 20, '2025-03-20', '2025-03-18'),
('USE000000007', 'B00000000020', 25, '2025-03-21', '2025-03-18'),
('USE000000008', 'B00000000021', 30, '2025-03-22', '2025-03-20'),
('USE000000008', 'B00000000022', 35, '2025-03-23', '2025-03-20'),
('USE000000009', 'B00000000023', 40, '2025-03-24', '2025-03-22'),
('USE000000009', 'B00000000024', 45, '2025-03-25', '2025-03-22'),
('USE000000010', 'B00000000025', 50, '2025-03-26', '2025-03-24'),
('USE000000010', 'B00000000026', 55, '2025-03-27', '2025-03-24'),
('USE000000010', 'B00000000027', 60, '2025-03-28', '2025-03-24'),
('USE000000011', 'B00000000028', 65, '2025-03-29', '2025-03-26'),
('USE000000011', 'B00000000029', 70, '2025-03-30', '2025-03-26'),
('USE000000012', 'B00000000030', 75, '2025-03-31', '2025-03-28'),
('USE000000012', 'B00000000031', 80, '2025-04-01', '2025-03-28'),
('USE000000013', 'B00000000032', 85, '2025-04-02', '2025-03-30'),
('USE000000013', 'B00000000033', 90, '2025-04-03', '2025-03-30'),
('USE000000014', 'B00000000034', 95, '2025-04-04', '2025-04-01'),
('USE000000014', 'B00000000035', 15, '2025-04-05', '2025-04-01'),
('USE000000015', 'B00000000036', 20, '2025-04-06', '2025-04-03'),
('USE000000015', 'B00000000037', 25, '2025-04-07', '2025-04-03'),
('USE000000016', 'B00000000038', 30, '2025-04-08', '2025-04-05'),
('USE000000016', 'B00000000039', 35, '2025-04-09', '2025-04-05');

select * from offline_content;


INSERT INTO AI_Recommendation (User_ID, Book_ID, Rank_Order, Date) VALUES
('USE000000001', 'B00000000001', 1, '2025-04-21'),
('USE000000002', 'B00000000002', 2, '2025-04-22'),
('USE000000003', 'B00000000003', 1, '2025-04-22'),
('USE000000004', 'B00000000004', 2, '2025-04-23'),
('USE000000005', 'B00000000005', 1, '2025-04-23'),
('USE000000006', 'B00000000006', 2, '2025-04-24'),
('USE000000007', 'B00000000007', 1, '2025-04-24'),
('USE000000008', 'B00000000008', 2, '2025-04-25'),
('USE000000009', 'B00000000009', 1, '2025-04-25'),
('USE000000010', 'B00000000010', 2, '2025-04-26'),
('USE000000011', 'B00000000011', 1, '2025-04-26'),
('USE000000012', 'B00000000012', 2, '2025-04-27'),
('USE000000013', 'B00000000013', 1, '2025-04-27'),
('USE000000014', 'B00000000014', 2, '2025-04-28'),
('USE000000015', 'B00000000015', 1, '2025-04-28'),
('USE000000016', 'B00000000016', 2, '2025-04-29'),
('USE000000017', 'B00000000017', 1, '2025-04-29'),
('USE000000018', 'B00000000018', 2, '2025-04-30'),
('USE000000019', 'B00000000019', 1, '2025-04-30'),
('USE000000020', 'B00000000020', 2, '2025-05-01'),
('USE000000021', 'B00000000021', 1, '2025-05-01'),
('USE000000022', 'B00000000022', 2, '2025-05-02'),
('USE000000023', 'B00000000023', 1, '2025-05-02'),
('USE000000024', 'B00000000024', 2, '2025-05-03'),
('USE000000025', 'B00000000025', 1, '2025-05-03'),
('USE000000026', 'B00000000026', 2, '2025-05-04'),
('USE000000027', 'B00000000027', 1, '2025-05-04'),
('USE000000028', 'B00000000028', 2, '2025-05-05'),
('USE000000029', 'B00000000029', 1, '2025-05-05'),
('USE000000030', 'B00000000030', 2, '2025-05-06'),
('USE000000031', 'B00000000031', 1, '2025-05-06'),
('USE000000032', 'B00000000032', 2, '2025-05-07'),
('USE000000033', 'B00000000033', 1, '2025-05-07'),
('USE000000034', 'B00000000034', 2, '2025-05-08'),
('USE000000035', 'B00000000035', 1, '2025-05-08'),
('USE000000036', 'B00000000036', 2, '2025-05-09'),
('USE000000037', 'B00000000037', 1, '2025-05-09'),
('USE000000038', 'B00000000038', 2, '2025-05-10');


use library_management;

-- First add a column in User table as subscription_end_date 
ALTER TABLE User add subscription_end_date date;
 SET SQL_SAFE_UPDATES = 0;
 
-- Update prev record to follow the logic 
update User u SET subscription_end_date = (SELECT Payment_Date from transaction t where t.User_ID = u.User_ID);
 SET SQL_SAFE_UPDATES = 1;
select * from user;

-- A trigger to update user subscription_end_date as soon as any transaction is made.

DELIMITER //

CREATE TRIGGER trg_update_subscription_on_transaction
AFTER INSERT ON Transaction
FOR EACH ROW
BEGIN
    DECLARE v_current_end_date DATE;
    DECLARE v_new_end_date DATE;
    DECLARE v_transaction_date TIMESTAMP;
    
    -- 1. Get the current subscription end date for the user
    SELECT subscription_end_date INTO v_current_end_date
    FROM User
    WHERE User_ID = NEW.User_ID;
    
    -- Get the transaction date (from the newly inserted row)
    SET v_transaction_date = NEW.Payment_Date;
    
    -- Determine the new end date based on the logic
    IF v_current_end_date IS NULL OR v_current_end_date < CURDATE() THEN
        -- Case 1: Subscription has expired or doesn't exist (first subscription/past due).
        -- Renewal starts from the transaction date. Add 1 year to the transaction date.
        SET v_new_end_date = DATE_ADD(DATE(v_transaction_date), INTERVAL 1 YEAR);
        
    ELSE
        -- Case 2: Subscription is still active (far from today).
        -- Add 1 year to the existing end date (stacking the subscription).
        SET v_new_end_date = DATE_ADD(v_current_end_date, INTERVAL 1 YEAR);
        
    END IF;
    
    -- 3. Update the User table with the new subscription end date
    UPDATE User
    SET subscription_end_date = v_new_end_date
    WHERE User_ID = NEW.User_ID;
END //

DELIMITER ;

-- Update transaction_ID to store order_ID from razorpay. SO increase column size
ALTER TABLE Transaction
MODIFY COLUMN Transaction_ID VARCHAR(40);

ALTER TABLE Transaction
ADD COLUMN Razorpay_Payment_ID VARCHAR(40) AFTER Transaction_ID;

-- Add default to offline-content download-date
ALTER TABLE Offline_Content MODIFY COLUMN Download_Date DATE DEFAULT (Current_Date);

-- Remove trigger from offline-content
DROP trigger trg_offline_content_before_update;

-- For gamification, add some more entries
ALTER TABLE User
ADD COLUMN Current_Streak INT NOT NULL DEFAULT 0,
ADD COLUMN Longest_Streak INT NOT NULL DEFAULT 0,
ADD COLUMN Last_Read_Date DATE DEFAULT NULL;

-- Add a trigger to manage streaks automatically
DELIMITER $$

CREATE TRIGGER update_streak_after_read
AFTER UPDATE ON Offline_Content
FOR EACH ROW
BEGIN
    DECLARE lastDate DATE;
    DECLARE currentStreak INT;
    DECLARE longestStreak INT;
    DECLARE today DATE;
    DECLARE diffDays INT;

    SET today = CURDATE();

    -- Only update if Last_Accessed actually changes
    IF (NEW.Last_Accessed IS NOT NULL AND (OLD.Last_Accessed IS NULL OR NEW.Last_Accessed <> OLD.Last_Accessed)) THEN

        -- Fetch current streak data
        SELECT Last_Read_Date, Current_Streak, Longest_Streak
        INTO lastDate, currentStreak, longestStreak
        FROM User
        WHERE User_ID = NEW.User_ID
        LIMIT 1;

        IF lastDate IS NULL THEN
            -- First time reading
            UPDATE User
            SET Current_Streak = 1,
                Longest_Streak = 1,
                Last_Read_Date = today
            WHERE User_ID = NEW.User_ID;
        ELSE
            -- Calculate the gap since last reading day
            SET diffDays = DATEDIFF(today, lastDate);

            IF diffDays = 0 THEN
                DO 0;  -- do nothing

            ELSEIF diffDays = 1 THEN
                -- Consecutive reading day
                SET currentStreak = IFNULL(currentStreak, 0) + 1;

                IF currentStreak > IFNULL(longestStreak, 0) THEN
                    SET longestStreak = currentStreak;
                END IF;

                UPDATE User
                SET Current_Streak = currentStreak,
                    Longest_Streak = longestStreak,
                    Last_Read_Date = today
                WHERE User_ID = NEW.User_ID;

            ELSEIF diffDays > 1 THEN
                -- Missed more than one day, reset streak
                UPDATE User
                SET Current_Streak = 1,
                    Last_Read_Date = today
                WHERE User_ID = NEW.User_ID;
            END IF;
        END IF;
    END IF;
END$$

DELIMITER ;