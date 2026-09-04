import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/echo", (req, res) => {
  res.json({ youSent: req.body });
});

app.listen(4000, () => {
  console.log("Слушаю на http://localhost:4000");
});
