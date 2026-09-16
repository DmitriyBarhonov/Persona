import { Router } from "express";
import { userRepository } from "../repositories/user.repository.js";

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email и password обязательны" });
  }

  try {
    const user = await userRepository.create(email, password);
     
    res.status(201).json({createdAt: user.createdAt, email: user.email, id: user.id});
  } catch (err) {
    res.status(409).json({ error: "Пользователь с таким email уже существует" });
  }
});