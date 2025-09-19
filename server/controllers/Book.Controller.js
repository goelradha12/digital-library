import { getAllBooksQuery, getBookByIDQuery } from "../Queries/Book.Queries.js";
import { dbquery } from "../utils/db.helper.js";

export async function getAllBooks(req, res) {
  try {
    const result = await dbquery(getAllBooksQuery);

    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

export async function getBookByID(req, res) {
  try {
    const bookID = req.params.id;
    if (!bookID) {
      res.status(400).send("Book ID is required");
      return;
    }
    const result = await dbquery(getBookByIDQuery, [bookID]);

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
