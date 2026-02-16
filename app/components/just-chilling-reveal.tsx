"use client"

import Image from "next/image"

export function JustChillingReveal() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-6 py-12">
      {/* Main heading with teasing emoji */}
      <h1
        className="text-4xl md:text-6xl font-bold text-center flex items-center gap-3"
        style={{ color: "hsl(350 30% 15%)" }}
      >
        Honesty suits you! <span className="animate-pulse-soft text-3xl">😉</span>
      </h1>

      {/* Khajoor image */}
      <div className="w-48 h-48 md:w-64 md:h-64 relative">
        <Image
          src="/assets/khajoor.png"
          alt="Date Khajoor"
          fill
          className="rounded-xl shadow-lg object-cover"
        />
      </div>

      {/* Subtitle */}
      <p
        className="text-lg md:text-2xl font-semibold text-center"
        style={{ color: "hsl(350 50% 45%)" }}
      >
        These are the only dates that matter
      </p>

      {/* Date list */}
      <ul className="flex flex-col gap-3 text-center text-sm md:text-base font-medium">
        <li className="bg-hsl(350 60% 96%) border border-hsl(350 70% 75%) rounded-xl px-4 py-2 shadow-md">
          Date (Khajoor) &gt; Dinner date with candle 🍽 
        </li>
        <li className="bg-hsl(350 60% 96%) border border-hsl(350 70% 75%) rounded-xl px-4 py-2 shadow-md">
           Taraweeh &gt; Talking stage 🕌 
        </li>
        <li className="bg-hsl(350 60% 96%) border border-hsl(350 70% 75%) rounded-xl px-4 py-2 shadow-md">
           Go prepare for Ramzan 📖
        </li>
      </ul>
    </div>
  )
}
