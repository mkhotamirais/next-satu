"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function oauthGithub() {
  const { account } = await createAdminClient();

  const originHeader = await headers();
  const origin = originHeader.get("origin");

  if (!origin) throw new Error("Origin not found");

  const redirectUrl = await account.createOAuth2Token({
    provider: OAuthProvider.Github,
    success: `${origin}/appwrite/oauth`,
    failure: `${origin}/appwrite/signin`,
  });

  return redirect(redirectUrl);
}
