import Breadcrumb from "@/components/ui/custom/Breadcrumb";
import DashboardDesktop from "@/projects/appwrite/layout/DashboardDesktop";
import DashboardMobile from "@/projects/appwrite/layout/DashboardMobile";
import DashboardTitle from "@/projects/appwrite/layout/DashboardTitle";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 my-4 items-start">
      <div className="hidden md:block w-80 sticky top-16">
        <DashboardDesktop />
      </div>
      <div className="w-full h-full">
        <div className="flex items-center gap-2 mb-4">
          <DashboardMobile />
          <DashboardTitle />
        </div>
        <Breadcrumb />
        <div className="my-4">{children}</div>
      </div>
    </div>
  );
}
