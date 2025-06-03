import React, {
  type DetailedHTMLProps,
  type FormHTMLAttributes,
  type ReactNode,
} from "react";
import classNames from "classnames";

type Props = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  className?: string;
  children: ReactNode;
};

export const Form = ({ className, children, ...rest }: Props) => {
  return (
    <form className={classNames("form-group", className)} {...rest}>
      {children}
    </form>
  );
};
