import { createTodo, getTodos } from "./services/todoService";
import "./style.css";
import { createHtml } from "./utils/htmlUtil";

// Lyssna efter händelsen submit från vårt formulär
document.getElementById("todoform")?.addEventListener("submit", async (e) => {
  // Avbryt standardbeteendet i webbläsaren
  e.preventDefault();

  // Hitta vad som står i vår textruta
  const theUserText = (document.getElementById("todotext") as HTMLInputElement)
    .value;

  // Anropa api:t genom funktionen createTodo i todoService
  // data är resultatet (den todo som skapades)
  const data = await createTodo(theUserText);

  console.log(data);

  // Töm textrutan efter att en todo skapades.
  (document.getElementById("todotext") as HTMLInputElement).value = "";

  // Hämta alla todos (inklusive den som skapades)
  const todos = await getTodos();
  // Rita ut dem på skärmen
  createHtml(todos);
});

// När vi börjar, hämta alla todos från api:t
const todos = await getTodos();

// Rita ut dem på skärmen
createHtml(todos);
