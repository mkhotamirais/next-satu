import Headers from "@/components/layouts/Headers";
import { youtubeMenu } from "@/lib/content/main/menu";
import React from "react";

export default function YoutubeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Headers menu={youtubeMenu} />
      <div className="container flex-1">{children}</div>
    </>
  );
}
