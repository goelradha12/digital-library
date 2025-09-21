import {
  getAllAuthorsQuery,
  getAllBooksOfAuthorQuery,
  getAuthorByIDQuery,
} from "../Queries/Author.Queries.js";
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

export async function getAllAuthors(req, res, next) {
  try {
    const result = await dbquery(getAllAuthorsQuery);
    res.json(new apiResponse(200, result, "Authors fetched Successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getAuthorByID(req, res, next) {
  try {
    const authorID = req.params.authorID;
    if (!authorID) {
      throw new apiError(400, "Author ID is required");
    }
    const result = await dbquery(getAuthorByIDQuery, [authorID]);
    if (!result.length) {
      throw new apiError(404, "Author Not Found");
    }
    res.json(new apiResponse(200, result, "Books fetched Successfully"));
  } catch (error) {
    next(error);
  }
}
