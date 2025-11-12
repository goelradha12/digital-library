import { dbquery } from "../utils/db.helper.js";

/** Link one or multiple authors to a book */
export async function linkAuthorsToBook(req, res, next) {
  try {
    const { Book_ID, Author_IDs } = req.body; // Author_IDs should be an array

    if (!Book_ID || !Array.isArray(Author_IDs)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Remove existing relations
    await dbquery("DELETE FROM Book_To_Author WHERE Book_ID = ?", [Book_ID]);

    // Insert new links
    for (const authorId of Author_IDs) {
      await dbquery(
        `INSERT INTO Book_To_Author (Author_ID, Book_ID) VALUES (?, ?)`,
        [authorId, Book_ID]
      );
    }

    res.json({ message: "Authors linked successfully" });
  } catch (err) {
    next(err);
  }
}

/** Get all authors linked to a book */
export async function getAuthorsByBook(req, res, next) {
  try {
    const { id } = req.params;
    const authors = await dbquery(
      `
      SELECT a.Author_ID, a.Author_Name, a.Author_Image, a.Author_Introduction
      FROM Author a
      JOIN Book_To_Author ba ON a.Author_ID = ba.Author_ID
      WHERE ba.Book_ID = ?
      `,
      [id]
    );

    res.json(authors);
  } catch (err) {
    next(err);
  }
}
