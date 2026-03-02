import type { Todo } from "../models/Todo";
import { getTodos, removeTodo, updateTodo } from "../services/todoService";

/**
 * Skapar ett span-element med todo-text
 */
const createTodoTextElement = (todo: Todo): HTMLSpanElement => {
  const span = document.createElement("span");
  span.textContent = todo.text;

  if (todo.done) {
    span.className = "done";
  }

  return span;
};

/**
 * Skapar en knapp för att ändra todo-status
 */
const createToggleButton = (todo: Todo): HTMLButtonElement => {
  const button = document.createElement("button");
  button.textContent = "Ändra";
  button.addEventListener("click", () => handleToggleTodo(todo));
  return button;
};

/**
 * Skapar en knapp för att ta bort en todo
 */
const createRemoveButton = (todoId: number): HTMLButtonElement => {
  const button = document.createElement("button");
  button.textContent = "Ta bort";
  button.addEventListener("click", () => handleRemoveTodo(todoId));
  return button;
};

/**
 * Skapar ett komplett li-element för en todo
 */
const createTodoListItem = (todo: Todo): HTMLLIElement => {
  const li = document.createElement("li");
  const textElement = createTodoTextElement(todo);
  const toggleButton = createToggleButton(todo);
  const removeButton = createRemoveButton(todo.id);

  li.appendChild(textElement);
  li.appendChild(toggleButton);
  li.appendChild(removeButton);

  return li;
};

/**
 * Hanterar växling av todo-status (done/undone)
 */
const handleToggleTodo = async (todo: Todo): Promise<void> => {
  try {
    const updatedTodo: Todo = { ...todo, done: !todo.done };
    const success = await updateTodo(todo.id, updatedTodo);

    if (success) {
      await refreshTodoList();
    } else {
      console.error("Kunde inte uppdatera todo");
      // TODO: Visa felmeddelande för användaren
    }
  } catch (error) {
    console.error("Ett fel uppstod vid uppdatering av todo:", error);
    // TODO: Visa felmeddelande för användaren
  }
};

/**
 * Hanterar borttagning av en todo
 */
const handleRemoveTodo = async (todoId: number): Promise<void> => {
  try {
    const success = await removeTodo(todoId);

    if (success) {
      await refreshTodoList();
    } else {
      console.error("Kunde inte ta bort todo");
      // TODO: Visa felmeddelande för användaren
    }
  } catch (error) {
    console.error("Ett fel uppstod vid borttagning av todo:", error);
    // TODO: Visa felmeddelande för användaren
  }
};

/**
 * Uppdaterar todo-listan genom att hämta aktuell data och rendera om
 */
const refreshTodoList = async (): Promise<void> => {
  const todos = await getTodos();
  createHtml(todos);
};

/**
 * Renderar en lista med Todo-objekt på skärmen
 */
export const createHtml = (todos: Todo[]): void => {
  const todoListElement = document.getElementById("todos");

  if (!todoListElement) {
    console.error("Kunde inte hitta element med id 'todos'");
    return;
  }

  // Töm befintligt innehåll
  todoListElement.innerHTML = "";

  // Skapa och lägg till varje todo-item
  todos.forEach((todo) => {
    const todoItem = createTodoListItem(todo);
    todoListElement.appendChild(todoItem);
  });
};
