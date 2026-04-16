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
        "rounded-[1.2rem] border border-brand-blue/10 bg-[linear-gradient(180deg,rgba(29,95,168,0.06),rgba(29,95,168,0.02))] p-4 text-[0.94rem] leading-7 text-neutral-700",
        className
      )}
    >
      {children}
    </blockquote>
  );
}
