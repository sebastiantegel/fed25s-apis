import express from "express";
import type { Todo } from "./models/Todo.mjs";

const todoList: Todo[] = [
  { id: 1, text: "Lorem", done: false },
  { id: 2, text: "ipsum", done: false },
  { id: 3, text: "doloe", done: true },
];

// app är mitt api
const app = express();

// GET requests till http://localhost:3000/
app.get("/", (_, res) => {
  res.status(200).send("Hello world");
});

// GET request till http://localhost:3000/todos
app.get("/todos", (_, res) => {
  res.status(200).json(todoList);
});

// GET request till http://localhost:3000/todos/2
app.get("/todos/:id", (req, res) => {
  // id -> "2"
  const { id } = req.params;

  // Hitta objektet med id 2 i listan
  const foundTodo = todoList.find((t) => t.id === +id);

  // Om vi hittade objektet
  if (foundTodo) {
    // Skicka tillbaka OK och objeket
    res.status(200).json(foundTodo);
  } else {
    // Annars skicka tillbaka 400 och ett fel
    res.status(400).json({ error: "Invalid id" });
  }
});

// "Starta" api:t och lyssna efter anrop på port 3000
app.listen(3000, () => {
  console.log("Api is running on port 3000");
});
