import clsx from "clsx";
import { twMerge, type ClassNameValue } from "tailwind-merge";

export function cn(...args: ClassNameValue[]) {
  return clsx(twMerge(...args));
}
