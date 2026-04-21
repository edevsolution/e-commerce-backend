import { IUser } from "../../controllers/user.controller";
import bcrypt from "bcryptjs";
import userModel, { userRoles } from "../../models/user.model";
import AppError from "../../utils/AppError";
import jwt from "jsonwebtoken";

const createUser = async (payload: IUser) => {
  const { name, email, password, address, avatar, mobile } = payload;
  const normalizedEmail = email.toLowerCase();
  const existUser = await userModel.findOne({
    email: normalizedEmail,
  });
  if (existUser) {
    throw new AppError("User already exist", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
    address: address || null,
    avatar: avatar || "",
    mobile: mobile || null,
    role: userRoles.CUSTOMER,
  });
  const result = user.toObject() as Partial<typeof user>;
  delete result.password;
  return result;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const normalizedEmail = email.toLowerCase();

  const user = await userModel
    .findOne({ email: normalizedEmail })
    .select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  const result = user.toObject() as Partial<typeof user>;
  delete result.password;

  return {
    accessToken: token,
    user: result,
  };
};

export const userService = { createUser, loginUser };
