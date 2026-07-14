import SplitScreenWrapper from "@/components/layouts/SplitScreenWrapper";
import { dashboardMenu } from "@/lib/content/appwrite/menu";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <SplitScreenWrapper menu={dashboardMenu}>{children}</SplitScreenWrapper>;
}
