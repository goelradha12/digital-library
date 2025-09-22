export const getAllBooksQuery = `SELECT
    b.Book_ID,
    b.Title,
    b.ISBN_No,
    b.ISSN_No,
    b.Publication_Year,
    b.Cover_Image,
    b.No_of_Pages,
    b.Book_Summary,
    b.Language,
    b.Accession_No,
    s.Series_ID AS SeriesID,
    s.Series_Name AS SeriesName,
    s.Series_Description,
    p.Publisher_ID AS PublisherID,
    p.Publisher_Name AS PublisherName,
    GROUP_CONCAT(DISTINCT a.Author_Name) AS Authors,
    GROUP_CONCAT(DISTINCT a.Author_Image) AS Author_Images,
    GROUP_CONCAT(DISTINCT a.Author_Introduction) AS Author_Introductions,
    GROUP_CONCAT(DISTINCT c.Category_Name) AS Categories
    FROM
    Book AS b
    LEFT JOIN
    Series AS s ON b.Series_ID = s.Series_ID
    LEFT JOIN
    Publisher AS p ON b.Publisher_ID = p.Publisher_ID
    LEFT JOIN
    Book_To_Author AS bta ON b.Book_ID = bta.Book_ID
    LEFT JOIN
    Author AS a ON bta.Author_ID = a.Author_ID
    LEFT JOIN
    Book_To_Category AS btc ON b.Book_ID = btc.Book_ID
    LEFT JOIN
    Category AS c ON btc.Category_ID = c.Category_ID
    GROUP BY
    b.Book_ID;`;

export const getBookByIDQuery = `SELECT
        b.Book_ID,
        b.Title,
        b.ISBN_No,
        b.ISSN_No,
        b.Publication_Year,
        b.Cover_Image,
        b.No_of_Pages,
        b.Book_Summary,
        b.Language,
        b.Accession_No,
        s.Series_ID AS SeriesID,
        s.Series_Name AS SeriesName,
        s.Series_Description,
        p.Publisher_ID AS PublisherID,
        p.Publisher_Name AS PublisherName,
        GROUP_CONCAT(DISTINCT a.Author_ID) AS AuthorIDs,
        GROUP_CONCAT(DISTINCT a.Author_Name) AS Authors,
        GROUP_CONCAT(DISTINCT a.Author_Image) AS Author_Images,
        GROUP_CONCAT(DISTINCT a.Author_Introduction) AS Author_Introductions,
        GROUP_CONCAT(DISTINCT c.Category_Name) AS Categories
        FROM
        Book AS b
        LEFT JOIN
        Series AS s ON b.Series_ID = s.Series_ID
        LEFT JOIN
        Publisher AS p ON b.Publisher_ID = p.Publisher_ID
        LEFT JOIN
        Book_To_Author AS bta ON b.Book_ID = bta.Book_ID
        LEFT JOIN
        Author AS a ON bta.Author_ID = a.Author_ID
        LEFT JOIN
        Book_To_Category AS btc ON b.Book_ID = btc.Book_ID
        LEFT JOIN
        Category AS c ON btc.Category_ID = c.Category_ID
        WHERE
        b.Book_ID = ?
        GROUP BY
        b.Book_ID;`;

export const getLikesOfBookQuery = `SELECT COUNT(*) AS total_likes FROM Likes WHERE Book_ID = ?;`;

export const getDownloadsOfBookQuery = `SELECT COUNT(*) AS total_downloads FROM Offline_Content WHERE Book_ID = ?;`;

export const getReviewsOfABookQuery = `SELECT 
  r.User_ID,
  r.Review_Text,
  r.Review_Date,
  r.Rating,
  v.Name AS VisitorName
FROM Reviews r
INNER JOIN User u
  ON r.User_ID = u.User_ID
INNER JOIN Visitor v
  ON u.Visitor_ID = v.Visitor_ID
WHERE 
  r.Book_ID = ?
ORDER BY
r.Review_Date DESC;`;
