"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

const heroBadges = ["Brisbane only", "Transparent scoring"];

export function HeroSection({ highlights }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const briefItems = [
    {
      label: "Rent",
      href: "/rent",
      suburb: highlights.rent.name,
      stat: formatRent(highlights.rent.weeklyRent),
      note: "Weekly benchmark",
    },
    {
      label: "Buy",
      href: "/buy",
      suburb: highlights.buy.name,
      stat: formatMoneyShort(highlights.buy.medianPrice),
      note: "Median price",
    },
    {
      label: "Invest",
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
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_top_left,rgba(92,126,170,0.24),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(174,140,87,0.14),transparent_24%)]" />
      <div className="absolute inset-0 bg-hero-grid bg-[length:88px_88px] opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(8,17,29,0.9))]" />

      <div
        className="site-shell relative pb-16 sm:pb-20 lg:pb-24"
        style={{ paddingTop: "calc(var(--nav-height) + clamp(3rem, 5.4vw, 5rem))" }}
      >
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.85fr)] xl:gap-20">
          <motion.div
            className="space-y-8 pt-2 lg:pt-4"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap gap-2.5">
              {heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/66"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="max-w-3xl space-y-5">
              <p className="eyebrow eyebrow-inverse">Brisbane property intelligence</p>
              <h1 className="max-w-[10.5ch] text-[clamp(3rem,6vw,5.55rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-white">
                Brisbane suburb intelligence,
                <span className="display-title block text-[#f2ebdf]">kept calm and clear.</span>
              </h1>
              <p className="max-w-[34rem] text-[1rem] leading-7 text-white/72 sm:text-[1.06rem]">
                SuburbIQ helps renters, buyers, and investors scan Brisbane with a cleaner shortlist, clearer logic,
                and less portal noise.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/rent" variant="primary" tone="inverse" size="lg" className="gap-2 rounded-full">
                Explore rankings
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton href="/methodology" variant="secondary" tone="inverse" size="lg" className="rounded-full">
                View methodology
              </CTAButton>
            </div>
          </motion.div>

          <motion.div
            className="surface-panel-dark relative overflow-hidden p-5 sm:p-6 lg:p-7"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />

            <div className="flex items-end justify-between gap-5 border-b border-white/10 pb-5">
              <div className="space-y-2">
                <p className="eyebrow eyebrow-inverse">Featured pathways</p>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">
                  Three strong starting points.
                </h2>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/60">
                Demo data
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {briefItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group block rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 transition duration-200 hover:border-white/18 hover:bg-white/[0.06]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/46">
                        {item.label}
                      </p>
                      <h3 className="text-lg font-semibold tracking-tight text-white">{item.suburb}</h3>
                      <p className="text-sm text-white/56">{item.note}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-[var(--font-display)] text-[1.65rem] font-semibold tracking-tight text-[#f4e8d4]">
                        {item.stat}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition group-hover:text-white">
                        Open
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-white/56">
              Every pathway opens in a broad default state, then narrows only when you apply a new brief.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
