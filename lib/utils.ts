import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getWeekDay = (weekday: number | string) => {
  switch (weekday) {
    case 1:
    case "1":
      return "Monday";
    case 2:
    case "2":
      return "Tuesday";
    case 3:
    case "3":
      return "Wednesday";
    case 4:
    case "4":
      return "Thursday";
    case 5:
    case "5":
      return "Friday";
    case 6:
    case "6":
      return "Saturday";
    case 7:
    case "7":
      return "Sunday";
    default:
      return "Unknown";
  }
};

export const getShortWeekDay = (weekday: number | string) => {
  switch (weekday) {
    case 1:
    case "1":
      return "Mon";
    case 2:
    case "2":
      return "Tue";
    case 3:
    case "3":
      return "Wed";
    case 4:
    case "4":
      return "Thu";
    case 5:
    case "5":
      return "Fri";
    case 6:
    case "6":
      return "Sat";
    case 7:
    case "7":
      return "Sun";
    default:
      return "Unknown";
  }
};

export const getRepetition = (repetition: number) => {
  switch (repetition) {
    case 1:
      return "Every week";
    case 2:
      return "Every two weeks";
    case 4:
      return "Every month";
    default:
      return "Unknown";
  }
};
