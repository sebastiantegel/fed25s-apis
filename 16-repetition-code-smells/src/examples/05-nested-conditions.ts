// =============================================================
// CODE SMELL 5: Deeply Nested if/else Statements
// =============================================================
// Nesting many if/else blocks inside each other creates a
// so-called "arrow anti-pattern" or "pyramid of doom".
// The code becomes hard to read and easy to get wrong.
// Replacing deep nesting with early returns (guard clauses)
// or lookup tables makes the logic flat and easy to follow.
// =============================================================

// ❌ CODE SMELL – Deep nesting with an arrow-shaped structure

function getDeliveryMessageSmell(
  isLoggedIn: boolean,
  hasMembership: boolean,
  cartTotalKr: number,
  isHoliday: boolean,
): string {
  if (isLoggedIn) {
    if (hasMembership) {
      if (cartTotalKr >= 500) {
        if (isHoliday) {
          return "🎁 Holiday bonus: FREE express delivery!";
        } else {
          return "✔ Free standard delivery included.";
        }
      } else {
        if (isHoliday) {
          return "🎁 Holiday offer: delivery only 29 kr!";
        } else {
          return "Delivery costs 49 kr (member rate).";
        }
      }
    } else {
      if (cartTotalKr >= 500) {
        return "✔ Free delivery on orders over 500 kr.";
      } else {
        return "Delivery costs 79 kr.";
      }
    }
  } else {
    return "Please log in to see delivery options.";
  }
}

export function mountNestedConditionsSmell(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Code Smell 5: Nested if/else";
  container.appendChild(title);

  // Build a small interactive demo so students can see the logic live
  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.flexDirection = "column";
  controls.style.gap = "6px";
  controls.style.marginBottom = "12px";

  function makeCheckbox(labelText: string): {
    wrapper: HTMLDivElement;
    checkbox: HTMLInputElement;
  } {
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const label = document.createElement("label");
    label.textContent = " " + labelText;
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    return { wrapper, checkbox };
  }

  const { wrapper: w1, checkbox: loggedInCb } = makeCheckbox("Logged in");
  const { wrapper: w2, checkbox: memberCb } = makeCheckbox("Has membership");
  const { wrapper: w3, checkbox: holidayCb } = makeCheckbox("Holiday");

  const cartInput = document.createElement("input");
  cartInput.type = "number";
  cartInput.value = "300";
  cartInput.placeholder = "Cart total (kr)";

  controls.appendChild(w1);
  controls.appendChild(w2);
  controls.appendChild(w3);
  controls.appendChild(cartInput);
  container.appendChild(controls);

  const resultEl = document.createElement("p");
  resultEl.style.fontWeight = "bold";
  container.appendChild(resultEl);

  function updateResult(): void {
    resultEl.textContent = getDeliveryMessageSmell(
      loggedInCb.checked,
      memberCb.checked,
      Number(cartInput.value),
      holidayCb.checked,
    );
  }

  loggedInCb.addEventListener("change", updateResult);
  memberCb.addEventListener("change", updateResult);
  holidayCb.addEventListener("change", updateResult);
  cartInput.addEventListener("input", updateResult);
  updateResult();
}

// =============================================================
// ✅ EXPECTED RESULT – Use early returns (guard clauses) to
//    handle simple cases first, keeping the main path flat.
//    A lookup table handles the membership/cart/holiday combos.
// =============================================================

const FREE_DELIVERY_THRESHOLD_KR = 500;
const MEMBER_DELIVERY_COST_KR = 49;
const STANDARD_DELIVERY_COST_KR = 79;
const HOLIDAY_MEMBER_DELIVERY_COST_KR = 29;

function getDeliveryMessage(
  isLoggedIn: boolean,
  hasMembership: boolean,
  cartTotalKr: number,
  isHoliday: boolean,
): string {
  // Guard clause: handle the simplest cases first and return early
  if (!isLoggedIn) {
    return "Please log in to see delivery options.";
  }

  if (!hasMembership) {
    const qualifiesForFreeDelivery = cartTotalKr >= FREE_DELIVERY_THRESHOLD_KR;
    return qualifiesForFreeDelivery
      ? "✔ Free delivery on orders over 500 kr."
      : `Delivery costs ${STANDARD_DELIVERY_COST_KR} kr.`;
  }

  // From here: user is logged in AND has membership
  const qualifiesForFreeDelivery = cartTotalKr >= FREE_DELIVERY_THRESHOLD_KR;

  if (qualifiesForFreeDelivery) {
    return isHoliday
      ? "🎁 Holiday bonus: FREE express delivery!"
      : "✔ Free standard delivery included.";
  }

  return isHoliday
    ? `🎁 Holiday offer: delivery only ${HOLIDAY_MEMBER_DELIVERY_COST_KR} kr!`
    : `Delivery costs ${MEMBER_DELIVERY_COST_KR} kr (member rate).`;
}

export function mountNestedConditionsResult(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Result 5: Nested conditions fixed";
  container.appendChild(title);

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.flexDirection = "column";
  controls.style.gap = "6px";
  controls.style.marginBottom = "12px";

  function makeCheckbox(labelText: string): {
    wrapper: HTMLDivElement;
    checkbox: HTMLInputElement;
  } {
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const label = document.createElement("label");
    label.textContent = " " + labelText;
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    return { wrapper, checkbox };
  }

  const { wrapper: w1, checkbox: loggedInCb } = makeCheckbox("Logged in");
  const { wrapper: w2, checkbox: memberCb } = makeCheckbox("Has membership");
  const { wrapper: w3, checkbox: holidayCb } = makeCheckbox("Holiday");

  const cartInput = document.createElement("input");
  cartInput.type = "number";
  cartInput.value = "300";
  cartInput.placeholder = "Cart total (kr)";

  controls.appendChild(w1);
  controls.appendChild(w2);
  controls.appendChild(w3);
  controls.appendChild(cartInput);
  container.appendChild(controls);

  const resultEl = document.createElement("p");
  resultEl.style.fontWeight = "bold";
  container.appendChild(resultEl);

  function updateResult(): void {
    resultEl.textContent = getDeliveryMessage(
      loggedInCb.checked,
      memberCb.checked,
      Number(cartInput.value),
      holidayCb.checked,
    );
  }

  loggedInCb.addEventListener("change", updateResult);
  memberCb.addEventListener("change", updateResult);
  holidayCb.addEventListener("change", updateResult);
  cartInput.addEventListener("input", updateResult);
  updateResult();
}
