"use client";

import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

export default function UserAppwriteProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <>{children}</>;
}
