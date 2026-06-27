import Footer from "@/components/layouts/Footer";
import { routing } from "@/i18n/routing";
import Header from "@/projects/lang/layouts/Header";
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
    <>
      <NextIntlClientProvider>
        <Header />
        <div className="flex-1 container text-center">{children}</div>
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}
