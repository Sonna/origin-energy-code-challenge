import { Response } from "express";

import { logger } from "../utils/logger";

import { getEnergyAccountsWithCharges } from "./energyAccountController";

jest.mock("../utils/logger");

describe("getEnergyAccountsWithCharges handler", () => {
  const mockGetAccountsWithCharges = jest.fn();

  const mockRes = () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    return res;
  };

  const baseReq = {
    query: {},
  };

  const mockContext = {
    services: {
      energyAccountService: {
        getAccountsWithCharges: mockGetAccountsWithCharges,
      },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if accountType is invalid", () => {
    const req = {
      ...baseReq,
      query: {
        accountType: "WATER", // invalid type
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const res = mockRes();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getEnergyAccountsWithCharges({} as any, req, res, mockContext as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid account type",
    });
    expect(mockGetAccountsWithCharges).not.toHaveBeenCalled();
  });

  it("calls service with correct filters and returns result", () => {
    const req = {
      ...baseReq,
      query: {
        q: "123 Main",
        accountType: "gas",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const res = mockRes();
    const mockResult = [{ id: "ACC-001", totalDue: 50 }];

    mockGetAccountsWithCharges.mockReturnValue(mockResult);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getEnergyAccountsWithCharges({} as any, req, res, mockContext as any);

    expect(mockGetAccountsWithCharges).toHaveBeenCalledWith({
      type: "GAS",
      address: "123 Main",
    });

    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("calls service with no filters if none provided", () => {
    const req = {
      ...baseReq,
      query: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const res = mockRes();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockResult: any[] = [];

    mockGetAccountsWithCharges.mockReturnValue(mockResult);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getEnergyAccountsWithCharges({} as any, req, res, mockContext as any);

    expect(mockGetAccountsWithCharges).toHaveBeenCalledWith({
      type: undefined,
      address: undefined,
    });

    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("returns 500 and logs error if service throws", () => {
    const req = {
      ...baseReq,
      query: {
        accountType: "gas",
        q: "Main",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const res = mockRes();
    const error = new Error("Unexpected failure");

    mockGetAccountsWithCharges.mockImplementation(() => {
      throw error;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getEnergyAccountsWithCharges({} as any, req, res, mockContext as any);

    expect(logger.error).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });
});
