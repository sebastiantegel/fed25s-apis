import type { TodoDTO } from "./TodoDTO.mjs";

export type UserDTO = {
  id: number;
  name: string;
  todos: TodoDTO[];
};
