import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  size?: "default" | "lg";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  tone = "default",
  size = "default",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto text-center",
        align === "center" && (size === "lg" ? "max-w-4xl" : "max-w-3xl"),
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "inverse" && "eyebrow-inverse")}>
          {eyebrow}
        </p>
      ) : null}

      <div className="space-y-3">
        <h2
          className={cn(
            "font-semibold tracking-tight",
            size === "lg" ? "text-3xl sm:text-4xl lg:text-[3.05rem]" : "text-2xl sm:text-3xl lg:text-[2.35rem]",
            tone === "inverse" ? "text-white" : "text-brand-navy"
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "max-w-2xl text-[0.98rem] leading-7 sm:text-[1rem]",
              align === "center" && "mx-auto",
              tone === "inverse" ? "text-white/66" : "text-neutral-700"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
