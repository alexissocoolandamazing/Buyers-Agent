import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";
import { MethodologyChartClient } from "@/components/ui/MethodologyChartClient";
import { MVP_DATA_DISCLAIMER, plannedDataSources } from "@/data/brisbaneSuburbs";
import { methodologyWeightData } from "@/lib/recommendations";

const anchorLinks = [
  { id: "data-sources", label: "Data sources" },
  { id: "score-calculation", label: "Scoring logic" },
  { id: "score-meanings", label: "Score meanings" },
  { id: "limitations", label: "Limits" },
  { id: "disclaimer", label: "Disclaimer" },
];

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Understand how Nook uses seeded Brisbane suburb profiles, pathway scoring, and public-data-ready fields.",
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
                  Clear suburb recommendations, built to be inspected.
                </h1>
                <p className="max-w-3xl text-[1.02rem] leading-8 text-neutral-700">
                  Nook is designed to help people choose which Brisbane suburbs are worth considering before they spend
                  hours scrolling individual listings. The current MVP uses seeded suburb profiles with fields that are
                  ready to be replaced by live or official datasets later.
                </p>
              </div>
            </div>

            <MethodologySection id="data-sources" title="Where the data comes from">
              <p>{MVP_DATA_DISCLAIMER}</p>
              <p>
                Each suburb record includes identity, region, council area, postcode, coordinates, rent and buy
                estimates, estimated yield, scores from 1 to 100, nearby features, data notes, and pathway-specific
                recommendation reasons.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {plannedDataSources.map((source) => (
                  <div
                    key={source}
                    className="rounded-[1rem] border border-[rgba(17,32,51,0.08)] bg-white/82 px-3.5 py-3 text-sm font-medium text-neutral-700"
                  >
                    {source}
                  </div>
                ))}
              </div>
            </MethodologySection>

            <MethodologySection id="score-calculation" title="How scores are calculated">
              <p>
                Nook uses pathway-specific scoring. Rent prioritises rent affordability, transport, lifestyle, safety,
                and bedroom fit. Buy prioritises affordability, schools, lifestyle, transport, long-term liveability,
                and property type fit. Invest prioritises estimated yield, renter demand, affordability, growth proxy,
                and risk balance.
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
                The point is not to create a magic answer. It is to make the trade-offs visible and reusable while the
                product moves toward richer datasets.
              </p>
            </MethodologySection>

            <MethodologySection id="score-meanings" title="What each score means">
              <p>
                Scores run from 1 to 100. Higher is better for that signal. Affordability reflects relative suburb-level
                cost pressure. Transport reflects access to trains, busways, ferries, and major routes. School, safety,
                lifestyle, growth proxy, renter, buyer, and investor scores are seeded MVP signals for testing the
                recommendation experience.
              </p>
              <p>
                Each result also includes a one-sentence explanation so the ranking feels more like a suburb brief than
                a black-box number.
              </p>
            </MethodologySection>

            <MethodologySection id="limitations" title="Limitations of this tool">
              <p>
                Nook is suburb-level only. It does not account for street-by-street variation, flood overlays, building
                condition, strata quality, school catchment boundaries, financing structure, tax position, or personal
                risk settings.
              </p>
              <p>
                The current data is seeded for MVP testing and should be treated as a product prototype, not live market
                intelligence or official advice.
              </p>
            </MethodologySection>

            <MethodologySection id="disclaimer" title="Full disclaimer">
              <DisclaimerCard
                heading="Informational use only."
                body="Nook does not provide financial, legal, tax, investment, or property advice. Rankings are a suburb-level starting point built from seeded MVP profiles and transparent scoring logic. Verify assumptions independently before making any property decision."
              />
            </MethodologySection>
          </div>
        </div>
      </PageWrapper>
    </section>
  );
}
