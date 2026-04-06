import { notFound } from "next/navigation";
import { locales, type Locale, ui } from "@/app/i18n/locales";
import TreatmentSlider from "@/app/components/TreatmentSlider";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const t = ui[locale as Locale];
  const home = t.home as typeof ui["en"]["home"];
  const slider = t.slider as typeof ui["en"]["slider"];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-12 sm:py-26">
        {/* Hero */}
        <section className="mb-16 flex flex-col gap-4">
          <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {home.badge}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {home.title}
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {home.subtitle}
          </p>
        </section>

        {/* Slider section */}
        <section>
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {home.sliderTitle}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {home.sliderSubtitle}
            </p>
          </div>
          <TreatmentSlider locale={locale as Locale} t={slider} />
        </section>
      </main>
    </div>
  );
}
