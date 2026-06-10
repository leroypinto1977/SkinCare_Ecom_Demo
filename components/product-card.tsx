"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ProductImage } from "./product-image";
import { Badge } from "./ui/badge";
import { Stars } from "./ui/stars";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.slug);

  return (
    <div className="group relative flex flex-col">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block">
          <ProductImage
            src={product.image}
            alt={product.name}
            from={product.from}
            to={product.to}
            label={product.name.split(" ")[0]}
            className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.015]"
          />
        </Link>

        {/* badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <Badge tone={product.badge === "New" ? "clay" : "ink"}>
              {product.badge}
            </Badge>
          )}
          {product.compareAt && <Badge tone="gold">Sale</Badge>}
        </div>

        {/* wishlist */}
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          onClick={() => toggle(product.slug)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition hover:bg-white"
        >
          <Heart
            size={16}
            className={wished ? "fill-clay text-clay" : ""}
            strokeWidth={1.8}
          />
        </button>

        {/* quick add */}
        <button
          onClick={() => addItem(product)}
          className="absolute inset-x-3 bottom-3 flex h-11 translate-y-2 items-center justify-center gap-2 rounded-full bg-ink/90 text-sm font-medium text-cream opacity-0 backdrop-blur transition-all duration-300 hover:bg-ink group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus size={16} /> Quick add
        </button>
      </div>

      {/* details */}
      <div className="mt-3.5 flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} size={13} />
          <span className="text-xs text-muted">({product.reviewCount})</span>
        </div>
        <Link href={`/product/${product.slug}`} className="mt-1.5">
          <h3 className="font-display text-[17px] leading-snug text-ink hover:text-sage-deep">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-sm text-muted">{product.tagline}</p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="text-[15px] font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
