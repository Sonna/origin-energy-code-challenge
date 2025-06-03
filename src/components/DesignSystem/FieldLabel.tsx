import React, { type DetailedHTMLProps, type LabelHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export const FieldLabel = ({ children, ...rest }: Props) => {
  return <label {...rest}>{children}</label>;
};
