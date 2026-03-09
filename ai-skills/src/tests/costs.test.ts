import { describe, it, expect } from "vitest";
import { finalPrice } from "../costs";

describe("finalPrice", () => {
  // Happy path
  it("applies a percentage discount and rounds to 2 decimals", () => {
    // Arrange
    const price = 100;
    const discount = 20;

    // Act
    const result = finalPrice(price, discount);

    // Assert
    expect(result).toBe(80);
  });

  it("returns original price when discount is 0%", () => {
    // Arrange
    const price = 49.99;
    const discount = 0;

    // Act
    const result = finalPrice(price, discount);

    // Assert
    expect(result).toBe(49.99);
  });

  it("returns 0 when discount is 100%", () => {
    // Arrange
    const price = 200;
    const discount = 100;

    // Act
    const result = finalPrice(price, discount);

    // Assert
    expect(result).toBe(0);
  });

  // Edge case: floating-point result is rounded to 2 decimals
  it("rounds result to 2 decimal places", () => {
    // Arrange
    const price = 10;
    const discount = 33; // 10 * 0.67 = 6.7 (exact), but try a trickier one
    // 10 * (1 - 33/100) = 10 * 0.67 = 6.7 → 6.70

    // Act
    const result = finalPrice(price, discount);

    // Assert
    expect(result).toBe(6.7);
  });

  it("rounds result correctly for non-terminating decimals", () => {
    // Arrange: 1/3 discount → 100 * (2/3) ≈ 66.6666... → 66.67
    const price = 100;
    const discount = 100 / 3; // ~33.333…

    // Act
    const result = finalPrice(price, discount);

    // Assert
    expect(result).toBe(66.67);
  });

  // Invalid input: negative price
  it("throws when price is negative", () => {
    // Arrange / Act / Assert
    expect(() => finalPrice(-1, 10)).toThrow("price must be >= 0");
  });

  // Invalid input: percent out of range
  it("throws when percent is negative", () => {
    expect(() => finalPrice(100, -5)).toThrow("percent must be 0..100");
  });

  it("throws when percent exceeds 100", () => {
    expect(() => finalPrice(100, 110)).toThrow("percent must be 0..100");
  });
});
