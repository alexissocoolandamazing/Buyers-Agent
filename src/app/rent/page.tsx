import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Rent",
  description:
    "Explore Brisbane suburbs for renting with transparent rankings and renter-friendly signals.",
};

export default function RentPage() {
  return (
    <PropertyExplorer
      intent="rent"
      title="Brisbane rental rankings"
      description="All suburbs ranked for renters. Filter by region and weekly budget to narrow the shortlist."
      budgetLabel="Weekly budget"
    />
  );
}
