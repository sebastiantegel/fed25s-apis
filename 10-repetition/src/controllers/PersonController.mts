// Syftet med denna fil är att innehålla funktioner som kommunicerar med databasen

import { Person } from "../models/Person.mjs";

export const createPerson = async (name: string, email: string) => {
  return await Person.create({
    id: Date.now(),
    name,
    email,
    // address: {

    // }
  });
};

export const getPersons = async () => {
  return await Person.find();
};

export const getPerson = async (id: string) => {
  return await Person.findOne({ id: +id });
};
