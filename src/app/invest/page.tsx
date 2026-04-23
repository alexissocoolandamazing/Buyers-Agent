import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Invest",
  description:
    "Explore Brisbane investment suburbs with transparent rankings, yield signals, and demand indicators.",
};

export default function InvestPage() {
  return (
    <>
      <PropertyExplorer
        intent="invest"
        title="Brisbane investment rankings"
        description="All suburbs ranked for investors. Filter by region and entry budget to refine the shortlist."
        budgetLabel="Entry budget"
      />

      <PageWrapper className="pb-20 md:pb-28">
        <DisclaimerCard
          heading="Not financial advice."
          body="Rankings use mock data and transparent scoring to compare trade-offs. They do not reflect your finances or tax position."
          linkHref="/methodology"
          linkLabel="Read the methodology."
        />
      </PageWrapper>
    </>
  );
}
