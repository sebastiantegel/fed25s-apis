# Copilot Instructions (TypeScript + Vite)

## Project context

- This is a Vite project using TypeScript.
- Prefer ESM syntax and modern browser-compatible code.
- Keep solutions simple, readable, and beginner-friendly.

## Coding style

- Use strict TypeScript types; avoid `any` unless explicitly requested.
- Prefer small, pure functions where possible.
- Use clear variable/function names.
- Add short comments only when logic is not obvious.
- Do not introduce large dependencies without a reason.

## Vite conventions

- Keep source files in `src/`.
- Use module-based imports/exports.
- Do not use Node-only APIs in browser code.
- Keep `main.ts` focused on app startup/wiring.

## Error handling

- Validate function inputs when relevant.
- Throw explicit `Error` messages for invalid values.
- Fail fast on invalid states.

## Output preferences

- When generating code changes:
  - show complete file content if small, otherwise minimal patch
  - keep formatting consistent with existing code
  - include brief rationale in 1-3 bullets
