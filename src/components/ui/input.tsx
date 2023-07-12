import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full rounded border border-borderLight px-4 py-2 placeholder:text-muted"
    ></input>
  );
}
