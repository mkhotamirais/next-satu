"use server";

import { APPWRITE_DB_ID_NEXT_DB, APPWRITE_TABLE_USERS } from "@/lib/constants";
import {
  InferUpdateNameSchema,
  InferUpdateEmailSchema,
  InferUpdatePhoneSchema,
  updateNameSchema,
  updateEmailSchema,
  updatePhoneSchema,
  InferUpdateUserSchema,
  updateUserSchema,
} from "@/lib/schemas/appwrite/profile";
import { createSessionClient } from "@/lib/server/appwrite";

export const updateName = async (data: InferUpdateNameSchema) => {
  const validation = updateNameSchema.safeParse(data);
  if (!validation.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { name } = validation.data;

  try {
    const { account } = await createSessionClient();
    await account.updateName({ name });
    return { ok: true, message: "Name updated successfully" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const updateEmail = async (data: InferUpdateEmailSchema) => {
  const validation = updateEmailSchema.safeParse(data);
  if (!validation.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { email, password } = validation.data;

  try {
    const { account } = await createSessionClient();
    await account.updateEmail({ email, password });
    return { ok: true, message: "Email updated successfully" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const updatePhone = async (data: InferUpdatePhoneSchema) => {
  const validation = updatePhoneSchema.safeParse(data);
  if (!validation.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { phone, password } = validation.data;

  try {
    const { account } = await createSessionClient();
    await account.updatePhone({ phone, password });
    return { ok: true, message: "Phone updated successfully" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const updateUser = async (data: InferUpdateUserSchema) => {
  const validation = updateUserSchema.safeParse(data);
  if (!validation.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { age, address } = validation.data;

  try {
    const { account, tablesDB } = await createSessionClient();
    const authUser = await account.get();

    await tablesDB.updateRow({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_USERS,
      rowId: authUser.$id,
      data: { age: age ? Number(age) : null, address },
    });
    return { ok: true, message: "User data updated successfully" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
