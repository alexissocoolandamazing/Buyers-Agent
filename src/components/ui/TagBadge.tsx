import { cn } from "@/lib/utils";

export type TagBadgeTone =
  | "region"
  | "rent"
  | "neutral"
  | "green"
  | "blue"
  | "purple"
  | "amber";

interface TagBadgeProps {
  label: string;
  tone?: TagBadgeTone;
  className?: string;
}

const toneClassNames: Record<TagBadgeTone, string> = {
  region: "border-[rgba(17,32,51,0.08)] bg-white/80 text-brand-navy",
  rent: "border-brand-blue/15 bg-brand-blue/[0.08] text-brand-blue",
  neutral: "border-[rgba(17,32,51,0.08)] bg-[rgba(255,255,255,0.7)] text-neutral-700",
  green: "border-green-200/90 bg-green-50 text-green-700",
  blue: "border-blue-200/90 bg-blue-50 text-blue-700",
  purple: "border-violet-200/90 bg-violet-50 text-violet-700",
  amber: "border-amber-200/90 bg-amber-50 text-amber-700",
};

export function TagBadge({ label, tone = "region", className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em]",
        toneClassNames[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
