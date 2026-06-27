"use server";

import { InferSignInSchema, InferSignUpSchema, signInSchema, signUpSchema } from "@/lib/schemas/appwrite/auth";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";

const SESSION_COOKIE = "next-satu-appwrite-session";

export const signUp = async (data: InferSignUpSchema) => {
  const validation = signUpSchema.safeParse(data);
  if (!validation.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { name, email, password } = validation.data;

  try {
    const { account } = await createAdminClient();

    await account.create({ userId: ID.unique(), email, password, name });
    const session = await account.createEmailPasswordSession({ email, password });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, session.secret, { path: "/", httpOnly: true, sameSite: "lax", secure: true });

    return { ok: true, message: "Sign up successful" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const signIn = async (data: InferSignInSchema) => {
  const validation = signInSchema.safeParse(data);
  if (!validation.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { email, password } = validation.data;

  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession({ email, password });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, session.secret, { path: "/", httpOnly: true, sameSite: "lax", secure: true });

    return { ok: true, message: "Sign in successful" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession({ sessionId: "current" });

    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    return { ok: true, message: "Sign out successful" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
