import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SummaryParagraphProps {
  children: ReactNode;
  className?: string;
}

export function SummaryParagraph({ children, className }: SummaryParagraphProps) {
  return (
    <blockquote
      className={cn(
        "rounded-r-xl border-l-4 border-brand-blue bg-brand-mist p-4 text-sm italic leading-relaxed text-neutral-700",
        className
      )}
    >
      {children}
    </blockquote>
  );
}
