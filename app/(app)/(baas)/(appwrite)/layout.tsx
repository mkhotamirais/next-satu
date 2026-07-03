import Footer from "@/components/layouts/Footer";
import Header from "@/projects/appwrite/layout/Header";
import UserAppwriteProvider from "@/projects/appwrite/provider/UserAppwriteProvider";
import React from "react";

export default function AppwriteLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserAppwriteProvider>
      <Header />
      <div className="flex-1 container">{children}</div>
      <Footer />
    </UserAppwriteProvider>
  );
}
