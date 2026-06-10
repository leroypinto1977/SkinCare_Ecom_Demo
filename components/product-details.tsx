"use client";

import { useState } from "react";
import { Heart, Minus, Plus, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Stars } from "./ui/stars";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {product.badge && (
          <Badge tone={product.badge === "New" ? "clay" : "ink"}>
            {product.badge}
          </Badge>
        )}
        <span className="text-[12px] font-semibold uppercase tracking-wider text-sage-deep">
          {product.gender === "unisex" ? "For everyone" : `For ${product.gender}`}
        </span>
      </div>

      <h1 className="mt-3 font-display text-4xl leading-tight text-ink">
        {product.name}
      </h1>
      <p className="mt-1.5 text-[15px] text-ink-soft">{product.tagline}</p>

      <div className="mt-3 flex items-center gap-2">
        <Stars rating={product.rating} />
        <span className="text-sm text-muted">
          {product.rating} · {product.reviewCount} reviews
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-display text-3xl text-ink">
          {formatPrice(product.price)}
        </span>
        {product.compareAt && (
          <>
            <span className="text-lg text-muted line-through">
              {formatPrice(product.compareAt)}
            </span>
            <Badge tone="gold">
              Save {formatPrice(product.compareAt - product.price)}
            </Badge>
          </>
        )}
      </div>

      <p className="mt-5 leading-relaxed text-ink-soft">{product.description}</p>

      {/* size */}
      <div className="mt-6">
        <p className="mb-2 text-[13px] font-semibold">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                size === s
                  ? "border-ink bg-ink text-cream"
                  : "border-line hover:border-ink/40",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* qty + add */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-12 items-center rounded-full border border-line">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-12 w-11 place-items-center rounded-full hover:bg-ink/5"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center text-sm font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-12 w-11 place-items-center rounded-full hover:bg-ink/5"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={() => addItem(product, size, qty)}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-cream transition hover:bg-ink-soft active:scale-[.99]"
        >
          Add to bag · {formatPrice(product.price * qty)}
        </button>
        <button
          onClick={() => setWished((w) => !w)}
          aria-label="Wishlist"
          className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-ink/40"
        >
          <Heart size={18} className={wished ? "fill-clay text-clay" : ""} />
        </button>
      </div>

      {/* assurances */}
      <div className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4">
        {[
          { icon: Truck, label: "Free shipping over $50" },
          { icon: RefreshCw, label: "30-day returns" },
          { icon: ShieldCheck, label: "Dermatologist-tested" },
        ].map((a) => (
          <div key={a.label} className="flex flex-col items-center gap-1.5 text-center">
            <a.icon size={18} className="text-sage-deep" />
            <span className="text-[11px] leading-tight text-ink-soft">
              {a.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
