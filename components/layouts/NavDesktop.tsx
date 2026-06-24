import { Button } from "@/components/ui/button";
import { menu } from "@/lib/content/main/menu";
import Link from "next/link";

export default function NavDesktop() {
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
