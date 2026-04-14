"use client";

import { X } from "lucide-react";
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
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
      <div className="mx-auto max-w-6xl">
        <div
          className={`overflow-hidden rounded-t-2xl border border-b-0 border-brand-border bg-white shadow-lg ${
            open ? "h-[340px]" : "h-20"
          }`}
        >
          <div className="flex h-20 items-center justify-between gap-4 px-6">
            <button type="button" className="min-w-0 text-left" onClick={onToggleOpen}>
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-600">Compare suburbs</p>
              <p className="mt-2 truncate text-base font-semibold text-brand-navy">
                {suburbs.map((suburb) => suburb.name).join(" · ")}
              </p>
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-neutral-600"
              onClick={onClose}
              aria-label="Close compare panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {open ? (
            <div className="h-[260px] overflow-y-auto border-t border-brand-border px-6 py-5">
              <div className={`grid gap-6 ${suburbs.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                {suburbs.map((suburb) => (
                  <div key={suburb.id} className="space-y-4 rounded-2xl border border-brand-border bg-neutral-50 p-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-brand-navy">{suburb.name}</h3>
                      <p className="text-sm text-neutral-600">{suburb.region}</p>
                    </div>

                    <div className="space-y-4">
                      {getScoreRows(suburb, "rent").map((score) => (
                        <div key={score.label} className="space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <span className="text-sm font-medium uppercase tracking-wide text-neutral-600">
                              {score.label}
                            </span>
                            <span className="font-mono text-sm font-semibold text-brand-navy">
                              {score.score.toFixed(1)} / 10
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-neutral-700">{score.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
