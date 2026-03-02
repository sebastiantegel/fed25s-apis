// Skapa och sätt igång api:t

import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { personRouter } from "./routers/PersonRouter.mjs";

config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI || "";

if (MONGO_URL === "") {
  throw Error("No valid mongo url is in .env");
}

// Skapar vår applikation
const app = express();

// Alla anrop som slutar med /persons -> personRouter
app.use("/persons", personRouter);

// Starta api:t
app.listen(PORT, async (error) => {
  if (error) console.error(error);

  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.error(error);
  }

  console.log("Api is running on port: " + PORT);
});
