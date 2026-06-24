"use server";

import { InferSignUpSchema, signUpSchema } from "@/lib/schemas/appwrite/auth";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export const signUp = async (data: InferSignUpSchema) => {
  try {
    const validation = signUpSchema.safeParse(data);
    if (!validation.success) {
      return { ok: false, error: "Data tidak valid" };
    }

    const { name, email, password } = validation.data;
    const { account } = await createAdminClient();

    await account.create({ userId: ID.unique(), email, password, name });
    const session = await account.createEmailPasswordSession({ email, password });

    const cookieStore = await cookies();
    cookieStore.set("next-satu-appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return { ok: true, message: "Sign up successful" };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return { error: error.message };
    return { ok: false, message: "Something went wrong" };
  }
};
