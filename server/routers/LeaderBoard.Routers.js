import { Router } from "express";
import { dbquery } from "../utils/db.helper.js";
import { getTop10UserQuery } from "../Queries/LeaderBoard.Queries.js";
import { apiResponse } from "../utils/api.response.js";

const router = Router();

/**
 * @route GET /leaderboard/
 * @description Get top 10 users
 * @access Public
 */
router.get("/", async (req, res, next) => {
  try {
    const result = await dbquery(getTop10UserQuery);
    res.json(new apiResponse(200, result, "Top 10 users fetched Successfully"));
  } catch (error) {
    next(error);
  }
});
export default router;
