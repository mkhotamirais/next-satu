import Footer from "@/components/layouts/Footer";
import SplitScreenWrapper from "@/components/layouts/SplitScreenWrapper";
import { asideMenu } from "@/lib/content/components/menu";
import Header from "@/projects/components/layouts/Header";
import React from "react";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1 container">
        <SplitScreenWrapper menu={asideMenu}>{children}</SplitScreenWrapper>
      </div>
      <Footer />
    </>
  );
}
