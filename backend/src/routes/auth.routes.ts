import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", requireAuth, getMe);
