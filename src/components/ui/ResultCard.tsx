"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { MetricPill } from "@/components/ui/MetricPill";
import { RankIndicator } from "@/components/ui/RankIndicator";
import { RecommendationReason } from "@/components/ui/RecommendationReason";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { ScoreRow } from "@/components/ui/ScoreRow";
import { TagBadge } from "@/components/ui/TagBadge";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";
import { getScoreRows } from "@/lib/recommendations";
import type { Pathway, RankedSuburb } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  result: RankedSuburb;
  pathway: Pathway;
  rank: number;
  compareSelected?: boolean;
  onCompareToggle?: (id: string) => void;
}

function getScoreLabel(pathway: Pathway) {
  if (pathway === "rent") {
    return "Renter score";
  }

  if (pathway === "buy") {
    return "Buyer score";
  }

  return "Investor score";
}

function getMetrics(result: RankedSuburb, pathway: Pathway) {
  const suburb = result.suburb;

  if (pathway === "rent") {
    return [
      { label: "Weekly rent", value: formatRent(suburb.medianRentEstimate), tone: "blue" as const },
      { label: "Transport", value: `${suburb.transportScore}/100`, tone: "default" as const },
      { label: "Safety", value: `${suburb.safetyScore}/100`, tone: "default" as const },
    ];
  }

  if (pathway === "buy") {
    return [
      { label: "Buy estimate", value: formatMoneyShort(suburb.medianBuyPriceEstimate), tone: "blue" as const },
      { label: "Schools", value: `${suburb.schoolScore}/100`, tone: "default" as const },
      { label: "Lifestyle", value: `${suburb.lifestyleScore}/100`, tone: "default" as const },
    ];
  }

  return [
    { label: "Yield estimate", value: formatPercent(suburb.estimatedYield), tone: "green" as const },
    { label: "Rent estimate", value: formatRent(suburb.medianRentEstimate), tone: "default" as const },
    { label: "Buy estimate", value: formatMoneyShort(suburb.medianBuyPriceEstimate), tone: "default" as const },
  ];
}

export function ResultCard({
  result,
  pathway,
  rank,
  compareSelected = false,
  onCompareToggle,
}: ResultCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const suburb = result.suburb;
  const detailPanelId = `${suburb.id}-${pathway}-details`;
  const metrics = getMetrics(result, pathway);
  const scoreRows = getScoreRows(suburb, pathway);

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="surface-panel-soft overflow-hidden p-5 sm:p-6"
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3.5">
            <RankIndicator rank={rank} />

            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[1.35rem] font-semibold tracking-tight text-brand-navy sm:text-[1.55rem]">
                  {suburb.name}
                </h3>
                <TagBadge label={suburb.region} tone="region" />
                {suburb.bestFor.includes(pathway) ? <TagBadge label={`Best for ${pathway}`} tone="blue" /> : null}
              </div>

              <p className="max-w-3xl text-sm leading-6 text-neutral-600">{suburb.summary}</p>
              <RecommendationReason>{result.explanation}</RecommendationReason>
            </div>
          </div>

          <ScoreBadge label={getScoreLabel(pathway)} score={result.score} className="self-start" />
        </div>

        <div className="grid gap-2.5 sm:grid-cols-3">
          {metrics.map((metric) => (
            <MetricPill key={metric.label} label={metric.label} value={metric.value} tone={metric.tone} />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {suburb.lifestyleTags.slice(0, 4).map((tag) => (
            <TagBadge key={tag} label={tag} tone="neutral" />
          ))}
          {result.matchedSignals.map((signal) => (
            <TagBadge key={signal} label={signal} tone="rent" />
          ))}
        </div>

        {detailsOpen ? (
          <div id={detailPanelId} className="space-y-4 border-t border-[rgba(17,32,51,0.08)] pt-4">
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

            <div className="grid gap-3 rounded-[1.2rem] border border-[rgba(17,32,51,0.08)] bg-white/82 p-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="field-label">Council</p>
                <p className="mt-2 text-sm font-medium leading-6 text-neutral-700">{suburb.councilArea}</p>
              </div>
              <div>
                <p className="field-label">Nearby</p>
                <p className="mt-2 text-sm font-medium leading-6 text-neutral-700">
                  {suburb.nearbyFeatures.join(", ")}
                </p>
              </div>
              <div>
                <p className="field-label">Data note</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{suburb.dataNotes}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-[rgba(17,32,51,0.08)] pt-4 sm:flex-row sm:items-center sm:justify-between">
          {pathway === "rent" && onCompareToggle ? (
            <CTAButton
              type="button"
              variant="secondary"
              size="sm"
              className={cn("rounded-full", compareSelected && "border-brand-blue/24 bg-brand-blue/[0.08] text-brand-blue")}
              aria-pressed={compareSelected}
              onClick={() => onCompareToggle(suburb.id)}
            >
              {compareSelected ? "Remove compare" : "Compare suburb"}
            </CTAButton>
          ) : (
            <span className="text-sm text-neutral-500">
              {pathway === "invest" ? "Suburb-level insight only, not individual property advice." : "Seeded suburb profile."}
            </span>
          )}

          <CTAButton
            type="button"
            variant={detailsOpen ? "secondary" : "primary"}
            size="sm"
            className="gap-1.5 rounded-full"
            aria-controls={detailPanelId}
            aria-expanded={detailsOpen}
            onClick={() => setDetailsOpen((current) => !current)}
          >
            {detailsOpen ? "Hide details" : "View details"}
            {detailsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </CTAButton>
        </div>
      </div>
    </motion.article>
  );
}
