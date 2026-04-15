import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";
import { MethodologyChartClient } from "@/components/ui/MethodologyChartClient";
import { methodologyWeightData } from "@/lib/mockData";

const anchorLinks = [
  { id: "data-sources", label: "Where the data comes from" },
  { id: "score-calculation", label: "How scores are calculated" },
  { id: "score-meanings", label: "What each score means" },
  { id: "limitations", label: "Limits of the tool" },
  { id: "disclaimer", label: "Full disclaimer" },
];

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Understand where SuburbIQ data comes from, how scores are calculated, and where the current MVP has clear limits.",
};

function MethodologySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 rounded-[1.8rem] border border-[rgba(17,32,51,0.08)] bg-white/78 p-6 sm:p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-navy sm:text-[2rem]">{title}</h2>
        <div className="space-y-4 text-[1rem] leading-8 text-neutral-700">{children}</div>
      </div>
    </section>
  );
}

export default function MethodologyPage() {
  return (
    <section className="section-space-tight">
      <PageWrapper animate={false}>
        <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:self-start" style={{ top: "calc(var(--nav-height) + 1rem)" }}>
            <div className="surface-panel p-5 sm:p-6">
              <p className="eyebrow">On this page</p>
              <div className="mt-5 space-y-2">
                {anchorLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={`#${link.id}`}
                    className="block rounded-[1rem] border border-transparent px-3 py-3 text-sm font-medium text-neutral-700 transition hover:border-[rgba(17,32,51,0.08)] hover:bg-white/80 hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <p className="eyebrow">Methodology</p>
                <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-brand-navy">
                  Transparent rankings, written to be read.
                </h1>
                <p className="max-w-3xl text-[1.02rem] leading-8 text-neutral-700">
                  SuburbIQ is designed to feel more like an advisory brief than a listing portal. The scoring logic is
                  intentionally simple enough to explain, inspect, and challenge rather than hide behind an opaque
                  model.
                </p>
              </div>
            </div>

            <MethodologySection id="data-sources" title="Where the data comes from">
              <p>
                The current MVP uses typed mock suburb data so every screen can be explored end to end without waiting
                on external feeds. Each record is structured the way a production recommendation engine would expect:
                suburb identity, region, rent signals, buy signals, investment signals, local context, and a written
                verdict.
              </p>
              <p>
                In a production version, those fields would be populated from suburb-level price series, rental market
                data, amenity references, transport accessibility, and school or shopping proximity datasets. The
                current architecture keeps that swap straightforward because the UI consumes typed objects rather than
                raw API responses.
              </p>
            </MethodologySection>

            <MethodologySection id="score-calculation" title="How scores are calculated">
              <p>
                Every suburb receives three scores out of 10 for each intent. Those scores are then blended into a
                single composite ranking using simple intent-specific weights. Rent places more weight on price
                discipline and day-to-day practicality, buy balances value with lifestyle and family fit, and invest
                leans more heavily toward demand resilience.
              </p>
              <div className="rounded-[1.5rem] border border-[rgba(17,32,51,0.08)] bg-white/82 p-5">
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
                <div className="mt-5">
                  <MethodologyChartClient data={methodologyWeightData} />
                </div>
              </div>
              <p>
                The point of this weighting is not to create a magic answer. It is to make the trade-offs visible. A
                suburb can still be a strong lifestyle buy while looking weaker on entry value, and the interface
                should make that nuance obvious rather than flatten it away.
              </p>
            </MethodologySection>

            <MethodologySection id="score-meanings" title="What each score means">
              <p>
                Rent scores cover affordability, rent-to-value fit, and amenity. Buy scores cover purchase value,
                lifestyle convenience, and family liveability. Invest scores cover rental yield, entry price, and
                demand pressure.
              </p>
              <p>
                Each one is accompanied by a plain-English reason so users can understand what drove the number. That
                explanation is just as important as the score itself because it gives the ranking an advisory feel
                instead of a black-box analytics feel.
              </p>
            </MethodologySection>

            <MethodologySection id="limitations" title="Limitations of this tool">
              <p>
                This MVP is suburb-level only. It does not account for street-by-street variation, asset condition,
                dwelling type, flood overlays, strata quality, financing structures, or any personal risk settings that
                would shape a real property decision.
              </p>
              <p>
                Scores are also intentionally simplified. They are useful for building a shortlist, but not for
                replacing inspections, broker conversations, legal review, or suburb-specific due diligence. The
                platform helps narrow the field; it should not be the final decision-maker.
              </p>
            </MethodologySection>

            <MethodologySection id="disclaimer" title="Full disclaimer">
              <DisclaimerCard
                heading="Informational use only."
                body="SuburbIQ does not provide financial, legal, tax, or investment advice. Rankings are an informational starting point built from mock suburb data and editorial scoring logic, and they should not be relied on as a substitute for independent professional advice or your own property due diligence."
              />
            </MethodologySection>
          </div>
        </div>
      </PageWrapper>
    </section>
  );
}
