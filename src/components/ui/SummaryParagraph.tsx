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
        "rounded-[1.35rem] border border-brand-blue/10 bg-[linear-gradient(180deg,rgba(29,95,168,0.07),rgba(29,95,168,0.03))] p-5 text-[0.96rem] leading-8 text-neutral-700",
        className
      )}
    >
      {children}
    </blockquote>
  );
}
