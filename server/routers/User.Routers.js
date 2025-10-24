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
import {
  reviewValidator,
  updateReadProgressValidator,
  visitorRegistrationValidator,
} from "../validators/User.Validators.js";
import { validate } from "../middleware/Validator.Middleware.js";
import {
  checkIFDownloaded,
  checkReviewEligibility,
  deleteAReview,
  downloadABook,
  getTheReviewIfExist,
  isBookLiked,
  likeABook,
  reviewABook,
  unDownloadABook,
  unLikeABook,
  updateAReview,
  updateReadProgress,
} from "../controllers/UserBook.Controllers.js";
import { check } from "express-validator";

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
  registerVisitor,
);

// check if user is subscribed
router.get("/isSubscribed/:userId", checkIfUserSubscribed);

// visitor signup for library membership, handled in payment routes

// User like book
router
  .route("/likeBook/:userId/likes/:bookId")
  .delete(unLikeABook)
  .post(likeABook)
  .get(isBookLiked);

// User add reviews in a book
router
  .route("/reviewBook/:userId/reviews/:bookId")
  .get(getTheReviewIfExist)
  .post(reviewValidator(), validate, reviewABook)
  .put(reviewValidator(), validate, updateAReview)
  .delete(deleteAReview);
router.get(
  "/reviewBookEligibility/:userId/reviews/:bookId",
  checkReviewEligibility,
);

// user downloads a book
router
  .route("/downloadBook/:userId/downloads/:bookId")
  .get(checkIFDownloaded)
  .post(downloadABook)
  .delete(unDownloadABook)
  .put(updateReadProgressValidator(), validate, updateReadProgress);

export default router;
