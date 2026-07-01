import { getBlogs } from "@/actions/appwrite/blog";
import React from "react";
import BlogList from "./BlogList";
import { Blog as BlogType } from "@/lib/types/appwrite";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Blog() {
  const { data: blogs } = await getBlogs();
  if (!blogs) return <div>No blogs found</div>;

  return (
    <div>
      <Button type="button" asChild size="lg" className="mb-4">
        <Link href="/appwrite/dashboard/blog/create-blog">Create Blog</Link>
      </Button>
      <BlogList blogs={blogs as BlogType[]} />
    </div>
  );
}
