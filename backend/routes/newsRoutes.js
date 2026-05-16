import express from "express";
import { getStockNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/:symbol", getStockNews);

export default router;