/* ------------------------------------------------------------------ *
 *  Aurelle — dummy data layer (no backend; demo content only)
 * ------------------------------------------------------------------ */

/* Store config — all amounts in INR (₹) */
export const FREE_SHIPPING_THRESHOLD = 1499;
export const STANDARD_SHIPPING = 99;
export const EXPRESS_SHIPPING = 199;
export const GST_RATE = 0.18;
export const MAX_QTY = 10;

/* Promo codes — kept tiny on purpose; the announcement bar advertises GLOW10 */
export const PROMO_CODES: Record<string, { percent: number; label: string }> = {
  GLOW10: { percent: 10, label: "10% off your first order" },
};

export function shippingFor(
  subtotal: number,
  method: "standard" | "express" = "standard",
) {
  if (subtotal === 0) return 0;
  if (method === "express") return EXPRESS_SHIPPING;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}

export type Gender = "women" | "men" | "unisex";
export type SkinType =
  | "all"
  | "oily"
  | "dry"
  | "combination"
  | "sensitive"
  | "normal";
export type Concern =
  | "acne"
  | "aging"
  | "dullness"
  | "dryness"
  | "redness"
  | "dark-spots"
  | "pores";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string; // category slug
  gender: Gender;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  skinTypes: SkinType[];
  concerns: Concern[];
  sizes: string[];
  keyIngredients: string[];
  description: string;
  howToUse: string;
  badge?: "Bestseller" | "New" | "Limited";
  bestseller?: boolean;
  isNew?: boolean;
  /* image with graceful gradient fallback */
  image: string;
  from: string;
  to: string;
};

export const categories = [
  { slug: "cleansers", name: "Cleansers", blurb: "Gentle, balancing washes" },
  { slug: "serums", name: "Serums", blurb: "Targeted active treatments" },
  { slug: "moisturizers", name: "Moisturizers", blurb: "Daily hydration" },
  { slug: "sunscreen", name: "Sunscreen", blurb: "Everyday SPF protection" },
  { slug: "masks", name: "Masks & Exfoliants", blurb: "Weekly resets" },
  { slug: "eye-care", name: "Eye Care", blurb: "Brighten & de-puff" },
  { slug: "toners", name: "Toners & Mists", blurb: "Prep & refresh" },
  { slug: "body", name: "Body & Lip", blurb: "Head-to-toe care" },
] as const;

export const concerns: { slug: Concern; name: string; emoji: string }[] = [
  { slug: "acne", name: "Breakouts", emoji: "✦" },
  { slug: "aging", name: "Fine Lines", emoji: "✧" },
  { slug: "dullness", name: "Dullness", emoji: "☀" },
  { slug: "dryness", name: "Dryness", emoji: "❀" },
  { slug: "redness", name: "Redness", emoji: "✿" },
  { slug: "dark-spots", name: "Dark Spots", emoji: "✱" },
  { slug: "pores", name: "Large Pores", emoji: "◈" },
];

export const skinTypeLabels: Record<SkinType, string> = {
  all: "All skin types",
  oily: "Oily",
  dry: "Dry",
  combination: "Combination",
  sensitive: "Sensitive",
  normal: "Normal",
};

