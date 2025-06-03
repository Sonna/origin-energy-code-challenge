import { energyAccountsResponseSchema } from "./energyAccountsApi.schema";

describe("energyAccountsResponseSchema", () => {
  const validGasAccount = {
    id: "A-0001",
    type: "GAS",
    address: "123 Main St",
    volume: 1200,
    dueCharges: [
      {
        id: "D-0001",
        accountId: "A-0001",
        date: "2025-05-01",
        amount: 150,
      },
    ],
    totalDue: 150,
  };

  const validElectricityAccount = {
    id: "A-0002",
    type: "ELECTRICITY",
    address: "456 Electric Ave",
    meterNumber: "1234567890",
    dueCharges: [
      {
        id: "D-0002",
        accountId: "A-0002",
        date: "2025-05-15",
        amount: -50,
      },
    ],
    totalDue: -50,
  };

  it("parses an array of valid energy accounts", () => {
    const parsed = energyAccountsResponseSchema.parse([
      validGasAccount,
      validElectricityAccount,
    ]);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].type).toBe("GAS");
    expect(parsed[1].type).toBe("ELECTRICITY");
  });

  it("fails for missing required fields", () => {
    const invalidAccount = {
      id: "A-0003",
      type: "GAS",
      // address missing
      volume: 1000,
      dueCharges: [],
      totalDue: 0,
    };

    expect(() =>
      energyAccountsResponseSchema.parse([invalidAccount]),
    ).toThrow();
  });

  it("fails for wrong type discriminator", () => {
    const invalidTypeAccount = {
      id: "A-0004",
      type: "WATER", // invalid type
      address: "789 Nowhere Rd",
      volume: 500,
      dueCharges: [],
      totalDue: 0,
    };

    expect(() =>
      energyAccountsResponseSchema.parse([invalidTypeAccount]),
    ).toThrow();
  });
});
