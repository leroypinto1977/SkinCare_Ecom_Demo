"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { products, sampleOrders } from "@/lib/data";
import { getPlacedOrders, type PlacedOrder } from "@/lib/orders";
import { getUser, setUser, clearUser, type DemoUser } from "@/lib/session";
import { useClientValue, useLocalStorageState } from "@/lib/use-local-storage";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/product-card";
import { cn, formatPrice } from "@/lib/utils";

const tabs = [
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "profile", label: "Profile", icon: User },
] as const;

type TabKey = (typeof tabs)[number]["key"];

type Address = {
  name: string;
  line1: string;
  line2: string;
  isDefault: boolean;
};

const seedAddress: Address = {
  name: "Jordan Avery",
  line1: "12, MG Road",
  line2: "Bengaluru, Karnataka 560001",
  isDefault: true,
};

const ADDRESS_KEY = "aurelle-addresses";

export default function AccountPage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("orders");
  const sessionUser = useClientValue(getUser);
  const [savedUser, setSavedUser] = useState<DemoUser | null>(null);
  const user = savedUser ?? sessionUser ?? null;
  const placed = useClientValue(getPlacedOrders) ?? [];
  const { slugs } = useWishlist();

  const wishlist = products.filter((p) => slugs.includes(p.slug));
  const firstName = (user?.name ?? "Jordan").split(" ")[0];

  const signOut = () => {
    clearUser();
    router.push("/login");
  };

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            My account
          </p>
          <h1 className="mt-2 font-display text-4xl">Hi, {firstName} 👋</h1>
          {!user && (
            <p className="mt-2 text-sm text-muted">
              You&apos;re browsing a demo account.{" "}
              <Link href="/login" className="text-sage-deep underline">
                Sign in
              </Link>{" "}
              to personalize it.
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* sidebar */}
        <aside>
          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
                  tab === t.key
                    ? "bg-ink text-cream"
                    : "text-ink-soft hover:bg-ink/5",
                )}
              >
                <span className="flex items-center gap-3">
                  <t.icon size={17} /> {t.label}
                  {t.key === "wishlist" && wishlist.length > 0 && (
                    <span
                      className={cn(
                        "grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px]",
                        tab === t.key ? "bg-cream/20" : "bg-sage-soft text-sage-deep",
                      )}
                    >
                      {wishlist.length}
                    </span>
                  )}
                </span>
                <ChevronRight size={16} className={tab === t.key ? "opacity-70" : "opacity-0"} />
              </button>
            ))}
            <button
              onClick={signOut}
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-clay-deep hover:bg-clay-soft"
            >
              <LogOut size={17} /> Sign out
            </button>
          </nav>
        </aside>

        {/* content */}
        <div>
          {tab === "orders" && <OrdersTab placed={placed} />}

          {tab === "wishlist" && (
            <div>
              <h2 className="mb-5 font-display text-2xl">Your wishlist</h2>
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3">
                  {wishlist.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="grid place-items-center rounded-2xl border border-dashed border-line py-16 text-center">
                  <Heart size={28} className="text-muted" />
                  <p className="mt-3 font-display text-lg">Nothing saved yet</p>
                  <p className="mt-1 max-w-xs text-sm text-muted">
                    Tap the heart on any product to keep it here for later.
                  </p>
                  <Link
                    href="/shop"
                    className="mt-5 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream"
                  >
                    Browse products
                  </Link>
                </div>
              )}
            </div>
          )}

          {tab === "addresses" && <AddressesTab />}

          {tab === "profile" && (
            <ProfileTab
              key={user?.email ?? "demo"}
              user={user}
              onSave={(u) => setSavedUser(u)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ orders ----------------------------- */

function OrdersTab({ placed }: { placed: PlacedOrder[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const all = [
    ...placed.map((o) => ({ ...o, lines: o.lines as PlacedOrder["lines"] | null })),
    ...sampleOrders.map((o) => ({ ...o, lines: null })),
  ];

  return (
    <div>
      <h2 className="mb-4 font-display text-2xl">Order history</h2>
      <div className="overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-[12px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Order</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Total</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {all.map((o) => (
              <Fragment key={o.id}>
                <tr className="bg-paper">
                  <td className="px-5 py-4 font-medium">{o.id}</td>
                  <td className="px-5 py-4 text-ink-soft">{o.date}</td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
                        o.status === "Processing"
                          ? "bg-clay-soft text-clay-deep"
                          : "bg-sage-soft text-sage-deep",
                      )}
                    >
                      ● {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium">{formatPrice(o.total)}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setOpenId(openId === o.id ? null : o.id)}
                      aria-expanded={openId === o.id}
                      className="inline-flex items-center gap-1 text-[13px] font-semibold text-sage-deep hover:underline"
                    >
                      View
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          openId === o.id && "rotate-180",
                        )}
                      />
                    </button>
                  </td>
                </tr>
                {openId === o.id && (
                  <tr className="bg-surface">
                    <td colSpan={5} className="px-5 py-4">
                      {o.lines && o.lines.length > 0 ? (
                        <ul className="space-y-1.5">
                          {o.lines.map((l, i) => (
                            <li
                              key={i}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-ink-soft">
                                {l.name}{" "}
                                <span className="text-muted">
                                  · {l.size} × {l.qty}
                                </span>
                              </span>
                              <span className="font-medium">
                                {formatPrice(l.price * l.qty)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted">
                          {o.items} {o.items === 1 ? "item" : "items"} ·
                          delivered order from our demo history — line details
                          aren&apos;t stored.
                        </p>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------- addresses ---------------------------- */

function AddressesTab() {
  const [addresses, setAddresses] = useLocalStorageState<Address[]>(
    ADDRESS_KEY,
    [seedAddress],
  );
  const [editing, setEditing] = useState<number | null>(null);

  const update = (i: number, a: Address) => {
    setAddresses((list) => list.map((x, idx) => (idx === i ? a : x)));
    setEditing(null);
  };
  const remove = (i: number) =>
    setAddresses((list) => list.filter((_, idx) => idx !== i));
  const add = () => {
    setAddresses((list) => [
      ...list,
      { name: "", line1: "", line2: "", isDefault: list.length === 0 },
    ]);
    setEditing(addresses.length);
  };

  return (
    <div>
      <h2 className="mb-5 font-display text-2xl">Saved addresses</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a, i) =>
          editing === i ? (
            <AddressForm
              key={i}
              initial={a}
              onSave={(next) => update(i, next)}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <div key={i} className="rounded-2xl border border-line bg-surface p-6">
              {a.isDefault && (
                <span className="inline-block rounded-full bg-sage-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage-deep">
                  Default
                </span>
              )}
              <p className="mt-3 font-medium">{a.name || "Unnamed"}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {a.line1}
                <br />
                {a.line2}
                <br />
                India
              </p>
              <div className="mt-4 flex gap-4 text-[13px] font-semibold">
                <button
                  onClick={() => setEditing(i)}
                  className="text-sage-deep hover:underline"
                >
                  Edit
                </button>
                {!a.isDefault && (
                  <button
                    onClick={() => remove(i)}
                    className="text-muted hover:text-ink"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ),
        )}
        <button
          onClick={add}
          className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-line p-6 text-sm font-medium text-muted transition hover:border-ink/40 hover:text-ink"
        >
          + Add new address
        </button>
      </div>
    </div>
  );
}

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Address;
  onSave: (a: Address) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-3 rounded-2xl border border-sage bg-surface p-6"
    >
      <AccInput
        label="Full name"
        value={form.name}
        onChange={(name) => setForm({ ...form, name })}
        required
      />
      <AccInput
        label="Street address"
        value={form.line1}
        onChange={(line1) => setForm({ ...form, line1 })}
        required
      />
      <AccInput
        label="City, state & PIN"
        value={form.line2}
        onChange={(line2) => setForm({ ...form, line2 })}
        placeholder="Bengaluru, Karnataka 560001"
        required
      />
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          className="h-10 rounded-full bg-ink px-5 text-sm font-medium text-cream"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-10 rounded-full border border-line px-5 text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ----------------------------- profile ----------------------------- */

function ProfileTab({
  user,
  onSave,
}: {
  user: DemoUser | null;
  onSave: (u: DemoUser) => void;
}) {
  // the parent keys this component by user, so initial state resets on sign-in
  const [name, setName] = useState(user?.name ?? "Jordan Avery");
  const [email, setEmail] = useState(user?.email ?? "jordan@example.com");
  const [phone, setPhone] = useState(user?.phone ?? "+91 98765 43210");
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { name: name.trim(), email: email.trim(), phone };
    setUser(next);
    onSave(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-lg">
      <h2 className="mb-5 font-display text-2xl">Profile details</h2>
      <form onSubmit={save} className="space-y-4">
        <AccInput label="Full name" value={name} onChange={setName} required />
        <AccInput
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          required
        />
        <AccInput label="Phone" value={phone} onChange={setPhone} type="tel" />
        <div className="flex items-center gap-3">
          <button className="h-11 rounded-full bg-ink px-7 text-sm font-medium text-cream transition hover:bg-ink-soft">
            Save changes
          </button>
          <span
            aria-live="polite"
            className={cn(
              "text-sm font-medium text-sage-deep transition-opacity",
              saved ? "opacity-100" : "opacity-0",
            )}
          >
            ✓ Saved
          </span>
        </div>
      </form>
    </div>
  );
}

function AccInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
      />
    </label>
  );
}

