import express from "express";
import { Todo } from "../models/Todo.mjs";
import {
  createTodo,
  getTodo,
  getTodos,
  removeTodo,
  updateTodo,
} from "../controllers/todoController.mjs";

export const todoRouter = express.Router();

// GET - /todos/
todoRouter.get("/", (req, res) => {
  // Försök att...
  try {
    const { q, sort } = req.query;

    // Anropa funktionen som finns i todoController.
    const todos = getTodos(q, sort);

    // Skicka tillbaka listan med stats 200 - OK
    res.status(200).json(todos);
  } catch (error) {
    // Om det inte gick kommer vi hit.
    console.error(error);
    res.status(500).json({ message: error });
  }
});

// GET - /todos/3
todoRouter.get("/:id", (req, res) => {
  // Försök att...
  try {
    // Hämta id:t från params (URL:n)
    const { id } = req.params;

    // Sök efter en todo som har id:t id
    const found = getTodo(id);

    // Om todon hittades
    if (found) {
      // Skicka tillbaka den med status 200 - OK
      res.status(200).json(found);
    } else {
      // Annars skicka tillbaka 400 - Bad Request och ett felmeddelande
      res.status(400).json({ message: "No todo found with id: " + id });
    }
  } catch (error) {
    // Hit kommer vi om någonting krashar
    console.error(error);
    res.status(500).json({ message: error });
  }
});

// POST - /todos/ - body
todoRouter.post("/", (req, res) => {
  // Försök att...
  try {
    // Hitta egenskapen todoText från requestens body (Här krävs json() i index.mts)
    const { todoText }: { todoText: string } = req.body;

    // Grundläggande validering (bör göras bättre)
    if (todoText && todoText !== "") {
      const newTodo = createTodo(todoText);

      // Skicka tillbaka todon med status 201 - Created
      res.status(201).json(newTodo);
    } else {
      // Om todoText inte finns, returnera 400 - Bad request och ett felmeddelande
      res.status(400).json({
        message: "Body does not contain property todoText or an empty todoText",
      });
    }
  } catch (error) {
    // Hit kommer vi om någonting krashar
    console.error(error);
    res.status(500).json({ message: error });
  }
});

// DELETE - /todos/3
todoRouter.delete("/:id", (req, res) => {
  // Försök att...
  try {
    // Hitta id:t från params (från URL)
    const { id } = req.params;

    // Anropa removeTodo som ger oss true/false tillbaka
    const success = removeTodo(id);

    if (success) {
      // Skicka tillbaka 204 - No Content
      res.status(204).json();
    } else {
      // Om todon inte fanns, skicka tillbaka 400 - Bad Request med ett felmeddelande
      res.status(400).json({ message: "Cannot find todo with id: " + id });
    }
  } catch (error) {
    // Hit kommer vi om någonting krashar
    console.error(error);
    res.status(500).json({ message: error });
  }
});

// PUT - /todos/3 - body
todoRouter.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { todo }: { todo: Todo } = req.body;

    // Kontrollera att id och body-objektet matchar
    if (+id !== todo.id) {
      // Om inte, skicka ett fel
      res.status(400).json({ message: "Parameter and body does not match" });
    }
    // Annars, gör detta
    else {
      const found = updateTodo(todo);

      // Ändra objektet
      if (found) {
        // Skicka tillbaka ett resultat
        res.status(200).json(found);
      } else {
        // Skicka tillbaka ett resultat
        res.status(404).json({ message: "Could not find the todo" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
