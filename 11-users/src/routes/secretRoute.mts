import express from "express";

export const secretRouter = express.Router();

secretRouter.get("/", (_, res) => {
  res.status(200).json({ message: "The most secret secret of them all" });
});
