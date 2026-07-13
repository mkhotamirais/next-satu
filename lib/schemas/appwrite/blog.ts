import * as z from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  image: z
    .any()
    .refine((file): file is File | null => file === null || file instanceof File, "Invalid file")
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, "Max file size is 2MB")
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Tipe file tidak valid. Hanya format gambar yang diizinkan.",
    })
    .nullable()
    .optional(),
});

export type InferBlogSchema = z.infer<typeof blogSchema>;
