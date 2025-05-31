import { render } from "@testing-library/react";
import React from "react";

import { App } from "./App";

describe("App", () => {
  test("renders correctly", async () => {
    const { getByText } = render(<App />);
    expect(getByText("Hello, TypeScript React!")).toBeInTheDocument();
  });
});
