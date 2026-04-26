import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Rent in Brisbane",
  description:
    "Find Brisbane suburbs for renting based on budget, bedrooms, lifestyle, commute, and amenity signals.",
};

export default async function RentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <PropertyExplorer
      intent="rent"
      title="Find a Brisbane suburb that makes renting feel easier."
      description="Start with useful renter recommendations, then filter by weekly rent, bedrooms, region, transport, lifestyle, and safety."
      budgetLabel="Weekly budget"
      initialParams={params}
    />
  );
}
