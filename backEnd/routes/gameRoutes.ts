import express from "express";
import * as gameController from "../controller/gameController.js";

const router = express.Router();

router.post("/games/start", gameController.addGame);

export default router;
