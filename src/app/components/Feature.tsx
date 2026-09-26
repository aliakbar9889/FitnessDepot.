import Image from "next/image";
import Link from "next/link";

export default function PromoGrid() {
  return (
    <section className="w-full max-w-full overflow-hidden bg-gray-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-12 lg:py-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        
        {/* LEFT LARGE CARD */}
        <div className="group relative min-h-[380px] w-full overflow-hidden rounded-2xl sm:min-h-[450px] lg:min-h-[520px]">
          <Image
            src="/products/img2.avif"
            alt="Gym Equipment"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-8 md:p-10 lg:p-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
              Commercial Equipments
            </p>

            <h2 className="max-w-md text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Build Your Strongest Self
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/85 sm:mt-4 sm:text-base sm:leading-7">
              Discover premium gym equipment and accessories designed to
              support every workout and help you achieve your fitness goals.
            </p>

            <Link
              href="/commercial"
              className="mt-5 w-fit border border-white bg-white/10 px-5 py-2.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-white hover:text-black sm:mt-6 sm:px-6 sm:py-3 sm:text-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid w-full min-w-0 grid-rows-2 gap-4 sm:gap-5">

          {/* RIGHT TOP */}
          <div className="group relative min-h-[260px] w-full overflow-hidden rounded-2xl sm:min-h-[280px] lg:min-h-[250px]">
            <Image
              src="/products/img1.avif"
              alt="Cardio Equipment"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-7 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]">
                Cardio Equipment
              </p>

              <h2 className="mt-1.5 text-xl font-bold leading-tight sm:mt-2 sm:text-3xl">
                Upgrade Your Training
              </h2>

              <p className="mt-2 max-w-md text-xs leading-5 text-white/85 sm:text-sm sm:leading-6">
                Explore the latest fitness accessories for better performance.
              </p>

              <Link
                href="/cardio"
                className="mt-3 w-fit border border-white bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm transition hover:bg-white hover:text-black sm:mt-4 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Explore Now
              </Link>
            </div>
          </div>

          {/* RIGHT BOTTOM */}
          <div className="group relative min-h-[260px] w-full overflow-hidden rounded-2xl sm:min-h-[280px] lg:min-h-[250px]">
            <Image
              src="/products/img3.avif"
              alt="Fitness Accessories"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-7 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]">
                Fitness Accessories
              </p>

              <h2 className="mt-1.5 text-xl font-bold leading-tight sm:mt-2 sm:text-3xl">
                Train Without Limits
              </h2>

              <p className="mt-2 max-w-md text-xs leading-5 text-white/85 sm:text-sm sm:leading-6">
                Premium essentials to build the perfect workout experience.
              </p>

              <Link
                href="/fitness"
                className="mt-3 w-fit border border-white bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm transition hover:bg-white hover:text-black sm:mt-4 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Shop Collection
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}