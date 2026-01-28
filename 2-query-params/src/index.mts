import express from "express";
import { Todo } from "./models/Todo.mjs";

const todos: Todo[] = [
  new Todo(1, "Learn nextjs"),
  new Todo(2, "Learn express"),
  new Todo(3, "Träna"),
];

// Skapa api
const app = express();

// Skapa endpoints
app.get("/todos", (req, res) => {
  // Destructuring
  const { searchtext, sort } = req.query;

  let filteredList = todos;

  if (searchtext) {
    // console.log("Searchtext:", searchtext.toString());
    filteredList = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchtext.toString())
    );
  }

  if (sort) {
    // console.log("Sort:", sort);
    // filteredList.sort((a, b) => {
    //   if (sort === "asc") {
    //     if (a.id > b.id) return 1;
    //     if (a.id < b.id) return -1;

    //     return 0;
    //   } else {
    //     if (a.id > b.id) return -1;
    //     if (a.id < b.id) return 1;

    //     return 0;
    //   }
    // });
    const direction = sort === "asc" ? 1 : -1;

    // a.id = 1
    // b.id = 2
    // sort === asc
    // a.id - b.id = -1 => -1 * 1 = -1
    // sort === desc -> direction = -1
    // a.id - b.id = -1 => -1 * -1 = 1
    filteredList.sort((a, b) => (a.id - b.id) * direction);

    // const copy = [...filteredList] -> Kopia av filteredList (spread operator)
  }

  res.status(200).json(filteredList);
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  //   console.log(id);
  //   res.status(203).send();

  const found = todos.find((todo) => todo.id === +id);

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(400).json({ message: "Todo with id: " + id + " was not found" });
  }
});

// Starta api
app.listen(3000, () => {
  console.log("Api is running...");
});
