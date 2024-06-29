import express from "express";
import { getBookCategoris } from "../controllers/category.js";

const router = express.Router();

router.get("/", getBookCategoris);

export default router;