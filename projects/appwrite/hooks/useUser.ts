import { User } from "@/lib/types/appwrite";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (isPending: boolean) => void;
  fetchUser: () => Promise<void>; // ← tambah ini
}

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loading: true,
  setLoading: (loading) => set({ loading }),
  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/appwrite/auth");
      const user = await res.json();
      set({ user });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
