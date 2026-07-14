"use client";

import React from "react";
import Breadcrumb from "../ui/custom/Breadcrumb";
import RouteTitle from "./RouteTitle";
import AsideMobile from "./AsideMobile";
import AsideDesktop from "./AsideDesktop";

type Props = {
  children: React.ReactNode;
  withTitle?: boolean;
  withBreadcrumb?: boolean;
  menu: { label: string; url: string }[];
};

export default function SplitScreenWrapper({ children, withTitle = true, withBreadcrumb = true, menu }: Props) {
  return (
    <div className="flex gap-4 my-4 items-start">
      <div className="hidden md:block w-80 sticky top-16">
        <AsideDesktop menu={menu} />
      </div>
      <div className="w-full h-full">
        <div className="flex items-center gap-2 mb-4">
          <AsideMobile menu={menu} />
          {withTitle && <RouteTitle />}
        </div>
        {withBreadcrumb && <Breadcrumb />}
        <div className="my-4">{children}</div>
      </div>
    </div>
  );
}
