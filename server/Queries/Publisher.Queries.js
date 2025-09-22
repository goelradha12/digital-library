export const getAllPublishersQuery = `SELECT * from Publisher;`;

export const getBooksOfPublisherQuery = `SELECT
  b.Book_ID,
  b.Title,
  b.Publication_Year,
  b.No_of_Pages,
  p.Publisher_Name AS PublisherName,
  GROUP_CONCAT(DISTINCT a.Author_Name) AS Authors,
  GROUP_CONCAT(DISTINCT c.Category_Name) AS Categories
FROM Book b
INNER JOIN Publisher p
  ON b.Publisher_ID = p.Publisher_ID
LEFT JOIN Book_To_Author bta
  ON b.Book_ID = bta.Book_ID
LEFT JOIN Author a
  ON bta.Author_ID = a.Author_ID
LEFT JOIN Book_To_Category btc
  ON b.Book_ID = btc.Book_ID
LEFT JOIN Category c
  ON btc.Category_ID = c.Category_ID
WHERE
  b.Publisher_ID = ?
GROUP BY
  b.Book_ID;
`;

export const getPublisherByIDQuery = `SELECT * from Publisher WHERE Publisher_ID = ?;`;
