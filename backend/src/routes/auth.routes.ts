import { Router } from "express";
import { loginUser } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", loginUser);
