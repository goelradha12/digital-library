export const getAllBooksOfAuthorQuery = `
    SELECT 
      a.Author_ID,
      a.Author_Name AS Authors,
      b.Book_ID,
      b.Title,
      GROUP_CONCAT(DISTINCT c.Category_Name ORDER BY c.Category_Name SEPARATOR ', ') AS Categories
    FROM Author a
    JOIN Book_To_Author ba ON a.Author_ID = ba.Author_ID
    JOIN Book b ON ba.Book_ID = b.Book_ID
    LEFT JOIN Book_To_Category bc ON b.Book_ID = bc.Book_ID
    LEFT JOIN Category c ON bc.Category_ID = c.Category_ID
    WHERE a.Author_ID = ?
    GROUP BY a.Author_ID, a.Author_Name, b.Book_ID, b.Title;
  `;
