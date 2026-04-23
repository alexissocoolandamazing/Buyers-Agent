"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { RankIndicator } from "@/components/ui/RankIndicator";
import { ScoreRow } from "@/components/ui/ScoreRow";
import { SummaryParagraph } from "@/components/ui/SummaryParagraph";
import { TagBadge, type TagBadgeTone } from "@/components/ui/TagBadge";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";
import { getCompositeScore, getScoreRows } from "@/lib/mockData";
import type { Intent, Suburb } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  suburb: Suburb;
  intent: Intent;
  rank: number;
  compareSelected?: boolean;
  onCompareToggle?: (id: string) => void;
}

interface MetricCard {
  label: string;
  value: string;
}

const investToneMap: Record<string, TagBadgeTone> = {
  "Best yield": "green",
  "Balanced entry": "blue",
  "Long-term demand": "purple",
  "Higher risk / upside": "amber",
};

function getFirstSentence(text: string) {
  const match = text.match(/[^.?!]+[.?!]?/);
  return match?.[0]?.trim() ?? text;
}

function getIntentBadge(suburb: Suburb, intent: Intent) {
  if (intent === "rent" && suburb.tags.rent) {
    return { label: suburb.tags.rent, tone: "rent" as const };
  }

  if (intent === "buy" && suburb.tags.buy) {
    return { label: suburb.tags.buy, tone: "blue" as const };
  }

  if (intent === "invest" && suburb.tags.invest) {
    return {
      label: suburb.tags.invest,
      tone: investToneMap[suburb.tags.invest] ?? ("neutral" as const),
    };
  }

  return null;
}

function getMetrics(suburb: Suburb, intent: Intent): MetricCard[] {
  if (intent === "rent") {
    return [
      { label: "Median rent", value: formatRent(suburb.weeklyRent) },
      { label: "Affordability", value: `${suburb.rentScores.affordability.toFixed(1)}` },
      { label: "Renter fit", value: `${((suburb.rentScores.amenity + suburb.rentScores.rentToValue) / 2).toFixed(1)}` },
    ];
  }

  if (intent === "buy") {
    return [
      { label: "Price guide", value: formatMoneyShort(suburb.medianPrice) },
      { label: "Buyer fit", value: `${getCompositeScore(suburb, "buy").toFixed(1)}` },
      { label: "Value", value: `${suburb.buyScores.purchaseValue.toFixed(1)}` },
    ];
  }

  return [
    { label: "Gross yield", value: formatPercent(suburb.grossYield) },
    { label: "Value vs growth", value: `${((suburb.investScores.entryPrice + suburb.investScores.demand) / 2).toFixed(1)}` },
    { label: "Investor fit", value: `${getCompositeScore(suburb, "invest").toFixed(1)}` },
  ];
}

function getCardReason(suburb: Suburb, intent: Intent) {
  if (intent === "rent") {
    return getFirstSentence(suburb.rentScores.reasons[2]);
  }

  if (intent === "buy") {
    return getFirstSentence(suburb.buyScores.reasons[1]);
  }

  return getFirstSentence(suburb.investScores.reasons[2]);
}

export function ResultCard({
  suburb,
  intent,
  rank,
  compareSelected = false,
  onCompareToggle,
}: ResultCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailPanelId = `${suburb.id}-${intent}-details`;
  const metrics = getMetrics(suburb, intent);
  const scoreRows = getScoreRows(suburb, intent);
  const intentBadge = getIntentBadge(suburb, intent);

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="surface-panel-soft overflow-hidden p-5 sm:p-6"
    >
      <div className="space-y-4">
        {/* Header: rank + name + badges + metrics */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3.5">
            <RankIndicator rank={rank} />

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[1.35rem] font-semibold tracking-tight text-brand-navy sm:text-[1.5rem]">
                  {suburb.name}
                </h3>
                <TagBadge label={suburb.region} tone="region" />
                {intentBadge ? <TagBadge label={intentBadge.label} tone={intentBadge.tone} /> : null}
              </div>
              <p className="max-w-2xl text-sm leading-6 text-neutral-600">{getCardReason(suburb, intent)}</p>
            </div>
          </div>

          {/* Compact metrics */}
          <div className="flex flex-wrap gap-2 sm:shrink-0">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-[rgba(17,32,51,0.08)] bg-white/82 px-3 py-2"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">{metric.label}</p>
                <p className="mt-0.5 text-sm font-semibold tracking-tight text-brand-navy">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable detail section */}
        {detailsOpen ? (
          <div
            id={detailPanelId}
            className="space-y-4 border-t border-[rgba(17,32,51,0.08)] pt-4"
          >
            {/* Score rows */}
            <div className="grid gap-3 lg:grid-cols-3">
              {scoreRows.map((scoreRow) => (
                <ScoreRow
                  key={scoreRow.label}
                  label={scoreRow.label}
                  score={scoreRow.score}
                  reason={scoreRow.reason}
                />
              ))}
            </div>

            {/* Full note */}
            <div className="rounded-[1.2rem] border border-[rgba(17,32,51,0.08)] bg-white/82 p-4 sm:p-5">
              <div className="space-y-2">
                <p className="field-label">Full note</p>
                <SummaryParagraph>{suburb.verdict}</SummaryParagraph>
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer actions */}
        <div className="flex flex-col gap-3 border-t border-[rgba(17,32,51,0.08)] pt-3.5 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex flex-wrap gap-2.5">
            {onCompareToggle ? (
              <CTAButton
                type="button"
                variant="secondary"
                size="sm"
                className={cn(
                  "rounded-full",
                  compareSelected && "border-brand-blue/24 bg-brand-blue/[0.08] text-brand-blue"
                )}
                aria-pressed={compareSelected}
                onClick={() => onCompareToggle(suburb.id)}
              >
                {compareSelected ? "Remove compare" : "Compare"}
              </CTAButton>
            ) : null}

            <CTAButton
              type="button"
              variant={detailsOpen ? "secondary" : "primary"}
              size="sm"
              className="rounded-full gap-1.5"
              aria-controls={detailPanelId}
              aria-expanded={detailsOpen}
              onClick={() => setDetailsOpen((current) => !current)}
            >
              {detailsOpen ? "Hide details" : "View details"}
              {detailsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </CTAButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
