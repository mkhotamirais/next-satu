import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mkhotami Portfolio - Web Developer | React, Laravel, WordPress",
  description:
    "Mkhotami is a Web Developer who builds modern websites using React, Laravel, and WordPress. Focused on performance, responsiveness, and user experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`min-h-full flex flex-col bg-background w-full`}>
      {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
      <Header />
      <main className="flex-1 container-sm">{children}</main>
      <Footer />
      {/* </ThemeProvider> */}
    </div>
  );
}
