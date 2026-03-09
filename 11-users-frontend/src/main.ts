import type { SecretResponse } from "./models/SecretResponse";
import "./style.css";

// document.querySelector("#getSecret")?.addEventListener("click", () => {});
document.getElementById("getSecret")?.addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/secret", {
    credentials: "include",
  });

  if (response.status === 200) {
    // data -> { message: "The most secret secret of them all "}
    const data: SecretResponse = await response.json();

    const result = document.getElementById("result");
    if (result) {
      result.textContent = data.message;
    }
  }
});
