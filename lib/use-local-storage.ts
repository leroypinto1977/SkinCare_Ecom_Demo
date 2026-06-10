"use client";

import { useEffect, useState } from "react";

/* localStorage is client-only, so values must be hydrated in an effect after
 * mount — rendering them on the server would mismatch. The set-state-in-effect
 * rule is silenced here, once, instead of at every call site. */

/** State persisted to localStorage. Hydrates after mount, then writes back. */
export function useLocalStorageState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration, see note above
      if (raw != null) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}

/** One-time client-side read of a value (e.g. from localStorage).
 *  `read` must be a stable (module-level) function. */
export function useClientValue<T>(read: () => T): T | undefined {
  const [value, setValue] = useState<T | undefined>(undefined);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration, see note above
    setValue(read());
  }, [read]);
  return value;
}
