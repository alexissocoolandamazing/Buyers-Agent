"use client";

import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import type { BudgetOption, Region } from "@/lib/types";

interface FilterBarProps {
  region: Region | "All Regions";
  budgetValue: string;
  budgetLabel: string;
  budgetOptions: BudgetOption[];
  resultCount: number;
  topMatch?: string;
  onRegionChange: (value: Region | "All Regions") => void;
  onBudgetChange: (value: string) => void;
  onReset: () => void;
}

export function FilterBar({
  region,
  budgetValue,
  budgetLabel,
  budgetOptions,
  resultCount,
  topMatch,
  onRegionChange,
  onBudgetChange,
  onReset,
}: FilterBarProps) {
  return (
    <div className="surface-panel p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[rgba(17,32,51,0.08)] pb-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-blue/[0.08] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter shortlist
          </div>
          <p className="text-sm leading-7 text-neutral-600">
            {resultCount > 0
              ? `${resultCount} suburbs match the current brief${topMatch ? `, led by ${topMatch}.` : "."}`
              : "No suburbs match the current brief yet. Reset or widen the filters to explore more options."}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(17,32,51,0.1)] bg-white/80 px-4 py-2.5 text-sm font-semibold tracking-tight text-neutral-700 transition hover:border-brand-blue/18 hover:text-brand-blue"
          onClick={onReset}
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
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
              <option value="All Regions">All Regions</option>
              <option value="Inner City">Inner City</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="West">West</option>
              <option value="East-Bayside">East-Bayside</option>
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
    </div>
  );
}
