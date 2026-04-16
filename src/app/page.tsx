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
    description: "Start with rent, buy, or invest so the shortlist matches the decision in front of you.",
  },
  {
    number: "02",
    label: "Apply the brief",
    description: "Refine region and budget, then apply the filters when you are ready to narrow the view.",
  },
  {
    number: "03",
    label: "Read the signal",
    description: "Scan the ranking, review the score reasons, and open a profile only when you need more detail.",
  },
];

const trustItems = [
  {
    icon: Database,
    title: "Structured suburb data",
    body: "The demo uses typed suburb data so every ranking, filter, and summary behaves like a real product flow.",
  },
  {
    icon: BarChart3,
    title: "Visible scoring logic",
    body: "Each pathway keeps the weighted signals readable, so users can see why a suburb rises or falls.",
  },
  {
    icon: MessageSquareText,
    title: "Plain-English rationale",
    body: "Short score reasons and suburb profiles keep the experience closer to advice than dashboard theatre.",
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
              title="Top picks across rent, buy, and invest."
              description="A quick read on the strongest current pathways in the demo dataset."
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

      <section className="section-space pt-0">
        <PageWrapper>
          <div className="space-y-10">
            <SectionHeader
              eyebrow="How it works"
              title="A simpler path from broad scan to shortlist."
              description="The product is designed to feel complete on first load, then become more specific only when you ask it to."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {steps.map((step) => (
                <StepCard key={step.number} number={step.number} label={step.label} description={step.description} />
              ))}
            </div>
          </div>
        </PageWrapper>
      </section>

      <section className="section-space pt-0">
        <PageWrapper>
          <div className="surface-panel-dark overflow-hidden p-6 text-white sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <SectionHeader
                eyebrow="Trust and data"
                title="Polished on the surface, transparent underneath."
                description="SuburbIQ earns trust through readable methodology, visible score logic, and a dataset view that never feels hidden."
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
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
              <div className="space-y-4">
                <p className="eyebrow">Start exploring</p>
                <h2 className="text-3xl font-semibold tracking-tight text-brand-navy sm:text-[2.35rem]">
                  Start broad. Narrow with confidence.
                </h2>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-neutral-700">
                  Open any pathway to see the full shortlist first, then apply filters when you want a tighter brief.
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
