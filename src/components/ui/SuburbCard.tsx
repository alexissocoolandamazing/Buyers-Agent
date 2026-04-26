"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { MetricPill } from "@/components/ui/MetricPill";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { TagBadge } from "@/components/ui/TagBadge";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";
import type { Pathway, RankedSuburb } from "@/lib/types";

interface SuburbCardProps {
  result: RankedSuburb;
  pathway: Pathway;
  href: string;
  label: string;
}

function getFeaturedMetric(result: RankedSuburb, pathway: Pathway) {
  const suburb = result.suburb;

  if (pathway === "rent") {
    return { label: "Weekly rent", value: formatRent(suburb.medianRentEstimate) };
  }

  if (pathway === "buy") {
    return { label: "Buy estimate", value: formatMoneyShort(suburb.medianBuyPriceEstimate) };
  }

  return { label: "Yield estimate", value: formatPercent(suburb.estimatedYield) };
}

export function SuburbCard({ result, pathway, href, label }: SuburbCardProps) {
  const suburb = result.suburb;
  const metric = getFeaturedMetric(result, pathway);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="surface-panel-soft flex h-full flex-col p-5 sm:p-6"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <TagBadge label={label} tone="blue" />
          <TagBadge label={suburb.region} tone="region" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[1.35rem] font-semibold tracking-tight text-brand-navy">{suburb.name}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{result.explanation}</p>
          </div>
          <ScoreBadge label="Score" score={result.score} className="hidden sm:inline-flex" />
        </div>

        <MetricPill label={metric.label} value={metric.value} tone={pathway === "invest" ? "green" : "blue"} />
      </div>

      <div className="mt-auto pt-5">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-brand-blue transition hover:text-brand-navy"
        >
          View recommendations
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
