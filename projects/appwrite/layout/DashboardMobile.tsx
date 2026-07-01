"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardMenu } from "@/lib/content/appwrite/menu";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function DashboardMobile() {
  return (
    <div className="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" type="button" aria-label="menu">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {dashboardMenu.map((item, i) => (
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
