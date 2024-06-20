import express from "express";
import { signupValidator, validate } from "../utils/validator.js";
import { signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", validate(signupValidator), signUp);

export default router;