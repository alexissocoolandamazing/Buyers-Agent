import { cn } from "@/lib/utils";

interface MetricPillProps {
  label: string;
  value: string;
  tone?: "default" | "blue" | "gold" | "green";
  className?: string;
}

const toneClassNames = {
  default: "border-[rgba(17,32,51,0.08)] bg-white/82",
  blue: "border-brand-blue/12 bg-brand-blue/[0.07]",
  gold: "border-[#bb9a67]/18 bg-[#bb9a67]/[0.08]",
  green: "border-emerald-200 bg-emerald-50/80",
};

export function MetricPill({ label, value, tone = "default", className }: MetricPillProps) {
  return (
    <div className={cn("rounded-xl border px-3 py-2.5", toneClassNames[tone], className)}>
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">{label}</p>
      <p className="mt-1 font-[var(--font-display)] text-[1.05rem] font-semibold tracking-tight text-brand-navy">
        {value}
      </p>
    </div>
  );
}
