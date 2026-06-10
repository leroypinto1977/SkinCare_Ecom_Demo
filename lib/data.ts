/* ------------------------------------------------------------------ *
 *  Aurelle — dummy data layer (no backend; demo content only)
 * ------------------------------------------------------------------ */

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
    price: 24,
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
    image: img("1556228720-195a672e8a03"),
    from: "#eef0e7",
    to: "#cdd6bd",
  },
  {
    id: "p2",
    slug: "the-ordinary-glow-serum",
    name: "Glow Vitamin C Serum",
    tagline: "15% stabilized vitamin C for radiance",
    category: "serums",
    gender: "unisex",
    price: 42,
    compareAt: 52,
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
    image: img("1620916566398-39f1143ab7be"),
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
    price: 38,
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
    image: img("1608248543803-ba4f8c70ae0b"),
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
    price: 32,
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
    image: img("1631730359585-38a4935cbec4"),
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
    price: 46,
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
    price: 36,
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
    image: img("1598440947619-2c35fc9aa908"),
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
    price: 26,
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
    image: img("1570172619644-dfd03ed5d881"),
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
    price: 22,
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
    image: img("1556228578-8c89e6adf883"),
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
    price: 28,
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
    image: img("1631730359585-38a4935cbec4"),
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
    price: 54,
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
    image: img("1620916297612-93a36b4d7e1b"),
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
    price: 29,
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
    image: img("1556228453-efd6c1ff04f6"),
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
    price: 48,
    rating: 4.7,
    reviewCount: 301,
    skinTypes: ["dry", "normal"],
    concerns: ["aging", "dryness"],
    sizes: ["50ml"],
    keyIngredients: ["Peptides", "Shea Butter", "Rosehip Oil"],
    description:
      "A luxuriously rich night cream that replenishes moisture and supports overnight renewal, so you wake to plumper, more rested-looking skin.",
    howToUse: "Apply an even layer to face and neck as the final evening step.",
    image: img("1597354984706-fac992d9306f"),
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
    price: 20,
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
    image: img("1612207030848-1cf7e9d2f6f1"),
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
    price: 30,
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
    image: img("1608248597279-f99d160bfcbc"),
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
    price: 18,
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
    price: 34,
    rating: 4.6,
    reviewCount: 121,
    skinTypes: ["all", "dry"],
    concerns: ["dryness", "aging"],
    sizes: ["100ml"],
    keyIngredients: ["Squalane", "Niacinamide", "Sea Buckthorn"],
    description:
      "A silky body serum that hydrates and visibly firms, leaving skin glowing and soft to the touch without any greasy residue.",
    howToUse: "Massage over damp skin after showering, morning or night.",
    image: img("1611930022073-b7a4ba5fcccd"),
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
export const journalPosts = [
  {
    slug: "build-a-simple-routine",
    title: "How to Build a Simple Skincare Routine",
    excerpt:
      "The four steps that actually matter — and the order to layer them in for real results.",
    category: "Routines",
    readTime: "5 min read",
    from: "#eef0e7",
    to: "#cdd6bd",
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
  },
];

/* ------------------------------ orders ----------------------------- */
export const sampleOrders = [
  {
    id: "#AUR-10428",
    date: "May 28, 2026",
    status: "Delivered",
    total: 104,
    items: 3,
  },
  {
    id: "#AUR-10391",
    date: "May 9, 2026",
    status: "Delivered",
    total: 66,
    items: 2,
  },
  {
    id: "#AUR-10355",
    date: "Apr 22, 2026",
    status: "Delivered",
    total: 42,
    items: 1,
  },
];
