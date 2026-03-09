import "./style.css";

document.querySelector("#loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = (document.querySelector("#email") as HTMLInputElement).value;
  const password = (document.querySelector("#password") as HTMLInputElement)
    .value;

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (response.status === 200) {
  }
});
