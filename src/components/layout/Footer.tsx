import Link from "next/link";

const aboutLinks = [
  { label: "About", href: "/" },
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
    <footer className="border-t border-brand-border bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex text-lg font-bold tracking-tight text-brand-navy">
              SuburbIQ
            </Link>
            <p className="text-base leading-relaxed text-neutral-700">
              Premium Brisbane suburb recommendations for renters, buyers, and investors who want clearer decisions.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-600">Links</h3>
            <div className="space-y-3">
              {aboutLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block text-base text-neutral-700 hover:text-brand-blue">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-600">Pages</h3>
            <div className="space-y-3">
              {pageLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block text-base text-neutral-700 hover:text-brand-blue">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-600">Disclaimer</h3>
            <p className="text-base leading-relaxed text-neutral-700">
              Rankings are designed to help you compare suburbs faster, not replace professional due diligence. Always
              verify market, finance, and legal assumptions independently before acting.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-border pt-6">
          <p className="text-sm text-neutral-600">
            © 2025 SuburbIQ. Data is informational only. Not financial or property advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
