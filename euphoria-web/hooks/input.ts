import { clearErrorOnChange } from "@/utils";
import { useCallback, ChangeEvent } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
} from "react-hook-form";

export function useHandleInputChange<T extends FieldValues>(
  errors: FieldErrors<T>,
  clearErrors: UseFormClearErrors<T>,
) {
  return useCallback(
    (name: Path<T>, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [errors, clearErrors],
  );
}
