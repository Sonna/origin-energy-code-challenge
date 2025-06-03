import React from "react";

import { Text, TextProps } from "./Text";

type HeadingProps = Omit<TextProps, "as"> & {
  level?: "h1" | "h2" | "h3" | "h4";
};

export const Heading = ({
  level = "h1",
  color,
  className,
  children,
}: HeadingProps) => {
  return (
    <Text as={level} color={color} className={className}>
      {children}
    </Text>
  );
};
