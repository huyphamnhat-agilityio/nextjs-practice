import { ChangeEvent, KeyboardEvent } from "react";

export const onlyNumberKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  const { key, target } = e;
  const value = (target as HTMLInputElement).value;

  console.log("key", key);

  // Allow numbers, one dot for decimal, backspace, delete, and tab
  if (
    !/[0-9]/.test(key) &&
    key !== "." &&
    key !== "Backspace" &&
    key !== "Delete" &&
    key !== "Tab"
  ) {
    e.preventDefault();
  }

  // Prevent more than one dot in the input
  if (key === "." && value.includes(".")) {
    e.preventDefault();
  }
};
