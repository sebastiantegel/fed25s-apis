import { model, Schema } from "mongoose";
import { todoSchema } from "./TodoSchema.mjs";

const userSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  todos: [todoSchema],
});

export const User = model("user", userSchema);
