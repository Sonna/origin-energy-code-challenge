import { EnergyAccountRepository } from "../repositories/energyAccountRepository";
import { DueChargesRepository } from "../repositories/dueChargesRepository";

import { PaymentService } from "./paymentService";

describe("PaymentService", () => {
  let energyRepoMock: jest.Mocked<EnergyAccountRepository>;
  let chargesRepoMock: jest.Mocked<DueChargesRepository>;
  let service: PaymentService;

  beforeEach(() => {
    energyRepoMock = {
      mustFindById: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    chargesRepoMock = {
      create: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    service = new PaymentService(energyRepoMock, chargesRepoMock);
  });

  it("should make a payment by verifying account and creating a negative charge", () => {
    const mockAccountId = "ACC-001";
    const amount = 100;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    energyRepoMock.mustFindById.mockReturnValue({ id: mockAccountId } as any);
    chargesRepoMock.create.mockReturnValue({
      id: "D-0017",
      accountId: mockAccountId,
      amount: -100,
      date: "2025-05-31",
    });

    const result = service.makePayment(mockAccountId, amount);

    expect(energyRepoMock.mustFindById).toHaveBeenCalledWith(mockAccountId);
    expect(chargesRepoMock.create).toHaveBeenCalledWith(mockAccountId, -amount);
    expect(result).toEqual({
      id: "D-0017",
      accountId: mockAccountId,
      amount: -100,
      date: "2025-05-31",
    });
  });

  it("should throw an error if the account is not found", () => {
    const mockAccountId = "ACC-999";
    const amount = 50;

    energyRepoMock.mustFindById.mockImplementation(() => {
      throw new Error("Account not found");
    });

    expect(() => service.makePayment(mockAccountId, amount)).toThrow(
      "Account not found",
    );

    expect(energyRepoMock.mustFindById).toHaveBeenCalledWith(mockAccountId);
    expect(chargesRepoMock.create).not.toHaveBeenCalled();
  });
});
