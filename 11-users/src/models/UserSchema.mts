import { model, Schema, type InferSchemaType } from "mongoose";
import type { UserDTO } from "./UserDTO.mjs";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model("user", userSchema);
export default User;

export type UserType = InferSchemaType<typeof userSchema>;

export const ConvertDbUserToDTO = (user: UserType): UserDTO => {
  return { name: user.name, email: user.email };
};
