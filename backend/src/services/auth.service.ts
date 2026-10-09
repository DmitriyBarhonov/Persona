import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository.js";

import jwt from "jsonwebtoken";
import { config } from "../config.js";

// Подписывает JWT секретом из config — доказательство, что токен выдал наш сервер.
export const createToken = (userId: number) =>
  jwt.sign({ userId }, config.jwtSecret!, { expiresIn: "7d" });

// Регистрация: проверяет, что email свободен, и хэширует пароль перед сохранением.
export const register = async (email: string, password: string) => {
  const existing = await userRepository.findByEmail(email);

  if (existing) {
    throw new Error("EMAIL_TAKEN");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return userRepository.create(email, passwordHash);
};

// Сверяет пароль с хэшем из базы, не отдаёт сам хэш никуда наружу.
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
