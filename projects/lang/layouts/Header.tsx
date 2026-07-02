import Logo from "@/components/Logo";
import SwitchLangOpt from "../components/SwitchLangOpt";
import NavDesktop from "./NavDesktop";
// import NavMobile from "./NavMobile";

export default function Header() {
  return (
    <header className="sticky top-0 h-16">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <NavDesktop />
          <SwitchLangOpt />
          {/* <NavMobile /> */}
        </div>
      </div>
    </header>
  );
}
