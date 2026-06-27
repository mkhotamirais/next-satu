"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { nextMenu } from "@/lib/content/main/menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function NextBtn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          NextCore{" "}
          <span>
            <ChevronDown />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={`/`}>Home</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {nextMenu.map((item, i) => (
          <DropdownMenuGroup key={i}>
            <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
            {item.menu.map((itm, j) => (
              <DropdownMenuItem key={j} asChild>
                <Link href={itm.url}>{itm.label}</Link>
              </DropdownMenuItem>
            ))}
            {i < nextMenu.length - 1 && <DropdownMenuSeparator />}
          </DropdownMenuGroup>
        ))}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
