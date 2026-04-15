"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
  animate?: boolean;
  width?: "default" | "narrow" | "wide";
  delay?: number;
}

export function PageWrapper({
  children,
  className,
  as = "section",
  id,
  animate = true,
  width = "default",
  delay = 0,
}: PageWrapperProps) {
  const reduceMotion = useReducedMotion();
  const sharedClassName = cn(
    width === "narrow" ? "site-shell-narrow" : "site-shell",
    width === "wide" && "max-w-[88rem]",
    className
  );

  if (!animate || reduceMotion) {
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-8% 0px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
