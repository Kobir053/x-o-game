import { Request, Response, NextFunction } from "express";
import { createUser, authenticateUser } from "../services/userService.js";
import jwt from "jsonwebtoken";
import { user } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;
    const user: user = await createUser(name, password);
    res.json({ id: user.id, username: user.name });
  } catch (error) {
    res.status(400).json({ massage: "error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);
    if (user) {
      const token = jwt.sign({ id: user.id, username: user.name }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(400).json({ massage: "error" });
  }
};
