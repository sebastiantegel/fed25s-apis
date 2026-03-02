import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import { userRouter } from "./routes/userRouter.mjs";

config();

const mongoUri = process.env.MONGO_URI || "";
const port = process.env.PORT || 4000;

if (mongoUri === "") {
  throw "MONGO_URI does not exist in .env";
}

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

// Skicka alla anrop som slutar med /user till userRouter
app.use("/user", userRouter);

// Starta api:t
app.listen(port, async (error) => {
  try {
    if (error) {
      console.error(error);
    }

    await mongoose.connect(mongoUri);

    console.log(`Api is running on port: ${port}, connected to the database`);
  } catch (error) {
    console.error(error);
  }
});
