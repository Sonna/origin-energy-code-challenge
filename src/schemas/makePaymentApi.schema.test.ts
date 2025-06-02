import {
  makePaymentInputSchema,
  makePaymentResponseSchema,
} from "./makePaymentApi.schema";

describe("makePaymentInputSchema", () => {
  const validInput = {
    accountId: "A-1234",
    creditCard: {
      cardNumber: "4111111111111111", // Valid Visa test number
      expiryDate: "12/30",
      cvv: "123",
    },
    amount: 50.25,
  };

  it("accepts valid input", () => {
    const parsed = makePaymentInputSchema.parse(validInput);
    expect(parsed.accountId).toBe("A-1234");
    expect(parsed.amount).toBeGreaterThan(0);
  });

  it("fails if accountId is missing", () => {
    expect(() =>
      makePaymentInputSchema.parse({ ...validInput, accountId: "" }),
    ).toThrow("Account ID is required");
  });

  it("fails if amount is zero or negative", () => {
    expect(() =>
      makePaymentInputSchema.parse({ ...validInput, amount: 0 }),
    ).toThrow("Payment amount must be positive");

    expect(() =>
      makePaymentInputSchema.parse({ ...validInput, amount: -5 }),
    ).toThrow("Payment amount must be positive");
  });

  it("fails if credit card is invalid", () => {
    const invalidCard = {
      cardNumber: "123",
      expiryDate: "99/99",
      cvv: "12",
    };

    expect(() =>
      makePaymentInputSchema.parse({ ...validInput, creditCard: invalidCard }),
    ).toThrow();
  });
});

describe("makePaymentResponseSchema", () => {
  const validDueCharge = {
    id: "D-0001",
    accountId: "A-1234",
    date: "2025-06-01",
    amount: 50.25,
  };

  it("accepts valid due charge response", () => {
    const parsed = makePaymentResponseSchema.parse(validDueCharge);
    expect(parsed.id).toBe("D-0001");
    expect(parsed.amount).toBe(50.25);
  });

  it("fails if required fields are missing", () => {
    const invalid = { ...validDueCharge, id: "" };
    expect(() => makePaymentResponseSchema.parse(invalid)).toThrow();
  });

  it("fails if amount is not a number", () => {
    const invalid = { ...validDueCharge, amount: "free" };
    expect(() => makePaymentResponseSchema.parse(invalid)).toThrow();
  });
});
