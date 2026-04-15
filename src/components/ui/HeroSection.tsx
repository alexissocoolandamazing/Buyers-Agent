"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, LineChart, MapPinned, ShieldCheck } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";
import type { Suburb } from "@/lib/types";

interface HeroSectionProps {
  highlights: {
    rent: Suburb;
    buy: Suburb;
    invest: Suburb;
  };
}

const heroBadges = [
  "Transparent ranking logic",
  "Brisbane-only focus",
  "Editorial-quality recommendations",
];

const heroStats = [
  {
    label: "Coverage",
    value: "Brisbane metro",
    detail: "Rent, buy, and invest pathways in one calm interface.",
  },
  {
    label: "Decision style",
    value: "High-trust scoring",
    detail: "Every score is explained in plain English, not hidden behind dashboards.",
  },
  {
    label: "Design principle",
    value: "Premium restraint",
    detail: "A cleaner workflow for shortlist-building without the listing-portal noise.",
  },
];

export function HeroSection({ highlights }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const briefItems = [
    {
      label: "Best for rent",
      href: "/rent",
      suburb: highlights.rent.name,
      stat: formatRent(highlights.rent.weeklyRent),
      note: "Weekly benchmark",
    },
    {
      label: "Best for buy",
      href: "/buy",
      suburb: highlights.buy.name,
      stat: formatMoneyShort(highlights.buy.medianPrice),
      note: "Median entry point",
    },
    {
      label: "Best for invest",
      href: "/invest",
      suburb: highlights.invest.name,
      stat: formatPercent(highlights.invest.grossYield),
      note: "Gross yield",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-[#08111d] text-white"
      style={{ marginTop: "calc(var(--nav-height) * -1)" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_top_left,rgba(92,126,170,0.28),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(174,140,87,0.16),transparent_24%)]" />
      <div className="absolute inset-0 bg-hero-grid bg-[length:88px_88px] opacity-35" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(8,17,29,0.88))]" />

      <div
        className="site-shell relative pb-16 sm:pb-20 lg:pb-24"
        style={{ paddingTop: "calc(var(--nav-height) + clamp(3rem, 5.6vw, 5.5rem))" }}
      >
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(380px,0.92fr)] xl:gap-20">
          <motion.div
            className="space-y-10 pt-3 lg:pt-5"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap gap-2.5">
              {heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/66"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="max-w-3xl space-y-7">
              <p className="eyebrow eyebrow-inverse">Brisbane property discovery platform</p>
              <h1 className="max-w-[10.5ch] text-[clamp(3.05rem,6.4vw,5.9rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-white">
                Brisbane suburb intelligence,{" "}
                <span className="display-title text-[#f2ebdf]">refined for real decisions.</span>
              </h1>
              <p className="max-w-[38rem] text-[1.02rem] leading-8 text-white/72 sm:text-[1.1rem]">
                SuburbIQ helps renters, buyers, and investors compare Brisbane suburbs through a premium editorial
                lens: measured, data-backed, and built to surface trade-offs clearly from the first screen.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/rent" variant="primary" tone="inverse" size="lg" className="gap-2 rounded-full">
                Explore rankings
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton href="/methodology" variant="secondary" tone="inverse" size="lg" className="rounded-full">
                See the methodology
              </CTAButton>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
              {heroStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="surface-panel-dark p-5"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/44">
                    {item.label}
                  </p>
                  <p className="mt-4 text-lg font-semibold tracking-tight text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-7 text-white/58">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="surface-panel-dark relative overflow-hidden p-6 sm:p-8 lg:p-10"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.74, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]" />

            <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-6">
              <div className="space-y-3">
                <p className="eyebrow eyebrow-inverse">This week&apos;s shortlist</p>
                <h2 className="max-w-md text-3xl font-semibold tracking-tight text-white sm:text-[2.15rem]">
                  A calm market brief for the three decisions people actually make.
                </h2>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/62">
                Updated weekly
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {briefItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group block rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 transition duration-200 hover:border-white/18 hover:bg-white/[0.06]"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="space-y-2">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/48">
                        {item.label}
                      </p>
                      <h3 className="text-xl font-semibold tracking-tight text-white">{item.suburb}</h3>
                      <p className="text-sm leading-relaxed text-white/56">{item.note}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[#f4e8d4]">
                        {item.stat}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/72 transition group-hover:text-white">
                        Open brief
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                <MapPinned className="h-4 w-4 text-[#d8c39f]" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/44">Coverage</p>
                <p className="mt-2 text-sm leading-7 text-white/66">Region-first filters make broad Brisbane scanning feel clean and deliberate.</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                <LineChart className="h-4 w-4 text-[#d8c39f]" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/44">Ranking</p>
                <p className="mt-2 text-sm leading-7 text-white/66">Weighted intent scores make value, amenity, and demand easy to scan at a glance.</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                <ShieldCheck className="h-4 w-4 text-[#d8c39f]" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/44">Trust</p>
                <p className="mt-2 text-sm leading-7 text-white/66">The methodology stays readable so the product feels more advisory than algorithm theatre.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-3">
              <BadgeCheck className="h-4 w-4 text-[#d8c39f]" />
              <p className="text-sm leading-relaxed text-white/66">
                No account required. Browse suburb rankings, compare signals, and validate the scoring logic at your
                own pace.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
