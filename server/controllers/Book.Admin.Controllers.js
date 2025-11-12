import { getAllBooksQuery } from "../Queries/Book.Queries.js";
import { dbquery } from "../utils/db.helper.js";

export async function getAllBooks(req, res) {
  try {
    const books = await dbquery(getAllBooksQuery);
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Failed to fetch books" });
  }
}

/** Add Book */
export async function addBook(req, res, next) {
  try {
    const {
      Title,
      ISBN_No,
      ISSN_No,
      Publication_Year,
      No_of_Pages,
      Book_Summary,
      Language,
      Series_ID,
      Publisher_ID,
    } = req.body;

    const Cover_Image = req.file ? req.file.path : null;

    const sql = `
      INSERT INTO Book (Title, ISBN_No, ISSN_No, Publication_Year, No_of_Pages,
      Book_Summary, Language, Series_ID, Publisher_ID, Cover_Image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await dbquery(sql, [
      Title,
      ISBN_No,
      ISSN_No,
      Publication_Year,
      No_of_Pages,
      Book_Summary,
      Language,
      Series_ID || null,
      Publisher_ID || null,
      Cover_Image,
    ]);

    res.json({ message: "Book added successfully" });
  } catch (err) {
    next(err);
  }
}

/** Edit Book */
export async function editBook(req, res, next) {
  try {
    const id = req.params.id;
    const {
      Title,
      ISBN_No,
      ISSN_No,
      Publication_Year,
      No_of_Pages,
      Book_Summary,
      Language,
      Series_ID,
      Publisher_ID,
    } = req.body;
    const Cover_Image = req.file ? req.file.path : null;

    const sql = `
      UPDATE Book
      SET Title=?, ISBN_No=?, ISSN_No=?, Publication_Year=?, No_of_Pages=?,
          Book_Summary=?, Language=?, Series_ID=?, Publisher_ID=?,
          Cover_Image=COALESCE(?, Cover_Image)
      WHERE Book_ID=?
    `;
    await dbquery(sql, [
      Title,
      ISBN_No,
      ISSN_No,
      Publication_Year,
      No_of_Pages,
      Book_Summary,
      Language,
      Series_ID || null,
      Publisher_ID || null,
      Cover_Image,
      id,
    ]);

    res.json({ message: "Book updated successfully" });
  } catch (err) {
    next(err);
  }
}

/** Delete Book */
export async function deleteBook(req, res, next) {
  try {
    const id = req.params.id;
    await dbquery("DELETE FROM Book WHERE Book_ID=?", [id]);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
}
