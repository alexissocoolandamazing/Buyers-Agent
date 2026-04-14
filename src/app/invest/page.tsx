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
        description="Shortlist Brisbane suburbs through the lenses that matter most to investors: yield, entry price, and demand."
        budgetLabel="Max entry budget"
      />

      <PageWrapper className="pb-20 md:pb-28">
        <DisclaimerCard
          heading="This is a recommendation engine, not financial advice."
          body="These rankings use mock suburb data and transparent scoring logic to help you compare trade-offs faster. They do not account for your personal circumstances, financing position, tax settings, or asset selection details."
          linkHref="/methodology"
          linkLabel="Read the methodology."
        />
      </PageWrapper>
    </>
  );
}
