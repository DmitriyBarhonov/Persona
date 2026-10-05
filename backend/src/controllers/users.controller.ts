import type { Request, Response } from "express";
import { register } from "../services/auth.service.js";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email и password обязательны" });
  }

  try {
    const user = await register(email, password);
    res.status(201).json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    if (err instanceof Error && err.message === "EMAIL_TAKEN") {
      return res
        .status(409)
        .json({ error: "Пользователь с таким email уже существует" });
    }
    throw err;
  }
};
