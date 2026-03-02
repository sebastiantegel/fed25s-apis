import { model, Schema } from "mongoose";
import { addressSchema } from "./Address.mjs";

// Beskrivningen av ett objekt i kollektionen persons
const personSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  address: { addressSchema },
});

// {
//     id: 1,
//     name: "Sebasitan",
//     email: "...",
//     address: {
//         street: "Drottninggatan 1",
//         zip: "110 10",
//         city: "Stockholm"
//     }
// }

// Skapar en kollektion som heter persons i databasen
export const Person = model("person", personSchema);
