import { brisbaneSuburbs, regionOptions } from "@/data/brisbaneSuburbs";
import type {
  BrisbaneSuburb,
  BudgetOption,
  BuyPropertyPreference,
  FilterOption,
  InvestRiskPreference,
  Pathway,
  Priority,
  RankedSuburb,
  RecommendationPreferences,
  RegionPreference,
  RentBedroomPreference,
  ScoreRowItem,
} from "@/lib/types";

export { brisbaneSuburbs, regionOptions };

export const budgetOptionsByPathway: Record<Pathway, BudgetOption[]> = {
  rent: [
    { label: "Any weekly rent", value: "any", minimum: null, maximum: null },
    { label: "Under $500/week", value: "under-500", minimum: null, maximum: 500 },
    { label: "$500-$650/week", value: "500-650", minimum: 500, maximum: 650 },
    { label: "$650-$800/week", value: "650-800", minimum: 650, maximum: 800 },
    { label: "$800+/week", value: "800-plus", minimum: 800, maximum: null },
  ],
  buy: [
    { label: "Any purchase budget", value: "any", minimum: null, maximum: null },
    { label: "Under $650k", value: "under-650", minimum: null, maximum: 650000 },
    { label: "$650k-$850k", value: "650-850", minimum: 650000, maximum: 850000 },
    { label: "$850k-$1.1m", value: "850-1100", minimum: 850000, maximum: 1100000 },
    { label: "$1.1m+", value: "1100-plus", minimum: 1100000, maximum: null },
  ],
  invest: [
    { label: "Any entry budget", value: "any", minimum: null, maximum: null },
    { label: "Under $650k", value: "under-650", minimum: null, maximum: 650000 },
    { label: "$650k-$850k", value: "650-850", minimum: 650000, maximum: 850000 },
    { label: "$850k-$1.1m", value: "850-1100", minimum: 850000, maximum: 1100000 },
    { label: "$1.1m+", value: "1100-plus", minimum: 1100000, maximum: null },
  ],
};

export const priorityOptionsByPathway: Record<Pathway, FilterOption<Priority>[]> = {
  rent: [
    { label: "Balanced lifestyle", value: "balanced" },
    { label: "Affordability", value: "affordability" },
    { label: "Transport access", value: "transport" },
    { label: "Parks, cafes, and lifestyle", value: "lifestyle" },
    { label: "Safety and quietness", value: "safety" },
  ],
  buy: [
    { label: "Balanced liveability", value: "balanced" },
    { label: "Affordability", value: "affordability" },
    { label: "Schools and family lifestyle", value: "schools" },
    { label: "Transport access", value: "transport" },
    { label: "Parks, cafes, and lifestyle", value: "lifestyle" },
  ],
  invest: [
    { label: "Balanced yield and growth", value: "balanced" },
    { label: "Rental return", value: "yield" },
    { label: "Growth potential", value: "growth" },
    { label: "Affordability", value: "affordability" },
    { label: "Safety and quietness", value: "safety" },
  ],
};

export const bedroomOptions: FilterOption<RentBedroomPreference>[] = [
  { label: "Studio/1 bed", value: "studio-1" },
  { label: "2 bed", value: "2-bed" },
  { label: "3 bed", value: "3-bed" },
  { label: "4+ bed", value: "4-plus" },
];

export const propertyTypeOptions: FilterOption<BuyPropertyPreference>[] = [
  { label: "Apartment/unit", value: "apartment" },
  { label: "Townhouse", value: "townhouse" },
  { label: "House", value: "house" },
  { label: "Flexible", value: "flexible" },
];

export const riskOptions: FilterOption<InvestRiskPreference>[] = [
  { label: "Safer lower-risk suburbs", value: "lower-risk" },
  { label: "Balanced yield and growth", value: "balanced" },
  { label: "Higher-risk high-yield areas", value: "higher-yield" },
  { label: "Unsure", value: "unsure" },
];

export const defaultPreferencesByPathway: Record<Pathway, RecommendationPreferences> = {
  rent: {
    pathway: "rent",
    budget: "any",
    region: "Anywhere",
    priority: "balanced",
    bedrooms: "2-bed",
  },
  buy: {
    pathway: "buy",
    budget: "any",
    region: "Anywhere",
    priority: "balanced",
    propertyType: "flexible",
  },
  invest: {
    pathway: "invest",
    budget: "any",
    region: "Anywhere",
    priority: "balanced",
    risk: "balanced",
  },
};

