import { APPWRITE_BUCKET_NEXT_BUCKET, APPWRITE_ENDPOINT } from "@/lib/constants";
import { Blog } from "@/lib/types/appwrite";
import Image from "next/image";
import Link from "next/link";
import { diffForHumans } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  blog: Blog;
  isAdmin?: boolean;
}

export async function BlogCard({ blog, isAdmin = false }: Props) {
  const imageUrl = blog.bannerId
    ? `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_NEXT_BUCKET}/files/${blog.bannerId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
    : null;

  const excerpt = blog.content.length > 150 ? blog.content.slice(0, 150) + "..." : blog.content;

  return (
    <div className="flex flex-col gap-2">
      <Link href={`/appwrite/blog/${blog.slug}`}>
        <div className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-shadow duration-200">
          {imageUrl ? (
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={imageUrl}
                alt={blog.title}
                width={500}
                height={300}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}

          <div className="p-4 flex flex-col gap-2">
            <h2 className="group-hover:underline font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {blog.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
            <span className="text-xs text-muted-foreground mt-1">{diffForHumans(blog.$createdAt)}</span>
          </div>
        </div>
      </Link>

      {isAdmin ? (
        <div className="border p-2 rounded-lg flex flex-wrap items-center gap-2">
          <Button>
            <Link href={`/appwrite/blog/${blog.$id}`}>Read More</Link>
          </Button>
          <Button variant="outline">
            <Link href={`/appwrite/blog/${blog.$id}/edit`}>Edit</Link>
          </Button>
          <Button variant="destructive">Delete</Button>
        </div>
      ) : null}
    </div>
  );
}
