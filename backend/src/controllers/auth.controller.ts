import { toUserDto } from "../dto/user.dto.js";
import { createToken, login } from "../services/auth.service.js";
import type { Request, Response } from "express";

import { userRepository } from "../repositories/user.repository.js";

// Отдаёт данные текущего залогиненного юзера (требует requireAuth перед собой).
export const getMe = async (req: Request, res: Response) => {
  const user = await userRepository.findById(req.userId!);

  if (!user) {
    return res.status(401).json({ error: "Не авторизован" });
  }

  res.json(toUserDto(user));
};

// Стирает cookie с токеном — "выход" без похода в базу.
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ ok: true });
};

// Проверяет пароль, выдаёт JWT в cookie и возвращает данные юзера.
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email и password обязательны" });
  }

  try {
    const user = await login(email, password);

    const token = createToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json(toUserDto(user));
  } catch (err) {
    res.status(401).json({ error: "Неверный email или пароль" });
  }
};
