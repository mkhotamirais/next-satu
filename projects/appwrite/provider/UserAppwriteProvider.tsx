"use client";

import { account, tablesDB } from "@/lib/client/appwrite";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser"; // Pastikan ini global state seperti Zustand
import { APPWRITE_DB_ID_NEXT_DB, APPWRITE_TABLE_USERS } from "@/lib/constants";

export default function UserAppwriteProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await account.get();
        const dbUser = await tablesDB.getRow({
          databaseId: APPWRITE_DB_ID_NEXT_DB,
          tableId: APPWRITE_TABLE_USERS,
          rowId: authUser.$id,
        });

        setUser({
          $id: dbUser.$id,
          name: dbUser.name,
          email: dbUser.email,
          phone: dbUser.phone,
          emailVerification: dbUser.emailVerification,
          role: dbUser.role,
          age: dbUser.age,
          address: dbUser.address,
        });
      } catch {
        setUser(null); // Set null jika tidak ada session / error
      }
    };

    fetchUser();
  }, [setUser]);

  // LANGSUNG RENDER CHILDREN!
  // Biarkan layout statis (Header/Footer) muncul duluan secara instan (SSG).
  // Status loading user cukup diurus di komponen yang membutuhkan saja (misal: tombol login di Header).
  return <>{children}</>;
}
