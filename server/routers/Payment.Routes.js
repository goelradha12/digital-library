import { Router } from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/Payment.Controllers.js";
import {
  createOrderValidator,
  verifyPaymentValidator,
} from "../validators/Payment.Validators.js";
import { validate } from "../middleware/Validator.Middleware.js";

const router = Router();

router.post("/create-order", createOrderValidator(), validate, createOrder);
router.post("/verify", verifyPaymentValidator(), validate, verifyPayment);
export default router;
