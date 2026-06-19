import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface ISheet2 {
  title: string | React.ReactNode;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}

export default function Sheet2({ title, children, side }: ISheet2) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-64">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
