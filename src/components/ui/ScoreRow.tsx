interface ScoreRowProps {
  label: string;
  score: number;
  reason: string;
}

function getCompactReason(reason: string) {
  const match = reason.match(/[^.]+(?:\.)?/);
  return match?.[0]?.trim() ?? reason;
}

export function ScoreRow({ label, score, reason }: ScoreRowProps) {
  const progressWidth = `${Math.max(8, Math.min(100, score))}%`;

  return (
    <div className="space-y-2 rounded-[1rem] border border-[rgba(17,32,51,0.08)] bg-white/78 p-3">
      <div className="flex items-start justify-between gap-4">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
          {label}
        </span>
        <span className="font-mono text-sm font-semibold text-brand-navy">{Math.round(score)} / 100</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(29,95,168,0.08)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#1d5fa8_0%,#2f7bd0_100%)]"
          style={{ width: progressWidth }}
        />
      </div>

      <p className="text-[0.85rem] leading-5 text-neutral-600">{getCompactReason(reason)}</p>
    </div>
  );
}
