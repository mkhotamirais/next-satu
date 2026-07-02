import { setRequestLocale } from "next-intl/server";
import AboutTitle from "./AboutTitle";

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <AboutTitle params={params} />
    </div>
  );
}
