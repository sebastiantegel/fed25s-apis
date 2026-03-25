import { io } from "socket.io-client";
import "./style.css";
import type { Message } from "@sebastiantegel/edutypes";

const socket = io(
  // "https://fed25s-chat-cbgzhhgncrhjesg8.swedencentral-01.azurewebsites.net",
  "http://localhost:3000",
  {
    withCredentials: true,
    // transports: ["polling", "websocket"],
  },
);
// const socket = io("http://localhost:3000", {
//   withCredentials: true,
// });

let selectedRoom = "";

document.getElementById("newMessageForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const theMessage = (document.getElementById("theMessage") as HTMLInputElement)
    .value;

  socket.emit(
    "sendMessage",
    { message: theMessage, from: "", time: new Date() } satisfies Message,
    selectedRoom,
  );
});

socket.on("connect", () => {
  console.log("Socket:", socket.connected);

  // När ett meddelande har tagits emot och lagrats på servern kommer
  // vi hit efter io.to("...").emit(...) från servern.
  socket.on("newMessage", (theMessage: Message) => {
    // Bygg html baserat på den struktur som Message har
    createMessageHtml(theMessage);
  });

  // Här lyssnar vi efter den händelse som ger oss alla rum
  // i applikationen
  socket.on("roomList", (rooms: string[]) => {
    const roomsContainer = document.querySelector("#rooms");

    if (roomsContainer) {
      // roomsContainer.innerHTML = "";

      // Loopa igenom rummen
      rooms.forEach((room) => {
        // Skapa en knapp per tillgängliga rum
        const roomButton = document.createElement("button");
        roomButton.textContent = room;

        // Vid klick på en knapp
        roomButton.addEventListener("click", () => {
          // Gå med i rummet på servern
          socket.emit("joinRoom", room);

          // Lagra vårt valda rum så att vi kan skicka meddelanden dit
          selectedRoom = room;

          document.getElementById("rooms")?.classList.toggle("hide");
          document.getElementById("chat-container")?.classList.toggle("hide");
        });

        roomsContainer.appendChild(roomButton);
      });
    }
  });

  socket.on("chatHistory", (messages: Message[]) => {
    messages.forEach((message) => {
      createMessageHtml(message);
    });
  });
});

function createMessageHtml(theMessage: Message) {
  const chat = document.getElementById("chat");
  const messageContainer = document.createElement("div");

  const fromTag = document.createElement("span");
  const messageTag = document.createElement("span");
  const timeTag = document.createElement("span");

  fromTag.textContent = theMessage.from + ": ";
  messageTag.textContent = theMessage.message;

  console.log(new Date(theMessage.time));
  const time = new Date(theMessage.time);

  timeTag.textContent =
    time.toLocaleDateString() + " " + time.toLocaleTimeString();

  if (theMessage.from === sessionStorage.getItem("me")) {
    messageContainer.className = "me";
  }

  // messageContainer.className = theMessage.from === username ? "me" : "";

  messageContainer?.appendChild(fromTag);
  messageContainer?.appendChild(messageTag);
  messageContainer?.appendChild(timeTag);

  chat?.appendChild(messageContainer);
}
