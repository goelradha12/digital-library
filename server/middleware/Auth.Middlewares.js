import { checkUserByIDQuery } from "../Queries/User.Queries.js";
import { apiError } from "../utils/api.error.js";
import { dbquery } from "../utils/db.helper.js";

export async function verifyUserByID(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id, "here");
        const result = await dbquery(checkUserByIDQuery, [id]);
        if (!result.length) {
            throw new apiError(404, "User not found");
        }
        next(id);
    } catch (error) {
        next(error);
    }
}