import { notFound } from "next/navigation";
import { locales, type Locale, ui } from "@/app/i18n/locales";
import contactsData from "@/app/data/contacts.json";

type ContactsStrings = typeof ui["en"]["contacts"];

export default async function Contacts({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const t = ui[locale as Locale];
  const c = t.contacts as ContactsStrings;

  const cards = contactsData.map((item) => ({
    icon: item.icon,
    label: c[item.labelKey as keyof ContactsStrings],
    value: "value" in item ? item.value : null,
    href: "href" in item ? item.href : null,
  }));

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-12 sm:py-24">
        {/* Header */}
        <section className="mb-12 flex flex-col gap-4">
          <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {c.badge}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {c.title}
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {c.subtitle}
          </p>
        </section>

        {/* Contact cards */}
        <section className="grid gap-4 sm:grid-cols-3">
          {cards.map(({ icon, label, value, href }) => {
            const inner = (
              <>
                <span className="text-2xl">{icon}</span>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {label}
                </p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {value ?? label}
                </p>
              </>
            );

            return href ? (
              <a
                key={String(label)}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                {inner}
              </a>
            ) : (
              <div
                key={String(label)}
                className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                {inner}
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
