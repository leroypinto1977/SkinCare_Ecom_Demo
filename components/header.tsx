"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronRight,
} from "lucide-react";
import { categories, concerns } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Shop All", href: "/shop" },
  { label: "Bestsellers", href: "/shop?sort=bestsellers" },
  { label: "Men", href: "/shop?gender=men" },
  { label: "Women", href: "/shop?gender=women" },
  { label: "Skin Quiz", href: "/quiz" },
  { label: "Journal", href: "/journal" },
];

export function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/90 backdrop-blur-md border-b border-line"
          : "bg-transparent",
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-18">
          {/* left: mobile menu + nav */}
          <div className="flex items-center gap-1">
            <button
              className="-ml-2 grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* center: logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-2xl tracking-[0.2em] lg:text-[26px]"
          >
            AURELLE
          </Link>

          {/* right: actions */}
          <div className="flex items-center gap-0.5">
            <button
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
            >
              <Search size={19} />
            </button>
            <Link
              href="/account"
              className="hidden h-10 w-10 place-items-center rounded-full hover:bg-ink/5 sm:grid"
              aria-label="Account"
            >
              <User size={19} />
            </Link>
            <button
              onClick={open}
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5"
              aria-label="Cart"
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-sage px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* desktop primary nav row */}
        <nav className="hidden border-t border-line/60 lg:block">
          <ul className="flex items-center justify-center gap-9 py-3 text-[13px] font-medium uppercase tracking-[0.12em]">
            <li
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              className="relative"
            >
              <Link
                href="/shop"
                className="flex items-center gap-1 py-1 text-ink/80 hover:text-ink"
              >
                Shop
              </Link>
              {/* mega menu */}
              {megaOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3">
                  <div className="grid grid-cols-3 gap-6 rounded-2xl border border-line bg-surface p-6 shadow-xl shadow-ink/5">
                    <div>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Categories
                      </p>
                      <ul className="space-y-2">
                        {categories.slice(0, 5).map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/shop?category=${c.slug}`}
                              className="text-[13px] normal-case tracking-normal text-ink-soft hover:text-sage-deep"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Shop by Concern
                      </p>
                      <ul className="space-y-2">
                        {concerns.slice(0, 5).map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/shop?concern=${c.slug}`}
                              className="text-[13px] normal-case tracking-normal text-ink-soft hover:text-sage-deep"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href="/quiz"
                      className="flex flex-col justify-end rounded-xl bg-gradient-to-br from-sage-soft to-[#cdd6bd] p-4"
                    >
                      <p className="font-display text-lg normal-case tracking-normal text-ink">
                        Not sure where to start?
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1 text-[12px] font-semibold normal-case tracking-normal text-sage-deep">
                        Take the skin quiz <ChevronRight size={14} />
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </li>
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="py-1 text-ink/80 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* search bar */}
      {searchOpen && (
        <div className="border-t border-line bg-surface">
          <div className="container-page flex items-center gap-3 py-3">
            <Search size={18} className="text-muted" />
            <input
              autoFocus
              placeholder="Search for cleansers, serums, SPF…"
              className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <button onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X size={18} className="text-muted hover:text-ink" />
            </button>
          </div>
        </div>
      )}

      {/* mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-[82%] max-w-sm bg-cream shadow-2xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="font-display text-xl tracking-[0.2em]">AURELLE</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="px-5 py-4">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium hover:bg-ink/5"
                  >
                    {item.label}
                    <ChevronRight size={18} className="text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Categories
            </p>
            <ul className="space-y-0.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-ink/5"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2 px-3">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 py-2.5 text-sm font-medium"
              >
                <User size={16} /> Account
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
