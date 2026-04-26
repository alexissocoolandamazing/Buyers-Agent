import { BarChart3, Database, MapPinned, ShieldCheck } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CTAButton } from "@/components/ui/CTAButton";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepCard } from "@/components/ui/StepCard";
import { SuburbCard } from "@/components/ui/SuburbCard";
import { TrustBlock } from "@/components/ui/TrustBlock";
import { MVP_DATA_DISCLAIMER, plannedDataSources } from "@/data/brisbaneSuburbs";
import { getLandingHighlights } from "@/lib/recommendations";

const steps = [
  {
    number: "01",
    label: "Tell Nook what you are looking for",
    description: "Choose rent, buy, invest, or let the quiz infer the pathway from your priorities.",
  },
  {
    number: "02",
    label: "Set your budget and priorities",
    description: "Add region, budget, lifestyle, bedrooms, property type, or risk appetite.",
  },
  {
    number: "03",
    label: "Get ranked suburbs with reasons",
    description: "See suburb-level recommendations, scores, and plain-English reasons before you open listing sites.",
  },
];

const trustItems = [
  {
    icon: Database,
    title: "Seeded MVP profiles",
    body: "Every suburb uses structured fields that can later be replaced by official datasets.",
  },
  {
    icon: BarChart3,
    title: "Readable scoring",
    body: "Rent, buy, and invest pathways use different weights so the ranking matches the goal.",
  },
  {
    icon: ShieldCheck,
    title: "Clear limitations",
    body: "Nook explains when values are estimates and keeps suburb discovery separate from financial advice.",
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
              eyebrow="How it works"
              title="Smarter suburb discovery for renters, buyers, and investors."
              description="Nook helps you compare Brisbane suburbs around your budget, lifestyle, and goals, then explains why each area fits."
              size="lg"
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
          <div className="space-y-10">
            <SectionHeader
              eyebrow="Suburb preview"
              title="A first look at Nook's default shortlists."
              description="These are suburb-level recommendations from seeded MVP profiles, not individual property listings."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              <SuburbCard result={highlights.rent} pathway="rent" href="/rent" label="Best for rent" />
              <SuburbCard result={highlights.buy} pathway="buy" href="/buy" label="Best for buy" />
              <SuburbCard result={highlights.invest} pathway="invest" href="/invest" label="Best for invest" />
            </div>
          </div>
        </PageWrapper>
      </section>

      <section className="section-space">
        <PageWrapper>
          <div className="surface-panel-dark overflow-hidden p-6 text-white sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <SectionHeader
                eyebrow="Trust and transparency"
                title="Built for suburb decisions before listing fatigue sets in."
                description="Nook is a suburb recommendation assistant. It helps you decide where to look, then leaves property-level due diligence to the next stage."
                tone="inverse"
              />
              <TrustBlock items={trustItems} tone="inverse" />
            </div>
          </div>
        </PageWrapper>
      </section>

      <section className="section-space">
        <PageWrapper>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="space-y-5">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-brand-blue/12 bg-brand-blue/[0.08]">
                  <MapPinned className="h-5 w-5 text-brand-navy" />
                </div>
                <SectionHeader
                  eyebrow="Data roadmap"
                  title="Public-data-ready, not pretending to be live."
                  description={MVP_DATA_DISCLAIMER}
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  {plannedDataSources.map((source) => (
                    <div
                      key={source}
                      className="rounded-[1rem] border border-[rgba(17,32,51,0.08)] bg-white/80 px-3.5 py-3 text-sm font-medium text-neutral-700"
                    >
                      {source}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="space-y-5">
                <SectionHeader
                  eyebrow="Start exploring"
                  title="Find your corner of Brisbane."
                  description="Jump straight into a pathway, or use the quiz above for a guided shortlist."
                />

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

                <DisclaimerCard
                  heading="Prototype notice."
                  body="Nook is an MVP suburb discovery tool. It does not provide financial, legal, tax, investment, or property advice."
                  className="shadow-none"
                />
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>
    </>
  );
}
