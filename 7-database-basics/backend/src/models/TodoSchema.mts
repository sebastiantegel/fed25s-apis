import { model, Schema } from "mongoose";

const todoSchema = new Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true, minLength: 3 },
  done: Boolean,
});

export const TodoModel = model("Todo", todoSchema);
