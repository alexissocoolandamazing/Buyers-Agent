"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
  animate?: boolean;
}

export function PageWrapper({
  children,
  className,
  as = "section",
  id,
  animate = true,
}: PageWrapperProps) {
  const sharedClassName = cn("mx-auto max-w-6xl px-6", className);

  if (!animate) {
    const StaticTag = as;

    return (
      <StaticTag id={id} className={sharedClassName}>
        {children}
      </StaticTag>
    );
  }

  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      id={id}
      className={sharedClassName}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
