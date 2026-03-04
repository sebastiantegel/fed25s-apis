import bcrypt from "bcryptjs";
import type { UserType } from "../models/UserSchema.mjs";
import User from "../models/UserSchema.mjs";

export const createUser = async (user: UserType) => {
  const found = await User.find({ email: user.email });

  if (found) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  console.log("Salt:", salt);
  console.log("Hash:", hash);

  user.password = hash;

  return await User.create(user);
};
