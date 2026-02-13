import { model, Schema, type InferSchemaType } from "mongoose";
import { todoSchema } from "./TodoSchema.mjs";
import type { UserDTO } from "./UserDTO.mjs";
import type { TodoDTO } from "./TodoDTO.mjs";

const userSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  todos: [todoSchema],
});

export const User = model("user", userSchema);

export type UserFromDb = InferSchemaType<typeof userSchema>;

export const convertDbUserToDto = (dbUser: UserFromDb): UserDTO => {
  return {
    id: dbUser.id,
    name: dbUser.name,
    todos: dbUser.todos.map((t) => {
      return {
        id: t.id,
        text: t.text,
        done: t.done,
      } satisfies TodoDTO;
    }),
  } satisfies UserDTO;
};
