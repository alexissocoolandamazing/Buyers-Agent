import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Invest",
  description:
    "Explore Brisbane investment suburbs with yield, entry price, and demand pressure explained clearly.",
};

export default function InvestPage() {
  return (
    <>
      <PropertyExplorer
        intent="invest"
        title="Invest with cleaner logic."
        description="Open on the full shortlist, then apply an entry budget and region when you want a more targeted investor view."
        budgetLabel="Entry budget"
      />

      <PageWrapper className="pb-20 md:pb-28">
        <DisclaimerCard
          heading="This is a ranking tool, not financial advice."
          body="The current rankings use mock suburb data and transparent scoring to compare trade-offs quickly. They do not reflect your personal finances, tax position, or asset selection."
          linkHref="/methodology"
          linkLabel="Read the methodology."
        />
      </PageWrapper>
    </>
  );
}
