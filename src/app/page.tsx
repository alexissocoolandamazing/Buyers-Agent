import { BarChart3, Database, MessageSquareText } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CTAButton } from "@/components/ui/CTAButton";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepCard } from "@/components/ui/StepCard";
import { SuburbCard } from "@/components/ui/SuburbCard";
import { TrustBlock } from "@/components/ui/TrustBlock";
import { getLandingHighlights } from "@/lib/mockData";
import { formatMoneyShort, formatPercent, formatRent } from "@/lib/format";

const steps = [
  {
    number: "01",
    label: "Choose a pathway",
    description: "Start with rent, buy, or invest to match your goal.",
  },
  {
    number: "02",
    label: "Set your brief",
    description: "Filter by region and budget, then apply.",
  },
  {
    number: "03",
    label: "Read the signal",
    description: "Scan rankings and scores, open profiles when needed.",
  },
];

const trustItems = [
  {
    icon: Database,
    title: "Structured data",
    body: "Typed suburb data powers every ranking, filter, and summary.",
  },
  {
    icon: BarChart3,
    title: "Visible scoring",
    body: "Weighted signals are readable — see why suburbs rise or fall.",
  },
  {
    icon: MessageSquareText,
    title: "Plain-English rationale",
    body: "Score reasons keep the experience closer to advice than noise.",
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
              eyebrow="Featured suburbs"
              title="Top picks across each pathway."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              <SuburbCard
                suburb={highlights.rent}
                mode="editorial"
                editorialLabel="Best for rent"
                editorialHref="/rent"
                standoutLabel="Weekly benchmark"
                standoutValue={formatRent(highlights.rent.weeklyRent)}
              />
              <SuburbCard
                suburb={highlights.buy}
                mode="editorial"
                editorialLabel="Best for buy"
                editorialHref="/buy"
                standoutLabel="Median price"
                standoutValue={formatMoneyShort(highlights.buy.medianPrice)}
              />
              <SuburbCard
                suburb={highlights.invest}
                mode="editorial"
                editorialLabel="Best for invest"
                editorialHref="/invest"
                standoutLabel="Gross yield"
                standoutValue={formatPercent(highlights.invest.grossYield)}
              />
            </div>
          </div>
        </PageWrapper>
      </section>

      <section className="section-space">
        <PageWrapper>
          <div className="space-y-10">
            <SectionHeader
              eyebrow="How it works"
              title="From broad scan to shortlist in three steps."
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
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <SectionHeader
                eyebrow="Trust & transparency"
                title="Clear logic, readable scoring."
                tone="inverse"
              />
              <TrustBlock items={trustItems} tone="inverse" />
            </div>
          </div>
        </PageWrapper>
      </section>

      <section className="section-space">
        <PageWrapper>
          <div className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
              <div className="space-y-4">
                <p className="eyebrow">Start exploring</p>
                <h2 className="text-3xl font-semibold tracking-tight text-brand-navy sm:text-[2.35rem]">
                  Start broad. Narrow with confidence.
                </h2>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-neutral-700">
                  Every pathway opens with the full shortlist. Apply filters when you want a tighter view.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <CTAButton href="/rent" variant="secondary" size="lg" className="justify-center rounded-full">
                  Rent
                </CTAButton>
                <CTAButton href="/buy" variant="secondary" size="lg" className="justify-center rounded-full">
                  Buy
                </CTAButton>
                <CTAButton href="/invest" variant="secondary" size="lg" className="justify-center rounded-full">
                  Invest
                </CTAButton>
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>
    </>
  );
}
