interface RankIndicatorProps {
  rank: number;
}

export function RankIndicator({ rank }: RankIndicatorProps) {
  return (
    <span className="font-mono text-3xl font-bold text-brand-border">{String(rank).padStart(2, "0")}</span>
  );
}
