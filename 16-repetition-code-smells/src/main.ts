import "./style.css";
import { mountDrySmell, mountDryResult } from "./examples/01-dry";
import {
  mountMagicNumbersSmell,
  mountMagicNumbersResult,
} from "./examples/02-magic-numbers";
import {
  mountLargeFunctionSmell,
  mountLargeFunctionResult,
} from "./examples/03-large-functions";
import {
  mountObjectArgumentsSmell,
  mountObjectArgumentsResult,
} from "./examples/04-object-arguments";
import {
  mountNestedConditionsSmell,
  mountNestedConditionsResult,
} from "./examples/05-nested-conditions";

// ---------------------------------------------------------------
// Each code smell has its own section on the page.
// The smell (bad code) and the expected result (good code) are
// shown side-by-side so students can compare them directly.
// ---------------------------------------------------------------

interface ExampleSection {
  heading: string;
  description: string;
  mountSmell: (container: HTMLElement) => void;
  mountResult: (container: HTMLElement) => void;
}

const examples: ExampleSection[] = [
  {
    heading: "1 – DRY (Don't Repeat Yourself)",
    description:
      "Copy-pasted code blocks that share identical logic should be extracted into a single reusable function.",
    mountSmell: mountDrySmell,
    mountResult: mountDryResult,
  },
  {
    heading: "2 – Magic Numbers",
    description:
      "Hard-coded numeric literals scattered through the code should be replaced with named constants.",
    mountSmell: mountMagicNumbersSmell,
    mountResult: mountMagicNumbersResult,
  },
  {
    heading: "3 – Large Functions",
    description:
      "A function that does many unrelated things (validate, build DOM, call API) should be broken into small, focused helpers.",
    mountSmell: mountLargeFunctionSmell,
    mountResult: mountLargeFunctionResult,
  },
  {
    heading: "4 – Too Many Arguments",
    description:
      "Functions with long parameter lists should accept a single typed object instead, making call sites self-documenting.",
    mountSmell: mountObjectArgumentsSmell,
    mountResult: mountObjectArgumentsResult,
  },
  {
    heading: "5 – Nested if/else Statements",
    description:
      'Deeply nested conditions create an unreadable "pyramid of doom". Use early returns (guard clauses) to keep the logic flat.',
    mountSmell: mountNestedConditionsSmell,
    mountResult: mountNestedConditionsResult,
  },
];

function buildPage(): void {
  const app = document.querySelector<HTMLDivElement>("#app")!;

  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "TypeScript Code Smells – Exercises";
  app.appendChild(pageTitle);

  const intro = document.createElement("p");
  intro.className = "intro";
  intro.textContent =
    "For each exercise you will see the code smell first and the refactored result right below it. " +
    "Study the differences and discuss how the refactoring makes the code better.";
  app.appendChild(intro);

  for (const example of examples) {
    // ---- Section wrapper ----
    const section = document.createElement("section");
    section.className = "example-section";
    app.appendChild(section);

    const heading = document.createElement("h2");
    heading.textContent = example.heading;
    section.appendChild(heading);

    const desc = document.createElement("p");
    desc.className = "description";
    desc.textContent = example.description;
    section.appendChild(desc);

    // ---- Two-column layout: smell | result ----
    const columns = document.createElement("div");
    columns.className = "columns";
    section.appendChild(columns);

    const smellColumn = document.createElement("div");
    smellColumn.className = "column column--smell";
    const smellBadge = document.createElement("span");
    smellBadge.className = "badge badge--smell";
    smellBadge.textContent = "❌ Code Smell";
    smellColumn.appendChild(smellBadge);
    example.mountSmell(smellColumn);
    columns.appendChild(smellColumn);

    const resultColumn = document.createElement("div");
    resultColumn.className = "column column--result";
    const resultBadge = document.createElement("span");
    resultBadge.className = "badge badge--result";
    resultBadge.textContent = "✅ Expected Result";
    resultColumn.appendChild(resultBadge);
    example.mountResult(resultColumn);
    columns.appendChild(resultColumn);
  }
}

buildPage();
