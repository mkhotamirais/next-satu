import { dashboardMenu } from "@/lib/content/appwrite/menu";
import Link from "next/link";
import React from "react";

export default function DashboardDesktop() {
  return (
    <nav className="hidden md:block">
      {dashboardMenu.map((item, i) => (
        <Link href={item.url} key={i} className="text-sm px-3 block py-2 rounded hover:bg-gray-100">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
