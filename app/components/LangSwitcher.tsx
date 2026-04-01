"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/app/i18n/locales";

const labels: Record<Locale, string> = {
  en: "EN",
  ua: "UA",
};

export default function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  // Replace the leading locale segment with the new one
  const switchTo = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-0.5 dark:border-zinc-700">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={switchTo(locale)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            current === locale
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          {labels[locale]}
        </Link>
      ))}
    </div>
  );
}
