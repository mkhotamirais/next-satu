import Logo from "@/components/Logo";
// import SwitchLangBtn from "../components/SwitchLangBtn";
import SwitchLangOpt from "../components/SwitchLangOpt";
// import NavDesktop from "./NavDesktop";
// import NavMobile from "./NavMobile";

export default function Header() {
  return (
    <header className="sticky top-0 h-16">
      <div className="container flex items-center justify-between">
        <Logo />
        <div>
          {/* <SwitchLangBtn /> */}
          <SwitchLangOpt />
          {/* <NavDesktop />
          <NavMobile /> */}
        </div>
      </div>
    </header>
  );
}
