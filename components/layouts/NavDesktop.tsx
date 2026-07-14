import { Button } from "@/components/ui/button";
import { Menu } from "@/lib/types/main";
import Link from "next/link";

export default function NavDesktop({ menu = [] }: { menu: Menu[] }) {
  return (
    <nav className="hidden md:flex items-center mr-2">
      {menu.map((item, i) => (
        <Link href={item.url} key={i}>
          <Button variant={"ghost"} className="">
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
