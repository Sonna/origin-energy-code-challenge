import { MOCK_ENERGY_ACCOUNTS_API } from "./../../data/energyAccountsAPIMock";
import { EnergyAccount } from "./../../schemas/energyAccount.schema";

import { EnergyAccountRepository } from "./energyAccountRepository";

jest.mock("./../../data/energyAccountsAPIMock", () => ({
  MOCK_ENERGY_ACCOUNTS_API: jest.fn(),
}));

const mockData: EnergyAccount[] = [
  {
    id: "1",
    type: "GAS",
    address: "123 Main St",
    volume: 1900,
  },
  {
    id: "2",
    type: "ELECTRICITY",
    address: "456 Elm St",
    meterNumber: "12345671244",
  },
  {
    id: "3",
    type: "GAS",
    address: "789 Pine Avenue",
    volume: 1853,
  },
];

describe("EnergyAccountRepository", () => {
  let repo: EnergyAccountRepository;

  beforeEach(async () => {
    (MOCK_ENERGY_ACCOUNTS_API as jest.Mock).mockResolvedValue(mockData);
    repo = new EnergyAccountRepository();
    await repo.init();
  });

  it("initializes with mock data", async () => {
    expect(repo.findAll().length).toBe(3);
  });

  describe("findAll", () => {
    it("returns all accounts when no filter is provided", () => {
      const results = repo.findAll();
      expect(results).toHaveLength(3);
    });

    it("filters by type", () => {
      const gasAccounts = repo.findAll({ type: "GAS" });
      expect(gasAccounts).toHaveLength(2);
      expect(gasAccounts.every((acc) => acc.type === "GAS")).toBe(true);
    });

    it("filters by address substring match (case-insensitive)", () => {
      const results = repo.findAll({ address: "elm" });
      expect(results).toHaveLength(1);
      expect(results[0].address).toBe("456 Elm St");
    });

    it("filters by multiple address keywords", () => {
      const results = repo.findAll({ address: "Pine Avenue" });
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe("3");
    });

    it("filters by type and address together", () => {
      const results = repo.findAll({ type: "GAS", address: "Main" });
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe("1");
    });
  });

  describe("findById", () => {
    it("returns the account when found", () => {
      const account = repo.findById("1");
      expect(account).toBeDefined();
      expect(account?.id).toBe("1");
    });

    it("returns null when account not found", () => {
      const account = repo.findById("999");
      expect(account).toBeNull();
    });
  });

  describe("mustFindById", () => {
    it("returns the account when found", () => {
      const account = repo.mustFindById("2");
      expect(account).toBeDefined();
      expect(account.id).toBe("2");
    });

    it("throws an error when not found", () => {
      expect(() => repo.mustFindById("999")).toThrow(
        "Account ID 999 not found",
      );
    });
  });
});
