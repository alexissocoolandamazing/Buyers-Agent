export type Pathway = "rent" | "buy" | "invest";

export type Intent = Pathway;

export type Region =
  | "Inner North"
  | "Inner South"
  | "Inner East"
  | "Inner West"
  | "Middle Ring"
  | "Outer North"
  | "Outer South"
  | "Outer East"
  | "Outer West";

export type RegionPreference = Region | "Anywhere";

export type Priority =
  | "affordability"
  | "transport"
  | "schools"
  | "yield"
  | "growth"
  | "safety"
  | "lifestyle"
  | "balanced";

export type RentBedroomPreference =
  | "studio-1"
  | "2-bed"
  | "3-bed"
  | "4-plus";

export type BuyPropertyPreference =
  | "apartment"
  | "townhouse"
  | "house"
  | "flexible";

export type InvestRiskPreference =
  | "lower-risk"
  | "balanced"
  | "higher-yield"
  | "unsure";

export type ConfidenceLevel = "High" | "Medium" | "Emerging";

export interface BrisbaneSuburb {
  id: string;
  name: string;
  region: Region;
  councilArea: string;
  postcode: string;
  latitude: number;
  longitude: number;
  summary: string;
  lifestyleTags: string[];
  bestFor: Pathway[];
  medianRentEstimate: number;
  medianBuyPriceEstimate: number;
  estimatedYield: number;
  affordabilityScore: number;
  transportScore: number;
  schoolScore: number;
  lifestyleScore: number;
  safetyScore: number;
  growthProxyScore: number;
  investorScore: number;
  renterScore: number;
  buyerScore: number;
  confidenceLevel: ConfidenceLevel;
  dataNotes: string;
  nearbyFeatures: string[];
  recommendationReasons: Record<Pathway, string>;
}

export type Suburb = BrisbaneSuburb;

export interface FilterOption<TValue extends string = string> {
  label: string;
  value: TValue;
  description?: string;
}

export interface BudgetOption extends FilterOption {
  minimum: number | null;
  maximum: number | null;
}

export interface RecommendationPreferences {
  pathway: Pathway;
  priority?: Priority;
  budget?: string;
  region?: RegionPreference;
  bedrooms?: RentBedroomPreference;
  propertyType?: BuyPropertyPreference;
  risk?: InvestRiskPreference;
}

export interface RankedSuburb {
  suburb: BrisbaneSuburb;
  score: number;
  explanation: string;
  matchedSignals: string[];
}

export interface ScoreRowItem {
  label: string;
  score: number;
  reason: string;
}
