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
    description:
      "Surface suburbs where weekly rent still feels disciplined against amenity, transport, and everyday convenience.",
  },
  {
    icon: Home,
    title: "Buy Better",
    description:
      "Compare lifestyle, family practicality, and price discipline without losing the broader context that makes a suburb work.",
  },
  {
    icon: TrendingUp,
    title: "Invest with Confidence",
    description:
      "Keep yield, entry point, and demand pressure visible at the same time so investor trade-offs feel genuinely legible.",
  },
];

const steps = [
  {
    number: "01",
    label: "Choose your pathway",
    description:
      "Start with rent, buy, or invest so the ranking logic matches the actual decision you are trying to make.",
  },
  {
    number: "02",
    label: "Refine the brief",
    description:
      "Set region and budget before you overthink the shortlist. The filters are intentionally compact and immediately useful.",
  },
  {
    number: "03",
    label: "Read the suburb rationale",
    description:
      "Each score is paired with plain-English reasoning, so the product feels closer to an advisory memo than a generic portal.",
  },
];

const trustItems = [
  {
    icon: Database,
    title: "Structured suburb data",
    body:
      "The current MVP uses typed mock data so every flow behaves like a real product while preserving a clean path to production feeds later.",
  },
  {
    icon: BarChart3,
    title: "Auditable scoring",
    body:
      "Each pathway blends three weighted signals instead of hiding everything behind one opaque number. Users can inspect the logic instead of guessing at it.",
  },
  {
    icon: MessageSquareText,
    title: "Advisory-style explanations",
    body:
      "Plain-language verdicts make the rankings readable for real buyers, renters, and investors rather than only for dashboard-native users.",
  },
];

export default function HomePage() {
  const highlights = getLandingHighlights();

  return (
    <>
      <HeroSection highlights={highlights} />

      <section className="section-space">
        <PageWrapper>
          <div className="space-y-10">
            <SectionHeader
              eyebrow="Platform overview"
              title="One premium platform, shaped around the three Brisbane property decisions that matter."
              description="SuburbIQ is intentionally narrow: a calmer interface for renting, buying, and investing that makes ranking logic, context, and trade-offs easier to trust."
              size="lg"
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {valueCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div key={card.title} className="surface-panel-soft h-full p-6 sm:p-7">
                    <div className="space-y-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-blue/12 bg-brand-blue/[0.08]">
                        <Icon className="h-5 w-5 text-brand-navy" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-[1.45rem] font-semibold tracking-tight text-brand-navy">{card.title}</h3>
                        <p className="text-[0.98rem] leading-8 text-neutral-700">{card.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PageWrapper>
      </section>

      <section className="section-space pt-0">
        <PageWrapper>
          <div className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Featured suburbs"
                  title="A high-conviction shortlist across rent, buy, and invest."
                  description="These are the strongest current picks in the demo dataset, each representing a different type of Brisbane property brief."
                />

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[1.35rem] border border-[rgba(17,32,51,0.08)] bg-white/78 p-4">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                      Rent benchmark
                    </p>
                    <p className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-tight text-brand-navy">
                      {formatRent(highlights.rent.weeklyRent)}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-neutral-600">{highlights.rent.name}</p>
                  </div>
                  <div className="rounded-[1.35rem] border border-[rgba(17,32,51,0.08)] bg-white/78 p-4">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                      Buy entry
                    </p>
                    <p className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-tight text-brand-navy">
                      {formatMoneyShort(highlights.buy.medianPrice)}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-neutral-600">{highlights.buy.name}</p>
                  </div>
                  <div className="rounded-[1.35rem] border border-[rgba(17,32,51,0.08)] bg-white/78 p-4">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                      Invest yield
                    </p>
                    <p className="mt-3 font-[var(--font-display)] text-2xl font-semibold tracking-tight text-brand-navy">
                      {formatPercent(highlights.invest.grossYield)}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-neutral-600">{highlights.invest.name}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                <SuburbCard
                  suburb={highlights.rent}
                  mode="editorial"
                  editorialLabel="Best for rent"
                  editorialHref="/rent"
                  standoutLabel="Current weekly benchmark"
                  standoutValue={formatRent(highlights.rent.weeklyRent)}
                />
                <SuburbCard
                  suburb={highlights.buy}
                  mode="editorial"
                  editorialLabel="Best for buy"
                  editorialHref="/buy"
                  standoutLabel="Median price signal"
                  standoutValue={formatMoneyShort(highlights.buy.medianPrice)}
                />
                <SuburbCard
                  suburb={highlights.invest}
                  mode="editorial"
                  editorialLabel="Best for invest"
                  editorialHref="/invest"
                  standoutLabel="Yield signal"
                  standoutValue={formatPercent(highlights.invest.grossYield)}
                />
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>

      <section className="section-space">
        <PageWrapper>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <SectionHeader
              eyebrow="How it works"
              title="A tighter workflow from broad brief to shortlist."
              description="The experience is designed to feel closer to a premium product memo than a noisy search results page. Each step reduces uncertainty without adding clutter."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {steps.map((step) => (
                <StepCard key={step.number} number={step.number} label={step.label} description={step.description} />
              ))}
            </div>
          </div>
        </PageWrapper>
      </section>

      <section className="section-space">
        <PageWrapper>
          <div className="surface-panel-dark overflow-hidden p-6 text-white sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              <SectionHeader
                eyebrow="Trust"
                title="Premium on the surface, transparent underneath."
                description="The interface is intentionally polished, but the product earns trust through visible logic, clear limitations, and readable suburb reasoning."
                tone="inverse"
              />
              <TrustBlock items={trustItems} tone="inverse" />
            </div>
          </div>
        </PageWrapper>
      </section>

      <section className="section-space pt-0">
        <PageWrapper>
          <div className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
              <div className="space-y-5">
                <p className="eyebrow">Start exploring</p>
                <h2 className="text-3xl font-semibold tracking-tight text-brand-navy sm:text-[2.6rem]">
                  Ready to narrow Brisbane with more confidence?
                </h2>
                <p className="max-w-2xl text-[1rem] leading-8 text-neutral-700">
                  Open the pathway that matches your brief and start with a first screen that already feels complete:
                  intro, filters, and meaningful ranked suburbs visible immediately.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <CTAButton href="/rent" variant="secondary" size="lg" className="justify-center rounded-full">
                  Start with Rent
                </CTAButton>
                <CTAButton href="/buy" variant="secondary" size="lg" className="justify-center rounded-full">
                  Start with Buy
                </CTAButton>
                <CTAButton href="/invest" variant="secondary" size="lg" className="justify-center rounded-full">
                  Start with Invest
                </CTAButton>
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>
    </>
  );
}
