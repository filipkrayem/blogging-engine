import { type InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
};

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      {...props.register(props.name, { required: props.required })}
      //@ts-ignore
      register={undefined}
      className="w-full rounded border border-borderLight px-4 py-2 placeholder:text-muted"
    ></input>
  );
}
