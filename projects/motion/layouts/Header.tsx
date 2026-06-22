import Logo from "@/components/Logo";
import React from "react";
import NavMobile from "./NavMobile";
import NavDesktop from "./NavDesktop";

export default function Header() {
  return (
    <header className="sticky top-0 border-b">
      <div className="container flex items-center justify-between">
        <Logo />
        <div>
          <NavMobile />
          <NavDesktop />
        </div>
      </div>
    </header>
  );
}
