import {
  getAllPublishersQuery,
  getBooksOfPublisherQuery,
  getPublisherByIDQuery,
} from "../Queries/Publisher.Queries.js";
import { apiError } from "../utils/api.error.js";
import { apiResponse } from "../utils/api.response.js";
import { dbquery } from "../utils/db.helper.js";

export async function getAllBooksOfPublisher(req, res, next) {
  try {
    const publisherID = req.params.id;
    if (!publisherID) {
      throw new apiError(400, "Publisher ID is required");
    }
    const result = await dbquery(getBooksOfPublisherQuery, [publisherID]);
    if (!result.length) {
      throw new apiError(404, "No books found for this publisher");
    }
    res.json(new apiResponse(200, result, "Books fetched Successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getAllPublishers(req, res, next) {
  try {
    const result = await dbquery(getAllPublishersQuery);
    res.json(new apiResponse(200, result, "Publishers fetched Successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getPublisherByID(req, res, next) {
  try {
    const publisherID = req.params.id;
    if (!publisherID) {
      throw new apiError(400, "Publisher ID is required");
    }
    const result = await dbquery(getPublisherByIDQuery, [publisherID]);
    if (!result.length) {
      throw new apiError(404, "Publisher Not Found");
    }
    res.json(new apiResponse(200, result, "Publisher fetched Successfully"));
  } catch (error) {
    next(error);
  }
}
