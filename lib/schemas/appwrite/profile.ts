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

export const updateUserSchema = z.object({
  age: z
    .string()
    .optional()
    .refine(
      (val) => !val || (Number.isInteger(Number(val)) && Number(val) >= 1 && Number(val) <= 120),
      "Age must be a whole number between 1 and 120",
    ),

  address: z.string().max(255, "Address is too long").optional(),
});

export type InferUpdateNameSchema = z.infer<typeof updateNameSchema>;
export type InferUpdateEmailSchema = z.infer<typeof updateEmailSchema>;
export type InferUpdatePhoneSchema = z.infer<typeof updatePhoneSchema>;
export type InferUpdateUserSchema = z.infer<typeof updateUserSchema>;
