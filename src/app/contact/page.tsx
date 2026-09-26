"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-950 px-5 py-20 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
            Get in Touch
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            We’re here to help you reach your fitness goals.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Have a question about our products, orders, or delivery? Send us a
            message and our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact Information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-lime-600">
              Contact Information
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Let’s talk about your fitness journey.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-gray-600">
              Our team is ready to help you choose the right fitness equipment
              and accessories for your needs.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-lime-100 p-3 text-lime-700">
                  <Mail size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    support@yourstore.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-lime-100 p-3 text-lime-700">
                  <Phone size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    +92 300 1234567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-lime-100 p-3 text-lime-700">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Our Location</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Karachi, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-lime-100 p-3 text-lime-700">
                  <Clock size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Monday – Saturday
                    <br />
                    10:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Send us a message</h2>
              <p className="mt-2 text-sm text-gray-600">
                Fill out the form below and we’ll contact you shortly.
              </p>
            </div>

            {submitted ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                <CheckCircle2
                  size={58}
                  className="text-lime-600"
                />

                <h3 className="mt-5 text-2xl font-bold">
                  Message Sent Successfully
                </h3>

                <p className="mt-3 max-w-sm text-gray-600">
                  Thank you for contacting us. Our team will get back to you
                  soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What can we help you with?"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-lime-600 sm:w-auto"
                >
                  Send Message
                  <Send size={17} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-5 pb-16 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-lime-500 p-8 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to upgrade your workout?
            </h2>

            <p className="mt-2 max-w-xl text-sm text-gray-900/75 sm:text-base">
              Explore our collection of quality fitness equipment and
              accessories.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}