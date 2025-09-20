import { Router } from "express";
import { getAllBooksOfAuthor } from "../controllers/Author.Controllers.js";

const router = Router();

router.get("/:id/books", getAllBooksOfAuthor);

export default router;
