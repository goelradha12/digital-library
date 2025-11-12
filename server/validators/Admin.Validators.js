import { body, param, validationResult } from "express-validator";

/* =============================================
    Universal Error Handler Middleware
============================================= */
export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

/* =============================================
    Book Validators
============================================= */
export const validateBook = [
  body("Title").notEmpty().withMessage("Title is required"),
  body("No_of_Pages")
    .isInt({ min: 1 })
    .withMessage("No_of_Pages must be a positive integer"),
  body("Language").notEmpty().withMessage("Language is required"),
  handleValidationErrors,
];

/* =============================================
    Series Validator
============================================= */
export const validateSeries = [
  body("Series_Name").notEmpty().withMessage("Series name is required"),
  handleValidationErrors,
];

/* =============================================
    Publisher Validator
============================================= */
export const validatePublisher = [
  body("Publisher_Name").notEmpty().withMessage("Publisher name is required"),
  handleValidationErrors,
];

/* =============================================
    Author Validator
============================================= */
export const validateAuthor = [
  body("Author_Name").notEmpty().withMessage("Author name is required"),
  handleValidationErrors,
];

/* =============================================
    Category Validator
============================================= */
export const validateCategory = [
  body("Category_Name").notEmpty().withMessage("Category name is required"),
  handleValidationErrors,
];

/* =============================================
    Linking Validator (Book ↔ Author/Category)
============================================= */
export const validateLinking = [
  body("Book_ID").notEmpty().withMessage("Book_ID is required"),
  body("Author_IDs")
    .optional()
    .isArray()
    .withMessage("Author_IDs must be an array"),
  body("Category_IDs")
    .optional()
    .isArray()
    .withMessage("Category_IDs must be an array"),
  handleValidationErrors,
];
