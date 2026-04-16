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
    description: string;
    emptyTitle: string;
    emptyDescription: string;
  }
> = {
  rent: {
    eyebrow: "Rental suggestions",
    title: "Rental-ready suburbs, already in view.",
    description:
      "The shortlist opens on the full Brisbane rental landscape. Filters narrow the live list rather than unlocking it.",
    emptyTitle: "No rental suggestions match this brief.",
    emptyDescription:
      "The current demo data does not return a suburb for this region and budget combination. Reset the brief to return to the full Brisbane rental view.",
  },
  buy: {
    eyebrow: "Buying shortlist",
    title: "Buying suburbs with a clearer sense of fit.",
    description:
      "You start with the full Brisbane buy shortlist, then tighten the view only when the purchase brief needs more focus.",
    emptyTitle: "No buying suggestions match this brief.",
    emptyDescription:
      "This combination is narrower than the current demo dataset. Reset the filters to reopen the full Brisbane buying shortlist.",
  },
  invest: {
    eyebrow: "Investment shortlist",
    title: "Investment suburbs with cleaner signals.",
    description:
      "The investment view loads with every relevant Brisbane suburb already ranked, so the filters simply sharpen the shortlist.",
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
    <section id="property-results" className="space-y-8">
      <div className="surface-panel-soft p-6 sm:p-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="text-[2rem] font-semibold tracking-tight text-brand-navy sm:text-[2.3rem]">
              {copy.title}
            </h2>
            <p className="text-[0.98rem] leading-8 text-neutral-700">{copy.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[36rem]">
            <div className="rounded-[1.25rem] border border-[rgba(17,32,51,0.08)] bg-white/88 px-4 py-4">
              <p className="field-label">Showing</p>
              <p className="mt-2 text-base font-semibold tracking-tight text-brand-navy">
                {results.length ? `${startIndex}-${endIndex}` : "0 results"}
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {results.length ? `${results.length} suburbs in the shortlist` : "No suburbs in the shortlist"}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-[rgba(17,32,51,0.08)] bg-white/88 px-4 py-4">
              <p className="field-label">Applied region</p>
              <p className="mt-2 text-base font-semibold tracking-tight text-brand-navy">{appliedRegion}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {appliedRegion === "All Regions"
                  ? "Full Brisbane coverage remains in play."
                  : "Region filter is actively narrowing the view."}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-[rgba(17,32,51,0.08)] bg-white/88 px-4 py-4">
              <p className="field-label">Budget lens</p>
              <p className="mt-2 text-base font-semibold tracking-tight text-brand-navy">{appliedBudgetLabel}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Results stay paginated in calm 5-card pages.
              </p>
            </div>
          </div>
        </div>
      </div>

      {results.length ? (
        <>
          <div className="grid gap-5">
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
