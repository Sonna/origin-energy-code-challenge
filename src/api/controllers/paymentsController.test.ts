import { Response } from "express";

import { logger } from "../utils/logger";

import { makePayment } from "./paymentsController";

jest.mock("../utils/logger");

describe("makePayment handler", () => {
  const mockMakePayment = jest.fn();
  const mockRes = () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    return res;
  };

  const baseReq = {
    body: {},
  };

  const mockContext = {
    services: {
      paymentService: {
        makePayment: mockMakePayment,
      },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if input is invalid", () => {
    const req = {
      ...baseReq,
      body: {}, // Missing required fields
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const res = mockRes();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makePayment({} as any, req, res, mockContext as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Validation failed",
        errors: expect.any(Object),
      }),
    );
  });

  it("calls paymentService.makePayment and returns 200 with data", () => {
    const req = {
      ...baseReq,
      body: {
        accountId: "ACC-001",
        amount: 100,
        creditCard: {
          cardNumber: "4111111111111111",
          expiryDate: "12/30",
          cvv: "123",
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const res = mockRes();
    const mockCharge = {
      id: "D-9999",
      accountId: "ACC-001",
      amount: -100,
      date: "2025-05-31",
    };

    mockMakePayment.mockReturnValue(mockCharge);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makePayment({} as any, req, res, mockContext as any);

    expect(mockMakePayment).toHaveBeenCalledWith("ACC-001", 100);
    expect(res.json).toHaveBeenCalledWith(mockCharge);
  });

  it("returns 500 and logs error if makePayment throws", () => {
    const req = {
      ...baseReq,
      body: {
        accountId: "ACC-001",
        amount: 100,
        creditCard: {
          cardNumber: "4111111111111111",
          expiryDate: "12/30",
          cvv: "123",
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const res = mockRes();
    const error = new Error("Something went wrong");

    mockMakePayment.mockImplementation(() => {
      throw error;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makePayment({} as any, req, res, mockContext as any);

    expect(logger.error).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
