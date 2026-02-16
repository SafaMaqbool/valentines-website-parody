"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Heart, HeartCrack } from "lucide-react"

const DODGE_MESSAGES = [
   "Seriously? But you are literally single!",
  "Your imaginary partner won't count 😏",
  "Even Popatlal has an umbrella, what about you?",
  "Bro really tried... alone as always",
  "Your Nafs said yes, but reality said no 😅",
  "You are literally your own Valentine",
  "Nope, still single and thriving",
  "Even your crush ghosted you...",
  "Taubah taubah... Ramzan is right around the corner!",
  "Dreaming of love? Keep dreaming 😜",
  "Astaghfirullah, focus on your Imaan instead!",
  "haha, you can't catch a button, how will you catch a heart?",
  "Imagine chasing a button and not chasing Jannah.",
  "Khajoor won't run from you like this.",
]

interface DodgeButtonProps {
  onDodge: (message: string) => void
}

export function DodgeButton({ onDodge }: DodgeButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isRelative, setIsRelative] = useState(true)
  const [shaking, setShaking] = useState(false)
  const dodgeCount = useRef(0)
  const btnRef = useRef<HTMLButtonElement>(null)

  const dodge = useCallback(() => {
    dodgeCount.current += 1
    setShaking(true)
    setTimeout(() => setShaking(false), 400)

    const msg = DODGE_MESSAGES[(dodgeCount.current - 1) % DODGE_MESSAGES.length]
    onDodge(msg)

    // Random safe position
    const vw = window.innerWidth
    const vh = window.innerHeight
    const btnW = 160
    const btnH = 56
    const padX = 20
    const padY = 80

    const maxX = vw - btnW - padX
    const maxY = vh - btnH - padY

    const newX = Math.random() * Math.max(maxX, 100) + padX
    const newY = Math.random() * Math.max(maxY - padY, 100) + padY

    setIsRelative(false)
    setPosition({ x: newX, y: newY })
  }, [onDodge])

  const handleMouseEnter = useCallback(() => {
    if (dodgeCount.current >= 3) {
      dodge()
    }
  }, [dodge])

  useEffect(() => {
    if (!isRelative) {
      const handleResize = () => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        setPosition((prev) => ({
          x: Math.min(prev.x, vw - 180),
          y: Math.min(prev.y, vh - 100),
        }))
      }
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [isRelative])

  return (
    <button
      ref={btnRef}
      onClick={dodge}
      onMouseEnter={handleMouseEnter}
      className={`group flex items-center justify-center gap-3 rounded-full bg-pink-600 text-white px-12 py-4 text-lg font-bold shadow-lg transition-all duration-300 hover:bg-pink-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 select-none ${
      shaking ? "animate-shake" : ""
      } ${!isRelative ? "fixed z-50" : ""}`}
      style={
        !isRelative
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              transition:
                "left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }
          : undefined
      }
      aria-label="Going on a date - dodges you!"
    >
      <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
      <span>Going on a date</span>
    </button>
  )
}
