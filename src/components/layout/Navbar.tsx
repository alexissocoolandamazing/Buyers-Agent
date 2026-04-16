"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 18);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="site-shell !px-0">
          <motion.div
            className={cn(
              "mx-auto flex items-center justify-between gap-3 rounded-[1.75rem] border px-3 py-2.5 text-white sm:px-4 lg:px-5",
              isScrolled
                ? "border-white/12 bg-[rgba(8,17,30,0.9)] shadow-[var(--shadow-nav)] backdrop-blur-2xl"
                : "border-white/8 bg-[rgba(8,17,30,0.68)] backdrop-blur-xl"
            )}
            initial={false}
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: isScrolled ? 0.99 : 1,
                    y: 0,
                  }
            }
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-3 rounded-[1.2rem] px-1.5 py-1.5 focus-visible:outline-none"
              aria-label="SuburbIQ home"
            >
              <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-white/14 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_58%)]" />
                <span className="relative font-[var(--font-display)] text-sm font-semibold uppercase tracking-[0.22em] text-white">
                  SI
                </span>
              </span>

              <span className="min-w-0">
                <span className="block truncate text-[1rem] font-semibold tracking-tight text-white">SuburbIQ</span>
                <span className="hidden truncate text-[0.62rem] font-medium uppercase tracking-[0.26em] text-white/44 sm:block">
                  Brisbane Property Intelligence
                </span>
              </span>
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
              {navigationLinks.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold tracking-tight transition duration-200 ease-out",
                      active
                        ? "bg-white/13 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                        : "text-white/64 hover:bg-white/8 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block lg:w-[9.5rem]" aria-hidden="true" />

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/7 text-white transition duration-200 hover:bg-white/12 lg:hidden"
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation"
              aria-expanded={isOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-50 bg-[rgba(7,14,25,0.54)] backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation overlay"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.aside
              className="fixed inset-x-3 top-3 z-[60] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(8,17,30,0.96)] p-4 text-white shadow-[var(--shadow-nav)] backdrop-blur-2xl sm:inset-x-5 sm:top-4 lg:hidden"
              initial={reduceMotion ? false : { opacity: 0, y: -20, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -14, scale: 0.985 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setIsOpen(false)}>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/14 bg-white/10 font-[var(--font-display)] text-sm font-semibold uppercase tracking-[0.22em]">
                    SI
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[1rem] font-semibold tracking-tight">SuburbIQ</span>
                    <span className="block text-[0.62rem] font-medium uppercase tracking-[0.24em] text-white/46">
                      Brisbane property intelligence
                    </span>
                  </span>
                </Link>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/7 transition duration-200 hover:bg-white/12"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 space-y-2">
                {navigationLinks.map((link) => {
                  const active = isActivePath(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-[1.15rem] border px-4 py-3.5 transition duration-200",
                        active
                          ? "border-white/16 bg-white/10"
                          : "border-transparent bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.07]"
                      )}
                    >
                      <span className="block text-[1rem] font-semibold tracking-tight text-white">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
