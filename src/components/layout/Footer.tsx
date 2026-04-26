import Link from "next/link";
import { MapPin } from "lucide-react";
import { MVP_DATA_DISCLAIMER } from "@/data/brisbaneSuburbs";

const aboutLinks = [
  { label: "Overview", href: "/" },
  { label: "Methodology", href: "/methodology" },
  { label: "About placeholder", href: "/methodology#limitations" },
  { label: "Contact placeholder", href: "mailto:hello@nook.example" },
];

const pageLinks = [
  { label: "Rent", href: "/rent" },
  { label: "Buy", href: "/buy" },
  { label: "Invest", href: "/invest" },
  { label: "Start quiz", href: "/#quiz" },
];

export function Footer() {
  return (
    <footer className="section-space-tight">
      <div className="site-shell">
        <div className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,0.7fr))]">
            <div className="space-y-5">
              <Link href="/" className="inline-flex items-center gap-3 rounded-full">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(17,32,51,0.1)] bg-white/80 text-brand-navy">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-[1.02rem] font-semibold tracking-tight text-brand-navy">Nook</span>
              </Link>

              <p className="max-w-sm text-[0.94rem] leading-7 text-neutral-600">
                Find your corner of Brisbane. Suburb discovery for renters, buyers, and investors.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-neutral-500">Company</h3>
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
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-neutral-500">Explore</h3>
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
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-neutral-500">Prototype notice</h3>
              <p className="text-sm leading-7 text-neutral-600">
                {MVP_DATA_DISCLAIMER} Nook is informational only and is not financial, legal, tax, or property advice.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-[rgba(17,32,51,0.08)] pt-6 text-sm text-neutral-500">
            <p>(c) 2026 Nook. Brisbane suburb discovery MVP.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
