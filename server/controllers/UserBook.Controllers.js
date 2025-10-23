import {
  addAReviewQuery,
  addDownloadQuery,
  addLikeQuery,
  checkDownloadQuery,
  checkLikeQuery,
  countLikedBooks,
  deleteAReviewQuery,
  getTheReviewQuery,
  removeDownloadQuery,
  removeLikeQuery,
  updateAReviewQuery,
} from "../Queries/UserBook.Queries.js";
import { apiError } from "../utils/api.error.js";
import { apiResponse } from "../utils/api.response.js";
import { dbquery } from "../utils/db.helper.js";
import {
  likesMaxCount,
  minPercentageReadForBookReview,
} from "../utils/subscription.js";

export const unLikeABook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    await dbquery(removeLikeQuery, [userId, bookId]);
    res.json(
      new apiResponse(200, null, "Book removed from likes successfully"),
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

/**
 * Reviews related controllers,
 * Only those users, who has read 10% + book can review the book
 * One user can review a book only once
 */

export const checkReviewEligibility = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const currReadResult = await dbquery(checkDownloadQuery, [userId, bookId]);
    if (currReadResult.length == 0) {
      throw new apiError(400, "Book never read/downloaded");
    }
    const currRead = currReadResult[0].Percentage_Read;
    if (currRead < minRead) {
      throw new apiError(
        400,
        "Minimum 10% read is required to review the book",
      );
    }
    res.json(new apiResponse(200, null, "Eligible for review"));
  } catch (error) {
    next(error);
  }
};
export const getTheReviewIfExist = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const result = await dbquery(getTheReviewQuery, [userId, bookId]);
    if (result.length == 0) {
      throw new apiError(404, "No review found");
    }
    res.json(new apiResponse(200, result[0], "Review fetched successfully"));
  } catch (error) {
    next(error);
  }
};
export const reviewABook = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const { review_text, rating } = req.body;
    if (rating < 1 || rating > 5) {
      throw new apiError(400, "Rating should be between 1 to 5");
    }
    // check if user has read 10% + of the book
    const minRead = minPercentageReadForBookReview;
    const currReadResult = await dbquery(checkDownloadQuery, [userId, bookId]);
    if (currReadResult.length == 0) {
      throw new apiError(400, "Book never read/downloaded");
    }
    const currRead = currReadResult[0].Percentage_Read;
    if (currRead < minRead) {
      throw new apiError(400, "Book not read/downloaded enough");
    }
    await dbquery(addAReviewQuery, [
      userId,
      bookId,
      review_text,
      new Date(),
      rating,
    ]);
    res.json(new apiResponse(200, null, "Review added successfully"));
  } catch (error) {
    next(error);
  }
};
export const updateAReview = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const { review_text, rating } = req.body;
    if (rating < 1 || rating > 5) {
      throw new apiError(400, "Rating should be between 1 to 5");
    }
    await dbquery(updateAReviewQuery, [
      review_text,
      new Date(),
      rating,
      userId,
      bookId,
    ]);
    res.json(new apiResponse(200, null, "Review updated successfully"));
  } catch (error) {
    next(error);
  }
};
export const deleteAReview = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const result = await dbquery(deleteAReviewQuery, [userId, bookId]);
    if (result.affectedRows == 0) {
      throw new apiError(404, "No review found");
    }
    res.json(new apiResponse(200, null, "Review deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export const checkIFDownloaded = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    if (!userId || !bookId) {
      throw new apiError(400, "User ID and Book ID are required");
    }
    const result = await dbquery(checkDownloadQuery, [userId, bookId]);
    if (result.length == 0) {
      throw new apiError(404, "No download found");
    }
    res.json(new apiResponse(200, result[0], "Download found"));
  } catch (error) {
    next(error);
  }
};

export const downloadABook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    if (!userId || !bookId) {
      throw new apiError(400, "User ID and Book ID are required");
    }
    const alreadyDownloaded = await dbquery(checkDownloadQuery, [
      userId,
      bookId,
    ]);
    if (alreadyDownloaded.length > 0) {
      throw new apiError(400, "Book already downloaded");
    }
    const result = await dbquery(addDownloadQuery, [userId, bookId, 1]);
    if (result.affectedRows == 0) {
      throw new apiError(404, "Error downloading the book");
    }
    res.json(new apiResponse(200, null, "Book access granted successfully"));
  } catch (error) {
    next(error);
  }
};

export const unDownloadABook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    if (!userId || !bookId) {
      throw new apiError(400, "User ID and Book ID are required");
    }
    const result = await dbquery(removeDownloadQuery, [userId, bookId]);
    if (result.affectedRows == 0) {
      throw new apiError(404, "Error downloading the book");
    }
    res.json(new apiResponse(200, null, "Book access revoked successfully"));
  } catch (error) {
    next(error);
  }
};
