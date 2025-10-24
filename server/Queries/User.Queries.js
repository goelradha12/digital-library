export const insertAVisitorQuery = `INSERT INTO Visitor ( Name, Email, Password, Country)
VALUES (?, ?, ?, ?);`;
// VALUES ('John Doe', 'VH6Z0@example.com, '2025-04-25', 'password123', 'India');

// verify if email is already registered as visitor
export const checkAVisitorEmailQuery = `SELECT * FROM Visitor WHERE Email = ?;`;

// get email and password
export const checkAVisitorQuery = `SELECT * FROM Visitor v
WHERE 
    Email = ?
    AND Password = SHA2(?, 256);`;

export const checkAUserByVisitorIDQuery = `SELECT * FROM User WHERE Visitor_ID = ?;`;

export const checkAUserQuery = `SELECT * FROM User u
JOIN
    Visitor v ON u.Visitor_ID = v.Visitor_ID
WHERE 
    Email = ? 
    AND Password = SHA2(?, 256);`;

export const getAllLikedBooksQuery = `SELECT
    b.Book_ID,
    b.Title,
    b.Publication_Year,
    b.No_of_Pages,
    b.Cover_Image,
    GROUP_CONCAT(DISTINCT a.Author_Name) AS Authors,
    GROUP_CONCAT(DISTINCT c.Category_Name) AS Categories
FROM Likes l
INNER JOIN Book b ON l.Book_ID = b.Book_ID
LEFT JOIN Book_To_Author bta ON b.Book_ID = bta.Book_ID
LEFT JOIN Author a ON bta.Author_ID = a.Author_ID
LEFT JOIN Book_To_Category btc ON b.Book_ID = btc.Book_ID
LEFT JOIN Category c ON btc.Category_ID = c.Category_ID
WHERE l.User_ID = ?
GROUP BY b.Book_ID;`;

export const getAllDownloadedBooksQuery = `
  SELECT
    b.Book_ID,
    b.Title,
    b.Publication_Year,
    b.No_of_Pages,
    b.Cover_Image,
    GROUP_CONCAT(DISTINCT a.Author_Name) AS Authors,
    GROUP_CONCAT(DISTINCT c.Category_Name) AS Categories,
    oc.Percentage_Read,
    oc.Page_Number,
    oc.Last_Accessed
  FROM Offline_Content oc
  INNER JOIN Book b ON oc.Book_ID = b.Book_ID
  LEFT JOIN Book_To_Author bta ON b.Book_ID = bta.Book_ID
  LEFT JOIN Author a ON bta.Author_ID = a.Author_ID
  LEFT JOIN Book_To_Category btc ON b.Book_ID = btc.Book_ID
  LEFT JOIN Category c ON btc.Category_ID = c.Category_ID
  WHERE oc.User_ID = ?
  GROUP BY b.Book_ID
  ORDER BY oc.Last_Accessed DESC;
`;

export const getAllReviewsQuery = `SELECT
    r.Review_Text,
    r.Review_Date,
    r.Rating,
    b.Book_ID,
    b.Title,
    b.Cover_Image
FROM Reviews r
INNER JOIN Book b ON r.Book_ID = b.Book_ID
WHERE r.User_ID = ?
ORDER BY r.Review_Date DESC;`;

export const checkUserByIDQuery = `SELECT * FROM User WHERE User_ID = ?;`;

export const checkSUbscriptionValidityQuery = `SELECT subscription_end_date FROM User WHERE User_ID = ?;`;
