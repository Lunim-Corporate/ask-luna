"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { LunaPortal } from "@/components/Luna";
import lunaPortrait from "@/assets/luna.png";

const stats = [
  { label: "Avg. time to clarity", value: "≈2½ minutes" },
  { label: "Plans shaped this week", value: "128 projects" },
  { label: "Privacy modes", value: "On-the-record or confidential" },
];

const features = [
  {
    title: "Voice-first guidance",
    description:
      "Speak freely and Luna will listen, clarify, and respond with natural voice or text—whichever feels right for you.",
    tag: "Conversational AI",
  },
  {
    title: "Personalized plans",
    description:
      "In a few minutes, Luna synthesizes your goals into a sequence of concrete next steps the Lunim team can act on immediately.",
    tag: "Strategy",
  },
  {
    title: "Built-in privacy",
    description:
      "Choose an on-the-record session or switch to confidential mode so nothing is saved—perfect for early, sensitive projects.",
    tag: "Trust",
  },
];

const flow = [
  {
    title: "Share where you are",
    detail: "Describe your idea, product state, or challenge in your own words.",
  },
  {
    title: "Luna clarifies",
    detail: "Expect two thoughtful follow-up questions so we can scope work precisely.",
  },
  {
    title: "Review the plan",
    detail: "Luna presents a prioritized, multi-step plan plus a nudge toward a Lunim consult.",
  },
  {
    title: "Take action",
    detail: "Download the branded PDF, replay the summary, or open a call with the team.",
  },
];

export default function Home() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const heroHighlights = useMemo(
    () => ["Voice + text", "PDF handoff", "Studio-grade insights"],
    []
  );

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
              {heroHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 px-3 py-1 uppercase tracking-[0.2em] text-[0.65rem] text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ask Luna. Discover the smartest next step for your build.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
              Luna is Lunim Studio&apos;s AI guide. Share your goals, talk through
              constraints, and within minutes you&apos;ll get a human-ready plan—voice,
              text, PDF, and a warm invitation to the team when you&apos;re ready.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openLuna}
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:border-cyan-300/70 hover:bg-cyan-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 group-hover:bg-white transition" />
                Ask Luna
              </button>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-white/70">
                <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                Live • typically replies in seconds
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
              <span>Live preview</span>
              <span>Secure</span>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-6 text-sm leading-relaxed text-white/70">
              “Hi! I’m Luna, your guide at Lunim Studio. Tell me about your
              project and I’ll help you find the perfect next steps.”
            </div>
            <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <Image
                src={lunaPortrait}
                alt="Illustration of Luna"
                priority
                className="w-32 md:w-40"
              />
              <p className="text-sm text-white/70">
                Voice-first, privacy-aware, and always ready to hand off to the
                Lunim team.
              </p>
            </div>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 sm:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">
              Why teams ask Luna
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Every conversation ends with a confident plan
            </h2>
            <p className="mt-4 text-white/70">
              Instead of waiting for a scoping call, Luna helps product and
              marketing leads reach clarity faster. Switch between voice and
              text at any point, save your plan, or keep it totally confidential.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
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
              Flow
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              Start the conversation whenever inspiration hits.
            </h2>
            <p className="mt-4 text-white/70">
              Luna keeps track of every message, surfaces clarifying questions,
              and nudges you to a human teammate when a deeper dive makes sense.
            </p>
            <button
              type="button"
              onClick={openLuna}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white text-black px-5 py-3 text-sm font-semibold transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Ask Luna now
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-10">
            <ol className="space-y-6">
              {flow.map((step, index) => (
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
            Ready when you are
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Spin up your plan with a single tap
          </h2>
          <p className="max-w-2xl text-white/70">
            Whether you&apos;re refining an existing roadmap or exploring a
            fresh build, Luna captures your thinking, recommends next actions,
            and preps everything for a seamless handoff to Lunim.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={openLuna}
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white px-8 py-3 text-base font-semibold text-black transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Ask Luna
              <span aria-hidden="true">↗</span>
            </button>
            <span className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-white/70">
              No waitlist • instantly available
            </span>
          </div>
        </section>
      </main>

      <LunaPortal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </div>
  );
}
