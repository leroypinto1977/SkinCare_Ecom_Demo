"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ChevronLeft, CreditCard, Tag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { placeOrder as persistOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
  EXPRESS_SHIPPING,
  GST_RATE,
  shippingFor,
} from "@/lib/data";
import { ProductImage } from "@/components/product-image";

type FieldName =
  | "email"
  | "firstName"
  | "lastName"
  | "address"
  | "city"
  | "pin"
  | "state"
  | "phone"
  | "card"
  | "expiry"
  | "cvc";

type FormState = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const initialForm: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  pin: "",
  state: "",
  phone: "",
  card: "",
  expiry: "",
  cvc: "",
};

function validate(form: FormState): Errors {
  const errors: Errors = {};
  const digits = (s: string) => s.replace(/\D/g, "");

  if (!form.email.trim()) errors.email = "Enter your email address";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "That email doesn't look right";

  if (!form.firstName.trim()) errors.firstName = "Required";
  if (!form.lastName.trim()) errors.lastName = "Required";
  if (!form.address.trim()) errors.address = "Enter your street address";
  if (!form.city.trim()) errors.city = "Required";

  if (!form.pin.trim()) errors.pin = "Required";
  else if (!/^\d{6}$/.test(digits(form.pin)))
    errors.pin = "PIN code is 6 digits";

  if (!form.state.trim()) errors.state = "Required";

  if (!form.phone.trim()) errors.phone = "Required";
  else if (digits(form.phone).length < 10)
    errors.phone = "Enter a 10-digit mobile number";

  if (!form.card.trim()) errors.card = "Enter your card number";
  else if (digits(form.card).length !== 16)
    errors.card = "Card number is 16 digits";

  if (!form.expiry.trim()) errors.expiry = "Required";
  else if (!/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(form.expiry.trim()))
    errors.expiry = "Use MM / YY";

  if (!form.cvc.trim()) errors.cvc = "Required";
  else if (!/^\d{3,4}$/.test(digits(form.cvc))) errors.cvc = "3–4 digits";

  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, count, discount, promo, clear } = useCart();
  const [placing, setPlacing] = useState(false);
  const [ship, setShip] = useState<"standard" | "express">("standard");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const discounted = subtotal - discount;
  const shippingCost = shippingFor(discounted, ship);
  const tax = Math.round(discounted * GST_RATE);
  const total = discounted + shippingCost + tax;

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

  const setField = (name: FieldName) => (value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    // clear the field's error as soon as the user starts fixing it
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[]).find(
      (k) => found[k],
    );
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLInputElement>(
        `[name="${firstInvalid}"]`,
      );
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    setPlacing(true);
    persistOrder(lines, total);
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
        ref={formRef}
        onSubmit={placeOrder}
        noValidate
        className="mt-6 grid gap-10 lg:grid-cols-[1fr_400px]"
      >
        {/* form */}
        <div className="space-y-9">
          <h1 className="font-display text-3xl">Checkout</h1>

          <Section step="1" title="Contact">
            <Field
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={setField("email")}
              error={errors.email}
            />
            <label className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
              <input type="checkbox" className="accent-[var(--color-sage)]" />
              Email me with news and offers
            </label>
          </Section>

          <Section step="2" title="Shipping address">
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="First name"
                name="firstName"
                placeholder="Aarav"
                autoComplete="given-name"
                value={form.firstName}
                onChange={setField("firstName")}
                error={errors.firstName}
              />
              <Field
                label="Last name"
                name="lastName"
                placeholder="Sharma"
                autoComplete="family-name"
                value={form.lastName}
                onChange={setField("lastName")}
                error={errors.lastName}
              />
            </div>
            <Field
              label="Address"
              name="address"
              placeholder="12, MG Road"
              autoComplete="street-address"
              value={form.address}
              onChange={setField("address")}
              error={errors.address}
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="City"
                name="city"
                placeholder="Bengaluru"
                autoComplete="address-level2"
                value={form.city}
                onChange={setField("city")}
                error={errors.city}
              />
              <Field
                label="PIN code"
                name="pin"
                placeholder="560001"
                inputMode="numeric"
                autoComplete="postal-code"
                value={form.pin}
                onChange={setField("pin")}
                error={errors.pin}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="State"
                name="state"
                placeholder="Karnataka"
                autoComplete="address-level1"
                value={form.state}
                onChange={setField("state")}
                error={errors.state}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                value={form.phone}
                onChange={setField("phone")}
                error={errors.phone}
              />
            </div>
          </Section>

          <Section step="3" title="Delivery method">
            <div className="space-y-2">
              <DeliveryOption
                selected={ship === "standard"}
                onSelect={() => setShip("standard")}
                title="Standard"
                sub="3–5 business days"
                price={
                  discounted >= FREE_SHIPPING_THRESHOLD
                    ? "Free"
                    : formatPrice(STANDARD_SHIPPING)
                }
              />
              <DeliveryOption
                selected={ship === "express"}
                onSelect={() => setShip("express")}
                title="Express"
                sub="1–2 business days"
                price={formatPrice(EXPRESS_SHIPPING)}
              />
            </div>
          </Section>

          <Section step="4" title="Payment">
            <div className="rounded-xl border border-line bg-paper p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CreditCard size={16} /> Credit card
              </div>
              <div className="mt-3 space-y-3">
                <Field
                  label="Card number"
                  name="card"
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={form.card}
                  onChange={setField("card")}
                  error={errors.card}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Expiry"
                    name="expiry"
                    placeholder="MM / YY"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={form.expiry}
                    onChange={setField("expiry")}
                    error={errors.expiry}
                  />
                  <Field
                    label="CVC"
                    name="cvc"
                    placeholder="123"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={form.cvc}
                    onChange={setField("cvc")}
                    error={errors.cvc}
                  />
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-[12px] text-muted">
                <Lock size={13} /> This is a demo — no real payment is processed.
              </p>
            </div>
          </Section>

          <div>
            {Object.values(errors).some(Boolean) && (
              <p className="mb-3 rounded-xl bg-clay-soft px-4 py-3 text-sm text-clay-deep" role="alert">
                Please fix the highlighted fields to place your order.
              </p>
            )}
            <button
              type="submit"
              disabled={placing}
              className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-cream transition hover:bg-ink-soft disabled:opacity-60"
            >
              <Lock size={16} />
              {placing ? "Placing order…" : `Pay ${formatPrice(total)}`}
            </button>
          </div>
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
              {promo && (
                <div className="flex justify-between text-sage-deep">
                  <dt className="flex items-center gap-1.5">
                    <Tag size={14} /> {promo.code} (−{promo.percent}%)
                  </dt>
                  <dd>−{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">GST (18%)</dt>
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
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  inputMode,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
  autoComplete?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 w-full rounded-xl border bg-paper px-4 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-clay-deep focus:border-clay-deep focus:ring-clay/25"
            : "border-line focus:border-sage focus:ring-sage/20"
        }`}
      />
      {error && (
        <span id={errorId} className="mt-1 block text-[12px] text-clay-deep">
          {error}
        </span>
      )}
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
