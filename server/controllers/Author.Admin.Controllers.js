import { dbquery } from "../utils/db.helper.js";

/** Add a new author */
export async function addAuthor(req, res, next) {
  try {
    const { Author_Name, Author_Introduction } = req.body;
    const Author_Image = req.file ? req.file.path : null;

    await dbquery(
      `INSERT INTO Author (Author_Name, Author_Introduction, Author_Image)
       VALUES (?, ?, ?)`,
      [Author_Name, Author_Introduction || null, Author_Image]
    );

    res.json({ message: "Author added successfully" });
  } catch (err) {
    next(err);
  }
}

/** Edit author */
export async function editAuthor(req, res, next) {
  try {
    const id = req.params.id;
    const { Author_Name, Author_Introduction } = req.body;
    const Author_Image = req.file ? req.file.path : null;

    await dbquery(
      `UPDATE Author
       SET Author_Name = ?, Author_Introduction = ?, 
           Author_Image = COALESCE(?, Author_Image)
       WHERE Author_ID = ?`,
      [Author_Name, Author_Introduction || null, Author_Image, id]
    );

    res.json({ message: "Author updated successfully" });
  } catch (err) {
    next(err);
  }
}

/** Delete author */
export async function deleteAuthor(req, res, next) {
  try {
    const id = req.params.id;
    await dbquery(`DELETE FROM Author WHERE Author_ID = ?`, [id]);
    res.json({ message: "Author deleted successfully" });
  } catch (err) {
    next(err);
  }
}

/** Get all authors */
export async function getAllAuthors(req, res, next) {
  try {
    const rows = await dbquery(`SELECT * FROM Author ORDER BY Author_Name ASC`);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}
