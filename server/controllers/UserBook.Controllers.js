import {
  addLikeQuery,
  checkLikeQuery,
  countLikedBooks,
  removeLikeQuery,
} from "../Queries/UserBook.Queries.js";
import { apiError } from "../utils/api.error.js";
import { apiResponse } from "../utils/api.response.js";
import { dbquery } from "../utils/db.helper.js";
import { likesMaxCount } from "../utils/subscription.js";

export const unLikeABook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    await dbquery(removeLikeQuery, [userId, bookId]);
    res.json(
      new apiResponse(200, null, "Book removed from likes successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const likeABook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    // check if likesCount has reached it's limit
    const getCountOfLikedBooks = await dbquery(countLikedBooks, [userId]);
    if (getCountOfLikedBooks >= likesMaxCount) {
      throw new apiError(400, "Likes count has reached it's limit");
    }
    await dbquery(addLikeQuery, [userId, bookId]);
    res.json(new apiResponse(200, null, "Book added to likes successfully"));
  } catch (error) {
    next(error);
  }
};

export const isBookLiked = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    const result = await dbquery(checkLikeQuery, [userId, bookId]);
    if (result.length)
      return res.json(new apiResponse(200, { success: true }, "Likes found"));
    else throw new apiError(404, "No likes found");
  } catch (error) {
    next(error);
  }
};
