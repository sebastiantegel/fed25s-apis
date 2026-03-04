import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { registerRouter } from "./routes/registerRoute.mjs";
import { loginRouter } from "./routes/loginRoute.mjs";
import { auth } from "./middlewares/auth.mjs";
import { secretRouter } from "./routes/secretRoute.mjs";
import cookieparser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) throw Error("It should REALLY exists");
if (!dbUrl) throw Error("No MONGO_URL in env file");

const app = express();

app.use(cors());
app.use(json());
app.use(cookieparser());

app.get("/ping", (_, res) => {
  res.status(200).json({ status: "I'm aliiiiive" });
});

// Använd auth för ALLA requests
// app.use(auth);

app.use("/register", registerRouter);
app.use("/login", loginRouter);

// Använd en middleware auth innan användaren kommer till secretRouter
app.use("/secret", auth, secretRouter);
// app.use("/todos", auth, todosRouter);

app.listen(port, async (error) => {
  if (error) {
    console.error(error);
  }

  try {
    await mongoose.connect(dbUrl);
    console.log("Api is up and running, connected to database");
  } catch (error) {
    console.error(error);
  }
});
