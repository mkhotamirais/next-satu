"use client";

import { usePathname } from "next/navigation";

export default function DashboardTitle() {
  const pathname = usePathname();
  const title = pathname.split("/").pop()?.replace(/-/g, " ");

  return <h1 className="h1 mb-0">{title ?? "Dashboard"}</h1>;
}
