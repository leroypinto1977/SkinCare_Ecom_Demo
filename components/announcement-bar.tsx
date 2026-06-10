const messages = [
  "Free shipping on orders over $50",
  "10% off your first order — code GLOW10",
  "Dermatologist-tested · Cruelty-free",
  "30-day happiness guarantee",
];

export function AnnouncementBar() {
  const row = [...messages, ...messages, ...messages];
  return (
    <div className="overflow-hidden bg-sage-deep text-cream">
      <div
        className="flex w-max items-center gap-12 whitespace-nowrap py-2.5 text-[12px] font-medium uppercase tracking-[0.15em]"
        style={{ animation: "marquee 30s linear infinite" }}
      >
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
