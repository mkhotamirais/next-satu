"use server";

import { blogSchema } from "@/lib/schemas/appwrite/blog";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { APPWRITE_DB_ID_NEXT_DB, APPWRITE_TABLE_BLOG, APPWRITE_BUCKET_NEXT_BUCKET } from "@/lib/constants";
import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { appwriteImageUrl, generateSlug } from "@/lib/utils";
import { getLoggedInUser } from "@/lib/server/appwrite.query";

// GET ALL BLOGS
export const getBlogs = async () => {
  try {
    const { tablesDB } = await createAdminClient();

    const res = await tablesDB.listRows({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_BLOG,
    });

    return { ok: true, data: res.rows, total: res.total };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

// GET BLOG BY SLUG
export const getBlogBySlug = async (slug: string) => {
  try {
    const { tablesDB } = await createAdminClient();

    const res = await tablesDB.listRows({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_BLOG,
      queries: [Query.equal("slug", slug), Query.limit(1)],
    });

    if (res.rows.length === 0) {
      return { ok: false, message: "Blog not found" };
    }

    return { ok: true, data: res.rows[0] };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

// CREATE BLOG
export const createBlog = async (formData: FormData) => {
  const user = await getLoggedInUser();
  if (!user || user.role !== "admin") return { ok: false, message: "Unauthorized" };

  const file = formData.get("image") as File | null;
  const imageFile = file instanceof File && file.size > 0 ? file : null;

  const rawData = Object.fromEntries(formData.entries());
  const dataForValidation = { ...rawData, image: imageFile };

  const validatedFields = blogSchema.safeParse(dataForValidation);
  if (!validatedFields.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { title, content } = validatedFields.data;
  const slug = generateSlug(title);

  try {
    const { tablesDB, storage } = await createSessionClient();

    // 1. Upload image ke storage kalau ada
    let imageId = null;
    if (imageFile) {
      const file = imageFile;
      const uploaded = await storage.createFile({
        bucketId: APPWRITE_BUCKET_NEXT_BUCKET,
        fileId: ID.unique(),
        file,
      });
      imageId = uploaded.$id;
    }

    const imageUrl = appwriteImageUrl(imageId);

    // 2. Simpan blog ke database
    await tablesDB.createRow({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_BLOG,
      rowId: ID.unique(),
      data: { title, slug, content, imageId, imageUrl },
    });

    return { ok: true, message: "Blog created successfully" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

// UPDATE BLOG
export const updateBlog = async (slug: string, formData: FormData) => {
  const user = await getLoggedInUser();
  if (!user || user.role !== "admin") return { ok: false, message: "Unauthorized" };

  const file = formData.get("image") as File | null;
  const imageFile = file instanceof File && file.size > 0 ? file : null;
  const removeImage = formData.get("removeImage") === "true";

  const rawData = Object.fromEntries(formData.entries());
  const dataForValidation = { ...rawData, image: imageFile };

  const validatedFields = blogSchema.safeParse(dataForValidation);
  if (!validatedFields.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { title, content } = validatedFields.data;

  try {
    const { tablesDB, storage } = await createSessionClient();

    const currentBlog = await getBlogBySlug(slug);
    if (!currentBlog || !currentBlog.data) return { ok: false, message: "Blog not found" };

    const existingTitle = await tablesDB.listRows({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_BLOG,
      queries: [Query.equal("title", title), Query.limit(1)],
    });

    if (existingTitle.rows.length > 0 && existingTitle.rows[0].title !== currentBlog.data.title) {
      return { ok: false, message: "Blog title already exists" };
    }

    let imageId = currentBlog.data.imageId;
    let imageUrl = currentBlog.data.imageUrl;

    if (removeImage) {
      if (currentBlog.data.imageId) {
        await storage.deleteFile({
          bucketId: APPWRITE_BUCKET_NEXT_BUCKET,
          fileId: currentBlog.data.imageId,
        });
      }
      imageId = null;
      imageUrl = null;
    }

    if (imageFile) {
      if (currentBlog.data.imageId) {
        await storage.deleteFile({
          bucketId: APPWRITE_BUCKET_NEXT_BUCKET,
          fileId: currentBlog.data.imageId,
        });
      }

      const uploaded = await storage.createFile({
        bucketId: APPWRITE_BUCKET_NEXT_BUCKET,
        fileId: ID.unique(),
        file: imageFile,
      });
      imageId = uploaded.$id;
      imageUrl = appwriteImageUrl(imageId);
    }

    await tablesDB.updateRow({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_BLOG,
      rowId: currentBlog.data.$id,
      data: { title, content, imageId, imageUrl },
    });
    return { ok: true, message: "Blog updated successfully" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

// DELETE BLOG
export const deleteBlog = async (id: string) => {
  const user = await getLoggedInUser();
  if (!user || user.role !== "admin") return { ok: false, message: "Unauthorized" };

  try {
    const { tablesDB, storage } = await createSessionClient();

    const existingBlog = await tablesDB.getRow({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_BLOG,
      rowId: id,
    });

    if (!existingBlog) return { ok: false, message: "Blog not found" };

    const imageId = existingBlog.data.imageId;

    if (imageId) {
      await storage.deleteFile({
        bucketId: APPWRITE_BUCKET_NEXT_BUCKET,
        fileId: imageId,
      });
    }

    await tablesDB.deleteRow({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_BLOG,
      rowId: id,
    });

    revalidatePath("/appwrite/dashboard/blogs");
    return { ok: true, message: "Blog deleted successfully" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
