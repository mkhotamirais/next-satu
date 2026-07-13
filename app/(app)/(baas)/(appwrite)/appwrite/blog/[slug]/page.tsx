import { getBlogBySlug, getBlogs } from "@/actions/appwrite/blog";
import Breadcrumb from "@/components/ui/custom/Breadcrumb";
import { diffForHumans } from "@/lib/utils";
import Image from "next/image";

export const generateStaticParams = async () => {
  const { data: blogs } = await getBlogs();
  if (!blogs) return [];
  return blogs.map((blog) => ({ slug: blog.slug }));
};

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: blog } = await getBlogBySlug(slug);

  if (!blog) return <div>Blog not found</div>;

  return (
    <section className="max-w-3xl mx-auto my-4">
      <Breadcrumb />
      <article className="prose w-full max-w-3xl dark:prose-invert">
        <h1 className="first-letter:capitalize">{blog.title}</h1>
        <p className="text-xs text-muted-foreground mt-1">{diffForHumans(blog.$createdAt)}</p>

        {blog?.imageId ? (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={500}
            height={300}
            className="w-full rounded-md"
            loading="eager"
          />
        ) : (
          <div className="w-full h-100 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      </article>
    </section>
  );
}
