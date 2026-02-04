import type { Todo } from "../models/Todo";
import { getTodos, removeTodo } from "../services/todoService";

// Funktion för att rita ut en lista med Todo-objekt på skärmen
export const createHtml = (todos: Todo[]) => {
  // Hitta ul-taggen i DOM:en
  const ul = document.getElementById("todos");

  // Om den finns...
  if (ul) {
    // Töm den på innehåll
    ul.innerHTML = "";
  }

  // Loopa igenom todo-listan
  todos.forEach((todo) => {
    // För varje todo:

    // Skapa en li-tagg
    const li = document.createElement("li");

    // Sätt texten i li-taggen
    li.innerHTML = todo.text;

    // Gör li-taggen klickbar
    li.addEventListener("click", async () => {
      // Om användaren klickar på li:n:

      // Anropa removeTodo i todoService (kommer att försöka ta bort en todo)
      const success = await removeTodo(todo.id);

      // Om det gick bra
      if (success) {
        // Hämta alla todos från api:t
        const todos = await getTodos();

        // Rita ut alla todos på skärmen
        createHtml(todos);
      } else {
        // Present error message
      }
    });

    // Lägg till sist till li-taggen i vår ul
    ul?.appendChild(li);
  });
};
