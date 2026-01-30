import express from "express";
import { Todo } from "../models/Todo.mjs";
import { ApiErrorResponse } from "../models/ApiErrorResponse.mjs";

// Här vet vi att url:en innehåller /todos och vi behöver inte längre ta hänsyn till
// detta i den här filen.

const todos: Todo[] = [
  new Todo(1, "Learn express"),
  new Todo(2, "Learn routes"),
];

export const todoRouter = express.Router();

// Read
// GET - /todos/
todoRouter.get("/", (_, res) => {
  try {
    // Försök att göra någonting
    res.status(200).json(todos);
  } catch (error) {
    // Om det blir fel i try, kommer vi hit.
    res.status(500).json(new ApiErrorResponse("Internal server error", error));
  }
});

// Read
// GET - /todos/2
todoRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const found = todos.find((t) => t.id === +id);
    if (found) {
      res.status(200).json(found);
    } else {
      res.status(400).json({ message: "Could not find todo with id: " + id });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

// Create
// POST - /todos/
todoRouter.post("/", (req, res) => {
  try {
    const { todoText } = req.body;

    console.log("Todo text:", todoText);

    const newTodo = new Todo(Date.now(), todoText);

    todos.push(newTodo);

    res.status(201).json(newTodo);
  } catch (error) {
    res
      .status(500)
      .json(new ApiErrorResponse("Fel vid skapande av todo", error));
  }
});
