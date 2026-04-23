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
        className="site-shell relative pb-20 sm:pb-24 lg:pb-28"
        style={{ paddingTop: "calc(var(--nav-height) + clamp(3.5rem, 6vw, 5.5rem))" }}
      >
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.85fr)] xl:gap-20">
          <motion.div
            className="space-y-8 pt-2 lg:pt-4"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-3xl space-y-5">
              <p className="eyebrow eyebrow-inverse">Brisbane property intelligence</p>
              <h1 className="max-w-[10.5ch] text-[clamp(3rem,6vw,5.55rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-white">
                Brisbane suburb intelligence,
                <span className="display-title block text-[#f2ebdf]">kept calm and clear.</span>
              </h1>
              <p className="max-w-[30rem] text-[1rem] leading-7 text-white/72 sm:text-[1.06rem]">
                Scan Brisbane suburbs for renting, buying, or investing — with clearer logic and less noise.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/rent" variant="primary" tone="inverse" size="lg" className="gap-2 rounded-full">
                Explore rankings
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton href="/methodology" variant="secondary" tone="inverse" size="lg" className="rounded-full">
                Methodology
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

            <div className="border-b border-white/10 pb-5">
              <p className="eyebrow eyebrow-inverse">Quick start</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Top-ranked by pathway
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {briefItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group block rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 transition duration-200 hover:border-white/18 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/46">
                        {item.label}
                      </p>
                      <h3 className="text-lg font-semibold tracking-tight text-white">{item.suburb}</h3>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-[var(--font-display)] text-[1.5rem] font-semibold tracking-tight text-[#f4e8d4]">
                          {item.stat}
                        </p>
                        <p className="text-[0.7rem] text-white/46">{item.note}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:text-white group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
