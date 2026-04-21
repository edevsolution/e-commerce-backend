import mongoose from "mongoose";

export enum userRoles {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide the name!"],
  },
  email: {
    type: String,
    required: [true, "Provide the email!"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Provide the password!"],
  },
  avatar: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: null,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: mongoose.Schema.ObjectId,
    ref: "address",
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.CUSTOMER],
    default: userRoles.CUSTOMER,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
