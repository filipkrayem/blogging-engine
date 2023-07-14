import { HTMLProps } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type InputProps = HTMLProps<HTMLInputElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOptions?: RegisterOptions<any, string>;
};

export default function Input(props: InputProps) {
  const { label, register, name, registerOptions } = props;

  //fixes react warning
  const inputProps = {
    ...props,
    registerOptions: undefined,
    register: undefined,
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-black">
          {label}
        </label>
      )}
      <input
        {...inputProps}
        {...register(name, registerOptions)}
        className="w-full rounded border border-borderLight px-4 py-2 placeholder:text-muted"
      ></input>
    </div>
  );
}
