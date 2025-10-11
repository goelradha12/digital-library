import { Router } from "express";
import { createOrder } from "../controllers/Payment.Controllers.js";
const router = Router();

router.post("/create-order", createOrder);
export default router;