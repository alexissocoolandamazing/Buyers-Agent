"use client";

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
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="flex h-full flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {editorialLabel ? <TagBadge label={editorialLabel} tone="rent" /> : null}
            <TagBadge label={suburb.region} tone="region" />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-brand-navy">{suburb.name}</h3>
            <p className="line-clamp-2 text-base leading-relaxed text-neutral-700">{suburb.shortDescription}</p>
          </div>

          {standoutLabel && standoutValue ? (
            <div className="space-y-2 border-t border-brand-border pt-4">
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-600">{standoutLabel}</p>
              <p className="font-mono text-sm text-brand-navy">{standoutValue}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-auto pt-6">
          <a
            href={editorialHref ?? "/"}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:underline"
          >
            Explore
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      id={suburb.id}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm"
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {rank ? <RankIndicator rank={rank} /> : null}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-brand-navy">{suburb.name}</h3>
              <div className="flex flex-wrap gap-2">
                <TagBadge label={suburb.region} tone="region" />
                {mode === "rent" && suburb.tags.rent ? <TagBadge label={suburb.tags.rent} tone="rent" /> : null}
              </div>
            </div>
          </div>

          {mode === "invest" && suburb.tags.invest && investTone ? (
            <TagBadge label={suburb.tags.invest} tone={investTone} />
          ) : null}
        </div>

        <div className="space-y-4">
          {scoreRows.map((scoreRow) => (
            <ScoreRow key={scoreRow.label} label={scoreRow.label} score={scoreRow.score} reason={scoreRow.reason} />
          ))}
        </div>

        {mode === "buy" ? (
          <div className="space-y-4 border-t border-brand-border pt-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {localFactorIcons.map((item) => {
                const Icon = item.icon;
                const label = suburb.localFactors[item.key];

                return (
                  <div key={item.key} className="flex items-center gap-2 text-sm text-neutral-600">
                    <Icon className="h-4 w-4 shrink-0 text-brand-navy" />
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
            <SummaryParagraph>{suburb.verdict}</SummaryParagraph>
          </div>
        ) : null}

        {isExpanded ? (
          <div className="space-y-4 border-t border-brand-border pt-4">
            <p className="text-base leading-relaxed text-neutral-700">{suburb.shortDescription}</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-brand-mist p-4">
                <p className="text-sm font-medium uppercase tracking-wide text-neutral-600">Weekly rent</p>
                <p className="mt-2 font-mono text-sm text-brand-navy">{formatRent(suburb.weeklyRent)}</p>
              </div>
              <div className="rounded-xl bg-brand-mist p-4">
                <p className="text-sm font-medium uppercase tracking-wide text-neutral-600">Median price</p>
                <p className="mt-2 font-mono text-sm text-brand-navy">{formatMoneyShort(suburb.medianPrice)}</p>
              </div>
              <div className="rounded-xl bg-brand-mist p-4">
                <p className="text-sm font-medium uppercase tracking-wide text-neutral-600">Gross yield</p>
                <p className="mt-2 font-mono text-sm text-brand-navy">{formatPercent(suburb.grossYield)}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "flex flex-col gap-4 border-t border-brand-border pt-4 sm:flex-row sm:items-center sm:justify-between",
            mode !== "rent" && "sm:justify-end"
          )}
        >
          {mode === "rent" ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-brand-blue"
              onClick={() => onCompareToggle?.(suburb.id)}
            >
              <span
                className={cn(
                  "inline-flex h-4 w-4 items-center justify-center rounded-sm border",
                  compareSelected ? "border-brand-blue bg-brand-blue text-white" : "border-brand-border bg-white"
                )}
              >
                {compareSelected ? <Check className="h-3 w-3" /> : null}
              </span>
              {compareSelected ? "Added to compare" : "Add to compare"}
            </button>
          ) : null}

          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:underline"
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? "Hide profile" : "View full profile"}
            <ChevronRight className={cn("h-4 w-4", isExpanded && "rotate-90")} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
