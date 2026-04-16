"use client";

import { motion } from "framer-motion";
import { Bus, MapPin, School, ShoppingCart, Trees } from "lucide-react";
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
  detail: string;
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
        detail: "Weekly guide for the suburb's rental market",
      },
      {
        label: "Rental affordability",
        value: `${suburb.rentScores.affordability.toFixed(1)} / 10`,
        detail: "How manageable the suburb feels on rent pressure",
      },
      {
        label: "Renter suitability",
        value: `${((suburb.rentScores.amenity + suburb.rentScores.rentToValue) / 2).toFixed(1)} / 10`,
        detail: "Amenity and value balanced for day-to-day renting",
      },
    ];
  }

  if (intent === "buy") {
    return [
      {
        label: "Purchase guide",
        value: formatMoneyShort(suburb.medianPrice),
        detail: "Median entry snapshot for the buying brief",
      },
      {
        label: "Buyer suitability",
        value: `${getCompositeScore(suburb, "buy").toFixed(1)} / 10`,
        detail: "Weighted for liveability, value, and resilience",
      },
      {
        label: "Value snapshot",
        value: `${suburb.buyScores.purchaseValue.toFixed(1)} / 10`,
        detail: "How defensible the pricing looks today",
      },
    ];
  }

  return [
    {
      label: "Gross yield",
      value: formatPercent(suburb.grossYield),
      detail: "Headline cash-flow signal for the suburb",
    },
    {
      label: "Value vs growth",
      value: `${((suburb.investScores.entryPrice + suburb.investScores.demand) / 2).toFixed(1)} / 10`,
      detail: "Entry discipline balanced with demand pressure",
    },
    {
      label: "Investor suitability",
      value: `${getCompositeScore(suburb, "invest").toFixed(1)} / 10`,
      detail: "Weighted for investor priorities and demand depth",
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

function getScoreContext(intent: Intent) {
  if (intent === "rent") {
    return "Weighted for renter value, fit, and daily convenience.";
  }

  if (intent === "buy") {
    return "Weighted for value, liveability, and owner-occupier confidence.";
  }

  return "Weighted for yield, entry discipline, and demand resilience.";
}

function getFooterNote(intent: Intent, region: string) {
  if (intent === "rent") {
    return `${region} renter brief with affordability and amenity kept in balance.`;
  }

  if (intent === "buy") {
    return `${region} buying brief with liveability and value kept in view.`;
  }

  return `${region} investment brief with demand and entry discipline kept in view.`;
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="surface-panel-soft overflow-hidden p-6 sm:p-7"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            <RankIndicator rank={rank} />

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <TagBadge label={suburb.region} tone="region" />
                {intentBadge ? <TagBadge label={intentBadge.label} tone={intentBadge.tone} /> : null}
              </div>

              <div className="space-y-3">
                <h3 className="text-[1.65rem] font-semibold tracking-tight text-brand-navy sm:text-[1.9rem]">
                  {suburb.name}
                </h3>
                <p className="max-w-3xl text-[0.98rem] leading-7 text-neutral-700">
                  {suburb.shortDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-[rgba(17,32,51,0.08)] bg-white/88 p-4 shadow-[0_16px_36px_-30px_rgba(11,24,40,0.26)] sm:min-w-[15rem]">
            <p className="field-label">Overall signal</p>
            <p className="mt-3 font-[var(--font-display)] text-[2.4rem] font-semibold tracking-tight text-brand-navy">
              {overallScore.toFixed(1)}
              <span className="ml-1 text-sm font-semibold text-neutral-500">/ 10</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{getScoreContext(intent)}</p>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-brand-blue/10 bg-[linear-gradient(135deg,rgba(29,95,168,0.08),rgba(255,255,255,0.9))] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-blue/12 bg-white/82">
              <MapPin className="h-4.5 w-4.5 text-brand-blue" />
            </div>
            <div className="space-y-2">
              <p className="field-label">Why it stands out</p>
              <p className="text-[0.98rem] leading-7 text-brand-navy">{getCardReason(suburb, intent)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.25rem] border border-[rgba(17,32,51,0.08)] bg-white/82 px-4 py-4"
            >
              <p className="field-label">{metric.label}</p>
              <p className="mt-3 font-[var(--font-display)] text-[1.7rem] font-semibold tracking-tight text-brand-navy">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{metric.detail}</p>
            </div>
          ))}
        </div>

        {detailsOpen ? (
          <div
            id={detailPanelId}
            className="rounded-[1.5rem] border border-[rgba(17,32,51,0.08)] bg-white/82 p-4 sm:p-5"
          >
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
              <div className="space-y-4">
                <div className="space-y-3">
                  <p className="field-label">Full brief</p>
                  <SummaryParagraph>{suburb.verdict}</SummaryParagraph>
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
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {localFactorIcons.map((item) => {
                  const Icon = item.icon;
                  const label = suburb.localFactors[item.key];

                  return (
                    <div
                      key={item.key}
                      className="rounded-[1.15rem] border border-[rgba(17,32,51,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.88))] px-4 py-4"
                    >
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(17,32,51,0.08)] bg-white/80">
                        <Icon className="h-4 w-4 text-brand-navy" />
                      </div>
                      <p className="mt-4 text-sm leading-7 text-neutral-700">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 border-t border-[rgba(17,32,51,0.08)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-neutral-500">{getFooterNote(intent, suburb.region)}</p>

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
              {detailsOpen ? "Hide details" : "Explore suburb"}
            </CTAButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
