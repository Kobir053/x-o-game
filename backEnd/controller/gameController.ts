import { Request, Response, NextFunction } from "express";
import { createGame } from "../services/gameService.js";
import jwt from "jsonwebtoken";
import { Game, player } from "../models/gameModel.js";
import dotenv from "dotenv";

dotenv.config();

export const addGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { player1, player2 } = req.body;
    const game: Game = await createGame(player1, player2);
    res.json({ id: game.id });
  } catch (error) {
    res.status(400).json({ massage: "error" });
  }
};
