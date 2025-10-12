import { body } from "express-validator";

export const createOrderValidator = () => {
  return [
    body("amount")
      .not()
      .isEmpty()
      .withMessage("amount is required")
      .isInt({ min: 100 })
      .withMessage("amount must be a valid integer (in paisa)")
      .toInt(),

    body("visitor_id")
      .not()
      .trim()
      .notEmpty()
      .withMessage("visitor_id is required")
      .isString()
      .isLength({ min: 12, max: 12 })
      .withMessage("visitor_id must be a valid string (e.g. VIS000000001)"),
  ];
};

export const verifyPaymentValidator = () => {
  return [
    body("razorpay_order_id")
      .not()
      .trim()
      .notEmpty()
      .withMessage("razorpay_order_id is required")
      .isString()
      .withMessage("razorpay_order_id must be a string"),

    body("razorpay_payment_id")
      .not()
      .trim()
      .notEmpty()
      .withMessage("razorpay_payment_id is required")
      .isString()
      .withMessage("razorpay_payment_id must be a string"),

    body("razorpay_signature")
      .not()
      .trim()
      .notEmpty()
      .withMessage("razorpay_signature is required")
      .isString()
      .withMessage("razorpay_signature must be a string"),
  ];
};
