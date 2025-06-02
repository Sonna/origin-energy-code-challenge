import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router";

import { AccountTabs } from "./AccountTabs";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("AccountTabs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRoute = (initialPath = "/") =>
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/:accountType?" element={<AccountTabs />} />
        </Routes>
      </MemoryRouter>,
    );

  it("renders all three tabs", () => {
    const { getByLabelText } = renderWithRoute();
    expect(getByLabelText("All")).toBeInTheDocument();
    expect(getByLabelText("Gas")).toBeInTheDocument();
    expect(getByLabelText("Electricity")).toBeInTheDocument();
  });

  it("checks the correct tab based on the route param", () => {
    const { getByLabelText } = renderWithRoute("/gas");
    expect(getByLabelText("Gas")).toBeChecked();
    expect(getByLabelText("All")).not.toBeChecked();
    expect(getByLabelText("Electricity")).not.toBeChecked();
  });

  it("navigates to correct route on tab click", () => {
    const { getByLabelText } = renderWithRoute("/");

    const electricityTab = getByLabelText("Electricity");
    fireEvent.click(electricityTab);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: "/electricity",
    });
  });
});
