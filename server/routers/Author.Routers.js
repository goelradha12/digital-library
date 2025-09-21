import { Router } from "express";
import { getAllAuthors, getAllBooksOfAuthor, getAuthorByID } from "../controllers/Author.Controllers.js";

const router = Router();

router.get("/:id/books", getAllBooksOfAuthor);
router.get("/all", getAllAuthors);
router.get("/:authorID",getAuthorByID);

export default router;
