import { getBlogs } from "@/actions/appwrite/blog";
import BlogList from "@/projects/appwrite/components/BlogList";
import React from "react";
import { Blog as BlogType } from "@/lib/types/appwrite";
import Breadcrumb from "@/components/ui/custom/Breadcrumb";

export default async function Blog() {
  const { data: blogs } = await getBlogs();

  return (
    <div>
      <h1 className="h1">Blog</h1>
      <Breadcrumb />
      <BlogList blogs={blogs as BlogType[]} />
    </div>
  );
}
