import { getBlogBySlug } from "@/actions/appwrite/blog";
import Breadcrumb from "@/components/ui/custom/Breadcrumb";
import { APPWRITE_BUCKET_NEXT_BUCKET, APPWRITE_ENDPOINT } from "@/lib/constants";
import { diffForHumans } from "@/lib/utils";
import Image from "next/image";

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: blog } = await getBlogBySlug(slug);

  if (!blog) return <div>Blog not found</div>;

  const imageUrl = blog.bannerId
    ? `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_NEXT_BUCKET}/files/${blog.bannerId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
    : "";

  return (
    <section className="max-w-3xl mx-auto my-4">
      <Breadcrumb />
      <article className="prose w-full max-w-3xl dark:prose-invert">
        <h1 className="first-letter:capitalize">{blog.title}</h1>
        <p className="text-xs text-muted-foreground mt-1">{diffForHumans(blog.$createdAt)}</p>

        <Image src={imageUrl} alt={blog.title} width={500} height={300} className="w-full rounded-md" loading="eager" />
        <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      </article>
    </section>
  );
}
