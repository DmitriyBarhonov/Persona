import express from "express";
import cors from "cors";
import { echoRouter, usersRouter, authRouter } from "./routes/index.js";

export const app = express();

app.use(cors());

app.use(express.json());

app.use("/echo", echoRouter);

app.use("/users", usersRouter);

app.use("/auth", authRouter);
