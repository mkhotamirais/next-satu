import Logo from "@/components/Logo";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import NextBtn from "../NextBtn";
import { Menu } from "@/lib/types/main";

export default async function Headers({ menu }: { menu: Menu[] }) {
  return (
    <header className={`h-16 sticky backdrop-blur-sm top-0 z-50 bg-white/80 dark:bg-black/80`}>
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <NavDesktop menu={menu} />
          <NextBtn />
          <NavMobile menu={menu} />
        </div>
      </div>
    </header>
  );
}
