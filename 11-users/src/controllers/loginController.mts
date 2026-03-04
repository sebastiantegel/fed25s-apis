import bcrypt from "bcryptjs";
import User, { ConvertDbUserToDTO } from "../models/UserSchema.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";

export const login = async (email: string, password: string) => {
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    throw Error("Could not find user with email: " + email);
  }

  const success = await bcrypt.compare(password, foundUser.password);

  if (success) {
    return foundUser;
  } else {
    throw Error("Invalid credentials");
  }
};
