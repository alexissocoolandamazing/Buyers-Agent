import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Buy",
  description:
    "Explore Brisbane suburbs for buying with transparent rankings and owner-occupier signals.",
};

export default function BuyPage() {
  return (
    <PropertyExplorer
      intent="buy"
      title="Brisbane buying rankings"
      description="All suburbs ranked for buyers. Filter by region and purchase budget to focus the shortlist."
      budgetLabel="Purchase budget"
    />
  );
}
