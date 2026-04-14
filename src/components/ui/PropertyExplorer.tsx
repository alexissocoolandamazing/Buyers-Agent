"use client";

import { useState } from "react";
import { ComparePanel } from "@/components/ui/ComparePanel";
import { FilterBar } from "@/components/ui/FilterBar";
import { SuburbCard } from "@/components/ui/SuburbCard";
import { budgetOptionsByIntent, getFilteredSuburbs, suburbs } from "@/lib/mockData";
import type { Intent, Region } from "@/lib/types";
import { PageWrapper } from "@/components/layout/PageWrapper";

interface PropertyExplorerProps {
  intent: Intent;
  title: string;
  description: string;
  budgetLabel: string;
}

export function PropertyExplorer({
  intent,
  title,
  description,
  budgetLabel,
}: PropertyExplorerProps) {
  const defaultBudget = budgetOptionsByIntent[intent].at(-1)?.value ?? "";
  const [region, setRegion] = useState<Region | "All Regions">("All Regions");
  const [budgetValue, setBudgetValue] = useState(defaultBudget);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(true);
  const [compareError, setCompareError] = useState<string | null>(null);

  const results = getFilteredSuburbs(intent, region, budgetValue).slice(0, 6);
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
        setCompareError("Compare supports up to 3 suburbs");
        return current;
      }

      const next = [...current, id];
      if (next.length >= 2) {
        setCompareOpen(true);
      }

      return next;
    });
  }

  return (
    <>
      <PageWrapper animate={false} className="py-16 md:py-20">
        <div className="max-w-3xl space-y-5">
          <p className="font-sans text-sm font-medium uppercase tracking-wide text-neutral-600">
            Brisbane {intent} rankings
          </p>
          <h1 className="font-sans text-4xl font-bold tracking-tight text-brand-navy md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-base leading-relaxed text-neutral-700">{description}</p>
        </div>
      </PageWrapper>

      <FilterBar
        region={region}
        budgetValue={budgetValue}
        budgetLabel={budgetLabel}
        budgetOptions={budgetOptionsByIntent[intent]}
        onRegionChange={setRegion}
        onBudgetChange={setBudgetValue}
        onReset={handleReset}
      />

      <PageWrapper className="py-12 md:py-16">
        <div className="space-y-6">
          {compareError ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {compareError}
            </p>
          ) : null}

          {results.length ? (
            <div className="grid gap-6">
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
            <div className="rounded-2xl border border-brand-border bg-white p-8">
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-brand-navy">No suburbs match those filters yet</h2>
                <p className="text-base leading-relaxed text-neutral-700">
                  Try widening the region or budget to bring more Brisbane suburbs back into view.
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
