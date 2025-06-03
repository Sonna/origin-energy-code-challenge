import React, { type DetailedHTMLProps, type InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const FormInput = ({ children, ...rest }: Props) => {
  return <input {...rest}>{children}</input>;
};
