import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function LinkToLang() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  return <Link href={`/${locale}/lang`}>LinkToLang</Link>;
}
