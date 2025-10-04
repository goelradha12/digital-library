import { Router } from "express";
import {
  getAllDownloadedBooks,
  getAllLikedBooks,
  getAllReviews,
  getUserByVisitorID,
  getVisitor,
  registerVisitor,
} from "../controllers/User.Controller.js";
import { verifyUserByID } from "../middleware/Auth.Middlewares.js";
import { visitorRegistrationValidator } from "../validators/User.Validators.js";

const router = Router();

router.post("/", getVisitor);
router.get("/getUser/:id", getUserByVisitorID);

// Books data related to user goes here
router.get("/likedBooks/:id", getAllLikedBooks);
router.get("/downloadedBooks/:id", getAllDownloadedBooks);
router.get("/reviewdBooks/:id", getAllReviews);

// visitor registers
router.post(
  "/registerVisitor",
  visitorRegistrationValidator(),
  registerVisitor,
);
// visitor signup for library membership
export default router;
