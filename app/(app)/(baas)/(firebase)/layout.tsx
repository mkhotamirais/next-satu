import Footer from "@/components/layouts/Footer";
import Header from "@/projects/firebase/layouts/Header";
import React from "react";

export default function FirebaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1 container">{children}</div>
      <Footer />
    </>
  );
}
