import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Plus } from "lucide-react";
import {
  getProduct,
  products,
  relatedProducts,
  sampleReviews,
} from "@/lib/data";
import { ProductImage } from "@/components/product-image";
import { ProductDetails } from "@/components/product-details";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Stars } from "@/components/ui/stars";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const ratingBreakdown = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];

  return (
    <>
      {/* breadcrumb */}
      <div className="container-page pt-6">
        <nav className="flex items-center gap-1.5 text-[13px] text-muted">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRight size={13} />
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <ChevronRight size={13} />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      {/* main */}
      <section className="container-page grid gap-10 py-8 lg:grid-cols-2 lg:gap-14 lg:py-10">
        {/* gallery */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductImage
            src={product.image}
            alt={product.name}
            from={product.from}
            to={product.to}
            label={product.name.split(" ")[0]}
            className="aspect-[4/5] w-full"
          />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[product.from, product.to, product.from, product.to].map((_, i) => (
              <ProductImage
                key={i}
                src={i === 0 ? product.image : ""}
                alt=""
                from={product.from}
                to={product.to}
                label={product.name.split(" ")[0]}
                className="aspect-square w-full cursor-pointer ring-1 ring-line"
                rounded="rounded-xl"
              />
            ))}
          </div>
        </div>

        {/* details */}
        <div>
          <ProductDetails product={product} />

          {/* info accordion */}
          <div className="mt-8 divide-y divide-line border-y border-line">
            <Accordion title="Key Ingredients" defaultOpen>
              <div className="flex flex-wrap gap-2">
                {product.keyIngredients.map((k) => (
                  <span
                    key={k}
                    className="rounded-full bg-sage-soft px-3 py-1.5 text-[13px] font-medium text-sage-deep"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Formulated without parabens, sulfates, mineral oil or synthetic
                fragrance. Vegan & cruelty-free.
              </p>
            </Accordion>
            <Accordion title="How to Use">
              <p className="text-sm leading-relaxed text-ink-soft">
                {product.howToUse}
              </p>
            </Accordion>
            <Accordion title="Shipping & Returns">
              <p className="text-sm leading-relaxed text-ink-soft">
                Free carbon-neutral shipping on orders over $50. Most orders arrive
                in 3–5 business days. Not in love? Return within 30 days for a full
                refund — even if it&apos;s opened.
              </p>
            </Accordion>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section className="bg-surface py-16">
        <div className="container-page">
          <SectionHeading eyebrow="What people say" title="Reviews" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[300px_1fr]">
            {/* summary */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-end gap-3">
                <span className="font-display text-5xl">{product.rating}</span>
                <div className="pb-1.5">
                  <Stars rating={product.rating} size={16} />
                  <p className="text-sm text-muted">{product.reviewCount} reviews</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {ratingBreakdown.map((r) => (
                  <li key={r.stars} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-muted">{r.stars}</span>
                    <span className="text-gold">★</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
                      <span
                        className="block h-full rounded-full bg-gold/70"
                        style={{ width: `${r.pct}%` }}
                      />
                    </span>
                    <span className="w-9 text-right text-muted">{r.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* list */}
            <div className="space-y-5">
              {sampleReviews.map((r, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-line bg-paper p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-sage-soft font-display text-sage-deep">
                        {r.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        {r.verified && (
                          <p className="text-[12px] text-sage-deep">
                            ✓ Verified buyer
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-[12px] text-muted">{r.date}</span>
                  </div>
                  <div className="mt-3">
                    <Stars rating={r.rating} size={14} />
                  </div>
                  <h3 className="mt-2 font-display text-lg">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {r.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="Complete your routine" title="You may also like" href="/shop" />
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

/* native disclosure accordion */
function Accordion({
  title,
  children,
  defaultOpen,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group py-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold">
        {title}
        <Plus
          size={18}
          className="text-muted transition-transform group-open:rotate-45"
        />
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  );
}
