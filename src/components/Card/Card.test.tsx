import React from "react";

import { testRender } from "../../../test/testUtils";

import { Card } from "./Card";

describe("Card", () => {
  test("renders correctly", async () => {
    const { getByText, queryByText } = testRender(<Card>Example</Card>);
    expect(queryByText("[Title]")).not.toBeInTheDocument();
    expect(getByText("Example")).toBeInTheDocument();
  });

  test("renders with title", async () => {
    const { getByText } = testRender(<Card title="[Title]">Example</Card>);
    expect(getByText("[Title]")).toBeInTheDocument();
    expect(getByText("Example")).toBeInTheDocument();
  });
});
