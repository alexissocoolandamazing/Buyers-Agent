import type { BudgetOption, Intent, Region, ScoreRowItem, Suburb } from "@/lib/types";

export const suburbs: Suburb[] = [
  {
    id: "new-farm",
    name: "New Farm",
    region: "Inner City",
    shortDescription:
      "Riverfront prestige with lush parkland, high-end apartments, and one of Brisbane's most polished village lifestyles.",
    rentScores: {
      affordability: 6.7,
      rentToValue: 7.2,
      amenity: 9.4,
      reasons: [
        "Weekly rents sit high, but affluent tenant demand keeps premium stock moving with relatively little discounting.",
        "Rental pricing is still broadly supported by owner-occupier values for tightly held riverfront and village stock.",
        "Howard Smith Wharves, the CityCat, and New Farm Park keep daily convenience at an elite level.",
      ],
    },
    buyScores: {
      purchaseValue: 6.8,
      lifestyle: 9.6,
      familyLiveability: 7.1,
      reasons: [
        "Prices are expensive, but scarcity and architectural quality help defend long-term owner-occupier value.",
        "Walkable dining, river access, and direct CBD connectivity make it one of Brisbane's strongest lifestyle buys.",
        "It suits professional households well, though yard depth and school catchment choice are more constrained.",
      ],
    },
    investScores: {
      yield: 5.9,
      entryPrice: 4.8,
      demand: 9.1,
      reasons: [
        "Gross yield is modest, reflecting the suburb's premium capital base rather than weak tenant demand.",
        "The entry point is high, which narrows the number of investors who can sensibly compete here.",
        "Low vacancy, prestige positioning, and enduring inner-ring demand keep long-term pressure intact.",
      ],
    },
    localFactors: {
      schools: "4 schools within 2km",
      shopping: "James Street retail 1.4km",
      transport: "CityCat and bus connections",
      parkAccess: "New Farm Park on the doorstep",
    },
    verdict:
      "New Farm ranks highly when lifestyle matters more than pure price efficiency. It is the sort of suburb buyers stretch for because the day-to-day experience is unusually complete. The trade-off is straightforward: the price of admission is high, but so is the quality of demand.",
    tags: {
      buy: "Prestige pick",
      invest: "Higher risk / upside",
    },
    weeklyRent: 780,
    medianPrice: 1_780_000,
    grossYield: 3.5,
  },
  {
    id: "paddington",
    name: "Paddington",
    region: "Inner City",
    shortDescription:
      "Character homes, walkable ridgelines, and a polished café strip make Paddington one of the city's most magnetic urban suburbs.",
    rentScores: {
      affordability: 7.6,
      rentToValue: 7.9,
      amenity: 8.9,
      reasons: [
        "Rents are elevated, but they still undercut some prestige riverfront addresses while delivering strong amenity.",
        "Character homes and renovated townhouses lease well relative to the suburb's capital values.",
        "Latrobe Terrace, Suncorp access, and a quick CBD run keep convenience consistently strong.",
      ],
    },
    buyScores: {
      purchaseValue: 7.8,
      lifestyle: 9.0,
      familyLiveability: 7.6,
      reasons: [
        "Median pricing remains steep, though the suburb still looks defensible against its level of demand and scarcity.",
        "Retail, dining, and inner-city access create a polished owner-occupier proposition.",
        "Families get decent schooling and park access, though sites are tighter and topography can reduce ease.",
      ],
    },
    investScores: {
      yield: 6.5,
      entryPrice: 6.4,
      demand: 8.7,
      reasons: [
        "Yield is moderate rather than standout, but vacancy pressure remains healthy for character stock.",
        "The buy-in is still high enough to limit pure cash-flow performance on entry.",
        "The suburb benefits from near-CBD demand, renovation appeal, and deep buyer recognition.",
      ],
    },
    localFactors: {
      schools: "3 schools within 1.5km",
      shopping: "Rosalie Village and IGA nearby",
      transport: "Frequent bus links to the CBD",
      parkAccess: "Milton Park and Ithaca Creek trails",
    },
    verdict:
      "Paddington sits high because it offers a rare mix of character, convenience, and repeat demand. It does not win on headline affordability, but it repeatedly wins on how liveable it feels in practice. For buyers who value walkability and enduring appeal, it remains one of the cleaner inner-city calls.",
    tags: {
      rent: "Best walkable rent",
      buy: "Character value",
      invest: "Higher risk / upside",
    },
    weeklyRent: 720,
    medianPrice: 1_320_000,
    grossYield: 3.8,
  },
  {
    id: "chermside",
    name: "Chermside",
    region: "North",
    shortDescription:
      "A practical northside hub with major retail, health infrastructure, and rent levels that still feel accessible relative to amenity.",
    rentScores: {
      affordability: 8.5,
      rentToValue: 8.1,
      amenity: 8.2,
      reasons: [
        "Weekly rent remains comparatively manageable for a suburb with this level of convenience and apartment supply.",
        "Rent levels are supported by demand from hospital, retail, and airport-linked workers.",
        "Westfield, the Prince Charles precinct, and major bus corridors make everyday access easy.",
      ],
    },
    buyScores: {
      purchaseValue: 8.4,
      lifestyle: 7.8,
      familyLiveability: 8.0,
      reasons: [
        "The suburb still sits below many inner-ring alternatives on price while keeping services strong.",
        "Lifestyle is more practical than aspirational, but convenience is consistent and reliable.",
        "Families benefit from nearby schools, large-format retail, and access to healthcare and arterial roads.",
      ],
    },
    investScores: {
      yield: 8.2,
      entryPrice: 7.9,
      demand: 8.6,
      reasons: [
        "Gross yield stays well above many prestige suburbs, which keeps cash flow comparatively resilient.",
        "The median entry point remains accessible for investors who want northside exposure without blue-chip pricing.",
        "Employment nodes and transport connectivity keep tenant demand broad rather than overly niche.",
      ],
    },
    localFactors: {
      schools: "5 schools within 2km",
      shopping: "Westfield Chermside 400m",
      transport: "Major bus interchange to CBD",
      parkAccess: "Marchant Park nearby",
    },
    verdict:
      "Chermside ranks well because it is one of the most balanced practical suburbs in the north. It rarely feels glamorous, but it consistently delivers on affordability, infrastructure, and demand depth. That combination is exactly why it works so well for renters and entry-level investors.",
    tags: {
      rent: "Best cheap rent",
      invest: "Best yield",
    },
    weeklyRent: 560,
    medianPrice: 820_000,
    grossYield: 4.9,
  },
  {
    id: "wynnum",
    name: "Wynnum",
    region: "East-Bayside",
    shortDescription:
      "Bayside charm, stronger lifestyle appeal, and a gentler entry point than many prestige waterside pockets.",
    rentScores: {
      affordability: 7.8,
      rentToValue: 7.6,
      amenity: 8.4,
      reasons: [
        "Rents are no longer cheap, but they still compare favourably with equivalent lifestyle suburbs closer to the river.",
        "Rental pricing is supported by owner-occupier interest without feeling wildly detached from value.",
        "The esplanade, train access, and a genuine village feel give the suburb strong day-to-day appeal.",
      ],
    },
    buyScores: {
      purchaseValue: 7.9,
      lifestyle: 8.7,
      familyLiveability: 8.4,
      reasons: [
        "Wynnum remains more attainable than several inner-city lifestyle markets with a similar emotional pull.",
        "Water access, cafés, and a slower rhythm create a strong owner-occupier proposition.",
        "Families get school choice, green space, and a less compressed street environment than the inner ring.",
      ],
    },
    investScores: {
      yield: 7.4,
      entryPrice: 7.5,
      demand: 8.3,
      reasons: [
        "Yield is respectable rather than elite, supported by consistent tenant demand for bayside living.",
        "The entry point is still moderate enough to remain investable without forcing into prestige pricing.",
        "Migration toward lifestyle-driven suburbs keeps long-term demand pressure constructive.",
      ],
    },
    localFactors: {
      schools: "4 schools within 2km",
      shopping: "Wynnum Central 500m",
      transport: "Train line direct to the CBD",
      parkAccess: "Waterfront foreshore and parks",
    },
    verdict:
      "Wynnum earns its place because it offers real lifestyle upside without demanding top-tier prestige pricing. The bayside setting gives it emotional pull, while the rail line keeps it grounded in daily practicality. It is one of the cleaner eastside options for buyers wanting both liveability and future demand.",
    tags: {
      buy: "Lifestyle upside",
      invest: "Long-term demand",
    },
    weeklyRent: 610,
    medianPrice: 960_000,
    grossYield: 4.3,
  },
  {
    id: "kenmore",
    name: "Kenmore",
    region: "West",
    shortDescription:
      "A leafy western suburb known for larger family homes, schooling depth, and a calmer pace than the inner ring.",
    rentScores: {
      affordability: 7.2,
      rentToValue: 7.4,
      amenity: 7.8,
      reasons: [
        "Rents are still manageable for family-sized homes compared with tighter blue-chip western suburbs.",
        "Pricing broadly aligns with the suburb's larger land component and family-oriented housing stock.",
        "Amenity is more car-based, but schools, shopping, and green space remain solid.",
      ],
    },
    buyScores: {
      purchaseValue: 8.1,
      lifestyle: 7.6,
      familyLiveability: 9.0,
      reasons: [
        "Kenmore still offers bigger homes and blocks at a discount to prestige western neighbours.",
        "Lifestyle is quieter and less walkable, but the trade-off suits families prioritising space.",
        "School access, parks, and lower-traffic residential streets keep family credentials strong.",
      ],
    },
    investScores: {
      yield: 6.8,
      entryPrice: 7.2,
      demand: 7.4,
      reasons: [
        "Yield is modest, reflecting the family-home profile rather than weak rental demand.",
        "The price point remains more manageable than many western suburbs with similar schooling appeal.",
        "Demand is stable, though growth pressure can be less urgent than in tighter inner-ring markets.",
      ],
    },
    localFactors: {
      schools: "6 schools within 2.5km",
      shopping: "Kenmore Village and Plaza nearby",
      transport: "Express bus corridor to CBD",
      parkAccess: "Creek reserves and local sport fields",
    },
    verdict:
      "Kenmore ranks well for buyers who care more about family liveability than short-term buzz. It gives up some walkability, but it compensates with land, school choice, and calmer residential streets. For households wanting western-suburbs access without upper-tier pricing, it remains very defensible.",
    tags: {
      buy: "Family favourite",
    },
    weeklyRent: 650,
    medianPrice: 980_000,
    grossYield: 4.0,
  },
  {
    id: "taringa",
    name: "Taringa",
    region: "West",
    shortDescription:
      "Compact, connected, and consistently popular with students, professionals, and buyers wanting direct western access to the CBD.",
    rentScores: {
      affordability: 8.3,
      rentToValue: 8.0,
      amenity: 8.8,
      reasons: [
        "Rent remains competitive relative to nearby premium western suburbs while still offering train access.",
        "Lease pricing is well supported by tenant depth tied to UQ, Toowong, and the CBD.",
        "Train, bus, and local retail access make it one of the cleaner westside renter propositions.",
      ],
    },
    buyScores: {
      purchaseValue: 8.0,
      lifestyle: 8.8,
      familyLiveability: 7.9,
      reasons: [
        "Taringa offers strong western connectivity without the same entry price as Indooroopilly or blue-chip river suburbs.",
        "Walkability and transport access are particularly strong for professionals and downsizers.",
        "Family liveability is solid, though block sizes and housing mix vary more than deeper suburban areas.",
      ],
    },
    investScores: {
      yield: 7.6,
      entryPrice: 7.3,
      demand: 8.1,
      reasons: [
        "Gross yield is supported by a deep tenant pool and repeat demand from students and young professionals.",
        "Entry pricing is still relatively manageable for westside exposure close to major education nodes.",
        "Demand remains resilient because the suburb appeals to both tenants and owner-occupier buyers.",
      ],
    },
    localFactors: {
      schools: "3 schools within 1.5km",
      shopping: "Toowong Village 1.2km",
      transport: "Train and frequent bus access",
      parkAccess: "Jack Cook Memorial Park nearby",
    },
    verdict:
      "Taringa scores highly because it is one of the west's most efficient all-round suburbs. It combines transport, tenant depth, and a relatively disciplined entry point in a way that feels hard to replace. That makes it especially useful for renters and investors wanting connectivity without unnecessary prestige loading.",
    tags: {
      rent: "Best connected rent",
      invest: "Balanced entry",
    },
    weeklyRent: 590,
    medianPrice: 990_000,
    grossYield: 4.4,
  },
  {
    id: "bulimba",
    name: "Bulimba",
    region: "Inner City",
    shortDescription:
      "An immaculate riverside village with premium family appeal, ferry access, and some of Brisbane's most competitive inner-east buyer demand.",
    rentScores: {
      affordability: 6.9,
      rentToValue: 7.0,
      amenity: 9.1,
      reasons: [
        "Rents are premium, reflecting the suburb's village reputation and highly constrained stock profile.",
        "Rental pricing remains supported, though the suburb's capital values keep affordability under pressure.",
        "Oxford Street, river access, and ferry links create a standout lifestyle and amenity score.",
      ],
    },
    buyScores: {
      purchaseValue: 7.2,
      lifestyle: 9.4,
      familyLiveability: 8.0,
      reasons: [
        "Bulimba is expensive, but owner-occupier demand and scarcity continue to underpin pricing discipline.",
        "It remains one of Brisbane's best suburbs for polished village living close to the river.",
        "Families get a strong mix of parks, cafés, schools, and a slower-paced residential feel.",
      ],
    },
    investScores: {
      yield: 6.2,
      entryPrice: 5.8,
      demand: 8.9,
      reasons: [
        "Yield is subdued because the suburb trades as a lifestyle and prestige market first.",
        "The acquisition hurdle is high relative to more cash-flow-oriented investor markets.",
        "Even so, vacancy pressure and buyer recognition remain exceptionally strong over the long term.",
      ],
    },
    localFactors: {
      schools: "4 schools within 2km",
      shopping: "Oxford Street retail strip nearby",
      transport: "CityCat and bus routes to CBD",
      parkAccess: "Riverside parks and bikeways",
    },
    verdict:
      "Bulimba ranks highly for lifestyle-led buyers who want certainty around demand and neighbourhood quality. It is not a bargain suburb, and it does not pretend to be. What it offers instead is a polished, enduring owner-occupier market that tends to hold attention through different parts of the cycle.",
    tags: {
      buy: "Village prestige",
    },
    weeklyRent: 830,
    medianPrice: 1_600_000,
    grossYield: 3.4,
  },
  {
    id: "indooroopilly",
    name: "Indooroopilly",
    region: "West",
    shortDescription:
      "A major western hub that blends schools, shopping, and transport with a broad mix of apartments, townhouses, and family homes.",
    rentScores: {
      affordability: 8.1,
      rentToValue: 7.8,
      amenity: 9.0,
      reasons: [
        "Rents remain comparatively fair when measured against the suburb's infrastructure and school access.",
        "Rental pricing is supported by consistent demand from students, professionals, and families.",
        "Indooroopilly Shopping Centre, trains, and arterial access create one of Brisbane's strongest convenience profiles.",
      ],
    },
    buyScores: {
      purchaseValue: 8.3,
      lifestyle: 8.5,
      familyLiveability: 8.8,
      reasons: [
        "The suburb still offers a broad range of stock types, which helps buyers avoid a single premium entry point.",
        "Walkability, retail, and transport give it more daily convenience than many family-oriented suburbs.",
        "Schooling, larger homes, and westside reputation make it highly usable for families.",
      ],
    },
    investScores: {
      yield: 7.8,
      entryPrice: 7.7,
      demand: 8.5,
      reasons: [
        "Yield is healthy across its townhouse and unit stock, especially near transport and retail.",
        "Entry price remains balanced for a suburb with this level of infrastructure and brand recognition.",
        "Demand is broad-based, supported by education, healthcare, retail, and westside owner-occupier appeal.",
      ],
    },
    localFactors: {
      schools: "5 schools within 2km",
      shopping: "Indooroopilly Shopping Centre 450m",
      transport: "Train and bus interchange access",
      parkAccess: "Tighnabruaich and river green space",
    },
    verdict:
      "Indooroopilly is consistently one of the strongest all-rounders in the west. It rarely wins on a single emotional angle alone, but it performs across value, amenity, and family practicality at the same time. That balance is exactly why it sits so high for buyers in particular.",
    tags: {
      buy: "Best schools access",
      invest: "Balanced entry",
    },
    weeklyRent: 640,
    medianPrice: 1_050_000,
    grossYield: 4.2,
  },
  {
    id: "coorparoo",
    name: "Coorparoo",
    region: "South",
    shortDescription:
      "A polished southside favourite with strong café amenity, established housing, and quick CBD access by bus and rail.",
    rentScores: {
      affordability: 7.9,
      rentToValue: 7.7,
      amenity: 8.6,
      reasons: [
        "Rents are elevated but remain manageable compared with several prestige inner-south pockets.",
        "Lease pricing still looks aligned with buyer demand and a healthy mix of apartments and houses.",
        "Coorparoo Square, rail, and arterial access give it dependable daily convenience.",
      ],
    },
    buyScores: {
      purchaseValue: 8.0,
      lifestyle: 8.4,
      familyLiveability: 8.2,
      reasons: [
        "The suburb still sits below true prestige territory while offering an established inner-south lifestyle.",
        "Retail, cafés, and transport make it easy to live in without needing to over-stretch.",
        "Families benefit from school options, parks, and a housing mix that is broader than tighter inner-east pockets.",
      ],
    },
    investScores: {
      yield: 7.7,
      entryPrice: 7.0,
      demand: 8.4,
      reasons: [
        "Yield stays respectable because unit and townhouse stock keeps investor entry more flexible.",
        "The entry point is higher than outer-south markets, but still manageable for inner-ring exposure.",
        "Demand is reinforced by CBD access, local amenity, and broad tenant appeal.",
      ],
    },
    localFactors: {
      schools: "4 schools within 2km",
      shopping: "Coorparoo Square 350m",
      transport: "Busway and train access nearby",
      parkAccess: "Parkland along Norman Creek",
    },
    verdict:
      "Coorparoo places well because it offers a convincing inner-south middle ground. It is polished enough to feel aspirational, yet broad enough in housing stock to stay investable and liveable. For buyers wanting convenience without the heaviest prestige premium, it makes a lot of sense.",
    tags: {
      rent: "Balanced rent",
      invest: "Long-term demand",
    },
    weeklyRent: 600,
    medianPrice: 950_000,
    grossYield: 4.4,
  },
];

