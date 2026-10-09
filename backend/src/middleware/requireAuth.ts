import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

// Охранник: без валидного токена в cookie дальше запрос не пускает.
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Не авторизован" });
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret!) as { userId: number };
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Не авторизован" });
  }
};
