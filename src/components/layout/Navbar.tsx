"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Rent", href: "/rent" },
  { label: "Buy", href: "/buy" },
  { label: "Invest", href: "/invest" },
  { label: "Methodology", href: "/methodology" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-transparent bg-brand-navy transition-all",
          isScrolled && "border-white/10 bg-brand-navy/95 shadow-md backdrop-blur"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            SuburbIQ
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationLinks.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium text-white/80 transition-colors hover:text-white",
                    active && "text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <CTAButton href="/rent" variant="primary" size="sm">
              Get started
            </CTAButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-50 bg-brand-navy/45 lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation overlay"
            />

            <motion.aside
              className="fixed inset-y-0 right-0 z-[60] w-full max-w-sm border-l border-white/10 bg-brand-navy p-6 text-white lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="text-lg font-bold tracking-tight text-white" onClick={() => setIsOpen(false)}>
                  SuburbIQ
                </Link>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-12 space-y-5">
                {navigationLinks.map((link) => {
                  const active = isActivePath(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block text-base font-medium text-white/80 transition-colors hover:text-white",
                        active && "text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-10">
                <CTAButton href="/rent" variant="primary" className="w-full" onClick={() => setIsOpen(false)}>
                  Get started
                </CTAButton>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
