import React from "react";

import { testRender } from "../../../test/testUtils";

import { Loader } from "./Loader";

describe("Loader", () => {
  test("renders correctly", async () => {
    const { getByText } = testRender(<Loader />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
