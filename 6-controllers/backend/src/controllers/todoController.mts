import type QueryString from "qs";
import { Todo } from "../models/Todo.mjs";

// Denna lista är vår "data" och det är denna som vi skickar tillbaka och ändrar i genom funktionerna nedan
const todos: Todo[] = [
  new Todo(1, "Learn express"),
  new Todo(2, "Post utan postman :)"),
  new Todo(3, "Learn controllers"),
];

export const getTodos = (
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
export const getTodo = (id: string) => todos.find((t) => t.id === +id);

// Alternativ 2
// export const getTodo = (id: string) => {
//   return todos.find((t) => t.id === +id);
// };

export const createTodo = (text: string) => {
  // Skapa en ny todo
  const newTodo = new Todo(Date.now(), text);

  // Lägg till den i listan
  todos.push(newTodo);

  // Skicka tillbaka det nyskapade objektet
  return newTodo;
};

export const removeTodo = (id: string) => {
  // Hitta positionen som todon som har id:t id har i listan
  const index = todos.findIndex((t) => t.id === +id);

  // Om positionen fanns (todon finns i listan)
  if (index >= 0) {
    todos.splice(index, 1);
    return true;
  }

  return false;
};

export const updateTodo = (todo: Todo) => {
  // Hitta todo-objektet i listan
  const found = todos.find((t) => t.id === todo.id);

  if (found) {
    // Ändra de egenskaper som vi vill ändra
    found.done = todo.done;
    found.text = todo.text;
  }

  return found;
};
