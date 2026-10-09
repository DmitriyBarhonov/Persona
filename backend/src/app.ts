import express from "express";
import cors from "cors";
import { echoRouter, usersRouter, authRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";

export const app = express();

// Разрешает фронту (другой origin) стучаться на этот сервер.
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Парсит JSON-тело запроса в req.body — без этого req.body всегда пуст.
app.use(express.json());

app.use(cookieParser());

app.use("/echo", echoRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
