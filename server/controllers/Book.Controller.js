import {
  getAllBooksQuery,
  getBookByIDQuery,
  getDownloadsOfBookQuery,
  getLikesOfBookQuery,
  getReviewsOfABookQuery,
} from "../Queries/Book.Queries.js";
import { apiError } from "../utils/api.error.js";
import { apiResponse } from "../utils/api.response.js";
import { dbquery } from "../utils/db.helper.js";

export async function getAllBooks(req, res, next) {
  try {
    const result = await dbquery(getAllBooksQuery);
    console.log(result);
    res.json(new apiResponse(200, result, "Books fetched Successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getBookByID(req, res, next) {
  try {
    const bookID = req.params.id;
    if (!bookID) {
      res.status(400).send("Book ID is required");
      return;
    }
    const result = await dbquery(getBookByIDQuery, [bookID]);

    if (result.length === 0) {
      throw new apiError(404, "Book not found");
    }
    console.log(result);
    res.json(new apiResponse(200, result, "Book fetched Successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getDownloadCountOfBook(req, res, next) {
  try {
    const bookID = req.params.id;
    if (!bookID) {
      throw new apiError(400, "BookID is required");
    }
    const result = await dbquery(getDownloadsOfBookQuery, [bookID]);

    res.json(new apiResponse(200, result, "Downloads fetched Successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getLikesCountOfBook(req, res, next) {
  try {
    const bookID = req.params.id;
    if (!bookID) {
      throw new apiError(400, "BookID is required");
    }
    const result = await dbquery(getLikesOfBookQuery, [bookID]);
    res.json(new apiResponse(200, result, "Likes count fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getAllReviewsOfBook(req, res, next) {
  try {
    const bookID = req.params.id;
    if (!bookID) {
      throw new apiError(400, "BookID is required");
    }
    const result = await dbquery(getReviewsOfABookQuery, [bookID]);
    if (result.length === 0) {
      throw new apiError(404, "No reviews found for this book");
    }
    res.json(new apiResponse(200, result, "Reviews fetched successfully"));
  } catch (error) {
    next(error);
  }
}
