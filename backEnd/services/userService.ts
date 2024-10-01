import { user } from "../models/userModel.js";
import { getUsers, saveUsers } from "../DAL/userDal.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const createUser = async (
  username: string,
  password: string
): Promise<user> => {
  const users = await getUsers();
  const passwordHash = await bcrypt.hash(password, 10);
  const newUserId: string = uuidv4();

  const newUser: user = {
    id: newUserId,
    name: username,
    password: passwordHash,
  };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
};

export const authenticateUser = async (
  username: string,
  password: string
): Promise<user | null> => {
  const users = await getUsers();
  const user = users.find((u) => u.name === username);
  const userPassword = await bcrypt.compare(password, user!.password);
  if (user && userPassword) {
    return user;
  }
  return null;
};
