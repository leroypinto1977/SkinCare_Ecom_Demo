# Aurelle — Skincare E‑Commerce Demo

A polished, front‑end‑only demo store for a **skincare brand selling to both men and women**.
Built for a client pitch: every screen is designed and clickable, populated with realistic
dummy content. **No backend / payments are wired up** — this is the UI layer, ready to be made
functional later.

> Brand, colors, copy and products are all placeholder content and easy to swap.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **lucide-react** icons
- Client‑side **cart** via React Context + `localStorage` (no server)
- Fonts: **Fraunces** (display serif) + **Inter** (body) via `next/font`

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build / full type-check
```

## Screens

| Route | Screen |
|-------|--------|
| `/` | Home — hero, categories, bestsellers, shop‑by‑concern, men/women edits, ingredient spotlight, reviews, journal, newsletter |
| `/shop` | Product listing with live filters (gender, category, concern, skin type, price) + sorting. Deep‑links: `?gender=men`, `?category=serums`, `?concern=acne`, `?sort=bestsellers` |
| `/product/[slug]` | Product detail — gallery, price/sale, size + quantity, add‑to‑bag, ingredients/how‑to/shipping accordions, ratings breakdown, reviews, related products |
| `/cart` | Full bag with quantities, promo field, order summary |
| `/checkout` | Multi‑section checkout (contact, shipping, delivery, payment) + live order summary |
| `/order-confirmation` | Order success / thank‑you |
| `/quiz` | Interactive skin quiz → personalized product recommendations |
| `/about` | Brand story, values, ingredient philosophy |
| `/contact` | Contact form, support info, FAQ |
| `/account` | Account dashboard — orders, wishlist, addresses, profile (tabbed) |
| `/login` | Sign in / create account (toggle) |
| `/journal` | Skincare blog / content hub |
| `404` | Custom not‑found page |

## Shared features

- Sticky header with mega‑menu, search bar, mobile drawer, live cart badge
- Slide‑out **cart drawer** with free‑shipping progress meter
- Reusable product cards with quick‑add & wishlist
- Announcement marquee, trust badges, newsletter, full footer
- Fully responsive (mobile → desktop)

## Project structure

```
app/                 # routes (one folder per screen)
components/           # Header, Footer, CartDrawer, ProductCard, etc.
  ui/                # primitives: button, badge, stars
lib/
  data.ts            # all dummy products / categories / reviews / content
  cart.tsx           # cart context (state only, no API)
  utils.ts           # cn(), formatPrice()
```

## Making it real (next steps)

- Replace `lib/data.ts` with a CMS / database + product API
- Wire `lib/cart.tsx` to a real cart/checkout (e.g. Stripe, Shopify, or a custom API)
- Add auth on `/login` and `/account`
- Connect the newsletter & contact forms to a backend

Product imagery uses Unsplash URLs with a built‑in gradient fallback, so the layout always
looks intentional even offline.
