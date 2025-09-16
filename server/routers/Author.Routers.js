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
  const query = `SELECT * FROM Book WHERE Author_ID = ${authorID}`;
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
