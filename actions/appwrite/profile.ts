"use server";

import {
  InferUpdateNameSchema,
  InferUpdateEmailSchema,
  InferUpdatePhoneSchema,
  updateNameSchema,
  updateEmailSchema,
  updatePhoneSchema,
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
