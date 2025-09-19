import { Router } from "express";
const router = Router();
import { getAllBooks, getBookByID } from "../controllers/Book.Controller.js";

// Get all books
router.get("/", getAllBooks);

// Get a book by it's ID
router.get("/:id", getBookByID);

export default router;
