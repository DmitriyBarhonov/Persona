import { Router } from "express";

export const echoRouter = Router();

echoRouter.post("/", (req, res) => {
    if(req)
  res.json({ youSent: req.body });
});