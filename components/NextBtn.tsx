"use client";

import React from "react";
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
import { nextMenu } from "@/lib/main-content/menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function NextBtn({ locale }: { locale: string }) {
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
        <DropdownMenuItem asChild>
          <Link href={`/${locale}/lang`}>Lang</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
