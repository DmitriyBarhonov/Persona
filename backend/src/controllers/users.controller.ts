import type { Request, Response } from "express";
import { register } from "../services/auth.service.js";
import { toUserDto } from "../dto/user.dto.js";

// Регистрация: создаёт юзера или возвращает 409, если email уже занят.
export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email и password обязательны" });
  }

  try {
    const user = await register(email, password);
    res.status(201).json(toUserDto(user));
  } catch (err) {
    if (err instanceof Error && err.message === "EMAIL_TAKEN") {
      return res
        .status(409)
        .json({ error: "Пользователь с таким email уже существует" });
    }
    throw err;
  }
};
