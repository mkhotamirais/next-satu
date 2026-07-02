"use client";

import Logo from "@/components/Logo";
import NavDesktop from "./NavDesktop";
import AuthButtons from "./AuthButtons";
import { useUser } from "../hooks/useUser";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 h-16 z-30 bg-white">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center">
          <NavDesktop />
          <AuthButtons user={user} />
        </div>
      </div>
    </header>
  );
}
