import type { LucideIcon } from "lucide-react";

interface TrustBlockItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface TrustBlockProps {
  items: TrustBlockItem[];
}

export function TrustBlock({ items }: TrustBlockProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.title} className="space-y-4">
            <Icon className="h-5 w-5 text-brand-navy" />
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-brand-navy">{item.title}</h3>
              <p className="text-base leading-relaxed text-neutral-700">{item.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
