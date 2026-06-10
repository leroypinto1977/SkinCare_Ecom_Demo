import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journalPosts } from "@/lib/data";
import { ProductImage } from "@/components/product-image";

export const metadata = {
  title: "The Journal · Aurelle",
  description: "Skincare tips, ingredient guides and routines from Aurelle.",
};

const topics = ["All", "Routines", "Ingredients", "Guides", "Lifestyle"];

// duplicate posts to fill a richer grid
const more = [
  ...journalPosts,
  {
    slug: "spf-everyday",
    title: "Why You Need SPF Every Single Day",
    excerpt: "The single most effective anti-aging step — and how to make it a habit.",
    category: "Guides",
    readTime: "3 min read",
    from: "#fdf0df",
    to: "#f4cf9f",
  },
  {
    slug: "layering-actives",
    title: "How to Layer Actives Without Irritation",
    excerpt: "Vitamin C, retinol, acids — the safe way to combine your favorites.",
    category: "Ingredients",
    readTime: "5 min read",
    from: "#efe6f3",
    to: "#cbb6dd",
  },
  {
    slug: "winter-skin",
    title: "Your Cold-Weather Skin Survival Guide",
    excerpt: "Beat dryness and flaking with these seasonal routine tweaks.",
    category: "Routines",
    readTime: "4 min read",
    from: "#eaf1f3",
    to: "#bcd3da",
  },
];

const featured = more[0];

export default function JournalPage() {
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
          {topics.map((t, i) => (
            <button
              key={t}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                i === 0
                  ? "border-ink bg-ink text-cream"
                  : "border-line text-ink-soft hover:border-ink/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* featured */}
        <Link
          href="/journal"
          className="group grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2"
        >
          <ProductImage
            src=""
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

        {/* grid */}
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {more.slice(1).map((post) => (
            <Link key={post.slug} href="/journal" className="group">
              <ProductImage
                src=""
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
      </div>
    </>
  );
}
