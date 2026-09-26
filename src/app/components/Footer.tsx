"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
} from "lucide-react";

// Reusable hook: reveals an element once it scrolls into view
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

const perks = [
  {
    icon: Truck,
    label: "Free Shipping",
    sub: "On orders over Rs. 5,000",
  },
  {
    icon: RotateCcw,
    label: "Easy Returns",
    sub: "7-day return window",
  },
  {
    icon: ShieldCheck,
    label: "Secure Payment",
    sub: "100% protected checkout",
  },
  {
    icon: CreditCard,
    label: "Flexible Payment",
    sub: "Cards & cash on delivery",
  },
];

export default function Footer() {
  const { ref: perksRef, inView: perksInView } =
    useInView<HTMLDivElement>();

  const { ref: mainRef, inView: mainInView } =
    useInView<HTMLDivElement>();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Hook this up to your real newsletter endpoint
    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full max-w-full overflow-hidden bg-black text-gray-300">
      {/* ================================================= */}
      {/* Perks Strip */}
      {/* ================================================= */}

      <div
        ref={perksRef}
        className="w-full border-b border-white/10"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-5 py-8 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:py-10 lg:grid-cols-4 lg:px-12">
          {perks.map((perk, i) => {
            const Icon = perk.icon;

            return (
              <div
                key={perk.label}
                className={`flex min-w-0 items-center gap-3 transition-all duration-700 ease-out ${
                  perksInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                {/* Icon */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-yellow-500 ring-1 ring-white/10 transition-colors duration-300 sm:h-11 sm:w-11">
                  <Icon size={19} />
                </span>

                {/* Text */}
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white sm:text-sm">
                    {perk.label}
                  </p>

                  <p className="truncate text-[11px] text-gray-400 sm:text-xs">
                    {perk.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================================= */}
      {/* Main Footer */}
      {/* ================================================= */}

      <div
        ref={mainRef}
        className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-12 lg:py-16"
      >
        {/* Brand + Newsletter */}
        <div
          className={`max-w-xl transition-all duration-700 ease-out ${
            mainInView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="inline-block text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          >
            Fitness Depot
            <span className="text-yellow-500">.</span>
          </Link>

          {/* Description */}
          <p className="mt-4 max-w-lg text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Premium fitness equipment and accessories designed
            to support every workout. Quality you can trust,
            delivered with care.
          </p>

          {/* Newsletter */}
          <form
            onSubmit={handleSubscribe}
            className="mt-6 w-full max-w-md"
          >
            <label
              htmlFor="footer-email"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-400 sm:text-xs"
            >
              Get updates & offers
            </label>

            <div className="relative w-full">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-500 text-black transition-all duration-300 hover:scale-110 hover:bg-yellow-400 active:scale-95"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Confirmation */}
            <p
              className={`mt-2 overflow-hidden text-xs font-medium text-yellow-500 transition-all duration-500 ${
                subscribed
                  ? "max-h-6 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              Thanks — you&apos;re on the list.
            </p>
          </form>
        </div>

        {/* ================================================= */}
        {/* Contact Information */}
        {/* ================================================= */}

        <div
          className={`mt-10 grid grid-cols-1 gap-5 border-t border-white/10 pt-7 text-sm text-gray-400 transition-all duration-700 ease-out sm:mt-12 sm:grid-cols-3 sm:gap-6 sm:pt-8 ${
            mainInView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
          style={{
            transitionDelay: "240ms",
          }}
        >
          {/* Phone */}
          <div className="flex min-w-0 items-center gap-3">
            <Phone
              size={16}
              className="shrink-0 text-yellow-500"
            />

            <span className="truncate">
              +92 000 0000000
            </span>
          </div>

          {/* Email */}
          <div className="flex min-w-0 items-center gap-3">
            <Mail
              size={16}
              className="shrink-0 text-yellow-500"
            />

            <span className="truncate">
              support@fitnessdepot.com
            </span>
          </div>

          {/* Location */}
          <div className="flex min-w-0 items-center gap-3">
            <MapPin
              size={16}
              className="shrink-0 text-yellow-500"
            />

            <span className="truncate">
              Pakistan
            </span>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* Bottom Bar */}
      {/* ================================================= */}

      <div className="w-full border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-3 px-5 py-5 text-center sm:px-6 sm:py-6 lg:px-12">
          <p className="text-[11px] text-gray-500 sm:text-xs">
            © {new Date().getFullYear()} Fitness Depot.
            All rights reserved.
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* Back To Top */}
      {/* ================================================= */}

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-black shadow-lg transition-all duration-300 hover:scale-110 hover:bg-yellow-400 active:scale-95 sm:bottom-6 sm:right-6 sm:h-11 sm:w-11 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={19} />
      </button>

      {/* ================================================= */}
      {/* Ambient Glow */}
      {/* ================================================= */}

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-yellow-500/5 blur-3xl"
      />
    </footer>
  );
}