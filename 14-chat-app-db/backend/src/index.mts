import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import type { Message } from "./models/message.mjs";
import type { Chat } from "./models/Chat.mjs";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

const rooms = ["Next.js", "express", "socket.io"];
const chats: Chat[] = [];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendMessage", (theMessage: Message, room: string) => {
    // Lagra meddelandet i en lista eller databas
    // Sök efter chatten i listan med chattar
    const foundChat = chats.find((c) => c.name === room);

    // Om chatten hittades
    if (foundChat) {
      // Lägg till meddelandet i chatten
      foundChat.messages.push(theMessage);
    } else {
      // Annars skapa en ny chat och lägg till det första meddelandet
      chats.push({ name: room, messages: [theMessage] });
    }

    // console.log("Got message from client:", theMessage);
    console.log(chats);

    // Skickar till alla
    // io.emit("newMessage", theMessage);

    // Skickar bara till rummet room
    io.to(room).emit("newMessage", theMessage);
  });

  socket.on("joinRoom", (room: string) => {
    // Lägg till webbläsaren (personen) i det rum som valdes
    // i webbläsaren
    socket.join(room);

    // Skicka all historik till webbläsaren för den valda chatten
    const foundChat = chats.find((c) => c.name === room);

    if (foundChat) {
      socket.emit("chatHistory", foundChat.messages);
    }
  });

  // Skicka listan med rum till webbläsaren
  socket.emit("roomList", rooms);
});

server.listen(3000, () => {
  console.log("Api is running on port 3000");
});
