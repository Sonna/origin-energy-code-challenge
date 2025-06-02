import React from "react";

import { testRender } from "../../../test/testUtils";

import { CircleIcon } from "./CircleIcon";

describe("CircleIcon", () => {
  test("renders correctly", async () => {
    const { getByText } = testRender(<CircleIcon />);
    expect(getByText("Icon")).toBeInTheDocument();
  });
});
