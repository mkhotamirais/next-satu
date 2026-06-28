// src/app/oauth/route.ts
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.redirect(new URL("/appwrite/signin", request.url));
  }

  const { account } = await createAdminClient();
  const session = await account.createSession({ userId, secret });

  const cookieStore = await cookies();
  cookieStore.set("next-satu-appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });

  return NextResponse.redirect(new URL("/appwrite/account", request.url));
}
