import { Link } from "@/i18n/navigation";
import { menu } from "@/lib/content/lang/menu";
import React from "react";

export default function NavDesktop() {
  return (
    <div>
      {menu.map((item, i) => (
        <Link key={i} href={item.url} className="px-4 py-2 hover:bg-gray-200">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
