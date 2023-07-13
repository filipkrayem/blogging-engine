import classNames from "classnames";
import { HTMLProps } from "react";

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  onClick: () => void;
  children: React.ReactNode;
  buttonType: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button(props: ButtonProps) {
  const { children, className, buttonType } = props;

  return (
    <button
      {...props}
      className={classNames(`rounded px-4 py-2`, className, {
        "btn-primary": buttonType === "primary",
        "btn-secondary": buttonType === "secondary",
      })}
    >
      {children}
    </button>
  );
}
