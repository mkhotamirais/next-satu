import { Blog } from "@/lib/types/appwrite";
import EditBlogForm from "./EditBlogForm";
import { getBlogBySlug } from "@/actions/appwrite/blog";

export default async function EditBlog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: blog } = await getBlogBySlug(slug);
  if (!blog) return <div>Blog not found</div>;

  return (
    <div>
      <EditBlogForm blog={blog as Blog} />
    </div>
  );
}
