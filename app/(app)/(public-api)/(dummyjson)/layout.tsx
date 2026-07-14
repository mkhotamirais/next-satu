import Headers from "@/components/layouts/Headers";
import { dummyjsonMenu } from "@/lib/content/main/menu";
import React from "react";

export default function DummyjsonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Headers menu={dummyjsonMenu} />
      <div className="container flex-1">{children}</div>
    </>
  );
}
