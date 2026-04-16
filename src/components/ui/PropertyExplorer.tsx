"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers3, LineChart, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ComparePanel } from "@/components/ui/ComparePanel";
import { FilterBar } from "@/components/ui/FilterBar";
import { SuburbCard } from "@/components/ui/SuburbCard";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";
import {
  budgetOptionsByIntent,
  defaultBudgetValueByIntent,
  getFilteredSuburbs,
  suburbs,
} from "@/lib/mockData";
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

export function PropertyExplorer({
  intent,
  title,
  description,
  budgetLabel,
}: PropertyExplorerProps) {
  const reduceMotion = useReducedMotion();
  const defaultRegion: Region | "All Regions" = "All Regions";
  const defaultBudget = defaultBudgetValueByIntent[intent];

  const [draftRegion, setDraftRegion] = useState<Region | "All Regions">(defaultRegion);
  const [draftBudgetValue, setDraftBudgetValue] = useState(defaultBudget);
  const [appliedRegion, setAppliedRegion] = useState<Region | "All Regions">(defaultRegion);
  const [appliedBudgetValue, setAppliedBudgetValue] = useState(defaultBudget);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  const results = getFilteredSuburbs(intent, appliedRegion, appliedBudgetValue);
  const topResult = results[0];
  const hasPendingChanges =
    draftRegion !== appliedRegion || draftBudgetValue !== appliedBudgetValue;
  const selectedBudget =
    budgetOptionsByIntent[intent].find((option) => option.value === appliedBudgetValue)?.label ??
    "All budgets";

  const comparedSuburbs = compareIds
    .map((id) => suburbs.find((suburb) => suburb.id === id))
    .filter((suburb): suburb is (typeof suburbs)[number] => Boolean(suburb));

  function clearCompareState() {
    setCompareIds([]);
    setCompareOpen(false);
    setCompareError(null);
  }

  function handleApply() {
    setAppliedRegion(draftRegion);
    setAppliedBudgetValue(draftBudgetValue);
    clearCompareState();
  }

  function handleReset() {
    setDraftRegion(defaultRegion);
    setDraftBudgetValue(defaultBudget);
    setAppliedRegion(defaultRegion);
    setAppliedBudgetValue(defaultBudget);
    clearCompareState();
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
      label: "Current view",
      value: appliedRegion === "All Regions" ? "All Brisbane regions" : appliedRegion,
      detail: selectedBudget,
      icon: Layers3,
    },
    {
      label: "Lead suburb",
      value: topResult?.name ?? "No current match",
      detail: topResult
        ? intent === "rent"
          ? formatRent(topResult.weeklyRent)
          : intent === "buy"
            ? formatMoneyShort(topResult.medianPrice)
            : formatPercent(topResult.grossYield)
        : "Reset to see all suburbs",
      icon: LineChart,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden px-0 pb-6 pt-5 sm:pb-8 sm:pt-7 lg:pb-10 lg:pt-8">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(29,95,168,0.08),transparent_36%),radial-gradient(circle_at_top_right,rgba(186,156,109,0.1),transparent_22%)]" />

        <PageWrapper animate={false}>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.9fr)] xl:items-start xl:gap-8">
            <motion.div
              className="surface-panel relative overflow-hidden p-5 sm:p-6 lg:p-7"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_46%)]" />
              <div className="relative space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-blue/[0.08] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  <Sparkles className="h-3.5 w-3.5" />
                  {intentEyebrows[intent]}
                </span>

                <div className="max-w-3xl space-y-3.5">
                  <p className="eyebrow">{intentEyebrows[intent]}</p>
                  <h1 className="text-[clamp(2.35rem,4.7vw,4rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-brand-navy">
                    {title}
                  </h1>
                  <p className="max-w-2xl text-[0.98rem] leading-7 text-neutral-700 sm:text-[1rem]">
                    {description}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="xl:sticky"
              style={{ top: "calc(var(--nav-height) + 1rem)" }}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <FilterBar
                intent={intent}
                region={draftRegion}
                appliedRegion={appliedRegion}
                budgetValue={draftBudgetValue}
                appliedBudgetValue={appliedBudgetValue}
                budgetLabel={budgetLabel}
                budgetOptions={budgetOptionsByIntent[intent]}
                resultCount={results.length}
                topMatch={topResult?.name}
                hasPendingChanges={hasPendingChanges}
                onRegionChange={setDraftRegion}
                onBudgetChange={setDraftBudgetValue}
                onApply={handleApply}
                onReset={handleReset}
              />
            </motion.div>
          </div>

          <motion.div
            className="mt-5 grid gap-4 md:grid-cols-2"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.54, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {explorerStats.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="surface-panel-soft p-4 sm:p-5">
                  <Icon className="h-4 w-4 text-brand-navy" />
                  <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-brand-navy">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.detail}</p>
                </div>
              );
            })}
          </motion.div>
        </PageWrapper>
      </section>

      <PageWrapper
        className={cn(
          "pb-16 pt-2 sm:pb-20 sm:pt-3 lg:pb-24 lg:pt-4",
          comparedSuburbs.length >= 2 && "pb-[24rem] md:pb-[21rem]"
        )}
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-4 border-b border-[rgba(17,32,51,0.08)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="eyebrow">Ranked shortlist</p>
              <h2 className="text-2xl font-semibold tracking-tight text-brand-navy sm:text-[2rem]">
                Brisbane matches, kept easy to scan.
              </h2>
              <p className="max-w-2xl text-[0.96rem] leading-7 text-neutral-700">
                The page starts broad, then narrows only when you apply a new brief.
              </p>
            </div>

            <div className="rounded-full border border-[rgba(17,32,51,0.08)] bg-white/78 px-4 py-2 text-sm font-semibold tracking-tight text-neutral-700">
              {results.length > 0 ? `${results.length} suburbs showing` : "No current matches"}
            </div>
          </div>

          {compareError ? (
            <p className="rounded-[1.15rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
              {compareError}
            </p>
          ) : null}

          {results.length ? (
            <div className="grid gap-4">
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
            <div className="surface-panel p-7 sm:p-9">
              <div className="max-w-xl space-y-3">
                <p className="eyebrow">No matches</p>
                <h2 className="text-2xl font-semibold tracking-tight text-brand-navy">
                  Widen the brief to bring the shortlist back.
                </h2>
                <p className="text-[0.96rem] leading-7 text-neutral-700">
                  This combination is narrower than the current demo data. Reset the filters or apply a broader
                  region or budget.
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
          onClose={clearCompareState}
        />
      ) : null}
    </>
  );
}
