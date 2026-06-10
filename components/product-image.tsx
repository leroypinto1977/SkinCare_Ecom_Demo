"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductImage({
  src,
  alt,
  from,
  to,
  className,
  rounded = "rounded-2xl",
  label,
}: {
  src: string;
  alt: string;
  from: string;
  to: string;
  className?: string;
  rounded?: string;
  label?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        rounded,
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(140deg, ${from}, ${to})`,
      }}
    >
      {/* decorative bottle silhouette for the fallback / loading state */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="flex flex-col items-center gap-3 opacity-60">
          <div className="h-20 w-14 rounded-[0.6rem] bg-white/40 backdrop-blur-sm shadow-inner ring-1 ring-white/40" />
          <span className="font-display text-sm tracking-[0.3em] text-ink/40 uppercase">
            {label ?? "Aurelle"}
          </span>
        </div>
      </div>

      {!failed && src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* subtle gradient sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
    </div>
  );
}
