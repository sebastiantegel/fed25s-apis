import { convertDbUserToDto, User } from "../models/UserSchema.mjs";

export const getUsers = async () => {
  const usersFromDb = await User.find();

  return usersFromDb.map((userFromDb) => convertDbUserToDto(userFromDb));
};

export const createUser = async (name: string, email: string) => {
  const theNewUser = {
    id: Date.now(),
    name,
    email,
    todos: [],
  };

  const createdUser = await User.create(theNewUser);

  return convertDbUserToDto(createdUser);
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
