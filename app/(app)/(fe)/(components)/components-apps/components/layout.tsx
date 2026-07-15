import SplitScreenWrapper from "@/components/layouts/SplitScreenWrapper";
import { asideMenuComponents } from "@/lib/content/components-apps/menu";
import React from "react";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <SplitScreenWrapper menu={asideMenuComponents}>{children}</SplitScreenWrapper>;
}
