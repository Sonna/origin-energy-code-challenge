import React from "react";
import classNames from "classnames";

type TextProps = {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4";
  color?: "primary" | "secondary" | "danger" | "success" | "muted";
  children: React.ReactNode;
};

export const Text = ({ as = "p", color, children }: TextProps) => {
  const Tag = as;
  return <Tag className={classNames(color && `text-${color}`)}>{children}</Tag>;
};
