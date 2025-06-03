import { render } from "@testing-library/react";
import React from "react";

import { Text } from "./Text";

describe("<Text />", () => {
  it("renders with default 'p' tag", () => {
    const { getByText } = render(<Text>Default Paragraph</Text>);
    const element = getByText("Default Paragraph");
    expect(element.tagName.toLowerCase()).toBe("p");
  });

  it("renders with different heading levels", () => {
    const { getByText } = render(<Text as="h2">Heading 2</Text>);
    const element = getByText("Heading 2");
    expect(element.tagName.toLowerCase()).toBe("h2");
  });

  it("applies the correct color class", () => {
    const { getByText } = render(<Text color="danger">Error</Text>);
    const element = getByText("Error");
    expect(element).toHaveClass("text-danger");
  });

  it("applies additional class names", () => {
    const { getByText } = render(
      <Text className="my-custom-class">Styled</Text>,
    );
    const element = getByText("Styled");
    expect(element).toHaveClass("my-custom-class");
  });

  it("combines color and custom classes", () => {
    const { getByText } = render(
      <Text color="success" className="bold">
        Success
      </Text>,
    );
    const element = getByText("Success");
    expect(element).toHaveClass("text-success");
    expect(element).toHaveClass("bold");
  });

  it("renders children correctly", () => {
    const { getByText } = render(<Text>Some content</Text>);
    expect(getByText("Some content")).toBeInTheDocument();
  });
});
