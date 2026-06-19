import { create } from "zustand";

interface IGlobalStore {
  openSearch: boolean;
  setOpenSearch: (openSearch: boolean) => void;
}

export const useGlobal = create<IGlobalStore>((set) => ({
  openSearch: false,
  setOpenSearch: (openSearch) => set({ openSearch }),
}));
