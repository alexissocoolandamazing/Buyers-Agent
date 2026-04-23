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

const emptyByIntent: Record<
  Intent,
  { title: string; description: string }
> = {
  rent: {
    title: "No rental matches.",
    description: "Reset filters to see all Brisbane rental suburbs.",
  },
  buy: {
    title: "No buying matches.",
    description: "Reset filters to see all Brisbane buying suburbs.",
  },
  invest: {
    title: "No investment matches.",
    description: "Reset filters to see all Brisbane investment suburbs.",
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
  const empty = emptyByIntent[intent];
  const startIndex = results.length === 0 ? 0 : (currentPage - 1) * 5 + 1;
  const endIndex = results.length === 0 ? 0 : startIndex + pageResults.length - 1;

  return (
    <section id="property-results" className="space-y-5">
      <div className="flex flex-col gap-3 border-b border-[rgba(17,32,51,0.08)] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.96rem] leading-7 text-neutral-600">
          {results.length
            ? `Showing ${startIndex}–${endIndex} of ${results.length} suburbs`
            : "No suburbs match the current filters."}
        </p>

        <div className="flex flex-wrap gap-2">
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
          <div className="max-w-xl space-y-4">
            <p className="eyebrow">No matches</p>
            <h3 className="text-[1.6rem] font-semibold tracking-tight text-brand-navy">{empty.title}</h3>
            <p className="text-[0.96rem] leading-7 text-neutral-700">{empty.description}</p>
            <CTAButton type="button" variant="secondary" size="lg" className="rounded-full" onClick={onReset}>
              Reset filters
            </CTAButton>
          </div>
        </div>
      )}
    </section>
  );
}
