"use client";

import { motion, useReducedMotion } from "framer-motion";
import { startTransition, useMemo, useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ComparePanel } from "@/components/ui/ComparePanel";
import { FilterPanel } from "@/components/ui/FilterPanel";
import { PageHero } from "@/components/ui/PageHero";
import { ResultsList } from "@/components/ui/ResultsList";
import {
  bedroomOptions,
  brisbaneSuburbs,
  budgetOptionsByPathway,
  defaultPreferencesByPathway,
  getBudgetLabel,
  getOptionLabel,
  getRecommendedSuburbs,
  priorityOptionsByPathway,
  propertyTypeOptions,
  riskOptions,
} from "@/lib/recommendations";
import type {
  BuyPropertyPreference,
  InvestRiskPreference,
  Pathway,
  Priority,
  RecommendationPreferences,
  RegionPreference,
  RentBedroomPreference,
} from "@/lib/types";
import { cn } from "@/lib/utils";

interface PropertyExplorerProps {
  intent: Pathway;
  title: string;
  description: string;
  budgetLabel: string;
  initialParams?: Record<string, string | string[] | undefined>;
}

interface ExplorerState {
  region: RegionPreference;
  budget: string;
  priority: Priority;
  secondary: string;
}

const RESULTS_PER_PAGE = 6;

const intentEyebrows: Record<Pathway, string> = {
  rent: "Rental recommendations",
  buy: "Buyer recommendations",
  invest: "Investor recommendations",
};

function readParam(params: PropertyExplorerProps["initialParams"], key: string) {
  const value = params?.[key];
  return Array.isArray(value) ? value[0] : value;
}

function optionValues(options: Array<{ value: string }>) {
  return new Set(options.map((option) => option.value));
}

function getSecondaryConfig(pathway: Pathway) {
  if (pathway === "rent") {
    return {
      key: "bedrooms",
      label: "Bedrooms",
      options: bedroomOptions,
      defaultValue: defaultPreferencesByPathway.rent.bedrooms ?? "2-bed",
    };
  }

  if (pathway === "buy") {
    return {
      key: "propertyType",
      label: "Property type",
      options: propertyTypeOptions,
      defaultValue: defaultPreferencesByPathway.buy.propertyType ?? "flexible",
    };
  }

  return {
    key: "risk",
    label: "Risk appetite",
    options: riskOptions,
    defaultValue: defaultPreferencesByPathway.invest.risk ?? "balanced",
  };
}

function getInitialState(pathway: Pathway, params?: PropertyExplorerProps["initialParams"]): ExplorerState {
  const defaults = defaultPreferencesByPathway[pathway];
  const secondaryConfig = getSecondaryConfig(pathway);

  const budget = readParam(params, "budget");
  const region = readParam(params, "region");
  const priority = readParam(params, "priority");
  const secondary = readParam(params, secondaryConfig.key);

  const budgetValues = optionValues(budgetOptionsByPathway[pathway]);
  const regionValues = new Set(["Anywhere", "Inner North", "Inner South", "Inner East", "Inner West", "Middle Ring", "Outer North", "Outer South", "Outer East", "Outer West"]);
  const priorityValues = optionValues(priorityOptionsByPathway[pathway]);
  const secondaryValues = optionValues(secondaryConfig.options);

  return {
    region: region && regionValues.has(region) ? (region as RegionPreference) : defaults.region ?? "Anywhere",
    budget: budget && budgetValues.has(budget) ? budget : defaults.budget ?? "any",
    priority: priority && priorityValues.has(priority) ? (priority as Priority) : defaults.priority ?? "balanced",
    secondary: secondary && secondaryValues.has(secondary) ? secondary : secondaryConfig.defaultValue,
  };
}

function toPreferences(pathway: Pathway, state: ExplorerState): RecommendationPreferences {
  const preferences: RecommendationPreferences = {
    pathway,
    region: state.region,
    budget: state.budget,
    priority: state.priority,
  };

  if (pathway === "rent") {
    preferences.bedrooms = state.secondary as RentBedroomPreference;
  }

  if (pathway === "buy") {
    preferences.propertyType = state.secondary as BuyPropertyPreference;
  }

  if (pathway === "invest") {
    preferences.risk = state.secondary as InvestRiskPreference;
  }

  return preferences;
}

