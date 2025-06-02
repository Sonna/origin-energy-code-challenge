import React from "react";

import { testRender } from "../../../test/testUtils";

import { App } from "./App";

jest.mock("./../EnergyAccountsSearch/EnergyAccountsSearch", () => ({
  EnergyAccountsSearch: () => <h1>Hello, TypeScript React!</h1>,
}));

describe("App", () => {
  test("renders correctly", async () => {
    const { getByText } = testRender(<App />);
    expect(getByText("Hello, TypeScript React!")).toBeInTheDocument();
  });
});
