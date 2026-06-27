// src/lib/queries/auth.queries.ts
import "server-only";
import { createSessionClient } from "@/lib/server/appwrite";

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch {
    return null;
  }
}
