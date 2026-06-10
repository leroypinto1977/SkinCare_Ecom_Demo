import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getJournalPost, journalPosts, products } from "@/lib/data";
import { ProductImage } from "@/components/product-image";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      url: `/journal/${post.slug}`,
      type: "article",
    },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const related = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  // a light, sensible product tie-in per category
  const picks = products
    .filter((p) =>
      post.category === "Ingredients"
        ? p.category === "serums"
        : post.category === "Guides"
          ? p.gender === "men" || p.category === "sunscreen"
          : p.bestseller,
    )
    .slice(0, 4);

  return (
    <article>
      {/* header */}
      <div className="border-b border-line bg-surface">
        <div className="container-page max-w-3xl py-12 lg:py-16">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft size={15} /> The Journal
          </Link>
          <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            {post.category} · {post.readTime}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {post.intro}
          </p>
        </div>
      </div>

      {/* hero image */}
      <div className="container-page max-w-4xl pt-10">
        <ProductImage
          src={post.image}
          alt={post.title}
          from={post.from}
          to={post.to}
          label={post.category}
          className="aspect-[16/8] w-full"
          rounded="rounded-3xl"
        />
      </div>

      {/* body */}
      <div className="container-page max-w-3xl py-12">
        <div className="space-y-10">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-surface p-6 text-sm text-muted">
          Educational content only — not medical advice. For persistent skin
          concerns, see a dermatologist.
        </div>
      </div>

      {/* shop the routine */}
      <section className="bg-surface py-14">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl lg:text-3xl">
              Shop the routine
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep hover:underline"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {picks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* keep reading */}
      <section className="container-page py-14">
        <h2 className="font-display text-2xl lg:text-3xl">Keep reading</h2>
        <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {related.map((p) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
              <ProductImage
                src={p.image}
                alt={p.title}
                from={p.from}
                to={p.to}
                label={p.category}
                className="aspect-[16/10] w-full"
              />
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-wider text-sage-deep">
                {p.category} · {p.readTime}
              </p>
              <h3 className="mt-1.5 font-display text-xl group-hover:text-sage-deep">
                {p.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
