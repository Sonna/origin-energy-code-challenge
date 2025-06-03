import { MOCK_DUE_CHARGES_API } from "../../data/dueChargesAPIMock";
import { DueCharge } from "../../schemas/dueCharge.schema";

import { DueChargesRepository } from "./dueChargesRepository";

jest.mock("../../data/dueChargesAPIMock", () => ({
  MOCK_DUE_CHARGES_API: jest.fn(),
}));

const mockCharges: DueCharge[] = [
  {
    id: "D-0014",
    accountId: "ACC-100",
    date: "2025-05-01",
    amount: 100.0,
  },
  {
    id: "D-0015",
    accountId: "ACC-200",
    date: "2025-05-15",
    amount: 200.0,
  },
  {
    id: "D-0016",
    accountId: "ACC-100",
    date: "2025-05-20",
    amount: 300.0,
  },
];

describe("DueChargesRepository", () => {
  let repo: DueChargesRepository;

  beforeEach(async () => {
    (MOCK_DUE_CHARGES_API as jest.Mock).mockResolvedValue(mockCharges);
    repo = new DueChargesRepository();
    await repo.init();
  });

  it("initializes with mock data and sets lastId", () => {
    const allCharges = repo.findAll();
    expect(allCharges).toHaveLength(3);
    expect(allCharges[2].id).toBe("D-0016");
    // — testing private field via cast
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((repo as any).lastId).toBe("D-0016");
  });

  it("findAll returns all charges", () => {
    const results = repo.findAll();
    expect(results).toEqual(mockCharges);
  });

  it("findByAccountId returns charges for specific account", () => {
    const charges = repo.findByAccountId("ACC-100");
    expect(charges).toHaveLength(2);
    expect(charges.every((c) => c.accountId === "ACC-100")).toBe(true);
  });

  it("findByAccountId returns empty array if no matches", () => {
    const charges = repo.findByAccountId("UNKNOWN");
    expect(charges).toEqual([]);
  });

  it("create generates next ID, adds charge, and returns it", () => {
    const newCharge = repo.create("ACC-300", 500.0);
    expect(newCharge.id).toBe("D-0017");
    expect(newCharge.accountId).toBe("ACC-300");
    expect(newCharge.amount).toBe(500.0);
    expect(typeof newCharge.date).toBe("string");

    const allCharges = repo.findAll();
    expect(allCharges).toHaveLength(4);
    expect(allCharges[3]).toEqual(newCharge);
  });

  it("create generates new ID correctly after multiple creates", () => {
    repo.create("ACC-X", 10);
    repo.create("ACC-Y", 20);
    const third = repo.create("ACC-Z", 30);

    expect(third.id).toBe("D-0020"); // need to rethink this, not parallel test safe
  });
});
