import { Router } from "express";
import multer from "multer";
import path from "path";

// 🔹 Controllers
import { adminLogin, adminLogout, getSubscriberCount, getUserCount } from "../controllers/Admin.Controllers.js";
import {
  addBook,
  editBook,
  deleteBook,
  getAllBooks,
} from "../controllers/Book.Admin.Controllers.js";
import {
  addSeries,
  editSeries,
  deleteSeries,
  getAllSeries,
} from "../controllers/Series.Admin.Controllers.js";
import {
  addPublisher,
  editPublisher,
  deletePublisher,
  getAllPublishers,
} from "../controllers/Publisher.Admin.Controllers.js";
import {
  addAuthor,
  editAuthor,
  deleteAuthor,
  getAllAuthors,
} from "../controllers/Author.Admin.Controllers.js";
import {
  linkAuthorsToBook,
  getAuthorsByBook,
} from "../controllers/BookAuthor.Admin.Controllers.js";
import {
  addCategory,
  editCategory,
  deleteCategory,
  getAllCategories,
  linkCategoriesToBook,
  getCategoriesByBook,
} from "../controllers/Category.Admin.Controllers.js";

// 🔹 Middleware
import { verifyAdmin } from "../middleware/adminAuth.js";
import {
  validateBook,
  validateAuthor,
  validateSeries,
  validatePublisher,
  validateCategory,
  validateLinking,
} from "../validators/Admin.Validators.js";

const router = Router();

/* ------------------------------------------
   Multer Setup — for File Uploads
--------------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/books"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

/* ------------------------------------------
   Admin Authentication Routes
--------------------------------------------- */
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

/* ------------------------------------------
   Book Management Routes
--------------------------------------------- */
router.get("/books", verifyAdmin, getAllBooks);
router.post("/books", verifyAdmin, upload.single("cover"), validateBook, addBook);
router.put("/books/:id", verifyAdmin, upload.single("cover"), validateBook, editBook);
router.delete("/books/:id", verifyAdmin, deleteBook);

/* ------------------------------------------
   Series Management Routes
--------------------------------------------- */
router.post("/series", verifyAdmin, validateSeries, addSeries);
router.put("/series/:id", verifyAdmin, validateSeries, editSeries);
router.delete("/series/:id", verifyAdmin, deleteSeries);
router.get("/series", verifyAdmin, getAllSeries);

/* ------------------------------------------
   Publisher Management Routes
--------------------------------------------- */
router.post("/publishers", verifyAdmin, validatePublisher, addPublisher);
router.put("/publishers/:id", verifyAdmin, validatePublisher, editPublisher);
router.delete("/publishers/:id", verifyAdmin, deletePublisher);
router.get("/publishers", verifyAdmin, getAllPublishers);

/* ------------------------------------------
   Author Management Routes
--------------------------------------------- */
router.post("/authors", verifyAdmin, upload.single("image"), validateAuthor, addAuthor);
router.put("/authors/:id", verifyAdmin, upload.single("image"), validateAuthor, editAuthor);
router.delete("/authors/:id", verifyAdmin, deleteAuthor);
router.get("/authors", verifyAdmin, getAllAuthors);

/* ------------------------------------------
   Book–Author Linking Routes
--------------------------------------------- */
router.post("/books/authors/link", verifyAdmin, validateLinking, linkAuthorsToBook);
router.get("/books/:id/authors", verifyAdmin, getAuthorsByBook);

/* ------------------------------------------
   Category Management Routes
--------------------------------------------- */
router.post("/categories", verifyAdmin, validateCategory, addCategory);
router.put("/categories/:id", verifyAdmin, validateCategory, editCategory);
router.delete("/categories/:id", verifyAdmin, deleteCategory);
router.get("/categories", verifyAdmin, getAllCategories);

/* ------------------------------------------
   Book–Category Linking Routes
--------------------------------------------- */
router.post("/books/categories/link", verifyAdmin, validateLinking, linkCategoriesToBook);
router.get("/books/:id/categories", verifyAdmin, getCategoriesByBook);

/**------------------------------------------
 * Simple user and subscriber counts
 */

router.get("/users/count", getUserCount);
router.get("/subscribers/count", getSubscriberCount);
export default router;
