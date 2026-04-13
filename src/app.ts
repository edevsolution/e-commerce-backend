import express, { Application } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.use("/api/v1/users", userRouter);

export default app;
