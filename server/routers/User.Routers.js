import { Router } from "express";
import {
  checkIfUserSubscribed,
  getAllDownloadedBooks,
  getAllLikedBooks,
  getAllReviews,
  getUserByVisitorID,
  getVisitor,
  registerVisitor,
} from "../controllers/User.Controller.js";
import { verifyUserByID } from "../middleware/Auth.Middlewares.js";
import { visitorRegistrationValidator } from "../validators/User.Validators.js";
import { validate } from "../middleware/Validator.Middleware.js";
import { isBookLiked, likeABook, unLikeABook } from "../controllers/UserBook.Controllers.js";

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
  validate,
  registerVisitor
);

// check if user is subscribed
router.get("/isSubscribed/:userId", checkIfUserSubscribed);

// visitor signup for library membership, handled in payment routes

router
  .route("/likeBook/:userId/likes/:bookId")
  .delete(unLikeABook)
  .post(likeABook)
  .get(isBookLiked);
export default router;