export const regionOptions: Array<Region | "All Regions"> = [
  "All Regions",
  "Inner City",
  "North",
  "South",
  "West",
  "East-Bayside",
];

export const budgetOptionsByIntent: Record<Intent, BudgetOption[]> = {
  rent: [
    { label: "$300-$400", value: "up-to-400", maximum: 400 },
    { label: "$400-$550", value: "up-to-550", maximum: 550 },
    { label: "$550-$700", value: "up-to-700", maximum: 700 },
    { label: "$700+", value: "all-rent", maximum: null },
  ],
  buy: [
    { label: "$700k-$900k", value: "up-to-900k", maximum: 900_000 },
    { label: "$900k-$1.2m", value: "up-to-1200k", maximum: 1_200_000 },
    { label: "$1.2m-$1.5m", value: "up-to-1500k", maximum: 1_500_000 },
    { label: "$1.5m+", value: "all-buy", maximum: null },
  ],
  invest: [
    { label: "$600k-$800k", value: "up-to-800k", maximum: 800_000 },
    { label: "$800k-$1.0m", value: "up-to-1000k", maximum: 1_000_000 },
    { label: "$1.0m-$1.3m", value: "up-to-1300k", maximum: 1_300_000 },
    { label: "$1.3m+", value: "all-invest", maximum: null },
  ],
};

