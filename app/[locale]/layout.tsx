import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, type Locale, ui } from "@/app/i18n/locales";
import LangSwitcher from "@/app/components/LangSwitcher";
import "@/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Art of Veins",
  description: "Modern vein treatment center",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const t = ui[locale as Locale];
  const nav = t.nav as typeof ui["en"]["nav"];

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <nav className="flex items-center gap-3 px-8 py-4 border-b border-blue-100 bg-blue-50 dark:bg-blue-950 dark:border-blue-900">
          <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-0.5 dark:border-zinc-700">
            <Link
              href={`/${locale}`}
              className="rounded-full px-3 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {nav.main}
            </Link>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-0.5 dark:border-zinc-700">
            <Link
              href={`/${locale}/contacts`}
              className="rounded-full px-3 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {nav.contacts}
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <LangSwitcher current={locale as Locale} />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
