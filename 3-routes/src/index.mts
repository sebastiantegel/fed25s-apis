import express, { json } from "express";
import { todoRouter } from "./routes/todoRouter.mjs";

// Skapar api
const app = express();

// Konfigurera api
app.use(json());

// Endpoints

// Skickar alla anrop som slutar med /todos till todoRouter
app.use("/todos", todoRouter);

// Starta api
app.listen(3000, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Api is running");
  }
});