const scoreWeights: Record<Intent, [number, number, number]> = {
  rent: [0.42, 0.28, 0.3],
  buy: [0.38, 0.32, 0.3],
  invest: [0.4, 0.25, 0.35],
};

export const methodologyWeightData = [
  {
    label: "Price discipline",
    rent: 42,
    buy: 38,
    invest: 25,
  },
  {
    label: "Liveability / amenity",
    rent: 28,
    buy: 32,
    invest: 35,
  },
  {
    label: "Demand / resilience",
    rent: 30,
    buy: 30,
    invest: 40,
  },
];

export function getScoreRows(suburb: Suburb, intent: Intent): ScoreRowItem[] {
  if (intent === "rent") {
    return [
      {
        label: "Rent affordability",
        score: suburb.rentScores.affordability,
        reason: suburb.rentScores.reasons[0],
      },
      {
        label: "Rent-to-value fit",
        score: suburb.rentScores.rentToValue,
        reason: suburb.rentScores.reasons[1],
      },
      {
        label: "Amenity and access",
        score: suburb.rentScores.amenity,
        reason: suburb.rentScores.reasons[2],
      },
    ];
  }

  if (intent === "buy") {
    return [
      {
        label: "Purchase value",
        score: suburb.buyScores.purchaseValue,
        reason: suburb.buyScores.reasons[0],
      },
      {
        label: "Lifestyle convenience",
        score: suburb.buyScores.lifestyle,
        reason: suburb.buyScores.reasons[1],
      },
      {
        label: "Family liveability",
        score: suburb.buyScores.familyLiveability,
        reason: suburb.buyScores.reasons[2],
      },
    ];
  }

  return [
    {
      label: "Rental yield / cash flow",
      score: suburb.investScores.yield,
      reason: suburb.investScores.reasons[0],
    },
    {
      label: "Entry price / affordability",
      score: suburb.investScores.entryPrice,
      reason: suburb.investScores.reasons[1],
    },
    {
      label: "Demand and growth pressure",
      score: suburb.investScores.demand,
      reason: suburb.investScores.reasons[2],
    },
  ];
}

