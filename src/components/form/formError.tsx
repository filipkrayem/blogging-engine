import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from "@hookform/error-message";
import { FieldErrors, FieldName, FieldValues } from "react-hook-form";

type FormErrorProps<T extends FieldValues> = {
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;
  errors: FieldErrors<T>;
};

export default function FormError<T extends FieldValues>(
  props: FormErrorProps<T>
) {
  const { name, errors } = props;
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <div
            key={type}
            className="flex rounded w-full bg-red-500 text-white px-4 py-3"
          >
            {message ?? "An error occurred"}
          </div>
        ))
      }
    />
  );
}
