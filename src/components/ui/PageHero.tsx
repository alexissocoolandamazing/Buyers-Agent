import { Sparkles } from "lucide-react";

interface HeroStat {
  label: string;
  value: string;
  detail: string;
}

interface PageHeroProps {
  badgeLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  stats: HeroStat[];
}

export function PageHero({
  badgeLabel,
  eyebrow,
  title,
  description,
  stats,
}: PageHeroProps) {
  return (
    <div className="surface-panel relative h-full overflow-hidden p-6 sm:p-8 xl:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(29,95,168,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(187,154,103,0.1),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.88),rgba(247,250,252,0.78))]" />
      <div className="relative flex h-full flex-col gap-8">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-blue/[0.07] px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            <Sparkles className="h-3.5 w-3.5" />
            {badgeLabel}
          </span>

          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="max-w-3xl text-[clamp(2.9rem,5.5vw,5rem)] font-semibold leading-[0.93] tracking-[-0.06em] text-brand-navy">
              {title}
            </h1>
            <p className="max-w-2xl text-[1rem] leading-8 text-neutral-700 sm:text-[1.08rem]">
              {description}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.35rem] border border-[rgba(17,32,51,0.08)] bg-white/72 p-4 shadow-[0_18px_40px_-34px_rgba(11,24,40,0.26)] backdrop-blur-sm"
            >
              <p className="field-label">{stat.label}</p>
              <p className="mt-3 text-lg font-semibold tracking-tight text-brand-navy sm:text-xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
