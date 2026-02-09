import type { Todo } from "../models/Todo";
import { getTodos, removeTodo, updateTodo } from "../services/todoService";

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
    const span = document.createElement("span");
    const toggleButton = document.createElement("button");
    const removeButton = document.createElement("button");

    // Sätt texten i li-taggen
    span.innerHTML = todo.text;
    toggleButton.innerHTML = "Ändra";
    removeButton.innerHTML = "Ta bort";

    if (todo.done) {
      span.className = "done";
    }

    // Gör li-taggen klickbar
    removeButton.addEventListener("click", async () => {
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

    toggleButton.addEventListener("click", async () => {
      const success = await updateTodo(todo.id, { ...todo, done: !todo.done });

      if (success) {
        const todos = await getTodos();
        createHtml(todos);
      } else {
        // Generera ett felmeddelande
      }
    });

    li.appendChild(span);
    li.appendChild(toggleButton);
    li.appendChild(removeButton);

    // Lägg till sist till li-taggen i vår ul
    ul?.appendChild(li);
  });
};
