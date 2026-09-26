"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Dumbbell,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";

const deliveredItems = [
  {
    title: "Gym Equipment",
    description:
      "Practical equipment for strength training, home workouts, and everyday fitness routines.",
    icon: Dumbbell,
  },
  {
    title: "Fitness Accessories",
    description:
      "Useful accessories that make your workouts more comfortable, organized, and effective.",
    icon: ShoppingBag,
  },
  {
    title: "Quality Products",
    description:
      "Carefully selected fitness essentials with a focus on usability, durability, and value.",
    icon: ShieldCheck,
  },
  {
    title: "Customer Experience",
    description:
      "A simple shopping experience with clear product information and helpful customer support.",
    icon: Heart,
  },
];

const faqs = [
  {
    question: "What products do you offer?",
    answer:
      "We offer a variety of gym equipment, workout accessories, and fitness essentials for home and gym use.",
  },
  {
    question: "Are your products suitable for beginners?",
    answer:
      "Yes. Our collection includes practical products for beginners as well as regular fitness enthusiasts.",
  },
  {
    question: "Can I order products online?",
    answer:
      "Yes, you can explore our products, add your favorite items to your cart, and place an order through our online store.",
  },
  {
    question: "How can I contact your team?",
    answer:
      "You can contact us through our Contact page for product questions, order assistance, or general inquiries.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900">
      {/* ================= HERO ================= */}
      <section className="bg-gray-950 px-4 pb-14 pt-10 text-white sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mx-auto w-full max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-400 sm:text-sm sm:tracking-[0.2em]">
            About Us
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Your Fitness Journey,
            <span className="mt-1 block text-yellow-400 sm:mt-2">
              Our Commitment
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
            We are a fitness-focused store dedicated to providing quality gym
            products and accessories that help people build better workout
            routines and achieve their fitness goals.
          </p>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow-600 sm:text-sm sm:tracking-widest">
              Who We Are
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Built for People Who Take Fitness Seriously
            </h2>

            <div className="mt-5 h-1 w-14 rounded-full bg-yellow-400" />
          </div>

          <div className="space-y-4 text-sm leading-7 text-gray-600 sm:space-y-5 sm:text-base sm:leading-8">
            <p>
              Our store brings together gym equipment and fitness accessories
              designed to support different workout styles, whether you train
              at home or in a professional gym.
            </p>

            <p>
              We understand that choosing the right fitness products can make
              your routine more convenient and enjoyable. That is why we focus
              on practical products, clear information, and a shopping
              experience that puts customers first.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DELIVER ================= */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow-600 sm:text-sm sm:tracking-widest">
              What We Deliver
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Everything You Need for a Better Workout
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              We deliver useful fitness products and a reliable shopping
              experience to help you stay focused on your goals.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {deliveredItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-md sm:p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 sm:h-12 sm:w-12">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-gray-900 sm:mt-5 sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600 sm:mt-3 sm:leading-7">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-gray-950 p-5 text-white sm:mt-10 sm:gap-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3 sm:gap-4">
              <Truck
                className="mt-1 shrink-0 text-yellow-400"
                size={23}
              />

              <div>
                <h3 className="text-sm font-bold sm:text-base">
                  Fitness Essentials, Delivered Simply
                </h3>

                <p className="mt-1 text-xs leading-6 text-gray-400 sm:text-sm">
                  Explore our collection and find products that fit your
                  training needs.
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-yellow-300 sm:w-auto"
            >
              Shop Now
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow-600 sm:text-sm sm:tracking-widest">
              FAQs
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Find quick answers to common questions about our store and
              products.
            </p>
          </div>

          <div className="mt-8 space-y-3 sm:mt-10">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white sm:rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-gray-50 sm:gap-4 sm:px-6 sm:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold leading-6 text-gray-900 sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-gray-500 transition-transform duration-300 sm:size-5 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-4 py-4 text-sm leading-6 text-gray-600 sm:px-6 sm:py-5 sm:leading-7">
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="mt-1 shrink-0 text-yellow-500"
                        />

                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}