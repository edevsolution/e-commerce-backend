import { Router } from "express";
import userModel from "../models/user.model";

const router = Router();

router.post("/", async (req, res) => {
  const response = await userModel.create({
    name: "Sheikh Lukman.",
  });
  return res.status(201).json({
    message: "User created successfully.",
    data: response,
  });
});

export const userRouter: Router = router;
