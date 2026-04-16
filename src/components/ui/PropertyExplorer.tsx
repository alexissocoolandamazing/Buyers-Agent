"use client";

import { motion, useReducedMotion } from "framer-motion";
import { startTransition, useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ComparePanel } from "@/components/ui/ComparePanel";
import { FilterPanel } from "@/components/ui/FilterPanel";
import { PageHero } from "@/components/ui/PageHero";
import { ResultsList } from "@/components/ui/ResultsList";
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

const RESULTS_PER_PAGE = 5;

const intentEyebrows: Record<Intent, string> = {
  rent: "Brisbane rental intelligence",
  buy: "Brisbane buying intelligence",
  invest: "Brisbane investment intelligence",
};

const heroBadgeLabels: Record<Intent, string> = {
  rent: "Rental intelligence",
  buy: "Buying intelligence",
  invest: "Investment intelligence",
};

const filterTitles: Record<Intent, string> = {
  rent: "Refine the shortlist",
  buy: "Refine the shortlist",
  invest: "Refine the shortlist",
};

function getBudgetOptionLabel(intent: Intent, value: string) {
  return budgetOptionsByIntent[intent].find((option) => option.value === value)?.label ?? "All budgets";
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  const results = getFilteredSuburbs(intent, appliedRegion, appliedBudgetValue);
  const totalPages = Math.max(1, Math.ceil(results.length / RESULTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * RESULTS_PER_PAGE;
  const pageResults = results.slice(pageStart, pageStart + RESULTS_PER_PAGE);
  const topResult = results[0];
  const hasPendingChanges =
    draftRegion !== appliedRegion || draftBudgetValue !== appliedBudgetValue;
  const appliedBudgetLabel = getBudgetOptionLabel(intent, appliedBudgetValue);
  const draftBudgetLabel = getBudgetOptionLabel(intent, draftBudgetValue);

  const comparedSuburbs = compareIds
    .map((id) => suburbs.find((suburb) => suburb.id === id))
    .filter((suburb): suburb is (typeof suburbs)[number] => Boolean(suburb));

  function clearCompareState() {
    setCompareIds([]);
    setCompareOpen(false);
    setCompareError(null);
  }

  function handleApply() {
    startTransition(() => {
      setAppliedRegion(draftRegion);
      setAppliedBudgetValue(draftBudgetValue);
      setCurrentPage(1);
      clearCompareState();
    });
  }

  function handleReset() {
    startTransition(() => {
      setDraftRegion(defaultRegion);
      setDraftBudgetValue(defaultBudget);
      setAppliedRegion(defaultRegion);
      setAppliedBudgetValue(defaultBudget);
      setCurrentPage(1);
      clearCompareState();
    });
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

  function handlePageChange(page: number) {
    const nextPage = Math.max(1, Math.min(totalPages, page));

    if (nextPage === safeCurrentPage) {
      return;
    }

    setCurrentPage(nextPage);

    const resultsSection = document.getElementById("property-results");
    resultsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function getLeadSummary() {
    if (!topResult) {
      return "No suburb matches the current brief right now.";
    }

    if (intent === "rent") {
      return `${results.length} suburbs ready. ${topResult.name} leads at ${formatRent(topResult.weeklyRent)}.`;
    }

    if (intent === "buy") {
      return `${results.length} suburbs ready. ${topResult.name} leads at ${formatMoneyShort(topResult.medianPrice)}.`;
    }

    return `${results.length} suburbs ready. ${topResult.name} leads at ${formatPercent(topResult.grossYield)} yield.`;
  }

  const summaryItems = [
    { label: "Region", value: appliedRegion },
    { label: budgetLabel, value: appliedBudgetLabel },
    { label: "Results", value: `${results.length} suburbs` },
  ];

  const pendingSummaryItems = hasPendingChanges
    ? [
        { label: "Region", value: draftRegion },
        { label: budgetLabel, value: draftBudgetLabel },
      ]
    : undefined;

  const filterDescription = hasPendingChanges
    ? "Adjust the filters here, then apply the new shortlist when you are ready."
    : "The full shortlist is already loaded below. Use the controls only when you want to narrow it.";

  const helperText = hasPendingChanges
    ? "Apply to refresh the results and reset to page 1."
    : "Results are already visible below with 5 suburbs per page.";

  const outerSpacingClassName = cn(
    "pt-1 sm:pt-2 lg:pt-3",
    comparedSuburbs.length >= 2
      ? compareOpen
        ? "pb-[18rem] md:pb-[15rem]"
        : "pb-[8.5rem] md:pb-[9.5rem]"
      : "pb-16 sm:pb-20 lg:pb-24"
  );

  return (
    <>
      <section className="relative overflow-hidden px-0 pb-7 pt-5 sm:pb-8 sm:pt-7 lg:pb-10 lg:pt-8">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(29,95,168,0.1),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(187,154,103,0.08),transparent_28%)]" />

        <PageWrapper animate={false}>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.84fr)] xl:items-start xl:gap-8">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <PageHero
                badgeLabel={heroBadgeLabels[intent]}
                eyebrow={intentEyebrows[intent]}
                title={title}
                description={description}
                summary={getLeadSummary()}
              />
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <FilterPanel
                title={filterTitles[intent]}
                description={filterDescription}
                region={draftRegion}
                budgetValue={draftBudgetValue}
                budgetLabel={budgetLabel}
                budgetOptions={budgetOptionsByIntent[intent]}
                summaryItems={summaryItems}
                pendingSummaryItems={pendingSummaryItems}
                hasPendingChanges={hasPendingChanges}
                helperText={helperText}
                onRegionChange={setDraftRegion}
                onBudgetChange={setDraftBudgetValue}
                onApply={handleApply}
                onReset={handleReset}
              />
            </motion.div>
          </div>
        </PageWrapper>
      </section>

      <PageWrapper animate={false} className={outerSpacingClassName}>
        <div className="space-y-5">
          {compareError ? (
            <p className="rounded-[1.15rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
              {compareError}
            </p>
          ) : null}

          <ResultsList
            intent={intent}
            results={results}
            pageResults={pageResults}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            appliedRegion={appliedRegion}
            appliedBudgetLabel={appliedBudgetLabel}
            onPageChange={handlePageChange}
            onReset={handleReset}
            compareIds={compareIds}
            onCompareToggle={handleCompareToggle}
          />
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
