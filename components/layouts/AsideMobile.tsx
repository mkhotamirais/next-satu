"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

type Props = {
  menu: { label: string; url: string }[];
};

export default function AsideMobile({ menu }: Props) {
  return (
    <div className="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" type="button" aria-label="menu">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {menu.map((item, i) => (
            <DropdownMenuItem key={i} asChild>
              <Link href={item.url} className="block">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
