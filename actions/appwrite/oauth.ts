"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function oauthGithub() {
  const { account } = await createAdminClient();

  const originHeader = await headers();
  const origin = originHeader.get("origin");
  console.log("origin:", origin); // ← tambahkan ini dulu
  if (!origin) throw new Error("Origin not found");

  const redirectUrl = await account.createOAuth2Token({
    provider: OAuthProvider.Github,
    success: `${origin}/oauth`,
    failure: `${origin}/signin`,
  });

  return redirect(redirectUrl);
}
