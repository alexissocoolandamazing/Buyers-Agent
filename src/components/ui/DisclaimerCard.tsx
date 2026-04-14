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
    <div className={cn("rounded-xl border border-brand-border bg-neutral-50 p-5", className)}>
      <div className="flex items-start gap-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-neutral-600" />
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-brand-navy">{heading}</h3>
          <p className="text-sm italic leading-relaxed text-neutral-700">
            {body}{" "}
            {linkHref && linkLabel ? (
              <Link href={linkHref} className="font-medium text-brand-blue hover:underline">
                {linkLabel}
              </Link>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}
