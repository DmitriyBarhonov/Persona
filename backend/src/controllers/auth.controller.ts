import { toUserDto } from "../dto/user.dto.js";
import { login } from "../services/auth.service.js";
import type { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email и password обязательны" });
  }

  try {
    const user = await login(email, password);
    res.json(toUserDto(user));
  } catch (err) {
    res.status(401).json({ error: "Неверный email или пароль" });
  }
};
