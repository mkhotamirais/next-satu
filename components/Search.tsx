"use client";

import { SearchIcon } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { IPost } from "@/lib/main-content/types";
import { projects } from "./landing/ProjectsSkills";

export default function Search({ posts }: { posts: IPost[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const linkStyle = "block py-2 px-3 hover:bg-black/10 dark:hover:bg-white/10 rounded";
  const titleStyle = "sticky top-0 px-5 py-2 bg-white/80 dark:bg-black/80 text-sm rounded-md";

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((p) => p.title.toLowerCase().includes(query))
        .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())),
    [query],
  );

  const filteredPosts = useMemo(
    () =>
      posts
        ?.filter((p) => p.meta.title.toLowerCase().includes(query))
        .sort((a, b) => a.meta.title.toLowerCase().localeCompare(b.meta.title.toLowerCase())) ?? [],
    [posts, query],
  );

  const onSearch = useDebouncedCallback((e: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e) {
      params.set("q", e);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  }, 300);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} aria-label="search">
          <SearchIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 py-4 border-none max-w-sm mx-auto [&>button]:hidden bg-white/80 dark:bg-black/80 dark:text-white">
        <DialogHeader className="hidden">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div onClick={(e) => e.stopPropagation()} className="rounded-md overflow-hidden px-3">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full border border-muted-foreground py-2 px-3 rounded-md"
          />
          <div className="h-[50vh] overflow-y-scroll">
            {filteredPosts.length === 0 && filteredProjects.length === 0 ? (
              <div className="p-2">No result found</div>
            ) : null}

            {filteredProjects.length ? (
              <div>
                <h3 className={titleStyle}>Projects</h3>
                <div className="p-2">
                  {filteredProjects.map((project, i) => (
                    <DialogClose key={i} asChild>
                      <Link href={project.url} className={linkStyle}>
                        <p>{project.title}</p>
                      </Link>
                    </DialogClose>
                  ))}
                </div>
              </div>
            ) : null}

            {filteredPosts.length ? (
              <div>
                <div className={titleStyle}>Posts</div>
                <div className="p-2">
                  {filteredPosts.map((post, i) => (
                    <DialogClose key={i} asChild>
                      <Link href={`/posts/${post.slug}`} className={linkStyle}>
                        <p>{post.meta.title}</p>
                      </Link>
                    </DialogClose>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
