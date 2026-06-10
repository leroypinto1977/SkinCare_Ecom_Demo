import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost" | "dark" | "clay";
type Size = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-sage text-white hover:bg-sage-deep shadow-sm hover:shadow-md active:scale-[.98]",
  dark: "bg-ink text-cream hover:bg-ink-soft active:scale-[.98]",
  clay: "bg-clay text-white hover:bg-clay-deep active:scale-[.98]",
  outline:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink/[0.03] active:scale-[.98]",
  ghost: "text-ink hover:bg-ink/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] rounded-full",
  md: "h-11 px-6 text-sm rounded-full",
  lg: "h-13 px-8 text-[15px] rounded-full",
  icon: "h-10 w-10 rounded-full",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
