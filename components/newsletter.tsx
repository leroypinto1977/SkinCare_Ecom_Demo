"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [done, setDone] = useState(false);
  const dark = variant === "dark";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="w-full"
    >
      <div
        className={`flex items-center gap-2 rounded-full border px-2 py-1.5 ${
          dark ? "border-white/25 bg-white/5" : "border-line bg-paper"
        }`}
      >
        <input
          required
          type="email"
          disabled={done}
          placeholder="Enter your email"
          className={`h-9 flex-1 bg-transparent px-3 text-sm outline-none ${
            dark ? "text-white placeholder:text-white/50" : "placeholder:text-muted"
          }`}
        />
        <button
          type="submit"
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${
            dark ? "bg-white text-ink hover:bg-cream" : "bg-ink text-cream hover:bg-ink-soft"
          }`}
          aria-label="Subscribe"
        >
          {done ? <Check size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
      {done && (
        <p className={`mt-2 px-3 text-xs ${dark ? "text-white/70" : "text-muted"}`}>
          You&apos;re in — check your inbox for 10% off your first order.
        </p>
      )}
    </form>
  );
}
