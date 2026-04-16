"use client";

import { CTAButton } from "@/components/ui/CTAButton";
import { Pagination } from "@/components/ui/Pagination";
import { ResultCard } from "@/components/ui/ResultCard";
import type { Intent, Region, Suburb } from "@/lib/types";

interface ResultsListProps {
  intent: Intent;
  results: Suburb[];
  pageResults: Suburb[];
  currentPage: number;
  totalPages: number;
  appliedRegion: Region | "All Regions";
  appliedBudgetLabel: string;
  onPageChange: (page: number) => void;
  onReset: () => void;
  compareIds?: string[];
  onCompareToggle?: (id: string) => void;
}

const copyByIntent: Record<
  Intent,
  {
    eyebrow: string;
    title: string;
    emptyTitle: string;
    emptyDescription: string;
  }
> = {
  rent: {
    eyebrow: "Rental suggestions",
    title: "Rental-ready suburbs in view.",
    emptyTitle: "No rental suggestions match this brief.",
    emptyDescription:
      "The current demo data does not return a suburb for this region and budget combination. Reset the brief to return to the full Brisbane rental view.",
  },
  buy: {
    eyebrow: "Buying shortlist",
    title: "Buying suburbs in view.",
    emptyTitle: "No buying suggestions match this brief.",
    emptyDescription:
      "This combination is narrower than the current demo dataset. Reset the filters to reopen the full Brisbane buying shortlist.",
  },
  invest: {
    eyebrow: "Investment shortlist",
    title: "Investment suburbs in view.",
    emptyTitle: "No investment suggestions match this brief.",
    emptyDescription:
      "This entry budget and region combination is tighter than the current demo data. Reset the filters to restore the full investment shortlist.",
  },
};

export function ResultsList({
  intent,
  results,
  pageResults,
  currentPage,
  totalPages,
  appliedRegion,
  appliedBudgetLabel,
  onPageChange,
  onReset,
  compareIds = [],
  onCompareToggle,
}: ResultsListProps) {
  const copy = copyByIntent[intent];
  const startIndex = results.length === 0 ? 0 : (currentPage - 1) * 5 + 1;
  const endIndex = results.length === 0 ? 0 : startIndex + pageResults.length - 1;

  return (
    <section id="property-results" className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-[rgba(17,32,51,0.08)] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="text-[1.8rem] font-semibold tracking-tight text-brand-navy sm:text-[2rem]">
            {copy.title}
          </h2>
          <p className="text-[0.96rem] leading-7 text-neutral-600">
            {results.length
              ? `Showing ${startIndex}-${endIndex} of ${results.length} suburbs.`
              : "No suburbs currently match this brief."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <span className="selection-chip">
            <strong>Region</strong>
            {appliedRegion}
          </span>
          <span className="selection-chip">
            <strong>Budget</strong>
            {appliedBudgetLabel}
          </span>
        </div>
      </div>

      {results.length ? (
        <>
          <div className="grid gap-4">
            {pageResults.map((suburb, index) => (
              <ResultCard
                key={suburb.id}
                suburb={suburb}
                intent={intent}
                rank={startIndex + index}
                compareSelected={compareIds.includes(suburb.id)}
                onCompareToggle={intent === "rent" ? onCompareToggle : undefined}
              />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </>
      ) : (
        <div className="surface-panel p-7 sm:p-9">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">No matches</p>
            <h3 className="text-[1.9rem] font-semibold tracking-tight text-brand-navy">{copy.emptyTitle}</h3>
            <p className="text-[0.98rem] leading-8 text-neutral-700">{copy.emptyDescription}</p>
            <CTAButton type="button" variant="secondary" size="lg" className="rounded-full" onClick={onReset}>
              Reset filters
            </CTAButton>
          </div>
        </div>
      )}
    </section>
  );
}
