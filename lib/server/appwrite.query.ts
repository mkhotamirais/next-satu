// src/lib/queries/auth.queries.ts
import "server-only";
import { createSessionClient } from "@/lib/server/appwrite";
import { APPWRITE_DB_ID_NEXT_DB, APPWRITE_TABLE_USERS } from "../constants";

export async function getLoggedInUser() {
  try {
    const { account, tablesDB } = await createSessionClient();
    // return await account.get();
    const authUser = await account.get();
    console.log("✅ authUser:", authUser);

    const dbUser = await tablesDB.getRow({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_USERS,
      rowId: authUser.$id,
    });
    console.log("✅ dbUser:", dbUser);

    // const user = {...authUser, ...dbUser};
    return {
      // dari Auth
      $id: authUser.$id,
      name: authUser.name,
      email: authUser.email,
      phone: authUser.phone,
      // dari Database
      role: dbUser.role,
      age: dbUser.age,
      address: dbUser.address,
    };
  } catch {
    return null;
  }
}
