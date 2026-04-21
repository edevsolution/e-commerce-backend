import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { userRoles } from "../models/user.model";
import { userService } from "../service/users/user.service";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  mobile?: string;
  email_verified?: boolean;
  address?: string;
  role?: userRoles;
}

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Provide required field!",
      error: true,
      success: false,
    });
  }
  const user = await userService.createUser(req.body);
  return res.status(201).json({
    message: "User created success.",
    data: user,
    success: true,
    error: false,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginUser(req.body);

  res.cookie("accessToken", result.accessToken);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result.user,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  return res.json({
    message: "Sheikh",
  });
});

export const userController = { createUser, getUser, loginUser };
