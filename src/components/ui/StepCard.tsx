interface StepCardProps {
  number: string;
  label: string;
  description: string;
}

export function StepCard({ number, label, description }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-6">
      <div className="space-y-4">
        <p className="font-sans text-5xl font-bold tracking-tight text-brand-border">{number}</p>
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-brand-navy">{label}</h3>
          <p className="text-sm leading-relaxed text-neutral-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
