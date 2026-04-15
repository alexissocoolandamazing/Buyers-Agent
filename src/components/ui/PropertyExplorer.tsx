"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers3, LineChart, MapPinned, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ComparePanel } from "@/components/ui/ComparePanel";
import { FilterBar } from "@/components/ui/FilterBar";
import { SuburbCard } from "@/components/ui/SuburbCard";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";
import { budgetOptionsByIntent, getFilteredSuburbs, suburbs } from "@/lib/mockData";
import type { Intent, Region } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PropertyExplorerProps {
  intent: Intent;
  title: string;
  description: string;
  budgetLabel: string;
}

const intentEyebrows: Record<Intent, string> = {
  rent: "Brisbane rental rankings",
  buy: "Brisbane buying brief",
  invest: "Brisbane investment brief",
};

const intentHighlights: Record<
  Intent,
  {
    label: string;
    value: string;
  }[]
> = {
  rent: [
    { label: "Workflow", value: "Filter by region and weekly budget in seconds." },
    { label: "Readout", value: "See affordability, fit, and amenity in one pass." },
    { label: "Compare", value: "Pin up to three suburbs side by side for clearer trade-offs." },
  ],
  buy: [
    { label: "Workflow", value: "Narrow by region and purchase budget without losing context." },
    { label: "Readout", value: "Balance purchase value, lifestyle, and family practicality." },
    { label: "Signals", value: "School, transport, shopping, and park access stay visible." },
  ],
  invest: [
    { label: "Workflow", value: "Screen suburbs by entry point and intent-specific demand." },
    { label: "Readout", value: "Keep yield, acquisition discipline, and growth pressure in view." },
    { label: "Trust", value: "Recommendation logic stays readable enough to audit quickly." },
  ],
};

