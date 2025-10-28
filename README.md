Minor Project- SEM-03

# Table Schema
-- DROP DATABASE Library_Management; 
CREATE DATABASE Library_Management;

USE Library_Management;

## CREATE TABLE Visitor (
    Visitor_ID VARCHAR(12) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Registration_Date DATE NOT NULL DEFAULT (Current_Date),
    Password VARCHAR(100) NOT NULL,
    Avatar VARCHAR(255) NULL,
    Country VARCHAR (50) NULL
);


## CREATE TABLE User (
    User_ID VARCHAR(12) PRIMARY KEY,
    Start_Date DATE NOT NULL,
    Reward_Points INT DEFAULT 0 CHECK (Reward_Points >= 0),
    Accessibility_Settings JSON,
    Visitor_ID VARCHAR(12) UNIQUE,
    subscription_end_date date,
    Current_Streak INT DEFAULT 0,
    Longest_Streak INT DEFAULT 0,
    Last_Read_Date DATE DEFAULT NULL,
    FOREIGN KEY (Visitor_ID) REFERENCES Visitor(Visitor_ID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

## CREATE TABLE Transaction (
    Transaction_ID VARCHAR(40) PRIMARY KEY,
    User_ID VARCHAR(12) NOT NULL,
    Amount_Paid DECIMAL(10,2) NOT NULL CHECK (Amount_Paid >= 0),
    Razorpay_Payment_ID VARCHAR(40) AFTER Transaction_ID,
    Payment_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Payment_Method VARCHAR(50) NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

## CREATE TABLE Publisher (
    Publisher_ID VARCHAR(12) PRIMARY KEY,
    Publisher_Name VARCHAR(100) NOT NULL
);

## CREATE TABLE Series (
    Series_ID VARCHAR(12) PRIMARY KEY,
    Series_Description TEXT,
    Series_Name VARCHAR(100) NOT NULL
);

## CREATE TABLE Book (
    Book_ID VARCHAR(12) PRIMARY KEY,
    Accession_No VARCHAR(20) NULL,
    Title VARCHAR(100) NOT NULL,
    ISBN_No VARCHAR(20),
    ISSN_No VARCHAR(20) ,
    Publication_Year CHAR(4),
    Cover_Image VARCHAR(255),
    No_of_Pages INT NOT NULL CHECK(No_of_Pages > 0),
    Book_Summary TEXT,
    Language VARCHAR(50) NOT NULL,
    Series_ID VARCHAR(12),
    Publisher_ID VARCHAR(12),
    FOREIGN KEY (Series_ID) REFERENCES Series(Series_ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (Publisher_ID) REFERENCES Publisher(Publisher_ID) ON DELETE SET NULL ON UPDATE CASCADE
);


## CREATE TABLE Notification (
    Status ENUM('seen', 'not seen') NOT NULL,
    Timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Description TEXT,
    User_ID VARCHAR(12),
    PRIMARY KEY (User_ID, Timestamp),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
    ON UPDATE CASCADE
);

## CREATE TABLE Gamification (
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

## CREATE TABLE Bookmarks (
    Bookmarks_ID VARCHAR(12) PRIMARY KEY,
    Bookmark_Note TEXT,
    Page_Number INT NOT NULL CHECK (Page_Number > 0),
    Bookmark_Date DATE NOT NULL,
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

## CREATE TABLE Offline_Content (
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    Page_Number INT NOT NULL CHECK (Page_Number > 0),
    Last_Accessed DATE,
    Download_Date DATE DEFAULT (Current_Date),
    Percentage_Read INT DEFAULT 0 CHECK (Percentage_Read BETWEEN 0 AND 100),
    PRIMARY KEY (User_ID, Book_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_accessed_date
     CHECK (Last_Accessed >= Download_Date)
);


## CREATE TABLE Reviews (
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    Review_Text TEXT NOT NULL,
    Review_Date DATE NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    PRIMARY KEY (User_ID, Book_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

## CREATE TABLE AI_Recommendation (
    Recommendation_ID VARCHAR(12) PRIMARY KEY,
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    Rank_Order INT NOT NULL CHECK (Rank_Order > 0),
    Date DATE NOT NULL,
	FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE ON UPDATE CASCADE

    
);



## CREATE TABLE Category (
    Category_ID VARCHAR(12) PRIMARY KEY,
    Category_Name VARCHAR(100) NOT NULL
);

## CREATE TABLE Author (
    Author_ID VARCHAR(12) PRIMARY KEY,
    Author_Image VARCHAR(255),
    Author_Name VARCHAR(100) NOT NULL,
    Author_Introduction TEXT
);

## CREATE TABLE Likes (
    User_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    PRIMARY KEY (User_ID, Book_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID) ON DELETE CASCADE 
    ON UPDATE CASCADE
);

## CREATE TABLE Book_To_Category (
    Category_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    PRIMARY KEY (Category_ID, Book_ID),
    FOREIGN KEY (Category_ID) REFERENCES Category(Category_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE
);


## CREATE TABLE Book_To_Author (
    Author_ID VARCHAR(12),
    Book_ID VARCHAR(12),
    PRIMARY KEY (Author_ID, Book_ID),
    FOREIGN KEY (Author_ID) REFERENCES Author(Author_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)  ON DELETE CASCADE 
    ON UPDATE CASCADE
);

SHOW TABLES;

# Table Names
- Visitor
- User
- Transaction
- Publisher
- Series
- Book
- Notification
- Gamification
- Bookmarks
- Offline_Content
- Reviews
- AI_Recommendation
- Category
- Author
- Likes
- Book_To_Category
- Book_To_Author