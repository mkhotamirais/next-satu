"use client";

import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

export default function UserAppwriteProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetch("/api/appwrite/auth").then((res) => res.json());
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, [setUser]);

  return <>{children}</>;
}
