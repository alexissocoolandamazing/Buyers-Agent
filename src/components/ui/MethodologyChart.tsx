"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MethodologyChartDatum {
  label: string;
  rent: number;
  buy: number;
  invest: number;
}

interface MethodologyChartProps {
  data: MethodologyChartDatum[];
}

export function MethodologyChart({ data }: MethodologyChartProps) {
  return (
    <div className="h-72 min-w-0 w-full">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={288}>
        <BarChart data={data} barGap={10}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(217 229 243)" />
          <XAxis dataKey="label" tick={{ fill: "rgb(71 85 105)", fontSize: 14 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgb(71 85 105)", fontSize: 14 }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="rent" name="Rent" radius={[8, 8, 0, 0]} fill="rgb(var(--chart-rent))" />
          <Bar dataKey="buy" name="Buy" radius={[8, 8, 0, 0]} fill="rgb(var(--chart-buy))" />
          <Bar dataKey="invest" name="Invest" radius={[8, 8, 0, 0]} fill="rgb(var(--chart-invest))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
