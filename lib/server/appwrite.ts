import "server-only";

import { Client, Account, Databases, Users, TablesDB, Storage } from "node-appwrite";
import { cookies } from "next/headers";
import { APPWRITE_API_KEY, APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../constants";

export async function createSessionClient() {
  const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

  const cookieStore = await cookies();
  const session = cookieStore.get("next-satu-appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get tablesDB() {
      return new TablesDB(client); // ← tambah ini
    },
    get storage() {
      return new Storage(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client); // ← tambah ini
    },
    get users() {
      return new Users(client); // ← tambah ini
    },
    get tablesDB() {
      return new TablesDB(client); // ← tambah ini
    },
    get storage() {
      return new Storage(client);
    },
  };
}
