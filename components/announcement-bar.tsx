import { FREE_SHIPPING_THRESHOLD, PROMO_CODES } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const promoEntry = Object.entries(PROMO_CODES)[0];

const messages = [
  `Free shipping on orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)}`,
  `${promoEntry[1].label} — code ${promoEntry[0]}`,
  "Dermatologist-tested · Cruelty-free",
  "30-day happiness guarantee",
];

export function AnnouncementBar() {
  const row = [...messages, ...messages, ...messages];
  return (
    <div className="overflow-hidden bg-sage-deep text-cream">
      <div className="marquee flex w-max items-center gap-12 whitespace-nowrap py-2.5 text-[12px] font-medium uppercase tracking-[0.15em]">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-12">
            {m}
            <span className="text-cream/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
