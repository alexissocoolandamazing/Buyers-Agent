import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Buy",
  description:
    "Explore Brisbane suburbs for buying with price discipline, lifestyle context, and family liveability signals.",
};

export default function BuyPage() {
  return (
    <PropertyExplorer
      intent="buy"
      title="Buy with a clearer brief."
      description="Start with the full Brisbane shortlist, then apply price and region filters when you want a narrower buying view."
      budgetLabel="Purchase budget"
    />
  );
}
