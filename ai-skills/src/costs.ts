export function finalPrice(price: number, percent: number) {
  if (price < 0) throw new Error("price must be >= 0");
  if (percent < 0 || percent > 100) throw new Error("percent must be 0..100");
  return Number((price * (1 - percent / 100)).toFixed(2));
}
