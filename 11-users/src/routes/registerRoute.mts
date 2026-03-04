import express from "express";
import { createUser } from "../controllers/registerController.mjs";
import { ConvertDbUserToDTO } from "../models/UserSchema.mjs";

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing stuff in body" });
  }

  try {
    const createdUser = await createUser({ name, email, password });

    const dto = ConvertDbUserToDTO(createdUser);

    res.status(201).json(dto);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
