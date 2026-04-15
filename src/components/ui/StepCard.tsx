interface StepCardProps {
  number: string;
  label: string;
  description: string;
}

export function StepCard({ number, label, description }: StepCardProps) {
  return (
    <div className="surface-panel-soft h-full p-6 sm:p-7">
      <div className="flex h-full flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <span className="font-[var(--font-display)] text-5xl font-semibold tracking-tight text-brand-navy/24">
            {number}
          </span>
          <span className="rounded-full border border-brand-blue/12 bg-brand-blue/[0.08] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-blue">
            Guided flow
          </span>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-brand-navy">{label}</h3>
          <p className="text-[0.98rem] leading-8 text-neutral-700">{description}</p>
        </div>
      </div>
    </div>
  );
}
