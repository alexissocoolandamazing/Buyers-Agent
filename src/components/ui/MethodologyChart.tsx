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
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(17, 32, 51, 0.12)" />
          <XAxis dataKey="label" tick={{ fill: "rgb(71 85 105)", fontSize: 13 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgb(71 85 105)", fontSize: 13 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(17, 32, 51, 0.04)" }}
            contentStyle={{
              borderRadius: "18px",
              border: "1px solid rgba(17, 32, 51, 0.08)",
              boxShadow: "0 22px 48px -34px rgba(17, 32, 51, 0.38)",
            }}
          />
          <Bar dataKey="rent" name="Rent" radius={[10, 10, 0, 0]} fill="rgb(var(--chart-rent))" />
          <Bar dataKey="buy" name="Buy" radius={[10, 10, 0, 0]} fill="rgb(var(--chart-buy))" />
          <Bar dataKey="invest" name="Invest" radius={[10, 10, 0, 0]} fill="rgb(var(--chart-invest))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
