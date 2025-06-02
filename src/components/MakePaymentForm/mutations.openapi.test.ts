import { waitFor } from "@testing-library/react";

import { testHook } from "../../../test/testUtils";

import { useMakePayment } from "./mutations.openapi";

const makePayment = jest.fn();

jest.mock("../../modules/openapi-client", () => ({
  getApiClient: () =>
    Promise.resolve({
      makePayment,
    }),
}));

describe("useMakePayment", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("calls the makePayment API and invalidates energy accounts", async () => {
    const mockCharge = {
      id: "D-0017",
      amount: 100,
      description: "Payment",
      date: "2025-05-01",
    };

    makePayment.mockResolvedValue({ data: mockCharge });

    const onSuccess = jest.fn();

    const { result } = testHook(() => useMakePayment({ onSuccess }));

    result.current.mutate({
      accountId: "A-001",
      amount: 100,
      creditCard: {
        cardNumber: "4242424242424242",
        expiryDate: "12/30",
        cvv: "123",
      },
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(makePayment).toHaveBeenCalledWith(null, {
      accountId: "A-001",
      amount: 100,
      creditCard: expect.any(Object),
    });

    expect(onSuccess).toHaveBeenCalled();
  });
});
