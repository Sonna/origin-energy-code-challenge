import { accountTypeSchema, energyAccountSchema } from "./energyAccount.schema";

describe("accountTypeSchema", () => {
  it("accepts valid types", () => {
    expect(accountTypeSchema.parse("GAS")).toBe("GAS");
    expect(accountTypeSchema.parse("ELECTRICITY")).toBe("ELECTRICITY");
  });

  it("rejects invalid types", () => {
    expect(() => accountTypeSchema.parse("WATER")).toThrow();
    expect(() => accountTypeSchema.parse("")).toThrow();
  });
});
describe("energyAccountSchema", () => {
  it("validates ELECTRICITY account", () => {
    const input = {
      id: "A-0001",
      type: "ELECTRICITY",
      address: "1 Greville Ct, Thomastown, 3076, Victoria",
      meterNumber: "1234567890",
    };

    const result = energyAccountSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("validates GAS account", () => {
    const input = {
      id: "A-0002",
      type: "GAS",
      address: "74 Taltarni Rd, Yawong Hills, 3478, Victoria",
      volume: 3034,
    };

    const result = energyAccountSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("fails if ELECTRICITY account has missing meterNumber", () => {
    const input = {
      id: "A-0003",
      type: "ELECTRICITY",
      address: "1 Main St",
    };

    const result = energyAccountSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("meterNumber");
  });

  it("fails if GAS account has negative volume", () => {
    const input = {
      id: "A-0004",
      type: "GAS",
      address: "2 Side St",
      volume: -100,
    };

    const result = energyAccountSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("volume");
  });

  it("fails if ID format is invalid", () => {
    const input = {
      id: "B-1234",
      type: "GAS",
      address: "3 Wrong Id Rd",
      volume: 200,
    };

    const result = energyAccountSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(
      /Invalid account ID format/,
    );
  });
});
