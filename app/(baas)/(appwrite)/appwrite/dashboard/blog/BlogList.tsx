import { Blog } from "@/lib/types/appwrite";
import { BlogCard } from "@/projects/appwrite/components/BlogCard";

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-4">
      {blogs?.map((blog) => (
        <BlogCard key={blog.$id} blog={blog} />
      ))}
    </div>
  );
}
