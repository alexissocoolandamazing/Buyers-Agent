"use client";

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
      {
        label: "Median rent",
        value: formatRent(suburb.weeklyRent),
      },
      {
        label: "Affordability",
        value: `${suburb.rentScores.affordability.toFixed(1)} / 10`,
      },
      {
        label: "Renter fit",
        value: `${((suburb.rentScores.amenity + suburb.rentScores.rentToValue) / 2).toFixed(1)} / 10`,
      },
    ];
  }

  if (intent === "buy") {
    return [
      {
        label: "Purchase guide",
        value: formatMoneyShort(suburb.medianPrice),
      },
      {
        label: "Buyer fit",
        value: `${getCompositeScore(suburb, "buy").toFixed(1)} / 10`,
      },
      {
        label: "Value snapshot",
        value: `${suburb.buyScores.purchaseValue.toFixed(1)} / 10`,
      },
    ];
  }

  return [
    {
      label: "Gross yield",
      value: formatPercent(suburb.grossYield),
    },
    {
      label: "Value vs growth",
      value: `${((suburb.investScores.entryPrice + suburb.investScores.demand) / 2).toFixed(1)} / 10`,
    },
    {
      label: "Investor fit",
      value: `${getCompositeScore(suburb, "invest").toFixed(1)} / 10`,
    },
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
  const overallScore = getCompositeScore(suburb, intent);
  const intentBadge = getIntentBadge(suburb, intent);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="surface-panel-soft overflow-hidden p-5 sm:p-6"
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <RankIndicator rank={rank} />

            <div className="space-y-3.5">
              <div className="flex flex-wrap gap-2">
                <TagBadge label={suburb.region} tone="region" />
                {intentBadge ? <TagBadge label={intentBadge.label} tone={intentBadge.tone} /> : null}
              </div>

              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-[1.45rem] font-semibold tracking-tight text-brand-navy sm:text-[1.6rem]">
                    {suburb.name}
                  </h3>
                  <span className="inline-flex items-center rounded-full border border-brand-blue/12 bg-brand-blue/[0.08] px-3 py-1 text-sm font-semibold text-brand-blue">
                    {overallScore.toFixed(1)} / 10
                  </span>
                </div>

                <p className="max-w-3xl text-[0.96rem] leading-7 text-neutral-700">
                  {suburb.shortDescription}
                </p>
                <p className="max-w-3xl text-sm leading-6 text-neutral-600">{getCardReason(suburb, intent)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[26rem]">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.1rem] border border-[rgba(17,32,51,0.08)] bg-white/82 px-4 py-3.5"
              >
                <p className="field-label">{metric.label}</p>
                <p className="mt-2 text-base font-semibold tracking-tight text-brand-navy sm:text-lg">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

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

        {detailsOpen ? (
          <div
            id={detailPanelId}
            className="rounded-[1.3rem] border border-[rgba(17,32,51,0.08)] bg-white/82 p-4 sm:p-5"
          >
            <div className="space-y-3">
              <div className="space-y-3">
                <p className="field-label">Full note</p>
                <SummaryParagraph>{suburb.verdict}</SummaryParagraph>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-[rgba(17,32,51,0.08)] pt-4 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex flex-wrap gap-3">
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
                {compareSelected ? "Remove from compare" : "Add to compare"}
              </CTAButton>
            ) : null}

            <CTAButton
              type="button"
              variant={detailsOpen ? "secondary" : "primary"}
              size="sm"
              className="rounded-full"
              aria-controls={detailPanelId}
              aria-expanded={detailsOpen}
              onClick={() => setDetailsOpen((current) => !current)}
            >
              {detailsOpen ? "Hide full note" : "View full note"}
            </CTAButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
