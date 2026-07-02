"use client";

import { useTranslations } from "next-intl";
import React, { use } from "react";

export default function AboutTitle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations("menu");

  return (
    <>
      <h1>{t("AboutPage.title")}</h1>
      <p>this is locale: {locale}</p>
    </>
  );
}
