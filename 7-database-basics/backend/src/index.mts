import express, { json } from "express";
import cors from "cors";
import { todoRouter } from "./routes/TodoRouter.mjs";
import mongoose from "mongoose";

// Skapa api:T
const app = express();

// Konfigurera api:t att använda cors (detta gör att vi kan använda
// en webbläsare för våra anrop).
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Vi kan nu använda json i våra anrop
app.use(json());

// Alla anrop till /todos skickas till todoRouter
app.use("/todos", todoRouter);

// Starta api:t
app.listen(3000, async (error) => {
  try {
    if (error) {
      console.error(error);
    }

    await mongoose.connect(
      "mongodb+srv://sebastiantegel:UsMeHBSPvUpUoSs2@cluster0.a2ub8.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=Cluster0",
    );

    console.log("Api is running, connected to the database");
  } catch (error) {
    console.error(error);
  }
});
