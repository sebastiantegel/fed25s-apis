import express, { json } from "express";
import cors from "cors";
import { todoRouter } from "./routes/TodoRouter.mjs";

// Skapa api:T
const app = express();

// Konfigurera api:t att använda cors (detta gör att vi kan använda
// en webbläsare för våra anrop).
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Vi kan nu använda json i våra anrop
app.use(json());

// Alla anrop till /todos skickas till todoRouter
app.use("/todos", todoRouter);

// Starta api:t
app.listen(3000, (error) => {
  if (error) {
    console.error("An error occured:", error);
  }

  console.log("Api is running");
});
