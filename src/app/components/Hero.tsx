"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/photo1.jpg",
  "/photo2.jpg",
  "/photo3.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  // Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">

      {/* Slider Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          <Image
            src={img}
            alt="Hero Image"
            fill
            priority
            className="object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-20"></div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-4 text-center gap-4">

        {/* Heading with typewriter */}
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
         TURN FAT INTO FIT.
        </h1>

        {/* Paragraph BELOW heading */}
        <p className="text-white max-w-2xl text-sm sm:text-base md:text-lg">
          We provide trusted legal services with integrity, expertise, and commitment to justice. Your rights are our priority.
        </p>
        <Link href={"/shop"}>
        <button className="px-6 py-2 underline hover:cursor-pointer text-yellow-400 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Shop Now
        </button>
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2 z-40">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === current ? "bg-white" : "bg-gray-400"
              }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
