import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Invest in Brisbane",
  description:
    "Compare Brisbane suburbs for investing with seeded yield, affordability, demand, growth proxy, and risk signals.",
};

export default async function InvestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <>
      <PropertyExplorer
        intent="invest"
        title="Compare suburb-level investment signals before choosing where to research deeper."
        description="Rank suburbs by entry budget, risk appetite, yield versus growth preference, affordability, transport, and seeded rental demand signals."
        budgetLabel="Entry budget"
        initialParams={params}
      />

      <PageWrapper className="pb-20 md:pb-28">
        <DisclaimerCard
          heading="Not financial advice."
          body="Rankings use seeded MVP suburb profiles and transparent scoring to compare suburb-level trade-offs. They do not reflect your finances, tax position, borrowing capacity, or individual property risk."
          linkHref="/methodology"
          linkLabel="Read the methodology."
        />
      </PageWrapper>
    </>
  );
}
