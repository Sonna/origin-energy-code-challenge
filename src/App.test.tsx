import React from "react";

import { testRender } from "./../test/testUtils";

import { App } from "./App";

describe("App", () => {
  test("renders correctly", async () => {
    const { getByText } = testRender(<App />);
    expect(getByText("Hello, TypeScript React!")).toBeInTheDocument();
  });
});
