import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Sparkles, FlaskConical } from "lucide-react";
import {
  products,
  categories,
  concerns,
  testimonials,
  journalPosts,
} from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { SectionHeading } from "@/components/section-heading";
import { Stars } from "@/components/ui/stars";
import { Newsletter } from "@/components/newsletter";
import { buttonVariants } from "@/components/ui/button";

const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
const spotlight = products.find((p) => p.slug === "glow-vitamin-c-serum")!;

const values = [
  { icon: Leaf, title: "Clean & Vegan", text: "Free from parabens, sulfates & synthetic fragrance." },
  { icon: ShieldCheck, title: "Dermatologist-Tested", text: "Clinically reviewed for safety on sensitive skin." },
  { icon: FlaskConical, title: "Science-Backed", text: "Proven actives at concentrations that actually work." },
  { icon: Sparkles, title: "Barrier-First", text: "Effective results without compromising your skin barrier." },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-sage-deep">
              ✦ New · Daily Mineral SPF 50
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              Skincare that
              <br />
              <span className="italic text-sage-deep">simply works.</span>
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">
              Thoughtfully formulated essentials for every skin type — and every
              person. Clean ingredients, real results, no fuss.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/shop" className={buttonVariants({ variant: "dark", size: "lg" })}>
                Shop the collection
              </Link>
              <Link href="/quiz" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Take the skin quiz <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-5">
              <div className="flex -space-x-2">
                {["#cdd6bd", "#e9c886", "#e3c8ad", "#c4d2d8"].map((c) => (
                  <span
                    key={c}
                    className="h-9 w-9 rounded-full border-2 border-cream"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div>
                <Stars rating={4.8} />
                <p className="text-[13px] text-ink-soft">
                  Loved by <strong>40,000+</strong> happy customers
                </p>
              </div>
            </div>
          </div>

          {/* hero collage */}
          <div className="relative animate-fade-up">
            <div className="grid grid-cols-2 gap-4">
              <ProductImage
                src={products[1].image}
                alt={products[1].name}
                from={products[1].from}
                to={products[1].to}
                label="Glow"
                className="aspect-[3/4] translate-y-6"
              />
              <ProductImage
                src={products[2].image}
                alt={products[2].name}
                from={products[2].from}
                to={products[2].to}
                label="Hydrate"
                className="aspect-[3/4]"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 w-44 -translate-x-1/2 rounded-2xl border border-line bg-paper/90 p-4 shadow-xl backdrop-blur">
              <p className="font-display text-2xl text-sage-deep">2 weeks</p>
              <p className="text-[12px] leading-tight text-ink-soft">
                to visibly brighter, smoother skin*
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- VALUES ---------------- */}
      <section className="border-y border-line bg-surface">
        <div className="container-page grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-soft text-sage-deep">
                <v.icon size={18} />
              </div>
              <div>
                <p className="text-[14px] font-semibold">{v.title}</p>
                <p className="text-[12px] leading-snug text-muted">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CATEGORIES ---------------- */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Shop by category"
          title="Find your essentials"
          href="/shop"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => {
            const p = products.find((x) => x.category === c.slug)!;
            return (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className="group flex flex-col"
              >
                <ProductImage
                  src={p.image}
                  alt={c.name}
                  from={p.from}
                  to={p.to}
                  label={c.name.split(" ")[0]}
                  className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <p className="mt-3 font-display text-lg text-ink group-hover:text-sage-deep">
                  {c.name}
                </p>
                <p className="text-[13px] text-muted">{c.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------------- BESTSELLERS ---------------- */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Customer favorites"
            title="Our bestsellers"
            subtitle="The tried-and-loved formulas our community keeps coming back to."
            href="/shop?sort=bestsellers"
          />
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SHOP BY CONCERN ---------------- */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Targeted care"
          title="What's your skin goal?"
          center
        />
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
          {concerns.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?concern=${c.slug}`}
              className="rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-medium text-ink transition hover:border-sage hover:bg-sage-soft hover:text-sage-deep"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- DUAL: MEN & WOMEN ---------------- */}
      <section className="container-page pb-16 lg:pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "For Her", href: "/shop?gender=women", p: products.find((x) => x.gender === "women")!, copy: "Radiance, hydration & age-defying care." },
            { label: "For Him", href: "/shop?gender=men", p: products.find((x) => x.gender === "men")!, copy: "Simple, effective routines that fit any morning." },
          ].map((b) => (
            <Link key={b.label} href={b.href} className="group relative overflow-hidden rounded-2xl">
              <ProductImage
                src={b.p.image}
                alt={b.label}
                from={b.p.from}
                to={b.p.to}
                label={b.label}
                className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7 text-cream">
                <p className="font-display text-3xl">{b.label}</p>
                <p className="mt-1 max-w-xs text-sm text-cream/85">{b.copy}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Shop now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- INGREDIENT SPOTLIGHT ---------------- */}
      <section className="bg-sage-deep text-cream">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="order-2 lg:order-1">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-cream/70">
              Hero ingredient
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight lg:text-5xl">
              15% Vitamin C, perfected.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-cream/80">
              Our stabilized vitamin C complex brightens, evens tone and defends
              against daily pollution — without the sting or oxidation of ordinary
              formulas.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Clinically shown to brighten in 2 weeks",
                "Buffered with ferulic acid + vitamin E",
                "Suitable for sensitive skin",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-cream/15">✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href={`/product/${spotlight.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3 text-sm font-semibold text-ink transition hover:bg-white"
            >
              Discover the serum <ArrowRight size={16} />
            </Link>
          </div>
          <div className="order-1 flex justify-center lg:order-2">
            <ProductImage
              src={spotlight.image}
              alt={spotlight.name}
              from={spotlight.from}
              to={spotlight.to}
              label="Glow"
              className="aspect-[4/5] w-full max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading eyebrow="Real reviews" title="Loved by 40,000+ people" center />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6"
            >
              <Stars rating={5} />
              <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-muted"> · {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------- JOURNAL ---------------- */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Journal"
            title="Skincare, simplified"
            href="/journal"
            hrefLabel="Read more"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {journalPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/journal/${post.slug}`} className="group">
                <ProductImage
                  src={post.image}
                  alt={post.title}
                  from={post.from}
                  to={post.to}
                  label={post.category}
                  className="aspect-[16/10] w-full"
                />
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-wider text-sage-deep">
                  {post.category} · {post.readTime}
                </p>
                <h3 className="mt-1.5 font-display text-xl text-ink group-hover:text-sage-deep">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- NEWSLETTER CTA ---------------- */}
      <section className="container-page py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-cream lg:px-12">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "#7d8a6a" }}
          />
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-cream/60">
            Join the Aurelle community
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl leading-tight sm:text-4xl">
            Get 10% off your first order
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-cream/75">
            Plus early access to launches, routines and expert skincare tips —
            straight to your inbox.
          </p>
          <div className="mx-auto mt-7 max-w-md">
            <Newsletter variant="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
