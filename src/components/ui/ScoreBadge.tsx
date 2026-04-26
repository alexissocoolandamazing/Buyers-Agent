import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  label: string;
  score: number;
  className?: string;
}

export function ScoreBadge({ label, score, className }: ScoreBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex min-w-[6.5rem] flex-col items-center rounded-[1.1rem] border border-brand-blue/12 bg-brand-blue/[0.08] px-3 py-2 text-center",
        className
      )}
    >
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-brand-blue">{label}</span>
      <span className="mt-1 font-[var(--font-display)] text-2xl font-semibold leading-none text-brand-navy">
        {Math.round(score)}
      </span>
      <span className="mt-0.5 text-[0.65rem] font-semibold text-neutral-500">/ 100</span>
    </div>
  );
}
