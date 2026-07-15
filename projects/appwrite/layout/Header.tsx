import Logo from "@/components/Logo";
import AuthDesktop from "./AuthDesktop";
import NavDesktop from "@/components/layouts/NavDesktop";
import { menu } from "@/lib/content/appwrite/menu";
import NavMobile from "@/components/layouts/NavMobile";
import AuthMobile from "./AuthMobile";
import NextBtn from "@/components/NextBtn";

export default function Header() {
  return (
    <header className="sticky top-0 h-16 z-30 bg-white">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center">
          <NavDesktop menu={menu} authButtons={<AuthDesktop />} />
          <NextBtn />
          <NavMobile menu={menu} authButtons={<AuthMobile />} />
        </div>
      </div>
    </header>
  );
}
