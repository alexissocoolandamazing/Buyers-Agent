import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Buy",
  description:
    "Explore Brisbane suburbs for buying with a premium shortlist, full-region default results, and clearer owner-occupier signals.",
};

export default function BuyPage() {
  return (
    <PropertyExplorer
      intent="buy"
      title="Buy with a more confident brief."
      description="Start with the full Brisbane buying shortlist already in view, then narrow it with purchase budget and region filters when you want a cleaner buying read."
      budgetLabel="Purchase budget"
    />
  );
}
