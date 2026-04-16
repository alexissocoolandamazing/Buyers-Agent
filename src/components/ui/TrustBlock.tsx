import type { LucideIcon } from "lucide-react";

interface TrustBlockItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface TrustBlockProps {
  items: TrustBlockItem[];
  tone?: "default" | "inverse";
}

export function TrustBlock({ items, tone = "default" }: TrustBlockProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={
              tone === "inverse"
                ? "h-full rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6"
                : "surface-panel-soft h-full p-5 sm:p-6"
            }
          >
            <div className="space-y-4">
              <div
                className={
                  tone === "inverse"
                    ? "inline-flex h-10 w-10 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.08]"
                    : "inline-flex h-10 w-10 items-center justify-center rounded-[1rem] border border-brand-blue/12 bg-brand-blue/[0.08]"
                }
              >
                <Icon className={tone === "inverse" ? "h-4 w-4 text-white" : "h-4 w-4 text-brand-navy"} />
              </div>
              <div className="space-y-2.5">
                <h3
                  className={
                    tone === "inverse"
                      ? "text-lg font-semibold tracking-tight text-white"
                      : "text-lg font-semibold tracking-tight text-brand-navy"
                  }
                >
                  {item.title}
                </h3>
                <p
                  className={
                    tone === "inverse"
                      ? "text-[0.95rem] leading-7 text-white/66"
                      : "text-[0.95rem] leading-7 text-neutral-700"
                  }
                >
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
