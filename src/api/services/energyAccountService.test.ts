import { EnergyAccountRepository } from "../repositories/energyAccountRepository";
import { DueChargesRepository } from "../repositories/dueChargesRepository";
import type {
  AccountType,
  EnergyAccount,
} from "./../../schemas/energyAccount.schema";

import { EnergyAccountService } from "./energyAccountService";

describe("EnergyAccountService", () => {
  let energyRepoMock: jest.Mocked<EnergyAccountRepository>;
  let chargesRepoMock: jest.Mocked<DueChargesRepository>;
  let service: EnergyAccountService;

  beforeEach(() => {
    energyRepoMock = {
      findAll: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    chargesRepoMock = {
      findAll: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    service = new EnergyAccountService(energyRepoMock, chargesRepoMock);
  });

  it("should return accounts with their charges and total due", () => {
    const accounts: EnergyAccount[] = [
      { id: "ACC-001", type: "GAS", address: "123 Main St", volume: 1853 },
      {
        id: "ACC-002",
        type: "ELECTRICITY",
        address: "456 Elm St",
        meterNumber: "12345671244",
      },
    ];

    const charges = [
      { id: "D-001", accountId: "ACC-001", amount: 50, date: "2025-05-01" },
      { id: "D-002", accountId: "ACC-001", amount: 30, date: "2025-05-10" },
      { id: "D-003", accountId: "ACC-002", amount: 70, date: "2025-05-15" },
    ];

    energyRepoMock.findAll.mockReturnValue(accounts);
    chargesRepoMock.findAll.mockReturnValue(charges);

    const result = service.getAccountsWithCharges();

    expect(result).toEqual([
      {
        ...accounts[0],
        dueCharges: [charges[0], charges[1]],
        totalDue: 80,
      },
      {
        ...accounts[1],
        dueCharges: [charges[2]],
        totalDue: 70,
      },
    ]);

    expect(energyRepoMock.findAll).toHaveBeenCalledWith(undefined);
    expect(chargesRepoMock.findAll).toHaveBeenCalled();
  });

  it("should apply filters when retrieving accounts", () => {
    const filter = { type: "GAS" as AccountType, address: "123" };
    energyRepoMock.findAll.mockReturnValue([]);
    chargesRepoMock.findAll.mockReturnValue([]);

    const result = service.getAccountsWithCharges(filter);

    expect(energyRepoMock.findAll).toHaveBeenCalledWith(filter);
    expect(chargesRepoMock.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
