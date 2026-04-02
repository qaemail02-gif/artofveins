import { notFound } from "next/navigation";
import Image from "next/image";
import { locales, type Locale, ui } from "@/app/i18n/locales";
import contactsData from "@/app/data/contacts.json";

type ContactsStrings = typeof ui["en"]["contacts"];

function ViberIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#7360F2"/>
      <path
        d="M22.9 9.1C21.2 7.5 18.9 6.6 16 6.6c-5.4 0-9.4 4-9.4 9.4 0 1.7.4 3.3 1.3 4.7L6.6 25.4l4.8-1.3c1.3.7 2.8 1.1 4.4 1.1h.1c5.4 0 9.4-4 9.4-9.4 0-2.5-1-4.8-2.4-6.7zm-6.9 14.5h-.1c-1.4 0-2.8-.4-4-1l-.3-.2-3 .8.8-2.9-.2-.3c-.8-1.2-1.2-2.7-1.2-4.2 0-4.5 3.5-8 8-8 2.1 0 4.1.8 5.6 2.3 1.5 1.5 2.3 3.4 2.3 5.6-.1 4.5-3.6 7.9-7.9 7.9zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.5-.3z"
        fill="white"
      />
    </svg>
  );
}

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
    qr: "qr" in item ? item.qr : null,
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
          {cards.map(({ icon, label, value, href, qr }) => {
            const inner = (
              <>
                {icon === "viber" ? <ViberIcon /> : <span className="text-2xl">{icon}</span>}
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {label}
                </p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {value ?? label}
                </p>
                {qr && (
                  <Image
                    src={qr}
                    alt={`${String(label)} QR code`}
                    width={160}
                    height={160}
                    className="mt-2 self-center rounded-xl"
                  />
                )}
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
