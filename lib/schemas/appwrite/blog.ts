import * as z from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  imageId: z.string().optional(),
});

export type InferBlogSchema = z.infer<typeof blogSchema>;
