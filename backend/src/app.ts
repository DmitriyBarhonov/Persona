import express from "express";
import cors from "cors";
import { echoRouter, usersRouter, authRouter } from "./routes/index.js";

export const app = express();

// Разрешает фронту (другой origin) стучаться на этот сервер.
app.use(cors());

// Парсит JSON-тело запроса в req.body — без этого req.body всегда пуст.
app.use(express.json());

app.use("/echo", echoRouter);

app.use("/users", usersRouter);

app.use("/auth", authRouter);
