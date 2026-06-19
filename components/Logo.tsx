import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col items-center">
      <span className="font-semibold">NEXT</span>
      <span className="text-xs font-light tracking-widest">ONE</span>
    </Link>
  );
}
