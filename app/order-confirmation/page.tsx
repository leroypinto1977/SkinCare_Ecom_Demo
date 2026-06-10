import Link from "next/link";
import { Check, Package, Mail, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Order Confirmed · Aurelle" };

export default function OrderConfirmationPage() {
  return (
    <div className="container-page py-16 lg:py-24">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-sage text-white">
          <Check size={38} strokeWidth={2.5} />
        </div>
        <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
          Order #AUR-10462
        </p>
        <h1 className="mt-2 font-display text-4xl">Thank you for your order!</h1>
        <p className="mt-3 text-ink-soft">
          We&apos;ve received your order and sent a confirmation to your email.
          Your skincare is being lovingly packed and will be on its way shortly.
        </p>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <Mail className="text-sage-deep" size={20} />
            <p className="mt-2 text-sm font-semibold">Confirmation sent</p>
            <p className="text-[13px] text-muted">
              Check your inbox for your receipt and order details.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <Package className="text-sage-deep" size={20} />
            <p className="mt-2 text-sm font-semibold">Arrives in 3–5 days</p>
            <p className="text-[13px] text-muted">
              We&apos;ll email you a tracking link once it ships.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/account" className={buttonVariants({ variant: "dark" })}>
            View order <ArrowRight size={16} />
          </Link>
          <Link href="/shop" className={buttonVariants({ variant: "outline" })}>
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
