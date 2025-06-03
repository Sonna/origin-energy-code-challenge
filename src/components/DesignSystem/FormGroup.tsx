import React from "react";
import classNames from "classnames";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const FormGroup = ({ className, children }: Props) => {
  return <div className={classNames("form-group", className)}>{children}</div>;
};
