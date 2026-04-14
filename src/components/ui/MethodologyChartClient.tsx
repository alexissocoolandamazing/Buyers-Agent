"use client";

import dynamic from "next/dynamic";

interface MethodologyChartDatum {
  label: string;
  rent: number;
  buy: number;
  invest: number;
}

interface MethodologyChartClientProps {
  data: MethodologyChartDatum[];
}

const LazyMethodologyChart = dynamic(
  () => import("@/components/ui/MethodologyChart").then((module) => module.MethodologyChart),
  { ssr: false }
);

export function MethodologyChartClient({ data }: MethodologyChartClientProps) {
  return <LazyMethodologyChart data={data} />;
}
