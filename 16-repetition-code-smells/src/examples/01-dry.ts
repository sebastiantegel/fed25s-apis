// =============================================================
// CODE SMELL 1: DRY - Don't Repeat Yourself
// =============================================================
// The same logic is written multiple times instead of being
// extracted into a reusable function.
// =============================================================

// ❌ CODE SMELL - Duplicated code for creating notification elements

export function mountDrySmell(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Code Smell 1: DRY violation";
  container.appendChild(title);

  // Creating a "success" notification
  const successBox = document.createElement("div");
  successBox.style.padding = "12px 20px";
  successBox.style.marginBottom = "8px";
  successBox.style.borderRadius = "6px";
  successBox.style.fontWeight = "bold";
  successBox.style.color = "white";
  successBox.style.backgroundColor = "green";
  successBox.textContent = "✔ Your profile was saved!";
  container.appendChild(successBox);

  // Creating a "warning" notification – almost identical code duplicated
  const warningBox = document.createElement("div");
  warningBox.style.padding = "12px 20px";
  warningBox.style.marginBottom = "8px";
  warningBox.style.borderRadius = "6px";
  warningBox.style.fontWeight = "bold";
  warningBox.style.color = "white";
  warningBox.style.backgroundColor = "orange";
  warningBox.textContent = "⚠ Your session will expire soon!";
  container.appendChild(warningBox);

  // Creating an "error" notification – same code yet again
  const errorBox = document.createElement("div");
  errorBox.style.padding = "12px 20px";
  errorBox.style.marginBottom = "8px";
  errorBox.style.borderRadius = "6px";
  errorBox.style.fontWeight = "bold";
  errorBox.style.color = "white";
  errorBox.style.backgroundColor = "red";
  errorBox.textContent = "✖ Failed to connect to the server!";
  container.appendChild(errorBox);
}

// =============================================================
// ✅ EXPECTED RESULT – Extract the repeated logic into a
//    reusable function that accepts the varying parts as
//    arguments (type, message).
// =============================================================

type NotificationType = "success" | "warning" | "error";

const notificationColors: Record<NotificationType, string> = {
  success: "green",
  warning: "orange",
  error: "red",
};

const notificationIcons: Record<NotificationType, string> = {
  success: "✔",
  warning: "⚠",
  error: "✖",
};

function createNotification(
  type: NotificationType,
  message: string,
): HTMLDivElement {
  const box = document.createElement("div");
  box.style.padding = "12px 20px";
  box.style.marginBottom = "8px";
  box.style.borderRadius = "6px";
  box.style.fontWeight = "bold";
  box.style.color = "white";
  box.style.backgroundColor = notificationColors[type];
  box.textContent = `${notificationIcons[type]} ${message}`;
  return box;
}

export function mountDryResult(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Result 1: DRY fixed";
  container.appendChild(title);

  container.appendChild(
    createNotification("success", "Your profile was saved!"),
  );
  container.appendChild(
    createNotification("warning", "Your session will expire soon!"),
  );
  container.appendChild(
    createNotification("error", "Failed to connect to the server!"),
  );
}
