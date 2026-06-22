import Footer from "@/components/layouts/Footer";
import Header from "@/projects/motion/layouts/Header";
import React from "react";

export default function MotionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col bg-background w-full">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
