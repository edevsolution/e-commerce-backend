import express, { Application } from "express";
import cors from "cors";
import { indexRouter } from "./routes";
import globalErrorHandler from "./middleware/errorHandler";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app: Application = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.use("/api/v1", indexRouter);

app.use(globalErrorHandler);

export default app;
