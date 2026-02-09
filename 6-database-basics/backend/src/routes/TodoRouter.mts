import express from "express";
import { Todo } from "../models/Todo.mjs";

export const todoRouter = express.Router();

// Denna lista är vår "data" och det är denna som vi skickar tillbaka och ändrar i genom funktionerna nedan
const todos: Todo[] = [
  new Todo(1, "Learn express"),
  new Todo(2, "Post utan postman :)"),
  new Todo(3, "Learn delete"),
];

// GET - /todos/
todoRouter.get("/", (_, res) => {
  // Försök att...
  try {
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
  // Försök at...
  try {
    // Hämta id:t från params (URL:n)
    const { id } = req.params;
    // Sök efter en todo som har id:t id
    const found = todos.find((t) => t.id === +id);

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

// POST - /todos/
todoRouter.post("/", (req, res) => {
  // Försök att...
  try {
    // Hitta egenskapen todoText från requestens body (Här krävs json() i index.mts)
    const { todoText } = req.body;

    // Grundläggande validering (bör göras bättre)
    if (todoText) {
      // Skapa en ny todo
      const newTodo = new Todo(Date.now(), todoText);

      // Lägg till den i listan
      todos.push(newTodo);

      // Skicka tillbaka todon med status 201 - Created
      res.status(201).json(newTodo);
    } else {
      // Om todoText inte finns, returnera 400 - Bad request och ett felmeddelande
      res
        .status(400)
        .json({ message: "Body does not contain property todoText" });
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

    // Hitta positionen som todon som har id:t id har i listan
    const index = todos.findIndex((t) => t.id === +id);

    // Om positionen fanns (todon finns i listan)
    if (index >= 0) {
      // Ta bort positionen från listan
      todos.splice(index, 1);

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
