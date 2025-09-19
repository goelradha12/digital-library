export function getAllBooksQuery() {
  const getAllBooks = `SELECT
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
  return getAllBooks;
}

export function getBookByIDQuery(bookID) {
  const getAllBooks = `SELECT
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
        b.Book_ID = "${bookID}"
        GROUP BY
        b.Book_ID;`;
  return getAllBooks;
}
