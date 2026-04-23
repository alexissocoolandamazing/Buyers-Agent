interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  return (
    <div className="space-y-4">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="max-w-3xl text-[clamp(2.2rem,4.2vw,3.6rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-brand-navy">
        {title}
      </h1>
      <p className="max-w-2xl text-[0.98rem] leading-7 text-neutral-600 sm:text-[1.02rem]">
        {description}
      </p>
    </div>
  );
}
