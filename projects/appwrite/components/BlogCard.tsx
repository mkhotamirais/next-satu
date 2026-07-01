import { APPWRITE_BUCKET_NEXT_BUCKET, APPWRITE_ENDPOINT } from "@/lib/constants";
import { Blog } from "@/lib/types/appwrite";
import Image from "next/image";
import Link from "next/link";

export function BlogCard({ blog }: { blog: Blog }) {
  const imageUrl = blog.bannerId
    ? `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_NEXT_BUCKET}/files/${blog.bannerId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
    : null;

  const excerpt = blog.content.length > 150 ? blog.content.slice(0, 150) + "..." : blog.content;

  const createdAt = new Date(blog.$createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-2">
      <Link href={`/appwrite/blog/${blog.$id}`}>
        <div className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-shadow duration-200">
          {/* Image */}
          {imageUrl ? (
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={imageUrl}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}

          {/* Content */}
          <div className="p-4 flex flex-col gap-2">
            <h2 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {blog.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
            <span className="text-xs text-muted-foreground mt-1">{createdAt}</span>
          </div>
        </div>
      </Link>
      {/* <div>halo</div> */}
    </div>
  );
}
