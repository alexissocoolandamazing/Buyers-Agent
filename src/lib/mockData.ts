import { brisbaneSuburbs } from "@/data/brisbaneSuburbs";
import {
  budgetOptionsByPathway,
  calculatePathwayScore,
  filterByBudget,
  filterByRegion,
  getScoreRows,
  methodologyWeightData,
} from "@/lib/recommendations";
import type { Pathway, RegionPreference } from "@/lib/types";

export * from "@/data/brisbaneSuburbs";
export * from "@/lib/recommendations";

export const suburbs = brisbaneSuburbs;
export const budgetOptionsByIntent = budgetOptionsByPathway;
export const defaultBudgetValueByIntent: Record<Pathway, string> = {
  rent: "any",
  buy: "any",
  invest: "any",
};

export { getScoreRows, methodologyWeightData };

export function getCompositeScore(suburb: (typeof brisbaneSuburbs)[number], intent: Pathway) {
  return calculatePathwayScore(suburb, intent, { pathway: intent });
}

export function getFilteredSuburbs(intent: Pathway, region: RegionPreference | "All Regions", budgetValue: string) {
  const normalizedRegion = region === "All Regions" ? "Anywhere" : region;
  return filterByBudget(filterByRegion(brisbaneSuburbs, normalizedRegion), intent, budgetValue).sort(
    (left, right) => getCompositeScore(right, intent) - getCompositeScore(left, intent)
  );
}
