"use client";

import { getLatestOrder } from "@/lib/orders";
import { useClientValue } from "@/lib/use-local-storage";
import { formatPrice } from "@/lib/utils";

/** Shows the order number of the order just placed. */
export function OrderNumber() {
  const order = useClientValue(getLatestOrder);

  return (
    <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
      {order ? `Order ${order.id}` : "Order confirmed"}
    </p>
  );
}

export function OrderLines() {
  const order = useClientValue(getLatestOrder);

  if (!order) return null;

  return (
    <div className="mt-8 rounded-2xl border border-line bg-surface p-5 text-left">
      <p className="text-sm font-semibold">What you ordered</p>
      <ul className="mt-3 space-y-2">
        {order.lines.map((l, i) => (
          <li key={i} className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">
              {l.name} <span className="text-muted">· {l.size} × {l.qty}</span>
            </span>
            <span className="font-medium">{formatPrice(l.price * l.qty)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
        <span className="font-medium">Total paid</span>
        <span className="font-display text-lg">{formatPrice(order.total)}</span>
      </div>
    </div>
  );
}
