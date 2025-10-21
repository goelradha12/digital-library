import { body } from "express-validator";

export const visitorRegistrationValidator = () => {
  return [
    body("name").not().trim().notEmpty().withMessage("name is required"),
    body("email")
      .not()
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),
    body("password")
      .not()
      .trim()
      .notEmpty()
      .withMessage("password is required"),
    body("country")
      .optional()
      .trim()
      .isIn(["India", "United States", "Italy", "France"])
      .withMessage("country is invalid"),
  ];
};

export const reviewValidator = () => {
  return [
    body("review_text")
      .not()
      .trim()
      .notEmpty()
      .withMessage("review_text is required")
      .isString()
      .withMessage("review_text must be a string")
      .isLength({ min: 4 })
      .withMessage("review_text must be at least 4 characters long"),
    body("rating")
      .not()
      .trim()
      .notEmpty()
      .withMessage("rating is required")
      .isInt({ min: 1, max: 5 })
      .withMessage("rating must be between 1 and 5"),
  ];
};
