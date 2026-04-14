import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="font-sans text-sm font-medium uppercase tracking-wide text-neutral-600">
          {eyebrow}
        </p>
      ) : null}

      <div className="space-y-3">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          {title}
        </h2>
        {description ? <p className="text-base leading-relaxed text-neutral-700">{description}</p> : null}
      </div>
    </div>
  );
}
