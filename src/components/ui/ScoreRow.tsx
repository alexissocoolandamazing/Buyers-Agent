import { cn } from "@/lib/utils";

interface ScoreRowProps {
  label: string;
  score: number;
  reason: string;
}

const scoreWidthClassNames: Record<string, string> = {
  "4.8": "w-[48%]",
  "5.8": "w-[58%]",
  "5.9": "w-[59%]",
  "6.2": "w-[62%]",
  "6.4": "w-[64%]",
  "6.5": "w-[65%]",
  "6.7": "w-[67%]",
  "6.8": "w-[68%]",
  "6.9": "w-[69%]",
  "7.0": "w-[70%]",
  "7.1": "w-[71%]",
  "7.2": "w-[72%]",
  "7.3": "w-[73%]",
  "7.4": "w-[74%]",
  "7.5": "w-[75%]",
  "7.6": "w-[76%]",
  "7.7": "w-[77%]",
  "7.8": "w-[78%]",
  "7.9": "w-[79%]",
  "8.0": "w-[80%]",
  "8.1": "w-[81%]",
  "8.2": "w-[82%]",
  "8.3": "w-[83%]",
  "8.4": "w-[84%]",
  "8.5": "w-[85%]",
  "8.6": "w-[86%]",
  "8.7": "w-[87%]",
  "8.8": "w-[88%]",
  "8.9": "w-[89%]",
  "9.0": "w-[90%]",
  "9.1": "w-[91%]",
  "9.4": "w-[94%]",
  "9.6": "w-[96%]",
};

export function ScoreRow({ label, score, reason }: ScoreRowProps) {
  const widthClassName = scoreWidthClassNames[score.toFixed(1)] ?? "w-[80%]";

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <span className="font-sans text-sm font-medium uppercase tracking-wide text-neutral-600">
          {label}
        </span>
        <span className="font-mono text-sm font-semibold text-brand-navy">{score.toFixed(1)} / 10</span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-brand-mist">
        <div className={cn("h-full rounded-full bg-brand-blue", widthClassName)} />
      </div>

      <p className="text-sm italic leading-relaxed text-neutral-600">{reason}</p>
    </div>
  );
}
