import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/ui/PropertyExplorer";

export const metadata: Metadata = {
  title: "Buy in Brisbane",
  description:
    "Find Brisbane suburbs for buying based on budget, schools, transport, long-term liveability, and value signals.",
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <PropertyExplorer
      intent="buy"
      title="Shortlist Brisbane suburbs before you scroll listings."
      description="Compare buyer-friendly suburbs by purchase budget, property type, region, schools, transport, lifestyle, and long-term liveability."
      budgetLabel="Purchase budget"
      initialParams={params}
    />
  );
}
