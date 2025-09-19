import { checkAVisitorQuery } from "../Queries/User.Queries.js";
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
    console.log(error)
    next(error);
  }
}