export const methodologyWeightData = [
  { label: "Affordability", rent: 28, buy: 22, invest: 18 },
  { label: "Transport", rent: 20, buy: 14, invest: 10 },
  { label: "Liveability", rent: 20, buy: 28, invest: 10 },
  { label: "Demand / yield", rent: 16, buy: 16, invest: 36 },
  { label: "Risk balance", rent: 16, buy: 20, invest: 26 },
];

function clampScore(value: number) {
  return Math.max(1, Math.min(100, Math.round(value)));
}

function getBudgetOption(pathway: Pathway, value?: string) {
  return budgetOptionsByPathway[pathway].find((option) => option.value === value) ?? budgetOptionsByPathway[pathway][0];
}

function getBudgetAmount(suburb: BrisbaneSuburb, pathway: Pathway) {
  return pathway === "rent" ? suburb.medianRentEstimate : suburb.medianBuyPriceEstimate;
}

function getYieldScore(suburb: BrisbaneSuburb) {
  return clampScore(42 + (suburb.estimatedYield - 3.2) * 18);
}

function getBudgetFitScore(suburb: BrisbaneSuburb, pathway: Pathway, budget?: string) {
  const option = getBudgetOption(pathway, budget);

  if (!option.maximum && !option.minimum) {
    return 72;
  }

  const amount = getBudgetAmount(suburb, pathway);

  if (option.maximum && amount <= option.maximum) {
    const headroom = (option.maximum - amount) / option.maximum;
    return clampScore(72 + headroom * 34);
  }

  if (option.maximum && amount > option.maximum) {
    const overspend = (amount - option.maximum) / option.maximum;
    return clampScore(68 - overspend * 90);
  }

  if (option.minimum && amount >= option.minimum) {
    return 76;
  }

  return 70;
}

function getPriorityScore(suburb: BrisbaneSuburb, priority?: Priority) {
  switch (priority) {
    case "affordability":
      return suburb.affordabilityScore;
    case "transport":
      return suburb.transportScore;
    case "schools":
      return suburb.schoolScore;
    case "yield":
      return getYieldScore(suburb);
    case "growth":
      return suburb.growthProxyScore;
    case "safety":
      return suburb.safetyScore;
    case "lifestyle":
      return suburb.lifestyleScore;
    default:
      return Math.round(
        (suburb.affordabilityScore +
          suburb.transportScore +
          suburb.schoolScore +
          suburb.lifestyleScore +
          suburb.safetyScore +
          suburb.growthProxyScore) /
          6
      );
  }
}

function getBedroomFit(suburb: BrisbaneSuburb, bedrooms?: RentBedroomPreference) {
  if (bedrooms === "studio-1") {
    return clampScore(suburb.transportScore * 0.48 + suburb.lifestyleScore * 0.34 + suburb.affordabilityScore * 0.18);
  }

  if (bedrooms === "3-bed" || bedrooms === "4-plus") {
    const familyWeight = bedrooms === "4-plus" ? 0.62 : 0.54;
    return clampScore(suburb.schoolScore * familyWeight + suburb.safetyScore * 0.26 + suburb.affordabilityScore * 0.2);
  }

  return clampScore(suburb.transportScore * 0.32 + suburb.affordabilityScore * 0.36 + suburb.lifestyleScore * 0.32);
}

function getPropertyTypeFit(suburb: BrisbaneSuburb, propertyType?: BuyPropertyPreference) {
  if (propertyType === "apartment") {
    return clampScore(suburb.transportScore * 0.42 + suburb.lifestyleScore * 0.35 + suburb.affordabilityScore * 0.23);
  }

  if (propertyType === "townhouse") {
    return clampScore(suburb.affordabilityScore * 0.34 + suburb.transportScore * 0.26 + suburb.schoolScore * 0.2 + suburb.growthProxyScore * 0.2);
  }

  if (propertyType === "house") {
    return clampScore(suburb.schoolScore * 0.36 + suburb.safetyScore * 0.28 + suburb.affordabilityScore * 0.22 + suburb.lifestyleScore * 0.14);
  }

  return clampScore(suburb.buyerScore * 0.6 + suburb.affordabilityScore * 0.2 + suburb.lifestyleScore * 0.2);
}

