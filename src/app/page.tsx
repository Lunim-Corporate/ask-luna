"use client";

import { useState } from "react";
import Image from "next/image";
import { LunaPortal } from "@/components/Luna";
import lunaPortrait from "@/assets/luna.png";
import homeContent from "@/content/home.json";

export default function Home() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const { hero, preview, stats, whySection, flowSection, closingSection } =
    homeContent;

  const openLuna = () => setIsPortalOpen(true);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(92,225,230,0.12),_transparent_55%)]"
      />
      <main className="relative z-10 flex flex-col gap-24 px-5 py-16 sm:px-10 lg:px-16 xl:px-20">
        <header className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[minmax(0,_1fr)_360px] xl:grid-cols-[minmax(0,_1fr)_420px]">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-cyan-200/90">
              {hero.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 px-3 py-1 uppercase tracking-[0.2em] text-[0.65rem] text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
              {hero.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openLuna}
                className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-cyan-300 via-white to-emerald-300 px-8 py-4 text-lg font-semibold text-black shadow-[0_15px_45px_rgba(15,129,144,0.35)] transition hover:scale-105 hover:shadow-[0_20px_60px_rgba(15,129,144,0.45)] focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200"
              >
                <span className="inline-flex h-3 w-3 rounded-full bg-emerald-600 transition group-hover:bg-black" />
                {hero.primaryCtaLabel}
                <span
                  aria-hidden="true"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/10 text-base transition group-hover:bg-black/20"
                >
                  ↗
                </span>
              </button>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-white/70">
                <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                {hero.statusBadge}
              </div>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-[1.75rem] border border-white/15 bg-gradient-to-b from-white/5 via-white/[0.03] to-black/40 p-6 backdrop-blur">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
              {preview.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-6 text-sm leading-relaxed text-white/70">
              &ldquo;{preview.quote}&rdquo;
            </div>
            <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <Image
                src={lunaPortrait}
                alt="Illustration of Luna"
                priority
                className="w-32 md:w-40"
              />
              <p className="text-sm text-white/70">{preview.supportingText}</p>
            </div>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 sm:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">
              {whySection.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              {whySection.heading}
            </h2>
            <p className="mt-4 text-white/70">{whySection.body}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {whySection.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-black/40 p-6"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
                  {feature.tag}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-white/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[360px_minmax(0,_1fr)] lg:items-start">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-cyan-500/10 via-black/30 to-black/60 p-8">
            <p className="text-sm uppercase tracking-[0.5em] text-white/60">
              {flowSection.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold">{flowSection.heading}</h2>
            <p className="mt-4 text-white/70">{flowSection.body}</p>
            <button
              type="button"
              onClick={openLuna}
              className="mt-8 inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-white via-cyan-200 to-white px-7 py-4 text-base font-semibold text-black shadow-[0_10px_30px_rgba(255,255,255,0.25)] transition hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/80"
            >
              {flowSection.ctaLabel}
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-10">
            <ol className="space-y-6">
              {flowSection.steps.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-black/60 text-lg font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 rounded-[2.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] via-black/20 to-black/70 p-8 text-center sm:p-12">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">
            {closingSection.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            {closingSection.heading}
          </h2>
          <p className="max-w-2xl text-white/70">{closingSection.body}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={openLuna}
              className="inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-200 to-white px-9 py-4 text-lg font-semibold text-black shadow-[0_15px_40px_rgba(28,200,180,0.45)] transition hover:scale-105 hover:shadow-[0_20px_50px_rgba(28,200,180,0.6)] focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100"
            >
              {closingSection.ctaLabel}
              <span aria-hidden="true">↗</span>
            </button>
            <span className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-white/70">
              {closingSection.badge}
            </span>
          </div>
        </section>
      </main>

      <LunaPortal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </div>
  );
}
