"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/Logo";
import { SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import Sheet2 from "../Sheet2";
import { menu } from "@/lib/content/main/menu";

export default function NavMobile() {
  return (
    <div className="flex md:hidden">
      <Sheet2 title={<Logo />} side="right">
        <nav className="flex flex-col gap-1 px-3">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          {menu.map((item, i) => (
            <SheetClose asChild key={i}>
              <Link href={item.url}>
                <Button variant={"outline"} className="justify-start w-full">
                  {item.label}
                </Button>
              </Link>
            </SheetClose>
          ))}
        </nav>
      </Sheet2>
    </div>
  );
}
