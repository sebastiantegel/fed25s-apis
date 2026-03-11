import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./auth.mjs";
import { authSession } from "./middleware/session.mjs";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.set("trust proxy", true);

// Använd middleware
app.use(authSession);
app.use(router);

// Root endpoint för att hämta sessionens data (vem som är inloggad)
app.get("/", async (_, res) => {
  const { session } = res.locals;
  res.status(200).json(session);
});

app.listen(port, () => {
  console.log("Api is running on port " + port);
});
