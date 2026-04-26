"use client";

import { ChevronDown, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { regionOptions } from "@/data/brisbaneSuburbs";
import type { BudgetOption, FilterOption, Priority, RegionPreference } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  budgetLabel: string;
  region: RegionPreference;
  budgetValue: string;
  priorityValue: Priority;
  secondaryValue: string;
  secondaryLabel: string;
  budgetOptions: BudgetOption[];
  priorityOptions: FilterOption<Priority>[];
  secondaryOptions: FilterOption[];
  hasPendingChanges: boolean;
  resultCount: number;
  onRegionChange: (value: RegionPreference) => void;
  onBudgetChange: (value: string) => void;
  onPriorityChange: (value: Priority) => void;
  onSecondaryChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export function FilterPanel({
  budgetLabel,
  region,
  budgetValue,
  priorityValue,
  secondaryValue,
  secondaryLabel,
  budgetOptions,
  priorityOptions,
  secondaryOptions,
  hasPendingChanges,
  resultCount,
  onRegionChange,
  onBudgetChange,
  onPriorityChange,
  onSecondaryChange,
  onApply,
  onReset,
}: FilterPanelProps) {
  return (
    <div className="surface-panel p-4 sm:p-5">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex shrink-0 items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-blue/[0.07] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </span>
            <span className="text-sm text-neutral-500">
              {resultCount} {resultCount === 1 ? "suburb" : "suburbs"}
            </span>
          </div>

          <p className="max-w-xl text-sm leading-6 text-neutral-600">
            Adjust the brief, then apply the search to re-rank suburb-level recommendations.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1.5">
            <span className="field-label">Region</span>
            <div className="relative">
              <select
                value={region}
                onChange={(event) => onRegionChange(event.target.value as RegionPreference)}
                className="field-control py-2.5 pr-11 text-[0.92rem]"
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

          <label className="space-y-1.5">
            <span className="field-label">{budgetLabel}</span>
            <div className="relative">
              <select
                value={budgetValue}
                onChange={(event) => onBudgetChange(event.target.value)}
                className="field-control py-2.5 pr-11 text-[0.92rem]"
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

          <label className="space-y-1.5">
            <span className="field-label">Priority</span>
            <div className="relative">
              <select
                value={priorityValue}
                onChange={(event) => onPriorityChange(event.target.value as Priority)}
                className="field-control py-2.5 pr-11 text-[0.92rem]"
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            </div>
          </label>

          <label className="space-y-1.5">
            <span className="field-label">{secondaryLabel}</span>
            <div className="relative">
              <select
                value={secondaryValue}
                onChange={(event) => onSecondaryChange(event.target.value)}
                className="field-control py-2.5 pr-11 text-[0.92rem]"
              >
                {secondaryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            </div>
          </label>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end">
          <CTAButton
            type="button"
            size="default"
            className={cn(
              "gap-2 rounded-full",
              hasPendingChanges && "animate-[pulse_2s_ease-in-out_1] shadow-[0_0_24px_-6px_rgba(29,95,168,0.5)]"
            )}
            onClick={onApply}
          >
            <Search className="h-4 w-4" />
            Apply search
          </CTAButton>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(17,32,51,0.1)] bg-white/82 px-4 py-3 text-sm font-semibold tracking-tight text-neutral-600 transition hover:border-brand-blue/18 hover:text-brand-blue"
            onClick={onReset}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
