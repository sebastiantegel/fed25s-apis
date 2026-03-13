import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

app.get("/", (_, res) => {
  res.status(200).json({ message: "I'm alive" });
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("getShoppingList", (listName: string) => {
    console.log("A user wants to get a shoppinglist:", listName);

    // Hämta data från en databas

    socket.emit("gotShoppingList", { name: listName, items: [] });
  });
});

server.listen(3000, () => {
  console.log("Server is running...");
});
