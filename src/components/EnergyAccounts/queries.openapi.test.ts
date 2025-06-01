import { waitFor } from "@testing-library/react";

import { testHook } from "../../../test/testUtils";

import { useGetEnergyAccounts } from "./queries.openapi";

const getEnergyAccounts = jest.fn();
jest.mock("./../../modules/openapi-client", () => ({
  getApiClient: () =>
    Promise.resolve({
      getEnergyAccounts,
    }),
}));

describe("useGetEnergyAccounts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches and returns energy accounts", async () => {
    const mockAccounts = [
      { id: "A-0001", type: "ELECTRICITY", address: "123 Fake St" },
    ];
    getEnergyAccounts.mockResolvedValue({ data: mockAccounts });

    const { result } = testHook(useGetEnergyAccounts);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockAccounts);
    expect(getEnergyAccounts).toHaveBeenCalledTimes(1);
  });
});
