"use client";

import { motion } from "framer-motion";
import { ChevronsUpDown, X } from "lucide-react";
import { getScoreRows } from "@/lib/mockData";
import type { Suburb } from "@/lib/types";

interface ComparePanelProps {
  suburbs: Suburb[];
  open: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
}

export function ComparePanel({ suburbs, open, onToggleOpen, onClose }: ComparePanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="site-shell !px-0">
        <motion.div
          layout
          className="surface-panel overflow-hidden"
          initial={false}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <button type="button" className="min-w-0 text-left" onClick={onToggleOpen}>
              <p className="eyebrow">Compare suburbs</p>
              <p className="mt-2 truncate text-lg font-semibold tracking-tight text-brand-navy">
                {suburbs.map((suburb) => suburb.name).join(" / ")}
              </p>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(17,32,51,0.1)] bg-white/82 px-4 py-2.5 text-sm font-semibold tracking-tight text-neutral-700 transition hover:border-brand-blue/18 hover:text-brand-blue"
                onClick={onToggleOpen}
              >
                <ChevronsUpDown className="h-4 w-4" />
                {open ? "Collapse" : "Expand"}
              </button>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(17,32,51,0.1)] bg-white/82 text-neutral-600 transition hover:border-brand-blue/18 hover:text-brand-blue"
                onClick={onClose}
                aria-label="Close compare panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {open ? (
            <div className="border-t border-[rgba(17,32,51,0.08)] px-5 pb-5 pt-5 sm:px-6">
              <div className={`grid gap-4 ${suburbs.length === 2 ? "xl:grid-cols-2" : "xl:grid-cols-3"}`}>
                {suburbs.map((suburb) => (
                  <div key={suburb.id} className="rounded-[1.6rem] border border-[rgba(17,32,51,0.08)] bg-white/82 p-5">
                    <div className="space-y-1 border-b border-[rgba(17,32,51,0.08)] pb-4">
                      <h3 className="text-xl font-semibold tracking-tight text-brand-navy">{suburb.name}</h3>
                      <p className="text-sm text-neutral-600">{suburb.region}</p>
                    </div>

                    <div className="mt-4 space-y-4">
                      {getScoreRows(suburb, "rent").map((score) => (
                        <div key={score.label} className="rounded-[1.2rem] border border-[rgba(17,32,51,0.08)] bg-[rgba(29,95,168,0.04)] p-4">
                          <div className="flex items-start justify-between gap-4">
                            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                              {score.label}
                            </span>
                            <span className="font-mono text-sm font-semibold text-brand-navy">
                              {score.score.toFixed(1)} / 10
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-neutral-700">{score.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
