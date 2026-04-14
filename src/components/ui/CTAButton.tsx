import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CTAButtonVariant = "primary" | "secondary" | "ghost";
type CTAButtonTone = "default" | "inverse";
type CTAButtonSize = "default" | "sm";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: CTAButtonVariant;
  tone?: CTAButtonTone;
  size?: CTAButtonSize;
}

const baseClassName =
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const variantClassNames: Record<CTAButtonVariant, Record<CTAButtonTone, string>> = {
  primary: {
    default: "bg-brand-blue text-white hover:bg-brand-navy",
    inverse: "bg-white text-brand-navy hover:bg-neutral-100",
  },
  secondary: {
    default: "border border-brand-blue text-brand-blue hover:bg-brand-mist",
    inverse: "border border-white/35 text-white hover:bg-white/10",
  },
  ghost: {
    default: "text-brand-blue hover:underline",
    inverse: "text-white hover:underline",
  },
};

const sizeClassNames: Record<CTAButtonSize, string> = {
  default: "px-5 py-2.5",
  sm: "px-4 py-2",
};

export function CTAButton({
  children,
  href,
  variant = "primary",
  tone = "default",
  size = "default",
  className,
  ...buttonProps
}: CTAButtonProps) {
  const combinedClassName = cn(
    baseClassName,
    variantClassNames[variant][tone],
    sizeClassNames[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}
