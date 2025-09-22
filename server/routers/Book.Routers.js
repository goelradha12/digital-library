import { Router } from "express";
const router = Router();
import {
  getAllBooks,
  getAllReviewsOfBook,
  getBookByID,
  getDownloadCountOfBook,
  getLikesCountOfBook,
} from "../controllers/Book.Controller.js";

// Get all books
router.get("/", getAllBooks);
router.get("/downloadCount/:id", getDownloadCountOfBook);
router.get("/likesCount/:id", getLikesCountOfBook);
router.get("/allReview/:id", getAllReviewsOfBook);

// Get a book by it's ID
router.get("/:id", getBookByID);

export default router;