function getRiskFit(suburb: BrisbaneSuburb, risk?: InvestRiskPreference) {
  if (risk === "lower-risk") {
    return clampScore(suburb.safetyScore * 0.5 + suburb.transportScore * 0.18 + suburb.growthProxyScore * 0.18 + suburb.schoolScore * 0.14);
  }

  if (risk === "higher-yield") {
    return clampScore(getYieldScore(suburb) * 0.58 + suburb.affordabilityScore * 0.28 + suburb.growthProxyScore * 0.14);
  }

  return clampScore(suburb.safetyScore * 0.28 + getYieldScore(suburb) * 0.34 + suburb.growthProxyScore * 0.24 + suburb.affordabilityScore * 0.14);
}

export function filterByBudget(suburbs: BrisbaneSuburb[], pathway: Pathway, budget?: string) {
  const option = getBudgetOption(pathway, budget);

  if (!option.maximum) {
    return suburbs;
  }

  return suburbs.filter((suburb) => getBudgetAmount(suburb, pathway) <= option.maximum!);
}

export function filterByRegion(suburbs: BrisbaneSuburb[], region?: RegionPreference) {
  if (!region || region === "Anywhere") {
    return suburbs;
  }

  return suburbs.filter((suburb) => suburb.region === region);
}

export function calculateRentScore(suburb: BrisbaneSuburb, preferences: RecommendationPreferences = { pathway: "rent" }) {
  const budgetFit = getBudgetFitScore(suburb, "rent", preferences.budget);
  const bedroomFit = getBedroomFit(suburb, preferences.bedrooms);
  const priorityFit = getPriorityScore(suburb, preferences.priority);

  return clampScore(
    budgetFit * 0.26 +
      suburb.renterScore * 0.22 +
      suburb.transportScore * 0.18 +
      suburb.lifestyleScore * 0.12 +
      suburb.safetyScore * 0.1 +
      bedroomFit * 0.07 +
      priorityFit * 0.05
  );
}

export function calculateBuyScore(suburb: BrisbaneSuburb, preferences: RecommendationPreferences = { pathway: "buy" }) {
  const budgetFit = getBudgetFitScore(suburb, "buy", preferences.budget);
  const propertyFit = getPropertyTypeFit(suburb, preferences.propertyType);
  const priorityFit = getPriorityScore(suburb, preferences.priority);

  return clampScore(
    budgetFit * 0.22 +
      suburb.buyerScore * 0.22 +
      suburb.schoolScore * 0.16 +
      suburb.lifestyleScore * 0.14 +
      suburb.transportScore * 0.12 +
      suburb.growthProxyScore * 0.08 +
      propertyFit * 0.04 +
      priorityFit * 0.02
  );
}

export function calculateInvestScore(suburb: BrisbaneSuburb, preferences: RecommendationPreferences = { pathway: "invest" }) {
  const budgetFit = getBudgetFitScore(suburb, "invest", preferences.budget);
  const priorityFit = getPriorityScore(suburb, preferences.priority);
  const riskFit = getRiskFit(suburb, preferences.risk);

  return clampScore(
    suburb.investorScore * 0.24 +
      getYieldScore(suburb) * 0.22 +
      budgetFit * 0.16 +
      suburb.growthProxyScore * 0.14 +
      suburb.renterScore * 0.1 +
      riskFit * 0.1 +
      priorityFit * 0.04
  );
}

export function calculatePathwayScore(suburb: BrisbaneSuburb, pathway: Pathway, preferences: RecommendationPreferences) {
  if (pathway === "rent") {
    return calculateRentScore(suburb, preferences);
  }

  if (pathway === "buy") {
    return calculateBuyScore(suburb, preferences);
  }

  return calculateInvestScore(suburb, preferences);
}

function getMatchedSignals(suburb: BrisbaneSuburb, pathway: Pathway, preferences: RecommendationPreferences) {
  const signals: string[] = [];

  if (preferences.region && preferences.region !== "Anywhere" && suburb.region === preferences.region) {
    signals.push(preferences.region);
  }

  if (preferences.priority && preferences.priority !== "balanced") {
    const priorityLabel = priorityOptionsByPathway[pathway].find((option) => option.value === preferences.priority)?.label;
    if (priorityLabel) {
      signals.push(priorityLabel);
    }
  }

  if (pathway === "rent" && suburb.medianRentEstimate <= 650) {
    signals.push("Rent under $650/wk");
  }

  if (pathway === "buy" && suburb.schoolScore >= 80) {
    signals.push("Strong schools");
  }

  if (pathway === "invest" && suburb.estimatedYield >= 4.7) {
    signals.push("Higher seeded yield");
  }

  if (suburb.transportScore >= 84) {
    signals.push("Strong transport");
  }

  return signals.slice(0, 4);
}

