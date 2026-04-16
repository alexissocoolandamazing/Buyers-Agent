import { Sparkles } from "lucide-react";

interface PageHeroProps {
  badgeLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
}

export function PageHero({
  badgeLabel,
  eyebrow,
  title,
  description,
  summary,
}: PageHeroProps) {
  return (
    <div className="surface-panel relative h-full overflow-hidden p-6 sm:p-7 xl:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(29,95,168,0.12),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.88),rgba(247,250,252,0.8))]" />
      <div className="relative flex h-full flex-col gap-6">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-blue/[0.07] px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            <Sparkles className="h-3.5 w-3.5" />
            {badgeLabel}
          </span>

          <div className="max-w-3xl space-y-3.5">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="max-w-3xl text-[clamp(2.45rem,4.6vw,4.15rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-brand-navy">
              {title}
            </h1>
            <p className="max-w-2xl text-[0.98rem] leading-7 text-neutral-700 sm:text-[1.04rem]">
              {description}
            </p>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-[rgba(17,32,51,0.08)] bg-white/76 px-4 py-4 shadow-[0_18px_36px_-34px_rgba(11,24,40,0.22)]">
          <p className="field-label">In view now</p>
          <p className="mt-2 text-sm leading-6 text-neutral-700 sm:text-[0.96rem]">{summary}</p>
        </div>
      </div>
    </div>
  );
}
