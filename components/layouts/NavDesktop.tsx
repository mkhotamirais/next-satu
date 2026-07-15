import { Button } from "@/components/ui/button";
import { Menu } from "@/lib/types/main";
import Link from "next/link";

type Props = {
  menu: Menu[];
  authButtons?: React.ReactNode;
};

export default function NavDesktop({ menu = [], authButtons }: Props) {
  return (
    <nav className="hidden md:flex items-center mr-2">
      {menu.map((item, i) => (
        <Link href={item.url} key={i}>
          <Button variant={"ghost"} className="">
            {item.label}
          </Button>
        </Link>
      ))}
      {authButtons && authButtons}
    </nav>
  );
}
