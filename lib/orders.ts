/* Client-side order persistence — demo only, stored in localStorage. */

import type { CartLine } from "./cart";

export type PlacedOrder = {
  id: string; // e.g. "#AUR-10463"
  date: string; // human-readable, e.g. "Jun 10, 2026"
  status: "Processing";
  total: number;
  items: number;
  lines: Pick<CartLine, "name" | "size" | "qty" | "price">[];
};

const STORAGE_KEY = "aurelle-orders";

export function getPlacedOrders(): PlacedOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PlacedOrder[]) : [];
  } catch {
    return [];
  }
}

export function placeOrder(lines: CartLine[], total: number): PlacedOrder {
  const orders = getPlacedOrders();
  const nextNumber =
    10462 +
    orders.length +
    1; /* continues after the seeded demo orders (…10428) */
  const order: PlacedOrder = {
    id: `#AUR-${nextNumber}`,
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    status: "Processing",
    total,
    items: lines.reduce((n, l) => n + l.qty, 0),
    lines: lines.map((l) => ({
      name: l.name,
      size: l.size,
      qty: l.qty,
      price: l.price,
    })),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...orders]));
  } catch {
    /* ignore */
  }
  return order;
}

export function getLatestOrder(): PlacedOrder | null {
  return getPlacedOrders()[0] ?? null;
}
