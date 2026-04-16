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
  rent: "Refine the rental shortlist",
  buy: "Refine the buying shortlist",
  invest: "Refine the investment shortlist",
};

const budgetHints: Record<Intent, string> = {
  rent: "Budget filters narrow the current rental shortlist.",
  buy: "Purchase filters refine the live buying brief.",
  invest: "Entry filters tighten the investor read without hiding the list.",
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

  function getLeadSignal() {
    if (!topResult) {
      return "Reset the filters to restore the full shortlist.";
    }

    if (intent === "rent") {
      return `${formatRent(topResult.weeklyRent)} median rent with ${topResult.rentScores.amenity.toFixed(1)} / 10 renter fit.`;
    }

    if (intent === "buy") {
      return `${formatMoneyShort(topResult.medianPrice)} guide with ${topResult.buyScores.purchaseValue.toFixed(1)} / 10 value snapshot.`;
    }

    return `${formatPercent(topResult.grossYield)} yield with ${topResult.investScores.demand.toFixed(1)} / 10 demand pressure.`;
  }

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

  const heroStats = [
    {
      label: "Current scope",
      value: appliedRegion === "All Regions" ? "All Brisbane regions" : appliedRegion,
      detail:
        results.length > 0
          ? `${results.length} suburbs currently match this brief.`
          : "Reset the filters to reopen the full shortlist.",
    },
    {
      label: "Budget lens",
      value: appliedBudgetLabel,
      detail: budgetHints[intent],
    },
    {
      label: "Lead signal",
      value: topResult?.name ?? "No current match",
      detail: getLeadSignal(),
    },
  ];

  const filterSummaryItems = [
    {
      label: "Region",
      value: appliedRegion,
      detail:
        appliedRegion === "All Regions"
          ? "Full Brisbane coverage remains visible by default."
          : "The shortlist is narrowed to this region.",
    },
    {
      label: budgetLabel,
      value: appliedBudgetLabel,
      detail: budgetHints[intent],
    },
    {
      label: "Results in view",
      value: `${results.length} suburbs`,
      detail:
        results.length > 0
          ? `Showing page ${safeCurrentPage} of ${totalPages}.`
          : "No results in the current shortlist.",
    },
    {
      label: "Lead suburb",
      value: topResult?.name ?? "No current match",
      detail: getLeadSignal(),
    },
  ];

  const pendingSummaryItems = hasPendingChanges
    ? [
        {
          label: "Pending region",
          value: draftRegion,
        },
        {
          label: `Pending ${budgetLabel.toLowerCase()}`,
          value: draftBudgetLabel,
        },
      ]
    : undefined;

  const filterDescription = hasPendingChanges
    ? "Your updated filters are staged here. Apply them when you want to refresh the shortlist below."
    : results.length > 0
      ? `${results.length} suburbs are already in view${topResult ? `, with ${topResult.name} currently leading.` : "."}`
      : "No suburbs match this filter combination right now.";

  const filterHelperText = hasPendingChanges
    ? "Apply to update the live shortlist and return to page 1."
    : "Default results are already loaded below, with 5 suburbs per page.";

  const outerSpacingClassName = cn(
    "pt-2 sm:pt-3 lg:pt-4",
    comparedSuburbs.length >= 2 ? "pb-[24rem] md:pb-[21rem]" : "pb-16 sm:pb-20 lg:pb-24"
  );

  return (
    <>
      <section className="relative overflow-hidden px-0 pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-10">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(29,95,168,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(187,154,103,0.09),transparent_28%)]" />

        <PageWrapper animate={false}>
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)] xl:items-stretch xl:gap-10">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <PageHero
                badgeLabel={heroBadgeLabels[intent]}
                eyebrow={intentEyebrows[intent]}
                title={title}
                description={description}
                stats={heroStats}
              />
            </motion.div>

            <motion.div
              className="xl:sticky"
              style={{ top: "calc(var(--nav-height) + 1.25rem)" }}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <FilterPanel
                title={filterTitles[intent]}
                description={filterDescription}
                region={draftRegion}
                budgetValue={draftBudgetValue}
                budgetLabel={budgetLabel}
                budgetOptions={budgetOptionsByIntent[intent]}
                summaryItems={filterSummaryItems}
                pendingSummaryItems={pendingSummaryItems}
                hasPendingChanges={hasPendingChanges}
                helperText={filterHelperText}
                onRegionChange={setDraftRegion}
                onBudgetChange={setDraftBudgetValue}
                onApply={handleApply}
                onReset={handleReset}
              />
            </motion.div>
          </div>
        </PageWrapper>
      </section>

      <PageWrapper className={outerSpacingClassName}>
        <motion.div
          className="space-y-5"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.54, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
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
