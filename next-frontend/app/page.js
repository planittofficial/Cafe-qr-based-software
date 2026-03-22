"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AppShell } from "../components/AppShell";
import { ShowcaseMenu } from "../components/coffee-culture/ShowcaseMenu";
import { useMounted } from "../lib/useMounted";
import {
  Bean,
  Flame,
  Leaf,
  MapPin,
  QrCode,
  Sparkles,
  Wind,
} from "lucide-react";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudBase = cloudName
  ? `https://res.cloudinary.com/${cloudName}/image/upload`
  : "https://res.cloudinary.com/demo/image/upload";

const buildImage = (publicId, transforms = "f_auto,q_auto") =>
  `${cloudBase}/${transforms}/${publicId}`;

const brewTabs = [
  {
    id: "espresso",
    label: "Espresso",
    icon: Flame,
    text: "High pressure, 25–30s, caramelized sugars and a velvet crema — the heart of our bar.",
  },
  {
    id: "filter",
    label: "Slow bar",
    icon: Wind,
    text: "Pour-over and immersion brews that highlight origin: florals, citrus, and tea-like clarity.",
  },
  {
    id: "cold",
    label: "Cold",
    icon: Leaf,
    text: "Extended steeping for chocolate tones and a silky body — perfect for warm afternoons.",
  },
];

const moments = [
  { title: "Morning light", copy: "First cups pulled while the city wakes — aroma over the bar." },
  { title: "Shared tables", copy: "Laptops, dates, and regulars. Coffee as the excuse to stay a little longer." },
  { title: "Evening wind-down", copy: "Decaf and small bites — same craft, softer landing." },
];

export default function Home() {
  const [brew, setBrew] = useState("espresso");
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const motionOn = mounted && !reducedMotion;

  return (
    <AppShell fullBleed className="coffee-culture-root relative overflow-hidden bg-[#faf7f2]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-stone-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-stone-200/60 bg-[#faf7f2]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-lg font-bold text-amber-100 shadow-lg">
              CC
            </span>
            <div>
              <div className="font-display text-lg font-bold tracking-tight text-stone-900">Coffee Culture</div>
              <div className="text-[11px] font-medium uppercase tracking-widest text-amber-800/80">Roast · Brew · Gather</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-stone-700 md:flex">
            <a href="#story" className="transition hover:text-amber-800">
              Story
            </a>
            <a href="#craft" className="transition hover:text-amber-800">
              Craft
            </a>
            <a href="#menu" className="transition hover:text-amber-800">
              Menu
            </a>
            <a href="#visit" className="transition hover:text-amber-800">
              Visit
            </a>
            <a
              href="/login"
              className="rounded-full bg-stone-900 px-5 py-2 text-white shadow-md transition hover:bg-stone-800"
            >
              Team login
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(180,83,9,0.18),transparent)]" />
          <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-amber-400/25 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <motion.div
                initial={motionOn ? { opacity: 0, y: 24 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-900 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  Not for ordering — experience first
                </div>
                <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                  Where every cup
                  <span className="block bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 bg-clip-text text-transparent">
                    tells a story
                  </span>
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-600">
                  We&apos;re a coffee-first house: sourcing, roasting, and brewing with intention. Explore our menu online —{" "}
                  <strong className="text-stone-800">orders only happen in-café</strong> when you scan the QR at your table.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#menu"
                    className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-3.5 text-sm font-bold text-amber-50 shadow-xl shadow-stone-900/15 transition hover:-translate-y-0.5"
                  >
                    Browse menu
                  </a>
                  <a
                    href="#visit"
                    className="inline-flex items-center justify-center rounded-full border-2 border-stone-300 bg-white px-8 py-3.5 text-sm font-bold text-stone-800 transition hover:border-stone-400"
                  >
                    Find us
                  </a>
                </div>
                <div className="mt-10 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 text-sm text-amber-950">
                  <QrCode className="mt-0.5 h-6 w-6 shrink-0" aria-hidden />
                  <div>
                    <div className="font-bold">Ordering at the café</div>
                    <p className="mt-1 text-amber-950/90">
                      Take a seat, scan the code on your table, and your order goes straight to the bar — not from this website.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              initial={motionOn ? { opacity: 0, scale: 0.96 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <div className="coffee-steam-ring relative overflow-hidden rounded-[2rem] border border-stone-200/80 bg-stone-900 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={buildImage("samples/food/coffee", "f_auto,q_auto,c_fill,w_900,h_1100")}
                    alt="Barista pouring latte art"
                    fill
                    className="object-cover opacity-95"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-200/90">
                    <Bean className="h-4 w-4" />
                    Live menu sync
                  </div>
                  <p className="mt-2 text-sm text-white/90">
                    The section below pulls from your café when configured — read-only for guests browsing from home.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="story" className="scroll-mt-24 border-y border-stone-200/60 bg-white/50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Third place, first sip</h2>
              <p className="mt-4 text-stone-600">
                Coffee Culture is built around slow moments: the hiss of steam, the weight of a ceramic cup, conversations that
                run longer than the drink. We treat the menu as a living board — seasonal, honest, never rushed.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {moments.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={motionOn ? { opacity: 0, y: 16 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-stone-200 bg-[#faf7f2] p-6 shadow-sm"
                >
                  <h3 className="font-display text-xl font-bold text-stone-900">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{m.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="craft" className="scroll-mt-24 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Pick your brew lane</h2>
                <p className="mt-2 max-w-xl text-stone-600">Tap a style — how we think about each cup on the bar.</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {brewTabs.map((t) => {
                const Icon = t.icon;
                const active = brew === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setBrew(t.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                      active
                        ? "bg-stone-900 text-amber-50 shadow-lg"
                        : "bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {t.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 rounded-3xl border border-stone-200 bg-gradient-to-br from-white to-amber-50/50 p-8 shadow-inner">
              {brewTabs.map((t) =>
                brew === t.id ? (
                  <motion.p
                    key={t.id}
                    initial={motionOn ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    className="text-lg leading-relaxed text-stone-700"
                  >
                    {t.text}
                  </motion.p>
                ) : null
              )}
            </div>
          </div>
        </section>

        <ShowcaseMenu />

        <section id="visit" className="scroll-mt-24 border-t border-stone-200/60 bg-stone-900 py-20 text-amber-50">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-bold sm:text-4xl">Visit the café</h2>
                <p className="mt-4 text-amber-100/85">
                  This site is your window into our coffee — not a checkout. When you walk in, grab a table, scan, and we&apos;ll
                  make it fresh. Same menu you previewed here, tied to your seat.
                </p>
                <ul className="mt-8 space-y-4 text-sm">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                    <span>Address & hours are set in your venue profile — ask the barista for today&apos;s single-origin.</span>
                  </li>
                  <li className="flex gap-3">
                    <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                    <span>QR ordering keeps the kitchen in sync — no phone orders from this page.</span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={buildImage("samples/food/coffee", "f_auto,q_auto,c_fill,w_1200,h_675")}
                  alt="Café atmosphere"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-stone-200 bg-[#faf7f2] py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-center text-sm text-stone-600 md:flex-row md:text-left">
            <div className="flex items-center gap-2 text-stone-800">
              <span className="font-display text-lg font-bold">Coffee Culture</span>
              <span className="text-stone-400">·</span>
              <span>Powered by QRDine</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 font-medium">
              <a href="#menu" className="hover:text-amber-800">
                Menu
              </a>
              <a href="/login" className="hover:text-amber-800">
                Staff
              </a>
            </div>
          </div>
        </footer>
      </main>
    </AppShell>
  );
}
