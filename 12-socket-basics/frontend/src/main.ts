import { io } from "socket.io-client";
import "./style.css";
import type { ListResponse } from "./models/ListResponse";

// Skapa anslutning till vår socket server
const socket = io("http://localhost:3000");

// När anslutningen är klar, fortsätt...
socket.on("connect", () => {
  console.log(socket.connected);

  if (socket.connected) {
    socket.emit("getShoppingList", "Mat");
  }
});

socket.on("gotShoppingList", (result: ListResponse) => {
  console.log("Got list from server:", result.name);
});
