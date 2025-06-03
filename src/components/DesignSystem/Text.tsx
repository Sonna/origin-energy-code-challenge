import React from "react";
import classNames from "classnames";

export type TextProps = {
  as?: "p" | "small" | "span" | "h1" | "h2" | "h3" | "h4";
  color?: "primary" | "secondary" | "danger" | "success" | "muted";
  className?: string;
  children: React.ReactNode;
};

export const Text = ({ as = "p", color, className, children }: TextProps) => {
  const Tag = as;
  return (
    <Tag className={classNames(color && `text-${color}`, className)}>
      {children}
    </Tag>
  );
};
