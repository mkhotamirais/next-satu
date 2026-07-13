import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APPWRITE_BUCKET_NEXT_BUCKET, APPWRITE_ENDPOINT } from "./constants";

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

export const diffForHumans = (date: string | number | Date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} detik yang lalu`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} hari yang lalu`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} bulan yang lalu`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} tahun yang lalu`;
};

export const generateSlug = (text: string) => {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return slug;
};

export const appwriteImageUrl = (imageId: string | null) => {
  if (imageId) {
    return `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_NEXT_BUCKET}/files/${imageId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  }
  return null;
};
