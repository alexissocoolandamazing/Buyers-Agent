"use client";

import { ChevronDown } from "lucide-react";
import type { BudgetOption, Region } from "@/lib/types";

interface FilterBarProps {
  region: Region | "All Regions";
  budgetValue: string;
  budgetLabel: string;
  budgetOptions: BudgetOption[];
  onRegionChange: (value: Region | "All Regions") => void;
  onBudgetChange: (value: string) => void;
  onReset: () => void;
}

export function FilterBar({
  region,
  budgetValue,
  budgetLabel,
  budgetOptions,
  onRegionChange,
  onBudgetChange,
  onReset,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-40 border-b border-brand-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-4 md:grid-cols-2 lg:flex-1">
          <label className="space-y-2">
            <span className="font-sans text-sm font-medium uppercase tracking-wide text-neutral-600">Region</span>
            <div className="relative">
              <select
                value={region}
                onChange={(event) => onRegionChange(event.target.value as Region | "All Regions")}
                className="w-full appearance-none rounded-lg border border-brand-border bg-white px-4 py-3 pr-10 text-base text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="All Regions">All Regions</option>
                <option value="Inner City">Inner City</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="West">West</option>
                <option value="East-Bayside">East-Bayside</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
            </div>
          </label>

          <label className="space-y-2">
            <span className="font-sans text-sm font-medium uppercase tracking-wide text-neutral-600">{budgetLabel}</span>
            <div className="relative">
              <select
                value={budgetValue}
                onChange={(event) => onBudgetChange(event.target.value)}
                className="w-full appearance-none rounded-lg border border-brand-border bg-white px-4 py-3 pr-10 text-base text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
            </div>
          </label>
        </div>

        <button
          type="button"
          className="self-start text-sm font-medium text-brand-blue hover:underline"
          onClick={onReset}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}
