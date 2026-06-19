import { routing } from "@/i18n/routing";
import Footer from "@/projects/lang/layouts/Footer";
import Header from "@/projects/lang/layouts/Header";
import SwitchLangBtn from "@/projects/lang/SwitchLangBtn";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <Header />
      <SwitchLangBtn />
      <div className="flex-1">{children}</div>
      <Footer />
    </NextIntlClientProvider>
  );
}
