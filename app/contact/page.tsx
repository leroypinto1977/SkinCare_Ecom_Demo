import { Mail, MessageCircle, MapPin, Clock, Plus } from "lucide-react";
import { Newsletter } from "@/components/newsletter";

export const metadata = {
  title: "Contact & Help · Aurelle",
  description: "Get in touch with the Aurelle team, shipping info and FAQs.",
};

const faqs = [
  {
    q: "How do I know which products are right for me?",
    a: "Take our 60-second Skin Quiz and we'll build a personalized routine based on your skin type and concerns. You can also reach our skincare advisors anytime.",
  },
  {
    q: "Are your products suitable for sensitive skin?",
    a: "Yes — all formulas are dermatologist-tested and free from synthetic fragrance and common irritants. We always recommend patch-testing new actives like retinol.",
  },
  {
    q: "Are Aurelle products suitable for men?",
    a: "Absolutely. Our entire range is formulated to work for all skin — many of our bestsellers are loved equally by men and women, and we have a dedicated men's edit.",
  },
  {
    q: "What is your shipping policy?",
    a: "We offer free carbon-neutral standard shipping on orders over $50. Standard delivery takes 3–5 business days; express is 1–2 business days.",
  },
  {
    q: "What if I don't love my purchase?",
    a: "We offer a 30-day happiness guarantee. If a product isn't right for you — even if it's opened — return it for a full refund.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-page py-14 text-center lg:py-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            We&apos;re here to help
          </p>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-3 max-w-lg text-ink-soft">
            Questions about ingredients, your routine, or an order? Our skincare
            advisors usually reply within a few hours.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_1.1fr]">
        {/* info + form */}
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Mail, title: "Email us", text: "hello@aurelle.demo" },
              { icon: MessageCircle, title: "Live chat", text: "Mon–Fri, 9am–6pm" },
              { icon: MapPin, title: "Studio", text: "Portland, OR" },
              { icon: Clock, title: "Response time", text: "Within 24 hours" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-line bg-paper p-5">
                <c.icon size={20} className="text-sage-deep" />
                <p className="mt-2 text-sm font-semibold">{c.title}</p>
                <p className="text-[13px] text-muted">{c.text}</p>
              </div>
            ))}
          </div>

          <form className="mt-6 space-y-3 rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-display text-xl">Send us a message</h2>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="you@example.com" />
            </div>
            <Input label="Subject" placeholder="How can we help?" />
            <label className="block">
              <span className="mb-1 block text-[13px] font-medium text-ink-soft">
                Message
              </span>
              <textarea
                rows={4}
                placeholder="Tell us a little about your skin or your question…"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
              />
            </label>
            <button
              type="submit"
              className="h-11 w-full rounded-full bg-ink text-sm font-medium text-cream transition hover:bg-ink-soft"
            >
              Send message
            </button>
          </form>
        </div>

        {/* faq */}
        <div id="faq">
          <h2 className="font-display text-2xl lg:text-3xl">Frequently asked</h2>
          <div className="mt-5 divide-y divide-line border-y border-line" id="shipping">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium">
                  {f.q}
                  <Plus
                    size={18}
                    className="shrink-0 text-muted transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-ink p-6 text-cream">
            <p className="font-display text-xl">Still have questions?</p>
            <p className="mt-1 text-sm text-cream/75">
              Join our newsletter for skincare tips, or reach out anytime.
            </p>
            <div className="mt-4">
              <Newsletter variant="dark" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Input({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
      />
    </label>
  );
}
