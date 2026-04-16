interface StepCardProps {
  number: string;
  label: string;
  description: string;
}

export function StepCard({ number, label, description }: StepCardProps) {
  return (
    <div className="surface-panel-soft h-full p-5 sm:p-6">
      <div className="flex h-full flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-[var(--font-display)] text-4xl font-semibold tracking-tight text-brand-navy/22">
            {number}
          </span>
          <span className="rounded-full border border-brand-blue/12 bg-brand-blue/[0.08] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-blue">
            Step
          </span>
        </div>
        <div className="space-y-2.5">
          <h3 className="text-lg font-semibold tracking-tight text-brand-navy">{label}</h3>
          <p className="text-[0.95rem] leading-7 text-neutral-700">{description}</p>
        </div>
      </div>
    </div>
  );
}
