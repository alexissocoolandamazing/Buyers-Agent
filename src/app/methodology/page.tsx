import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";
import { MethodologyChartClient } from "@/components/ui/MethodologyChartClient";
import { methodologyWeightData } from "@/lib/mockData";

const anchorLinks = [
  { id: "data-sources", label: "Where our data comes from" },
  { id: "score-calculation", label: "How scores are calculated" },
  { id: "score-meanings", label: "What each score means" },
  { id: "limitations", label: "Limitations of this tool" },
  { id: "disclaimer", label: "Full disclaimer" },
];

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Understand where SuburbIQ data comes from, how scores are calculated, and where the current MVP has clear limits.",
};

export default function MethodologyPage() {
  return (
    <PageWrapper animate={false} className="py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-4">
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-600">On this page</p>
            <div className="space-y-3">
              {anchorLinks.map((link) => (
                <Link key={link.id} href={`#${link.id}`} className="block text-base text-neutral-700 hover:text-brand-blue">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        <div className="space-y-16">
          <header className="space-y-5 border-b border-brand-border pb-8">
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-600">Methodology</p>
            <h1 className="text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">
              Transparent rankings, written to be read.
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-neutral-700">
              SuburbIQ is designed to feel more like an advisory brief than a listing portal. The scoring logic is
              intentionally simple enough to explain, inspect, and challenge rather than hide behind an opaque model.
            </p>
          </header>

          <section id="data-sources" className="space-y-4 scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
              Where our data comes from
            </h2>
            <p className="text-base leading-relaxed text-neutral-700">
              The current MVP uses typed mock suburb data so every screen can be explored end to end without waiting on
              external data feeds. Each record is structured the way a production recommendation engine would expect:
              suburb identity, region, rent signals, buy signals, investment signals, local context, and a written
              verdict.
            </p>
            <p className="text-base leading-relaxed text-neutral-700">
              In a production version, those fields would be populated from suburb-level price series, rental market
              data, amenity references, transport accessibility, and school or shopping proximity datasets. The current
              architecture keeps that swap straightforward because the UI consumes typed objects rather than raw API
              responses.
            </p>
          </section>

          <section id="score-calculation" className="space-y-4 scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
              How scores are calculated
            </h2>
            <p className="text-base leading-relaxed text-neutral-700">
              Every suburb receives three scores out of 10 for each intent. Those scores are then blended into a single
              composite ranking using simple intent-specific weights. Rent places more weight on price discipline and
              day-to-day practicality, buy balances value with lifestyle and family fit, and invest leans more heavily
              toward demand resilience.
            </p>
            <div className="space-y-4 border-y border-brand-border py-6">
              <div className="flex flex-wrap gap-4 text-sm text-neutral-700">
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-brand-blue" />
                  Rent
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-brand-navy" />
                  Buy
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-brand-skyblue" />
                  Invest
                </span>
              </div>
              <MethodologyChartClient data={methodologyWeightData} />
            </div>
            <p className="text-base leading-relaxed text-neutral-700">
              The point of this weighting is not to create a magic answer. It is to make the trade-offs visible. A
              suburb can still be a strong lifestyle buy while looking weaker on entry value, and the interface should
              make that nuance obvious rather than flatten it away.
            </p>
          </section>

          <section id="score-meanings" className="space-y-4 scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
              What each score means
            </h2>
            <p className="text-base leading-relaxed text-neutral-700">
              Rent scores cover affordability, rent-to-value fit, and amenity. Buy scores cover purchase value,
              lifestyle convenience, and family liveability. Invest scores cover rental yield, entry price, and demand
              pressure.
            </p>
            <p className="text-base leading-relaxed text-neutral-700">
              Each one is accompanied by a plain-English reason so users can understand what drove the number. That
              explanation is just as important as the score itself because it gives the ranking an advisory feel instead
              of a black-box analytics feel.
            </p>
          </section>

          <section id="limitations" className="space-y-4 scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
              Limitations of this tool
            </h2>
            <p className="text-base leading-relaxed text-neutral-700">
              This MVP is suburb-level only. It does not account for street-by-street variation, asset condition,
              dwelling type, flood overlays, strata quality, financing structures, or any personal risk settings that
              would shape a real property decision.
            </p>
            <p className="text-base leading-relaxed text-neutral-700">
              Scores are also intentionally simplified. They are useful for building a shortlist, but not for replacing
              inspections, broker conversations, legal review, or suburb-specific due diligence. The platform helps
              narrow the field; it should not be the final decision-maker.
            </p>
          </section>

          <section id="disclaimer" className="space-y-4 scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">Full disclaimer</h2>
            <DisclaimerCard
              heading="Informational use only."
              body="SuburbIQ does not provide financial, legal, tax, or investment advice. Rankings are an informational starting point built from mock suburb data and editorial scoring logic, and they should not be relied on as a substitute for independent professional advice or your own property due diligence."
            />
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
