import Logo from "@/components/Logo";
import React from "react";
import NextBtn from "@/components/NextBtn";
import NavDesktop from "@/components/layouts/NavDesktop";
import NavMobile from "@/components/layouts/NavMobile";
import { menu } from "@/lib/content/components-apps/menu";

export default function Header() {
  return (
    <header className="h-16 sticky top-0 z-30 bg-white">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex">
          <NavDesktop menu={menu} />
          <NextBtn />
          <NavMobile menu={menu} />
        </div>
      </div>
    </header>
  );
}
