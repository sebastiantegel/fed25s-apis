// =============================================================
// CODE SMELL 2: Magic Numbers
// =============================================================
// Hard-coded numbers appear directly in the logic with no
// explanation of what they represent. This makes the code
// difficult to read and error-prone when values need to change.
// =============================================================

// ❌ CODE SMELL - Magic numbers scattered through the logic

export function mountMagicNumbersSmell(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Code Smell 2: Magic Numbers";
  container.appendChild(title);

  // What does 86400 mean? What are 5 and 10?
  const uptimeSeconds = 432000;
  const uptimeDays = uptimeSeconds / 86400;

  const paragraph = document.createElement("p");
  paragraph.textContent = `Server uptime: ${uptimeDays} days`;
  container.appendChild(paragraph);

  // What do 5 and 10 mean here?
  const score = 73;
  let ratingLabel: string;
  if (score < 5) {
    ratingLabel = "Poor";
  } else if (score < 10) {
    ratingLabel = "Average";
  } else {
    ratingLabel = "Excellent";
  }

  const ratingParagraph = document.createElement("p");
  ratingParagraph.textContent = `Rating: ${ratingLabel} (score: ${score})`;
  container.appendChild(ratingParagraph);

  // What is 1000 * 60 * 60 * 24 * 30 doing here?
  const expiresInMs = 1000 * 60 * 60 * 24 * 30;
  const expiryDate = new Date(Date.now() + expiresInMs);

  const expiryParagraph = document.createElement("p");
  expiryParagraph.textContent = `Token expires: ${expiryDate.toLocaleDateString()}`;
  container.appendChild(expiryParagraph);

  // What does 0.25 represent?
  const cartTotal = 450;
  const discount = cartTotal * 0.25;
  const discountParagraph = document.createElement("p");
  discountParagraph.textContent = `Discount applied: ${discount} kr`;
  container.appendChild(discountParagraph);
}

// =============================================================
// ✅ EXPECTED RESULT – Replace magic numbers with named
//    constants that clearly communicate their intent.
// =============================================================

const SECONDS_PER_DAY = 86400;
const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_MONTH = 30;

const SCORE_THRESHOLD_POOR = 5;
const SCORE_THRESHOLD_AVERAGE = 10;

const MEMBER_DISCOUNT_RATE = 0.25; // 25% discount for members

const MS_PER_MONTH =
  MS_PER_SECOND *
  SECONDS_PER_MINUTE *
  MINUTES_PER_HOUR *
  HOURS_PER_DAY *
  DAYS_PER_MONTH;

function getRatingLabel(score: number): string {
  if (score < SCORE_THRESHOLD_POOR) return "Poor";
  if (score < SCORE_THRESHOLD_AVERAGE) return "Average";
  return "Excellent";
}

export function mountMagicNumbersResult(container: HTMLElement): void {
  const title = document.createElement("h2");
  title.textContent = "Result 2: Magic Numbers fixed";
  container.appendChild(title);

  const uptimeSeconds = 432000;
  const uptimeDays = uptimeSeconds / SECONDS_PER_DAY;

  const uptimeParagraph = document.createElement("p");
  uptimeParagraph.textContent = `Server uptime: ${uptimeDays} days`;
  container.appendChild(uptimeParagraph);

  const score = 73;
  const ratingParagraph = document.createElement("p");
  ratingParagraph.textContent = `Rating: ${getRatingLabel(score)} (score: ${score})`;
  container.appendChild(ratingParagraph);

  const expiryDate = new Date(Date.now() + MS_PER_MONTH);
  const expiryParagraph = document.createElement("p");
  expiryParagraph.textContent = `Token expires: ${expiryDate.toLocaleDateString()}`;
  container.appendChild(expiryParagraph);

  const cartTotal = 450;
  const discount = cartTotal * MEMBER_DISCOUNT_RATE;
  const discountParagraph = document.createElement("p");
  discountParagraph.textContent = `Discount applied: ${discount} kr`;
  container.appendChild(discountParagraph);
}
