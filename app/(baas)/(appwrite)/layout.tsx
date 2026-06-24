import Footer from "@/components/layouts/Footer";
import Header from "@/projects/appwrite/layout/Header";
import React from "react";

export default function AppwriteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
