import express from "express";
import type { UserDTO } from "../models/UserDTO.mjs";
import {
  addTodoToUser,
  createUser,
  getUsers,
} from "../controllers/userController.mjs";

export const userRouter = express.Router();

// GET /user/
userRouter.get("/", async (_, res) => {
  try {
    // Anropa controller för att hämta alla användare
    const users: UserDTO[] = await getUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// POST /user/
userRouter.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || name === "") {
      res.status(400).json({ message: "name is missing in body" });
      return;
    }

    const newUser: UserDTO = await createUser(name, email);

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// PUT /user/addtodo/1770802438100
userRouter.put("/addtodo/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { todoText } = req.body;

    if (!todoText || todoText === "") {
      res.status(400).json({ message: "Missing todoText in body" });
      return;
    }

    const success: boolean = await addTodoToUser(userid, todoText);

    if (success) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Någonting blev fel" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