export function PropertyExplorer({
  intent,
  title,
  description,
  budgetLabel,
}: PropertyExplorerProps) {
  const reduceMotion = useReducedMotion();
  const defaultBudget = budgetOptionsByIntent[intent].at(-1)?.value ?? "";
  const [region, setRegion] = useState<Region | "All Regions">("All Regions");
  const [budgetValue, setBudgetValue] = useState(defaultBudget);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(true);
  const [compareError, setCompareError] = useState<string | null>(null);

  const results = getFilteredSuburbs(intent, region, budgetValue).slice(0, 6);
  const topResult = results[0];
  const selectedBudget =
    budgetOptionsByIntent[intent].find((option) => option.value === budgetValue)?.label ?? "Open budget";
  const comparedSuburbs = compareIds
    .map((id) => suburbs.find((suburb) => suburb.id === id))
    .filter((suburb): suburb is (typeof suburbs)[number] => Boolean(suburb));

  function handleReset() {
    setRegion("All Regions");
    setBudgetValue(defaultBudget);
    setCompareIds([]);
    setCompareOpen(true);
    setCompareError(null);
  }

  function handleCompareToggle(id: string) {
    setCompareError(null);

    setCompareIds((current) => {
      if (current.includes(id)) {
        const next = current.filter((value) => value !== id);

        if (next.length < 2) {
          setCompareOpen(false);
        }

        return next;
      }

      if (current.length === 3) {
        setCompareError("Compare supports up to 3 suburbs at a time.");
        return current;
      }

      const next = [...current, id];
      if (next.length >= 2) {
        setCompareOpen(true);
      }

      return next;
    });
  }

  const explorerStats = [
    {
      label: "Current brief",
      value: region === "All Regions" ? "All Brisbane regions" : region,
      detail: selectedBudget,
      icon: MapPinned,
    },
    {
      label: "Shortlist size",
      value: `${results.length} ranked suburbs`,
      detail: "Updated instantly as filters change",
      icon: Layers3,
    },
    {
      label: "Lead match",
      value: topResult?.name ?? "Awaiting broader filters",
      detail: topResult
        ? intent === "rent"
          ? formatRent(topResult.weeklyRent)
          : intent === "buy"
            ? formatMoneyShort(topResult.medianPrice)
            : formatPercent(topResult.grossYield)
        : "No active result",
      icon: LineChart,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden section-space-tight">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(29,95,168,0.08),transparent_34%),radial-gradient(circle_at_top_right,rgba(186,156,109,0.12),transparent_22%)]" />
        <PageWrapper animate={false}>
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.92fr)] xl:items-start">
            <motion.div
              className="surface-panel relative overflow-hidden p-6 sm:p-7 lg:p-8"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.5),transparent_46%)]" />
              <div className="relative space-y-7">
                <div className="flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-blue/[0.08] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                    <Sparkles className="h-3.5 w-3.5" />
                    {intentEyebrows[intent]}
                  </span>
                  <span className="inline-flex rounded-full border border-[rgba(17,32,51,0.08)] bg-white/76 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                    First-screen filters included
                  </span>
                </div>

                <div className="max-w-3xl space-y-5">
                  <p className="eyebrow">{intentEyebrows[intent]}</p>
                  <h1 className="text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-brand-navy">
                    {title}
                  </h1>
                  <p className="max-w-2xl text-[1rem] leading-8 text-neutral-700 sm:text-[1.06rem]">{description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {explorerStats.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="rounded-[1.35rem] border border-[rgba(17,32,51,0.08)] bg-white/76 p-4">
                        <Icon className="h-4 w-4 text-brand-navy" />
                        <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                          {item.label}
                        </p>
                        <p className="mt-3 text-lg font-semibold tracking-tight text-brand-navy">{item.value}</p>
                        <p className="mt-2 text-sm leading-7 text-neutral-600">{item.detail}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="grid gap-3 rounded-[1.5rem] border border-[rgba(17,32,51,0.08)] bg-white/70 p-5 sm:grid-cols-3">
                  {intentHighlights[intent].map((item) => (
                    <div key={item.label}>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                        {item.label}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-neutral-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="xl:sticky"
              style={{ top: "calc(var(--nav-height) + 1rem)" }}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <FilterBar
                region={region}
                budgetValue={budgetValue}
                budgetLabel={budgetLabel}
                budgetOptions={budgetOptionsByIntent[intent]}
                resultCount={results.length}
                topMatch={topResult?.name}
                onRegionChange={setRegion}
                onBudgetChange={setBudgetValue}
                onReset={handleReset}
              />
            </motion.div>
          </div>
        </PageWrapper>
      </section>

      <PageWrapper
        className={cn(
          "pb-16 sm:pb-20 lg:pb-24",
          comparedSuburbs.length >= 2 && "pb-[24rem] md:pb-[21rem]"
        )}
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-4 border-b border-[rgba(17,32,51,0.08)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="eyebrow">Ranked shortlist</p>
              <h2 className="text-2xl font-semibold tracking-tight text-brand-navy sm:text-[2.15rem]">
                Meaningful Brisbane matches, ready on first load.
              </h2>
              <p className="max-w-3xl text-[0.98rem] leading-8 text-neutral-700">
                The list below stays tightly structured so the first result feels immediately useful, not buried behind
                empty hero space or disconnected controls.
              </p>
            </div>

            <div className="rounded-full border border-[rgba(17,32,51,0.08)] bg-white/78 px-4 py-2 text-sm font-semibold tracking-tight text-neutral-700">
              {results.length > 0 ? `${results.length} ranked suburbs` : "No current matches"}
            </div>
          </div>

          {compareError ? (
            <p className="rounded-[1.15rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
              {compareError}
            </p>
          ) : null}

          {results.length ? (
            <div className="grid gap-5">
              {results.map((suburb, index) => (
                <SuburbCard
                  key={suburb.id}
                  suburb={suburb}
                  mode={intent}
                  rank={index + 1}
                  compareSelected={compareIds.includes(suburb.id)}
                  onCompareToggle={intent === "rent" ? handleCompareToggle : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="surface-panel p-8 sm:p-10">
              <div className="max-w-2xl space-y-4">
                <p className="eyebrow">No shortlist yet</p>
                <h2 className="text-2xl font-semibold tracking-tight text-brand-navy">
                  Widen the brief to bring Brisbane suburbs back into view.
                </h2>
                <p className="text-[1rem] leading-8 text-neutral-700">
                  The current filter combination is too narrow for the available data. Reset the filters or choose a
                  broader region or budget band to restore results.
                </p>
              </div>
            </div>
          )}
        </div>
      </PageWrapper>

      {intent === "rent" && comparedSuburbs.length >= 2 ? (
        <ComparePanel
          suburbs={comparedSuburbs}
          open={compareOpen}
          onToggleOpen={() => setCompareOpen((current) => !current)}
          onClose={() => {
            setCompareIds([]);
            setCompareError(null);
            setCompareOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
