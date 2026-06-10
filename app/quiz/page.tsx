"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import {
  products,
  concerns,
  skinTypeLabels,
  type Concern,
  type Gender,
  type SkinType,
} from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

type Answers = {
  skin?: SkinType;
  concern?: Concern;
  who?: Gender | "all";
  routine?: "minimal" | "complete";
};

const steps = [
  {
    key: "skin" as const,
    title: "What's your skin type?",
    sub: "This helps us match the right textures and actives.",
    options: (["oily", "dry", "combination", "sensitive", "normal"] as SkinType[]).map(
      (s) => ({ value: s, label: skinTypeLabels[s] }),
    ),
  },
  {
    key: "concern" as const,
    title: "What's your main concern?",
    sub: "Pick the one you'd most like to improve.",
    options: concerns.map((c) => ({ value: c.slug, label: c.name })),
  },
  {
    key: "who" as const,
    title: "Who are we building this for?",
    sub: "Our formulas work for everyone — this just tailors picks.",
    options: [
      { value: "women", label: "For her" },
      { value: "men", label: "For him" },
      { value: "all", label: "Everyone" },
    ],
  },
  {
    key: "routine" as const,
    title: "How involved is your routine?",
    sub: "We'll keep it as simple or complete as you like.",
    options: [
      { value: "minimal", label: "Keep it minimal (3 steps)" },
      { value: "complete", label: "The complete routine" },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const current = steps[step];
  const progress = ((done ? steps.length : step) / steps.length) * 100;

  const choose = (value: string) => {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    setTimeout(() => {
      if (step < steps.length - 1) setStep(step + 1);
      else setDone(true);
    }, 180);
  };

  const recommended = getRecommendations(answers);

  const reset = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  return (
    <div className="container-page py-10 lg:py-14">
      {/* progress */}
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-wider text-muted">
          <span className="inline-flex items-center gap-1.5 text-sage-deep">
            <Sparkles size={14} /> Skin Quiz
          </span>
          <span>{done ? "Complete" : `Step ${step + 1} of ${steps.length}`}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full bg-sage transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!done ? (
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <h1 className="font-display text-3xl leading-tight sm:text-4xl">
            {current.title}
          </h1>
          <p className="mt-2 text-ink-soft">{current.sub}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {current.options.map((o) => {
              const active = answers[current.key] === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => choose(o.value)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border bg-paper px-5 py-4 text-left text-[15px] font-medium transition",
                    active
                      ? "border-sage bg-sage-soft text-sage-deep"
                      : "border-line hover:border-ink/30 hover:bg-ink/[0.02]",
                  )}
                >
                  {o.label}
                  <ArrowRight size={18} className="text-muted" />
                </button>
              );
            })}
          </div>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-7 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
            >
              <ArrowLeft size={15} /> Back
            </button>
          )}
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-sage-deep">
              ✦ Your personalized routine
            </span>
            <h1 className="mt-4 font-display text-4xl">
              Curated just for you
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-ink-soft">
              Based on your{" "}
              <strong>
                {answers.skin ? skinTypeLabels[answers.skin].toLowerCase() : ""}
              </strong>{" "}
              skin and goal to improve{" "}
              <strong>
                {concerns.find((c) => c.slug === answers.concern)?.name.toLowerCase()}
              </strong>
              , here&apos;s the routine we recommend.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-medium text-cream hover:bg-ink-soft"
            >
              Shop all products <ArrowRight size={16} />
            </Link>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3 text-sm font-medium hover:border-ink"
            >
              <RotateCcw size={15} /> Retake quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function getRecommendations(a: Answers) {
  const gender = a.who && a.who !== "all" ? a.who : null;
  const scored = products
    .map((p) => {
      let score = p.rating;
      if (a.concern && p.concerns.includes(a.concern)) score += 4;
      if (a.skin && (p.skinTypes.includes(a.skin) || p.skinTypes.includes("all")))
        score += 2;
      if (gender && (p.gender === gender || p.gender === "unisex")) score += 1;
      return { p, score };
    })
    .sort((x, y) => y.score - x.score);

  // build a routine: one per core category, then fill
  const wanted = ["cleansers", "serums", "moisturizers", "sunscreen"];
  const picks: typeof products = [];
  for (const cat of wanted) {
    const found = scored.find(
      (s) => s.p.category === cat && !picks.includes(s.p),
    );
    if (found) picks.push(found.p);
  }
  for (const s of scored) {
    if (picks.length >= 4) break;
    if (!picks.includes(s.p)) picks.push(s.p);
  }
  return picks.slice(0, 4);
}
