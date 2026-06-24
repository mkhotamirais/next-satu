import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  // const user = await getLoggedInUser();

  // if (!user) redirect("/appwrite/signup");

  // redirect("/appwrite/account");

  return <div>Home</div>;
}
