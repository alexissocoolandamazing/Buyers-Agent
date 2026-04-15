interface RankIndicatorProps {
  rank: number;
}

export function RankIndicator({ rank }: RankIndicatorProps) {
  return (
    <span className="inline-flex min-w-[3.5rem] rounded-full border border-brand-blue/12 bg-brand-blue/[0.08] px-3 py-2 text-center font-[var(--font-display)] text-2xl font-semibold tracking-tight text-brand-navy/86">
      {String(rank).padStart(2, "0")}
    </span>
  );
}
