import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const smartTrim = (text: string, maxLength = 60) => {
  if (text.length <= maxLength) return text;

  const words = text.split(" ");
  let result = "";

  for (const word of words) {
    if ((result + " " + word).trim().length <= maxLength) {
      result = (result + " " + word).trim();
    } else {
      break;
    }
  }

  return result + "...";
};
