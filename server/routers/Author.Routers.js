import { Router } from "express";
const router = Router();
import pool from "../db.js";

// For pool initialization
const conn = await pool.getConnection();

// get all book by a author_ID
router.get("/:id", async (req, res) => {
  const authorID = req.params.id;
  if (!authorID) {
    res.status(400).send("Author ID is required");
    return;
  }
  const query = `SELECT 
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
WHERE a.Author_ID = '${authorID}'   -- put your Author_ID here
GROUP BY a.Author_ID, a.Author_Name, b.Book_ID, b.Title;
`;
  const [rows] = await conn.query(query);

  if (!rows) {
    res.status(400).send("Invalid Id");
    return;
  }
  res.send(rows);
});

// Release the connection when finished!
pool.releaseConnection(conn);

export default router;
