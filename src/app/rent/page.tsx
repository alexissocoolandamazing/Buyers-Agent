import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Rent",
  description:
    "Explore Brisbane suburbs for renting with filters, clear score reasons, and a working compare panel.",
};

export default function RentPage() {
  return (
    <PropertyExplorer
      intent="rent"
      title="Rent with more clarity."
      description="Filter Brisbane suburbs by region and weekly budget, then compare the trade-offs in plain English."
      budgetLabel="Max weekly budget"
    />
  );
}
