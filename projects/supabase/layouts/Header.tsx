import Logo from "@/components/Logo";
import React from "react";
import NavDesktop from "./NavDesktop";
import NextBtn from "@/components/NextBtn";
// import NavMobile from "./NavMobile";

export default function Header() {
  return (
    <header className="sticky top-0 h-16 z-30 bg-white">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex">
          <NavDesktop />
          <NextBtn />
          {/* <NavMobile /> */}
        </div>
      </div>
    </header>
  );
}
