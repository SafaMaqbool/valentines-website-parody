"use client"

import { useState, useEffect } from "react"

interface Heart {
  id: number
  left: string
  size: number
  duration: number
  delay: number
  opacity: number
  emoji: string
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const generatedHearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 12,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.15,
      emoji: i % 3 === 0 ? "❤️" : i % 3 === 1 ? "💖" : "💕",
    }))
    setHearts(generatedHearts)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
            bottom: "-20px",
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
