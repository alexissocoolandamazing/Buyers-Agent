"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { LandingQuiz } from "@/components/ui/LandingQuiz";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";
import type { RankedSuburb } from "@/lib/types";

interface HeroSectionProps {
  highlights: {
    rent: RankedSuburb;
    buy: RankedSuburb;
    invest: RankedSuburb;
  };
}

export function HeroSection({ highlights }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const briefItems = [
    {
      label: "Rent",
      href: "/rent",
      suburb: highlights.rent.suburb.name,
      stat: formatRent(highlights.rent.suburb.medianRentEstimate),
      note: "Weekly seed estimate",
    },
    {
      label: "Buy",
      href: "/buy",
      suburb: highlights.buy.suburb.name,
      stat: formatMoneyShort(highlights.buy.suburb.medianBuyPriceEstimate),
      note: "Buy seed estimate",
    },
    {
      label: "Invest",
      href: "/invest",
      suburb: highlights.invest.suburb.name,
      stat: formatPercent(highlights.invest.suburb.estimatedYield),
      note: "Yield seed estimate",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-[#08111d] text-white"
      style={{ marginTop: "calc(var(--nav-height) * -1)" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_top_left,rgba(92,126,170,0.24),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(187,154,103,0.14),transparent_24%)]" />
      <div className="absolute inset-0 bg-hero-grid bg-[length:88px_88px] opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(8,17,29,0.9))]" />

      <div
        className="site-shell relative pb-16 sm:pb-20 lg:pb-24"
        style={{ paddingTop: "calc(var(--nav-height) + clamp(3.2rem, 5vw, 5rem))" }}
      >
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.88fr)] xl:gap-16">
          <motion.div
            className="space-y-8 pt-2 lg:pt-4"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-3xl space-y-5">
              <p className="eyebrow eyebrow-inverse inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                Brisbane suburb discovery
              </p>
              <h1 className="max-w-[10.5ch] text-[clamp(3rem,6vw,5.65rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-white">
                Find your corner of Brisbane.
              </h1>
              <p className="max-w-[34rem] text-[1rem] leading-7 text-white/74 sm:text-[1.08rem]">
                Answer a few questions and Nook will suggest Brisbane suburbs that match your budget, lifestyle, and
                goals.
              </p>
              <p className="max-w-[32rem] text-sm leading-6 text-white/55">
                Instead of scrolling through endless listings, start with the suburb that makes sense.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#quiz" variant="primary" tone="inverse" size="lg" className="gap-2 rounded-full">
                Start quiz
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton href="/methodology" variant="secondary" tone="inverse" size="lg" className="rounded-full">
                Data methodology
              </CTAButton>
            </div>

            <div className="hidden gap-3 lg:grid lg:grid-cols-3">
              {briefItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 transition duration-200 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/46">{item.label}</p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-white">{item.suburb}</h3>
                  <p className="mt-2 font-[var(--font-display)] text-xl font-semibold tracking-tight text-[#f4e8d4]">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-xs text-white/46">{item.note}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <LandingQuiz />
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-3 lg:hidden">
            {briefItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 transition duration-200 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/46">{item.label}</p>
                <h3 className="mt-2 text-base font-semibold tracking-tight text-white">{item.suburb}</h3>
                <p className="mt-2 font-[var(--font-display)] text-xl font-semibold tracking-tight text-[#f4e8d4]">
                  {item.stat}
                </p>
                <p className="mt-1 text-xs text-white/46">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