export function PropertyExplorer({
  intent,
  title,
  description,
  budgetLabel,
  initialParams,
}: PropertyExplorerProps) {
  const pathway = intent;
  const reduceMotion = useReducedMotion();
  const secondaryConfig = useMemo(() => getSecondaryConfig(pathway), [pathway]);
  const initialState = useMemo(() => getInitialState(pathway, initialParams), [pathway, initialParams]);

  const [draftState, setDraftState] = useState<ExplorerState>(initialState);
  const [appliedState, setAppliedState] = useState<ExplorerState>(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  const appliedPreferences = toPreferences(pathway, appliedState);
  const results = getRecommendedSuburbs(appliedPreferences, { limit: brisbaneSuburbs.length });
  const totalPages = Math.max(1, Math.ceil(results.length / RESULTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * RESULTS_PER_PAGE;
  const pageResults = results.slice(pageStart, pageStart + RESULTS_PER_PAGE);
  const hasPendingChanges = JSON.stringify(draftState) !== JSON.stringify(appliedState);
  const appliedBudgetLabel = getBudgetLabel(pathway, appliedState.budget);
  const appliedPriorityLabel = getOptionLabel(priorityOptionsByPathway[pathway], appliedState.priority);

  const comparedSuburbs = compareIds
    .map((id) => brisbaneSuburbs.find((suburb) => suburb.id === id))
    .filter((suburb): suburb is (typeof brisbaneSuburbs)[number] => Boolean(suburb));

  function updateDraftState(partial: Partial<ExplorerState>) {
    setDraftState((current) => ({ ...current, ...partial }));
  }

  function clearCompareState() {
    setCompareIds([]);
    setCompareOpen(false);
    setCompareError(null);
  }

  function handleApply() {
    startTransition(() => {
      setAppliedState(draftState);
      setCurrentPage(1);
      clearCompareState();
    });
  }

  function handleReset() {
    startTransition(() => {
      const resetState = getInitialState(pathway);
      setDraftState(resetState);
      setAppliedState(resetState);
      setCurrentPage(1);
      clearCompareState();
    });
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
        setCompareError("Compare supports up to 3 suburbs at a time.");
        return current;
      }

      const next = [...current, id];
      if (next.length >= 2) {
        setCompareOpen(true);
      }

      return next;
    });
  }

  function handlePageChange(page: number) {
    const nextPage = Math.max(1, Math.min(totalPages, page));

    if (nextPage === safeCurrentPage) {
      return;
    }

    setCurrentPage(nextPage);
    document.getElementById("property-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const outerSpacingClassName = cn(
    "pt-1 sm:pt-2 lg:pt-3",
    comparedSuburbs.length >= 2
      ? compareOpen
        ? "pb-[20rem] md:pb-[17rem]"
        : "pb-[8.5rem] md:pb-[9.5rem]"
      : "pb-16 sm:pb-20 lg:pb-24"
  );

  return (
    <>
      <section className="relative overflow-hidden px-0 pb-0 pt-6 sm:pt-8 lg:pt-10">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(29,95,168,0.1),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(187,154,103,0.08),transparent_28%)]" />

        <PageWrapper animate={false}>
          <div className="space-y-6">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <PageHero eyebrow={intentEyebrows[pathway]} title={title} description={description} />
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <FilterPanel
                region={draftState.region}
                budgetValue={draftState.budget}
                priorityValue={draftState.priority}
                secondaryValue={draftState.secondary}
                secondaryLabel={secondaryConfig.label}
                budgetLabel={budgetLabel}
                budgetOptions={budgetOptionsByPathway[pathway]}
                priorityOptions={priorityOptionsByPathway[pathway]}
                secondaryOptions={secondaryConfig.options}
                hasPendingChanges={hasPendingChanges}
                resultCount={results.length}
                onRegionChange={(region) => updateDraftState({ region })}
                onBudgetChange={(budget) => updateDraftState({ budget })}
                onPriorityChange={(priority) => updateDraftState({ priority })}
                onSecondaryChange={(secondary) => updateDraftState({ secondary })}
                onApply={handleApply}
                onReset={handleReset}
              />
            </motion.div>
          </div>
        </PageWrapper>
      </section>

      <PageWrapper animate={false} className={outerSpacingClassName}>
        <div className="space-y-5">
          {compareError ? (
            <p className="rounded-[1.15rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
              {compareError}
            </p>
          ) : null}

          <ResultsList
            pathway={pathway}
            results={results}
            pageResults={pageResults}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            appliedRegion={appliedState.region}
            appliedBudgetLabel={appliedBudgetLabel}
            appliedPriorityLabel={appliedPriorityLabel}
            onPageChange={handlePageChange}
            onReset={handleReset}
            compareIds={compareIds}
            onCompareToggle={handleCompareToggle}
          />
        </div>
      </PageWrapper>

      {pathway === "rent" && comparedSuburbs.length >= 2 ? (
        <ComparePanel
          suburbs={comparedSuburbs}
          open={compareOpen}
          onToggleOpen={() => setCompareOpen((current) => !current)}
          onClose={clearCompareState}
        />
      ) : null}
    </>
  );
}
