import { useTranslations } from "next-intl";
import React from "react";

export default function Lang() {
  const m = useTranslations("menu");
  const p = useTranslations("halo");

  return (
    <section>
      <div className="">
        <div>{m("HomePage.title")}</div>
        <div>{p("title")}</div>
      </div>
    </section>
  );
}
