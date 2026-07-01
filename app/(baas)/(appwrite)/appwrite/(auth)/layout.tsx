import { getLoggedInUser } from "@/lib/server/appwrite.query";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getLoggedInUser();
  console.log(user);
  if (user) redirect("/appwrite/account");

  return <>{children}</>;
}
