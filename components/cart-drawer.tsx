"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/utils";
import { ProductImage } from "./product-image";
import { buttonVariants } from "./ui/button";

const FREE_SHIP = 50;

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, count, setQty, removeItem, keyOf } =
    useCart();

  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70]",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      {/* overlay */}
      <div
        onClick={close}
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      {/* panel */}
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-xl">
            Your Bag
            <span className="text-sm font-sans text-muted">({count})</span>
          </h2>
          <button onClick={close} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5">
            <X size={20} />
          </button>
        </div>

        {/* free shipping progress */}
        {lines.length > 0 && (
          <div className="border-b border-line px-5 py-3">
            <p className="text-[13px] text-ink-soft">
              {remaining > 0 ? (
                <>
                  You&apos;re <strong>{formatPrice(remaining)}</strong> away from{" "}
                  <strong>free shipping</strong>
                </>
              ) : (
                <>🎉 You&apos;ve unlocked <strong>free shipping</strong></>
              )}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
              <div
                className="h-full rounded-full bg-sage transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* lines */}
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-sand">
              <ShoppingBag size={26} className="text-muted" />
            </div>
            <div>
              <p className="font-display text-lg">Your bag is empty</p>
              <p className="mt-1 text-sm text-muted">
                Discover your new favorites.
              </p>
            </div>
            <button onClick={close} className={buttonVariants({ variant: "primary" })}>
              Start shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="space-y-4">
              {lines.map((l) => {
                const k = keyOf(l.slug, l.size);
                return (
                  <li key={k} className="flex gap-3">
                    <Link href={`/product/${l.slug}`} onClick={close}>
                      <ProductImage
                        src={l.image}
                        alt={l.name}
                        from={l.from}
                        to={l.to}
                        label={l.name.split(" ")[0]}
                        className="h-24 w-20 shrink-0"
                        rounded="rounded-xl"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link
                          href={`/product/${l.slug}`}
                          onClick={close}
                          className="font-display text-[15px] leading-tight hover:text-sage-deep"
                        >
                          {l.name}
                        </Link>
                        <button
                          onClick={() => removeItem(k)}
                          aria-label="Remove"
                          className="text-muted hover:text-ink"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-muted">{l.size}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-line">
                          <button
                            onClick={() => setQty(k, l.qty - 1)}
                            className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                            aria-label="Decrease"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm">{l.qty}</span>
                          <button
                            onClick={() => setQty(k, l.qty + 1)}
                            className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                            aria-label="Increase"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(l.price * l.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* footer */}
        {lines.length > 0 && (
          <div className="border-t border-line bg-surface px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">Subtotal</span>
              <span className="font-display text-xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">
              Shipping & taxes calculated at checkout.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={close}
                className={buttonVariants({ variant: "dark", size: "lg" })}
              >
                Checkout · {formatPrice(subtotal)}
              </Link>
              <Link
                href="/cart"
                onClick={close}
                className={buttonVariants({ variant: "ghost" })}
              >
                View full bag
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
