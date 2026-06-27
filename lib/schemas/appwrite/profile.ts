// src/lib/schemas/appwrite/profile.ts
import * as z from "zod";

export const updateNameSchema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Name too short"),
});

export const updateEmailSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updatePhoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number too short")
    .max(15, "Phone number too long")
    .regex(/^[+]?[0-9\s\-()]+$/, "Invalid phone number"),
  password: z.string().min(1, "Password is required"),
});

export type InferUpdateNameSchema = z.infer<typeof updateNameSchema>;
export type InferUpdateEmailSchema = z.infer<typeof updateEmailSchema>;
export type InferUpdatePhoneSchema = z.infer<typeof updatePhoneSchema>;
