import "server-only";

import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";
import { APPWRITE_API_KEY, APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../constants";

export async function createSessionClient() {
  const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

  const cookieStore = await cookies();
  const session = cookieStore.get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.log(error);
    return null;
  }
}
