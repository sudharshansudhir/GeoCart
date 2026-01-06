import express from "express";
import { recipeChat } from "../Controller/aiController.js";
import { isauth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/recipe", isauth, recipeChat);

export default router;
