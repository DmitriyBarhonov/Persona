import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository.js";

export const register = async (email: string, password: string) => {
  const existing = await userRepository.findByEmail(email);

  if (existing) {
    throw new Error("EMAIL_TAKEN");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return userRepository.create(email, passwordHash);
};

export const login = async (email: string, password: string) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return user;
};
