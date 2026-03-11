import "./style.css";

document.querySelector("#signin")?.addEventListener("click", async () => {
  // 1. csrf
  const response = await fetch("http://localhost:3000/auth/csrf", {
    credentials: "include",
  });
  const csrfData = await response.json();

  console.log("CSRF:", csrfData.csrfToken);

  // 2. signin
  // Skicka med csrf och callbackurl som formulärdata i body
  const responseSignin = await fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    body: JSON.stringify(
      new URLSearchParams({
        csrfToken: csrfData.csrfToken,
        callbackUrl: "http://localhost:5173",
        json: "true",
      }),
    ),
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const signinData = await responseSignin.text();

  // console.log(signinData);
  document.body.innerHTML = signinData;
});

document.querySelector("#session")?.addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/", {
    credentials: "include",
  });
  const data = await response.json();

  console.log(data.user);

  const userContainer = document.getElementById("user");

  if (userContainer) {
    userContainer.innerHTML = "";

    const name = document.createElement("p");
    const image = document.createElement("img");

    name.textContent = data.user.name;
    image.src = data.user.image;
    image.alt = data.user.name;

    userContainer.appendChild(name);
    userContainer.appendChild(image);
  }
});
