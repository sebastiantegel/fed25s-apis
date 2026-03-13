---
name: test-writer
description: A skill that writes tests consistently across the project.
---

# Skill: Test Writer

## Purpose

Generate clear unit tests for a selected function.

## When to use

Use this skill when the user asks to write tests for existing code.

## Rules

- Use Arrange / Act / Assert structure.
- Cover:
  - happy path
  - one edge case
  - one invalid input case
- Keep test names human-readable.
- Place test files in `src/tests`.
- If behavior is unclear, state assumption first.
- Use Vitest by default unless the user specifies another framework.
- Return only:
  1. assumptions
  2. test code

## Input expected

- File path
- Function name
- Test framework (default: Vitest)

## Output format

1. Assumptions (bullet list)
2. Complete test file code

## Footer

Skill confirmation: test-writer v1
