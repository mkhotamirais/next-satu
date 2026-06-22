"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function SwitchLangBtn() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "id" ? "en" : "id";

    // Cukup gunakan pathname secara langsung
    router.replace(pathname, { locale: nextLocale, scroll: false });
  };

  return (
    <Button variant={"ghost"} onClick={toggleLanguage}>
      <span>pathname: {pathname}</span>
      <Globe />
      {locale === "id" ? "EN" : "ID"}
    </Button>
  );
}
