import express from "express";
import { loginValidator, signupValidator, validate } from "../utils/validator.js";
import { login, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", validate(signupValidator), signUp);
router.post("/login", validate(loginValidator), login);

export default router;