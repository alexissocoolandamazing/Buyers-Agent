import { Sparkles } from "lucide-react";

interface RecommendationReasonProps {
  children: string;
}

export function RecommendationReason({ children }: RecommendationReasonProps) {
  return (
    <p className="inline-flex max-w-3xl items-start gap-2 rounded-[1rem] border border-brand-blue/10 bg-brand-blue/[0.06] px-3.5 py-3 text-sm leading-6 text-neutral-700">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
      <span>{children}</span>
    </p>
  );
}
