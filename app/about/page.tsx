import Link from "next/link";
import { Leaf, FlaskConical, HeartHandshake, Recycle } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { buttonVariants } from "@/components/ui/button";
import { products } from "@/lib/data";

export const metadata = {
  title: "Our Story · Aurelle",
  description: "Why Aurelle exists — clean, effective skincare for every skin.",
};

const stats = [
  { value: "40k+", label: "Happy customers" },
  { value: "12", label: "Hero formulas" },
  { value: "98%", label: "Would repurchase" },
  { value: "0", label: "Animal testing" },
];

const values = [
  { icon: FlaskConical, title: "Effective by design", text: "Every formula is built around clinically-studied actives at concentrations that actually deliver results." },
  { icon: Leaf, title: "Clean, always", text: "No parabens, sulfates, phthalates, or synthetic fragrance. Vegan and cruelty-free, full stop." },
  { icon: HeartHandshake, title: "For every skin", text: "Designed to work across skin types, tones and genders. Skincare shouldn't be gendered." },
  { icon: Recycle, title: "Kinder to the planet", text: "Recyclable packaging, refill programs and carbon-neutral shipping on every order." },
];

const ingredients = [
  { name: "Hyaluronic Acid", role: "Deep, lasting hydration" },
  { name: "Niacinamide", role: "Pores, tone & oil balance" },
  { name: "Vitamin C", role: "Brightening antioxidant" },
  { name: "Ceramides", role: "Barrier repair" },
  { name: "Retinol", role: "Smoothing & renewal" },
  { name: "Squalane", role: "Lightweight moisture" },
  { name: "Centella (Cica)", role: "Calms & soothes" },
  { name: "Zinc Oxide", role: "Mineral SPF protection" },
];

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="border-b border-line bg-surface">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
              Our story
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight lg:text-6xl">
              Good skin, made simple — for everyone.
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              Aurelle started with a frustration: skincare was either overhyped and
              underpowered, or clinical and confusing. We set out to make honest,
              effective products that fit into real lives — and real bathrooms shared
              by everyone.
            </p>
            <Link href="/shop" className={buttonVariants({ variant: "dark", size: "lg", className: "mt-7" })}>
              Explore the range
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ProductImage src={products[2].image} alt="" from={products[2].from} to={products[2].to} label="Aurelle" className="aspect-[3/4] translate-y-5" />
            <ProductImage src={products[9].image} alt="" from={products[9].from} to={products[9].to} label="Aurelle" className="aspect-[3/4]" />
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="container-page py-14">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl text-sage-deep lg:text-5xl">{s.value}</p>
              <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* values */}
      <section id="values" className="bg-surface py-16">
        <div className="container-page">
          <h2 className="max-w-xl font-display text-3xl lg:text-4xl">
            What we stand for
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-2xl border border-line bg-paper p-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage-soft text-sage-deep">
                  <v.icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-xl">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ingredients */}
      <section id="ingredients" className="container-page py-16">
        <div className="max-w-xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            Ingredient philosophy
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl">
            Powered by proven actives
          </h2>
          <p className="mt-3 text-ink-soft">
            We choose ingredients with real evidence behind them — and tell you
            exactly why each one is there. No fillers, no mystery.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((ing) => (
            <div key={ing.name} className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-display text-lg">{ing.name}</p>
              <p className="mt-1 text-[13px] text-ink-soft">{ing.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* founder quote */}
      <section className="bg-sage-deep py-16 text-cream">
        <div className="container-page mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl leading-relaxed lg:text-3xl">
            “We didn&apos;t want to make skincare for a gender or a trend. We wanted to
            make products that simply work — for you, your partner, your whole
            family.”
          </p>
          <p className="mt-6 text-sm uppercase tracking-wider text-cream/70">
            — The Aurelle Founders
          </p>
        </div>
      </section>
    </>
  );
}
