import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { createSessionClient } from "@/lib/server/appwrite";
import { APPWRITE_DB_ID_NEXT_DB, APPWRITE_TABLE_USERS } from "../constants";
import { User, UserRole } from "../types/appwrite";

export async function getLoggedInUser(): Promise<User | null> {
  noStore();
  try {
    const { account, tablesDB } = await createSessionClient();
    const authUser = await account.get();
    console.log("1. authUser OK:", authUser.$id);
    console.log("2. DB_ID:", APPWRITE_DB_ID_NEXT_DB);
    console.log("3. TABLE:", APPWRITE_TABLE_USERS);

    const dbUser = await tablesDB.getRow({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_USERS,
      rowId: authUser.$id,
    });
    console.log("4. dbUser OK:", JSON.stringify(dbUser));

    return {
      $id: authUser.$id,
      name: authUser.name,
      email: authUser.email,
      phone: authUser.phone,
      role: dbUser.role as UserRole,
      age: dbUser.age as number | null,
      address: dbUser.address as string | null,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ FAILED:", error.message);
      console.error("❌ STACK:", error.stack);
    } else {
      console.error("❌ UNKNOWN ERROR:", String(error));
    }
    return null;
  }
}
