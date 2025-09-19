import { getAllBooksOfAuthorQuery } from "../Queries/Author.Queries.js";
import { dbquery } from "../utils/db.helper.js";

export async function getAllBooksOfAuthor(req, res) {
  const authorID = req.params.id;
  if (!authorID) {
    res.status(400).send("Author ID is required");
    return;
  }
  try {
    const result = await dbquery(getAllBooksOfAuthorQuery, [authorID]);
    if (!rows.length) {
      res.status(404).send("Author not found");
      return;
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
