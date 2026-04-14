export type Region = "Inner City" | "North" | "South" | "West" | "East-Bayside";

export type Intent = "rent" | "buy" | "invest";

export interface Suburb {
  id: string;
  name: string;
  region: Region;
  shortDescription: string;
  rentScores: {
    affordability: number;
    rentToValue: number;
    amenity: number;
    reasons: [string, string, string];
  };
  buyScores: {
    purchaseValue: number;
    lifestyle: number;
    familyLiveability: number;
    reasons: [string, string, string];
  };
  investScores: {
    yield: number;
    entryPrice: number;
    demand: number;
    reasons: [string, string, string];
  };
  localFactors: {
    schools: string;
    shopping: string;
    transport: string;
    parkAccess: string;
  };
  verdict: string;
  tags: {
    rent?: string;
    buy?: string;
    invest?: string;
  };
  weeklyRent: number;
  medianPrice: number;
  grossYield: number;
}

export interface BudgetOption {
  label: string;
  value: string;
  maximum: number | null;
}

export interface ScoreRowItem {
  label: string;
  score: number;
  reason: string;
}
