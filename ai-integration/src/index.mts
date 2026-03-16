import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();

const apiKey = process.env.OPEN_AI_KEY;

if (!apiKey) throw Error("No api key in env file");

app.get("/", async (req, res) => {
  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model: "gpt-5.4",
    input: "Write a one-sentence bedtime story about a unicorn.",
  });

  console.log(response.output);

  res.status(200).send(response.output_text);
});

app.get("/pirate", async (req, res) => {
  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model: "gpt-5.4",
    input: "Are semicolons optional in JavaScript?",
    reasoning: { effort: "medium" },
    instructions: "Talk like a pirate.",
  });

  console.log(response.output_text);

  res.status(200).send(response.output_text);
});

app.get("/todocode", async (req, res) => {
  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model: "gpt-5.4",
    input:
      "Write a simple todo list using typescript. A user should be able to add, remove and change an item.",
    reasoning: { effort: "high" },
  });

  console.log(response.output_text);

  res.status(200).send(response.output_text);
});

app.listen(3000, () => {
  console.log("Api is up and running on port 3000");
});
