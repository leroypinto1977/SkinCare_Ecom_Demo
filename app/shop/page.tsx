import { Suspense } from "react";
import { ShopClient } from "@/components/shop-client";

export const metadata = {
  title: "Shop All · Aurelle",
  description: "Browse all Aurelle skincare — cleansers, serums, moisturizers, SPF and more.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-page py-20 text-muted">Loading…</div>}>
      <ShopClient />
    </Suspense>
  );
}
