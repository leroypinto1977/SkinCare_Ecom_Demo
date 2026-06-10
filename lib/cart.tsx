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
import { MAX_QTY, PROMO_CODES, type Product } from "./data";

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

type State = { lines: CartLine[]; promo: string | null };

type Action =
  | { type: "add"; product: Product; size?: string; qty?: number }
  | { type: "remove"; key: string }
  | { type: "qty"; key: string; qty: number }
  | { type: "clear" }
  | { type: "promo"; code: string | null }
  | { type: "hydrate"; lines: CartLine[]; promo: string | null };

const lineKey = (slug: string, size: string) => `${slug}__${size}`;
const clampQty = (qty: number) => Math.min(MAX_QTY, Math.max(1, qty));

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, promo: action.promo };
    case "add": {
      const size = action.size ?? action.product.sizes[0];
      const qty = action.qty ?? 1;
      const key = lineKey(action.product.slug, size);
      const existing = state.lines.find(
        (l) => lineKey(l.slug, l.size) === key,
      );
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            lineKey(l.slug, l.size) === key
              ? { ...l, qty: clampQty(l.qty + qty) }
              : l,
          ),
        };
      }
      return {
        ...state,
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
            qty: clampQty(qty),
          },
        ],
      };
    }
    case "remove":
      return {
        ...state,
        lines: state.lines.filter((l) => lineKey(l.slug, l.size) !== action.key),
      };
    case "qty":
      return {
        ...state,
        lines: state.lines.map((l) =>
          lineKey(l.slug, l.size) === action.key
            ? { ...l, qty: clampQty(action.qty) }
            : l,
        ),
      };
    case "clear":
      return { lines: [], promo: state.promo };
    case "promo":
      return { ...state, promo: action.code };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** active promo code (validated) and the discount it grants */
  promo: { code: string; percent: number } | null;
  discount: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (product: Product, size?: string, qty?: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  keyOf: (slug: string, size: string) => string;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aurelle-cart";
const PROMO_KEY = "aurelle-promo";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], promo: null });
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // hydrate from localStorage (client-only, so it must happen after mount)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const promo = localStorage.getItem(PROMO_KEY);
      dispatch({
        type: "hydrate",
        lines: raw ? JSON.parse(raw) : [],
        promo: promo && PROMO_CODES[promo] ? promo : null,
      });
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration gate
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
      if (state.promo) localStorage.setItem(PROMO_KEY, state.promo);
      else localStorage.removeItem(PROMO_KEY);
    } catch {
      /* ignore */
    }
  }, [state.lines, state.promo, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.lines.reduce((s, l) => s + l.qty * l.price, 0);
    const promoDef = state.promo ? PROMO_CODES[state.promo] : undefined;
    const promo =
      state.promo && promoDef
        ? { code: state.promo, percent: promoDef.percent }
        : null;
    const discount = promo
      ? Math.round((subtotal * promo.percent) / 100)
      : 0;
    return {
      lines: state.lines,
      count,
      subtotal,
      promo,
      discount,
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
      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        if (!PROMO_CODES[normalized]) return false;
        dispatch({ type: "promo", code: normalized });
        return true;
      },
      removePromo: () => dispatch({ type: "promo", code: null }),
      keyOf: lineKey,
    };
  }, [state.lines, state.promo, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
