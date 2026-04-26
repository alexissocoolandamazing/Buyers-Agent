"use client";

import { CTAButton } from "@/components/ui/CTAButton";
import { Pagination } from "@/components/ui/Pagination";
import { ResultCard } from "@/components/ui/ResultCard";
import type { Pathway, RankedSuburb, RegionPreference } from "@/lib/types";

interface ResultsListProps {
  pathway: Pathway;
  results: RankedSuburb[];
  pageResults: RankedSuburb[];
  currentPage: number;
  totalPages: number;
  appliedRegion: RegionPreference;
  appliedBudgetLabel: string;
  appliedPriorityLabel: string;
  onPageChange: (page: number) => void;
  onReset: () => void;
  compareIds?: string[];
  onCompareToggle?: (id: string) => void;
}

const emptyByPathway: Record<Pathway, { title: string; description: string }> = {
  rent: {
    title: "No rental matches.",
    description: "Reset filters to see the full Brisbane rental shortlist again.",
  },
  buy: {
    title: "No buyer matches.",
    description: "Reset filters to return to the default buyer recommendations.",
  },
  invest: {
    title: "No investor matches.",
    description: "Reset filters to return to the default investor recommendations.",
  },
};

export function ResultsList({
  pathway,
  results,
  pageResults,
  currentPage,
  totalPages,
  appliedRegion,
  appliedBudgetLabel,
  appliedPriorityLabel,
  onPageChange,
  onReset,
  compareIds = [],
  onCompareToggle,
}: ResultsListProps) {
  const empty = emptyByPathway[pathway];
  const startIndex = results.length === 0 ? 0 : (currentPage - 1) * 6 + 1;
  const endIndex = results.length === 0 ? 0 : startIndex + pageResults.length - 1;

  return (
    <section id="property-results" className="space-y-5">
      <div className="flex flex-col gap-4 border-b border-[rgba(17,32,51,0.08)] pb-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-[0.96rem] leading-7 text-neutral-600">
          {results.length
            ? `Showing ${startIndex}-${endIndex} of ${results.length} suburb recommendations`
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
          <span className="selection-chip">
            <strong>Priority</strong>
            {appliedPriorityLabel}
          </span>
        </div>
      </div>

      {results.length ? (
        <>
          <div className="grid gap-4">
            {pageResults.map((result, index) => (
              <ResultCard
                key={result.suburb.id}
                result={result}
                pathway={pathway}
                rank={startIndex + index}
                compareSelected={compareIds.includes(result.suburb.id)}
                onCompareToggle={pathway === "rent" ? onCompareToggle : undefined}
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
