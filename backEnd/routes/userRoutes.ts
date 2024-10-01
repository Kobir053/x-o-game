import express from "express";
import * as userController from "../controller/userController.js";

const router = express.Router();

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);

export default router;
