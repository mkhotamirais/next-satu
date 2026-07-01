import type { Models } from "node-appwrite";

export type UserRole = "user" | "admin";

export type User = Models.User<Models.Preferences> & {
  role: UserRole;
  age: number | null;
  address: string | null;
};

export type UserExtend = {
  $id: string;
  name: string;
  email: string;
  role: UserRole;
  age: number | null;
  address: string | null;
};

export type Blog = Models.DefaultDocument & {
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
