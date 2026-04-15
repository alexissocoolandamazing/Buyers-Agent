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
                ? "h-full rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-6 sm:p-7"
                : "surface-panel-soft h-full p-6 sm:p-7"
            }
          >
            <div className="space-y-5">
              <div
                className={
                  tone === "inverse"
                    ? "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]"
                    : "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-blue/12 bg-brand-blue/[0.08]"
                }
              >
                <Icon className={tone === "inverse" ? "h-5 w-5 text-white" : "h-5 w-5 text-brand-navy"} />
              </div>
              <div className="space-y-3">
                <h3 className={tone === "inverse" ? "text-xl font-semibold tracking-tight text-white" : "text-xl font-semibold tracking-tight text-brand-navy"}>
                  {item.title}
                </h3>
                <p className={tone === "inverse" ? "text-[0.98rem] leading-8 text-white/66" : "text-[0.98rem] leading-8 text-neutral-700"}>
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
