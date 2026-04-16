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
      title="Rent with clarity."
      description="Scan Brisbane suburbs in a broad default view, then apply a weekly budget and region when you want a tighter shortlist."
      budgetLabel="Weekly budget"
    />
  );
}
