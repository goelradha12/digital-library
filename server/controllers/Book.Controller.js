import { getAllBooksQuery, getBookByIDQuery } from "../Queries/Book.Queries.js";
import pool from "../db.js";

export async function getAllBooks(req, res) {
  try {
    // For pool initialization
    const conn = await pool.getConnection();

    const query = getAllBooksQuery();
    const [result, field] = await conn.query(query);
    // Release the connection when finished!
    pool.releaseConnection(conn);
    console.log(result, field);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

export async function getBookByID(req, res) {
  const bookID = req.params.id;
  if (!bookID) {
    res.status(400).send("Book ID is required");
    return;
  }
  const query = getBookByIDQuery(bookID);
  try {
    // For pool initialization
    const conn = await pool.getConnection();
    const [result, field] = await conn.query(query);
    // Release the connection when finished!
    pool.releaseConnection(conn);
    if (result.length === 0) {
      res.status(404).send("Book not found");
    }
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
