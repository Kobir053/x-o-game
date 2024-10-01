import { user } from "../models/userModel";
import jsonfile from "jsonfile";

const file = "./data/users.json";

export const getUsers = async (): Promise<user[]> => {
  return jsonfile.readFile(file);
};

export const saveUsers = async (users: user[]): Promise<void> => {
  await jsonfile.writeFile(file, users, { spaces: 2 });
};
