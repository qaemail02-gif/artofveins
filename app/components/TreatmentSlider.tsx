"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import treatments from "@/app/data/treatments.json";
import type { Locale, ui } from "@/app/i18n/locales";

type SliderStrings = typeof ui["en"]["slider"];

interface Props {
  locale: Locale;
  t: SliderStrings;
}

const subscribe = () => () => {};

export default function TreatmentSlider({ locale, t }: Props) {
  const [current, setCurrent] = useState(0);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const prev = () =>
    setCurrent((c) => (c - 1 + treatments.length) % treatments.length);
  const next = () => setCurrent((c) => (c + 1) % treatments.length);

  const treatment = treatments[current];
  const localeData = treatment[locale] as typeof treatment["en"];
  const videoUrl = `https://www.youtube.com/watch?v=${treatment.videoId}`;

  return (
    <div className="w-full">
      {/* Slide card */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Progress bar */}
        <div className="flex h-1 w-full bg-zinc-100 dark:bg-zinc-800">
          {treatments.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-full flex-1 transition-colors duration-300 first:rounded-l-full last:rounded-r-full ${
                mounted && i === current
                  ? "bg-red-600"
                  : "hover:bg-zinc-300 dark:hover:bg-zinc-600"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Hero image */}
        <div className="relative h-56 w-full overflow-hidden bg-zinc-100 sm:h-72 dark:bg-zinc-800">
          <Image
            src={treatment.image}
            alt={localeData.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, 896px"
            priority={current === 0}
          />
          {/* Soft bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Tag chip overlaid on image */}
          <div className="absolute bottom-4 left-6">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-700 backdrop-blur-sm">
              {localeData.tag}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-8 sm:p-10">
          {/* Icon */}
          <span className="text-3xl">{treatment.icon}</span>

          {/* Title */}
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {localeData.title}
          </h2>

          {/* Description */}
          <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {localeData.description}
          </p>

          {/* Stats + watch button */}
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                  {t.procedureTime}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {localeData.duration}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                  {t.recovery}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {localeData.recovery}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                  {t.treatment}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {current + 1} / {treatments.length}
                </p>
              </div>
            </div>

            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.4 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM10 15V9l6 3-6 3z" />
              </svg>
              {t.watchOnYoutube}
            </a>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-0.5 dark:border-zinc-700">
          <button
            onClick={prev}
            className="rounded-full px-3 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t.prev}
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {treatments.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                mounted && i === current
                  ? "w-6 bg-red-600"
                  : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-500"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-0.5 dark:border-zinc-700">
          <button
            onClick={next}
            className="rounded-full px-3 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t.next}
          </button>
        </div>
      </div>
    </div>
  );
}
