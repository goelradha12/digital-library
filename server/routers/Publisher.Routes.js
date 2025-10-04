import { Router } from "express";
import {
  getAllPublishers,
  getAllBooksOfPublisher,
  getPublisherByID,
} from "../controllers/Publisher.Controllers.js";

const router = Router();

router.get("/:id/books", getAllBooksOfPublisher);
router.get("/all", getAllPublishers);
router.get("/:id", getPublisherByID);

export default router;
