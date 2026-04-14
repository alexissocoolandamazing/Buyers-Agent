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
      title="Buy with a stronger brief."
      description="See which Brisbane suburbs balance purchase value, liveability, and family practicality most convincingly."
      budgetLabel="Max purchase budget"
    />
  );
}
