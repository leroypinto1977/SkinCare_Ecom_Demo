"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, Tag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import { buttonVariants } from "@/components/ui/button";

export default function CartPage() {
  const { lines, subtotal, count, setQty, removeItem, keyOf } = useCart();

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  if (lines.length === 0) {
    return (
      <div className="container-page grid place-items-center py-28 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-sand">
          <ShoppingBag size={30} className="text-muted" />
        </div>
        <h1 className="mt-6 font-display text-3xl">Your bag is empty</h1>
        <p className="mt-2 max-w-sm text-ink-soft">
          Looks like you haven&apos;t added anything yet. Let&apos;s find your new
          skincare staples.
        </p>
        <Link href="/shop" className={buttonVariants({ variant: "dark", size: "lg", className: "mt-6" })}>
          Shop all products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="font-display text-4xl">Your Bag</h1>
      <p className="mt-1 text-ink-soft">{count} items</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* lines */}
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((l) => {
              const k = keyOf(l.slug, l.size);
              return (
                <li key={k} className="flex gap-4 py-5">
                  <Link href={`/product/${l.slug}`}>
                    <ProductImage
                      src={l.image}
                      alt={l.name}
                      from={l.from}
                      to={l.to}
                      label={l.name.split(" ")[0]}
                      className="h-28 w-24 shrink-0"
                      rounded="rounded-xl"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link
                          href={`/product/${l.slug}`}
                          className="font-display text-lg hover:text-sage-deep"
                        >
                          {l.name}
                        </Link>
                        <p className="text-sm text-muted">{l.size}</p>
                      </div>
                      <span className="font-semibold">
                        {formatPrice(l.price * l.qty)}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          onClick={() => setQty(k, l.qty - 1)}
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5"
                          aria-label="Decrease"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-sm">{l.qty}</span>
                        <button
                          onClick={() => setQty(k, l.qty + 1)}
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5"
                          aria-label="Increase"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(k)}
                        className="flex items-center gap-1 text-sm text-muted hover:text-ink"
                      >
                        <X size={15} /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center text-sm font-semibold text-sage-deep hover:underline"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-display text-xl">Order Summary</h2>

            {/* promo */}
            <div className="mt-4 flex items-center gap-2 rounded-full border border-line bg-paper px-2 py-1.5">
              <Tag size={16} className="ml-2 text-muted" />
              <input
                placeholder="Promo code"
                className="h-8 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted"
              />
              <button className="rounded-full bg-ink px-4 py-1.5 text-[13px] font-medium text-cream">
                Apply
              </button>
            </div>

            <dl className="mt-5 space-y-2.5 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row
                label="Shipping"
                value={shipping === 0 ? "Free" : formatPrice(shipping)}
              />
              <Row label="Estimated tax" value={formatPrice(tax)} />
              <div className="my-3 border-t border-line" />
              <div className="flex items-center justify-between">
                <dt className="font-display text-lg">Total</dt>
                <dd className="font-display text-2xl">{formatPrice(total)}</dd>
              </div>
            </dl>

            <Link
              href="/checkout"
              className={buttonVariants({ variant: "dark", size: "lg", className: "mt-5 w-full" })}
            >
              Proceed to checkout
            </Link>
            <p className="mt-3 text-center text-[12px] text-muted">
              Secure checkout · Free returns within 30 days
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
