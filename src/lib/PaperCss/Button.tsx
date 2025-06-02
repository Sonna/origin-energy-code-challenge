import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  //   variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
};

export const Button = ({
  children,
  //   variant = "primary",
  onClick,
}: ButtonProps) => {
  return (
    // <button className={`btn-${variant}`} onClick={onClick}>
    <button onClick={onClick}>{children}</button>
  );
};
