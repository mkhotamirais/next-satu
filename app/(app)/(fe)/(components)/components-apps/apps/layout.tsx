import SplitScreenWrapper from "@/components/layouts/SplitScreenWrapper";
import { asideMenuApps } from "@/lib/content/components-apps/menu";
import React from "react";

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return <SplitScreenWrapper menu={asideMenuApps}>{children}</SplitScreenWrapper>;
}
