import { Router } from "express";
import { login } from "../services/auth.service.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email и password обязательны" });
  }

  try {
    const user = await login(email, password);
    res.json({ id: user.id, email: user.email, createdAt: user.createdAt });
  } catch (err) {
    res.status(401).json({ error: "Неверный email или пароль" });
  }
});
