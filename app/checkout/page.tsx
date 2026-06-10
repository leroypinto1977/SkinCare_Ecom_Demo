"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ChevronLeft, CreditCard } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, count, clear } = useCart();
  const [placing, setPlacing] = useState(false);
  const [ship, setShip] = useState<"standard" | "express">("standard");

  const shippingCost = ship === "express" ? 12 : subtotal >= 50 ? 0 : 5;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shippingCost + tax;

  if (lines.length === 0 && !placing) {
    return (
      <div className="container-page grid place-items-center py-28 text-center">
        <h1 className="font-display text-3xl">Your bag is empty</h1>
        <p className="mt-2 text-ink-soft">Add a few products before checking out.</p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-ink px-7 py-3 text-sm font-medium text-cream"
        >
          Shop now
        </Link>
      </div>
    );
  }

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    clear();
    router.push("/order-confirmation");
  };

  return (
    <div className="container-page py-10">
      <Link
        href="/cart"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
      >
        <ChevronLeft size={16} /> Back to bag
      </Link>

      <form
        onSubmit={placeOrder}
        className="mt-6 grid gap-10 lg:grid-cols-[1fr_400px]"
      >
        {/* form */}
        <div className="space-y-9">
          <h1 className="font-display text-3xl">Checkout</h1>

          <Section step="1" title="Contact">
            <Field label="Email address" type="email" placeholder="you@example.com" />
            <label className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
              <input type="checkbox" className="accent-[var(--color-sage)]" />
              Email me with news and offers
            </label>
          </Section>

          <Section step="2" title="Shipping address">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" placeholder="Jordan" />
              <Field label="Last name" placeholder="Avery" />
            </div>
            <Field label="Address" placeholder="123 Maple Street" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="City" placeholder="Portland" />
              <Field label="Postal code" placeholder="97201" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="State" placeholder="Oregon" />
              <Field label="Phone" type="tel" placeholder="(555) 010-2026" />
            </div>
          </Section>

          <Section step="3" title="Delivery method">
            <div className="space-y-2">
              <DeliveryOption
                selected={ship === "standard"}
                onSelect={() => setShip("standard")}
                title="Standard"
                sub="3–5 business days"
                price={subtotal >= 50 ? "Free" : "$5.00"}
              />
              <DeliveryOption
                selected={ship === "express"}
                onSelect={() => setShip("express")}
                title="Express"
                sub="1–2 business days"
                price="$12.00"
              />
            </div>
          </Section>

          <Section step="4" title="Payment">
            <div className="rounded-xl border border-line bg-paper p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CreditCard size={16} /> Credit card
              </div>
              <div className="mt-3 space-y-3">
                <Field label="Card number" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry" placeholder="MM / YY" />
                  <Field label="CVC" placeholder="123" />
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-[12px] text-muted">
                <Lock size={13} /> This is a demo — no real payment is processed.
              </p>
            </div>
          </Section>

          <button
            type="submit"
            className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-cream transition hover:bg-ink-soft"
          >
            <Lock size={16} /> Pay {formatPrice(total)}
          </button>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-display text-lg">
              Order summary <span className="text-sm text-muted">({count})</span>
            </h2>
            <ul className="mt-4 space-y-3">
              {lines.map((l) => (
                <li key={l.slug + l.size} className="flex items-center gap-3">
                  <div className="relative">
                    <ProductImage
                      src={l.image}
                      alt={l.name}
                      from={l.from}
                      to={l.to}
                      label={l.name.split(" ")[0]}
                      className="h-14 w-12 shrink-0"
                      rounded="rounded-lg"
                    />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-[11px] text-cream">
                      {l.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight">{l.name}</p>
                    <p className="text-[12px] text-muted">{l.size}</p>
                  </div>
                  <span className="text-sm font-medium">
                    {formatPrice(l.price * l.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Tax</dt>
                <dd>{formatPrice(tax)}</dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-line pt-3">
                <dt className="font-display text-lg">Total</dt>
                <dd className="font-display text-xl">{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2.5 font-display text-xl">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-sage-soft text-[13px] font-semibold text-sage-deep">
          {step}
        </span>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
      />
    </label>
  );
}

function DeliveryOption({
  selected,
  onSelect,
  title,
  sub,
  price,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  sub: string;
  price: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
        selected ? "border-sage bg-sage-soft/50" : "border-line bg-paper hover:border-ink/30"
      }`}
    >
      <span
        className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
          selected ? "border-sage" : "border-line"
        }`}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-sage" />}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-[12px] text-muted">{sub}</span>
      </span>
      <span className="text-sm font-semibold">{price}</span>
    </button>
  );
}
