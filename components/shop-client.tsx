"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Check } from "lucide-react";
import {
  products,
  categories,
  concerns,
  skinTypeLabels,
  type Concern,
  type Gender,
  type SkinType,
} from "@/lib/data";
import { ProductCard } from "./product-card";
import { cn, formatPrice } from "@/lib/utils";

const genders: { value: Gender | "all"; label: string }[] = [
  { value: "all", label: "Everyone" },
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "unisex", label: "Unisex" },
];

const skinTypeOptions: SkinType[] = [
  "oily",
  "dry",
  "combination",
  "sensitive",
  "normal",
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "bestsellers", label: "Bestsellers" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const MIN = 300;
const MAX = 1500;

const VALID_GENDERS = new Set<string>(["women", "men", "unisex"]);
const VALID_CATEGORIES = new Set<string>(categories.map((c) => c.slug));
const VALID_CONCERNS = new Set<string>(concerns.map((c) => c.slug));
const VALID_SKIN = new Set<string>(skinTypeOptions);

/** The URL is the single source of truth for every filter, so views are
 *  shareable, bookmarkable, and the back button behaves. */
export function ShopClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);

  const list = (key: string, valid: Set<string>) =>
    (params.get(key) ?? "")
      .split(",")
      .filter(Boolean)
      .filter((v) => valid.has(v));

  const genderRaw = params.get("gender") ?? "all";
  const gender: Gender | "all" = VALID_GENDERS.has(genderRaw)
    ? (genderRaw as Gender)
    : "all";
  const cats = list("category", VALID_CATEGORIES);
  const conc = list("concern", VALID_CONCERNS) as Concern[];
  const skin = list("skin", VALID_SKIN) as SkinType[];
  const maxParam = Number(params.get("max"));
  const maxPrice =
    Number.isFinite(maxParam) && maxParam >= MIN && maxParam <= MAX
      ? maxParam
      : MAX;
  const sort = params.get("sort") || "featured";
  const search = params.get("q") || "";

  // router.replace commits asynchronously, so rapid successive filter clicks
  // would otherwise each start from the same stale snapshot and clobber each
  // other — track the latest written query string until the hook catches up
  const pendingQs = useRef<string | null>(null);
  const paramsKey = params.toString();
  useEffect(() => {
    pendingQs.current = null;
  }, [paramsKey]);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(pendingQs.current ?? paramsKey);
    if (value === null || value === "") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    pendingQs.current = qs;
    router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  };

  const setGender = (g: Gender | "all") =>
    setParam("gender", g === "all" ? null : g);
  const setSort = (s: string) => setParam("sort", s === "featured" ? null : s);
  const setMaxPrice = (n: number) =>
    setParam("max", n >= MAX ? null : String(n));
  const setSearch = (q: string) => setParam("q", q || null);
  const toggleIn = (key: string, current: string[], value: string) => {
    const next = current.includes(value)
      ? current.filter((x) => x !== value)
      : [...current, value];
    setParam(key, next.join(",") || null);
  };

  const clearAll = () => router.replace("/shop", { scroll: false });

  // local draft so the price slider stays smooth while dragging;
  // the URL is committed when the user lets go
  const [priceDraft, setPriceDraft] = useState<number | null>(null);
  const priceShown = priceDraft ?? maxPrice;

  // Escape closes the mobile filter sheet
  useEffect(() => {
    if (!mobileFilters) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFilters(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileFilters]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) => {
      if (q) {
        const haystack = `${p.name} ${p.tagline} ${p.category} ${p.keyIngredients.join(" ")} ${p.concerns.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (gender !== "all" && p.gender !== gender && p.gender !== "unisex")
        return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (
        skin.length &&
        !p.skinTypes.includes("all") &&
        !skin.some((s) => p.skinTypes.includes(s))
      )
        return false;
      if (conc.length && !conc.some((c) => p.concerns.includes(c)))
        return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "bestsellers":
        list = [...list].sort(
          (a, b) => Number(!!b.bestseller) - Number(!!a.bestseller),
        );
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
    }
    return list;
  }, [gender, cats, skin, conc, maxPrice, sort, search]);

  const activeCount =
    (gender !== "all" ? 1 : 0) +
    cats.length +
    skin.length +
    conc.length +
    (maxPrice < MAX ? 1 : 0);

  /* rendered via {filtersPanel} (not as a component) so re-renders don't
     remount the inputs mid-interaction */
  const filtersPanel = (
    <div className="space-y-7">
      {/* gender */}
      <FilterGroup title="Shop for">
        <div className="flex flex-wrap gap-2">
          {genders.map((g) => (
            <button
              key={g.value}
              onClick={() => setGender(g.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[13px] transition",
                gender === g.value
                  ? "border-sage bg-sage-soft font-medium text-sage-deep"
                  : "border-line text-ink-soft hover:border-ink/30",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* category */}
      <FilterGroup title="Category">
        <ul className="space-y-1.5">
          {categories.map((c) => (
            <CheckRow
              key={c.slug}
              label={c.name}
              checked={cats.includes(c.slug)}
              onClick={() => toggleIn("category", cats, c.slug)}
            />
          ))}
        </ul>
      </FilterGroup>

      {/* concern */}
      <FilterGroup title="Skin Concern">
        <ul className="space-y-1.5">
          {concerns.map((c) => (
            <CheckRow
              key={c.slug}
              label={c.name}
              checked={conc.includes(c.slug)}
              onClick={() => toggleIn("concern", conc, c.slug)}
            />
          ))}
        </ul>
      </FilterGroup>

      {/* skin type */}
      <FilterGroup title="Skin Type">
        <ul className="space-y-1.5">
          {skinTypeOptions.map((s) => (
            <CheckRow
              key={s}
              label={skinTypeLabels[s]}
              checked={skin.includes(s)}
              onClick={() => toggleIn("skin", skin, s)}
            />
          ))}
        </ul>
      </FilterGroup>

      {/* price */}
      <FilterGroup title="Max Price">
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={50}
          value={priceShown}
          aria-label="Maximum price"
          onChange={(e) => setPriceDraft(Number(e.target.value))}
          onPointerUp={() => {
            if (priceDraft !== null) {
              setMaxPrice(priceDraft);
              setPriceDraft(null);
            }
          }}
          onKeyUp={() => {
            if (priceDraft !== null) {
              setMaxPrice(priceDraft);
              setPriceDraft(null);
            }
          }}
          className="w-full accent-[var(--color-sage)]"
        />
        <p className="mt-1 text-[13px] text-ink-soft">
          Up to {formatPrice(priceShown)}
        </p>
      </FilterGroup>
    </div>
  );

  return (
    <>
      {/* header band */}
      <div className="border-b border-line bg-surface">
        <div className="container-page py-10 lg:py-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            {search ? "Search results" : "The collection"}
          </p>
          {search ? (
            <>
              <h1 className="mt-2 font-display text-4xl text-ink lg:text-5xl">
                “{search}”
              </h1>
              <p className="mt-2 max-w-xl text-[15px] text-ink-soft">
                {filtered.length}{" "}
                {filtered.length === 1 ? "result" : "results"} for your search.{" "}
                <button
                  onClick={() => setSearch("")}
                  className="font-medium text-sage-deep underline underline-offset-2"
                >
                  Clear search
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-2 font-display text-4xl text-ink lg:text-5xl">
                Shop all skincare
              </h1>
              <p className="mt-2 max-w-xl text-[15px] text-ink-soft">
                {products.length} clean, effective formulas for every skin type —
                for men and women alike.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="container-page py-10">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
          {/* desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-lg">Filters</h2>
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-[13px] text-muted underline hover:text-ink"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {filtersPanel}
            </div>
          </aside>

          {/* main */}
          <div>
            {/* toolbar */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setMobileFilters(true)}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm lg:hidden"
              >
                <SlidersHorizontal size={16} /> Filters
                {activeCount > 0 && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-sage text-[11px] text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              <p className="hidden text-sm text-muted lg:block">
                {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </p>
              <div className="flex items-center gap-2">
                <label className="hidden text-sm text-muted sm:block">Sort</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-9 rounded-full border border-line bg-paper px-4 text-sm outline-none focus:border-sage"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* active chips */}
            {activeCount > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {gender !== "all" && (
                  <Chip onClear={() => setGender("all")}>
                    {genders.find((g) => g.value === gender)?.label}
                  </Chip>
                )}
                {cats.map((c) => (
                  <Chip key={c} onClear={() => toggleIn("category", cats, c)}>
                    {categories.find((x) => x.slug === c)?.name}
                  </Chip>
                ))}
                {conc.map((c) => (
                  <Chip key={c} onClear={() => toggleIn("concern", conc, c)}>
                    {concerns.find((x) => x.slug === c)?.name}
                  </Chip>
                ))}
                {skin.map((s) => (
                  <Chip key={s} onClear={() => toggleIn("skin", skin, s)}>
                    {skinTypeLabels[s]}
                  </Chip>
                ))}
                {maxPrice < MAX && (
                  <Chip onClear={() => setMaxPrice(MAX)}>
                    Under {formatPrice(maxPrice)}
                  </Chip>
                )}
              </div>
            )}

            {/* grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="grid place-items-center rounded-2xl border border-dashed border-line py-20 text-center">
                <p className="font-display text-xl">No products match</p>
                <p className="mt-1 text-sm text-muted">
                  Try removing a filter to see more.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-4 rounded-full bg-ink px-5 py-2 text-sm text-cream"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile filter drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[70] lg:hidden",
          mobileFilters ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setMobileFilters(false)}
          className={cn(
            "absolute inset-0 bg-ink/40 transition-opacity",
            mobileFilters ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream p-6 transition-transform duration-300",
            mobileFilters ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl">Filters</h2>
            <button onClick={() => setMobileFilters(false)} aria-label="Close">
              <X size={22} />
            </button>
          </div>
          {filtersPanel}
          <div className="mt-7 flex gap-3">
            <button
              onClick={clearAll}
              className="flex-1 rounded-full border border-ink/20 py-3 text-sm font-medium"
            >
              Clear all
            </button>
            <button
              onClick={() => setMobileFilters(false)}
              className="flex-1 rounded-full bg-ink py-3 text-sm font-medium text-cream"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-ink">
        {title}
      </h3>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex w-full items-center gap-2.5 py-0.5 text-left text-[14px] text-ink-soft hover:text-ink"
      >
        <span
          className={cn(
            "grid h-[18px] w-[18px] place-items-center rounded-[5px] border transition",
            checked
              ? "border-sage bg-sage text-white"
              : "border-line bg-paper",
          )}
        >
          {checked && <Check size={13} strokeWidth={3} />}
        </span>
        {label}
      </button>
    </li>
  );
}

function Chip({
  children,
  onClear,
}: {
  children: React.ReactNode;
  onClear: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-[13px] text-ink">
      {children}
      <button onClick={onClear} aria-label="Remove filter">
        <X size={13} className="text-muted hover:text-ink" />
      </button>
    </span>
  );
}
