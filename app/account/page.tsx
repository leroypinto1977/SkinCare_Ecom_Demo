"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { products, sampleOrders } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "profile", label: "Profile", icon: User },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const wishlist = products.filter((p) =>
  ["p2", "p10", "p15"].includes(p.id),
);

export default function AccountPage() {
  const [tab, setTab] = useState<TabKey>("orders");

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            My account
          </p>
          <h1 className="mt-2 font-display text-4xl">Hi, Jordan 👋</h1>
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
                </span>
                <ChevronRight size={16} className={tab === t.key ? "opacity-70" : "opacity-0"} />
              </button>
            ))}
            <Link
              href="/login"
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-clay-deep hover:bg-clay-soft"
            >
              <LogOut size={17} /> Sign out
            </Link>
          </nav>
        </aside>

        {/* content */}
        <div>
          {tab === "orders" && (
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
                    {sampleOrders.map((o) => (
                      <tr key={o.id} className="bg-paper">
                        <td className="px-5 py-4 font-medium">{o.id}</td>
                        <td className="px-5 py-4 text-ink-soft">{o.date}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-2.5 py-1 text-[12px] font-medium text-sage-deep">
                            ● {o.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-medium">${o.total}.00</td>
                        <td className="px-5 py-4 text-right">
                          <button className="text-[13px] font-semibold text-sage-deep hover:underline">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              <h2 className="mb-5 font-display text-2xl">Your wishlist</h2>
              <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3">
                {wishlist.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {tab === "addresses" && (
            <div>
              <h2 className="mb-5 font-display text-2xl">Saved addresses</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <span className="inline-block rounded-full bg-sage-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage-deep">
                    Default
                  </span>
                  <p className="mt-3 font-medium">Jordan Avery</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    123 Maple Street<br />
                    Portland, OR 97201<br />
                    United States
                  </p>
                  <div className="mt-4 flex gap-4 text-[13px] font-semibold">
                    <button className="text-sage-deep hover:underline">Edit</button>
                    <button className="text-muted hover:text-ink">Remove</button>
                  </div>
                </div>
                <button className="grid place-items-center rounded-2xl border border-dashed border-line p-6 text-sm font-medium text-muted transition hover:border-ink/40 hover:text-ink">
                  + Add new address
                </button>
              </div>
            </div>
          )}

          {tab === "profile" && (
            <div className="max-w-lg">
              <h2 className="mb-5 font-display text-2xl">Profile details</h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <AccField label="First name" value="Jordan" />
                  <AccField label="Last name" value="Avery" />
                </div>
                <AccField label="Email" value="jordan@example.com" type="email" />
                <AccField label="Phone" value="(555) 010-2026" type="tel" />
                <button className="h-11 rounded-full bg-ink px-7 text-sm font-medium text-cream transition hover:bg-ink-soft">
                  Save changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AccField({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
      />
    </label>
  );
}
