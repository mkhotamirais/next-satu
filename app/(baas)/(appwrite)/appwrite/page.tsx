// import { getLoggedInUser } from "@/lib/server/appwrite";
// import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  // const user = await getLoggedInUser();

  // if (!user) redirect("/appwrite/signup");

  // redirect("/appwrite/account");

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="h1">Appwrite Home</h1>
    </div>
  );
}
