import { Blog } from "@/lib/types/appwrite";
import Image from "next/image";
import Link from "next/link";
import { diffForHumans } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Delete from "@/app/(app)/(baas)/(appwrite)/appwrite/dashboard/blog/Delete";

interface Props {
  blog: Blog;
  isAdmin?: boolean;
}

export async function BlogCard({ blog, isAdmin = false }: Props) {
  const excerpt = blog.content.length > 120 ? blog.content.slice(0, 120) + "..." : blog.content;

  return (
    <div className="flex flex-col gap-2">
      <Link href={`/appwrite/blog/${blog.slug}`}>
        <div className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-shadow duration-200">
          {blog?.imageUrl ? (
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                width={500}
                height={300}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-200"
                loading="eager"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}

          <div className="p-4 flex flex-col gap-2">
            <h2 className="first-letter:capitalize h-14 group-hover:underline font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {blog.title}
            </h2>
            <p className="h-20 text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
            <span className="text-xs text-muted-foreground mt-1">{diffForHumans(blog.$createdAt)}</span>
          </div>
        </div>
      </Link>

      {isAdmin ? (
        <div className="border p-2 rounded-lg flex flex-wrap items-center gap-2">
          <Button>
            <Link href={`/appwrite/blog/${blog.slug}`}>Read More</Link>
          </Button>
          <Button variant="outline">
            <Link href={`/appwrite/dashboard/blog/edit-blog/${blog.slug}`}>Edit</Link>
          </Button>
          <Delete id={blog.$id} title={blog.title} />
        </div>
      ) : null}
    </div>
  );
}
