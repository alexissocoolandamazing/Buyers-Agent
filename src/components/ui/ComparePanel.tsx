"use client";

import { motion } from "framer-motion";
import { BarChart3, ChevronsUpDown, X } from "lucide-react";
import { formatRent } from "@/lib/format";
import { calculateRentScore, getScoreRows } from "@/lib/recommendations";
import type { BrisbaneSuburb } from "@/lib/types";

interface ComparePanelProps {
  suburbs: BrisbaneSuburb[];
  open: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
}

export function ComparePanel({ suburbs, open, onToggleOpen, onClose }: ComparePanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-5 sm:pb-5">
      <motion.div
        layout
        className="mx-auto max-h-[72vh] w-full max-w-5xl overflow-hidden rounded-[1.6rem] border border-[rgba(17,32,51,0.08)] bg-[rgba(255,252,248,0.96)] shadow-[0_-20px_60px_rgba(17,32,51,0.12)] backdrop-blur-xl"
        initial={false}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <button type="button" className="min-w-0 text-left" onClick={onToggleOpen}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-blue/[0.06] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-blue">
                <BarChart3 className="h-3.5 w-3.5" />
                Rent compare
              </span>
              <p className="mt-3 text-lg font-semibold tracking-tight text-brand-navy sm:text-xl">
                {suburbs.map((suburb) => suburb.name).join(" / ")}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                Quick side-by-side suburb signals without leaving the results.
              </p>
            </button>

            <div className="flex items-center gap-2.5">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(17,32,51,0.1)] bg-white/82 text-neutral-600 transition hover:border-brand-blue/18 hover:text-brand-blue"
                onClick={onClose}
                aria-label="Close compare panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {open ? (
            <div
              className={`overflow-y-auto pr-1 ${suburbs.length === 2 ? "grid gap-3 lg:grid-cols-2" : "grid gap-3 lg:grid-cols-3"}`}
            >
              {suburbs.map((suburb) => {
                const scoreRows = getScoreRows(suburb, "rent");

                return (
                  <div
                    key={suburb.id}
                    className="rounded-[1.25rem] border border-[rgba(17,32,51,0.08)] bg-white/82 p-4"
                  >
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-base font-semibold tracking-tight text-brand-navy sm:text-lg">
                            {suburb.name}
                          </h3>
                          <span className="inline-flex items-center rounded-full border border-brand-blue/12 bg-brand-blue/[0.07] px-2.5 py-1 text-xs font-semibold text-brand-blue">
                            {calculateRentScore(suburb)} / 100
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600">{suburb.region}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="rounded-[1rem] border border-[rgba(17,32,51,0.08)] bg-[rgba(29,95,168,0.04)] px-3 py-2.5">
                          <p className="field-label">Weekly rent</p>
                          <p className="mt-1 text-sm font-semibold tracking-tight text-brand-navy">
                            {formatRent(suburb.medianRentEstimate)}
                          </p>
                        </div>
                        <div className="rounded-[1rem] border border-[rgba(17,32,51,0.08)] bg-[rgba(187,154,103,0.07)] px-3 py-2.5">
                          <p className="field-label">Transport</p>
                          <p className="mt-1 text-sm font-semibold tracking-tight text-brand-navy">
                            {suburb.transportScore} / 100
                          </p>
                        </div>
                      </div>

                      <p className="text-sm leading-6 text-neutral-600">{suburb.recommendationReasons.rent}</p>

                      <div className="grid gap-2.5 border-t border-[rgba(17,32,51,0.08)] pt-3">
                        {scoreRows.map((score) => (
                          <div
                            key={score.label}
                            className="rounded-[0.95rem] border border-[rgba(17,32,51,0.08)] bg-[rgba(255,255,255,0.72)] px-3 py-2.5"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-neutral-600">
                                {score.label}
                              </span>
                              <span className="font-mono text-xs font-semibold text-brand-navy">
                                {score.score} / 100
                              </span>
                            </div>
                            <p className="mt-2 text-[0.85rem] leading-5 text-neutral-600">{score.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
