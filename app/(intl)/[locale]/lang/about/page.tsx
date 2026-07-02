"use client";

import { useTranslations } from "next-intl";
import React, { use } from "react";

export default function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  // setRequestLocale(locale); // tidak dibutuhkan

  const t = useTranslations("menu");

  return (
    <div>
      <h1>{t("AboutPage.title")}</h1>
      <p>{locale}</p>
    </div>
  );
}
