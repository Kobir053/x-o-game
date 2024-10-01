import { user } from "./userModel";

export interface Game {
  id: string;
  players: [player, player];
  winner: boolean;
  winnerId?: string;
}

export interface player {
  userId: string;
  type: string; // איקס או עיגול
}
