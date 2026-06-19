import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,

    // -- Dipakai jika file json tunggal, misal en.json, id.json
    // messages: (await import(`../messages/${locale}.json`)).default,

    // -- Dipakai jika file json di dalam folder, misal en/menu.json, id/menu.json
    messages: {
      menu: (await import(`../messages/${locale}/menu.json`)).default,
      halo: (await import(`../messages/${locale}/halo/pesan.json`)).default,
    },
  };
});
