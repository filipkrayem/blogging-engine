import classNames from "classnames";
import { HTMLProps } from "react";

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  children: React.ReactNode;
  buttonType: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  const { children, className, buttonType } = props;

  const buttonProps = { ...props, buttonType: undefined };

  return (
    <button
      {...buttonProps}
      className={classNames(`rounded px-4 py-2`, className, {
        "btn-primary": buttonType === "primary",
        "btn-secondary": buttonType === "secondary",
      })}
    >
      {children}
    </button>
  );
}
