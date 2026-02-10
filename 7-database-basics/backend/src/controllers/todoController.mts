import type QueryString from "qs";
import { Todo } from "../models/Todo.mjs";
import { TodoModel } from "../models/TodoSchema.mjs";

// Denna lista är vår "data" och det är denna som vi skickar tillbaka och ändrar i genom funktionerna nedan
// const todos: Todo[] = [
//   new Todo(1, "Learn express"),
//   new Todo(2, "Post utan postman :)"),
//   new Todo(3, "Learn controllers"),
// ];

export const getTodos = async (
  q:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
  sort:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
) => {
  // Hämtar alla todos från databasen
  const todos = await TodoModel.find();

  let filteredList = [...todos];

  if (q) {
    filteredList = filteredList.filter((t) =>
      t.text.toLowerCase().startsWith(q as string),
    );
  }

  if (sort) {
    if ((sort as string) === "asc") {
      filteredList.sort((a, b) => {
        if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
        if (b.text.toLowerCase() < a.text.toLowerCase()) return 1;
        return 0;
      });
    } else {
      filteredList.sort((a, b) => {
        if (a.text.toLowerCase() < b.text.toLowerCase()) return 1;
        if (b.text.toLowerCase() < a.text.toLowerCase()) return -1;
        return 0;
      });
    }
  }

  return filteredList;
};

// Alternativ 1
// Hämtar ett objekt från databasen, där id:t i databasen matchar id in i vår funktion
export const getTodo = async (id: string) =>
  await TodoModel.findOne({ id: +id });

// Alternativ 2
// export const getTodo = (id: string) => {
//   return todos.find((t) => t.id === +id);
// };

export const createTodo = async (text: string) => {
  // Skapa en ny todo
  const newTodo = new Todo(Date.now(), text);

  // Lägg till den i listan
  // todos.push(newTodo);
  // Lägg till objektet newTodo i databasen.
  const createdInMongo = await TodoModel.create(newTodo);

  // Skicka tillbaka det nyskapade objektet från databasen
  return createdInMongo;
};

export const removeTodo = async (id: string) => {
  // Hitta positionen som todon som har id:t id har i listan
  // const index = todos.findIndex((t) => t.id === +id);

  // Om positionen fanns (todon finns i listan)
  // if (index >= 0) {
  //   todos.splice(index, 1);
  //   return true;
  // }

  const removedObject = await TodoModel.findOneAndDelete({ id: +id });

  if (removedObject) {
    return true;
  }

  return false;
};

export const updateTodo = async (todo: Todo) => {
  // Hitta todo-objektet i listan
  // const found = todos.find((t) => t.id === todo.id);

  // if (found) {
  // Ändra de egenskaper som vi vill ändra
  //   found.done = todo.done;
  //   found.text = todo.text;
  // }

  await TodoModel.findOneAndUpdate({ id: todo.id }, todo);

  return todo;
};
