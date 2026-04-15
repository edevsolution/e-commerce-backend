import express, { Application } from "express";
import cors from "cors";
import { indexRouter } from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.use("/api/v1", indexRouter);

export default app;
