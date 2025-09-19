import { getAllBooksOfAuthorQuery } from "../Queries/Author.Queries.js";
import { apiError } from "../utils/api.error.js";
import { apiResponse } from "../utils/api.response.js";
import { dbquery } from "../utils/db.helper.js";

export async function getAllBooksOfAuthor(req, res, next) {
  try {
    const authorID = req.params.id;
    if (!authorID) {
      throw new apiError(400, "Author ID is required");
    }
    const result = await dbquery(getAllBooksOfAuthorQuery, [authorID]);
    if (!result.length) {
      throw new apiError(404, "No books found for this author");
    }
    res.json(new apiResponse(200, result, "Books fetched Successfully"));
  } catch (err) {
    next(err);
  }
}
