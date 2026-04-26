"use client";

import type { ReactNode } from "react";

interface QuizCardProps {
  eyebrow: string;
  title: string;
  progress: number;
  children: ReactNode;
}

export function QuizCard({ eyebrow, title, progress, children }: QuizCardProps) {
  return (
    <div className="surface-panel-dark relative overflow-hidden p-5 text-white sm:p-6 lg:p-7">
      <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow eyebrow-inverse">{eyebrow}</p>
            <span className="font-mono text-xs font-semibold text-white/55">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#ffffff,#f4e8d4)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h2>
        </div>

        {children}
      </div>
    </div>
  );
}
