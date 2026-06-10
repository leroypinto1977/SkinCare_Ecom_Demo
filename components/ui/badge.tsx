import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tones = {
  sage: "bg-sage-soft text-sage-deep",
  clay: "bg-clay-soft text-clay-deep",
  ink: "bg-ink text-cream",
  neutral: "bg-sand text-ink-soft",
  gold: "bg-[#f4ecd2] text-[#8a721f]",
} as const;

export function Badge({
  children,
  tone = "sage",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
