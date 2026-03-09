import "./style.css";

document
  .querySelector("#registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = (document.querySelector("#name") as HTMLInputElement).value;
    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement)
      .value;

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.status === 200) {
      // Skapa meddelande att det gick bra
    }
  });
