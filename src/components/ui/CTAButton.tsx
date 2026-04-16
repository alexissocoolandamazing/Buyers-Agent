import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CTAButtonVariant = "primary" | "secondary" | "ghost";
type CTAButtonTone = "default" | "inverse";
type CTAButtonSize = "default" | "sm" | "lg";

interface CTAButtonBaseProps {
  children: ReactNode;
  variant?: CTAButtonVariant;
  tone?: CTAButtonTone;
  size?: CTAButtonSize;
  className?: string;
}

type CTAButtonLinkProps = CTAButtonBaseProps & {
  href: string;
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
};

type CTAButtonActionProps = CTAButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    linkProps?: never;
  };

type CTAButtonProps = CTAButtonLinkProps | CTAButtonActionProps;

const baseClassName =
  "inline-flex items-center justify-center rounded-2xl text-sm font-semibold tracking-tight transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50";

const variantClassNames: Record<CTAButtonVariant, Record<CTAButtonTone, string>> = {
  primary: {
    default:
      "border border-brand-blue/10 bg-brand-blue text-white shadow-[0_18px_34px_-24px_rgba(29,95,168,0.58)] hover:bg-brand-navy",
    inverse:
      "border border-white/14 bg-white text-brand-navy shadow-[0_18px_34px_-24px_rgba(255,255,255,0.55)] hover:bg-[#f4efe6]",
  },
  secondary: {
    default:
      "border border-[rgba(17,32,51,0.12)] bg-white/80 text-brand-navy shadow-[0_14px_28px_-24px_rgba(17,32,51,0.36)] hover:border-brand-blue/30 hover:bg-brand-mist/70",
    inverse: "border border-white/22 bg-white/[0.03] text-white hover:bg-white/[0.08]",
  },
  ghost: {
    default: "text-brand-blue hover:text-brand-navy",
    inverse: "text-white hover:text-white/80",
  },
};

const sizeClassNames: Record<CTAButtonSize, string> = {
  default: "px-5 py-3",
  sm: "px-4 py-2.5 text-[0.9rem]",
  lg: "px-6 py-3.5 text-[0.98rem]",
};

export function CTAButton({
  children,
  href,
  variant = "primary",
  tone = "default",
  size = "default",
  className,
  linkProps,
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
      <Link href={href} className={combinedClassName} {...linkProps}>
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
