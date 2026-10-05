import { Router } from "express";
import { createUser } from "../controllers/users.controller.js";

export const usersRouter = Router();

usersRouter.post("/", createUser);
