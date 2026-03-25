import axios from "axios";
import "./style.css";

document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = (document.getElementById("userName") as HTMLInputElement)
      .value;
    const userEmail = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const userPassword = (
      document.getElementById("userPassword") as HTMLInputElement
    ).value;

    const response = await axios.post(
      "https://fed25s-chat-cbgzhhgncrhjesg8.swedencentral-01.azurewebsites.net/register",
      {
        username: userName,
        email: userEmail,
        password: userPassword,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data);

    location.href = "/";
  });
