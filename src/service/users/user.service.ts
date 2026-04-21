import { IUser } from "../../controllers/user.controller";
import bcrypt from "bcryptjs";
import userModel, { userRoles } from "../../models/user.model";
import AppError from "../../utils/AppError";

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

export const userService = { createUser };