export function getCompositeScore(suburb: Suburb, intent: Intent) {
  const scores =
    intent === "rent"
      ? [
          suburb.rentScores.affordability,
          suburb.rentScores.rentToValue,
          suburb.rentScores.amenity,
        ]
      : intent === "buy"
        ? [
            suburb.buyScores.purchaseValue,
            suburb.buyScores.lifestyle,
            suburb.buyScores.familyLiveability,
          ]
        : [
            suburb.investScores.yield,
            suburb.investScores.entryPrice,
            suburb.investScores.demand,
          ];

  const weightedTotal = scores.reduce((total, score, index) => {
    return total + score * scoreWeights[intent][index];
  }, 0);

  return Number(weightedTotal.toFixed(1));
}

export function getFilteredSuburbs(
  intent: Intent,
  region: Region | "All Regions",
  budgetValue: string
) {
  const budget =
    budgetOptionsByIntent[intent].find((option) => option.value === budgetValue) ??
    budgetOptionsByIntent[intent].at(-1);

  return suburbs
    .filter((suburb) => region === "All Regions" || suburb.region === region)
    .filter((suburb) => {
      if (!budget || budget.maximum === null) {
        return true;
      }

      if (intent === "rent") {
        return suburb.weeklyRent <= budget.maximum;
      }

      return suburb.medianPrice <= budget.maximum;
    })
    .sort((left, right) => {
      return getCompositeScore(right, intent) - getCompositeScore(left, intent);
    });
}

export function getLandingHighlights() {
  return {
    rent: getFilteredSuburbs("rent", "All Regions", "all-rent")[0],
    buy: getFilteredSuburbs("buy", "All Regions", "all-buy")[0],
    invest: getFilteredSuburbs("invest", "All Regions", "all-invest")[0],
  };
}
