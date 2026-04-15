"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bus, Check, ChevronRight, School, ShoppingCart, Trees } from "lucide-react";
import { useState } from "react";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";
import { getScoreRows } from "@/lib/mockData";
import type { Intent, Suburb } from "@/lib/types";
import { RankIndicator } from "@/components/ui/RankIndicator";
import { ScoreRow } from "@/components/ui/ScoreRow";
import { SummaryParagraph } from "@/components/ui/SummaryParagraph";
import { TagBadge, type TagBadgeTone } from "@/components/ui/TagBadge";
import { cn } from "@/lib/utils";

interface SuburbCardProps {
  suburb: Suburb;
  mode: Intent | "editorial";
  rank?: number;
  editorialLabel?: string;
  editorialHref?: string;
  standoutLabel?: string;
  standoutValue?: string;
  compareSelected?: boolean;
  onCompareToggle?: (id: string) => void;
}

const localFactorIcons = [
  { key: "schools", icon: School },
  { key: "shopping", icon: ShoppingCart },
  { key: "transport", icon: Bus },
  { key: "parkAccess", icon: Trees },
] as const;

const investToneMap: Record<string, TagBadgeTone> = {
  "Best yield": "green",
  "Balanced entry": "blue",
  "Long-term demand": "purple",
  "Higher risk / upside": "amber",
};

export function SuburbCard({
  suburb,
  mode,
  rank,
  editorialLabel,
  editorialHref,
  standoutLabel,
  standoutValue,
  compareSelected = false,
  onCompareToggle,
}: SuburbCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const scoreRows = mode === "editorial" ? [] : getScoreRows(suburb, mode);
  const investTone = suburb.tags.invest ? investToneMap[suburb.tags.invest] ?? "neutral" : undefined;

  if (mode === "editorial") {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="surface-panel-soft flex h-full flex-col p-6 sm:p-7"
      >
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2.5">
            {editorialLabel ? <TagBadge label={editorialLabel} tone="rent" /> : null}
            <TagBadge label={suburb.region} tone="region" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-[1.55rem] font-semibold tracking-tight text-brand-navy">{suburb.name}</h3>
              <p className="text-[0.98rem] leading-8 text-neutral-700">{suburb.shortDescription}</p>
            </div>

            {standoutLabel && standoutValue ? (
              <div className="rounded-[1.2rem] border border-[rgba(17,32,51,0.08)] bg-white/78 p-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                  {standoutLabel}
                </p>
                <p className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-tight text-brand-navy">
                  {standoutValue}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <Link
            href={editorialHref ?? "/"}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-brand-blue transition hover:text-brand-navy"
          >
            Explore this pathway
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.article>
    );
  }

  const statItems = [
    { label: "Weekly rent", value: formatRent(suburb.weeklyRent) },
    { label: "Median price", value: formatMoneyShort(suburb.medianPrice) },
    { label: "Gross yield", value: formatPercent(suburb.grossYield) },
  ];

  return (
    <motion.article
      id={suburb.id}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="surface-panel-soft overflow-hidden p-6 sm:p-7"
    >
      <div className="space-y-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            {rank ? <RankIndicator rank={rank} /> : null}

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2.5">
                  <TagBadge label={suburb.region} tone="region" />
                  {mode === "rent" && suburb.tags.rent ? <TagBadge label={suburb.tags.rent} tone="rent" /> : null}
                  {mode === "buy" && suburb.tags.buy ? <TagBadge label={suburb.tags.buy} tone="blue" /> : null}
                </div>
                <h3 className="text-[1.7rem] font-semibold tracking-tight text-brand-navy">{suburb.name}</h3>
                <p className="max-w-3xl text-[0.98rem] leading-8 text-neutral-700">{suburb.shortDescription}</p>
              </div>
            </div>
          </div>

          {mode === "invest" && suburb.tags.invest && investTone ? (
            <TagBadge label={suburb.tags.invest} tone={investTone} className="self-start" />
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {statItems.map((item) => (
            <div key={item.label} className="rounded-[1.2rem] border border-[rgba(17,32,51,0.08)] bg-white/80 p-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">{item.label}</p>
              <p className="mt-3 font-[var(--font-display)] text-[1.45rem] font-semibold tracking-tight text-brand-navy">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {scoreRows.map((scoreRow) => (
            <ScoreRow key={scoreRow.label} label={scoreRow.label} score={scoreRow.score} reason={scoreRow.reason} />
          ))}
        </div>

        {mode === "buy" ? (
          <div className="grid gap-4 rounded-[1.5rem] border border-[rgba(17,32,51,0.08)] bg-white/74 p-5 lg:grid-cols-[1.05fr_minmax(0,1.4fr)]">
            <div className="grid gap-3 sm:grid-cols-2">
              {localFactorIcons.map((item) => {
                const Icon = item.icon;
                const label = suburb.localFactors[item.key];

                return (
                  <div key={item.key} className="flex items-center gap-3 rounded-[1.1rem] bg-[rgba(29,95,168,0.05)] px-4 py-3">
                    <Icon className="h-4 w-4 shrink-0 text-brand-navy" />
                    <span className="text-sm leading-6 text-neutral-700">{label}</span>
                  </div>
                );
              })}
            </div>
            <SummaryParagraph>{suburb.verdict}</SummaryParagraph>
          </div>
        ) : null}

        {isExpanded ? (
          <div className="rounded-[1.5rem] border border-[rgba(17,32,51,0.08)] bg-white/72 p-5">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
              <div className="space-y-4">
                <p className="text-[0.98rem] leading-8 text-neutral-700">{suburb.shortDescription}</p>
                {mode !== "buy" ? <SummaryParagraph>{suburb.verdict}</SummaryParagraph> : null}
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {localFactorIcons.map((item) => {
                  const Icon = item.icon;
                  const label = suburb.localFactors[item.key];

                  return (
                    <div
                      key={item.key}
                      className="flex items-center gap-3 rounded-[1.2rem] border border-[rgba(17,32,51,0.08)] bg-white/86 px-4 py-3.5"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-brand-navy" />
                      <span className="text-sm leading-6 text-neutral-700">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "flex flex-col gap-4 border-t border-[rgba(17,32,51,0.08)] pt-6 sm:flex-row sm:items-center sm:justify-between",
            mode !== "rent" && "sm:justify-end"
          )}
        >
          {mode === "rent" ? (
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full border border-[rgba(17,32,51,0.1)] bg-white/82 px-4 py-2.5 text-sm font-semibold tracking-tight text-neutral-700 transition hover:border-brand-blue/20 hover:text-brand-blue"
              onClick={() => onCompareToggle?.(suburb.id)}
            >
              <span
                className={cn(
                  "inline-flex h-5 w-5 items-center justify-center rounded-full border transition",
                  compareSelected
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-[rgba(17,32,51,0.12)] bg-white text-transparent"
                )}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              {compareSelected ? "Added to compare" : "Add to compare"}
            </button>
          ) : null}

          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-brand-blue transition hover:text-brand-navy"
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? "Hide detailed profile" : "View detailed profile"}
            <ChevronRight className={cn("h-4 w-4 transition", isExpanded && "rotate-90")} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
