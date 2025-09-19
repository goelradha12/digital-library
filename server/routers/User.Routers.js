import { Router } from "express";
import { getVisitor } from "../controllers/User.Controller.js";

const router = Router();

router.post("/", getVisitor);
export default router;
