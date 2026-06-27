"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const homePath = ["about", "projects", "posts", "contact"];

export default function Logo() {
  const pathname = usePathname();

  const pathSplit = pathname.split("/");
  const path1 = pathSplit[1];
  const path2 = pathSplit[2];

  let title;

  if (!path1 || path1 === undefined) {
    title = null;
  }

  if (path1 && !homePath.includes(path1)) {
    title = path1;
  }

  if (path1 && path2 && path2 == "lang") {
    title = path2;
  }

  return (
    <Link href="/" className="flex flex-col items-center">
      <span className="font-semibold">
        NEXT<span className="font-light">ONE</span>
      </span>
      <span className="font-linght text-sm">{title}</span>
    </Link>
  );
}
