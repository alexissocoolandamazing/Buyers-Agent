import Link from "next/link";

const aboutLinks = [
  { label: "Overview", href: "/" },
  { label: "Methodology", href: "/methodology" },
  { label: "Contact", href: "mailto:hello@suburbiq.com.au" },
];

const pageLinks = [
  { label: "Rent", href: "/rent" },
  { label: "Buy", href: "/buy" },
  { label: "Invest", href: "/invest" },
];

export function Footer() {
  return (
    <footer className="section-space-tight">
      <div className="site-shell">
        <div className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,0.7fr))]">
            <div className="space-y-5">
              <Link href="/" className="inline-flex items-center gap-3 rounded-full">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(17,32,51,0.1)] bg-white/80 font-[var(--font-display)] text-sm font-semibold uppercase tracking-[0.24em] text-brand-navy">
                  SI
                </span>
                <span>
                  <span className="block text-[1.05rem] font-semibold tracking-tight text-brand-navy">SuburbIQ</span>
                  <span className="block text-[0.62rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
                    Brisbane Property Intelligence
                  </span>
                </span>
              </Link>

              <p className="max-w-md text-[0.98rem] leading-8 text-neutral-700">
                Premium Brisbane suburb recommendations for renters, buyers, and investors who want clearer decisions,
                stronger logic, and a calmer interface.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-neutral-600">Company</h3>
              <div className="space-y-3">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm font-medium text-neutral-700 transition hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-neutral-600">Explore</h3>
              <div className="space-y-3">
                {pageLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm font-medium text-neutral-700 transition hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-neutral-600">Disclaimer</h3>
              <p className="text-sm leading-7 text-neutral-600">
                Rankings are designed to help compare suburbs faster, not replace professional due diligence. Always
                verify market, finance, and legal assumptions independently before acting.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[rgba(17,32,51,0.08)] pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 SuburbIQ. Data is informational only. Not financial or property advice.</p>
            <p>Designed for calm, data-backed Brisbane property discovery.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
