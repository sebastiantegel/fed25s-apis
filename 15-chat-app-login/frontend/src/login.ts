import axios from "axios";
import "./style.css";

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userEmail = (document.getElementById("userEmail") as HTMLInputElement)
    .value;
  const userPassword = (
    document.getElementById("userPassword") as HTMLInputElement
  ).value;

  const response = await axios.post(
    "https://fed25s-chat-cbgzhhgncrhjesg8.swedencentral-01.azurewebsites.net/login",
    {
      email: userEmail,
      password: userPassword,
    },
    {
      withCredentials: true,
    },
  );

  if (response.status >= 200 && response.status < 300) {
    sessionStorage.setItem("me", response.data.username);
    location.href = "/";
  }
});
