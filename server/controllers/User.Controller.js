import {
  checkAVisitorQuery,
  getAllDownloadedBooksQuery,
  getAllLikedBooksQuery,
  getAllReviewsQuery,
} from "../Queries/User.Queries.js";
import { apiError } from "../utils/api.error.js";
import { apiResponse } from "../utils/api.response.js";
import { dbquery } from "../utils/db.helper.js";

export async function getVisitor(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new apiError(400, "email and Password are required");
    }
    const result = await dbquery(checkAVisitorQuery, [email, password]);
    if (!result.length) {
      throw new apiError(404, "Visitor not found");
    }
    console.log(result);
    res.json(new apiResponse(200, result[0], "Visitor fetched Successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getAllLikedBooks(req, res, next) {
  try {
    const userID = req.params.id;
    if (!userID) {
      throw new apiError(400, "User ID is required");
    }
    const result = await dbquery(getAllLikedBooksQuery, [userID.trim()]);
    console.log(result);
    if (!result.length) {
      throw new apiError(404, "No liked books found");
    }
    res.json(new apiResponse(200, result, "Liked books fetched Successfully"));
  } catch (error) {
    next(error);
  }
}
export async function getAllDownloadedBooks(req, res, next) {
  try {
    const userID = req.params.id;
    if (!userID) {
      throw new apiError(400, "User ID is required");
    }
    const result = await dbquery(getAllDownloadedBooksQuery, [userID.trim()]);
    console.log(result);
    if (!result.length) {
      throw new apiError(404, "No downloaded books found");
    }
    res.json(
      new apiResponse(200, result, "Downloaded books fetched Successfully")
    );
  } catch (error) {
    next(error);
  }
}
export async function getAllReviews(req, res, next) {
  try {
    const userID = req.params.id;
    if (!userID) {
      throw new apiError(400, "User ID is required");
    }
    const result = await dbquery(getAllReviewsQuery, [userID.trim()]);
    if (!result.length) {
      throw new apiError(404, "No reviews found");
    }
    res.json(new apiResponse(200, result, "Reviews fetched Successfully"));
  } catch (error) {
    next(error);
  }
}
