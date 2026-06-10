"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { setUser } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isSignup = mode === "signup";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password needs at least 6 characters");
      return;
    }
    if (isSignup && !name.trim()) {
      setError("Tell us your name");
      return;
    }
    const fallbackName = email.split("@")[0].replace(/[._-]+/g, " ");
    setUser({
      name: isSignup && name.trim() ? name.trim() : capitalize(fallbackName),
      email: email.trim(),
    });
    router.push("/account");
  };

  return (
    <div className="container-page grid place-items-center py-16 lg:py-24">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="font-display text-2xl tracking-[0.2em]">
            AURELLE
          </Link>
          <h1 className="mt-6 font-display text-3xl">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            {isSignup
              ? "Join for 10% off your first order and a routine made for you."
              : "Sign in to track orders, save favorites and more."}
          </p>
        </div>

        {/* toggle */}
        <div className="mt-7 grid grid-cols-2 rounded-full border border-line bg-surface p-1 text-sm font-medium">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full py-2 transition ${
                mode === m ? "bg-ink text-cream" : "text-ink-soft"
              }`}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-3">
          {isSignup && (
            <IconField
              icon={User}
              placeholder="Full name"
              value={name}
              onChange={(v) => {
                setName(v);
                setError("");
              }}
            />
          )}
          <IconField
            icon={Mail}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(v) => {
              setEmail(v);
              setError("");
            }}
          />
          <IconField
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(v) => {
              setPassword(v);
              setError("");
            }}
          />
          {error && (
            <p className="px-1 text-[13px] text-clay-deep" role="alert">
              {error}
            </p>
          )}

          {!isSignup && (
            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-ink-soft">
                <input type="checkbox" className="accent-[var(--color-sage)]" />
                Remember me
              </label>
              <a href="#" className="text-sage-deep hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-cream transition hover:bg-ink-soft"
          >
            {isSignup ? "Create account" : "Sign in"}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-[12px] uppercase tracking-wider text-muted">
          <span className="h-px flex-1 bg-line" />
          or continue with
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {["Google", "Apple"].map((p) => (
            <button
              key={p}
              className="h-11 rounded-full border border-line bg-paper text-sm font-medium transition hover:border-ink/30"
            >
              {p}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-[12px] text-muted">
          By continuing you agree to our Terms & Privacy Policy. Demo only — no
          account is actually created.
        </p>
      </div>
    </div>
  );
}

function IconField({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 transition focus-within:border-sage focus-within:ring-2 focus-within:ring-sage/20">
      <Icon size={17} className="text-muted" />
      <input
        type={type}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
      />
    </div>
  );
}

function capitalize(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
