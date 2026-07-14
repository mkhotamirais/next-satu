import Headers from "@/components/layouts/Headers";
import { jsonplaceholderMenu } from "@/lib/content/main/menu";
import React from "react";

export default function JpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Headers menu={jsonplaceholderMenu} />
      <div className="container flex-1">{children}</div>
    </>
  );
}
