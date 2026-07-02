import { Blog } from "@/lib/types/appwrite";
import { create } from "zustand";

interface AppwriteState {
  blog: Blog[];
  setBlog: (blog: Blog[]) => void;
}

export const useAppwriteStore = create<AppwriteState>((set) => ({
  blog: [],
  setBlog: (blog) => set({ blog }),
}));
