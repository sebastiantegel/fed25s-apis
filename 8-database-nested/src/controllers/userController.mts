import type { TodoDTO } from "../models/TodoDTO.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";
import { User } from "../models/UserSchema.mjs";

export const getUsers = async () => {
  const usersFromDb = await User.find();

  const dtos: UserDTO[] = usersFromDb.map((userFromDb) => {
    return {
      id: userFromDb.id,
      name: userFromDb.name,
      todos: userFromDb.todos.map((t) => {
        return {
          id: t.id,
          text: t.text,
          done: t.done,
        } satisfies TodoDTO;
      }),
    } satisfies UserDTO;
  });

  return dtos;
};

export const createUser = async (name: string, email: string) => {
  const theNewUser = {
    id: Date.now(),
    name,
    email,
    todos: [],
  };

  const createdUser = await User.create(theNewUser);

  return {
    id: createdUser.id,
    name: createdUser.name,
    todos: createdUser.todos.map((t) => {
      return {
        id: t.id,
        text: t.text,
        done: t.done,
      } satisfies TodoDTO;
    }),
  } satisfies UserDTO;
};

export const addTodoToUser = async (userId: string, text: string) => {
  const foundUser = await User.findOne({ id: +userId });

  if (!foundUser) return false;

  const todoToAdd = {
    id: Date.now(),
    text,
    done: false,
  };
  foundUser.todos.push(todoToAdd);

  await foundUser.save();

  return true;
};
