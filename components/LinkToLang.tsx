import { Globe } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function LinkToLang() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  return (
    <Button asChild>
      <Link href={`/${locale}/lang`}>
        <Globe />
        Lang
      </Link>
    </Button>
  );
}
