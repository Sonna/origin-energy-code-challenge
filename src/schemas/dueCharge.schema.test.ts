import { dueChargeSchema } from "./dueCharge.schema";

describe("dueChargeSchema", () => {
  it("should pass with valid data", () => {
    const valid = {
      id: "D-0001",
      accountId: "A-0001",
      date: "2025-04-01",
      amount: 10,
    };

    const result = dueChargeSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("should fail if id format is invalid", () => {
    const invalid = {
      id: "X-0001",
      accountId: "A-0001",
      date: "2025-04-01",
      amount: 10,
    };

    const result = dueChargeSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/Invalid charge ID format/);
  });

  it("should fail if accountId format is invalid", () => {
    const invalid = {
      id: "D-0001",
      accountId: "Z-1234",
      date: "2025-04-01",
      amount: 10,
    };

    const result = dueChargeSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(
      /Invalid account ID format/,
    );
  });

  it("should fail if date is invalid", () => {
    const invalid = {
      id: "D-0001",
      accountId: "A-0001",
      date: "not-a-date",
      amount: 10,
    };

    const result = dueChargeSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/Invalid date format/);
  });

  it("should fail if amount is not a number", () => {
    const invalid = {
      id: "D-0001",
      accountId: "A-0001",
      date: "2025-04-01",
      amount: "ten",
    };

    const result = dueChargeSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/Expected number/);
  });
});
