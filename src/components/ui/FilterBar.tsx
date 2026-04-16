"use client";

import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { budgetOptionsByIntent, regionOptions } from "@/lib/mockData";
import type { BudgetOption, Intent, Region } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  intent: Intent;
  region: Region | "All Regions";
  appliedRegion: Region | "All Regions";
  budgetValue: string;
  appliedBudgetValue: string;
  budgetLabel: string;
  budgetOptions: BudgetOption[];
  resultCount: number;
  topMatch?: string;
  hasPendingChanges: boolean;
  onRegionChange: (value: Region | "All Regions") => void;
  onBudgetChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

function getSelectionLabel(options: BudgetOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? "All budgets";
}

export function FilterBar({
  intent,
  region,
  appliedRegion,
  budgetValue,
  appliedBudgetValue,
  budgetLabel,
  budgetOptions,
  resultCount,
  topMatch,
  hasPendingChanges,
  onRegionChange,
  onBudgetChange,
  onApply,
  onReset,
}: FilterBarProps) {
  const appliedBudgetLabel = getSelectionLabel(budgetOptionsByIntent[intent], appliedBudgetValue);
  const draftBudgetLabel = getSelectionLabel(budgetOptions, budgetValue);

  return (
    <div className="surface-panel p-5 sm:p-6 lg:p-7">
      <div className="space-y-4 border-b border-[rgba(17,32,51,0.08)] pb-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-blue/[0.08] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand-blue">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Control panel
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-navy">Refine the shortlist</h2>
          <p className="text-[0.95rem] leading-7 text-neutral-600">
            {hasPendingChanges
              ? "Changes stay in preview until you apply them."
              : resultCount > 0
                ? `${resultCount} suburbs in view${topMatch ? `, led by ${topMatch}.` : "."}`
                : "No suburbs match the current view yet."}
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <p className="field-label">Current view</p>
            <div className="flex flex-wrap gap-2">
              <span className="selection-chip">
                <strong>Region</strong>
                {appliedRegion}
              </span>
              <span className="selection-chip">
                <strong>{budgetLabel}</strong>
                {appliedBudgetLabel}
              </span>
            </div>
          </div>

          {hasPendingChanges ? (
            <div className="rounded-[1.1rem] border border-brand-blue/12 bg-brand-blue/[0.05] px-4 py-3.5">
              <p className="field-label text-brand-blue">Ready to apply</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="selection-chip border-brand-blue/12 bg-white/90">
                  <strong>Region</strong>
                  {region}
                </span>
                <span className="selection-chip border-brand-blue/12 bg-white/90">
                  <strong>{budgetLabel}</strong>
                  {draftBudgetLabel}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="space-y-2.5">
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

        <label className="space-y-2.5">
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

      <div className="mt-5 flex flex-col gap-3 border-t border-[rgba(17,32,51,0.08)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAButton
            type="button"
            size="lg"
            className={cn("rounded-full", !hasPendingChanges && "cursor-not-allowed")}
            disabled={!hasPendingChanges}
            onClick={onApply}
          >
            Apply filters
          </CTAButton>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(17,32,51,0.1)] bg-white/82 px-4 py-3 text-sm font-semibold tracking-tight text-neutral-700 transition hover:border-brand-blue/18 hover:text-brand-blue"
            onClick={onReset}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <p className="text-sm leading-6 text-neutral-500">
          {hasPendingChanges ? "Apply to update the results below." : "Showing the applied shortlist below."}
        </p>
      </div>
    </div>
  );
}
