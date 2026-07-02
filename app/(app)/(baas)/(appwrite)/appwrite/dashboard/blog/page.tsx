import { getBlogs } from "@/actions/appwrite/blog";
import { Blog as BlogType } from "@/lib/types/appwrite";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlogList from "@/projects/appwrite/components/BlogList";
import { getLoggedInUser } from "@/lib/server/appwrite.query";

export default async function Blog() {
  const { data: blogs } = await getBlogs();
  if (!blogs) return <div>No blogs found</div>;
  const user = await getLoggedInUser();
  const isAdmin = user?.role === "admin";

  return (
    <div>
      <Button type="button" asChild size="lg" className="mb-4">
        <Link href="/appwrite/dashboard/blog/create-blog">Create Blog</Link>
      </Button>
      <BlogList blogs={blogs as BlogType[]} isAdmin={isAdmin} />
    </div>
  );
}
