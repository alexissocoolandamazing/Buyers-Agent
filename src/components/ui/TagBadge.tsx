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
  region: "border-brand-border bg-brand-mist text-brand-navy",
  rent: "border-brand-blue/20 bg-brand-blue/10 text-brand-blue",
  neutral: "border-brand-border bg-neutral-50 text-neutral-700",
  green: "border-green-200 bg-green-50 text-green-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  purple: "border-purple-200 bg-purple-50 text-purple-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
};

export function TagBadge({ label, tone = "region", className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium",
        toneClassNames[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
