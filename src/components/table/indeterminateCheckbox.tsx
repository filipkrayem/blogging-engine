import classNames from "classnames";
import { HTMLProps, useEffect, useRef } from "react";

type IndeterminateCheckboxProps = {
  indeterminate?: boolean;
  className?: string;
} & HTMLProps<HTMLInputElement>;

export default function IndeterminateCheckbox(
  props: IndeterminateCheckboxProps
) {
  const { indeterminate, className = "", ...rest } = props;

  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={classNames(className, "cursor-pointer")}
      {...rest}
    />
  );
}
