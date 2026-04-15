import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerCardProps {
  heading: string;
  body: string;
  linkHref?: string;
  linkLabel?: string;
  className?: string;
}

export function DisclaimerCard({
  heading,
  body,
  linkHref,
  linkLabel,
  className,
}: DisclaimerCardProps) {
  return (
    <div className={cn("surface-panel-soft p-6 sm:p-7", className)}>
      <div className="flex items-start gap-4">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(17,32,51,0.08)] bg-white/80">
          <AlertCircle className="h-5 w-5 text-neutral-600" />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-brand-navy">{heading}</h3>
          <p className="text-[0.98rem] leading-8 text-neutral-700">
            {body}{" "}
            {linkHref && linkLabel ? (
              <Link href={linkHref} className="font-semibold text-brand-blue transition hover:text-brand-navy">
                {linkLabel}
              </Link>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}
