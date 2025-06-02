import { getTotalColour } from "./getTotalColour";

describe("getTotalColour", () => {
  test.each([
    { amount: 100, expected: "danger" },
    { amount: 0, expected: "muted" },
    { amount: -50, expected: "success" },
    { amount: 0.01, expected: "danger" },
    { amount: -0.01, expected: "success" },
  ])("returns $expected for amount $amount", ({ amount, expected }) => {
    expect(getTotalColour(amount)).toBe(expected);
  });
});
