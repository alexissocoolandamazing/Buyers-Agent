"use client";

import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { regionOptions } from "@/lib/mockData";
import type { BudgetOption, Region } from "@/lib/types";

interface SummaryItem {
  label: string;
  value: string;
}

interface FilterPanelProps {
  title: string;
  description: string;
  budgetLabel: string;
  region: Region | "All Regions";
  budgetValue: string;
  budgetOptions: BudgetOption[];
  summaryItems: SummaryItem[];
  pendingSummaryItems?: SummaryItem[];
  hasPendingChanges: boolean;
  helperText: string;
  columns?: 2 | 3;
  onRegionChange: (value: Region | "All Regions") => void;
  onBudgetChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export function FilterPanel({
  title,
  description,
  budgetLabel,
  region,
  budgetValue,
  budgetOptions,
  summaryItems,
  pendingSummaryItems,
  hasPendingChanges,
  helperText,
  columns = 2,
  onRegionChange,
  onBudgetChange,
  onApply,
  onReset,
}: FilterPanelProps) {
  const controlGridClass = columns === 3 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2";

  return (
    <div className="surface-panel h-full p-6 sm:p-7">
      <div className="space-y-6">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-blue/[0.07] px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </span>

          <div className="space-y-2.5">
            <h2 className="text-[1.65rem] font-semibold tracking-tight text-brand-navy sm:text-[1.8rem]">
              {title}
            </h2>
            <p className="max-w-2xl text-[0.96rem] leading-7 text-neutral-600">{description}</p>
          </div>

          <div className="space-y-2.5">
            <p className="field-label">Current view</p>
            <div className="flex flex-wrap gap-2.5">
              {summaryItems.map((item) => (
                <span
                  key={item.label}
                  className="selection-chip rounded-full border-[rgba(17,32,51,0.08)] bg-white/84 px-3.5 py-2"
                >
                  <strong>{item.label}</strong>
                  {item.value}
                </span>
              ))}
            </div>
          </div>

          {hasPendingChanges && pendingSummaryItems?.length ? (
            <div className="rounded-[1.15rem] border border-brand-blue/12 bg-brand-blue/[0.05] px-4 py-3.5">
              <p className="text-sm leading-6 text-brand-navy">
                Pending changes:
                {" "}
                {pendingSummaryItems.map((item) => `${item.label} ${item.value}`).join(" • ")}
              </p>
            </div>
          ) : (
            <div className="rounded-[1.15rem] border border-[rgba(17,32,51,0.08)] bg-white/76 px-4 py-3.5">
              <p className="text-sm leading-6 text-neutral-600">{helperText}</p>
            </div>
          )}
        </div>

        <div className="border-t border-[rgba(17,32,51,0.08)] pt-6">
          <div className={`grid gap-5 ${controlGridClass}`}>
            <label className="space-y-3">
              <span className="field-label">Region</span>
              <div className="relative">
                <select
                  value={region}
                  onChange={(event) => onRegionChange(event.target.value as Region | "All Regions")}
                  className="field-control pr-11"
                >
                  {regionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              </div>
            </label>

            <label className="space-y-3">
              <span className="field-label">{budgetLabel}</span>
              <div className="relative">
                <select
                  value={budgetValue}
                  onChange={(event) => onBudgetChange(event.target.value)}
                  className="field-control pr-11"
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              </div>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-[rgba(17,32,51,0.08)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton
                type="button"
                size="lg"
                className="rounded-full"
                disabled={!hasPendingChanges}
                onClick={onApply}
              >
                Apply filters
              </CTAButton>

              <CTAButton
                type="button"
                variant="secondary"
                size="lg"
                className="rounded-full"
                onClick={onReset}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </CTAButton>
            </div>

            {hasPendingChanges ? (
              <p className="max-w-xs text-sm leading-6 text-neutral-500">{helperText}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
