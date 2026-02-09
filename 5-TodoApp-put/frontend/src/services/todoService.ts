import type { Todo } from "../models/Todo";

// GET - /todos/
export const getTodos = async () => {
  // Försök att...
  try {
    // Anropa api:t genom GET - /todos
    const response = await fetch("http://localhost:3000/todos");

    // Resultatet av detta anrop blir en Todo[], en listan med Todo-objekt
    const data: Todo[] = await response.json();

    // Skicka tillbaka listan
    return data;
  } catch {
    // Om det inte går att använda api:t kommer vi hit.
    console.error("Could not fetch data from api");

    // Skicka då tillbaka en tom lista
    return [];
  }
};

// GET - /todos/3
export const getTodoById = async (id: number) => {
  // Anropa api:t genom att lägga på id:t sist i url:en
  const response = await fetch("http://localhost:3000/todos/" + id);

  // Resultatet blir ett Todo-objekt
  const data: Todo = await response.json();

  // Returnera objektet
  return data;
};

// POST - /todos/
export const createTodo = async (text: string) => {
  // Anropa api:t genom POST - /todos och skapa en body som innehåller:
  // { todoText: 'texten från textrutan' }
  // headers berättar att vi skickar data i json
  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ todoText: text }),
  });

  // Resultatet kommer att blir det Todo-objekt som skapades
  const data: Todo = await response.json();

  // Skicka tillbaka objektet
  return data;
};

// DELETE - /todos/3
export const removeTodo = async (id: number) => {
  try {
    // Anropa api:t med DELETE - /todos/3 där id:t kommer från den
    // todo som vi klickade på.
    const response = await fetch("http://localhost:3000/todos/" + id, {
      method: "DELETE",
    });

    // Skicka tillbaka resultatet
    return response.ok;
  } catch {
    return false;
  }
};
