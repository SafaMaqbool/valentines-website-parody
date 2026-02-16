"use client"

import { useEffect, useState } from "react"

const CUTIES = [
  { emoji: "\u2764\uFE0F", position: "top-4 left-4", delay: 0 },
  { emoji: "\uD83E\uDD7A", position: "top-4 right-4", delay: 200 },
  { emoji: "\uD83D\uDC96", position: "bottom-20 left-4", delay: 400 },
  { emoji: "\uD83D\uDE4A", position: "bottom-20 right-4", delay: 600 },
  { emoji: "\u2728", position: "top-1/4 left-8", delay: 800 },
  { emoji: "\uD83D\uDC95", position: "top-1/4 right-8", delay: 1000 },
  { emoji: "\uD83E\uDD79", position: "bottom-1/3 left-6", delay: 300 },
  { emoji: "\uD83D\uDE0D", position: "bottom-1/3 right-6", delay: 500 },
]

export function CornerCuties() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timers = CUTIES.map((_, i) =>
      setTimeout(() => setVisibleCount((v) => Math.max(v, i + 1)), CUTIES[i].delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      {CUTIES.map((cutie, i) => (
        <div
          key={i}
          className={`absolute ${cutie.position} transition-all duration-700 ease-out ${
            i < visibleCount ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <span className="text-3xl md:text-4xl animate-pulse-soft inline-block">
            {cutie.emoji}
          </span>
        </div>
      ))}
    </div>
  )
}
