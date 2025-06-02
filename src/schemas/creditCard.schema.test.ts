import { creditCardSchema } from "./creditCard.schema";

describe("creditCardSchema", () => {
  it("accepts valid credit card info", () => {
    const data = {
      cardNumber: "4111111111111111", // Valid Visa test card
      expiryDate: "12/25",
      cvv: "123",
    };

    const result = creditCardSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects invalid card number", () => {
    const data = {
      cardNumber: "1234567890123456",
      expiryDate: "12/25",
      cvv: "123",
    };

    const result = creditCardSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid credit card number");
  });

  it("rejects bad expiry format", () => {
    const data = {
      cardNumber: "4111111111111111",
      expiryDate: "2025/12",
      cvv: "123",
    };

    const result = creditCardSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Expiry date must be in MM/YY format",
    );
  });

  it("rejects bad CVV format", () => {
    const data = {
      cardNumber: "4111111111111111",
      expiryDate: "12/25",
      cvv: "12a",
    };

    const result = creditCardSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("CVV must be 3 or 4 digits");
  });

  it("rejects expired card date", () => {
    const data = {
      cardNumber: "4111111111111111",
      expiryDate: "01/20", // Expired
      cvv: "123",
    };

    const result = creditCardSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Card is expired");
  });
});
