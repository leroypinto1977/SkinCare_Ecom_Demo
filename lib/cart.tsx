"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./data";

export type CartLine = {
  id: string;
  slug: string;
  name: string;
  price: number;
  size: string;
  image: string;
  from: string;
  to: string;
  qty: number;
};

type State = { lines: CartLine[] };

type Action =
  | { type: "add"; product: Product; size?: string; qty?: number }
  | { type: "remove"; key: string }
  | { type: "qty"; key: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const lineKey = (slug: string, size: string) => `${slug}__${size}`;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const size = action.size ?? action.product.sizes[0];
      const qty = action.qty ?? 1;
      const key = lineKey(action.product.slug, size);
      const existing = state.lines.find(
        (l) => lineKey(l.slug, l.size) === key,
      );
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            lineKey(l.slug, l.size) === key ? { ...l, qty: l.qty + qty } : l,
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          {
            id: action.product.id,
            slug: action.product.slug,
            name: action.product.name,
            price: action.product.price,
            size,
            image: action.product.image,
            from: action.product.from,
            to: action.product.to,
            qty,
          },
        ],
      };
    }
    case "remove":
      return {
        lines: state.lines.filter((l) => lineKey(l.slug, l.size) !== action.key),
      };
    case "qty":
      return {
        lines: state.lines.map((l) =>
          lineKey(l.slug, l.size) === action.key
            ? { ...l, qty: Math.max(1, action.qty) }
            : l,
        ),
      };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (product: Product, size?: string, qty?: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  keyOf: (slug: string, size: string) => string;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aurelle-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* ignore */
    }
  }, [state.lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.lines.reduce((s, l) => s + l.qty * l.price, 0);
    return {
      lines: state.lines,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      addItem: (product, size, qty) => {
        dispatch({ type: "add", product, size, qty });
        setIsOpen(true);
      },
      removeItem: (key) => dispatch({ type: "remove", key }),
      setQty: (key, qty) => dispatch({ type: "qty", key, qty }),
      clear: () => dispatch({ type: "clear" }),
      keyOf: lineKey,
    };
  }, [state.lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
