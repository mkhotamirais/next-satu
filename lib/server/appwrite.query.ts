import "server-only";
import { createSessionClient } from "@/lib/server/appwrite";
import { APPWRITE_DB_ID_NEXT_DB, APPWRITE_TABLE_USERS } from "../constants";
import { User } from "../types/appwrite";

export async function getLoggedInUser() {
  try {
    const { account, tablesDB } = await createSessionClient();
    // return await account.get();
    const authUser = await account.get();

    const dbUser = await tablesDB.getRow({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_USERS,
      rowId: authUser.$id,
    });

    let user = {
      $id: authUser.$id,
      name: authUser.name,
      email: authUser.email,
      phone: authUser.phone,
    } as User;

    if (dbUser) {
      user = {
        ...user,
        role: dbUser.role,
        age: dbUser.age,
        address: dbUser.address,
      };
    }

    return user;
  } catch {
    return null;
  }
}
