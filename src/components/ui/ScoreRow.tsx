interface ScoreRowProps {
  label: string;
  score: number;
  reason: string;
}

export function ScoreRow({ label, score, reason }: ScoreRowProps) {
  const progressWidth = `${Math.max(8, Math.min(100, score * 10))}%`;

  return (
    <div className="space-y-3 rounded-[1.2rem] border border-[rgba(17,32,51,0.08)] bg-white/78 p-4">
      <div className="flex items-start justify-between gap-4">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
          {label}
        </span>
        <span className="font-mono text-sm font-semibold text-brand-navy">{score.toFixed(1)} / 10</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[rgba(29,95,168,0.08)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#1d5fa8_0%,#2f7bd0_100%)]"
          style={{ width: progressWidth }}
        />
      </div>

      <p className="text-[0.95rem] leading-7 text-neutral-600">{reason}</p>
    </div>
  );
}
