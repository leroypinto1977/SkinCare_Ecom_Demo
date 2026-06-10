import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page grid place-items-center py-28 text-center">
      <p className="font-display text-7xl text-sage-deep">404</p>
      <h1 className="mt-4 font-display text-3xl">This page took a day off</h1>
      <p className="mt-2 max-w-sm text-ink-soft">
        We couldn&apos;t find what you were looking for — but your next skincare
        favorite is just a click away.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants({ variant: "dark" })}>
          Back home
        </Link>
        <Link href="/shop" className={buttonVariants({ variant: "outline" })}>
          Shop all products
        </Link>
      </div>
    </div>
  );
}