export const concernLabels: Record<Concern, string> = {
  acne: "Breakouts",
  aging: "Fine Lines & Aging",
  dullness: "Dullness",
  dryness: "Dryness",
  redness: "Redness",
  "dark-spots": "Dark Spots",
  pores: "Large Pores",
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  {
    id: "p1",
    slug: "calm-cream-cleanser",
    name: "Calm Cream Cleanser",
    tagline: "Soothing daily wash for sensitive skin",
    category: "cleansers",
    gender: "unisex",
    price: 699,
    rating: 4.8,
    reviewCount: 312,
    skinTypes: ["sensitive", "dry", "normal"],
    concerns: ["redness", "dryness"],
    sizes: ["150ml"],
    keyIngredients: ["Oat Lipids", "Glycerin", "Chamomile"],
    description:
      "A creamy, low-foam cleanser that lifts away impurities without stripping the skin barrier. Formulated with colloidal oat to calm visible redness and leave skin soft, never tight.",
    howToUse:
      "Massage a coin-sized amount onto damp skin morning and night. Rinse with lukewarm water and pat dry.",
    badge: "Bestseller",
    bestseller: true,
    image: img("1597931752949-98c74b5b159f"),
    from: "#eef0e7",
    to: "#cdd6bd",
  },
  {
    id: "p2",
    slug: "glow-vitamin-c-serum",
    name: "Glow Vitamin C Serum",
    tagline: "15% stabilized vitamin C for radiance",
    category: "serums",
    gender: "unisex",
    price: 1299,
    compareAt: 1599,
    rating: 4.9,
    reviewCount: 821,
    skinTypes: ["all", "normal", "combination"],
    concerns: ["dullness", "dark-spots"],
    sizes: ["30ml"],
    keyIngredients: ["15% Vitamin C", "Ferulic Acid", "Vitamin E"],
    description:
      "A fast-absorbing antioxidant serum that visibly brightens, evens tone and defends against daily environmental stress. Skin looks more luminous in as little as two weeks.",
    howToUse:
      "Apply 3–4 drops to clean, dry skin each morning before moisturizer and SPF. Avoid the eye area.",
    badge: "Bestseller",
    bestseller: true,
    image: img("1741896135512-084b251887f7"),
    from: "#f7ead2",
    to: "#e9c886",
  },
  {
    id: "p3",
    slug: "deep-hydration-moisturizer",
    name: "Deep Hydration Moisturizer",
    tagline: "72-hour ceramide moisture",
    category: "moisturizers",
    gender: "unisex",
    price: 999,
    rating: 4.7,
    reviewCount: 540,
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["dryness", "aging"],
    sizes: ["50ml"],
    keyIngredients: ["Ceramides", "Hyaluronic Acid", "Squalane"],
    description:
      "A cushiony gel-cream that floods skin with lasting hydration and rebuilds a healthy moisture barrier. Sinks in fast with a soft, non-greasy finish.",
    howToUse:
      "Smooth over face and neck morning and night as the last step of your routine.",
    bestseller: true,
    image: img("1622910076411-b126ff7e469b"),
    from: "#eaf1f3",
    to: "#bcd3da",
  },
  {
    id: "p4",
    slug: "daily-mineral-spf-50",
    name: "Daily Mineral SPF 50",
    tagline: "Invisible broad-spectrum protection",
    category: "sunscreen",
    gender: "unisex",
    price: 799,
    rating: 4.6,
    reviewCount: 410,
    skinTypes: ["all", "sensitive"],
    concerns: ["aging", "dark-spots"],
    sizes: ["50ml"],
    keyIngredients: ["Zinc Oxide", "Niacinamide", "Green Tea"],
    description:
      "A weightless mineral sunscreen with a true no-white-cast finish. Doubles as a smoothing makeup primer and shields against UVA/UVB and blue light.",
    howToUse:
      "Apply generously as the final morning step. Reapply every two hours of sun exposure.",
    badge: "New",
    isNew: true,
    image: img("1616750819574-7e38aa8046fa"),
    from: "#fdf0df",
    to: "#f4cf9f",
  },
  {
    id: "p5",
    slug: "overnight-resurfacing-mask",
    name: "Overnight Resurfacing Mask",
    tagline: "10% AHA + PHA smoothing blend",
    category: "masks",
    gender: "unisex",
    price: 1199,
    rating: 4.8,
    reviewCount: 268,
    skinTypes: ["combination", "oily", "normal"],
    concerns: ["dullness", "pores", "acne"],
    sizes: ["50ml"],
    keyIngredients: ["Glycolic Acid", "Lactic Acid", "Cica"],
    description:
      "A leave-on exfoliating mask that gently dissolves dull surface cells while you sleep. Wake up to a refined, glassy-smooth complexion.",
    howToUse:
      "Use 2–3 nights weekly after cleansing. Apply an even layer and leave on overnight. Always follow with SPF the next morning.",
    image: img("1612817288484-6f916006741a"),
    from: "#f3e7f0",
    to: "#d9b8d4",
  },
  {
    id: "p6",
    slug: "bright-eyes-eye-cream",
    name: "Bright Eyes Eye Cream",
    tagline: "Caffeine + peptides for tired eyes",
    category: "eye-care",
    gender: "unisex",
    price: 899,
    rating: 4.5,
    reviewCount: 197,
    skinTypes: ["all"],
    concerns: ["aging", "dullness"],
    sizes: ["15ml"],
    keyIngredients: ["Caffeine", "Peptides", "Hyaluronic Acid"],
    description:
      "A cooling eye cream that de-puffs, brightens dark circles and softens the look of fine lines around the delicate eye area.",
    howToUse:
      "Dab a rice-grain amount around the orbital bone morning and night with your ring finger.",
    image: img("1576426863848-c21f53c60b19"),
    from: "#e8eef0",
    to: "#c4d2d8",
  },
  {
    id: "p7",
    slug: "balancing-toner-mist",
    name: "Balancing Toner Mist",
    tagline: "pH-balancing hydration in a spritz",
    category: "toners",
    gender: "unisex",
    price: 599,
    rating: 4.6,
    reviewCount: 233,
    skinTypes: ["all", "oily", "combination"],
    concerns: ["pores", "dullness"],
    sizes: ["120ml"],
    keyIngredients: ["Rose Water", "Niacinamide", "Panthenol"],
    description:
      "A refreshing essence-mist that rebalances skin after cleansing, tightens the look of pores and preps skin to absorb the rest of your routine.",
    howToUse:
      "Mist over clean skin or throughout the day to refresh. Follow with serum and moisturizer.",
    image: img("1623143445418-40c192fa3d11"),
    from: "#f7e7ea",
    to: "#e6bcc6",
  },
  {
    id: "p8",
    slug: "clarifying-charcoal-cleanser",
    name: "Clarifying Charcoal Cleanser",
    tagline: "Deep-clean gel for oily skin",
    category: "cleansers",
    gender: "men",
    price: 549,
    rating: 4.4,
    reviewCount: 176,
    skinTypes: ["oily", "combination"],
    concerns: ["acne", "pores"],
    sizes: ["200ml"],
    keyIngredients: ["Activated Charcoal", "Salicylic Acid", "Tea Tree"],
    description:
      "A purifying gel wash that draws out excess oil and unclogs pores without over-drying. A daily reset for shine-prone, breakout-prone skin.",
    howToUse:
      "Lather over wet skin morning and night, focusing on the T-zone. Rinse thoroughly.",
    image: img("1616750819456-5cdee9b85d22"),
    from: "#e3e6e8",
    to: "#a9b4bb",
  },
  {
    id: "p9",
    slug: "post-shave-recovery-balm",
    name: "Post-Shave Recovery Balm",
    tagline: "Calms razor burn & redness",
    category: "moisturizers",
    gender: "men",
    price: 649,
    rating: 4.7,
    reviewCount: 154,
    skinTypes: ["sensitive", "normal", "dry"],
    concerns: ["redness", "dryness"],
    sizes: ["75ml"],
    keyIngredients: ["Allantoin", "Aloe", "Shea Butter"],
    description:
      "A fast-absorbing balm that instantly soothes freshly shaved skin, calming irritation and locking in moisture for a comfortable finish.",
    howToUse:
      "Massage a small amount over the face and neck immediately after shaving.",
    badge: "New",
    isNew: true,
    image: img("1620916297397-a4a5402a3c6c"),
    from: "#e7efe6",
    to: "#bcd0bb",
  },
  {
    id: "p10",
    slug: "retinol-renewal-night-serum",
    name: "Retinol Renewal Night Serum",
    tagline: "0.3% encapsulated retinol",
    category: "serums",
    gender: "unisex",
    price: 1499,
    rating: 4.8,
    reviewCount: 389,
    skinTypes: ["normal", "combination", "dry"],
    concerns: ["aging", "dark-spots", "pores"],
    sizes: ["30ml"],
    keyIngredients: ["Encapsulated Retinol", "Bakuchiol", "Squalane"],
    description:
      "A gentle yet effective nightly retinol that visibly smooths fine lines, refines texture and boosts radiance — buffered with bakuchiol to minimize irritation.",
    howToUse:
      "Apply a pea-sized amount to dry skin at night, 2–3 times weekly to start. Always wear SPF during the day.",
    badge: "Bestseller",
    bestseller: true,
    image: img("1713768704571-6aeb0d0e5105"),
    from: "#efe6f3",
    to: "#cbb6dd",
  },
  {
    id: "p11",
    slug: "niacinamide-pore-serum",
    name: "Niacinamide Pore Serum",
    tagline: "10% niacinamide + zinc",
    category: "serums",
    gender: "unisex",
    price: 699,
    rating: 4.6,
    reviewCount: 612,
    skinTypes: ["oily", "combination"],
    concerns: ["pores", "acne", "dark-spots"],
    sizes: ["30ml"],
    keyIngredients: ["10% Niacinamide", "Zinc PCA", "Allantoin"],
    description:
      "A lightweight serum that visibly minimizes pores, balances oil and fades the look of post-blemish marks for a clearer, more even complexion.",
    howToUse:
      "Apply a few drops morning and/or night before moisturizer.",
    image: img("1710410815589-dd83514104d0"),
    from: "#e7eef0",
    to: "#bcd1d6",
  },
  {
    id: "p12",
    slug: "rich-repair-night-cream",
    name: "Rich Repair Night Cream",
    tagline: "Nourishing overnight recovery",
    category: "moisturizers",
    gender: "women",
    price: 1299,
    rating: 4.7,
    reviewCount: 301,
    skinTypes: ["dry", "normal"],
    concerns: ["aging", "dryness"],
    sizes: ["50ml"],
    keyIngredients: ["Peptides", "Shea Butter", "Rosehip Oil"],
    description:
      "A luxuriously rich night cream that replenishes moisture and supports overnight renewal, so you wake to plumper, more rested-looking skin.",
    howToUse: "Apply an even layer to face and neck as the final evening step.",
    image: img("1609097164502-59a1f0f9a66f"),
    from: "#f6ebe1",
    to: "#e3c5ac",
  },
  {
    id: "p13",
    slug: "gentle-foaming-cleanser",
    name: "Gentle Foaming Cleanser",
    tagline: "Everyday soft-foam wash",
    category: "cleansers",
    gender: "women",
    price: 499,
    rating: 4.5,
    reviewCount: 288,
    skinTypes: ["all", "combination", "normal"],
    concerns: ["dullness", "dryness"],
    sizes: ["180ml"],
    keyIngredients: ["Amino Acids", "Green Tea", "Glycerin"],
    description:
      "A cloud-soft foaming cleanser that removes makeup, SPF and grime while keeping skin balanced and comfortable.",
    howToUse:
      "Work into a lather on damp skin morning and night. Rinse and pat dry.",
    image: img("1609097164468-b498a4ab436a"),
    from: "#eef0e8",
    to: "#cdd3bd",
  },
  {
    id: "p14",
    slug: "weekly-clay-detox-mask",
    name: "Weekly Clay Detox Mask",
    tagline: "Pore-purifying clay treatment",
    category: "masks",
    gender: "unisex",
    price: 749,
    rating: 4.5,
    reviewCount: 144,
    skinTypes: ["oily", "combination"],
    concerns: ["pores", "acne"],
    sizes: ["75ml"],
    keyIngredients: ["Kaolin Clay", "Bentonite", "Niacinamide"],
    description:
      "A creamy clay mask that absorbs excess oil and decongests pores without leaving skin tight or flaky.",
    howToUse:
      "Apply an even layer to clean skin, leave for 10 minutes, then rinse. Use 1–2 times weekly.",
    image: img("1626783416763-67a92e5e7266"),
    from: "#ede9e2",
    to: "#cbbfa9",
  },
  {
    id: "p15",
    slug: "hydrating-lip-mask",
    name: "Hydrating Lip Mask",
    tagline: "Overnight lip repair",
    category: "body",
    gender: "unisex",
    price: 399,
    rating: 4.8,
    reviewCount: 502,
    skinTypes: ["all"],
    concerns: ["dryness"],
    sizes: ["12g"],
    keyIngredients: ["Murumuru Butter", "Hyaluronic Acid", "Vitamin E"],
    description:
      "A buttery overnight lip mask that melts into dry, chapped lips and seals in moisture for a soft, cushioned feel by morning.",
    howToUse: "Apply a generous layer to lips before bed or anytime for comfort.",
    badge: "Bestseller",
    bestseller: true,
    image: img("1599305090598-fe179d501227"),
    from: "#f7e7ec",
    to: "#e7bcc9",
  },
  {
    id: "p16",
    slug: "silken-body-serum",
    name: "Silken Body Serum",
    tagline: "Fast-absorbing firming oil-serum",
    category: "body",
    gender: "women",
    price: 849,
    rating: 4.6,
    reviewCount: 121,
    skinTypes: ["all", "dry"],
    concerns: ["dryness", "aging"],
    sizes: ["100ml"],
    keyIngredients: ["Squalane", "Niacinamide", "Sea Buckthorn"],
    description:
      "A silky body serum that hydrates and visibly firms, leaving skin glowing and soft to the touch without any greasy residue.",
    howToUse: "Massage over damp skin after showering, morning or night.",
    image: img("1573461160327-b450ce3d8e7f"),
    from: "#f6ece2",
    to: "#e3c8ad",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(p: Product, n = 4) {
  return products
    .filter((x) => x.id !== p.id && x.category === p.category)
    .concat(products.filter((x) => x.id !== p.id && x.category !== p.category))
    .slice(0, n);
}

/* ----------------------------- reviews ----------------------------- */
export const sampleReviews = [
  {
    name: "Maya R.",
    rating: 5,
    title: "My skin has never looked better",
    body: "Three weeks in and the glow is real. Lightweight, no breakouts, absorbs instantly.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "Daniel K.",
    rating: 5,
    title: "Finally something that works for men's skin",
    body: "Simple, effective, no fragrance overload. Calms my skin right after shaving.",
    date: "1 month ago",
    verified: true,
  },
  {
    name: "Priya S.",
    rating: 4,
    title: "Gentle and effective",
    body: "Great for my sensitive skin. Took a little while to see results but worth it.",
    date: "1 month ago",
    verified: true,
  },
];

/* --------------------------- testimonials -------------------------- */
export const testimonials = [
  {
    quote:
      "Aurelle simplified my whole routine. Four products, zero irritation, all glow.",
    name: "Elena M.",
    role: "Verified Customer",
  },
  {
    quote:
      "The only brand my partner and I actually share. Works for both of us.",
    name: "Marcus T.",
    role: "Verified Customer",
  },
  {
    quote:
      "Clean ingredients that genuinely perform. My dermatologist approves.",
    name: "Dr. Hana L.",
    role: "Dermatologist",
  },
];

/* ----------------------------- journal ----------------------------- */
export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Routines" | "Ingredients" | "Guides" | "Lifestyle";
  readTime: string;
  from: string;
  to: string;
  image: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "build-a-simple-routine",
    title: "How to Build a Simple Skincare Routine",
    excerpt:
      "The four steps that actually matter — and the order to layer them in for real results.",
    category: "Routines",
    readTime: "5 min read",
    from: "#eef0e7",
    to: "#cdd6bd",
    image: img("1631729371254-42c2892f0e6e"),
    intro:
      "Skincare doesn't need ten steps. It needs the right four, done consistently. Here's the routine we'd recommend to almost anyone — and the order that makes each product work harder.",
    sections: [
      {
        heading: "Step 1 — Cleanse, gently",
        body: "Twice a day, no more. A gentle cleanser removes oil, SPF and grime without stripping your barrier. If your skin feels tight after washing, your cleanser is too harsh — switch to a cream or low-foam texture.",
      },
      {
        heading: "Step 2 — Treat with one active",
        body: "Pick the serum that matches your main goal: vitamin C for dullness in the morning, retinol for fine lines at night, or niacinamide for oil and pores. One active at a time keeps results readable and irritation low.",
      },
      {
        heading: "Step 3 — Moisturize, always",
        body: "Even oily skin needs moisture — dehydrated skin often produces more oil, not less. A ceramide-rich moisturizer seals in your serum and keeps the barrier resilient.",
      },
      {
        heading: "Step 4 — SPF every single morning",
        body: "Sunscreen is the single most effective anti-aging product ever made. Apply it as your final morning step, every day, rain or shine. Two finger-lengths for the face and neck is the right dose.",
      },
      {
        heading: "The order to remember",
        body: "Thinnest to thickest: cleanser → toner or mist (optional) → serum → moisturizer → SPF (morning only). Give each layer thirty seconds to settle, and give any new product four to six weeks before judging it.",
      },
    ],
  },
  {
    slug: "vitamin-c-explained",
    title: "Vitamin C, Explained",
    excerpt:
      "Why this antioxidant earns its hype, and how to use it without the irritation.",
    category: "Ingredients",
    readTime: "4 min read",
    from: "#f7ead2",
    to: "#e9c886",
    image: img("1617897903246-719242758050"),
    intro:
      "Few ingredients have the receipts vitamin C does: brighter tone, softened dark spots, and antioxidant protection against daily pollution. The catch? Formulation is everything.",
    sections: [
      {
        heading: "What it actually does",
        body: "Vitamin C neutralizes the free radicals generated by UV light and pollution before they can break down collagen. Over weeks of use, it also interrupts excess pigment production — which is why dark spots and post-blemish marks slowly fade.",
      },
      {
        heading: "Why concentration and pH matter",
        body: "Below 8% you'll wait a long time for visible change; above 20% irritation rises faster than results. Our sweet spot is 15%, buffered with ferulic acid and vitamin E, which stabilize the formula and double its photoprotection.",
      },
      {
        heading: "How to work it into your routine",
        body: "Use it in the morning on clean, dry skin, before moisturizer and SPF — the two actually work as a team, with vitamin C mopping up the radicals your sunscreen lets through. A slight tingle on first uses is normal; stinging is not.",
      },
      {
        heading: "Storage matters more than you think",
        body: "Oxidized vitamin C turns amber-brown and loses potency. Keep the bottle capped, away from direct sun, and finish it within three months of opening.",
      },
    ],
  },
  {
    slug: "skincare-for-men",
    title: "Skincare for Men: Start Here",
    excerpt:
      "A no-nonsense guide to the essentials — cleanse, protect, repeat.",
    category: "Guides",
    readTime: "6 min read",
    from: "#e3e6e8",
    to: "#a9b4bb",
    image: img("1594055103006-7871176f1a7e"),
    intro:
      "Men's skin is on average 20% thicker, oilier, and shaved regularly — which mostly means one thing: keep it simple and consistent. Three products cover 90% of what your skin needs.",
    sections: [
      {
        heading: "Cleanse like you mean it",
        body: "Shaving plus sweat plus sunscreen builds up. A gel cleanser with salicylic acid keeps pores clear and shine in check without the tight, squeaky feeling of bar soap — which is the one habit worth breaking.",
      },
      {
        heading: "Calm the razor burn",
        body: "Post-shave redness is a barrier injury, not a skin type. A fragrance-free balm with allantoin and aloe right after shaving cuts the sting, softens ingrown hairs and stops the flaky patches along the jaw.",
      },
      {
        heading: "SPF is non-negotiable",
        body: "Most visible aging — lines, rough texture, uneven tone — is sun damage. A weightless, invisible mineral SPF under two minutes each morning is the highest-return habit in all of skincare.",
      },
      {
        heading: "When you're ready for more",
        body: "Add a niacinamide serum if oil and pores bother you, or retinol at night if fine lines do. One at a time, a few nights a week to start. That's it — no 'bro-tox' required.",
      },
    ],
  },
  {
    slug: "spf-everyday",
    title: "Why You Need SPF Every Single Day",
    excerpt:
      "The single most effective anti-aging step — and how to make it a habit.",
    category: "Guides",
    readTime: "3 min read",
    from: "#fdf0df",
    to: "#f4cf9f",
    image: img("1623676714504-edd78728155e"),
    intro:
      "If you only ever adopt one skincare habit, make it this one. Up to 80% of visible facial aging is attributable to UV exposure — and it accumulates on cloudy days, in cars, and through windows.",
    sections: [
      {
        heading: "UVA is the quiet one",
        body: "UVB burns; UVA ages. UVA penetrates glass and cloud cover at nearly full strength all year round, silently breaking down collagen and triggering pigment. That's why 'I'm indoors most of the day' isn't the loophole it sounds like.",
      },
      {
        heading: "How much, how often",
        body: "Two finger-lengths for face and neck, applied as the last step of your morning routine. Reapply every two hours of direct sun — for most office days, a morning application honestly covers you.",
      },
      {
        heading: "Make it effortless",
        body: "The best SPF is the one you don't notice. A modern mineral formula with no white cast doubles as a smoothing primer, so it replaces a step instead of adding one. Keep it next to your toothbrush; pair the habits.",
      },
    ],
  },
  {
    slug: "layering-actives",
    title: "How to Layer Actives Without Irritation",
    excerpt:
      "Vitamin C, retinol, acids — the safe way to combine your favorites.",
    category: "Ingredients",
    readTime: "5 min read",
    from: "#efe6f3",
    to: "#cbb6dd",
    image: img("1607602132700-068258431c6c"),
    intro:
      "More actives don't mean more results — they usually mean a wrecked barrier. The good news: with a little scheduling, you can run a vitamin C, a retinol and an exfoliating acid in the same week, peacefully.",
    sections: [
      {
        heading: "Split by time of day",
        body: "Vitamin C belongs to the morning, where it teams up with SPF. Retinol belongs to the night, where there's no UV to destabilize it. Just doing this removes the most common clash entirely.",
      },
      {
        heading: "Alternate your nights",
        body: "Retinol and exfoliating acids both increase cell turnover — together on the same night they compound into redness and flaking. Give them alternate nights: retinol Monday, acids Thursday, plain moisturizer in between.",
      },
      {
        heading: "Niacinamide goes with everything",
        body: "If you want one ingredient you never have to schedule, it's niacinamide. It buffers irritation from retinol and acids, regulates oil, and plays well in both morning and evening routines.",
      },
      {
        heading: "Listen for the warning signs",
        body: "Persistent tightness, stinging when you apply moisturizer, or shiny-but-flaky patches mean your barrier is overdrawn. Drop all actives for a week — cleanser, moisturizer, SPF only — and reintroduce one at a time.",
      },
    ],
  },
  {
    slug: "winter-skin",
    title: "Your Cold-Weather Skin Survival Guide",
    excerpt:
      "Beat dryness and flaking with these seasonal routine tweaks.",
    category: "Routines",
    readTime: "4 min read",
    from: "#eaf1f3",
    to: "#bcd3da",
    image: img("1665763630810-e6251bdd392d"),
    intro:
      "Cold air outside, dry heat inside — winter is a humidity sandwich your skin sits in for months. A few small swaps keep your barrier comfortable until spring.",
    sections: [
      {
        heading: "Swap the foam for cream",
        body: "Foaming cleansers that feel great in humid weather can leave winter skin tight. A cream or balm cleanser cleans just as well while leaving lipids where they belong.",
      },
      {
        heading: "Layer hydration, then seal it",
        body: "A hydrating mist or hyaluronic serum on damp skin pulls water in; a ceramide moisturizer on top locks it down. The two-layer trick outperforms any single 'rich' cream.",
      },
      {
        heading: "Ease up on exfoliation",
        body: "Flakes tempt you to scrub more — resist. Over-exfoliating dry winter skin compounds the problem. Once a week with a gentle PHA blend is plenty until the weather warms.",
      },
      {
        heading: "Don't shelve the SPF",
        body: "Snow reflects up to 80% of UV back at your face, and UVA doesn't take winters off. Keep the sunscreen habit going year-round.",
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}

/* ------------------------------ orders ----------------------------- */
export const sampleOrders = [
  {
    id: "#AUR-10428",
    date: "May 28, 2026",
    status: "Delivered",
    total: 2847,
    items: 3,
  },
  {
    id: "#AUR-10391",
    date: "May 9, 2026",
    status: "Delivered",
    total: 1698,
    items: 2,
  },
  {
    id: "#AUR-10355",
    date: "Apr 22, 2026",
    status: "Delivered",
    total: 1299,
    items: 1,
  },
];
