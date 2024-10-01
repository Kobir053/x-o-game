import { Game } from "./gameModel";
export interface user {
  id: string;
  name: string;
  password: string;
  games?: Game[];
}
