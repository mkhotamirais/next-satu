import { authMenu, menu } from "@/lib/content/appwrite/menu";
import Link from "next/link";
import React from "react";

export default function NavDesktop() {
  return (
    <div>
      {menu.map((item, i) => (
        <Link href={item.url} key={i} className="text-sm px-3">
          {item.label}
        </Link>
      ))}
      {authMenu.map((item, i) => (
        <Link href={item.url} key={i} className="text-sm px-3">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
