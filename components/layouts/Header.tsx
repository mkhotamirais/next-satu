import Logo from "@/components/Logo";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import { ThemeToggle } from "./ThemeToggle";
import { Suspense } from "react";
import { getAllPosts } from "@/actions/portfolio-1/post";
import Search from "../Search";
import NextBtn from "../NextBtn";
import { cookies } from "next/headers";

export default async function Header() {
  const posts = getAllPosts();
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  // return <Link href={`/${locale}/lang`}>LinkToLang</Link>;

  return (
    <header className={`h-16 sticky backdrop-blur-sm top-0 z-50 bg-white/80 dark:bg-black/80`}>
      <div className="container-sm flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <NavDesktop />
          <NextBtn locale={locale} />
          <Suspense fallback={null}>
            <Search posts={posts} />
          </Suspense>

          {/* <Search /> */}
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>
          <NavMobile />
        </div>
      </div>
    </header>
  );
}