export function sortByScore(
  suburbs: BrisbaneSuburb[],
  pathway: Pathway,
  preferences: RecommendationPreferences = { pathway }
): RankedSuburb[] {
  return [...suburbs]
    .map((suburb) => ({
      suburb,
      score: calculatePathwayScore(suburb, pathway, preferences),
      explanation: suburb.recommendationReasons[pathway],
      matchedSignals: getMatchedSignals(suburb, pathway, preferences),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.suburb.name.localeCompare(right.suburb.name);
    });
}

export function getRecommendedSuburbs(
  preferences: RecommendationPreferences,
  options: { limit?: number; fallback?: boolean } = {}
) {
  const pathway = preferences.pathway;
  const limit = options.limit ?? 8;
  const regionFiltered = filterByRegion(brisbaneSuburbs, preferences.region);
  let pool = filterByBudget(regionFiltered, pathway, preferences.budget);

  if (options.fallback && pool.length < Math.min(3, limit)) {
    pool = regionFiltered.length ? regionFiltered : brisbaneSuburbs;
  }

  return sortByScore(pool, pathway, preferences).slice(0, limit);
}

export function getTopSuburbs(pathway: Pathway, limit = 3) {
  return getRecommendedSuburbs(defaultPreferencesByPathway[pathway], { limit });
}

export function getLandingHighlights() {
  return {
    rent: getTopSuburbs("rent", 1)[0],
    buy: getTopSuburbs("buy", 1)[0],
    invest: getTopSuburbs("invest", 1)[0],
  };
}

export function getBudgetLabel(pathway: Pathway, value?: string) {
  return getBudgetOption(pathway, value).label;
}

export function getOptionLabel<TValue extends string>(options: FilterOption<TValue>[], value?: TValue) {
  return options.find((option) => option.value === value)?.label ?? options[0]?.label ?? "Any";
}

export function getScoreRows(suburb: BrisbaneSuburb, pathway: Pathway): ScoreRowItem[] {
  if (pathway === "rent") {
    return [
      {
        label: "Rent affordability",
        score: suburb.affordabilityScore,
        reason: "Lower seeded rent and price pressure improve the rental fit score.",
      },
      {
        label: "Transport access",
        score: suburb.transportScore,
        reason: suburb.recommendationReasons.rent,
      },
      {
        label: "Lifestyle and safety",
        score: Math.round((suburb.lifestyleScore + suburb.safetyScore) / 2),
        reason: "This blends day-to-day amenity with the quieter, safer feel renters often ask for.",
      },
    ];
  }

  if (pathway === "buy") {
    return [
      {
        label: "Purchase fit",
        score: suburb.affordabilityScore,
        reason: "This reflects relative entry price against the wider Greater Brisbane seed set.",
      },
      {
        label: "Schools and liveability",
        score: Math.round((suburb.schoolScore + suburb.lifestyleScore + suburb.safetyScore) / 3),
        reason: suburb.recommendationReasons.buy,
      },
      {
        label: "Long-term signal",
        score: suburb.growthProxyScore,
        reason: "Growth proxy blends infrastructure, demand depth, scarcity, and planned-area signals.",
      },
    ];
  }

  return [
    {
      label: "Estimated yield",
      score: getYieldScore(suburb),
      reason: "Yield is estimated from seeded rent and buy profiles, not live transaction data.",
    },
    {
      label: "Demand signal",
      score: suburb.renterScore,
      reason: suburb.recommendationReasons.invest,
    },
    {
      label: "Risk balance",
      score: Math.round((suburb.safetyScore + suburb.transportScore + suburb.affordabilityScore) / 3),
      reason: "Risk balance rewards access, affordability, and safer suburb-level signals.",
    },
  ];
}

export function toQueryString(preferences: RecommendationPreferences) {
  const params = new URLSearchParams();

  params.set("budget", preferences.budget ?? "any");
  params.set("region", preferences.region ?? "Anywhere");
  params.set("priority", preferences.priority ?? "balanced");

  if (preferences.pathway === "rent" && preferences.bedrooms) {
    params.set("bedrooms", preferences.bedrooms);
  }

  if (preferences.pathway === "buy" && preferences.propertyType) {
    params.set("propertyType", preferences.propertyType);
  }

  if (preferences.pathway === "invest" && preferences.risk) {
    params.set("risk", preferences.risk);
  }

  return params.toString();
}
