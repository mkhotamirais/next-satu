import Footer from "@/components/layouts/Footer";
import Header from "@/projects/components/layouts/Header";
import React from "react";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1 container">{children}</div>
      <Footer />
    </>
  );
}
