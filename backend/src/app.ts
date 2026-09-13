import express from "express";
import cors from "cors";
import { echoRouter } from "./routes/echo.routes.js";
import { usersRouter } from "./routes/users.routes.js";

export const app = express();

app.use(cors());

app.use(express.json());

app.use('/echo', echoRouter)

app.use("/users", usersRouter);