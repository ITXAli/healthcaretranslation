import express from "express";
import { handleTranslate } from "../controllers/translateCtrl.js";

const router = express.Router();

router.post("/", handleTranslate);

export default router;