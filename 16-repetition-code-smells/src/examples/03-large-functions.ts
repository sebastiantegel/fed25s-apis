// =============================================================
// CODE SMELL 3: Large Functions
// =============================================================
// One function does too many things at once: validation,
// DOM manipulation, business logic, and state updates.
// This makes the function hard to read, test and maintain.
// =============================================================

// ❌ CODE SMELL – One massive function doing everything

export function mountLargeFunctionSmell(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Code Smell 3: Large Function";
  container.appendChild(title);

  const description = document.createElement("p");
  description.textContent = "Fill in the registration form below:";
  container.appendChild(description);

  const form = document.createElement("form");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Full name";
  nameInput.id = "smell-name";

  const emailInput = document.createElement("input");
  emailInput.type = "text";
  emailInput.placeholder = "Email address";
  emailInput.id = "smell-email";

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.id = "smell-password";

  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.textContent = "Register";

  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  container.appendChild(form);

  const resultArea = document.createElement("div");
  container.appendChild(resultArea);

  // ❌ This single function handles validation, formatting,
  //    DOM updates, and mock API calls all at once.
  submitButton.addEventListener("click", () => {
    resultArea.innerHTML = "";

    // --- Validation logic ---
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (name.length < 2) {
      const error = document.createElement("p");
      error.style.color = "red";
      error.textContent = "Name must be at least 2 characters.";
      resultArea.appendChild(error);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      const error = document.createElement("p");
      error.style.color = "red";
      error.textContent = "Please enter a valid email address.";
      resultArea.appendChild(error);
      return;
    }

    if (password.length < 8) {
      const error = document.createElement("p");
      error.style.color = "red";
      error.textContent = "Password must be at least 8 characters.";
      resultArea.appendChild(error);
      return;
    }

    // --- Formatting logic ---
    const formattedName = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    const gravatarUrl = `https://www.gravatar.com/avatar/${email.length}?d=identicon`;

    // --- DOM manipulation to show profile card ---
    const card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "8px";
    card.style.padding = "16px";
    card.style.marginTop = "12px";

    const avatar = document.createElement("img");
    avatar.src = gravatarUrl;
    avatar.width = 64;

    const cardName = document.createElement("h3");
    cardName.textContent = formattedName;

    const cardEmail = document.createElement("p");
    cardEmail.textContent = email;

    card.appendChild(avatar);
    card.appendChild(cardName);
    card.appendChild(cardEmail);
    resultArea.appendChild(card);

    // --- Mock API call ---
    const statusMessage = document.createElement("p");
    statusMessage.textContent = "Registering…";
    resultArea.appendChild(statusMessage);

    setTimeout(() => {
      statusMessage.textContent = `✔ ${formattedName} has been registered!`;
      statusMessage.style.color = "green";
    }, 1000);
  });
}

// =============================================================
// ✅ EXPECTED RESULT – Break the large function into small,
//    focused helper functions, each with a single responsibility.
// =============================================================

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

interface ValidationResult {
  valid: boolean;
  errorMessage?: string;
}

function validateRegistration(data: RegistrationData): ValidationResult {
  if (data.name.length < 2) {
    return {
      valid: false,
      errorMessage: "Name must be at least 2 characters.",
    };
  }
  if (!data.email.includes("@") || !data.email.includes(".")) {
    return {
      valid: false,
      errorMessage: "Please enter a valid email address.",
    };
  }
  if (data.password.length < 8) {
    return {
      valid: false,
      errorMessage: "Password must be at least 8 characters.",
    };
  }
  return { valid: true };
}

function formatDisplayName(rawName: string): string {
  return rawName
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function createProfileCard(displayName: string, email: string): HTMLDivElement {
  const gravatarUrl = `https://www.gravatar.com/avatar/${email.length}?d=identicon`;

  const card = document.createElement("div");
  card.style.border = "1px solid #ccc";
  card.style.borderRadius = "8px";
  card.style.padding = "16px";
  card.style.marginTop = "12px";

  const avatar = document.createElement("img");
  avatar.src = gravatarUrl;
  avatar.width = 64;

  const cardName = document.createElement("h3");
  cardName.textContent = displayName;

  const cardEmail = document.createElement("p");
  cardEmail.textContent = email;

  card.appendChild(avatar);
  card.appendChild(cardName);
  card.appendChild(cardEmail);

  return card;
}

function showError(container: HTMLElement, message: string): void {
  const error = document.createElement("p");
  error.style.color = "red";
  error.textContent = message;
  container.appendChild(error);
}

function mockRegisterUser(displayName: string, statusEl: HTMLElement): void {
  statusEl.textContent = "Registering…";
  setTimeout(() => {
    statusEl.textContent = `✔ ${displayName} has been registered!`;
    statusEl.style.color = "green";
  }, 1000);
}

export function mountLargeFunctionResult(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Result 3: Large Function fixed";
  container.appendChild(title);

  const description = document.createElement("p");
  description.textContent = "Fill in the registration form below:";
  container.appendChild(description);

  const form = document.createElement("form");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Full name";

  const emailInput = document.createElement("input");
  emailInput.type = "text";
  emailInput.placeholder = "Email address";

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";

  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.textContent = "Register";

  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  container.appendChild(form);

  const resultArea = document.createElement("div");
  container.appendChild(resultArea);

  submitButton.addEventListener("click", () => {
    resultArea.innerHTML = "";

    const data: RegistrationData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    const validation = validateRegistration(data);
    if (!validation.valid) {
      showError(resultArea, validation.errorMessage!);
      return;
    }

    const displayName = formatDisplayName(data.name);
    resultArea.appendChild(createProfileCard(displayName, data.email));

    const statusMessage = document.createElement("p");
    resultArea.appendChild(statusMessage);
    mockRegisterUser(displayName, statusMessage);
  });
}
