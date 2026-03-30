// =============================================================
// CODE SMELL 4: Too Many Arguments
// =============================================================
// Functions that accept many individual parameters are hard to
// call correctly – it is easy to mix up the order of arguments
// and the call site reveals nothing about what each value means.
// =============================================================

// ❌ CODE SMELL – Functions with long parameter lists

// Calling this function: what does each argument mean?
// createProductCard("Blue Sneakers", "Nike", 899, 4, "shoes.jpg", true, false)
// – it is impossible to tell without reading the function signature.

function createProductCardSmell(
  productName: string,
  brandName: string,
  price: number,
  rating: number,
  imageUrl: string,
  inStock: boolean,
  isFeatured: boolean,
): HTMLDivElement {
  const card = document.createElement("div");
  card.className = "product-card";
  card.style.border = isFeatured ? "2px solid gold" : "1px solid #ccc";
  card.style.borderRadius = "8px";
  card.style.padding = "16px";
  card.style.marginBottom = "12px";
  card.style.opacity = inStock ? "1" : "0.5";

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = productName;
  image.width = 80;

  const nameEl = document.createElement("h3");
  nameEl.textContent = `${brandName} – ${productName}`;

  const priceEl = document.createElement("p");
  priceEl.textContent = `${price} kr`;

  const ratingEl = document.createElement("p");
  ratingEl.textContent = `Rating: ${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;

  const stockEl = document.createElement("p");
  stockEl.textContent = inStock ? "In stock" : "Out of stock";
  stockEl.style.color = inStock ? "green" : "red";

  card.appendChild(image);
  card.appendChild(nameEl);
  card.appendChild(priceEl);
  card.appendChild(ratingEl);
  card.appendChild(stockEl);

  return card;
}

// Another example – notice that argument order can be easily confused
function sendUserNotificationSmell(
  userId: string,
  userName: string,
  userEmail: string,
  subject: string,
  message: string,
  sendEmail: boolean,
  sendSms: boolean,
): void {
  console.log(`Notifying user ${userName} (${userId})`);
  if (sendEmail) console.log(`  Email → ${userEmail}: [${subject}] ${message}`);
  if (sendSms) console.log(`  SMS   → ${userName}: ${message}`);
}

export function mountObjectArgumentsSmell(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Code Smell 4: Too Many Arguments";
  container.appendChild(title);

  const note = document.createElement("p");
  note.style.color = "#888";
  note.textContent =
    "Inspect the source code – how readable is the function call below? Open the console for the notification output.";
  container.appendChild(note);

  // Hard to read – what do true and false mean here?
  const card = createProductCardSmell(
    "Blue Sneakers",
    "Nike",
    899,
    4,
    "https://placehold.co/80",
    true,
    false,
  );
  container.appendChild(card);

  // Hard to read – argument order is easy to swap
  sendUserNotificationSmell(
    "u42",
    "Alice",
    "alice@example.com",
    "Welcome!",
    "Thanks for signing up.",
    true,
    false,
  );
}

// =============================================================
// ✅ EXPECTED RESULT – Replace long parameter lists with a
//    typed object (interface). The call site now reads like
//    plain English and argument order no longer matters.
// =============================================================

interface Product {
  name: string;
  brand: string;
  price: number;
  rating: number; // 1–5
  imageUrl: string;
  inStock: boolean;
  isFeatured: boolean;
}

interface NotificationOptions {
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  sendEmail: boolean;
  sendSms: boolean;
}

function createProductCard(product: Product): HTMLDivElement {
  const card = document.createElement("div");
  card.className = "product-card";
  card.style.border = product.isFeatured ? "2px solid gold" : "1px solid #ccc";
  card.style.borderRadius = "8px";
  card.style.padding = "16px";
  card.style.marginBottom = "12px";
  card.style.opacity = product.inStock ? "1" : "0.5";

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.name;
  image.width = 80;

  const nameEl = document.createElement("h3");
  nameEl.textContent = `${product.brand} – ${product.name}`;

  const priceEl = document.createElement("p");
  priceEl.textContent = `${product.price} kr`;

  const ratingEl = document.createElement("p");
  ratingEl.textContent = `Rating: ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}`;

  const stockEl = document.createElement("p");
  stockEl.textContent = product.inStock ? "In stock" : "Out of stock";
  stockEl.style.color = product.inStock ? "green" : "red";

  card.appendChild(image);
  card.appendChild(nameEl);
  card.appendChild(priceEl);
  card.appendChild(ratingEl);
  card.appendChild(stockEl);

  return card;
}

function sendUserNotification(options: NotificationOptions): void {
  console.log(`Notifying user ${options.userName} (${options.userId})`);
  if (options.sendEmail) {
    console.log(
      `  Email → ${options.userEmail}: [${options.subject}] ${options.message}`,
    );
  }
  if (options.sendSms) {
    console.log(`  SMS   → ${options.userName}: ${options.message}`);
  }
}

export function mountObjectArgumentsResult(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Result 4: Object Arguments";
  container.appendChild(title);

  const note = document.createElement("p");
  note.style.color = "#888";
  note.textContent =
    "The call site now clearly shows what each value means. Open the console for the notification output.";
  container.appendChild(note);

  // Now every argument is labelled – easy to read and impossible to mix up
  const card = createProductCard({
    name: "Blue Sneakers",
    brand: "Nike",
    price: 899,
    rating: 4,
    imageUrl: "https://placehold.co/80",
    inStock: true,
    isFeatured: false,
  });
  container.appendChild(card);

  sendUserNotification({
    userId: "u42",
    userName: "Alice",
    userEmail: "alice@example.com",
    subject: "Welcome!",
    message: "Thanks for signing up.",
    sendEmail: true,
    sendSms: false,
  });
}
