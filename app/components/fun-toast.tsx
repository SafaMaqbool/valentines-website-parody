"use client"

import { useEffect, useState } from "react"

interface FunToastProps {
  message: string
  id: number
  duration?: number // optional duration in ms
}

export function FunToast({ message, id, duration = 7000 }: FunToastProps) {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Show toast immediately after mount
    const t0 = setTimeout(() => setVisible(true), 10)

    // Start exiting shortly before unmount
    const fadeDuration = 500 // fade-out time in ms
    const t1 = setTimeout(() => setExiting(true), duration - fadeDuration)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
    }
  }, [duration])

  const isLeft = id % 2 === 0

  return (
    <div
      className={`fixed z-50 max-w-xs px-5 py-3 rounded-2xl shadow-2xl border-2 transition-all duration-500 ${
        isLeft ? "left-4 md:left-8" : "right-4 md:right-8"
      } ${
        visible && !exiting
          ? "opacity-100 translate-y-0 scale-100"
          : exiting
          ? "opacity-0 translate-y-4 scale-90"
          : "opacity-0 -translate-y-4 scale-90"
      }`}
      style={{
        top: `${Math.min(20 + (id % 4) * 18, 75)}%`,
        backgroundColor: "hsl(350 60% 96%)",
        borderColor: "hsl(350 70% 75%)",
        color: "hsl(350 30% 20%)",
      }}
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm md:text-base font-semibold text-center">{message}</p>
    </div>
  )
}
