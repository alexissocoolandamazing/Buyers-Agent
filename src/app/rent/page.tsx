import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Rent",
  description:
    "Explore Brisbane suburbs for renting with a premium shortlist, default full-region results, and clearer renter signals.",
};

export default function RentPage() {
  return (
    <PropertyExplorer
      intent="rent"
      title="Rent with a clearer shortlist."
      description="Open on the full Brisbane rental landscape from the first load, then refine by weekly budget and region when you want a tighter renter-friendly view."
      budgetLabel="Weekly budget"
    />
  );
}
