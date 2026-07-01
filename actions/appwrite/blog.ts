"use server";

import { blogSchema, InferBlogSchema } from "@/lib/schemas/appwrite/blog";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { APPWRITE_DB_ID_NEXT_DB, APPWRITE_TABLE_BLOG, APPWRITE_BUCKET_NEXT_BUCKET } from "@/lib/constants";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

// GET ALL BLOGS
export const getBlogs = async () => {
  try {
    const { databases } = await createAdminClient();

    const blogs = await databases.listDocuments({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      collectionId: APPWRITE_TABLE_BLOG,
    });

    return { ok: true, data: blogs.documents };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

// GET BLOG BY ID
export const getBlogById = async (id: string) => {
  try {
    const { databases } = await createAdminClient();

    const blog = await databases.getDocument({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      collectionId: APPWRITE_TABLE_BLOG,
      documentId: id,
    });

    return { ok: true, data: blog };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

// CREATE BLOG
export const createBlog = async (data: InferBlogSchema, imageFile?: FormData) => {
  const validation = blogSchema.safeParse(data);
  if (!validation.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { title, content } = validation.data;

  try {
    const { tablesDB, storage } = await createSessionClient();

    // 1. Upload image ke storage kalau ada
    let imageId = null;
    if (imageFile) {
      const file = imageFile.get("image") as File;
      const uploaded = await storage.createFile({
        bucketId: APPWRITE_BUCKET_NEXT_BUCKET,
        fileId: ID.unique(),
        file,
      });
      imageId = uploaded.$id;
    }

    // 2. Simpan blog ke database
    const blog = await tablesDB.createRow({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      tableId: APPWRITE_TABLE_BLOG,
      rowId: ID.unique(),
      data: { title, content, bannerId: imageId },
    });

    revalidatePath("/appwrite/dashboard/blog");
    return { ok: true, data: blog, message: "Blog created successfully" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

// UPDATE BLOG
export const updateBlog = async (id: string, data: InferBlogSchema, imageFile?: FormData) => {
  const validation = blogSchema.safeParse(data);
  if (!validation.success) {
    return { ok: false, message: "Data tidak valid" };
  }

  const { title, content, imageId: oldImageId } = validation.data;

  try {
    const { databases, storage } = await createSessionClient();

    // 1. Upload image baru kalau ada
    let imageId = oldImageId ?? null;
    if (imageFile) {
      const file = imageFile.get("image") as File;

      // Hapus image lama dulu kalau ada
      if (oldImageId) {
        await storage.deleteFile({
          bucketId: APPWRITE_BUCKET_NEXT_BUCKET,
          fileId: oldImageId,
        });
      }

      const uploaded = await storage.createFile({
        bucketId: APPWRITE_BUCKET_NEXT_BUCKET,
        fileId: ID.unique(),
        file,
      });
      imageId = uploaded.$id;
    }

    // 2. Update blog di database
    const blog = await databases.updateDocument({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      collectionId: APPWRITE_TABLE_BLOG,
      documentId: id,
      data: { title, content, imageId },
    });

    revalidatePath("/appwrite/dashboard/blogs");
    revalidatePath(`/appwrite/dashboard/blogs/${id}`);
    return { ok: true, data: blog, message: "Blog updated successfully" };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

// DELETE BLOG
export const deleteBlog = async (id: string, imageId?: string) => {
  try {
    const { databases, storage } = await createSessionClient();

    // 1. Hapus image dari storage kalau ada
    if (imageId) {
      await storage.deleteFile({
        bucketId: APPWRITE_BUCKET_NEXT_BUCKET,
        fileId: imageId,
      });
    }

    // 2. Hapus blog dari database
    await databases.deleteDocument({
      databaseId: APPWRITE_DB_ID_NEXT_DB,
      collectionId: APPWRITE_TABLE_BLOG,
      documentId: id,
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
