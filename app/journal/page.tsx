import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journalPosts } from "@/lib/data";
import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "The Journal",
  description: "Skincare tips, ingredient guides and routines from Aurelle.",
};

const topics = ["All", "Routines", "Ingredients", "Guides", "Lifestyle"];

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const active = topics.includes(topic ?? "") ? topic! : "All";
  const posts =
    active === "All"
      ? journalPosts
      : journalPosts.filter((p) => p.category === active);
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-page py-12 text-center lg:py-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            The Journal
          </p>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl">
            Skincare, simplified
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-ink-soft">
            Honest advice, ingredient deep-dives and routines you&apos;ll actually
            stick to — from our team and dermatologist partners.
          </p>
        </div>
      </section>

      <div className="container-page py-12">
        {/* topics */}
        <div className="no-scrollbar mb-10 flex gap-2 overflow-x-auto">
          {topics.map((t) => (
            <Link
              key={t}
              href={t === "All" ? "/journal" : `/journal?topic=${t}`}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition",
                t === active
                  ? "border-ink bg-ink text-cream"
                  : "border-line text-ink-soft hover:border-ink/40",
              )}
            >
              {t}
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="grid place-items-center rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="font-display text-xl">Nothing here yet</p>
            <p className="mt-1 text-sm text-muted">
              We haven&apos;t written about {active.toLowerCase()} yet — check back
              soon.
            </p>
          </div>
        )}

        {/* featured */}
        {featured && (
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2"
          >
            <ProductImage
              src={featured.image}
              alt={featured.title}
              from={featured.from}
              to={featured.to}
              label={featured.category}
              className="aspect-[16/10] w-full lg:aspect-auto lg:h-full"
              rounded="rounded-none"
            />
            <div className="flex flex-col justify-center bg-surface p-8 lg:p-12">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-sage-deep">
                Featured · {featured.category} · {featured.readTime}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-ink-soft">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Read article{" "}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {/* grid */}
        {rest.length > 0 && (
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
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
                <h3 className="mt-1.5 font-display text-xl group-hover:text-sage-deep">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
