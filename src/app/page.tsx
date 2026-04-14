import {
  BarChart3,
  Database,
  Home,
  KeyRound,
  MessageSquareText,
  TrendingUp,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CTAButton } from "@/components/ui/CTAButton";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepCard } from "@/components/ui/StepCard";
import { SuburbCard } from "@/components/ui/SuburbCard";
import { TrustBlock } from "@/components/ui/TrustBlock";
import { getLandingHighlights } from "@/lib/mockData";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";

const valueCards = [
  {
    icon: KeyRound,
    title: "Rent Smarter",
    description: "Surface suburbs where weekly rent still feels justified by access, amenity, and broader value.",
  },
  {
    icon: Home,
    title: "Buy Better",
    description: "See where price discipline, liveability, and family practicality line up most cleanly.",
  },
  {
    icon: TrendingUp,
    title: "Invest with Confidence",
    description: "Compare entry price, yield, and demand pressure without burying the logic behind the score.",
  },
];

const steps = [
  {
    number: "01",
    label: "Choose your region",
    description: "Start broad, narrow deliberately, and avoid overfitting the shortlist too early.",
  },
  {
    number: "02",
    label: "Set your budget",
    description: "Apply a realistic budget ceiling so the rankings stay relevant to the brief you actually have.",
  },
  {
    number: "03",
    label: "Get ranked suburbs with clear reasons",
    description: "See the why behind every score instead of trying to reverse-engineer a black box.",
  },
];

const trustItems = [
  {
    icon: Database,
    title: "Data sources",
    body: "The platform is designed around suburb-level pricing, rent, amenity, and location signals. The current MVP uses typed mock data so the interface can be fully exercised end to end.",
  },
  {
    icon: BarChart3,
    title: "Scoring logic",
    body: "Each intent uses three weighted scores, not one opaque number. That weighting is explained clearly on the methodology page so the product stays auditable.",
  },
  {
    icon: MessageSquareText,
    title: "Plain English explanations",
    body: "Every score is paired with a one-line rationale written for real buyers and renters. The goal is clarity first, not dashboard theatre.",
  },
];

export default function HomePage() {
  const highlights = getLandingHighlights();

  return (
    <>
      <HeroSection />

      <PageWrapper className="py-20 md:py-28">
        <div className="space-y-10">
          <SectionHeader
            eyebrow="Platform overview"
            title="One platform. Three decisions made clearer."
            description="The product is intentionally narrow: one calm interface for renting, buying, and investing in Brisbane with fewer assumptions and stronger reasoning."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {valueCards.map((card) => {
              const Icon = card.icon;

              return (
                <div key={card.title} className="rounded-2xl border border-brand-border bg-brand-mist p-6">
                  <div className="space-y-4">
                    <Icon className="h-6 w-6 text-brand-navy" />
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-brand-navy">{card.title}</h3>
                      <p className="text-base leading-relaxed text-neutral-700">{card.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageWrapper>

      <PageWrapper className="py-20 md:py-28">
        <div className="space-y-10">
          <SectionHeader
            eyebrow="Featured suburbs"
            title="Top Brisbane suburbs right now"
            description="A clean editorial shortlist for the three main decisions people actually need to make."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <SuburbCard
              suburb={highlights.rent}
              mode="editorial"
              editorialLabel="Best for rent"
              editorialHref="/rent"
              standoutLabel="Standout stat"
              standoutValue={formatRent(highlights.rent.weeklyRent)}
            />
            <SuburbCard
              suburb={highlights.buy}
              mode="editorial"
              editorialLabel="Best for buy"
              editorialHref="/buy"
              standoutLabel="Standout stat"
              standoutValue={formatMoneyShort(highlights.buy.medianPrice)}
            />
            <SuburbCard
              suburb={highlights.invest}
              mode="editorial"
              editorialLabel="Best for invest"
              editorialHref="/invest"
              standoutLabel="Standout stat"
              standoutValue={formatPercent(highlights.invest.grossYield)}
            />
          </div>
        </div>
      </PageWrapper>

      <PageWrapper className="py-20 md:py-28">
        <div className="space-y-10">
          <SectionHeader
            eyebrow="How it works"
            title="A short path from broad brief to ranked shortlist."
            description="The interface keeps the mechanics simple so the suburb reasoning can do the heavy lifting."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <StepCard key={step.number} number={step.number} label={step.label} description={step.description} />
            ))}
          </div>
        </div>
      </PageWrapper>

      <section className="bg-neutral-50 py-20 md:py-28">
        <PageWrapper>
          <div className="space-y-10">
            <SectionHeader
              eyebrow="Trust"
              title="Rankings built on real data, not guesswork."
              description="The product is designed to feel transparent from the first click, with readable logic and visible limitations."
            />
            <TrustBlock items={trustItems} />
          </div>
        </PageWrapper>
      </section>

      <section className="bg-brand-navy py-20 md:py-28">
        <PageWrapper animate={false}>
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                Ready to find your suburb?
              </h2>
            </div>

            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <CTAButton href="/rent" variant="secondary" tone="inverse">
                Start with Rent
              </CTAButton>
              <CTAButton href="/buy" variant="secondary" tone="inverse">
                Start with Buy
              </CTAButton>
              <CTAButton href="/invest" variant="secondary" tone="inverse">
                Start with Invest
              </CTAButton>
            </div>

            <p className="text-sm text-white/50">No account needed. Free to explore.</p>
          </div>
        </PageWrapper>
      </section>
    </>
  );
}
