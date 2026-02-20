// Syftet med denna fil är att hantera alla anrop som slutar med /persons

import express from "express";
import {
  createPerson,
  getPerson,
  getPersons,
} from "../controllers/PersonController.mjs";

export const personRouter = express.Router();

// Skapa CRUD-endpoints för vårt api.

// Create - Syfte är att kontrollera input och generera ett svar
personRouter.post("/", async (req, res) => {
  try {
    // Ta emot input (param, query, body)
    // param -> /persons/14
    // query -> /persons?email=sebastian@test.com
    // body -> { name: "Sebastian", email: "sebastian@test.com" }
    const { name, email, street, zip, city } = req.body;

    // Validera input
    if (name && name === "") {
      res.status(400).json({ message: "Saknar name i body " });
      return;
    }

    // Anropa kontroller för att göra förändringen
    const theNewPerson = await createPerson(name, email);

    // Om allting går bra, returnera "Yes, det gick bra!"
    res.status(200).json(theNewPerson);
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify(error));
  }
});

// Read - Syfte är att kontrollera input och generera ett svar
personRouter.get("/", async (_, res) => {
  try {
    // Anropa kontroller för att göra förändringen
    const persons = await getPersons();

    res.status(200).json(persons);
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify(error));
  }
});

// Read - Syfte är att kontrollera input och generera ett svar
personRouter.get("/:id", async (req, res) => {
  try {
    // Ta emot input
    const { id } = req.params;

    // Anropa kontroller för att göra förändringen
    const persons = await getPerson(id);

    res.status(200).json(persons);
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify(error));
  }
});

// Update - Syfte är att kontrollera input och generera ett svar
personRouter.put("/", async (req, res) => {
  try {
    // Anropa kontroller för att göra förändringen
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify(error));
  }
});

// Delete - Syfte är att kontrollera input och generera ett svar
personRouter.delete("/", async (req, res) => {
  try {
    // Anropa kontroller för att göra förändringen
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify(error));
  }
});
