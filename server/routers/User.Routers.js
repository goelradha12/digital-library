import { Router } from "express";
import {
  getAllDownloadedBooks,
  getAllLikedBooks,
  getAllReviews,
  getVisitor,
} from "../controllers/User.Controller.js";
import { verifyUserByID } from "../middleware/Auth.Middlewares.js";

const router = Router();

router.post("/", getVisitor);

// Books data related to user goes here
router.get("/likedBooks/:id", getAllLikedBooks);
router.get("/downloadedBooks/:id", getAllDownloadedBooks);
router.get("/reviewdBooks/:id", getAllReviews);

export default router;
