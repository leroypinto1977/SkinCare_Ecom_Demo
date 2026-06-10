import Link from "next/link";
import { Camera, AtSign, Send, MessageCircle } from "lucide-react";
import { Newsletter } from "./newsletter";

const cols = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Bestsellers", href: "/shop?sort=bestsellers" },
      { label: "For Men", href: "/shop?gender=men" },
      { label: "For Women", href: "/shop?gender=women" },
      { label: "Skin Quiz", href: "/quiz" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Ingredients", href: "/about#ingredients" },
      { label: "Sustainability", href: "/about#values" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/contact#shipping" },
      { label: "FAQ", href: "/contact#faq" },
      { label: "Track Order", href: "/account" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      {/* top band */}
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="font-display text-2xl tracking-[0.2em]">
            AURELLE
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Clean, effective skincare designed for every skin — backed by science,
            kind to your barrier, and made for men and women alike.
          </p>
          <div className="mt-5">
            <p className="mb-2 text-[13px] font-semibold">
              Join for 10% off & skincare tips
            </p>
            <Newsletter />
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-ink">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-soft transition hover:text-sage-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* trust row */}
      <div className="border-t border-line">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-5 text-[12px] font-medium uppercase tracking-wider text-muted">
          <span>✓ Cruelty-Free</span>
          <span>✓ Dermatologist-Tested</span>
          <span>✓ Vegan Formulas</span>
          <span>✓ Clean Ingredients</span>
          <span>✓ Carbon-Neutral Shipping</span>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted sm:flex-row">
          <p>© 2026 Aurelle Skincare. Demo store — all content is fictional.</p>
          <div className="flex items-center gap-4">
            {[
              { icon: Camera, label: "Instagram", href: "https://instagram.com" },
              { icon: AtSign, label: "Threads", href: "https://threads.net" },
              { icon: Send, label: "Telegram", href: "https://telegram.org" },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                href: "https://whatsapp.com",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Aurelle on ${s.label}`}
                className="text-ink-soft transition hover:text-sage-deep"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
