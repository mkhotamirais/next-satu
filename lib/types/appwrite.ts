import type { Models } from "node-appwrite";

export type UserRole = "user" | "admin";

// export type User = Models.User<Models.Preferences> & {
//   role: UserRole;
//   age: number | null;
//   address: string | null;
// };

// src/lib/types/appwrite.ts
export type User = {
  // dari Auth
  $id: string;
  name: string;
  email: string;
  phone: string;
  emailVerification?: boolean;
  // dari Database
  role: UserRole;
  age: number | null;
  address: string | null;
};

export type Blog = Models.DefaultRow & {
  title: string;
  content: string;
  bannerId: string;
};

// export interface Post {
//   title: string;
//   content: string;
//   bannerId: string;
//   $id: string;
//   $createdAt: string;
//   $updatedAt: string;
//   $permissions: string[];
//   $databaseId: string;
//   $collectionId: string;
// }
