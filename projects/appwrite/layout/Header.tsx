import Logo from "@/components/Logo";
import NavDesktop from "./NavDesktop";
import AuthButtons from "./AuthButtons";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className="sticky top-0 h-16 z-30 bg-white">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center">
          <NavDesktop />
          <Suspense fallback={<div>Loading...</div>}>
            <AuthButtons />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
