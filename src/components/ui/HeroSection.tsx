import { CTAButton } from "@/components/ui/CTAButton";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy bg-hero-grid bg-[length:72px_72px] text-white">
      <div className="absolute inset-0 bg-white/[0.02]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-24">
        <div className="flex flex-1 items-center">
          <div className="max-w-3xl space-y-8 text-center md:text-left">
            <div className="space-y-5">
              <p className="font-sans text-sm font-medium uppercase tracking-wide text-white/60">
                Brisbane Property Discovery Platform
              </p>
              <h1 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Find your perfect
                <br />
                Brisbane suburb.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-white/80">
                Compare Brisbane suburbs through a calmer, data-backed lens for renting, buying, and investing.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <CTAButton href="/rent" variant="primary" tone="default">
                Find best suburbs
              </CTAButton>
              <CTAButton href="/methodology" variant="secondary" tone="inverse">
                See how it works
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="pt-12 text-center md:text-left">
          <p className="text-sm text-white/60">
            9 suburbs profiled · Updated weekly · Every score explained
          </p>
        </div>
      </div>
    </section>
  );
}
