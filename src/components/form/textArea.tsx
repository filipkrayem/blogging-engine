import classNames from "classnames";
import { HTMLProps } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type TextAreaProps = HTMLProps<HTMLTextAreaElement> & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOptions: RegisterOptions<any, string>;
  rows?: number;
};

export default function TextArea(props: TextAreaProps) {
  const defaultRows = 10;
  const {
    label,
    rows,
    register,
    registerOptions,
    placeholder,
    name,
    className,
  } = props;

  const textAreaProps = {
    ...props,
    registerOptions: undefined,
    register: undefined,
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-black ">
          {label}
        </label>
      )}
      <textarea
        id={name}
        {...textAreaProps}
        {...register(name, registerOptions)}
        rows={rows ?? defaultRows}
        className={classNames(
          "block w-full rounded border border-l-borderLight px-4 py-2",
          className
        )}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
