import express from "express";
import { login } from "../controllers/loginController.mjs";
import jwt from "jsonwebtoken";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "No login credentials send" });
  }

  try {
    const loggedInUser = await login(email, password);

    const token = jwt.sign(loggedInUser, process.env.JWT_SECRET!);

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    res.cookie("login", token, {
      httpOnly: false,
      expires,
    });

    res.status(200).json({ name: loggedInUser.name });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
