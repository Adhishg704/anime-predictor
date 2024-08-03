import express from "express";
import { getReviewTitles } from "../controllers/scraper.controller.js";

const router = express.Router();

router.post("/get-review-titles", getReviewTitles);

export default router;